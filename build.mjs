// Builds the CalDefiq legal site into ./site (static HTML, no dependencies).
//   node build.mjs            build for preview (owner blanks are highlighted on the page)
//   node build.mjs --publish  refuse to build while any [[OWNER: …]] blank is left
//
// Pages are HTML fragments in ./pages. Each starts with a meta comment:
//   <!--meta {"slug":"privacy","title":"Privacy Policy","description":"…","order":1} -->
// Links between pages are written {{link:privacy}} or {{link:privacy#section-id}} and become
// relative URLs, so the site works locally and under any host path (e.g. GitHub Pages).
// The build fails on: missing/duplicate section ids, links to pages or sections that don't exist,
// placeholder text, or (with --publish) any owner blank.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'site');
const PUBLISH = process.argv.includes('--publish');
// Where the site will be published (also used in the app: src/lib/legal.ts). Canonical/OG URLs only.
const SITE_URL = 'https://hsn702.github.io/caldefiq-legal/';
const SUPPORT_EMAIL = 'caldefiq@gmail.com';

const errors = [];
const fail = (msg) => errors.push(msg);

// ---- read pages ---------------------------------------------------------------------------
const pages = readdirSync(join(root, 'pages'))
  .filter((f) => f.endsWith('.html'))
  .map((f) => {
    const raw = readFileSync(join(root, 'pages', f), 'utf8').replace(/\r\n/g, '\n');
    const m = /^<!--meta (\{.*?\}) -->\n/.exec(raw);
    if (!m) throw new Error(`${f}: missing <!--meta {...} --> header`);
    const meta = JSON.parse(m[1]);
    return { file: f, ...meta, body: raw.slice(m[0].length) };
  })
  .sort((a, b) => a.order - b.order);
const bySlug = new Map(pages.map((p) => [p.slug, p]));

const idsOf = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
for (const p of pages) {
  const ids = idsOf(p.body);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (dup.length) fail(`${p.file}: duplicate id(s) ${[...new Set(dup)].join(', ')}`);
  for (const h of p.body.matchAll(/<h2(?![^>]*\sid=)[^>]*>(.*?)<\/h2>/g)) fail(`${p.file}: <h2> without id: ${h[1]}`);
  if (/lorem ipsum|TODO|TBD|xxx/i.test(p.body)) fail(`${p.file}: placeholder text`);
}

// ---- helpers --------------------------------------------------------------------------------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const depth = (slug) => (slug === '' ? '' : '../');
const href = (from, to, hash = '') => {
  const target = to === 'home' ? '' : `${to}/`;
  const rel = `${depth(from)}${target}` || './';
  return `${rel}${hash ? `#${hash}` : ''}`;
};

/** Text of the heading with that id on a page, without its number ("7. Support…" → "Support…"). */
function headingText(page, id) {
  const m = new RegExp(`<h[23] id="${id}"[^>]*>(.*?)</h[23]>`).exec(page.body);
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/^\d+(\.\d+)*\.?\s*/, '') : id;
}

