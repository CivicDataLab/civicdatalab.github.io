/**
 * Path allowlist.
 *
 * Derived from auditing the Decap 3.x bundle for every GitHub API path its
 * `github` backend calls (see cms-keycloak-design.md). Anything not listed is
 * refused, so a compromised or malicious client cannot use this proxy as a
 * general-purpose authenticated GitHub gateway.
 *
 * All paths are relative to /repos/{owner}/{repo}.
 */

const RULES = [
  // --- entry content -----------------------------------------------------
  { re: /^\/contents(\/.*)?$/, methods: ['GET', 'PUT', 'DELETE'] },

  // --- branches & history ------------------------------------------------
  { re: /^\/branches(\/[^/]+)?$/, methods: ['GET'] },
  { re: /^\/commits(\/.*)?$/, methods: ['GET'] },
  { re: /^\/compare\/.+$/, methods: ['GET'] },

  // --- git database ------------------------------------------------------
  // Writes are required here: media uploads create blobs, and Decap builds a
  // tree+commit for its refs/meta/_decap_cms metadata ref.
  { re: /^\/git\/blobs(\/[0-9a-f]{40})?$/, methods: ['GET', 'POST'] },
  { re: /^\/git\/trees(\/.+)?$/, methods: ['GET', 'POST'] },
  { re: /^\/git\/commits(\/[0-9a-f]{40})?$/, methods: ['GET', 'POST'] },
  { re: /^\/git\/refs(\/.*)?$/, methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
  { re: /^\/git\/matching-refs(\/.*)?$/, methods: ['GET'] },

  // --- editorial workflow: pull requests ---------------------------------
  { re: /^\/pulls$/, methods: ['GET', 'POST'] },
  { re: /^\/pulls\/\d+$/, methods: ['GET', 'PATCH'] },
  { re: /^\/pulls\/\d+\/commits$/, methods: ['GET'] },
  { re: /^\/pulls\/\d+\/merge$/, methods: ['GET', 'PUT'] },

  // --- editorial workflow: status labels (PRs are issues in the API) -----
  { re: /^\/issues\/\d+$/, methods: ['GET', 'PATCH'] },
  { re: /^\/issues\/\d+\/labels(\/.+)?$/, methods: ['GET', 'POST', 'PUT', 'DELETE'] },
  { re: /^\/issues\/\d+\/comments$/, methods: ['GET', 'POST'] },
  { re: /^\/issues\/comments\/\d+$/, methods: ['GET', 'PATCH', 'DELETE'] },

  // --- repo metadata -----------------------------------------------------
  { re: /^$/, methods: ['GET'] }, // GET /repos/{owner}/{repo}
];

/**
 * @param {string} method HTTP method
 * @param {string} subPath path below /repos/{owner}/{repo}, e.g. "/contents/x.md"
 * @returns {{allowed: boolean, reason?: string}}
 */
export function checkAllowed(method, subPath) {
  const m = method.toUpperCase();
  // Strip any query string before matching.
  const path = subPath.split('?')[0].replace(/\/+$/, '') || '';

  const matching = RULES.filter((r) => r.re.test(path));
  if (matching.length === 0) {
    return { allowed: false, reason: `path not in allowlist: ${path || '/'}` };
  }
  if (!matching.some((r) => r.methods.includes(m))) {
    const permitted = [...new Set(matching.flatMap((r) => r.methods))].join(', ');
    return {
      allowed: false,
      reason: `method ${m} not permitted on ${path || '/'} (allowed: ${permitted})`,
    };
  }
  return { allowed: true };
}

export const _RULES = RULES;
