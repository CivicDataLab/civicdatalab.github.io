/**
 * The login flow, with Keycloak faked. Covers the popup handshake contract
 * that Decap's stock github backend depends on.
 */

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { AuthError } from '../src/keycloak.js';
import { createStateStore } from '../src/oauth.js';

const EDITOR = { name: 'Priya Sharma', email: 'priya@civicdatalab.in' };

function baseCfg(overrides = {}) {
  // Pull nested keys out so the trailing spread cannot clobber them wholesale.
  const { keycloak: kcOverrides, github: ghOverrides, ...rest } = overrides;
  return {
    port: 0,
    publicUrl: 'https://cms-auth.civicdatalab.in',
    cmsOrigin: 'https://civicdatalab.in',
    keycloak: {
      issuer: 'https://kc.test/auth/realms/DataSpace',
      jwksUri: 'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/certs',
      authorizeEndpoint: 'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/auth',
      tokenEndpoint: 'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/token',
      clientId: 'civicdatalab-cms',
      clientSecret: undefined,
      scope: 'openid profile email',
      requiredRole: 'cms-editors',
      acceptAzpAsAudience: true,
      clockToleranceSec: 30,
      ...(kcOverrides || {}),
    },
    github: {
      appId: '1',
      privateKey: 'x',
      installationId: '2',
      repo: 'CivicDataLab/civicdatalab.github.io',
      apiRoot: 'https://api.github.test',
      ...(ghOverrides || {}),
    },
    allowedOrigins: ['https://civicdatalab.in'],
    debug: false,
    ...rest,
  };
}

function makeApp({ cfg = baseCfg(), tokenResponse, verifyImpl, stateStore } = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, init });
    if (tokenResponse) return tokenResponse();
    return new Response(
      JSON.stringify({ access_token: 'kc.jwt.here', token_type: 'Bearer', expires_in: 300 }),
      { status: 200, headers: { 'content-type': 'application/json' } }
    );
  };

  const verify =
    verifyImpl ??
    (async (header) => {
      if (!header) throw new AuthError(401, 'no_token', 'missing');
      return { claims: { preferred_username: 'priya' }, actor: EDITOR };
    });

  const app = createApp(cfg, {
    verify,
    tokenProvider: { getToken: async () => 'ghs_x', _peek: () => null },
    fetchImpl,
    stateStore,
  });
  return { app, calls, cfg };
}

