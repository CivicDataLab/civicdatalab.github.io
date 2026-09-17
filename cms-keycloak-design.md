# Design: Keycloak auth for the CMS

**Status: built and verified end to end (2026-08-25); not yet deployed.** The
implementation is [`cms-auth-proxy/`](cms-auth-proxy/). What remains is
infrastructure — a host, TLS, DNS, and an org-owned GitHub App — not code. See
`cms-strategy.md` for the overall plan and current status.

This document records the design and the reasoning behind it, including
approaches that were considered and rejected. Sections marked *superseded* are
kept deliberately: they explain why the current shape is what it is, so the same
ground is not re-covered later.

## Goals

All three of these came from CDL and this design targets all three:

1. **Editors don't need GitHub accounts.** Comms/programs staff log in with their existing CDL credentials.
2. **Reuse the existing Keycloak instance.** No new identity system.
3. **Centralized access control.** Offboarding someone in Keycloak revokes CMS access immediately, in one place.

## What changes vs. the GitHub OAuth proxy plan

| | GitHub OAuth proxy (`cms-strategy.md`) | Keycloak + GitHub App (this doc) |
|---|---|---|
| Editor needs GitHub account | Yes, with org write access | No |
| Identity source | GitHub | Keycloak (already running) |
| Offboarding | Remove from GitHub org | Disable in Keycloak |
| GitHub credential | Per-user OAuth token | One GitHub App installation token, server-side |
| Commit attribution | Native, per-user | Per-user, via injected `author` field |
| New infra | OAuth proxy + `cms-auth.civicdatalab.in` | Auth proxy + `cms-auth.civicdatalab.in` + Keycloak client |
| Custom code to maintain | None (off-the-shelf proxy) | ~200-line proxy + ~100-line Decap backend |
| Effort | ~half a day | ~2–4 days |

The infra footprint is comparable. The real cost is **custom code you now own and must maintain across Decap upgrades.**

## Architecture

```
Editor browser
   │
   ▼
civicdatalab.in/admin/          ← Decap + small custom backend (static, still on GH Pages)
   │  "Login" → Keycloak OIDC (PKCE)
   ▼
Keycloak (existing)             ← CDL credentials; issues a short-lived JWT
   │  JWT returned to browser
   ▼
cms-auth.civicdatalab.in            ← auth proxy on existing EC2
   │  1. validate JWT against Keycloak JWKS
   │  2. check group/role claim (e.g. cms-editors)
   │  3. swap Authorization header for GitHub App installation token
   │  4. inject author={name,email} from JWT claims on write calls
   ▼
api.github.com                  ← commits/PRs land as the real editor, committed by the App
   │
   ▼
gh-pages.yml → civicdatalab.in (GitHub Pages)
```

Note `/admin/` **stays on GitHub Pages**. An unauthenticated visitor can load the page but every API call fails JWT validation, so there is nothing to gain. Putting oauth2-proxy in front of `/admin/` as well is possible defense-in-depth, but it would require moving those two static files off Pages and is not necessary to meet goal 3.

## The three pieces to build

### 1. GitHub App (replaces the OAuth App)

Create a GitHub App on the CivicDataLab org, installed **only** on `civicdatalab.github.io`:

- Permissions: `Contents: Read & write`, `Pull requests: Read & write`, and **`Issues: Read & write`** — see the endpoint audit below; `editorial_workflow` tracks draft status using PR *labels*, which GitHub exposes under the issues API.
- No user-facing OAuth callback — this App never authenticates end users.
- Store the App ID + private key on the EC2 box (`chmod 600`, ideally SSM Parameter Store).

**Verify at setup:** GitHub Apps may cover PR labels under `Pull requests` rather than `Issues`. Grant `Issues` only if labelling fails without it — start narrow.

The proxy mints a fresh installation token (~1 hr TTL) and refreshes on expiry. Installation tokens are repo-scoped, short-lived, and auditable — strictly better than a PAT.

### 2. Auth proxy (Node/Express on the existing EC2)

Roughly 200 lines. Responsibilities:

1. **Validate** the incoming Keycloak JWT against the realm's JWKS endpoint (cache the keys; verify `iss`, `aud`, `exp`, signature).
2. **Authorize** — require a `cms-editors` group or realm role claim. This is the offboarding lever: remove the group in Keycloak, access dies at the next token refresh.
3. **Translate** — replace `Authorization: Bearer <keycloak-jwt>` with `Authorization: token <github-app-installation-token>`.
4. **Inject attribution** — on `PUT /repos/.../contents/...` (and commit-creating calls), set
   `author: { name: <jwt.name>, email: <jwt.email> }` so git history shows the real editor.
