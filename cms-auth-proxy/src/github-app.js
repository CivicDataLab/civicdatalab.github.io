/**
 * GitHub App installation tokens.
 *
 * Flow: sign a short-lived RS256 JWT with the App's private key, exchange it
 * for an installation access token, cache that until shortly before it
 * expires. Installation tokens last ~1 hour and are scoped to the repos the
 * App is installed on - much narrower than a personal access token.
 */

import { SignJWT } from 'jose';
import { createPrivateKey } from 'node:crypto';

/** Refresh this long before actual expiry, to avoid racing the boundary. */
const REFRESH_MARGIN_MS = 5 * 60_000;

/** GitHub rejects App JWTs with more than 10 minutes of life. */
const APP_JWT_TTL_SEC = 9 * 60;

export class GitHubAppTokenError extends Error {
  constructor(status, body) {
    super(`GitHub App token request failed (HTTP ${status}): ${body}`);
    this.status = status;
  }
}

export function createTokenProvider(cfg, { fetchImpl = fetch, now = () => Date.now() } = {}) {
  let cached = null; // { token, expiresAtMs }
  let inFlight = null; // de-dupe concurrent refreshes
  let importedKey = null;

  async function signAppJwt() {
    if (!importedKey) {
      // GitHub hands out PKCS#1 keys ("BEGIN RSA PRIVATE KEY"). jose's
      // importPKCS8 only accepts PKCS#8, so use node:crypto, which detects
      // either format - and accepts a key converted with `openssl pkcs8` too.
      try {
        importedKey = createPrivateKey(cfg.github.privateKey);
      } catch (err) {
        throw new Error(
          `Could not read GITHUB_APP_PRIVATE_KEY as a private key: ${err.message}. ` +
            `Expected the PEM GitHub generated for the App.`
        );
      }
    }
    const iat = Math.floor(now() / 1000) - 60; // clock-skew cushion
    return new SignJWT({})
      .setProtectedHeader({ alg: 'RS256' })
      .setIssuedAt(iat)
      .setExpirationTime(iat + APP_JWT_TTL_SEC)
      .setIssuer(String(cfg.github.appId))
      .sign(importedKey);
  }

  async function mint() {
    const appJwt = await signAppJwt();
    const url = `${cfg.github.apiRoot}/app/installations/${cfg.github.installationId}/access_tokens`;

    const res = await fetchImpl(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${appJwt}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'cdl-cms-auth-proxy',
      },
    });

    const text = await res.text();
    if (!res.ok) {
      throw new GitHubAppTokenError(res.status, text.slice(0, 500));
    }

    const body = JSON.parse(text);
    const expiresAtMs = Date.parse(body.expires_at);
    return {
      token: body.token,
      expiresAtMs: Number.isNaN(expiresAtMs) ? now() + 30 * 60_000 : expiresAtMs,
    };
  }

  return {
    async getToken() {
      if (cached && cached.expiresAtMs - REFRESH_MARGIN_MS > now()) {
        return cached.token;
      }
      // Collapse concurrent refreshes into one request.
      if (!inFlight) {
        inFlight = mint()
          .then((fresh) => {
            cached = fresh;
            return fresh.token;
          })
          .finally(() => {
            inFlight = null;
          });
      }
      return inFlight;
    },

    /** Test seam / for the health endpoint. */
    _peek() {
      return cached ? { expiresAtMs: cached.expiresAtMs } : null;
    },
    _reset() {
      cached = null;
      inFlight = null;
    },
  };
}
