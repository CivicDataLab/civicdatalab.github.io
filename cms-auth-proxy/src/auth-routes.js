/**
 * The three endpoints that let Decap's *stock* github backend authenticate
 * against Keycloak:
 *
 *   GET /auth          start the flow (Decap opens this in a popup)
 *   GET /callback      Keycloak returns here; exchange code, hand back token
 *   GET /github/user   the identity Decap shows in its UI
 *
 * No custom Decap code is involved: `base_url` + `auth_endpoint` point Decap
 * at /auth, and the token it receives is opaque to it.
 */

import {
  createStateStore,
  buildAuthorizeUrl,
  exchangeCode,
  makeVerifier,
  challengeFor,
  TokenExchangeError,
} from './oauth.js';
import { successPage, errorPage } from './handshake.js';
import { AuthError } from './keycloak.js';

export function registerAuthRoutes(app, cfg, { verify, fetchImpl = fetch, stateStore } = {}) {
  const states = stateStore ?? createStateStore();
  // Decap sends provider=github; keep whatever it sends so the reply matches.
  const defaultProvider = 'github';

  // ---- GET /auth ---------------------------------------------------------
  app.get('/auth', (req, res) => {
    const provider = String(req.query.provider || defaultProvider);

    // PKCE for a public client; a confidential client uses its secret instead.
    const usePkce = !cfg.keycloak.clientSecret;
    const codeVerifier = usePkce ? makeVerifier() : null;

    const state = states.create({ provider, codeVerifier });
    const url = buildAuthorizeUrl(cfg, {
      state,
      codeChallenge: codeVerifier ? challengeFor(codeVerifier) : null,
    });

    if (cfg.debug) console.log(`[auth] -> Keycloak (provider=${provider}, pkce=${usePkce})`);
    res.redirect(302, url);
  });

  // ---- GET /callback -----------------------------------------------------
  app.get('/callback', async (req, res) => {
    const sendError = (msg, provider = defaultProvider, status = 400) => {
      if (cfg.debug) console.warn(`[callback] ${msg}`);
      res
        .status(status)
        .type('html')
        .send(errorPage({ provider, message: msg, cmsOrigin: cfg.cmsOrigin }));
    };

    // Keycloak reports its own failures here (e.g. access_denied).
    if (req.query.error) {
      return sendError(
        `Keycloak returned "${req.query.error}"` +
          (req.query.error_description ? `: ${req.query.error_description}` : ''),
        defaultProvider,
        400
      );
    }

    const pending = states.consume(String(req.query.state || ''));
    if (!pending) {
      // Also the path taken by a replayed callback, since state is single-use.
      return sendError(
        'Sign-in session was not recognised or has expired. Close this window and try again.',
        defaultProvider,
        400
      );
    }

    const code = String(req.query.code || '');
    if (!code) return sendError('No authorization code returned.', pending.provider);

    try {
      const tokens = await exchangeCode(
        cfg,
        { code, codeVerifier: pending.codeVerifier },
        { fetchImpl }
      );

      // Verify before handing it over. A token that would be rejected by the
      // proxy on the next call should fail here, where we can explain why,
      // rather than surfacing as a confusing 403 mid-edit.
      let actor;
      try {
        ({ actor } = await verify(`Bearer ${tokens.access_token}`));
      } catch (err) {
        if (err instanceof AuthError && err.code === 'not_authorized') {
          return sendError(
            `You signed in successfully, but your account is not a member of ` +
              `"${cfg.keycloak.requiredRole}", which is required to edit content. ` +
              `Ask an administrator to add you.`,
            pending.provider,
            403
          );
        }
        throw err;
      }

      if (cfg.debug) console.log(`[callback] signed in: ${actor.email}`);

      return res.type('html').send(
        successPage({
          provider: pending.provider,
          token: tokens.access_token,
          cmsOrigin: cfg.cmsOrigin,
        })
      );
    } catch (err) {
      if (err instanceof TokenExchangeError) {
        console.error('[callback] token exchange failed:', err.message);
        return sendError('Could not complete sign-in with Keycloak.', pending.provider, 502);
      }
      console.error('[callback] unexpected error:', err);
      return sendError('Unexpected error during sign-in.', pending.provider, 500);
    }
  });

  // ---- GET /github/user --------------------------------------------------
  // Decap calls GET {api_root}/user to render who is signed in. There is no
  // GitHub account to proxy to - that is the point of this design - so the
  // identity is synthesised from the verified Keycloak claims.
  app.get('/github/user', async (req, res) => {
    try {
      const { claims, actor } = await verify(req.get('authorization'));
      return res.json({
        login: claims.preferred_username || actor.email,
        name: actor.name,
        email: actor.email,
        avatar_url: null,
      });
    } catch (err) {
      if (err instanceof AuthError) {
        return res.status(err.status).json({ error: err.code, message: err.message });
      }
      console.error('[user] unexpected error:', err);
      return res.status(500).json({ error: 'internal_error' });
    }
  });

  return { states };
}