5. **Forward** to `api.github.com` and stream the response back.

This is a reverse proxy with header translation, **not** a reimplementation of the GitHub API. Everything is pass-through.

#### Endpoint audit (done — extracted from the Decap 3.x bundle)

The GitHub backend touches exactly these paths under `/repos/{owner}/{repo}`. This doubles as the proxy's allowlist:

| Path | Used for |
|---|---|
| `/contents`, `/contents/{path}` | read/write entry files |
| `/branches`, `/branches/{branch}` | branch lookup |
| `/commits` | history |
| `/git/blobs`, `/git/trees`, `/git/commits` | media uploads + metadata tree writes |
| `/git/refs`, `/git/refs/{type}/{name}` | branch refs |
| `/git/refs/heads/cms/{slug}` | `editorial_workflow` draft branches |
| `/git/refs/meta/_decap_cms` | **see note below** |
| `/pulls`, `/pulls/{n}`, `/pulls/{n}/commits`, `/pulls/{n}/merge` | `editorial_workflow` PRs |
| `/issues/{n}/labels`, `/issues/{n}/comments`, `/issues/comments/{id}` | draft status tracking |
| `/compare`, `/statuses` | diffs; deploy-preview status |

Two consequences worth knowing before committing to this design:

1. **Decap writes a custom git ref, `refs/meta/_decap_cms`.** On first use it creates a blob, a tree, and a commit, then points that ref at them — a small parallel history for editorial-workflow metadata. It's harmless and invisible to normal `git log`, but it means the proxy must forward **writes** to `/git/blobs`, `/git/trees`, `/git/commits`, and `/git/refs`, not just reads. Anyone auditing the repo will eventually notice the ref.
2. **`/statuses` is only used for deploy previews**, which are explicitly out of scope. That call is wrapped in a try/catch that returns `null`, so the proxy can simply not implement it.

**Still to verify during build:** that author injection lands correctly on *every* write path, not just `/contents` — the `/git/commits` path used for media and metadata takes its own author object.

### 3. ~~Custom Decap backend~~ — NOT NEEDED (revised 2026-08-25)

**Superseded.** The original plan called for a custom backend subclassing Decap internals. Tracing what the **stock** `github` backend actually requires shows every extension point we need is plain configuration. This section is kept below only as a record of the discarded approach.

The stock backend needs exactly five things, all satisfiable without touching Decap:

| Requirement | Mechanism | Custom code |
|---|---|---|
| Send login somewhere other than GitHub | `base_url` + `auth_endpoint` in `config.yml` | none |
| Accept a Keycloak token | the Netlify popup protocol treats the token as **opaque** — Decap never validates it is a GitHub token | none |
| Route API calls at the proxy | `api_root` in `config.yml` | none |
| Satisfy `hasWriteAccess()` | it is just `GET /repos/{owner}/{repo}` reading `permissions.push`, already allowlisted | none |
| Render the logged-in user | `GET /user`, which the proxy synthesises from JWT claims | none |

So `config.yml` stays on the stock backend:

```yaml
backend:
  name: github
  repo: CivicDataLab/civicdatalab.github.io
  branch: main
  base_url: https://cms-auth.civicdatalab.in
  auth_endpoint: auth
  api_root: https://cms-auth.civicdatalab.in/github
```

and the proxy grows three endpoints instead: `/auth`, `/callback`, `/github/user`.

**Two consequences, both improvements:**

1. **The Decap-upgrade fragility is gone.** Nothing subclasses Decap internals any more, so there is no private API to break. The version no longer needs pinning for safety.
2. **Auth gets stronger, and the client requirements change.** The OIDC code exchange now happens **server-side inside the proxy**, not in the browser. The browser never participates in the OIDC flow — it only receives an opaque token via the popup handshake. A **confidential** Keycloak client is therefore fine, and preferable to a public one.

**Correction to the earlier client analysis.** Point 2 invalidates the claim that `dataspace` was unusable because "a SPA cannot hold a client secret" — the proxy is a server and can. The remaining arguments for a dedicated client are still valid but are preferences, not blockers:

- adding a `/callback` redirect URI to `dataspace` still widens it for every product using it
- `aud`/`azp` would read `dataspace`, so tokens minted for other products stay indistinguishable from CMS tokens, leaving `cms-editors` as the sole gate
- a dedicated client gives separate login/session audit records

A dedicated **confidential** client `civicdatalab-cms` remains the recommendation, but reuse is no longer technically impossible.

### Discarded approach: custom Decap backend (retained for context)

