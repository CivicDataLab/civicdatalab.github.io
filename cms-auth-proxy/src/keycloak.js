/**
 * Keycloak token verification and authorization.
 *
 * Two independent gates, both must pass:
 *   1. the token is genuine, unexpired, and was minted by our realm for our
 *      client (signature + iss + aud/azp)
 *   2. the user holds the required role/group
 *
 * Gate 2 is the offboarding lever: remove the role in Keycloak and access
 * dies as soon as the current token expires.
 */

import { createRemoteJWKSet, jwtVerify, errors as joseErrors } from 'jose';

export class AuthError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

/**
 * Collect every role-ish claim Keycloak might carry the grant in. Which one
 * is populated depends on whether the realm uses a realm role, a client role,
 * or a group - so we check all three rather than forcing one configuration.
 */
export function extractGrants(claims, clientId) {
  const realmRoles = claims?.realm_access?.roles ?? [];
  const clientRoles = claims?.resource_access?.[clientId]?.roles ?? [];
  // Group claims arrive as paths like "/cms-editors"; normalise off the slash.
  const groups = (claims?.groups ?? []).map((g) =>
    typeof g === 'string' ? g.replace(/^\//, '') : g
  );
  return { realmRoles, clientRoles, groups };
}

export function hasRequiredGrant(claims, clientId, requiredRole) {
  const { realmRoles, clientRoles, groups } = extractGrants(claims, clientId);
  return (
    realmRoles.includes(requiredRole) ||
    clientRoles.includes(requiredRole) ||
    groups.includes(requiredRole)
  );
}

/**
 * Keycloak sets `azp` (authorized party) to the client the token was minted
 * for. `aud` is often just "account" unless an audience mapper is configured,
 * so accepting azp is the pragmatic default - but it is weaker, and we say so
 * once at startup rather than silently.
 */
export function audienceMatches(claims, clientId, acceptAzp) {
  const aud = claims.aud;
  const audList = Array.isArray(aud) ? aud : aud ? [aud] : [];
  if (audList.includes(clientId)) return { ok: true, via: 'aud' };
  if (acceptAzp && claims.azp === clientId) return { ok: true, via: 'azp' };
  return { ok: false, via: null };
}

/**
 * Pull the token out of an Authorization header.
 *
 * Accepts both `Bearer <t>` and `token <t>`: Decap's stock github backend
 * defaults `tokenKeyword` to "token", so that is what actually arrives on
 * proxied API calls, while our own /auth flow speaks Bearer.
 */
export function bearerFrom(headerValue) {
  if (!headerValue) return null;
  const m = /^(?:Bearer|token)\s+(.+)$/i.exec(headerValue.trim());
  return m ? m[1].trim() : null;
}

export function createVerifier(cfg, { fetchImpl } = {}) {
  // createRemoteJWKSet handles fetching, caching and key rotation for us.
  const jwks = createRemoteJWKSet(new URL(cfg.keycloak.jwksUri), {
    cooldownDuration: 30_000,
    cacheMaxAge: 10 * 60_000,
    ...(fetchImpl ? { [Symbol.for('jose.fetch')]: fetchImpl } : {}),
  });

  let warnedAboutAzp = false;

  /**
   * @returns {Promise<{claims: object, actor: {name: string, email: string}}>}
   * @throws {AuthError}
   */
  return async function verify(authorizationHeader) {
    const token = bearerFrom(authorizationHeader);
    if (!token) {
      throw new AuthError(401, 'no_token', 'Missing or malformed Authorization header');
    }

    let claims;
    try {
      // jose accepts an array here; during a Keycloak hostname change both the
      // old and new issuers can be valid at once. See config.acceptedIssuers.
      const result = await jwtVerify(token, jwks, {
        issuer: cfg.keycloak.acceptedIssuers ?? cfg.keycloak.issuer,
        clockTolerance: cfg.keycloak.clockToleranceSec,
      });
      claims = result.payload;
    } catch (err) {
      if (err instanceof joseErrors.JWTExpired) {
        throw new AuthError(401, 'token_expired', 'Token has expired');
      }
      if (err instanceof joseErrors.JWTClaimValidationFailed) {
        throw new AuthError(
          401,
          'bad_claim',
          `Token claim validation failed: ${err.claim}`
        );
      }
      throw new AuthError(401, 'bad_token', `Token verification failed: ${err.message}`);
    }

    const audCheck = audienceMatches(
      claims,
      cfg.keycloak.clientId,
      cfg.keycloak.acceptAzpAsAudience
    );
    if (!audCheck.ok) {
      throw new AuthError(
        403,
        'wrong_audience',
        `Token was not issued for client "${cfg.keycloak.clientId}"`
      );
    }
    if (audCheck.via === 'azp' && !warnedAboutAzp) {
      warnedAboutAzp = true;
      console.warn(
        '[auth] Accepting tokens on the `azp` claim because `aud` does not ' +
          `contain "${cfg.keycloak.clientId}". This works, but adding an ` +
          'audience mapper to the Keycloak client is stronger. See README.'
      );
    }

    if (!hasRequiredGrant(claims, cfg.keycloak.clientId, cfg.keycloak.requiredRole)) {
      throw new AuthError(
        403,
        'not_authorized',
        `User lacks the required role/group "${cfg.keycloak.requiredRole}"`
      );
    }

    // Commit attribution. Falling back to a noreply address keeps git history
    // valid when a Keycloak account has no email rather than failing the write.
    const name =
      claims.name ||
      [claims.given_name, claims.family_name].filter(Boolean).join(' ') ||
      claims.preferred_username ||
      'CivicDataLab CMS';
    const email =
      claims.email || `${claims.preferred_username || 'cms'}@users.noreply.github.com`;

    return { claims, actor: { name, email } };
  };
}
