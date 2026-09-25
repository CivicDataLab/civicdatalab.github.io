// Editors have pasted the CMS "Medium" field in three different shapes:
// a bare handle (@name), a profile URL (medium.com/@name), or a custom
// subdomain (name.medium.com) — see content/team/*/index.md. Each needs a
// differently-shaped RSS feed URL, so normalize here instead of assuming
// one format everywhere it's used.
function mediumFeedUrl(value) {
  const trimmed = value?.trim().replace(/\/+$/, '');
  if (!trimmed) return null;

  const subdomain = trimmed.match(/^https?:\/\/([^./]+)\.medium\.com$/i);
  if (subdomain) return `https://${subdomain[1]}.medium.com/feed`;

  const profile = trimmed.match(/^https?:\/\/medium\.com\/(@[^/]+)$/i);
  const handle = profile ? profile[1] : trimmed.replace(/^@?/, '@');
  return `https://medium.com/feed/${handle}`;
}

module.exports = mediumFeedUrl;