Decap has no Keycloak/OIDC backend — the registered set is `github`, `gitlab`, `bitbucket`, `gitea`, `forgejo`, `azure`, `git-gateway`, `aws-cognito-github-proxy`, `proxy`, `test-repo`.

However, **`aws-cognito-github-proxy` is precisely this pattern** (external IdP in front, GitHub API behind) and is implemented as a thin subclass of the GitHub backend that sets:

```js
this.bypassWriteAccessCheckForAppTokens = true;  // token isn't tied to the logged-in user
this.tokenKeyword = "Bearer";
```

So the work is: register a `keycloak-github-proxy` backend that mirrors that class, swapping the auth component for a Keycloak OIDC PKCE flow. `config.yml` then becomes:

```yaml
backend:
  name: keycloak-github-proxy
  repo: CivicDataLab/civicdatalab.github.io
  branch: main
  api_root: https://cms-auth.civicdatalab.in/github
  # plus Keycloak realm/client/authority settings
```

All 12 collection definitions stay untouched.

**Risk:** this is the piece that can break on a Decap major upgrade, since it subclasses internals rather than using a public extension point. Pin the Decap version (`decap-cms@3.x.x` exactly, not `^3.0.0`) and re-test on upgrade.

## Keycloak configuration

**Realm: `DataSpace`** — the existing realm all CDL products already use. No new realm. Editors are already in it.

- OIDC client `civicdatalab-cms` in the `DataSpace` realm (see **Client: reuse vs. dedicated** below).
- Public client, **PKCE required**, standard flow on.
- Valid redirect URIs: `https://civicdatalab.in/admin/*` (and `http://localhost:8000/admin/*` for dev).
- Web origins set for CORS against `cms-auth.civicdatalab.in`.
- Create a `cms-editors` group; add editors. **This group is the access-control surface for goal 3.**
- Confirm the `profile` and `email` client scopes are assigned so `name`/`email` reach the token.

### Client: reuse was investigated and is not possible

**Resolved 2026-08-25 by inspecting the live realm.** Reuse was the preferred option; the realm config rules it out.

The `DataSpace` realm contains 7 clients, 6 of which are Keycloak built-ins (`account`, `account-console`, `admin-cli`, `broker`, `realm-management`, `security-admin-console`). There is exactly **one** application client:

```
clientId : dataspace
public   : false      <- confidential, authenticates with a client secret
stdFlow  : true
pkce     : not set
redirects: *
origins  : *
```

It cannot host the CMS login: a confidential client authenticates with a secret, and the CMS is a browser SPA, so that secret would have to ship inside public JavaScript. At that point it is not a secret and the flow is forgeable by anyone who reads it. Converting `dataspace` to a public client is not an option either — it would break the existing application and *weaken* a server-side client that is correctly confidential today.

**Therefore: create a dedicated public client `civicdatalab-cms` in the existing `DataSpace` realm.** This does not create a realm, a server, or anything to operate — it is one config record. Existing products and the `dataspace` client are untouched.

Because the client is now dedicated, the `aud` claim **does** meaningfully identify CMS tokens, so the proxy should validate it in addition to the `cms-editors` group check. The shared-client caveat below no longer applies, and is kept only as a record of why.

> **Unrelated security finding, worth a separate ticket.** The `dataspace` client has `redirectUris: ["*"]` and `webOrigins: ["*"]`. Wildcard redirect URIs are a known vulnerability pattern: an authorization request carrying an attacker-controlled `redirect_uri` can deliver the authorization code to the attacker. This predates and is independent of the CMS work, but it is live. Raise with whoever owns that client.

### Original analysis: reuse vs. dedicated (retained for context)

A Keycloak client is a **config record, not a running service** — it costs nothing to operate, needs no deployment, and doesn't add to the infra footprint. The sprawl worth avoiding is realms and servers, not clients.

**Recommendation: a dedicated `civicdatalab-cms` client**, for three reasons:

1. **Blast radius.** Adding the CMS's redirect URIs and web origins to a shared client widens that client's accepted-redirect surface for every other product using it. A misconfiguration while tuning the CMS could break an unrelated CDL product.
2. **Authorization boundary.** The proxy would normally validate the token's `aud` claim to confirm it was minted for the CMS. On a shared client, a token issued for any other product is indistinguishable from a CMS token — so anyone who can log into that product holds a token the CMS proxy would structurally accept. Access control then rests **entirely** on the `cms-editors` group check, with no second line of defence.
3. **Auditability.** Separate client = separate session and login records for CMS access.

**If a shared client is still preferred**, it is workable, but these must hold — verify before committing to it:

