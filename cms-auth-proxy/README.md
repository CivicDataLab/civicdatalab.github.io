# cms-auth-proxy

Authenticating proxy sitting between Decap CMS and the GitHub API.

Editors log in with their existing CivicDataLab Keycloak account. This service
validates that token, then talks to GitHub using a **GitHub App installation
token** — so editors never need GitHub accounts, and no GitHub credential ever
reaches the browser.

See [`../cms-keycloak-design.md`](../cms-keycloak-design.md) for the full design
and rationale.

> **Status: built and unit-tested, not yet deployed.** Requires a GitHub App, a
> Keycloak client, and a host — none of which exist yet. See *Still needed*.

## What it does, per request

```
1. verify the Keycloak JWT     signature, iss, aud/azp, exp   -> 401
2. authorize the user          cms-editors role or group      -> 403
3. authorize the path          allowlist from the Decap audit -> 403
4. swap the credential         Keycloak JWT -> GitHub App token
5. attribute the commit        author = the real editor
6. forward to api.github.com   and relay the response
```

The caller's token is **never** forwarded upstream, and the target repository is
pinned by config — a client that asks for `/repos/someone/else` still gets the
configured repo.

## Why an allowlist

Without one, this is a general-purpose authenticated GitHub gateway: anyone in
`cms-editors` could add collaborators, create webhooks, or read Actions secrets.
The allowlist in [`src/allowlist.js`](src/allowlist.js) is derived from auditing
the Decap 3.x bundle for every GitHub path its `github` backend actually calls,
and refuses everything else.

## Commit attribution

Commits are made with the App's token, so without intervention every commit
would be authored by the App. GitHub's API accepts explicit `author`/`committer`
objects on commit-creating calls, so the proxy injects the editor's identity
from their Keycloak claims:

```
Author:    Priya Sharma <priya@civicdatalab.in>   <- from the verified token
Committer: CivicDataLab CMS <cms@civicdatalab.in> <- the App
```

A client-supplied `author` is always overridden — attribution cannot be forged.

**Expected:** these commits show an author name and email but **no linked GitHub
profile** (no avatar, no clickable handle). GitHub only links a commit to a
profile when the author email belongs to a registered GitHub account, and these
editors deliberately have none. This is not a defect.

## Setup

```bash
npm install
cp env.example .env    # then fill it in
npm start              # or: npm run dev  (watch mode)
npm test
```

The process refuses to start on incomplete config rather than failing later on a
live request.

### Keycloak

Needs a client in the `DataSpace` realm. Because the code exchange happens
server-side here, a **confidential** client is fine and preferred — the browser
never touches the OIDC flow, so nothing secret ships to it.

A dedicated `civicdatalab-cms` client is recommended over reusing the existing
`dataspace` one: reuse would mean widening that client's redirect URIs for every
product on it, and its `aud`/`azp` could not distinguish CMS tokens from any
other product's, leaving `cms-editors` as the only gate.

| Setting | Value |
|---|---|
| Client ID | `civicdatalab-cms` |
| Access type | **confidential** preferred (set `KEYCLOAK_CLIENT_SECRET`); public also works, and then uses PKCE |
| Standard flow | on |
| Valid redirect URIs | `https://cms-auth.civicdatalab.in/callback` — this service, **not** the CMS |
| Web origins | not needed; the browser never calls Keycloak directly |
| Client scopes | must include `profile` and `email` |
| Access Token Lifespan | 30–60 min — see *Session length* below |

Then create a `cms-editors` group (or realm role) and add the editors.

**Recommended: add an audience mapper.** By default Keycloak sets `aud` to
`account` and puts the client in `azp`. The proxy accepts `azp`
(`KEYCLOAK_ACCEPT_AZP=true`) and warns once at startup when it does. Adding a
mapper of type *Audience* with `civicdatalab-cms` as the included client
audience lets you set `KEYCLOAK_ACCEPT_AZP=false` for a stronger check.

### GitHub App

Create on the CivicDataLab org, installed **only** on
`CivicDataLab/civicdatalab.github.io`:

- **Contents:** Read & write
- **Pull requests:** Read & write
- **Issues:** Read & write — `editorial_workflow` tracks draft status with PR
  labels, which GitHub exposes under the issues API. Try without this first;
  grant it only if labelling fails.

No callback URL — this App never authenticates end users. Note the App ID and
the installation ID, and keep the private key `chmod 600` (better: SSM Parameter
Store).

### Decap

Stock backend, no custom code:

