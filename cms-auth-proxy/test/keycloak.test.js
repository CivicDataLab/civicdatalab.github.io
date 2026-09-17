import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  bearerFrom,
  extractGrants,
  hasRequiredGrant,
  audienceMatches,
} from '../src/keycloak.js';

test('parses bearer tokens, rejects malformed headers', () => {
  assert.equal(bearerFrom('Bearer abc.def.ghi'), 'abc.def.ghi');
  assert.equal(bearerFrom('bearer abc'), 'abc'); // case-insensitive
  assert.equal(bearerFrom('  Bearer   abc  '), 'abc');

  // Decap's stock github backend sends `token <t>`, not `Bearer <t>`.
  assert.equal(bearerFrom('token abc.def.ghi'), 'abc.def.ghi');
  assert.equal(bearerFrom('Token abc'), 'abc');

  assert.equal(bearerFrom(undefined), null);
  assert.equal(bearerFrom(''), null);
  assert.equal(bearerFrom('abc'), null);
  assert.equal(bearerFrom('Basic abc'), null);
});

test('finds the grant in whichever claim Keycloak populated', () => {
  const clientId = 'civicdatalab-cms';

  const viaRealmRole = { realm_access: { roles: ['cms-editors', 'offline_access'] } };
  assert.equal(hasRequiredGrant(viaRealmRole, clientId, 'cms-editors'), true);

  const viaClientRole = {
    resource_access: { 'civicdatalab-cms': { roles: ['cms-editors'] } },
  };
  assert.equal(hasRequiredGrant(viaClientRole, clientId, 'cms-editors'), true);

  const viaGroup = { groups: ['/cms-editors'] }; // Keycloak emits group paths
  assert.equal(hasRequiredGrant(viaGroup, clientId, 'cms-editors'), true);
});

test('denies when the grant is absent or belongs to another client', () => {
  const clientId = 'civicdatalab-cms';

  assert.equal(hasRequiredGrant({}, clientId, 'cms-editors'), false);
  assert.equal(
    hasRequiredGrant({ realm_access: { roles: ['default-roles'] } }, clientId, 'cms-editors'),
    false
  );
  // A cms-editors role scoped to a *different* client must not grant access.
  assert.equal(
    hasRequiredGrant(
      { resource_access: { 'some-other-app': { roles: ['cms-editors'] } } },
      clientId,
      'cms-editors'
    ),
    false
  );
});

test('extractGrants normalises group paths and tolerates missing claims', () => {
  const g = extractGrants({ groups: ['/cms-editors', '/staff'] }, 'x');
  assert.deepEqual(g.groups, ['cms-editors', 'staff']);

  const empty = extractGrants({}, 'x');
  assert.deepEqual(empty, { realmRoles: [], clientRoles: [], groups: [] });
});

test('audience accepts aud, and azp only when enabled', () => {
  const clientId = 'civicdatalab-cms';

  // Explicit audience (what an audience mapper gives you) - strongest.
  assert.deepEqual(audienceMatches({ aud: clientId }, clientId, false), {
    ok: true,
    via: 'aud',
  });
  assert.deepEqual(audienceMatches({ aud: ['account', clientId] }, clientId, false), {
    ok: true,
    via: 'aud',
  });

  // Keycloak's default shape: aud=account, azp=<client>.
  const defaultShape = { aud: 'account', azp: clientId };
  assert.deepEqual(audienceMatches(defaultShape, clientId, true), { ok: true, via: 'azp' });
  assert.deepEqual(audienceMatches(defaultShape, clientId, false), { ok: false, via: null });

  // A token minted for another client is refused either way.
  const otherClient = { aud: 'account', azp: 'dataspace' };
  assert.equal(audienceMatches(otherClient, clientId, true).ok, false);
  assert.equal(audienceMatches(otherClient, clientId, false).ok, false);
});
