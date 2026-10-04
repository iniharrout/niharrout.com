#!/usr/bin/env node
/**
 * Puts the Google Analytics (GA4) tag into the <head> of every page, between <!-- ga4 --> markers, right after the
 * viewport meta tag. The tag is the one Google provides; the only addition is the opt-out line that stops traffic from
 * a local dev server (localhost / 127.0.0.1) from being counted. Safe to run repeatedly.
 * Pages that are internal-only (noindex and not the thank-you page) are skipped.
 * Usage: node scripts/build-analytics.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ID = 'G-T5CTESZZN0';
const SKIP = new Set(['node_modules', '.git', '.claude', 'scripts', 'api', 'assets', 'partials']);

const BLOCK = `<!-- ga4 -->
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${ID}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    if (/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) { window['ga-disable-${ID}'] = true; }
    gtag('js', new Date());

    gtag('config', '${ID}');
  </script>
  <!-- /ga4 -->`;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}

let changed = 0, skipped = 0;
for (const file of walk(ROOT)) {
  const rel = path.relative(ROOT, file);
  let html = fs.readFileSync(file, 'utf8');
  const internal = rel === 'location/index.html';
  const existing = /[ \t]*<!-- ga4 -->[\s\S]*?<!-- \/ga4 -->\n?/;
  if (internal) { skipped++; if (existing.test(html)) { fs.writeFileSync(file, html.replace(existing, '')); } continue; }
  html = html.replace(existing, '');
  const viewport = html.match(/<meta\s+name="viewport"[^>]*>/);
  if (!viewport) { console.error(`no viewport meta in ${rel}`); process.exitCode = 1; continue; }
  const next = html.replace(viewport[0], `${viewport[0]}\n  ${BLOCK}`);
  if (next !== fs.readFileSync(file, 'utf8')) { fs.writeFileSync(file, next); changed++; }
}
console.log(`analytics: ${changed} pages updated, ${skipped} internal page(s) skipped`);
