/**
 * Calendar bridge for niharrout.com (Google Apps Script).
 * Runs as the account that deploys it, so deploy it while signed in as nihar@creuto.com: events then land on
 * that calendar, block it, and the invite goes out from that account.
 *
 * It does two things for the website (api/slots and api/book on Vercel):
 *   busy  -> tells the site which times are already taken, so only free slots are offered
 *   book  -> re-checks the time, creates the event, invites the visitor (and nihar@creuto.com), adds a Meet link
 * Setup steps are in SETUP.md next to this file.
 */

var TOKEN = 'CHANGE-ME-to-a-long-random-string'; // must be identical to CALENDAR_SCRIPT_TOKEN in Vercel
var OWNER_EMAIL = 'nihar@creuto.com';             // always on the invite

function doPost(e) {
  var body;
  try { body = JSON.parse(e.postData.contents); } catch (err) { return out({ ok: false, error: 'bad json' }); }
  if (!body || body.token !== TOKEN || TOKEN.indexOf('CHANGE-ME') === 0) return out({ ok: false, error: 'unauthorized' });
  try {
    if (body.action === 'busy') return out(busy(body));
    if (body.action === 'book') return out(book(body));
  } catch (err) {
    return out({ ok: false, error: String(err) });
  }
  return out({ ok: false, error: 'unknown action' });
}

function doGet() { return out({ ok: true, service: 'niharrout.com calendar bridge' }); }

function out(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function isBlocking(ev) {
  // Ignore events you have declined.
  try { if (ev.getMyStatus() === CalendarApp.GuestStatus.NO) return false; } catch (err) { /* owner-only events have no status */ }
  return true;
}

function busy(b) {
  var events = CalendarApp.getDefaultCalendar().getEvents(new Date(b.from), new Date(b.to));
  var ranges = [];
  events.forEach(function (ev) {
    if (isBlocking(ev)) ranges.push([ev.getStartTime().getTime(), ev.getEndTime().getTime()]);
  });
  return { ok: true, busy: ranges };
}

function book(b) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000); // two visitors choosing the same slot at the same moment: one waits, the other is told it is taken
  try {
    var cal = CalendarApp.getDefaultCalendar();
    var start = new Date(b.start), end = new Date(b.end);
    var pad = (b.padMin || 15) * 60000;
    var clash = cal.getEvents(new Date(start.getTime() - pad), new Date(end.getTime() + pad)).filter(isBlocking);
    if (clash.length) return { ok: false, reason: 'taken' };

    var title = 'Intro call: ' + b.name + (b.company ? ' (' + b.company + ')' : '');
    var description = [
      'Booked through niharrout.com',
      '',
      'Name: ' + b.name,
      'Email: ' + b.email,
      'Phone: ' + b.phone,
      'Country: ' + b.country,
      b.company ? 'Company: ' + b.company : '',
      'Visitor time zone: ' + b.tz,
      '',
      'Topic: ' + b.topic,
      'Message:',
      b.message
    ].filter(function (l) { return l !== ''; }).join('\n');

    var guests = [b.email];
    if (String(OWNER_EMAIL).toLowerCase() !== String(Session.getEffectiveUser().getEmail()).toLowerCase()) guests.push(OWNER_EMAIL);

    var ev = cal.createEvent(title, start, end, { description: description, guests: guests.join(','), sendInvites: true });

    // Google Meet link: only if the "Calendar API" advanced service is switched on (see SETUP.md). The call still books without it.
    var meet = '';
    try {
      if (typeof Calendar !== 'undefined') {
        var id = ev.getId().split('@')[0];
        Calendar.Events.patch(
          { conferenceData: { createRequest: { requestId: Utilities.getUuid(), conferenceSolutionKey: { type: 'hangoutsMeet' } } } },
          'primary', id, { conferenceDataVersion: 1, sendUpdates: 'all' }
        );
        meet = (Calendar.Events.get('primary', id) || {}).hangoutLink || '';
      }
    } catch (err) { /* no Meet link: fine */ }

    return { ok: true, meet: meet };
  } finally {
    lock.releaseLock();
  }
}
