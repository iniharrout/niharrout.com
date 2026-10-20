#!/usr/bin/env node
/**
 * Fills doodle placeholders on every page with the drawing from scripts/site-data/doodles.js.
 * A placeholder is any span or div carrying data-doodle, for example:
 *   <span class="cx-ico doodle-slot" data-doodle="call"></span>
 * Blog cover scenes work the same way with data-scene="<post slug>".
 * A placeholder's contents are replaced each run, so the drawings stay in sync with the library. Safe to re-run.
 *
 * Usage: node scripts/build-doodles.js   (part of build-all.js)
 */
const fs = require('fs');
const path = require('path');
const { doodle, has, scene, BLOG_ART } = require('./site-data/doodles');

const ROOT = path.resolve(__dirname, '..');
const SKIP = new Set(['node_modules', '.git', '.claude', 'scripts', 'partials', 'api', 'assets']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP.has(e.name)) walk(path.join(dir, e.name), out); }
    else if (e.name.endsWith('.html')) out.push(path.join(dir, e.name));
  }
  return out;
}

const SLOT = /(<(span|div)\b[^>]*\bdata-(doodle|scene)="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g;
let pages = 0, slots = 0;
for (const file of walk(ROOT)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = before.replace(SLOT, (m, open, tag, kind, name, close) => {
    const known = kind === 'scene' ? Boolean(BLOG_ART[name]) : has(name);
    if (!known) throw new Error(`${path.relative(ROOT, file)}: unknown ${kind} "${name}"`);
    slots++;
    return open + (kind === 'scene' ? scene(name) : doodle(name)) + close;
  });
  if (after !== before) { fs.writeFileSync(file, after); pages++; }
}
console.log(`doodles: ${slots} placeholders filled, ${pages} pages updated`);
