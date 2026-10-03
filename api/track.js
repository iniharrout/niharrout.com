/**
 * Serverless API Route: POST /api/track
 * Counts taps on the contact buttons (call, WhatsApp, book a call, email). Opt-in: with no
 * CLICK_WEBHOOK_URL set it does nothing. When set, every tap becomes one short line in that
 * Google Chat / Slack incoming webhook. No personal data is collected: only which button,
 * where on the site, and the page path.
 * Rate limited to 30 requests per minute per IP.
 */

const ALLOWED_EVENTS = {
  call: 'Call',
  whatsapp: 'WhatsApp',
  book_call: 'Book a call',
  email: 'Email'
};
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 30;
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

async function readBody(req) {
  const body = req.body;
  if (typeof body === 'string') {
    try { return JSON.parse(body); } catch (e) { return {}; }
  }
  if (body && typeof body === 'object') return body;
  if (typeof req.on === 'function') {
    try {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const raw = Buffer.concat(chunks).toString();
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }
  return {};
}

const clean = (value, max) => String(value == null ? '' : value).replace(/[^\w\s/.\-#?=&%]/g, '').trim().slice(0, max);

async function handler(req, res) {
  res.statusCode = 204;
  if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
  if (!allow(clientIp(req))) { res.statusCode = 429; return res.end(); }

  const webhook = process.env.CLICK_WEBHOOK_URL;
  if (!webhook) return res.end();

  const body = await readBody(req);
  const label = ALLOWED_EVENTS[body.event];
  if (!label) { res.statusCode = 400; return res.end(); }

  const where = clean(body.where, 40) || 'page';
  const page = clean(body.page, 160) || '/';
  const text = `${label} tapped (${where}) on ${page}`;

  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 4000);
    await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({ text }),
      signal: ctl.signal
    });
    clearTimeout(timer);
  } catch (e) {
    console.warn('[Track API] webhook delivery failed:', e.message);
  }
  return res.end();
}

module.exports = handler;
module.exports.default = handler;
