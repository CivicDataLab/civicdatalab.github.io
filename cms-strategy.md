# CMS for civicdatalab.in

How non-technical staff edit this site, and why it is built the way it is.
For the authentication architecture in detail, see
[`cms-keycloak-design.md`](cms-keycloak-design.md).

## Problem

The site holds roughly **175 content items across 13 collections** — team,
alumni, project partners, values, job openings, work projects across six
sectors, and two event series. All of it is markdown in `content/`.

Most people who need to change that content are comms and programs staff. Until
now the only route was: get a GitHub account, get added to the org, learn enough
git and YAML frontmatter to edit a file by hand, and open a pull request. In
practice that meant content changes queued behind whoever was comfortable doing
it.

## Approach

**Decap CMS** at `/admin/`, backed by **`cms-auth-proxy`**, which authenticates
editors against CivicDataLab's existing **Keycloak** and commits on their behalf
using a **GitHub App**.

```
Editor browser
   │  CDL Keycloak credentials - no GitHub account
   ▼
civicdatalab.in/admin/          Decap CMS, static, on GitHub Pages
   ▼
cms-auth.civicdatalab.in        cms-auth-proxy: verifies the Keycloak token,
   │                            checks cms-editors, swaps in a GitHub App
   │                            token, attributes the commit to the editor
   ▼
api.github.com                  PR opened against main
   ▼
gh-pages.yml → civicdatalab.in
```

**Why this shape:**

- **Editors need no GitHub account.** This was the main obstacle. Identity comes
  from Keycloak, which CDL already runs and where these people already have
  accounts.
- **One place to grant and revoke access.** Membership of the `cms-editors`
  role in Keycloak decides who can edit. Offboarding is the same action as for
  every other CDL product.
- **Hosting is unchanged.** The site stays on GitHub Pages and the existing
  `gh-pages.yml` workflow keeps deploying `main`. No migration.
- **Every change is still reviewed.** `publish_mode: editorial_workflow` means
  saving opens a pull request rather than committing to `main`, so the review
  step that existed before is preserved rather than traded away for convenience.
- **Commits are attributed to the real editor.** Git history shows the person
  who made the change as author, with the App as committer — not a single
  anonymous bot for all content edits.

**Why Decap** rather than a fork such as Sveltia (which was trialled and
reverted): it is the upstream project rather than a single-maintainer fork, and
its lenient frontmatter parsing reads the existing content without the
all-or-nothing collection failures a stricter parser produced. The `config.yml`
schema is identical between them, so the choice stays reversible by swapping one
script tag.

## Content fixes included here

Loading the real content into a CMS exposed pre-existing frontmatter bugs.
Gatsby's parser tolerates all of them, so the live site never showed a symptom —
but each one hides an entry from anything that parses frontmatter strictly.

| Files | Defect |
|---|---|
| 7 event entries | frontmatter opened with `"--- "` — a trailing space |
| 2 opencontracting entries | CRLF line endings, making the delimiter `"---\r"` |
| 1 opencontracting entry | named `index .md`, with a space before the extension |
| 2 climateaction entries | `context`/`solution` as multi-paragraph double-quoted YAML scalars — not valid YAML |

A scan of all 203 `content/**/*.md` files (delimiter check, `gray-matter`, and
strict YAML parse) now reports zero issues. Worth re-running after any bulk
content import.

**Known, not fixed:** `content/team/aashi/Aashi.JPG` and `Aashi.jpg` are two
separate blobs in git history for the same photo. A case-insensitive filesystem
can only check out one, producing a permanent spurious diff. Needs a human to
decide which image is correct.

## Status

**Working and verified end to end (2026-08-25).** Tested against real Keycloak
and a real GitHub App, running the proxy locally against a fork:

- Keycloak login succeeds and the CMS loads all 13 collections
- Saving an entry opens a pull request
- The resulting commit is authored from the verified Keycloak claims —
  `Saqib Manan <saqib@civicdatalab.in>` — and committed by the App
- `editorial_workflow` labelling works, confirming the App needs
  `Issues: Read & write` alongside Contents and Pull requests

**Remaining work is infrastructure only — no code changes:**

1. Host `cms-auth-proxy`, with TLS, and point `cms-auth.civicdatalab.in` at it.
   It can share the box Keycloak runs on; it needs its own hostname, not its
   own server.
2. Create a GitHub App on the **CivicDataLab org** (testing used a personal
   one) and install it on this repository only.
3. Add `https://cms-auth.civicdatalab.in/callback` to the Keycloak client's
   redirect URIs.
4. Add the actual editors to the `cms-editors` role.

Then four environment values change and nothing else.

## Editor onboarding

Once deployed, a short page in the Wiki covering:

1. Go to `https://civicdatalab.in/admin/`
2. Sign in with your CivicDataLab account — the same login as other CDL tools
3. Pick a collection, edit, and **Save**. This opens a pull request; it does not
   publish immediately.
4. Send the PR link to a reviewer, who reads the diff and merges
5. The site rebuilds within a few minutes of merge

## Risks and trade-offs

- **Session length.** Decap does not refresh tokens, so an editing session lasts
  as long as the Keycloak access token. The default of 5 minutes would log
  editors out mid-edit; 30–60 minutes is the recommended setting. Longer
  sessions widen the window in which a removed user retains access.
- **Single host dependency.** If the proxy is down, editors cannot sign in or
  save. The site itself stays up — this affects editing only.
- **No PR previews.** A markdown change that breaks the Gatsby build surfaces
  only after merge. Cheap mitigation: run `gatsby build` on PR open in CI,
  without deploying.
- **Lenient parsing cuts both ways.** Decap reads legacy content without
  complaint, but equally will not warn about malformed frontmatter. Re-run the
  content scan after bulk imports.
- **Editorial workflow opens a PR per entry.** Editors should finish a logical
  change before saving.
- **Secret management.** The GitHub App private key and Keycloak client secret
  live in the proxy's environment. Acceptable to start; move to AWS Secrets
  Manager or SSM Parameter Store as the host grows beyond this one use.
