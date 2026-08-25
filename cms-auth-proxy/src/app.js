/**
 * Express app assembly. Kept separate from server.js so tests can mount the
 * app without binding a port.
 */

import express from 'express';
import { createVerifier } from './keycloak.js';
import { createTokenProvider } from './github-app.js';
import { createProxyHandler } from './proxy.js';
import { registerAuthRoutes } from './auth-routes.js';

export function createApp(cfg, deps = {}) {
  const verify = deps.verify ?? createVerifier(cfg);
  const tokenProvider = deps.tokenProvider ?? createTokenProvider(cfg);
  const fetchImpl = deps.fetchImpl ?? fetch;

  const app = express();
  app.disable('x-powered-by');

  // Bodies are JSON; media uploads arrive base64-encoded inside JSON, hence
  // the generous limit. GitHub's own blob limit is what really applies.
  app.use(express.json({ limit: '50mb' }));

  // ---- CORS ---------------------------------------------------------------
  app.use((req, res, next) => {
    const origin = req.get('origin');
    if (origin && cfg.allowedOrigins.includes(origin)) {
      res.set('Access-Control-Allow-Origin', origin);
      res.set('Vary', 'Origin');
      res.set('Access-Control-Allow-Credentials', 'true');
      res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type, Accept');
      res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
      res.set('Access-Control-Expose-Headers', 'Link, ETag, Location');
      res.set('Access-Control-Max-Age', '600');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(origin ? 204 : 403);
    next();
  });

  // ---- health -------------------------------------------------------------
  // Deliberately unauthenticated and free of secrets: suitable for an ALB or
  // CloudWatch check. Reports config presence, never config values.
  app.get('/healthz', (_req, res) => {
    res.json({
      status: 'ok',
      repo: cfg.github.repo,
      issuer: cfg.keycloak.issuer,
      clientId: cfg.keycloak.clientId,
      requiredRole: cfg.keycloak.requiredRole,
      githubTokenCached: Boolean(tokenProvider._peek?.()),
    });
  });

  // ---- login flow ---------------------------------------------------------
  // /auth, /callback, and /github/user. Registered before the catch-all proxy
  // route so /github/user is not swallowed by it.
  registerAuthRoutes(app, cfg, {
    verify,
    fetchImpl,
    stateStore: deps.stateStore,
  });

  // ---- the proxy ----------------------------------------------------------
  // Decap is configured with api_root = https://<host>/github, and appends
  // /repos/{owner}/{repo}/... itself. We accept that prefix and ignore the
  // repo it names, always targeting the configured repo instead - so a client
  // cannot redirect writes at another repository.
  const handler = createProxyHandler(cfg, { verify, tokenProvider, fetchImpl });

  app.all(/^\/github\/repos\/[^/]+\/[^/]+(?:\/(.*))?$/, (req, res) => {
    req.params[0] = req.params[0] ?? '';
    return handler(req, res);
  });

  app.use((_req, res) => res.status(404).json({ error: 'not_found' }));

  return app;
}
