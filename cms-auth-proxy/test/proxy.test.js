/**
 * End-to-end tests through the real Express app, with Keycloak verification
 * and the GitHub API both faked. Proves the full chain: authenticate ->
 * authorize path -> swap credential -> attribute -> forward.
 */

import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { AuthError } from '../src/keycloak.js';

const cfg = {
  port: 0,
  keycloak: {
    issuer: 'https://kc.test/auth/realms/DataSpace',
    jwksUri: 'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/certs',
    clientId: 'civicdatalab-cms',
    requiredRole: 'cms-editors',
    acceptAzpAsAudience: true,
    clockToleranceSec: 30,
  },
  github: {
    appId: '123',
    privateKey: 'unused-in-tests',
    installationId: '456',
    repo: 'CivicDataLab/civicdatalab.github.io',
    apiRoot: 'https://api.github.test',
    committerName: 'CDL CMS',
    committerEmail: 'cms@civicdatalab.in',
  },
  allowedOrigins: ['https://civicdatalab.in'],
  debug: false,
};

const EDITOR = { name: 'Priya Sharma', email: 'priya@civicdatalab.in' };

let captured; // last request the fake GitHub saw

function makeApp({ verifyImpl } = {}) {
  captured = null;
  const fetchImpl = async (url, init) => {
    captured = { url, init };
    return new Response(JSON.stringify({ ok: true, content: { sha: 'abc' } }), {
      status: 200,
      headers: { 'content-type': 'application/json', etag: 'W/"1"' },
    });
  };

  const verify =
    verifyImpl ??
    (async (header) => {
      if (!header) throw new AuthError(401, 'no_token', 'Missing Authorization header');
      if (header === 'Bearer valid') return { claims: {}, actor: EDITOR };
      if (header === 'Bearer outsider')
        throw new AuthError(403, 'not_authorized', 'lacks cms-editors');
      throw new AuthError(401, 'bad_token', 'nope');
    });

  return createApp(cfg, {
    verify,
    tokenProvider: { getToken: async () => 'ghs_installation_token', _peek: () => null },
    fetchImpl,
  });
}

