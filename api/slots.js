/**
 * GET /api/slots: the call slots that are really free, taken from the founder's Google Calendar.
 * Answers { live: false } when the calendar is not connected, and the page then offers the standard hours instead.
 * Only free start times are returned, never any event details.
 */
const { CONFIG, allSlots, busyRanges, freeSlots, isConfigured } = require('./_booking');

const hits = new Map();
function allow(ip) {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) { hits.set(ip, { n: 1, reset: now + 60000 }); return true; }
  if (e.n >= 20) return false;
  e.n += 1; return true;
}
const send = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return send(res, 405, { ok: false }); }
  const ip = (req.headers && (req.headers['x-forwarded-for'] || '').split(',')[0].trim()) || 'x';
  if (!allow(ip)) return send(res, 429, { ok: false });
  if (!isConfigured()) return send(res, 200, { ok: true, live: false });
  const now = Date.now();
  const slots = allSlots(now);
  if (!slots.length) return send(res, 200, { ok: true, live: true, slots: [] });
  const busy = await busyRanges(now, now + (CONFIG.windowDays + 2) * 86400000);
  if (!busy) return send(res, 200, { ok: true, live: false });
  return send(res, 200, { ok: true, live: true, slots: freeSlots(slots, busy) });
};