// {{link:page#id}} inside href="…" becomes the URL; anywhere else it becomes a titled link:
// "Privacy Policy", or for a section "Privacy Policy (Support emails and our private support inbox)".
function resolveLinks(p, html) {
  const check = (to, hash) => {
    if (to !== 'home' && !bySlug.has(to)) fail(`${p.file}: link to unknown page "${to}"`);
    else if (hash && to !== 'home' && !idsOf(bySlug.get(to).body).includes(hash)) fail(`${p.file}: link to missing section "${to}#${hash}"`);
  };
  html = html.replace(/href="\{\{link:([a-z-]+)(?:#([a-z0-9-]+))?\}\}"/g, (_, to, hash) => {
    check(to, hash);
    return `href="${href(p.slug, to, hash)}"`;
  });
  return html.replace(/\{\{link:([a-z-]+)(?:#([a-z0-9-]+))?\}\}/g, (_, to, hash) => {
    check(to, hash);
    const page = bySlug.get(to);
    if (!page) return to;
    const label = hash ? (to === p.slug ? headingText(page, hash) : `${page.title} (${headingText(page, hash)})`) : page.title;
    return `<a href="${href(p.slug, to, hash)}">${esc(label)}</a>`;
  });
}

let blanks = 0;
function ownerBlanks(p, html) {
  return html.replace(/\[\[OWNER:\s*([^\]]+)\]\]/g, (_, text) => {
    blanks += 1;
    if (PUBLISH) fail(`${p.file}: owner blank left: ${text}`);
    return `<mark class="owner" title="To be supplied by the owner before publication">Owner to confirm: ${esc(text.trim())}</mark>`;
  });
}

function toc(html) {
  const items = [...html.matchAll(/<h2 id="([^"]+)"[^>]*>(.*?)<\/h2>/g)].map((m) => `<li><a href="#${m[1]}">${m[2].replace(/<[^>]+>/g, '')}</a></li>`);
  return items.length > 2 ? items.join('') : '';
}

const LOGO = readFileSync(join(root, 'assets', 'caldefiq-symbol.svg'), 'utf8')
  .replace(/<\?xml[^>]*>\s*/, '')
  .replace(/\swidth="[^"]*"/, '')
  .replace(/\sheight="[^"]*"/, '')
  .replace('<svg ', '<svg class="logo-mark" aria-hidden="true" focusable="false" ')
  .replace(/role="img"\s*/, '')
  .replace(/\saria-labelledby="[^"]*"/, '');

function nav(current) {
  return pages
    .filter((p) => p.nav)
    .map((p) => `<a href="${href(current, p.slug)}"${p.slug === current ? ' aria-current="page"' : ''}>${esc(p.nav)}</a>`)
    .join('');
}

function layout(p, body) {
  const url = p.slug ? `${SITE_URL}${p.slug}/` : SITE_URL;
  const fullTitle = p.slug ? `${p.title} · CalDefiq` : 'CalDefiq Legal & Support';
  const tocHtml = p.slug ? toc(body) : '';
  const css = `${depth(p.slug)}assets/styles.css`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="theme-color" content="#101214">
<meta name="color-scheme" content="light dark">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="CalDefiq">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${url}">
<meta name="twitter:card" content="summary">
<link rel="icon" href="${depth(p.slug)}assets/caldefiq-symbol.svg" type="image/svg+xml">
<link rel="stylesheet" href="${css}">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap header-inner">
    <a class="brand" href="${href(p.slug, 'home')}" aria-label="CalDefiq legal home">${LOGO}<span class="brand-name">CalDefiq</span><span class="brand-sub">Legal</span></a>
    <details class="menu">
      <summary aria-label="Open menu"><span></span><span></span><span></span></summary>
      <nav class="nav" aria-label="Legal pages">${nav(p.slug)}</nav>
    </details>
    <nav class="nav nav-wide" aria-label="Legal pages">${nav(p.slug)}</nav>
  </div>
</header>
${
  p.slug
    ? `<section class="hero"><div class="wrap"><p class="eyebrow">${esc(p.eyebrow ?? 'CalDefiq')}</p><h1>${esc(p.title)}</h1><p class="lede">${esc(p.lede ?? p.description)}</p>${
        p.updated ? `<p class="updated">Last updated: ${ownerBlanks(p, p.updated)}</p>` : ''
      }</div></section>`
    : p.lede
      ? `<section class="home-hero"><div class="wrap"><p class="eyebrow">CalDefiq</p><h1>Legal &amp; Support</h1><p>${esc(p.lede)}</p></div></section>`
      : ''
}
<div class="wrap ${tocHtml ? 'with-toc' : 'no-toc'}">
  ${tocHtml ? `<aside class="toc" aria-label="On this page"><details open><summary>On this page</summary><ol>${tocHtml}</ol></details></aside>` : ''}
  <main id="main" class="doc">
${body}
  </main>
</div>
<footer class="site-footer">
  <div class="wrap footer-inner">
    <div>
      <p class="foot-brand">${LOGO}<span>CalDefiq</span></p>
      <p class="foot-note">Calorie, nutrition and fitness tracking. No ads, ever.</p>
    </div>
    <nav aria-label="All legal pages" class="foot-links">${pages.map((x) => `<a href="${href(p.slug, x.slug || 'home')}">${esc(x.short ?? x.title)}</a>`).join('')}</nav>
    <p class="foot-contact">Questions? <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a></p>
  </div>
</footer>
<script>
  // Phones: start with "On this page" collapsed so the text comes first (it stays one tap away).
  if (window.matchMedia('(max-width: 960px)').matches) document.querySelectorAll('.toc details').forEach((d) => d.removeAttribute('open'));
</script>
</body>
</html>
`;
}

// ---- build ----------------------------------------------------------------------------------
rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, 'assets'), { recursive: true });
for (const a of readdirSync(join(root, 'assets'))) copyFileSync(join(root, 'assets', a), join(out, 'assets', a));

for (const p of pages) {
  let body = resolveLinks(p, p.body);
  body = ownerBlanks(p, body);
  body = body.replace(/\{\{email\}\}/g, `<a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>`);
  const dir = p.slug ? join(out, p.slug) : out;
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), layout(p, body));
}

// 404, sitemap, robots, and .nojekyll (serve the HTML as-is on GitHub Pages)
const notFound = { slug: '404', title: 'Page not found', description: 'This page does not exist.', file: '404' };
writeFileSync(
  join(out, '404.html'),
  layout({ ...notFound, slug: '' }, `<section class="card center"><h1>Page not found</h1><p>That page doesn't exist. Try the <a href="${SITE_URL}">CalDefiq legal home</a>.</p></section>`),
);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${SITE_URL}${p.slug ? `${p.slug}/` : ''}</loc></url>`).join('\n')}\n</urlset>\n`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}sitemap.xml\n`);
writeFileSync(join(out, '.nojekyll'), '');

// Every generated relative link must point at a file that exists.
for (const p of pages) {
  const dir = p.slug ? join(out, p.slug) : out;
  const html = readFileSync(join(dir, 'index.html'), 'utf8');
  for (const m of html.matchAll(/href="((?:\.\.\/|\.\/)?(?:[a-z-]+\/)*)(?:#[^"]*)?"/g)) {
    const target = join(dir, m[1], 'index.html');
    if (m[1] !== '' && !existsSync(target)) fail(`${p.file}: broken link ${m[1]}`);
  }
}

if (errors.length) {
  console.error(`Build FAILED:\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`Built ${pages.length} pages into site/. Owner blanks: ${blanks}${blanks ? ' (highlighted; publishing is blocked until they are filled in)' : ''}.`);