/** Minimal fetch-based request helper against an ephemeral listener. */
async function call(app, method, path, { headers = {}, body } = {}) {
  const server = app.listen(0);
  await new Promise((r) => server.once('listening', r));
  const { port } = server.address();
  try {
    return await fetch(`http://127.0.0.1:${port}${path}`, {
      method,
      headers: {
        ...(body !== undefined ? { 'content-type': 'application/json' } : {}),
        ...headers,
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }).then(async (r) => ({
      status: r.status,
      headers: r.headers,
      json: await r.json().catch(() => null),
    }));
  } finally {
    server.close();
  }
}

const REPO_PREFIX = '/github/repos/CivicDataLab/civicdatalab.github.io';

beforeEach(() => {
  captured = null;
});

test('rejects an unauthenticated request before reaching GitHub', async () => {
  const res = await call(makeApp(), 'GET', `${REPO_PREFIX}/contents/x.md`);
  assert.equal(res.status, 401);
  assert.equal(res.json.error, 'no_token');
  assert.equal(captured, null, 'must not call GitHub when unauthenticated');
});

test('rejects a valid token without the required role', async () => {
  const res = await call(makeApp(), 'GET', `${REPO_PREFIX}/contents/x.md`, {
    headers: { authorization: 'Bearer outsider' },
  });
  assert.equal(res.status, 403);
  assert.equal(res.json.error, 'not_authorized');
  assert.equal(captured, null);
});

test('forwards an authorized read with the App token, not the users', async () => {
  const res = await call(makeApp(), 'GET', `${REPO_PREFIX}/contents/content/team/a/index.md`, {
    headers: { authorization: 'Bearer valid' },
  });

  assert.equal(res.status, 200);
  assert.equal(
    captured.url,
    'https://api.github.test/repos/CivicDataLab/civicdatalab.github.io/contents/content/team/a/index.md'
  );
  assert.equal(captured.init.headers.Authorization, 'token ghs_installation_token');
  assert.ok(
    !JSON.stringify(captured.init.headers).includes('Bearer valid'),
    'the caller token must never be forwarded upstream'
  );
});

test('injects the editor as commit author on a write', async () => {
  await call(makeApp(), 'PUT', `${REPO_PREFIX}/contents/content/team/a/index.md`, {
    headers: { authorization: 'Bearer valid' },
    body: { message: 'Update bio', content: 'aGk=' },
  });

  const sent = JSON.parse(captured.init.body);
  assert.deepEqual(sent.author, { name: EDITOR.name, email: EDITOR.email });
  assert.deepEqual(sent.committer, { name: 'CDL CMS', email: 'cms@civicdatalab.in' });
  assert.equal(sent.message, 'Update bio');
});

test('a client cannot forge the commit author', async () => {
  await call(makeApp(), 'PUT', `${REPO_PREFIX}/contents/x.md`, {
    headers: { authorization: 'Bearer valid' },
    body: { message: 'x', author: { name: 'Fake', email: 'fake@evil.test' } },
  });

  const sent = JSON.parse(captured.init.body);
  assert.equal(sent.author.email, EDITOR.email, 'proxy must override client-supplied author');
});

test('blocks allowlist violations even with a valid token', async () => {
  for (const [method, path] of [
    ['PUT', '/collaborators/attacker'],
    ['POST', '/hooks'],
    ['GET', '/actions/secrets'],
  ]) {
    const res = await call(makeApp(), method, `${REPO_PREFIX}${path}`, {
      headers: { authorization: 'Bearer valid' },
      ...(method !== 'GET' ? { body: {} } : {}),
    });
    assert.equal(res.status, 403, `${method} ${path} should be refused`);
    assert.equal(res.json.error, 'forbidden_path');
    assert.equal(captured, null, `${method} ${path} must not reach GitHub`);
  }
});

test('pins writes to the configured repo regardless of the path given', async () => {
  // Decap builds the /repos/{owner}/{repo} prefix itself. A tampered client
  // could name someone else's repo; we must ignore it.
  await call(
    makeApp(),
    'PUT',
    '/github/repos/attacker/evil-repo/contents/x.md',
    { headers: { authorization: 'Bearer valid' }, body: { message: 'x' } }
  );
  assert.ok(
    captured.url.startsWith(
      'https://api.github.test/repos/CivicDataLab/civicdatalab.github.io/'
    ),
    `expected the configured repo, got ${captured.url}`
  );
});

test('preserves query strings when forwarding', async () => {
  await call(makeApp(), 'GET', `${REPO_PREFIX}/contents/x.md?ref=main`, {
    headers: { authorization: 'Bearer valid' },
  });
  assert.ok(captured.url.endsWith('/contents/x.md?ref=main'), captured.url);
});

test('health endpoint is open and leaks no secrets', async () => {
  const res = await call(makeApp(), 'GET', '/healthz');
  assert.equal(res.status, 200);
  assert.equal(res.json.status, 'ok');
  const serialised = JSON.stringify(res.json);
  assert.ok(!serialised.includes('PRIVATE KEY'));
  assert.ok(!serialised.includes('ghs_'));
});

test('CORS is granted to the configured origin only', async () => {
  const good = await call(makeApp(), 'OPTIONS', `${REPO_PREFIX}/contents/x.md`, {
    headers: { origin: 'https://civicdatalab.in' },
  });
  assert.equal(good.status, 204);
  assert.equal(good.headers.get('access-control-allow-origin'), 'https://civicdatalab.in');

  const bad = await call(makeApp(), 'OPTIONS', `${REPO_PREFIX}/contents/x.md`, {
    headers: { origin: 'https://evil.test' },
  });
  assert.equal(bad.headers.get('access-control-allow-origin'), null);
});

test('reports push access on the repo root so Decaps write-access gate passes', async () => {
  // GitHub returns all-false permissions for installation tokens; Decap gates
  // its entire UI on permissions.push, so the proxy answers this itself.
  captured = null;
  const fetchImpl = async (url, init) => {
    captured = { url, init };
    return new Response(
      JSON.stringify({
        full_name: 'CivicDataLab/civicdatalab.github.io',
        permissions: { admin: false, maintain: false, push: false, triage: false, pull: false },
      }),
      { status: 200, headers: { 'content-type': 'application/json', etag: 'W/"stale"' } }
    );
  };
  const app = createApp(cfg, {
    verify: async () => ({ claims: {}, actor: EDITOR }),
    tokenProvider: { getToken: async () => 'ghs_x', _peek: () => null },
    fetchImpl,
  });

  const res = await call(app, 'GET', REPO_PREFIX, {
    headers: { authorization: 'token valid' },
  });

  assert.equal(res.status, 200);
  assert.equal(res.json.permissions.push, true, 'push must be reported true');
  assert.equal(res.json.permissions.pull, true);
  // Everything else about the repo is relayed untouched.
  assert.equal(res.json.full_name, 'CivicDataLab/civicdatalab.github.io');
  // GitHub's etag described the original body, so relaying it would be wrong.
  // Express computes a fresh one over what we actually send, which is fine.
  assert.notEqual(res.headers.get('etag'), 'W/"stale"');
});

test('does not rewrite permissions on any other path', async () => {
  captured = null;
  const fetchImpl = async () =>
    new Response(JSON.stringify({ permissions: { push: false } }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  const app = createApp(cfg, {
    verify: async () => ({ claims: {}, actor: EDITOR }),
    tokenProvider: { getToken: async () => 'ghs_x', _peek: () => null },
    fetchImpl,
  });

  const res = await call(app, 'GET', `${REPO_PREFIX}/contents/x.md`, {
    headers: { authorization: 'token valid' },
  });
  assert.equal(res.json.permissions.push, false, 'only the repo root is rewritten');
});
