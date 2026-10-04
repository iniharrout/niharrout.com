#!/usr/bin/env node
/**
 * Regenerates sitemap.xml from the pages themselves: every HTML file that declares a
 * canonical URL and is not noindex is listed once, at its canonical URL.
 * <lastmod> is the file's last git commit date (today for uncommitted files).
 *
 * Usage: node scripts/build-sitemap.js
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

function lastmod(file) {
  try {
    const d = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { cwd: ROOT, encoding: 'utf8' }).trim();
    return d || TODAY;
  } catch (e) {
    return TODAY;
  }
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
  entries.push({ loc: canonical, lastmod: lastmod(path.relative(ROOT, file)) });
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
console.log(`sitemap.xml: ${unique.length} URLs`);
