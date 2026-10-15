/**
 * POST /api/book: puts the call on the founder's Google Calendar and sends the invite to the visitor.
 * Only real project requests get here (the page filters, and this checks again). The time must be one of the
 * standard slots, and the calendar script re-checks that it is still free. Answers:
 *   { ok: true, meet }                     booked, invite sent
 *   { ok: false, reason: 'taken' }         someone took it first: pick another time
 *   { ok: false, configured: false }       calendar not connected yet: the page sends a normal request instead
 *   { ok: false, reason: 'unavailable' }   calendar did not answer: same fallback
 *   { ok: false, route: 'review' }         not a project request: no slot is held
 * Rate limited to 5 requests a minute per IP.
 */
const { CONFIG, FLAGGED, TOPICS, PROJECT_TOPICS, allSlots, isConfigured, callScript } = require('./_booking');

const hits = new Map();
function allow(ip) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) { hits.set(ip, { n: 1, reset: now + 60000 }); return true; }
  if (e.n >= 5) return false;
  e.n += 1; return true;
}
const send = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};
const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);
const cleanLong = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0009\u000b\u000c\u000e-\u001f\u007f]+/g, ' ').replace(/\r\n|\r/g, '\n').trim().slice(0, max);

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  try {
    const chunks = [];
    for await (const c of req) chunks.push(c);
    const raw = Buffer.concat(chunks).toString();
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { ok: false }); }
  const ip = (req.headers && (req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || 'x';
  if (!allow(ip)) return send(res, 429, { ok: false, error: 'Too many requests. Please try again in a minute.' });

  const b = await readBody(req);
  if (clean(b.website, 100)) return send(res, 200, { ok: true }); // honeypot: pretend it worked

  const lead = {
    name: clean(b.name, 120), email: clean(b.email, 160), phone: clean(b.phone, 40), country: clean(b.country, 60),
    company: clean(b.company, 120), tz: clean(b.tz, 60), topic: clean(b.topic, 20), message: cleanLong(b.message, 1200),
    slot: Number(b.slot)
  };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return send(res, 400, { ok: false, error: 'Please provide your name and a valid email address.' });
  if (lead.message.length < 20 || !TOPICS[lead.topic]) return send(res, 400, { ok: false, error: 'Please tell us what the call is about.' });
  if (!PROJECT_TOPICS[lead.topic] || FLAGGED.test(lead.message)) return send(res, 422, { ok: false, route: 'review' });
  if (!allSlots().includes(lead.slot)) return send(res, 200, { ok: false, reason: 'taken' }); // not one of the offered times any more

  if (!isConfigured()) return send(res, 200, { ok: false, configured: false });

  const r = await callScript({
    action: 'book',
    start: new Date(lead.slot).toISOString(),
    end: new Date(lead.slot + CONFIG.durationMin * 60000).toISOString(),
    padMin: CONFIG.padMin,
    name: lead.name, email: lead.email, phone: lead.phone, country: lead.country, company: lead.company,
    tz: lead.tz, topic: TOPICS[lead.topic], message: lead.message
  }, 12000);

  if (r && r.ok) return send(res, 200, { ok: true, meet: !!r.meet, meetLink: r.meet || '' });
  if (r && r.reason === 'taken') return send(res, 200, { ok: false, reason: 'taken' });
  return send(res, 200, { ok: false, configured: true, reason: 'unavailable' });
};
