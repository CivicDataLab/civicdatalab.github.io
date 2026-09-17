/**
 * Environment configuration, validated once at startup.
 *
 * Everything here is required unless it has a default. The process refuses to
 * boot on a missing value rather than failing later on a live request - a
 * misconfigured auth proxy that starts is worse than one that doesn't.
 */

const REQUIRED = [
  'KEYCLOAK_ISSUER',
  'KEYCLOAK_CLIENT_ID',
  'GITHUB_APP_ID',
  'GITHUB_APP_PRIVATE_KEY',
  'GITHUB_INSTALLATION_ID',
  'GITHUB_REPO',
];

function required(name) {
  const v = process.env[name];
  if (!v || !v.trim()) throw new Error(`Missing required env var: ${name}`);
  return v.trim();
}

function optional(name, fallback) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : fallback;
}

function list(name, fallback = []) {
  const v = process.env[name];
  if (!v || !v.trim()) return fallback;
  return v.split(',').map((s) => s.trim()).filter(Boolean);
}

export function loadConfig(env = process.env) {
  const missing = REQUIRED.filter((k) => !env[k] || !String(env[k]).trim());
  if (missing.length) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(', ')}\n` +
        `See env.example for the full list.`
    );
  }

  const issuer = required('KEYCLOAK_ISSUER').replace(/\/+$/, '');

  // GitHub App private keys are PEM. When passed through an env var the
  // newlines are usually escaped, so restore them.
  const privateKey = required('GITHUB_APP_PRIVATE_KEY').replace(/\\n/g, '\n');
  if (!privateKey.includes('BEGIN') || !privateKey.includes('PRIVATE KEY')) {
    throw new Error(
      'GITHUB_APP_PRIVATE_KEY does not look like a PEM private key. ' +
        'Expected a value containing "-----BEGIN ... PRIVATE KEY-----".'
    );
  }

  const repo = required('GITHUB_REPO');
  if (!/^[^/\s]+\/[^/\s]+$/.test(repo)) {
    throw new Error(`GITHUB_REPO must be "owner/name", got: ${repo}`);
  }

  const cmsOrigin = optional('CMS_ORIGIN', 'https://civicdatalab.in').replace(/\/+$/, '');

  return {
    port: Number(optional('PORT', '3000')),

    /**
     * Interface to bind. Defaults to loopback: this service is meant to sit
     * behind nginx or Caddy terminating TLS, and binding all interfaces would
     * expose the plain-HTTP port directly on the host's public address if a
     * security group ever allowed it. Set 0.0.0.0 only when something else
     * provides the boundary - a container network, for instance.
     */
    host: optional('HOST', '127.0.0.1'),

    /**
     * This service's own public origin. Two things depend on it being exact:
     * the OAuth redirect_uri registered in Keycloak, and Decap's popup
     * handshake, which compares `event.origin` against the configured
     * `base_url` and silently ignores a mismatch.
     */
    publicUrl: optional('PUBLIC_URL', 'https://cms-auth.civicdatalab.in').replace(/\/+$/, ''),

    /** Origin of the CMS itself; the popup posts its result there. */
    cmsOrigin,

    keycloak: {
      issuer,
      /**
       * Issuers accepted on incoming tokens. Normally just `issuer`, but a
       * Keycloak hostname change alters the `iss` claim, which would reject
       * every token already in circulation. Listing the old issuer here for
       * the duration of a cutover avoids logging everyone out mid-edit.
       *
       * Only valid for a rename of the same instance - the signing keys, and
       * therefore the JWKS, must be unchanged.
       */
      acceptedIssuers: [issuer, ...list('KEYCLOAK_ADDITIONAL_ISSUERS')].map((i) =>
        i.replace(/\/+$/, '')
      ),
      // Keycloak's JWKS always lives at this path under the realm.
      jwksUri: optional(
        'KEYCLOAK_JWKS_URI',
        `${issuer}/protocol/openid-connect/certs`
      ),
      clientId: required('KEYCLOAK_CLIENT_ID'),
      /**
       * Role or group that grants CMS access. Checked against realm roles,
       * client roles, and the `groups` claim - whichever the realm is
       * configured to emit. See keycloak.js.
       */
      requiredRole: optional('KEYCLOAK_REQUIRED_ROLE', 'cms-editors'),
      /**
       * Set for a confidential client. The code exchange happens server-side
       * here, so a confidential client is fine and preferred. Leave unset for
       * a public client, in which case PKCE is used instead.
       */
      clientSecret: optional('KEYCLOAK_CLIENT_SECRET', undefined),
      authorizeEndpoint: optional(
        'KEYCLOAK_AUTHORIZE_ENDPOINT',
        `${issuer}/protocol/openid-connect/auth`
      ),
      tokenEndpoint: optional(
        'KEYCLOAK_TOKEN_ENDPOINT',
        `${issuer}/protocol/openid-connect/token`
      ),
      scope: optional('OAUTH_SCOPE', 'openid profile email'),
      /**
       * Keycloak puts the client in `azp` and usually leaves `aud` as
       * "account" unless an audience mapper is configured. We accept either,
       * but log a warning when only azp matches so the mapper can be added.
       */
      acceptAzpAsAudience: optional('KEYCLOAK_ACCEPT_AZP', 'true') === 'true',
      clockToleranceSec: Number(optional('KEYCLOAK_CLOCK_TOLERANCE', '30')),
    },

    github: {
      appId: required('GITHUB_APP_ID'),
      privateKey,
      installationId: required('GITHUB_INSTALLATION_ID'),
      repo,
      apiRoot: optional('GITHUB_API_ROOT', 'https://api.github.com'),
      /**
       * Identity recorded as the *committer*. The editor is always the author;
       * this is the machine identity beside them. Left undefined, GitHub
       * defaults the committer to the App, which is already correct.
       */
      committerName: optional('GITHUB_COMMITTER_NAME', undefined),
      committerEmail: optional('GITHUB_COMMITTER_EMAIL', undefined),
    },

    /**
     * Origins allowed to call this proxy from a browser. Defaults to the CMS
     * origin, since that is the only thing that legitimately calls us - having
     * to set both CMS_ORIGIN and ALLOWED_ORIGINS in step was a footgun.
     */
    allowedOrigins: list('ALLOWED_ORIGINS', [cmsOrigin]),

    /** Set false in production; enables verbose per-request logging. */
    debug: optional('DEBUG', 'false') === 'true',
  };
}
