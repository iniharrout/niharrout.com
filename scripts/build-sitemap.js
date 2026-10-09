#!/usr/bin/env node
/**
 * Regenerates sitemap.xml from the pages themselves: every HTML file that declares a
 * canonical URL and is not noindex is listed once, at its canonical URL.
 * <lastmod> is the date the page's real content last changed. A fingerprint of each page's main content
 * (not the shared header, footer, scripts or version strings) is kept in scripts/lastmod.json, and a page's date only
 * moves when that fingerprint changes. Without a manifest entry the date is seeded from git history.
 *
 * Usage: node scripts/build-sitemap.js
 *        node scripts/build-sitemap.js --seed   (rebuild the manifest from git history)
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.claude', 'scripts', 'api', 'assets']);
const now = new Date();
const TODAY = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), out);
    } else if (entry.name.endsWith('.html')) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

const crypto = require('crypto');
const MANIFEST = path.join(ROOT, 'scripts', 'lastmod.json');
const SEED = process.argv.includes('--seed');
let manifest = {};
try { manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8')); } catch (e) { manifest = {}; }

// Fingerprint of what a reader or crawler actually sees as the page's content.
function fingerprint(html) {
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta\s+name="description"\s+content="([^"]*)"/) || [])[1] || '';
  const main = (html.match(/<main[\s\S]*?<\/main>/) || [html.slice(html.indexOf('<body'))])[0];
  const text = (title + '|' + desc + '|' + main)
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\?v=[a-z0-9]+/gi, '')
    .replace(/\s+/g, ' ');
  return crypto.createHash('sha1').update(text).digest('hex').slice(0, 16);
}

function git(args) { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 64 * 1024 * 1024 }); }

// Date of the newest commit that introduced the page's current content (today if the working copy differs from HEAD).
function seedDate(rel, current) {
  try {
    const commits = git(['log', '--format=%H %cs', '--', rel]).trim().split('\n').filter(Boolean).map((l) => l.split(' '));
    if (!commits.length) return TODAY;
    let date = null;
    for (const [hash, d] of commits) {
      let past;
      try { past = fingerprint(git(['show', `${hash}:${rel}`])); } catch (e) { break; }
      if (past !== current) break;
      date = d;
    }
    return date || TODAY;
  } catch (e) { return TODAY; }
}

function lastmod(file, html) {
  const rel = path.relative(ROOT, file);
  const fp = fingerprint(html);
  const known = manifest[rel];
  if (known && known.hash === fp && !SEED) return known.date;
  const date = !known || SEED ? seedDate(rel, fp) : TODAY;
  manifest[rel] = { hash: fp, date };
  return date;
}

// Pages that embed a video get a <video:video> entry so search engines can index it.
const VIDEOS = {
  '/': [], '/blog/openai-select-partner': [],
};
const OPENAI_VIDEO = {
  thumbnail: 'https://www.niharrout.com/assets/video/openai-select-partner-poster.webp',
  title: 'Creuto is now an OpenAI Select Partner | Nihar Ranjan Rout',
  description: 'Nihar Ranjan Rout announces that Creuto is now an official OpenAI Select Partner, what it opens up for clients, and the free AI consultation on offer.',
  player: 'https://www.youtube.com/embed/A1EIhFSrFVY',
  duration: 45,
  published: '2026-09-22T12:06:07-07:00',
};
VIDEOS['/'].push(OPENAI_VIDEO);
VIDEOS['/blog/openai-select-partner'].push(OPENAI_VIDEO);
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const videoXml = (loc) => (VIDEOS[loc.replace(/^https:\/\/[^/]+/, '') || '/'] || []).map((v) =>
  `\n    <video:video>\n      <video:thumbnail_loc>${v.thumbnail}</video:thumbnail_loc>\n      <video:title>${esc(v.title)}</video:title>\n      <video:description>${esc(v.description)}</video:description>\n      <video:player_loc>${v.player}</video:player_loc>\n      <video:duration>${v.duration}</video:duration>\n      <video:publication_date>${v.published}</video:publication_date>\n      <video:family_friendly>yes</video:family_friendly>\n    </video:video>`).join('');

const entries = [];
for (const file of walk(ROOT)) {
  const html = fs.readFileSync(file, 'utf8');
  const canonical = (html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i) || [])[1];
  const robots = (html.match(/<meta\s+name="robots"\s+content="([^"]+)"/i) || [])[1] || '';
  if (!canonical || /noindex/i.test(robots)) continue;
  entries.push({ loc: canonical, lastmod: lastmod(file, html) });
}

const seen = new Set();
const unique = entries.filter((e) => (seen.has(e.loc) ? false : seen.add(e.loc)));
const rank = (loc) => (loc.replace(/^https:\/\/[^/]+/, '') === '/' ? 0 : 1);
unique.sort((a, b) => rank(a.loc) - rank(b.loc) || a.loc.localeCompare(b.loc));

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${unique.map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>${videoXml(e.loc)}\n  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), xml);
const sorted = {};
for (const k of Object.keys(manifest).sort()) sorted[k] = manifest[k];
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + '\n');
console.log(`sitemap.xml: ${unique.length} URLs`);
