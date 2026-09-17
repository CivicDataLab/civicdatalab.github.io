#!/usr/bin/env bash
# Zero-setup smoke test.
#
# Boots the proxy with throwaway config and exercises every endpoint that can
# be reached without a real Keycloak or GitHub App. Proves the service starts,
# routes correctly, and refuses everything it should refuse.
#
# Usage:  npm run smoke
# Needs:  openssl, curl. (jq optional - output is prettier with it.)

set -uo pipefail
cd "$(dirname "$0")/.."

PORT="${SMOKE_PORT:-3997}"
PASS=0
FAIL=0

green() { printf '\033[32m%s\033[0m' "$1"; }
red()   { printf '\033[31m%s\033[0m' "$1"; }

check() { # check <description> <expected> <actual>
  if [ "$2" = "$3" ]; then
    printf '  %s %s\n' "$(green ✓)" "$1"; PASS=$((PASS+1))
  else
    printf '  %s %s (expected %s, got %s)\n' "$(red ✗)" "$1" "$2" "$3"; FAIL=$((FAIL+1))
  fi
}

contains() { # contains <description> <needle> <haystack>
  if printf '%s' "$3" | grep -q -- "$2"; then
    printf '  %s %s\n' "$(green ✓)" "$1"; PASS=$((PASS+1))
  else
    printf '  %s %s (missing: %s)\n' "$(red ✗)" "$1" "$2"; FAIL=$((FAIL+1))
  fi
}

KEY=$(mktemp /tmp/smoke-key.XXXXXX.pem)
LOG=$(mktemp /tmp/smoke-log.XXXXXX)
cleanup() {
  [ -n "${SRV_PID:-}" ] && kill "$SRV_PID" 2>/dev/null
  rm -f "$KEY" "$LOG"
}
trap cleanup EXIT

echo "==> generating a throwaway RSA key (never leaves this machine)"
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out "$KEY" 2>/dev/null

echo "==> booting proxy on :$PORT"
KEYCLOAK_ISSUER="https://kc.invalid/auth/realms/DataSpace" \
KEYCLOAK_CLIENT_ID="civicdatalab-cms" \
GITHUB_APP_ID="1" \
GITHUB_APP_PRIVATE_KEY="$(cat "$KEY")" \
GITHUB_INSTALLATION_ID="2" \
GITHUB_REPO="CivicDataLab/civicdatalab.github.io" \
PUBLIC_URL="http://localhost:$PORT" \
CMS_ORIGIN="http://localhost:8000" \
PORT="$PORT" \
node src/server.js > "$LOG" 2>&1 &
SRV_PID=$!

for _ in $(seq 1 25); do
  curl -sf -o /dev/null "http://127.0.0.1:$PORT/healthz" 2>/dev/null && break
  sleep 0.2
done

if ! kill -0 "$SRV_PID" 2>/dev/null; then
  echo "$(red '✗ server failed to start')"; cat "$LOG"; exit 1
fi

B="http://127.0.0.1:$PORT"
code() { curl -s -o /dev/null -w '%{http_code}' "$@"; }

echo
echo "health"
check "GET /healthz is 200" "200" "$(code "$B/healthz")"
HEALTH=$(curl -s "$B/healthz")
contains "reports the configured repo" "civicdatalab.github.io" "$HEALTH"
if printf '%s' "$HEALTH" | grep -q "PRIVATE KEY"; then
  printf '  %s health output leaked the private key\n' "$(red ✗)"; FAIL=$((FAIL+1))
else
  printf '  %s no secrets in health output\n' "$(green ✓)"; PASS=$((PASS+1))
fi

echo
echo "login flow"
check "GET /auth redirects" "302" "$(code "$B/auth?provider=github")"
LOC=$(curl -s -o /dev/null -w '%{redirect_url}' "$B/auth?provider=github")
contains "redirect targets Keycloak's authorize endpoint" "openid-connect/auth" "$LOC"
contains "carries response_type=code" "response_type=code" "$LOC"
contains "carries PKCE challenge (public client)" "code_challenge_method=S256" "$LOC"
contains "redirect_uri points back at this service" "%2Fcallback" "$LOC"
contains "requests the claims attribution needs" "profile" "$LOC"

check "unknown OAuth state is refused" "400" "$(code "$B/callback?code=x&state=forged")"
BODY=$(curl -s "$B/callback?code=x&state=forged")
contains "failure is reported to the opener" ":error:" "$BODY"

echo
echo "authorization"
check "GET /github/user needs a token" "401" "$(code "$B/github/user")"
check "proxy needs a token" "401" \
  "$(code "$B/github/repos/CivicDataLab/civicdatalab.github.io/contents/x.md")"
check "a garbage token is rejected" "401" \
  "$(code -H 'Authorization: token not-a-real-jwt' \
     "$B/github/repos/CivicDataLab/civicdatalab.github.io/contents/x.md")"
check "unknown route is 404" "404" "$(code "$B/wat")"

echo
echo "CORS"
ACAO=$(curl -s -o /dev/null -w '%header{access-control-allow-origin}' \
  -X OPTIONS -H "Origin: http://localhost:8000" "$B/github/user")
check "configured origin is allowed" "http://localhost:8000" "$ACAO"
ACAO_BAD=$(curl -s -o /dev/null -w '%header{access-control-allow-origin}' \
  -X OPTIONS -H "Origin: https://evil.test" "$B/github/user")
check "other origins are not" "" "$ACAO_BAD"

echo
echo "─────────────────────────────────────────"
if [ "$FAIL" -eq 0 ]; then
  echo "$(green "all $PASS checks passed")"
  echo
  echo "This proves the service runs and refuses what it should. It does NOT"
  echo "prove the Keycloak or GitHub integrations work - both were unreachable"
  echo "by design here. See 'Testing' in README.md for those."
  exit 0
else
  echo "$(red "$FAIL failed") / $((PASS+FAIL)) checks"
  echo
  echo "server log:"; sed 's/^/  /' "$LOG"
  exit 1
fi
