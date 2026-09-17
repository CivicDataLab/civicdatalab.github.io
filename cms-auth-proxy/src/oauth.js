/**
 * OAuth 2.0 authorization-code flow against Keycloak, run server-side.
 *
 * The browser never participates in the OIDC exchange: it is redirected to
 * Keycloak, comes back with a code, and this service swaps that code for a
 * token over a back channel. The browser only ever sees the resulting access
 * token, handed to Decap through the popup handshake.
 *
 * Supports both client types:
 *   - confidential (KEYCLOAK_CLIENT_SECRET set) - preferred, since we are a
 *     server and can hold a secret
 *   - public + PKCE (no secret) - falls back to S256
 */

import { randomBytes, createHash } from 'node:crypto';

const STATE_TTL_MS = 10 * 60_000;

function b64url(buf) {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function makeVerifier() {
  return b64url(randomBytes(32));
}

export function challengeFor(verifier) {
  return b64url(createHash('sha256').update(verifier).digest());
}

/**
 * Pending-login store.
 *
 * In-memory by design: this is a single-instance service, and a login in
 * flight during a restart simply fails and is retried. If this is ever run
 * behind a load balancer with more than one instance, replace this with a
 * shared store or enable sticky sessions - otherwise the callback may land on
 * an instance that never saw the corresponding /auth.
 */
export function createStateStore({ now = () => Date.now(), ttlMs = STATE_TTL_MS } = {}) {
  const pending = new Map();

  function sweep() {
    const cutoff = now();
    for (const [k, v] of pending) if (v.expiresAt <= cutoff) pending.delete(k);
  }

  return {
    create(data = {}) {
      sweep();
      const state = b64url(randomBytes(24));
      pending.set(state, { ...data, expiresAt: now() + ttlMs });
      return state;
    },
    /** Single-use: consuming a state removes it, so a code cannot be replayed. */
    consume(state) {
      sweep();
      if (!state || !pending.has(state)) return null;
      const entry = pending.get(state);
      pending.delete(state);
      if (entry.expiresAt <= now()) return null;
      return entry;
    },
    get size() {
      sweep();
      return pending.size;
    },
  };
}

export function buildAuthorizeUrl(cfg, { state, codeChallenge }) {
  const url = new URL(cfg.keycloak.authorizeEndpoint);
  url.searchParams.set('client_id', cfg.keycloak.clientId);
  url.searchParams.set('redirect_uri', `${cfg.publicUrl}/callback`);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', cfg.keycloak.scope);
  url.searchParams.set('state', state);
  if (codeChallenge) {
    url.searchParams.set('code_challenge', codeChallenge);
    url.searchParams.set('code_challenge_method', 'S256');
  }
  return url.toString();
}

export class TokenExchangeError extends Error {
  constructor(status, body) {
    super(`Keycloak token exchange failed (HTTP ${status}): ${body}`);
    this.status = status;
  }
}

export async function exchangeCode(cfg, { code, codeVerifier }, { fetchImpl = fetch } = {}) {
  const form = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${cfg.publicUrl}/callback`,
    client_id: cfg.keycloak.clientId,
  });
  if (cfg.keycloak.clientSecret) form.set('client_secret', cfg.keycloak.clientSecret);
  if (codeVerifier) form.set('code_verifier', codeVerifier);

  const res = await fetchImpl(cfg.keycloak.tokenEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: form.toString(),
  });

  const text = await res.text();
  if (!res.ok) throw new TokenExchangeError(res.status, text.slice(0, 400));

  const body = JSON.parse(text);
  if (!body.access_token) {
    throw new TokenExchangeError(res.status, 'response contained no access_token');
  }
  return body;
}
