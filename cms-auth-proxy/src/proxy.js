/**
 * The forwarding handler.
 *
 * Sequence per request:
 *   1. verify the Keycloak token          -> 401/403 on failure
 *   2. check the path against the allowlist -> 403 on failure
 *   3. swap in a GitHub App installation token
 *   4. inject commit attribution on write paths
 *   5. forward to api.github.com and relay the response
 *
 * The caller's Authorization header is never forwarded; it is replaced.
 */

import { checkAllowed } from './allowlist.js';
import { acceptsAuthor, withAttribution } from './attribution.js';
import { AuthError } from './keycloak.js';

/**
 * Decap gates the whole UI on `hasWriteAccess()`, which is
 * `GET /repos/{owner}/{repo}` reading `permissions.push`.
 *
 * That field describes the *calling user's* permission, and a GitHub App
 * installation token has no user behind it - GitHub returns every permission
 * as false. Left alone, Decap refuses to load with "you don't have write
 * access", even though the App can write perfectly well.
 *
 * So we answer that one question ourselves. It is not a security decision
 * being bypassed: write authority is enforced here, by the Keycloak role check
 * and the path allowlist. This only stops Decap disabling its own UI over a
 * field that cannot apply to an installation token.
 *
 * (Decap's own aws-cognito-github-proxy backend solves the same problem with a
 * `bypassWriteAccessCheckForAppTokens` flag; we do it server-side instead so
 * the stock backend needs no changes.)
 */
function patchRepoPermissions(text) {
  try {
    const repo = JSON.parse(text);
    if (repo && typeof repo === 'object' && !Array.isArray(repo)) {
      repo.permissions = { ...(repo.permissions || {}), pull: true, push: true };
      return JSON.stringify(repo);
    }
  } catch {
    /* not JSON - relay unchanged */
  }
  return text;
}

/** Response headers worth relaying back to the CMS. */
const PASS_THROUGH_HEADERS = new Set([
  'content-type',
  'etag',
  'last-modified',
  'link',
  'location',
  'x-ratelimit-limit',
  'x-ratelimit-remaining',
  'x-ratelimit-reset',
  'x-github-request-id',
]);

export function createProxyHandler(cfg, { verify, tokenProvider, fetchImpl = fetch }) {
  const [owner, name] = cfg.github.repo.split('/');
  const repoBase = `${cfg.github.apiRoot}/repos/${owner}/${name}`;

  return async function handle(req, res) {
    const started = Date.now();
    let actor = null;

    try {
      // ---- 1. authenticate ------------------------------------------------
      const verified = await verify(req.get('authorization'));
      actor = verified.actor;

      // ---- 2. authorize the path -----------------------------------------
      // req.params[0] is everything after the mount point.
      const subPath = '/' + (req.params[0] || '');
      const normalised = subPath === '/' ? '' : subPath;

      const check = checkAllowed(req.method, normalised);
      if (!check.allowed) {
        return res.status(403).json({
          error: 'forbidden_path',
          message: check.reason,
        });
      }

      // ---- 3. GitHub credential ------------------------------------------
      const ghToken = await tokenProvider.getToken();

      // ---- 4. attribution -------------------------------------------------
      let body;
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        body = req.body;
        if (acceptsAuthor(req.method, normalised)) {
          body = withAttribution(body, actor, {
            committerName: cfg.github.committerName,
            committerEmail: cfg.github.committerEmail,
          });
        }
      }

      // ---- 5. forward -----------------------------------------------------
      const qs = req.originalUrl.includes('?')
        ? '?' + req.originalUrl.split('?').slice(1).join('?')
        : '';
      const target = `${repoBase}${normalised}${qs}`;

      const ghRes = await fetchImpl(target, {
        method: req.method,
        headers: {
          Authorization: `token ${ghToken}`,
          Accept: req.get('accept') || 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
          'User-Agent': 'cdl-cms-auth-proxy',
          ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });

      for (const [k, v] of ghRes.headers) {
        if (PASS_THROUGH_HEADERS.has(k.toLowerCase())) res.set(k, v);
      }

      let text = await ghRes.text();

      // The repo root is the only response we rewrite. See above.
      if (req.method === 'GET' && normalised === '' && ghRes.status === 200) {
        text = patchRepoPermissions(text);
        // Length changed, so a relayed etag would now be wrong.
        res.removeHeader('etag');
      }

      res.status(ghRes.status);

      if (cfg.debug) {
        console.log(
          `[proxy] ${req.method} ${normalised || '/'} -> ${ghRes.status} ` +
            `(${Date.now() - started}ms) actor=${actor.email}`
        );
      }

      return res.send(text);
    } catch (err) {
      if (err instanceof AuthError) {
        if (cfg.debug) {
          console.warn(`[proxy] ${req.method} rejected: ${err.code} - ${err.message}`);
        }
        return res.status(err.status).json({ error: err.code, message: err.message });
      }
      console.error('[proxy] unexpected error:', err);
      return res.status(502).json({
        error: 'upstream_failure',
        message: 'Could not complete the GitHub request.',
      });
    }
  };
}