async function req(app, path, { headers = {}, redirect = 'manual' } = {}) {
  const server = app.listen(0);
  await new Promise((r) => server.once('listening', r));
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}${path}`, { headers, redirect });
    return {
      status: res.status,
      location: res.headers.get('location'),
      contentType: res.headers.get('content-type'),
      body: await res.text(),
    };
  } finally {
    server.close();
  }
}

// ---------------------------------------------------------------- /auth ----

test('/auth redirects to Keycloak with the right OAuth parameters', async () => {
  const { app } = makeApp();
  const res = await req(app, '/auth?provider=github&site_id=civicdatalab.in');

  assert.equal(res.status, 302);
  const u = new URL(res.location);
  assert.equal(u.origin + u.pathname, 'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/auth');
  assert.equal(u.searchParams.get('client_id'), 'civicdatalab-cms');
  assert.equal(u.searchParams.get('response_type'), 'code');
  assert.equal(u.searchParams.get('redirect_uri'), 'https://cms-auth.civicdatalab.in/callback');
  assert.equal(u.searchParams.get('scope'), 'openid profile email');
  assert.ok(u.searchParams.get('state'), 'state must be present');
});

test('/auth uses PKCE for a public client, and not for a confidential one', async () => {
  const pub = makeApp();
  const pubRes = await req(pub.app, '/auth');
  const pubUrl = new URL(pubRes.location);
  assert.equal(pubUrl.searchParams.get('code_challenge_method'), 'S256');
  assert.ok(pubUrl.searchParams.get('code_challenge'));

  const conf = makeApp({ cfg: baseCfg({ keycloak: { clientSecret: 's3cret' } }) });
  const confRes = await req(conf.app, '/auth');
  const confUrl = new URL(confRes.location);
  assert.equal(confUrl.searchParams.get('code_challenge'), null);
});

test('/auth issues a distinct state each time', async () => {
  const { app } = makeApp();
  const a = new URL((await req(app, '/auth')).location).searchParams.get('state');
  const b = new URL((await req(app, '/auth')).location).searchParams.get('state');
  assert.notEqual(a, b);
});

// ------------------------------------------------------------ /callback ----

test('/callback completes the flow and emits the handshake page', async () => {
  const states = createStateStore();
  const { app, calls } = makeApp({ stateStore: states });
  const state = states.create({ provider: 'github', codeVerifier: 'v' });

  const res = await req(app, `/callback?code=abc123&state=${state}`);
  assert.equal(res.status, 200);
  assert.match(res.contentType, /html/);

  // Exchanged the code server-side, not in the browser.
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/token');
  const sent = new URLSearchParams(calls[0].init.body);
  assert.equal(sent.get('grant_type'), 'authorization_code');
  assert.equal(sent.get('code'), 'abc123');
  assert.equal(sent.get('code_verifier'), 'v');

  // The page implements Decap's exact handshake contract.
  assert.match(res.body, /authorizing:'\s*\+\s*provider|authorizing:/);
  assert.match(res.body, /authorization:'\s*\+\s*provider\s*\+\s*':success:'/);
  assert.ok(res.body.includes('kc.jwt.here'), 'token must reach the page');
});

test('/callback rejects an unknown or replayed state', async () => {
  const states = createStateStore();
  const { app, calls } = makeApp({ stateStore: states });

  const bogus = await req(app, '/callback?code=x&state=never-issued');
  assert.equal(bogus.status, 400);
  assert.equal(calls.length, 0, 'must not exchange a code for an unknown state');

  // A state is single-use, so replaying the same callback fails.
  const state = states.create({ provider: 'github', codeVerifier: 'v' });
  const first = await req(app, `/callback?code=x&state=${state}`);
  assert.equal(first.status, 200);
  const replay = await req(app, `/callback?code=x&state=${state}`);
  assert.equal(replay.status, 400);
});

test('/callback surfaces a Keycloak-reported error', async () => {
  const states = createStateStore();
  const { app } = makeApp({ stateStore: states });
  const state = states.create({ provider: 'github' });

  const res = await req(app, `/callback?error=access_denied&error_description=Nope&state=${state}`);
  assert.equal(res.status, 400);
  assert.match(res.body, /access_denied/);
  assert.match(res.body, /:error:/, 'must tell the opener it failed');
});

test('/callback explains a missing cms-editors membership rather than 403ing later', async () => {
  const states = createStateStore();
  const { app } = makeApp({
    stateStore: states,
    verifyImpl: async () => {
      throw new AuthError(403, 'not_authorized', 'lacks role');
    },
  });
  const state = states.create({ provider: 'github', codeVerifier: 'v' });

  const res = await req(app, `/callback?code=x&state=${state}`);
  assert.equal(res.status, 403);
  assert.match(res.body, /cms-editors/);
  assert.match(res.body, /administrator/i, 'should say what to do about it');
});

test('/callback reports an upstream token-exchange failure as 502', async () => {
  const states = createStateStore();
  const { app } = makeApp({
    stateStore: states,
    tokenResponse: () =>
      new Response(JSON.stringify({ error: 'invalid_grant' }), { status: 400 }),
  });
  const state = states.create({ provider: 'github', codeVerifier: 'v' });

  const res = await req(app, `/callback?code=bad&state=${state}`);
  assert.equal(res.status, 502);
});

test('the handshake page escapes script-breaking content', async () => {
  const states = createStateStore();
  const { app } = makeApp({
    stateStore: states,
    tokenResponse: () =>
      new Response(JSON.stringify({ access_token: 'abc</script><script>alert(1)//' }), {
        status: 200,
      }),
  });
  const state = states.create({ provider: 'github', codeVerifier: 'v' });

  const res = await req(app, `/callback?code=x&state=${state}`);
  assert.ok(
    !res.body.includes('</script><script>alert(1)'),
    'a raw </script> must not survive into the page'
  );
  assert.ok(res.body.includes('\\u003c'), 'angle brackets should be unicode-escaped');
});

// --------------------------------------------------------- /github/user ----

test('/github/user synthesises identity from the verified token', async () => {
  const { app } = makeApp();
  const res = await req(app, '/github/user', { headers: { authorization: 'token kc.jwt' } });

  assert.equal(res.status, 200);
  const user = JSON.parse(res.body);
  assert.equal(user.name, 'Priya Sharma');
  assert.equal(user.email, 'priya@civicdatalab.in');
  assert.equal(user.login, 'priya');
});

test('/github/user requires a token', async () => {
  const { app } = makeApp();
  const res = await req(app, '/github/user');
  assert.equal(res.status, 401);
});

// ------------------------------------------------------------- state TTL ---

test('pending logins expire and are swept', () => {
  let clock = 1_000_000;
  const states = createStateStore({ now: () => clock, ttlMs: 60_000 });

  const s = states.create({ provider: 'github' });
  assert.equal(states.size, 1);

  clock += 30_000;
  assert.ok(states.consume(s), 'still valid within the TTL');

  const s2 = states.create({ provider: 'github' });
  clock += 61_000;
  assert.equal(states.consume(s2), null, 'expired');
  assert.equal(states.size, 0, 'expired entries are swept');
});
