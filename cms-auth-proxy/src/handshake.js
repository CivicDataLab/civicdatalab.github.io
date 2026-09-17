/**
 * Decap's popup auth handshake.
 *
 * Transcribed from the Decap 3.x bundle, which does:
 *
 *   handshakeCallback: waits for  "authorizing:<provider>"  from the popup,
 *                      then echoes that exact string back to it
 *   authorizeCallback: waits for  "authorization:<provider>:success:<json>"
 *                      and JSON.parses the tail
 *
 * Both callbacks compare `event.origin` against the `base_url` in config and
 * ignore anything else, so PUBLIC_URL must exactly equal that value or the
 * login silently hangs with no error.
 *
 * Ordering matters: Decap only starts listening for the success message
 * *after* it receives the handshake, so the popup must wait for the echo
 * before sending the token.
 */

/**
 * Escape a JSON string for safe embedding inside a <script> block.
 * `</script>` in a value would otherwise terminate the tag early, and U+2028/9
 * are literal line breaks in JS source.
 */
function safeJson(value) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

function page({ title, bodyHtml, script }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
         display: flex; align-items: center; justify-content: center;
         height: 100vh; margin: 0; background: #eff0f4; color: #333; }
  .box { text-align: center; max-width: 30rem; padding: 1.5rem; }
  .err { color: #b00020; }
  code { background: #e3e5ec; padding: .1rem .3rem; border-radius: 3px; }
</style></head>
<body><div class="box">${bodyHtml}</div>
<script>${script}</script></body></html>`;
}

/**
 * Popup page returned on success. Performs the handshake, then hands the
 * token to the opener.
 */
export function successPage({ provider, token }) {
  const payload = safeJson({ token, provider });

  return page({
    title: 'Signing you in…',
    bodyHtml: '<p>Signing you in…</p><p><small>This window should close by itself.</small></p>',
    script: `
(function () {
  var payload  = ${payload};
  var provider = ${safeJson(provider)};
  var opener   = window.opener;

  // The token is posted back to e.origin - the origin that answered our
  // handshake - rather than a configured value, so it can only ever reach
  // the window that actually initiated this login.

  if (!opener) {
    document.querySelector('.box').innerHTML =
      '<p class="err">No opener window.</p><p>Start sign-in from the CMS rather than opening this URL directly.</p>';
    return;
  }

  function onMessage(e) {
    // Decap echoes our handshake back; only then is it listening for the token.
    if (e.data !== 'authorizing:' + provider) return;
    window.removeEventListener('message', onMessage, false);
    opener.postMessage(
      'authorization:' + provider + ':success:' + JSON.stringify(payload),
      e.origin
    );
  }

  window.addEventListener('message', onMessage, false);
  // Kick off the handshake. '*' is required here: we do not yet know the
  // opener's origin, and the payload at this stage carries no secret.
  opener.postMessage('authorizing:' + provider, '*');

  // If the opener never answers, say so rather than spinning forever.
  setTimeout(function () {
    document.querySelector('.box').innerHTML =
      '<p class="err">The CMS did not respond.</p>' +
      '<p>Check that <code>base_url</code> in config.yml exactly matches ' +
      '<code>' + location.origin + '</code>.</p>';
  }, 12000);
})();`,
  });
}

/** Popup page returned on failure. Reports to the opener, and to the human. */
export function errorPage({ provider, message, cmsOrigin }) {
  const payload = safeJson({ message });
  return page({
    title: 'Sign-in failed',
    bodyHtml: `<p class="err">Sign-in failed.</p><p>${escapeHtml(message)}</p>`,
    script: `
(function () {
  var opener = window.opener;
  if (!opener) return;
  try {
    opener.postMessage(
      'authorization:' + ${safeJson(provider)} + ':error:' + JSON.stringify(${payload}),
      ${safeJson(cmsOrigin)}
    );
  } catch (e) {}
})();`,
  });
}

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export const _safeJson = safeJson;
