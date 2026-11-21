#!/usr/bin/env node
/**
 * Makes every page installable: adds the web app manifest link, the theme colour and the service worker
 * registration script to each page's <head>, between <!-- pwa --> markers so reruns replace the block.
 * The manifest is /manifest.webmanifest, the service worker /sw.js and the offline fallback /offline.
 *
 * Usage: node scripts/build-pwa.js (run by build-all.js)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', '.claude', 'scripts', 'partials', 'api', 'assets', 'offline']);
const BLOCK = `  <!-- pwa -->
  <link rel="manifest" href="/manifest.webmanifest">
  <meta name="theme-color" content="#ffffff">
  <meta name="apple-mobile-web-app-title" content="Nihar">
  <script src="/assets/pwa.js?v=pw1" defer></script>
  <!-- /pwa -->`;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}

let changed = 0;
for (const file of walk(ROOT)) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('</head>')) continue;
  let next = html.replace(/\n?[ \t]*<!-- pwa -->[\s\S]*?<!-- \/pwa -->/, '');
  next = next.replace('</head>', `${BLOCK}\n</head>`);
  if (next !== html) { fs.writeFileSync(file, next); changed++; }
}
console.log(`pwa: ${changed} pages updated`);
