#!/usr/bin/env node
/**
 * Static SEO audit for every page in the repo. Read-only: prints problems, changes nothing.
 * Checks: title and meta description length, canonical, single h1, Open Graph and Twitter tags,
 * JSON-LD validity, images (alt, size), internal links and assets that do not resolve,
 * duplicate titles / descriptions, sitemap coverage, noindex pages, lang and viewport.
 *
 * Usage: node scripts/seo-audit.js [--verbose]
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', '.claude', 'scripts', 'api', 'partials']);
const VERBOSE = process.argv.includes('--verbose');
const ORIGIN = 'https://www.niharrout.com';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name) && e.name !== 'assets') walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}

const files = walk(ROOT);
const issues = [];
const add = (file, level, msg) => issues.push({ file: path.relative(ROOT, file), level, msg });
const titles = new Map(), descs = new Map(), canonicals = new Map();
const sitemap = fs.existsSync(path.join(ROOT, 'sitemap.xml')) ? fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8') : '';
const sitemapLocs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));

const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&rsquo;|&lsquo;/g, "'").replace(/\s+/g, ' ').trim();
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&rsquo;|&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&mdash;/g, '-');

function resolves(href, from) {
  let p = href.split('#')[0].split('?')[0];
  if (!p) return true;
  if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(p)) return true;
  let abs = p.startsWith('/') ? path.join(ROOT, p) : path.join(path.dirname(from), p);
  if (fs.existsSync(abs) && fs.statSync(abs).isFile()) return true;
  if (fs.existsSync(abs + '.html')) return true;
  if (fs.existsSync(path.join(abs, 'index.html'))) return true;
  return false;
}

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  const html = strip(raw);
  const rel = path.relative(ROOT, file);
  const noindex = /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(raw);

  if (!/<html[^>]+lang=/i.test(raw)) add(file, 'warn', 'missing lang on <html>');
  if (!/<meta[^>]+name=["']viewport["']/i.test(raw)) add(file, 'error', 'missing viewport meta');

  const title = (raw.match(/<title>([\s\S]*?)<\/title>/i) || [])[1];
  if (!title) add(file, 'error', 'missing <title>');
  else {
    const t = decode(title.trim());
    if (t.length < 25) add(file, 'warn', `title short (${t.length}): ${t}`);
    if (t.length > 70) add(file, 'warn', `title long (${t.length}): ${t}`);
    if (!noindex) { if (titles.has(t)) titles.get(t).push(rel); else titles.set(t, [rel]); }
  }

  const desc = (raw.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i) || [])[1];
  if (!desc) add(file, 'error', 'missing meta description');
  else {
    const d = decode(desc.trim());
    if (d.length < 70) add(file, 'warn', `description short (${d.length})`);
    if (d.length > 170) add(file, 'warn', `description long (${d.length})`);
    if (!noindex) { if (descs.has(d)) descs.get(d).push(rel); else descs.set(d, [rel]); }
  }

  const canonical = (raw.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) || [])[1];
  if (!canonical) { if (!noindex) add(file, 'error', 'missing canonical'); }
  else {
    if (!canonical.startsWith(ORIGIN)) add(file, 'error', `canonical off-origin: ${canonical}`);
    if (canonicals.has(canonical)) canonicals.get(canonical).push(rel); else canonicals.set(canonical, [rel]);
    if (!noindex && !sitemapLocs.has(canonical)) add(file, 'warn', `canonical not in sitemap: ${canonical}`);
    const expectedPath = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
    const gotPath = canonical.replace(ORIGIN, '') || '/';
    if (expectedPath !== '/' && gotPath !== expectedPath && !rel.startsWith('404')) add(file, 'warn', `canonical path ${gotPath} differs from file path ${expectedPath}`);
  }

  const h1s = (html.match(/<h1[\s>]/gi) || []).length;
  if (h1s !== 1 && !rel.startsWith('404')) add(file, 'error', `${h1s} <h1> tags`);

  for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
    if (!new RegExp(`<meta[^>]+property=["']${prop}["']`, 'i').test(raw) && !noindex) add(file, 'warn', `missing ${prop}`);
  }
  if (!/<meta[^>]+name=["']twitter:card["']/i.test(raw) && !noindex) add(file, 'warn', 'missing twitter:card');

  for (const m of raw.matchAll(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(m[1]); } catch (e) { add(file, 'error', 'invalid JSON-LD: ' + e.message); }
  }

  for (const m of html.matchAll(/<img\b([^>]*)>/gi)) {
    const a = m[1];
    if (!/\balt=/i.test(a)) add(file, 'warn', 'img without alt: ' + ((a.match(/src=["']([^"']+)/) || [])[1] || '?'));
    if (!/\bwidth=/i.test(a) || !/\bheight=/i.test(a)) { if (VERBOSE) add(file, 'info', 'img without width/height: ' + ((a.match(/src=["']([^"']+)/) || [])[1] || '?')); }
  }

  const seen = new Set();
  for (const m of html.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const ref = m[1];
    if (seen.has(ref)) continue; seen.add(ref);
    if (!resolves(ref, file)) add(file, 'error', 'broken reference: ' + ref);
  }
}

for (const [t, list] of titles) if (list.length > 1) add(list[0], 'warn', `duplicate title shared by ${list.length} pages: ${t}`);
for (const [d, list] of descs) if (list.length > 1) add(list[0], 'warn', `duplicate description shared by ${list.length} pages: ${d.slice(0, 70)}...`);
for (const [c, list] of canonicals) if (list.length > 1) add(list[0], 'error', `canonical shared by ${list.join(', ')}`);
for (const loc of sitemapLocs) {
  const p = loc.replace(ORIGIN, '') || '/';
  const f = path.join(ROOT, p, 'index.html');
  if (!fs.existsSync(f) && !fs.existsSync(path.join(ROOT, p + '.html'))) add(path.join(ROOT, 'sitemap.xml'), 'error', `sitemap URL has no page: ${loc}`);
}

const order = { error: 0, warn: 1, info: 2 };
issues.sort((a, b) => order[a.level] - order[b.level] || a.file.localeCompare(b.file));
const counts = { error: 0, warn: 0, info: 0 };
for (const i of issues) { counts[i.level]++; console.log(`${i.level.toUpperCase().padEnd(5)} ${i.file}: ${i.msg}`); }
console.log(`\n${files.length} pages checked. errors: ${counts.error}, warnings: ${counts.warn}${VERBOSE ? ', info: ' + counts.info : ''}`);
process.exitCode = counts.error ? 1 : 0;
