import { test } from 'node:test';
import assert from 'node:assert/strict';
import { acceptsAuthor, withAttribution } from '../src/attribution.js';

test('identifies commit-creating endpoints', () => {
  assert.equal(acceptsAuthor('PUT', '/contents/content/team/a/index.md'), true);
  assert.equal(acceptsAuthor('DELETE', '/contents/content/team/a/index.md'), true);
  assert.equal(acceptsAuthor('POST', '/git/commits'), true);

  // Reads and non-commit writes must not be rewritten.
  assert.equal(acceptsAuthor('GET', '/contents/x.md'), false);
  assert.equal(acceptsAuthor('POST', '/git/blobs'), false);
  assert.equal(acceptsAuthor('POST', '/git/trees'), false);
  assert.equal(acceptsAuthor('POST', '/pulls'), false);
  assert.equal(acceptsAuthor('POST', '/issues/1/labels'), false);
});

test('sets author from the verified Keycloak identity', () => {
  const body = { message: 'Update bio', content: 'aGVsbG8=' };
  const out = withAttribution(body, { name: 'Priya Sharma', email: 'priya@civicdatalab.in' });

  assert.deepEqual(out.author, {
    name: 'Priya Sharma',
    email: 'priya@civicdatalab.in',
  });
  // Original fields survive.
  assert.equal(out.message, 'Update bio');
  assert.equal(out.content, 'aGVsbG8=');
});

test('overrides an author supplied by the client', () => {
  // A client must not be able to forge attribution.
  const body = {
    message: 'x',
    author: { name: 'Someone Else', email: 'attacker@evil.test' },
  };
  const out = withAttribution(body, { name: 'Priya', email: 'priya@civicdatalab.in' });
  assert.equal(out.author.name, 'Priya');
  assert.equal(out.author.email, 'priya@civicdatalab.in');
});

test('does not mutate the input body', () => {
  const body = { message: 'x' };
  const out = withAttribution(body, { name: 'A', email: 'a@b.c' });
  assert.equal(body.author, undefined);
  assert.notEqual(out, body);
});

test('sets committer only when an app identity is configured', () => {
  const actor = { name: 'A', email: 'a@b.c' };

  const without = withAttribution({ message: 'x' }, actor);
  assert.equal(without.committer, undefined);

  const with_ = withAttribution({ message: 'x' }, actor, {
    committerName: 'CDL CMS',
    committerEmail: 'cms@civicdatalab.in',
  });
  assert.deepEqual(with_.committer, {
    name: 'CDL CMS',
    email: 'cms@civicdatalab.in',
  });
});

test('passes through non-object bodies untouched', () => {
  assert.equal(withAttribution(undefined, { name: 'A', email: 'a@b.c' }), undefined);
  assert.equal(withAttribution(null, { name: 'A', email: 'a@b.c' }), null);
  const arr = [1, 2];
  assert.equal(withAttribution(arr, { name: 'A', email: 'a@b.c' }), arr);
});
