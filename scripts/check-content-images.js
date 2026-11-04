// Fails when a content file points at an image that does not exist next to it.
// Deleting an image in the CMS media library commits straight to main and leaves the
// entry still pointing at it, which breaks the page and every later CMS save of that entry.
// Run: node scripts/check-content-images.js   (exit 1 lists each missing image)

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'content');
const IMAGE = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith('.md') ? [p] : [];
  });

// Relative image references: front-matter values ("image: a.jpg", "- a.jpg") and Markdown images.
const refs = (text) => {
  const out = [];
  const fm = /^---\n([\s\S]*?)\n---/.exec(text);
  if (fm) {
    fm[1].split('\n').forEach((line) => {
      const m = /^\s*(?:-\s+|[\w-]+:\s+)(?:-\s+)?["']?([^"'#]+?)["']?\s*$/.exec(line);
      if (m && IMAGE.test(m[1])) out.push(m[1]);
    });
  }
  const body = fm ? text.slice(fm[0].length) : text;
  for (const m of body.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)>?/g)) if (IMAGE.test(m[1])) out.push(m[1]);
  // Absolute URLs and site-root paths (served from static/) are not this check's business.
  return out.filter((r) => !/^([a-z]+:|\/)/i.test(r.trim()));
};

const missing = [];
walk(ROOT).forEach((file) => {
  const text = fs.readFileSync(file, 'utf8');
  refs(text).forEach((ref) => {
    const target = path.resolve(path.dirname(file), decodeURI(ref.trim()));
    if (!fs.existsSync(target)) missing.push(`${path.relative(process.cwd(), file)}: ${ref}`);
  });
});

if (missing.length) {
  console.error(`Missing images (${missing.length}). Re-upload the image, or pick another one for the entry:`);
  missing.forEach((m) => console.error(`  ${m}`));
  process.exit(1);
}
console.log('All content images exist.');
