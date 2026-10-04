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
  <!-- Google Analytics (gtag.js) with Consent Mode. For visitors in Europe, the UK and nearby time zones Google's script
       is only loaded after they accept (assets/consent.js shows the banner). Everyone else loads it straight away. -->
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    (function () {
      var tz = '';
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
      var forced = /[?&]cc=(eu|row)\\b/.exec(location.search);
      var required = forced ? forced[1] === 'eu' : /^(Europe\\/|Atlantic\\/(Reykjavik|Canary|Madeira|Azores|Faroe)|Africa\\/Ceuta|Arctic\\/Longyearbyen)/.test(tz);
      var saved = null;
      try { saved = localStorage.getItem('nr_consent'); } catch (e) {}
      var granted = saved === 'granted' || (!required && saved !== 'denied');
      var loaded = false;
      function load() {
        if (loaded) return;
        loaded = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=${ID}';
        document.head.appendChild(s);
      }
      function store(value) { try { localStorage.setItem('nr_consent', value); } catch (e) {} }
      function clearCookies() {
        var host = location.hostname, parts = host.split('.'), domains = [host, '.' + host];
        if (parts.length > 2) domains.push('.' + parts.slice(-2).join('.'));
        document.cookie.split(';').forEach(function (c) {
          var name = c.split('=')[0].trim();
          if (name.indexOf('_ga') !== 0) return;
          domains.forEach(function (d) { document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + d; });
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        });
      }
      window.nrConsent = {
        required: required,
        saved: saved,
        accept: function () { store('granted'); gtag('consent', 'update', { analytics_storage: 'granted' }); load(); },
        decline: function () { store('denied'); gtag('consent', 'update', { analytics_storage: 'denied' }); clearCookies(); }
      };
      if (/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) { window['ga-disable-${ID}'] = true; }
      gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: granted ? 'granted' : 'denied' });
      gtag('js', new Date());
      gtag('config', '${ID}');
      if (granted) load();
    })();
  </script>
  <script src="/assets/consent.js?v=c2" defer></script>
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
