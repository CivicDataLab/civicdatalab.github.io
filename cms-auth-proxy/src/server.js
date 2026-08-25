#!/usr/bin/env node
/**
 * Entry point. Loads config, fails loudly if it is incomplete, and serves.
 */

import { loadConfig } from './config.js';
import { createApp } from './app.js';

let cfg;
try {
  cfg = loadConfig();
} catch (err) {
  console.error('\nConfiguration error:\n  ' + err.message + '\n');
  process.exit(1);
}

const app = createApp(cfg);

const server = app.listen(cfg.port, () => {
  console.log(`cms-auth-proxy listening on :${cfg.port}`);
  console.log(`  repo    ${cfg.github.repo}`);
  console.log(`  issuer  ${cfg.keycloak.issuer}`);
  console.log(`  client  ${cfg.keycloak.clientId}`);
  console.log(`  role    ${cfg.keycloak.requiredRole}`);
  console.log(`  origins ${cfg.allowedOrigins.join(', ')}`);
});

for (const sig of ['SIGTERM', 'SIGINT']) {
  process.on(sig, () => {
    console.log(`\n${sig} received, shutting down`);
    server.close(() => process.exit(0));
    // Don't hang forever on lingering keep-alive sockets.
    setTimeout(() => process.exit(0), 10_000).unref();
  });
}
