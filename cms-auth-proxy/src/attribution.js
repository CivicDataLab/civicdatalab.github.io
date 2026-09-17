/**
 * Commit attribution.
 *
 * Commits are made with a GitHub App installation token, so by default every
 * commit would be authored by the App. GitHub's API accepts explicit `author`
 * and `committer` objects on commit-creating calls, so we inject the real
 * editor from their Keycloak claims.
 *
 * Result in git history:
 *   Author:    Priya Sharma <priya@civicdatalab.in>   <- the editor
 *   Committer: CivicDataLab CMS <...>                 <- the App
 *
 * Note: GitHub only links a commit to a user *profile* when the author email
 * belongs to a registered GitHub account. Editors here deliberately have no
 * GitHub account, so these will show as unlinked authors. That is expected.
 */

/** Endpoints that create commits and therefore accept an author object. */
export function acceptsAuthor(method, subPath) {
  const m = method.toUpperCase();
  const path = subPath.split('?')[0];
  if ((m === 'PUT' || m === 'DELETE') && /^\/contents\//.test(path)) return true;
  if (m === 'POST' && /^\/git\/commits$/.test(path)) return true;
  return false;
}

/**
 * Inject author/committer into a request body, without clobbering anything the
 * client legitimately set.
 *
 * @param {object|undefined} body parsed JSON body (may be undefined)
 * @param {{name: string, email: string}} actor
 * @param {{committerName?: string, committerEmail?: string}} [appIdentity]
 * @returns {object|undefined} a new body object, or the original if not applicable
 */
export function withAttribution(body, actor, appIdentity = {}) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return body;

  const out = { ...body };

  // The editor is the author of the change.
  out.author = {
    name: actor.name,
    email: actor.email,
    ...(body.author?.date ? { date: body.author.date } : {}),
  };

  // The App is the committer - it is the identity that actually holds the
  // credential. Only set it when we have an identity configured; otherwise
  // GitHub defaults it to the App, which is already correct.
  if (appIdentity.committerName && appIdentity.committerEmail) {
    out.committer = {
      name: appIdentity.committerName,
      email: appIdentity.committerEmail,
      ...(body.committer?.date ? { date: body.committer.date } : {}),
    };
  }

  return out;
}
