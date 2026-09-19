/**
 * Serverless API Route: POST /api/lead
 * Single entry point for enquiry forms on the site. Forwards each lead to a
 * Google Chat webhook. The webhook URL lives in LEAD_WEBHOOK_URL so it is never
 * shipped to the browser. If it is not configured, or delivery fails, the
 * handler answers { ok: false, fallback: true } and the page falls back to
 * another channel (Formspree or mailto).
 * Rate limited to 5 requests per minute per IP.
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRateLimits = new Map();

setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRateLimits.entries()) {
    if (now > data.resetTime) ipRateLimits.delete(ip);
  }
}, 5 * 60 * 1000).unref?.();

function allowRequest(ip) {
  const now = Date.now();
  const entry = ipRateLimits.get(ip);
  if (!entry || now > entry.resetTime) {
    ipRateLimits.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

function parseClientIp(req) {
  const forwarded = req.headers?.['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.headers?.['x-real-ip'] || req.socket?.remoteAddress || '127.0.0.1';
}

function send(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(payload));
}

async function readBody(req) {
  let body = req.body;
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

const clean = (value, max) => String(value == null ? '' : value).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);

async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'Method Not Allowed' });
  }

  if (!allowRequest(parseClientIp(req))) {
    return send(res, 429, { ok: false, error: 'Too many requests. Please try again in a minute.' });
  }

  const body = await readBody(req);

  // Honeypot: bots fill hidden fields. Pretend success and drop the message.
  if (clean(body.website, 200) !== '') {
    return send(res, 200, { ok: true });
  }

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 160),
    phone: clean(body.phone, 40),
    budget: clean(body.budget, 60),
    message: clean(body.message || body.details, 1500),
    service: clean(body.service, 80),
    city: clean(body.city, 60),
    page: clean(body.page, 200),
    extras: {}
  };

  // Form-specific extras (platform, project type, ...): a few short key/value pairs.
  if (body.extras && typeof body.extras === 'object') {
    for (const [key, value] of Object.entries(body.extras).slice(0, 10)) {
      const k = clean(key, 40);
      const v = clean(value, 300);
      if (k && v) lead.extras[k] = v;
    }
  }

  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return send(res, 400, { ok: false, error: 'Please provide your name and a valid email address.' });
  }

  const DEFAULT_WEBHOOK_URL = 'https://chat.googleapis.com/v1/spaces/AAQAgcxp6nM/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=NYzpLArOTxnwEYuEzvw094eXwTbbpD_WZs2ugBGOH7U';
  const webhook = process.env.LEAD_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
  if (!webhook) {
    console.warn('[Lead API] LEAD_WEBHOOK_URL is not set; lead not delivered.');
    return send(res, 503, { ok: false, fallback: true });
  }

  const fields = [
    ['Name', lead.name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Service', lead.service],
    ['City', lead.city],
    ['Budget', lead.budget],
    ...Object.entries(lead.extras).map(([k, v]) => [k.replace(/_/g, ' '), v]),
    ['Message', lead.message]
  ].filter(([, v]) => v);

  const title = `New ${lead.service || 'project'} enquiry${lead.city ? ' (' + lead.city + ')' : ''}`;
  const cardMessage = {
    cardsV2: [{
      cardId: 'siteLead',
      card: {
        header: {
          title,
          subtitle: lead.page ? `niharrout.com${lead.page}` : 'niharrout.com',
          imageUrl: 'https://niharrout.com/assets/nihar.jpg',
          imageType: 'CIRCLE'
        },
        sections: [{ widgets: fields.map(([label, text]) => ({ decoratedText: { topLabel: label, text } })) }]
      }
    }]
  };
  const textMessage = {
    text: [`*${title}*`, ...fields.map(([label, value]) => `${label}: ${value}`), lead.page && `Page: https://niharrout.com${lead.page}`].filter(Boolean).join('\n')
  };

  const post = (payload) => fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' },
    body: JSON.stringify(payload)
  });

  try {
    let response = await post(cardMessage);
    // If the card layout is rejected, still deliver the lead as plain text.
    if (!response.ok) response = await post(textMessage);
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
    return send(res, 200, { ok: true });
  } catch (err) {
    console.error('[Lead API Error]:', err.message);
    return send(res, 502, { ok: false, fallback: true });
  }
}

module.exports = handler;
module.exports.default = handler;
