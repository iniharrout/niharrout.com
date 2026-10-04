#!/usr/bin/env node
/**
 * Stamps the animated AI hero (scripts/ai-hero.js) into the two hand-written AI pages, between
 * <!-- ai:card --> and <!-- /ai:card --> markers. The city AI pages get theirs from build-locations.js.
 * Usage: node scripts/build-ai-pages.js
 */
const fs = require('fs');
const path = require('path');
const { card } = require('./ai-hero');

const ROOT = path.resolve(__dirname, '..');
const PAGES = ['services/ai-product-development/index.html', 'ai-product-development-bhubaneswar/index.html'];
let changed = 0;

for (const rel of PAGES) {
  const file = path.join(ROOT, rel);
  const html = fs.readFileSync(file, 'utf8');
  const pattern = /<!-- ai:card -->[\s\S]*?<!-- \/ai:card -->/;
  if (!pattern.test(html)) { console.error(`marker missing in ${rel}`); process.exitCode = 1; continue; }
  const next = html.replace(pattern, () => `<!-- ai:card -->\n          ${card()}\n          <!-- /ai:card -->`);
  if (next !== html) { fs.writeFileSync(file, next); changed++; }
}
console.log(`ai pages: ${PAGES.length} checked, ${changed} updated`);