- The existing client is **public** (no client secret) with **standard flow** enabled. A confidential or bearer-only client cannot drive a browser SPA login and is a hard blocker.
- **PKCE** is enabled, or can be enabled without breaking existing consumers.
- The `profile` and `email` client scopes are assigned.
- Its redirect URIs can accept `https://civicdatalab.in/admin/*` without loosening anything else.

And the proxy must then treat the `cms-editors` group/role as the sole authorization gate, since `aud` no longer distinguishes the CMS.

## Local development

Local development runs the **same** path as production: the proxy on localhost, with `base_url`/`api_root` pointed at it. Decap's `local_backend` option is deliberately not used - on localhost it makes Decap prefer its own git proxy and bypass this service entirely, so a local test would exercise none of the real auth path.

## Trade-offs / open risks

- **Custom code ownership.** Two components with no upstream support. The vanilla OAuth proxy has none of this.
- **Decap upgrade fragility.** The custom backend subclasses internals. Pin the version.
- **Single point of failure widens.** Previously EC2 down = can't log in. Now EC2 down = can't log in *and* can't commit. Same box, but more surface.
- **Keycloak becomes production-critical for the CMS.** If it already is for other CDL services, this is fine.
- **App token is broad.** Any authenticated `cms-editors` member can, in principle, drive any write the App is permitted. Mitigate by scoping App permissions tightly and keeping `editorial_workflow` so changes land as reviewable PRs.
- **Attribution depends on JWT claims being accurate.** If Keycloak emails don't match GitHub accounts, commits will show unlinked authors in the GitHub UI. Cosmetic, but worth setting expectations.

## Recommendation

Two sane paths:

**A. Ship the vanilla GitHub OAuth proxy first, migrate later.** Get editors working in days rather than weeks. The `config.yml` collections and all content fixes are identical either way, so this is not throwaway work — only the `backend:` block and the auth infra change. Downside: editors need GitHub accounts in the interim, and you'd onboard them twice.

**B. Go straight to Keycloak.** Correct end state, no double onboarding, no interim GitHub org invites. Costs ~2–4 days before anyone can use the CMS, and it front-loads the custom-code risk.

**B is the better fit given all three goals are firm** — particularly because goal 1 (editors lacking GitHub accounts) makes path A's interim state actively painful: you'd be creating GitHub org memberships you intend to delete.

## Before building — status

| # | Item | Status |
|---|---|---|
| 1 | Keycloak base URL | ✅ `https://opub-kc.civicdatalab.in/auth` — legacy Keycloak (≤16), serves under `/auth` |
| 1b | Realm | ✅ `DataSpace` (case-sensitive; `dataspace` 404s) — no new realm |
| 1c | Dedicated vs. shared OIDC client | ✅ resolved — **must be dedicated**; the only app client is confidential and unusable for a SPA |
| 1d | Keycloak version / support status | ✅ resolved — modern Keycloak (19+, new admin console) run with `--http-relative-path=/auth`; earlier EOL concern was wrong |
| 2 | Editors already in Keycloak | ✅ confirmed — already there |
| 3 | Keycloak issues `name` + `email` claims | ✅ confirmed — editor records have Email, First name, Last name populated |
| 4 | GitHub App creation rights on the org | ✅ Saqib can create |
| 5 | Target EC2 box identified + deploy access | ❓ open — is a specific instance provisioned, who has SSH, what else runs on it |
| 6 | Decap GitHub API endpoint surface | ✅ done — see endpoint audit above |

Item 5 is now the only true blocker for deployment work; the proxy itself can be built and unit-tested against a mock without it.

### Verified endpoints (from the live realm)

```
issuer      https://opub-kc.civicdatalab.in/auth/realms/DataSpace
authorize   .../auth/realms/DataSpace/protocol/openid-connect/auth
token       .../auth/realms/DataSpace/protocol/openid-connect/token
jwks_uri    .../auth/realms/DataSpace/protocol/openid-connect/certs
```

The proxy validates incoming tokens against that `jwks_uri` and requires `iss` to match that `issuer` exactly.

### Keycloak version — concern withdrawn

An earlier revision of this document flagged the `/auth` path prefix as evidence
of Keycloak ≤16 (past end-of-life, unpatched) and recommended agreeing an
upgrade path before rollout.

**That was wrong.** The admin console serves `resources/.../admin/keycloak.v2`
and titles itself "Keycloak Administration UI", both of which indicate the
modern console shipped with Keycloak 19+. The `/auth` prefix is a backwards
compatibility setting (`--http-relative-path=/auth`), not a version signal.

No upgrade is needed, and the risk noted previously does not apply.

