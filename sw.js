/* Service worker for www.niharrout.com.
 * Pages: network first, so visitors always get the latest version; the last pages they read are kept for offline use.
 * Static files (CSS, JS, images, fonts): served from cache and refreshed in the background. Their URLs carry a ?v= version,
 * so a changed file is a new URL and never served stale.
 * Forms, the /api endpoints and other sites are never touched.
 * Bump VERSION to clear every cache on the next visit. */
const VERSION = 'v1';
const PAGES = 'pages-' + VERSION;
const ASSETS = 'assets-' + VERSION;
const OFFLINE = '/offline';
const PRECACHE = [OFFLINE, '/assets/icons/icon-192.png', '/favicon.svg'];
const MAX_PAGES = 40;
const MAX_ASSETS = 150;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(PAGES).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = [PAGES, ASSETS];
    for (const key of await caches.keys()) if (!keep.includes(key)) await caches.delete(key);
    if (self.registration.navigationPreload) await self.registration.navigationPreload.enable();
    await self.clients.claim();
  })());
});

async function trim(name, max) {
  const cache = await caches.open(name);
  const keys = await cache.keys();
  for (let i = 0; i < keys.length - max; i++) await cache.delete(keys[i]);
}

async function page(event) {
  const req = event.request;
  try {
    const res = (await event.preloadResponse) || (await fetch(req));
    if (res && res.ok && res.type === 'basic') {
      const copy = res.clone();
      event.waitUntil(caches.open(PAGES).then((c) => c.put(req, copy)).then(() => trim(PAGES, MAX_PAGES)));
    }
    return res;
  } catch (e) {
    return (await caches.match(req, { ignoreSearch: true })) || (await caches.match(OFFLINE)) || Response.error();
  }
}

async function asset(event) {
  const req = event.request;
  const cache = await caches.open(ASSETS);
  const hit = await cache.match(req);
  const refresh = fetch(req).then((res) => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).then(() => trim(ASSETS, MAX_ASSETS));
    return res;
  }).catch(() => hit);
  if (hit) { event.waitUntil(refresh); return hit; }
  return refresh;
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (same && (url.pathname.startsWith('/api/') || url.pathname === '/sw.js')) return;
  if (req.mode === 'navigate' && same) { event.respondWith(page(event)); return; }
  const isStatic = ['style', 'script', 'image', 'font'].includes(req.destination);
  if ((same && (isStatic || url.pathname.startsWith('/assets/'))) || url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(asset(event));
  }
});
