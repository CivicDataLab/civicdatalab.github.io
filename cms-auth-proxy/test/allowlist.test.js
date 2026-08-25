import { test } from 'node:test';
import assert from 'node:assert/strict';
import { checkAllowed } from '../src/allowlist.js';

test('allows the paths Decap actually calls', () => {
  const allowed = [
    ['GET', '/contents/content/team/priya/index.md'],
    ['PUT', '/contents/content/team/priya/index.md'],
    ['DELETE', '/contents/content/team/old/index.md'],
    ['GET', '/branches/main'],
    ['GET', '/commits'],
    ['POST', '/git/blobs'],
    ['POST', '/git/trees'],
    ['POST', '/git/commits'],
    ['GET', '/git/refs/heads/cms/new-post'],
    ['POST', '/git/refs'],
    ['PATCH', '/git/refs/heads/cms/new-post'],
    ['DELETE', '/git/refs/heads/cms/new-post'],
    ['GET', '/git/refs/meta/_decap_cms'],
    ['POST', '/pulls'],
    ['GET', '/pulls/42'],
    ['PUT', '/pulls/42/merge'],
    ['POST', '/issues/42/labels'],
    ['GET', '/compare/main...cms/new-post'],
    ['GET', ''],
  ];
  for (const [method, path] of allowed) {
    const r = checkAllowed(method, path);
    assert.equal(r.allowed, true, `expected ${method} ${path} to be allowed: ${r.reason}`);
  }
});

test('refuses paths outside the CMS surface', () => {
  const denied = [
    ['GET', '/collaborators'],
    ['PUT', '/collaborators/attacker'],
    ['DELETE', '/'],           // repo deletion
    ['POST', '/hooks'],        // webhook creation
    ['GET', '/actions/secrets'],
    ['PUT', '/actions/secrets/DEPLOY_KEY'],
    ['POST', '/forks'],
    ['GET', '/keys'],
    ['PATCH', '/'],            // repo settings
  ];
  for (const [method, path] of denied) {
    const r = checkAllowed(method, path);
    assert.equal(r.allowed, false, `expected ${method} ${path} to be denied`);
  }
});

test('enforces method as well as path', () => {
  // Reading branches is fine; creating one via this path is not.
  assert.equal(checkAllowed('GET', '/branches/main').allowed, true);
  assert.equal(checkAllowed('DELETE', '/branches/main').allowed, false);
  // History is read-only.
  assert.equal(checkAllowed('POST', '/commits').allowed, false);
});

test('ignores query strings and trailing slashes when matching', () => {
  assert.equal(checkAllowed('GET', '/contents/x.md?ref=main').allowed, true);
  assert.equal(checkAllowed('GET', '/branches/main/').allowed, true);
});

test('denial explains why', () => {
  const r = checkAllowed('DELETE', '/commits');
  assert.equal(r.allowed, false);
  assert.match(r.reason, /method DELETE not permitted/);
});
