import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadConfig } from '../src/config.js';

const KEY = '-----BEGIN PRIVATE KEY-----\nMIIfake\n-----END PRIVATE KEY-----';

const base = {
  KEYCLOAK_ISSUER: 'https://kc.test/auth/realms/DataSpace',
  KEYCLOAK_CLIENT_ID: 'civicdatalab-cms',
  GITHUB_APP_ID: '123',
  GITHUB_APP_PRIVATE_KEY: KEY,
  GITHUB_INSTALLATION_ID: '456',
  GITHUB_REPO: 'CivicDataLab/civicdatalab.github.io',
};

function withEnv(extra, fn) {
  const saved = { ...process.env };
  try {
    for (const k of Object.keys(process.env)) {
      if (k.startsWith('KEYCLOAK_') || k.startsWith('GITHUB_')) delete process.env[k];
    }
    Object.assign(process.env, base, extra);
    return fn();
  } finally {
    for (const k of Object.keys(process.env)) delete process.env[k];
    Object.assign(process.env, saved);
  }
}

test('derives the JWKS URI from the issuer', () => {
  withEnv({}, () => {
    const cfg = loadConfig();
    assert.equal(
      cfg.keycloak.jwksUri,
      'https://kc.test/auth/realms/DataSpace/protocol/openid-connect/certs'
    );
  });
});

test('strips a trailing slash from the issuer', () => {
  withEnv({ KEYCLOAK_ISSUER: 'https://kc.test/auth/realms/DataSpace/' }, () => {
    const cfg = loadConfig();
    assert.equal(cfg.keycloak.issuer, 'https://kc.test/auth/realms/DataSpace');
    assert.ok(!cfg.keycloak.jwksUri.includes('//protocol'));
  });
});

test('restores escaped newlines in the PEM key', () => {
  withEnv(
    { GITHUB_APP_PRIVATE_KEY: '-----BEGIN PRIVATE KEY-----\\nMIIfake\\n-----END PRIVATE KEY-----' },
    () => {
      const cfg = loadConfig();
      assert.ok(cfg.github.privateKey.includes('\n'));
      assert.ok(!cfg.github.privateKey.includes('\\n'));
    }
  );
});

test('committer identity is optional and wired through', () => {
  withEnv({}, () => {
    const cfg = loadConfig();
    assert.equal(cfg.github.committerName, undefined);
  });
  withEnv({ GITHUB_COMMITTER_NAME: 'CDL CMS', GITHUB_COMMITTER_EMAIL: 'cms@civicdatalab.in' }, () => {
    const cfg = loadConfig();
    assert.equal(cfg.github.committerName, 'CDL CMS');
    assert.equal(cfg.github.committerEmail, 'cms@civicdatalab.in');
  });
});

test('rejects incomplete or malformed config', () => {
  assert.throws(() => withEnv({ KEYCLOAK_ISSUER: '' }, loadConfig), /Missing required/);
  assert.throws(() => withEnv({ GITHUB_REPO: 'nope' }, loadConfig), /owner\/name/);
  assert.throws(() => withEnv({ GITHUB_APP_PRIVATE_KEY: 'xyz' }, loadConfig), /PEM private key/);
});

test('accepts additional issuers for a Keycloak hostname change', () => {
  withEnv({}, () => {
    const cfg = loadConfig();
    assert.deepEqual(cfg.keycloak.acceptedIssuers, ['https://kc.test/auth/realms/DataSpace']);
  });

  withEnv(
    { KEYCLOAK_ADDITIONAL_ISSUERS: 'https://old.test/auth/realms/DataSpace/, https://older.test/realms/DataSpace' },
    () => {
      const cfg = loadConfig();
      assert.deepEqual(cfg.keycloak.acceptedIssuers, [
        'https://kc.test/auth/realms/DataSpace',
        'https://old.test/auth/realms/DataSpace',   // trailing slash trimmed
        'https://older.test/realms/DataSpace',
      ]);
      // The primary issuer stays authoritative for deriving endpoints.
      assert.equal(cfg.keycloak.issuer, 'https://kc.test/auth/realms/DataSpace');
      assert.ok(cfg.keycloak.jwksUri.startsWith('https://kc.test/'));
    }
  );
});