```yaml
backend:
  name: github
  repo: CivicDataLab/civicdatalab.github.io
  branch: main
  base_url: https://cms-auth.civicdatalab.in   # must equal PUBLIC_URL exactly
  auth_endpoint: auth
  api_root: https://cms-auth.civicdatalab.in/github
```

## Endpoints

| Route | Auth | Purpose |
|---|---|---|
| `GET /healthz` | none | Liveness. Reports config presence, never values. |
| `GET /auth` | none | Starts the login. Decap opens this in a popup. |
| `GET /callback` | none | Keycloak returns here. Exchanges the code, hands the token to the CMS. |
| `GET /github/user` | Keycloak JWT | The signed-in identity, synthesised from token claims. |
| `ALL /github/repos/:owner/:repo/*` | Keycloak JWT | The proxy. `:owner/:repo` is ignored in favour of `GITHUB_REPO`. |

## The login flow

Decap's stock `github` backend is used unmodified. It treats the token it
receives as **opaque** — it never checks that it came from GitHub — which is
what lets a Keycloak token slot in.

```
1. editor clicks Login
2. Decap opens a popup at  <base_url>/auth?provider=github&site_id=…
3. /auth      -> 302 to Keycloak (authorization code; PKCE if public client)
4. editor authenticates with their CDL account
5. Keycloak   -> 302 back to /callback?code=…&state=…
6. /callback  exchanges the code for a token SERVER-SIDE, verifies it carries
              cms-editors, and returns the handshake page
7. popup      posts "authorizing:github", waits for Decap's echo, then posts
              "authorization:github:success:{\"token\":…}"
8. Decap stores the token and sends it as  Authorization: token <jwt>
```

The browser never participates in the OIDC exchange — it is redirected, and
comes back with a code this service redeems over a back channel.

Two details that will waste an afternoon if got wrong:

- **`PUBLIC_URL` must exactly equal `base_url` in `config.yml`.** Decap compares
  the popup's `event.origin` against `base_url` and *silently ignores*
  mismatches. The symptom is a login that hangs with nothing in the console.
  The handshake page shows a message after 12s to make this diagnosable.
- **Ordering.** Decap only starts listening for the token *after* it receives
  the `authorizing:` handshake, so the popup must wait for the echo. Sending
  the token immediately would be dropped.

## Session length — a decision you need to make

The token handed to Decap is the Keycloak **access token**, and this service
verifies it on every request. That is what makes offboarding immediate: remove
someone from `cms-editors` and their next request fails.

The cost is that **the editing session lasts exactly as long as the Keycloak
access token**, because Decap does not refresh tokens. Keycloak's default access
token lifespan is **5 minutes**, which would log editors out mid-edit.

Set *Access Token Lifespan* on the `civicdatalab-cms` client to something
workable — 30–60 minutes is a reasonable balance. Longer sessions widen the
window in which a removed user still has access; shorter ones interrupt work.

If neither end of that trade-off is acceptable, the alternative is a session
layer here (this service issues its own token and holds the Keycloak refresh
token), which restores long sessions *and* fast revocation at the cost of
server-side session state. Not built — say so if it is wanted.

## Testing

Four tiers. The important thing is **tier 3 — you can prove the whole design end
to end on a laptop, before provisioning any server, DNS or TLS.**

### Tier 1 — unit tests (no setup)

```bash
npm test      # 43 tests
```

Keycloak verification and the GitHub API are both faked. Covers the
security-relevant behaviour: unauthenticated requests never reach GitHub, a
valid token without `cms-editors` is refused, the caller's token is never
forwarded, client-supplied authorship is overridden, allowlist violations are
blocked, writes are pinned to the configured repo, OAuth state is single-use,
and tokens cannot break out of the handshake page's `<script>` tag.

### Tier 2 — smoke test (no setup)

```bash
npm run smoke    # 17 checks
```

Boots the real server with a throwaway key and exercises every endpoint
reachable without credentials: health, the `/auth` redirect and its OAuth
parameters, state rejection, that every protected route demands a token, and
CORS. Proves the thing runs and refuses what it should.

### Tier 3 — real Keycloak + real GitHub, all on localhost

Proves the actual integrations. Needs a GitHub App and a Keycloak client, but
**no server, DNS or TLS**.

**1. Keycloak** — create client `civicdatalab-cms` in the `DataSpace` realm:

| Setting | Value for local testing |
|---|---|
| Access type | confidential (note the secret) or public |
| Standard flow | on |
| Valid redirect URIs | `http://localhost:3000/callback` |
| Client scopes | include `profile`, `email` |
| Access Token Lifespan | 30 min while testing |

Add yourself to a `cms-editors` group (or realm role).

