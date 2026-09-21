#!/usr/bin/env node
/**
 * Stamps the shared header and footer (partials/*.html) into every HTML page, replacing
 * whichever older header/footer the page had, and makes sure each page loads
 * assets/chrome.css and assets/chrome.js. Safe to re-run: stamped blocks are wrapped in
 * <!-- chrome:header --> / <!-- chrome:footer --> markers and replaced in place.
 *
 * Usage: node scripts/build-chrome.js   (run after build-locations.js)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', '.claude', 'scripts', 'partials', 'api']);
const header = fs.readFileSync(path.join(ROOT, 'partials/header.html'), 'utf8').trim();
const footer = fs.readFileSync(path.join(ROOT, 'partials/footer.html'), 'utf8').trim();
const CSS = '<link rel="stylesheet" href="/assets/chrome.css?v=7">';
const JS = '<script src="/assets/chrome.js?v=4" defer></script>';

const block = (name, body) => `<!-- chrome:${name} -->\n${body}\n<!-- /chrome:${name} -->`;
const markerRe = (name) => new RegExp(`<!-- chrome:${name} -->[\\s\\S]*?<!-- /chrome:${name} -->`);
const LEGACY = {
  header: /<(header)\b[^>]*\bclass="[^"]*\b(?:site-header|nav|sc-header)\b[^"]*"[^>]*>/i,
  footer: /<(footer)\b[^>]*\bclass="[^"]*\b(?:site-footer|ft|sc-footer)\b[^"]*"[^>]*>/i
};

// Finds a whole element (handles nesting of the same tag) starting at the first match of openRe.
function findElement(html, openRe) {
  const open = openRe.exec(html);
  if (!open) return null;
  const tag = open[1];
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = open.index;
  let depth = 0;
  let m;
  while ((m = re.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return { start: open.index, end: re.lastIndex };
  }
  return null;
}

function stamp(html, name, body, fallback) {
  const wrapped = block(name, body);
  if (markerRe(name).test(html)) return html.replace(markerRe(name), () => wrapped);
  const el = findElement(html, LEGACY[name]);
  if (el) return html.slice(0, el.start) + wrapped + html.slice(el.end);
  return fallback(html, wrapped);
}

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) { if (!SKIP.has(entry.name)) walk(path.join(dir, entry.name), out); }
    else if (entry.name.endsWith('.html')) out.push(path.join(dir, entry.name));
  }
  return out;
}

let changed = 0;
const files = walk(ROOT);
for (const file of files) {
  const before = fs.readFileSync(file, 'utf8');
  let html = before;

  html = stamp(html, 'header', header, (h, b) => h.replace(/<body[^>]*>/i, (m) => `${m}\n${b}`));
  html = stamp(html, 'footer', footer, (h, b) => (/<\/main>/i.test(h) ? h.replace(/<\/main>/i, (m) => `${m}\n${b}`) : h.replace(/<\/body>/i, `${b}\n</body>`)));

  html = html.replace(/<link rel="stylesheet" href="\/assets\/chrome\.css[^"]*">/, CSS);
  html = html.replace(/<script src="\/assets\/chrome\.js[^"]*" defer><\/script>/, JS);
  if (!html.includes('/assets/chrome.css')) html = html.replace('</head>', `  ${CSS}\n  ${JS}\n</head>`);
  if (html !== before) { fs.writeFileSync(file, html); changed++; }
}
console.log(`chrome: ${files.length} pages checked, ${changed} updated`);
