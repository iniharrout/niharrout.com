/**
 * Shared rules for the Book a Call flow: when calls can happen, which requests count as real projects, and the
 * bridge to Google Calendar. The bridge is a small Google Apps Script web app that runs as nihar@creuto.com
 * (code and setup in scripts/calendar/). Until CALENDAR_SCRIPT_URL and CALENDAR_SCRIPT_TOKEN are set, every
 * function here reports "not configured" and the site falls back to a Google Chat request that is confirmed by hand.
 * The leading underscore keeps this file from being served as an API route.
 */

const CONFIG = {
  offsetMin: 330,        // India, UTC+5:30, no daylight saving
  days: [1, 2, 3, 4, 5], // Monday to Friday (India time)
  startHour: 10,
  endHour: 18,           // every call must end by 18:00 IST
  durationMin: 45,
  stepMin: 60,
  leadHours: 24,
  windowDays: 14,
  padMin: 15             // keep a gap before and after other events
};

// Keep in step with assets/booking.js
const FLAGGED = /\b(jobs?|hiring|careers?|vacanc(?:y|ies)|internships?|resumes?|cv|vendors?|our services|seo|marketing services|partnership)\b/i;
const PROJECT_TOPICS = { idea: 'I need help with a new software or product idea', build: 'I want to build a mobile app, website or platform' };
const TOPICS = Object.assign({ other: 'I want to discuss hiring, partnership or collaboration' }, PROJECT_TOPICS);

function allSlots(now = Date.now()) {
  const out = [];
  const earliest = now + CONFIG.leadHours * 3600000;
  const ist = new Date(now + CONFIG.offsetMin * 60000);
  const base = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());
  for (let d = 0; d <= CONFIG.windowDays; d++) {
    const dayStart = base + d * 86400000;
    if (!CONFIG.days.includes(new Date(dayStart).getUTCDay())) continue;
    for (let m = CONFIG.startHour * 60; m + CONFIG.durationMin <= CONFIG.endHour * 60; m += CONFIG.stepMin) {
      const ts = dayStart + m * 60000 - CONFIG.offsetMin * 60000;
      if (ts >= earliest) out.push(ts);
    }
  }
  return out;
}

const isConfigured = () => !!(process.env.CALENDAR_SCRIPT_URL && process.env.CALENDAR_SCRIPT_TOKEN);

async function callScript(payload, timeoutMs = 9000) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(process.env.CALENDAR_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(Object.assign({ token: process.env.CALENDAR_SCRIPT_TOKEN }, payload)),
      redirect: 'follow',
      signal: ctl.signal
    });
    const text = await res.text();
    try { return JSON.parse(text); } catch (e) { return { ok: false, error: 'bad response' }; }
  } catch (e) {
    return { ok: false, error: 'unreachable' };
  } finally {
    clearTimeout(timer);
  }
}

// Busy ranges [startMs, endMs] from the real calendar, or null if the calendar is not connected or did not answer.
async function busyRanges(fromMs, toMs) {
  if (!isConfigured()) return null;
  const r = await callScript({ action: 'busy', from: new Date(fromMs).toISOString(), to: new Date(toMs).toISOString() });
  return r && r.ok && Array.isArray(r.busy) ? r.busy : null;
}

function freeSlots(slots, busy) {
  const pad = CONFIG.padMin * 60000, dur = CONFIG.durationMin * 60000;
  return slots.filter((ts) => !busy.some(([s, e]) => ts < e + pad && ts + dur > s - pad));
}

module.exports = { CONFIG, FLAGGED, TOPICS, PROJECT_TOPICS, allSlots, isConfigured, callScript, busyRanges, freeSlots };
