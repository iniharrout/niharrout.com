#!/usr/bin/env node
/**
 * Renders each guide's cover (assets/blog/<slug>-banner.jpg, shown at the top of the post) and share image
 * (assets/blog/<slug>-share.jpg, used for og:image) from its doodle scene in scripts/site-data/doodles.js.
 * Both are 1200 x 630 JPEGs kept under 100 KB so WhatsApp and LinkedIn show them.
 *
 * Needs Google Chrome (headless) and macOS `sips` for the JPEG step.
 * Usage: node scripts/render-blog-covers.js [slug ...]   (all guides when no slug is given)
 * Not part of build-all: run it when a guide is added or its art changes, then commit the images.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { scene, BLOG_ART } = require('./site-data/doodles');
const OLDER = require('./blog/older');

const ROOT = path.resolve(__dirname, '..');
const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
// The announcement post keeps its own official banner.
const KEEP = new Set(['openai-select-partner', 'creuto-top-software-development-company-in-odisha']);

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;');
function meta(slug) {
  const file = path.join(__dirname, 'blog', slug + '.js');
  if (fs.existsSync(file)) { const p = require(file); return { title: p.title, tag: p.category, min: p.readMinutes }; }
  const o = OLDER[slug];
  if (!o) throw new Error('no metadata for ' + slug);
  return { title: o.title, tag: o.tag, min: o.min };
}

const avatar = 'data:image/jpeg;base64,' + fs.readFileSync(path.join(ROOT, 'assets/nihar-avatar.jpg')).toString('base64');
const page = (slug, m) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@500;600;700&display=swap">
<style>
:root{--d-ink:#10213f;--d-blue:#7ea6ff;--d-deep:#1d4ed8;--d-sky:#e8effe;--d-sun:#fff4d6;--d-peach:#ffeee6;--d-yellow:#ffd34d;--d-coral:#ff8f6b;--d-paper:#fff}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:Inter,sans-serif;color:#0b0d12;background:#fff radial-gradient(circle,#d7dce5 1.2px,transparent 1.3px) 0 0/22px 22px}
.wrap{display:grid;grid-template-columns:1fr 520px;gap:40px;align-items:center;height:100%;padding:0 56px 0 64px}
.brand{font:700 30px Inter;letter-spacing:-.02em}.brand i{color:#1d4ed8;font-style:normal}
.tag{display:flex;align-items:center;gap:12px;margin:44px 0 22px;font:600 17px Inter;letter-spacing:.12em;text-transform:uppercase;color:#475569}
.tag:before{content:'';width:30px;height:2px;background:#1d4ed8}
h1{font:500 ${m.title.length > 64 ? 48 : 54}px/1.1 Fraunces,serif;letter-spacing:-.02em;max-width:15ch}
.by{display:flex;align-items:center;gap:14px;margin-top:40px;font:600 18px Inter;color:#0b0d12}.by img{width:44px;height:44px;border-radius:50%}
.by span{color:#64748b;font-weight:500}
.art svg{width:520px;height:325px;display:block;filter:drop-shadow(0 18px 40px rgba(16,33,63,.12))}
</style></head><body><div class="wrap"><div>
<div class="brand">nihar<i>.</i></div>
<div class="tag">${esc(m.tag)} &middot; ${m.min} min read</div>
<h1>${esc(m.title)}</h1>
<div class="by"><img src="${avatar}" alt=""><div>Nihar Ranjan Rout <span>&middot; Founder &amp; CEO, Creuto</span></div></div>
</div><div class="art">${scene(slug)}</div></div></body></html>`;

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(BLOG_ART).filter((s) => !KEEP.has(s));
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'covers-'));
for (const slug of slugs) {
  const html = path.join(tmp, slug + '.html');
  const png = path.join(tmp, slug + '.png');
  fs.writeFileSync(html, page(slug, meta(slug)));
  execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=5000', '--window-size=1200,630', `--screenshot=${png}`, 'file://' + html], { stdio: 'ignore' });
  for (const kind of ['banner', 'share']) {
    const out = path.join(ROOT, 'assets/blog', `${slug}-${kind}.jpg`);
    for (const q of [82, 74, 66, 58]) {
      execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', String(q), png, '--out', out], { stdio: 'ignore' });
      if (fs.statSync(out).size < 100 * 1024) break;
    }
  }
  console.log(`cover: ${slug} (${Math.round(fs.statSync(path.join(ROOT, 'assets/blog', slug + '-share.jpg')).size / 1024)} KB)`);
}
fs.rmSync(tmp, { recursive: true, force: true });