**2. GitHub App** — create it, install on the repo, note the App ID,
installation ID and private key. To avoid touching `main` while testing, point
`GITHUB_REPO` at a scratch fork.

**3. Proxy** — `cp env.example .env`, then set:

```bash
PUBLIC_URL=http://localhost:3000
CMS_ORIGIN=http://localhost:8000
KEYCLOAK_ISSUER=https://opub-kc.civicdatalab.in/auth/realms/DataSpace
KEYCLOAK_CLIENT_ID=civicdatalab-cms
KEYCLOAK_CLIENT_SECRET=…        # if confidential
GITHUB_APP_ID=…
GITHUB_INSTALLATION_ID=…
GITHUB_APP_PRIVATE_KEY=…
GITHUB_REPO=…                   # scratch fork while testing
DEBUG=true
```

```bash
npm start
```

**4. CMS** — in `static/admin/config.yml`, temporarily:

```yaml
backend:
  name: github
  repo: …                        # same as GITHUB_REPO
  branch: main
  base_url: http://localhost:3000   # must equal PUBLIC_URL exactly
  auth_endpoint: auth
  api_root: http://localhost:3000/github

# NOTE: local_backend is intentionally absent - see below
```

> **Never add `local_backend: true`.** On localhost Decap prefers its own git
> proxy and never calls this service at all - the CMS would appear to work
> perfectly while testing none of the auth path. It was removed from the
> project's `config.yml` for exactly this reason.

Then `npm run develop` in the site root and open
`http://localhost:8000/admin/index.html`.

**What success looks like:** clicking Login opens a Keycloak page, you sign in
with your CDL account, the popup closes, the CMS loads showing *your* name, and
saving an entry opens a PR on the scratch repo whose commit is authored by you.

### Future: renaming the Keycloak host

`opub-kc.civicdatalab.in` is planned to become `auth.civicdatalab.in`. Two
things follow:

1. **This service must not use `auth.civicdatalab.in`** — that name is reserved
   for Keycloak. It is deployed at `cms-auth.civicdatalab.in` (any distinct
   hostname works; it just cannot share Keycloak's).
2. **The rename changes the `iss` claim**, so tokens minted under the old
   hostname stop validating and every editor is logged out mid-edit. To cut
   over cleanly, list the old issuer alongside the new one for the transition:

   ```bash
   KEYCLOAK_ISSUER=https://auth.civicdatalab.in/realms/DataSpace
   KEYCLOAK_ADDITIONAL_ISSUERS=https://opub-kc.civicdatalab.in/auth/realms/DataSpace
   ```

   Remove the second line once existing tokens have expired (one Access Token
   Lifespan, so 30–60 min). This only works for a *rename of the same
   instance* — the signing keys, and therefore the JWKS, must be unchanged.

Also drop the `/auth` segment if the `--http-relative-path=/auth` compatibility
setting goes away at the same time. Everything else derives from the issuer, so
no other value changes.

### Tier 4 — deployed

Only after tier 3 passes. Same thing with `PUBLIC_URL` and `base_url` set to
`https://cms-auth.civicdatalab.in`, behind TLS.

### Troubleshooting

| Symptom | Cause |
|---|---|
| Login popup hangs, console empty | `PUBLIC_URL` ≠ `base_url`. Decap compares `event.origin` and ignores mismatches. The popup self-reports this after 12s. |
| CMS never calls the proxy on localhost | `local_backend: true` present in `config.yml`. It must not be. |
| `invalid_redirect_uri` from Keycloak | `http://localhost:3000/callback` not registered on the client. |
| Signed in, then 403 `not_authorized` | Not in `cms-editors`, or the claim is not in the token. |
| Logged out after a few minutes | Access Token Lifespan too short — see *Session length*. |
| 403 `forbidden_path` mid-edit | A Decap call the allowlist missed. The message names the path; add it to `src/allowlist.js`. |

## Still needed

1. A GitHub App (org admin).
2. The `civicdatalab-cms` Keycloak client and `cms-editors` group.
3. A host, TLS, and DNS for `cms-auth.civicdatalab.in`.
4. The custom Decap backend (`keycloak-github-proxy`) — see the design doc.
5. Integration testing against the real Keycloak and a real GitHub App.

## Operational notes

- Installation tokens last ~1 hour; the provider refreshes 5 minutes early and
  collapses concurrent refreshes into one request.
- Bind to localhost and put TLS in front (Caddy or nginx). Do not expose the
  Node port directly.
- `DEBUG=true` logs method, path, status, and actor email per request. Leave it
  off in production.
