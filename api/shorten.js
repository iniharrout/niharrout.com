/**
 * Serverless API Route: POST /api/shorten   body: { "url": "https://example.com/very/long/link" }
 * Public, no sign-in. Creates the short link with TinyURL (free, no key) and falls back to is.gd. Nothing is stored
 * on this site: the long URL is passed to the shortening service and the short link is returned.
 * Because links live on the provider's domain, an abusive link can never get niharrout.com flagged.
 * Rate limited to 8 requests per minute per IP. Only public http(s) links are accepted.
 * Response: { ok: true, short, provider } or { ok: false, error }
 */

const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 8;
const MAX_URL_LENGTH = 2048;
const hits = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of hits.entries()) if (now > entry.resetTime) hits.delete(ip);
}, 5 * 60 * 1000).unref?.();

function allow(ip) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetTime) {
    hits.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

function clientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  const body = req.body;
  if (typeof body === 'string') { try { return JSON.parse(body); } catch (e) { return {}; } }
  if (body && typeof body === 'object') return body;
  if (typeof req.on === 'function') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }
  return {};
}

const SHORTENER_HOSTS = ['tinyurl.com', 'is.gd', 'v.gd', 'bit.ly', 'bitly.com', 't.co', 'goo.gl', 'ow.ly', 'buff.ly', 'rebrand.ly', 'cutt.ly', 'shorturl.at', 't.ly', 'rb.gy'];

function validate(raw) {
  let text = String(raw == null ? '' : raw).trim();
  if (!text) return { error: 'Paste a link to shorten.' };
  if (text.length > MAX_URL_LENGTH) return { error: 'That link is too long. The limit is 2,048 characters.' };
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(text)) text = 'https://' + text;
  let u;
  try { u = new URL(text); } catch (e) { return { error: 'That does not look like a valid link.' }; }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') return { error: 'Only http and https links can be shortened.' };
  const host = u.hostname.toLowerCase().replace(/\.$/, '');
  if (!host.includes('.') || host === 'localhost' || /\.(local|localhost|internal|lan|home|corp)$/.test(host)) return { error: 'Only public website links can be shortened.' };
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || host.includes(':') || /^\[/.test(host)) return { error: 'Please use a website address, not an IP address.' };
  if (SHORTENER_HOSTS.some((h) => host === h || host.endsWith('.' + h))) return { error: 'That link is already shortened.' };
  if (u.username || u.password) return { error: 'Links that contain a username or password cannot be shortened.' };
  return { url: u.toString() };
}

async function timedFetch(url, ms = 7000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), ms);
  try {
    return await fetch(url, { headers: { 'User-Agent': 'niharrout.com-url-shortener/1.0' }, signal: ctl.signal });
  } finally { clearTimeout(timer); }
}

async function viaTinyUrl(url) {
  const r = await timedFetch('https://tinyurl.com/api-create.php?url=' + encodeURIComponent(url));
  const text = (await r.text()).trim();
  if (r.ok && /^https:\/\/tinyurl\.com\/[A-Za-z0-9_-]+$/.test(text)) return text;
  throw new Error('tinyurl: ' + r.status);
}

async function viaIsGd(url) {
  const r = await timedFetch('https://is.gd/create.php?format=json&url=' + encodeURIComponent(url));
  const data = await r.json().catch(() => ({}));
  if (data && typeof data.shorturl === 'string' && /^https:\/\/is\.gd\/[A-Za-z0-9_-]+$/.test(data.shorturl)) return data.shorturl;
  throw new Error('is.gd: ' + (data && data.errorcode));
}

async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false, error: 'Method not allowed.' }); }
  if (!allow(clientIp(req))) return send(res, 429, { ok: false, error: 'Too many requests. Please wait a minute and try again.' });

  const body = await readBody(req);
  const checked = validate(body.url);
  if (checked.error) return send(res, 400, { ok: false, error: checked.error });

  for (const [provider, fn] of [['TinyURL', viaTinyUrl], ['is.gd', viaIsGd]]) {
    try {
      const short = await fn(checked.url);
      return send(res, 200, { ok: true, short, provider });
    } catch (e) {
      console.warn('[shorten] provider failed:', e.message);
    }
  }
  return send(res, 502, { ok: false, error: 'The shortening service is busy right now. Please try again in a moment.' });
}

module.exports = handler;
module.exports.default = handler;
module.exports.validate = validate;
