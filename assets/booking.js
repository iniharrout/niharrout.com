/**
 * "Book a Call" pop-up. Takes over every Book a Call button on the site (they used to open Calendly) and runs a
 * three-step request: 1) pick a time, shown in the visitor's own time zone, 2) contact details,
 * 3) what the call is about. Real project requests are booked on the founder's Google Calendar through
 * /api/book (the invite goes to the visitor and to nihar@creuto.com), and only free slots are offered
 * (/api/slots). Every request is also posted to Google Chat through /api/lead. If the calendar is not
 * connected or does not answer, the request goes to Google Chat alone and the founder confirms by hand.
 *
 * Routing (decided in the browser, shown to the visitor, and labelled in the Chat message):
 *   - topic 1 or 2 and the message looks like a real project -> booked on the calendar ("Call booked"),
 *     or "Call booking request" (confirm by hand) when the calendar is not reachable
 *   - topic 3, or a message with job / vendor / marketing / partnership words -> "Call request for review"
 *     (no slot is held; the visitor is told the team will get back if it is a fit)
 *
 * The standard hours are the rule set in CONFIG below (keep api/_booking.js in step); the live calendar then removes taken times.
 * Without JavaScript the buttons still open the Calendly page they link to.
 */
(function () {
  'use strict';

  var CONFIG = {
    offsetMin: 330,           // the founder's time zone is India (UTC+5:30, no daylight saving)
    zoneLabel: 'IST',
    days: [1, 2, 3, 4, 5],    // Monday to Friday, in India
    startHour: 10,            // first call starts at 10:00 IST
    endHour: 18,              // every call must end by 18:00 IST
    durationMin: 45,          // free 45-minute call
    stepMin: 60,              // a slot every hour
    leadHours: 24,            // earliest bookable time is a day from now
    windowDays: 14            // how far ahead people can book
  };

  var FLAGGED = /\b(jobs?|hiring|careers?|vacanc(?:y|ies)|internships?|resumes?|cv|vendors?|our services|seo|marketing services|partnership)\b/gi;

  var TOPICS = [
    ['idea', 'I need help with a new software or product idea', 'project'],
    ['build', 'I want to build a mobile app, website or platform', 'project'],
    ['other', 'I want to discuss hiring, partnership or collaboration', 'review']
  ];

  var COUNTRIES = [
    ['India', '+91'], ['United States', '+1'], ['United Kingdom', '+44'], ['Canada', '+1'], ['Australia', '+61'], ['New Zealand', '+64'],
    ['Singapore', '+65'], ['United Arab Emirates', '+971'], ['Saudi Arabia', '+966'], ['Qatar', '+974'], ['Kuwait', '+965'], ['Oman', '+968'], ['Bahrain', '+973'],
    ['Vietnam', '+84'], ['Thailand', '+66'], ['Malaysia', '+60'], ['Indonesia', '+62'], ['Philippines', '+63'], ['Hong Kong', '+852'], ['Japan', '+81'],
    ['South Korea', '+82'], ['China', '+86'], ['Bangladesh', '+880'], ['Sri Lanka', '+94'], ['Nepal', '+977'], ['Pakistan', '+92'],
    ['Germany', '+49'], ['France', '+33'], ['Netherlands', '+31'], ['Spain', '+34'], ['Italy', '+39'], ['Sweden', '+46'], ['Norway', '+47'], ['Denmark', '+45'],
    ['Switzerland', '+41'], ['Ireland', '+353'], ['Belgium', '+32'], ['Austria', '+43'], ['Poland', '+48'], ['Portugal', '+351'], ['Turkey', '+90'], ['Israel', '+972'],
    ['Egypt', '+20'], ['Nigeria', '+234'], ['Kenya', '+254'], ['South Africa', '+27'], ['Brazil', '+55'], ['Mexico', '+52'], ['Argentina', '+54'], ['Colombia', '+57'], ['Chile', '+56']
  ];
  var TZ_COUNTRY = { 'Asia/Kolkata': 'India', 'America/New_York': 'United States', 'America/Chicago': 'United States', 'America/Denver': 'United States', 'America/Los_Angeles': 'United States', 'America/Toronto': 'Canada', 'Europe/London': 'United Kingdom', 'Australia/Sydney': 'Australia', 'Australia/Melbourne': 'Australia', 'Australia/Perth': 'Australia', 'Asia/Singapore': 'Singapore', 'Asia/Dubai': 'United Arab Emirates', 'Asia/Ho_Chi_Minh': 'Vietnam', 'Europe/Berlin': 'Germany', 'Europe/Paris': 'France', 'Europe/Amsterdam': 'Netherlands', 'Pacific/Auckland': 'New Zealand' };
  var TZ_LIST = ['Asia/Kolkata', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Toronto', 'America/Sao_Paulo', 'Europe/London', 'Europe/Dublin', 'Europe/Paris', 'Europe/Berlin', 'Europe/Amsterdam', 'Europe/Madrid', 'Europe/Rome', 'Europe/Stockholm', 'Europe/Istanbul', 'Asia/Dubai', 'Asia/Riyadh', 'Asia/Dhaka', 'Asia/Bangkok', 'Asia/Ho_Chi_Minh', 'Asia/Singapore', 'Asia/Kuala_Lumpur', 'Asia/Manila', 'Asia/Hong_Kong', 'Asia/Tokyo', 'Asia/Seoul', 'Australia/Perth', 'Australia/Sydney', 'Pacific/Auckland', 'Africa/Lagos', 'Africa/Nairobi', 'Africa/Cairo', 'Africa/Johannesburg', 'UTC'];

  var state = { tz: '', slot: 0, day: '', step: 1, sending: false, live: null, liveAt: 0, pending: null };
  var dlg = null;
  var els = {};

  // ---------- time helpers ----------
  var TZ_ALIAS = { 'Asia/Calcutta': 'Asia/Kolkata', 'Asia/Saigon': 'Asia/Ho_Chi_Minh', 'Asia/Katmandu': 'Asia/Kathmandu', 'Asia/Rangoon': 'Asia/Yangon' };
  function detectTz() {
    try { var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; return TZ_ALIAS[tz] || tz; } catch (e) { return 'UTC'; }
  }
  function validTz(tz) {
    try { new Intl.DateTimeFormat('en-US', { timeZone: tz }); return true; } catch (e) { return false; }
  }
  function fmt(ts, tz, opts) {
    var o = {}; for (var k in opts) o[k] = opts[k]; o.timeZone = tz;
    return new Intl.DateTimeFormat(undefined, o).format(new Date(ts));
  }
  function dayKey(ts, tz) {
    var p = {};
    new Intl.DateTimeFormat('en-US', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date(ts)).forEach(function (x) { p[x.type] = x.value; });
    return p.year + '-' + p.month + '-' + p.day;
  }
  function tzLabel(tz) {
    var off = '';
    try {
      off = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' }).formatToParts(new Date()).filter(function (x) { return x.type === 'timeZoneName'; })[0].value;
    } catch (e) { /* older browsers: show the name only */ }
    return tz.replace(/_/g, ' ') + (off ? ' (' + off.replace('GMT', 'UTC') + ')' : '');
  }
  function longTime(ts, tz) {
    if (tz === 'Asia/Kolkata') return fmt(ts, tz, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit' }) + ' ' + CONFIG.zoneLabel;
    return fmt(ts, tz, { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' });
  }

  // Every bookable instant in the next windowDays, generated from the rules above.
  function allSlots() {
    var out = [];
    var now = Date.now();
    var earliest = now + CONFIG.leadHours * 3600000;
    var ist = new Date(now + CONFIG.offsetMin * 60000);
    var base = Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate());
    for (var d = 0; d <= CONFIG.windowDays; d++) {
      var dayStart = base + d * 86400000;
      if (CONFIG.days.indexOf(new Date(dayStart).getUTCDay()) === -1) continue;
      for (var m = CONFIG.startHour * 60; m + CONFIG.durationMin <= CONFIG.endHour * 60; m += CONFIG.stepMin) {
        var ts = dayStart + m * 60000 - CONFIG.offsetMin * 60000;
        if (ts >= earliest) out.push(ts);
      }
    }
    return out;
  }

  // ---------- markup ----------
  var CLOSE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var CHECK_SVG = '<svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="25" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15 27l8 8 15-17" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var ARROW = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function build() {
    if (dlg) return;
    if (!document.getElementById('bk-fonts')) {
      var link = document.createElement('link');
      link.id = 'bk-fonts'; link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500&family=Inter:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    dlg = document.createElement('dialog');
    dlg.className = 'bk-dialog';
    dlg.setAttribute('aria-labelledby', 'bk-title');
    dlg.innerHTML =
      '<div class="bk-shell">' +
        '<button class="bk-x" type="button" data-bk-close aria-label="Close">' + CLOSE_SVG + '</button>' +
        '<div class="bk-head"><ol class="bk-steps" aria-label="Progress">' +
          '<li data-s="1"><i>1</i><span>Time</span></li><li data-s="2"><i>2</i><span>Details</span></li><li data-s="3"><i>3</i><span>The call</span></li>' +
        '</ol></div>' +
        '<form class="bk-form" novalidate>' +
          '<div class="bk-body" id="bk-body">' +
            // step 1
            '<section data-panel="1">' +
              '<h2 class="bk-title" id="bk-title">Pick a time</h2>' +
              '<p class="bk-sub">A free 45-minute call with Nihar.</p>' +
              '<p class="bk-error" id="bk-notice" role="alert" hidden></p>' +
              '<label class="bk-label" for="bk-tz">Times shown in <span>(change if you are somewhere else)</span></label>' +
              '<select class="bk-tz" id="bk-tz"></select>' +
              '<label class="bk-label">Choose a day</label>' +
              '<div class="bk-days" id="bk-days" role="group" aria-label="Days"></div>' +
              '<label class="bk-label">Choose a time</label>' +
              '<div class="bk-times" id="bk-times" role="group" aria-label="Times"></div>' +
            '</section>' +
            // step 2
            '<section data-panel="2" hidden>' +
              '<h2 class="bk-title">Your details</h2>' +
              '<p class="bk-sub">So I know who to expect and where to send the confirmation.</p>' +
              '<div class="bk-grid">' +
                '<div class="bk-field"><label for="bk-name">Full name</label><input id="bk-name" type="text" autocomplete="name" maxlength="120" required></div>' +
                '<div class="bk-field"><label for="bk-email">Email</label><input id="bk-email" type="email" autocomplete="email" maxlength="160" required></div>' +
                '<div class="bk-field"><label for="bk-country">Country</label><select id="bk-country" required><option value="">Choose a country</option></select></div>' +
                '<div class="bk-field"><label for="bk-phone">Mobile number</label><div class="bk-phone"><span class="bk-code" id="bk-code" aria-hidden="true">+</span><input id="bk-phone" type="tel" autocomplete="tel-national" inputmode="tel" maxlength="20" placeholder="Mobile number" required></div></div>' +
                '<div class="bk-field is-wide"><label for="bk-company">Company <span>(optional)</span></label><input id="bk-company" type="text" autocomplete="organization" maxlength="120"></div>' +
              '</div>' +
            '</section>' +
            // step 3
            '<section data-panel="3" hidden>' +
              '<h2 class="bk-title">What is this call about?</h2>' +
              '<label class="bk-label" for="bk-topic">Topic</label>' +
              '<select id="bk-topic" required><option value="">Choose one</option>' + TOPICS.map(function (t) { return '<option value="' + t[0] + '">' + esc(t[1]) + '</option>'; }).join('') + '</select>' +
              '<p class="bk-note">This calendar is only for people who want us to build software. For jobs, please apply on the <a href="/work-with-me">Work with me</a> page.</p>' +
              '<label class="bk-label" for="bk-msg">Tell us in simple words what you want to discuss</label>' +
              '<textarea id="bk-msg" maxlength="1200" required placeholder="For example: I run a clinic chain and want an app for bookings and reminders."></textarea>' +
              '<p class="bk-count" id="bk-count">0 / 20 characters minimum</p>' +
              '<div class="bk-field bk-hp" aria-hidden="true"><label for="bk-site">Leave this field empty</label><input id="bk-site" type="text" tabindex="-1" autocomplete="off"></div>' +
              '<div class="bk-error" id="bk-error" role="alert" hidden></div>' +
            '</section>' +
            // result
            '<section data-panel="done" class="bk-result" role="status" hidden></section>' +
          '</div>' +
          '<div class="bk-foot" id="bk-foot">' +
            '<span class="bk-picked" id="bk-picked"></span>' +
            '<span class="bk-btns"><button class="bk-btn bk-back" type="button" id="bk-back" hidden>Back</button>' +
            '<button class="bk-btn is-primary" type="submit" id="bk-next">Continue ' + ARROW + '</button></span>' +
          '</div>' +
        '</form>' +
      '</div>';
    document.body.appendChild(dlg);

    els.tz = dlg.querySelector('#bk-tz'); els.days = dlg.querySelector('#bk-days'); els.times = dlg.querySelector('#bk-times');
    els.next = dlg.querySelector('#bk-next'); els.back = dlg.querySelector('#bk-back'); els.picked = dlg.querySelector('#bk-picked');
    els.form = dlg.querySelector('form'); els.country = dlg.querySelector('#bk-country'); els.code = dlg.querySelector('#bk-code');
    els.msg = dlg.querySelector('#bk-msg'); els.count = dlg.querySelector('#bk-count'); els.error = dlg.querySelector('#bk-error');
    els.body = dlg.querySelector('#bk-body'); els.done = dlg.querySelector('[data-panel="done"]');

    // time zones: the visitor's own first, then common ones
    var detected = detectTz();
    state.tz = validTz(detected) ? detected : 'UTC';
    var zones = [state.tz].concat(TZ_LIST.filter(function (z) { return z !== state.tz && validTz(z); }));
    els.tz.innerHTML = zones.map(function (z) { return '<option value="' + esc(z) + '">' + esc(tzLabel(z)) + '</option>'; }).join('');
    els.tz.value = state.tz;

    COUNTRIES.forEach(function (c) { var o = document.createElement('option'); o.value = c[0]; o.textContent = c[0]; els.country.appendChild(o); });
    var other = document.createElement('option'); other.value = 'Other'; other.textContent = 'Other (add your +code to the number)'; els.country.appendChild(other);
    if (TZ_COUNTRY[state.tz]) { els.country.value = TZ_COUNTRY[state.tz]; syncCode(); }

    bind();
    loadLive(true);
  }

  // ---------- step 1: day and time ----------
  function currentSlots() {
    if (!state.live) return allSlots();
    var earliest = Date.now() + CONFIG.leadHours * 3600000;
    return state.live.filter(function (ts) { return ts >= earliest; });
  }
  // Ask the server which times are really free on the calendar. If it cannot say, the standard hours are offered.
  function loadLive(force) {
    if (state.pending) return state.pending;
    if (!force && state.liveAt && Date.now() - state.liveAt < 60000) return Promise.resolve();
    if (!window.fetch) { renderDays(); return Promise.resolve(); }
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 5000) : null;
    els.days.innerHTML = '<p class="bk-empty">Checking my calendar…</p>';
    els.times.innerHTML = '';
    state.pending = fetch('/api/slots', { cache: 'no-store', signal: ctl ? ctl.signal : undefined })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (j) {
        if (timer) clearTimeout(timer);
        state.live = j && j.live && Array.isArray(j.slots) ? j.slots : null;
        state.liveAt = Date.now();
        state.pending = null;
        renderDays();
      });
    return state.pending;
  }

  function renderDays() {
    var slots = currentSlots();
    if (state.slot && slots.indexOf(state.slot) === -1) state.slot = 0;
    var byDay = {};
    var order = [];
    slots.forEach(function (ts) {
      var k = dayKey(ts, state.tz);
      if (!byDay[k]) { byDay[k] = []; order.push(k); }
      byDay[k].push(ts);
    });
    els.byDay = byDay;
    if (!order.length) {
      els.days.innerHTML = '<p class="bk-empty">No times are open right now. Please message me on WhatsApp and I will find one.</p>';
      els.times.innerHTML = '';
      return;
    }
    if (!byDay[state.day]) state.day = (state.slot && byDay[dayKey(state.slot, state.tz)]) ? dayKey(state.slot, state.tz) : order[0];
    els.days.innerHTML = order.map(function (k) {
      var ts = byDay[k][0];
      return '<button type="button" class="bk-day" data-day="' + k + '" aria-pressed="' + (k === state.day) + '">' +
        '<small>' + esc(fmt(ts, state.tz, { weekday: 'short' })) + '</small><b>' + esc(fmt(ts, state.tz, { day: 'numeric' })) + '</b><em>' + esc(fmt(ts, state.tz, { month: 'short' })) + '</em></button>';
    }).join('');
    renderTimes();
  }
  function renderTimes() {
    var list = els.byDay[state.day] || [];
    els.times.innerHTML = list.map(function (ts) {
      return '<button type="button" class="bk-time" data-ts="' + ts + '" aria-pressed="' + (ts === state.slot) + '">' + esc(fmt(ts, state.tz, { hour: 'numeric', minute: '2-digit' })) + '</button>';
    }).join('');
    refreshFooter();
  }

  // ---------- footer and step control ----------
  function refreshFooter() {
    if (state.step === 1) {
      els.picked.innerHTML = state.slot ? '<b>' + esc(longTime(state.slot, state.tz)) + '</b>' : 'Pick a day and a time';
      els.next.disabled = !state.slot;
    } else if (state.slot) {
      els.picked.innerHTML = '<b>' + esc(longTime(state.slot, state.tz)) + '</b>';
    }
  }
  function go(n) {
    state.step = n;
    ['1', '2', '3'].forEach(function (s) { dlg.querySelector('[data-panel="' + s + '"]').hidden = String(n) !== s; });
    dlg.querySelectorAll('.bk-steps li').forEach(function (li) {
      var s = +li.getAttribute('data-s');
      li.classList.toggle('on', s === n); li.classList.toggle('done', s < n);
    });
    els.back.hidden = n === 1;
    els.next.innerHTML = n === 3 ? 'Request this call ' + ARROW : 'Continue ' + ARROW;
    els.next.disabled = n === 1 && !state.slot;
    els.body.scrollTop = 0;
    refreshFooter();
    var first = dlg.querySelector('[data-panel="' + n + '"] input, [data-panel="' + n + '"] select:not(#bk-tz)');
    if (first && n > 1) first.focus({ preventScroll: true });
  }

  // ---------- validation ----------
  function syncCode() {
    var c = COUNTRIES.filter(function (x) { return x[0] === els.country.value; })[0];
    els.code.textContent = c ? c[1] : '+';
    els.code.style.display = els.country.value === 'Other' ? 'none' : '';
  }
  function validStep2() {
    var name = dlg.querySelector('#bk-name'), email = dlg.querySelector('#bk-email'), phone = dlg.querySelector('#bk-phone');
    var checks = [
      [name, name.value.trim().length >= 2, 'Please enter your name.'],
      [email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()), 'Please enter a valid email address.'],
      [els.country, !!els.country.value, 'Please choose your country.']
    ];
    var digits = phone.value.replace(/\D/g, '');
    var phoneOk = els.country.value === 'Other' ? (/^\s*\+/.test(phone.value) && digits.length >= 8 && digits.length <= 15) : (digits.length >= 6 && digits.length <= 14);
    checks.push([phone, phoneOk, els.country.value === 'Other' ? 'Please enter your number starting with + and the country code.' : 'Please enter a valid mobile number.']);
    for (var i = 0; i < checks.length; i++) {
      checks[i][0].setCustomValidity(checks[i][1] ? '' : checks[i][2]);
      if (!checks[i][1]) { checks[i][0].reportValidity(); return false; }
    }
    return true;
  }
  function validStep3() {
    var topic = dlg.querySelector('#bk-topic');
    topic.setCustomValidity(topic.value ? '' : 'Please choose what the call is about.');
    if (!topic.value) { topic.reportValidity(); return false; }
    var long = els.msg.value.trim().length >= 20;
    els.msg.setCustomValidity(long ? '' : 'Please write at least 20 characters so I know what to prepare.');
    if (!long) { els.msg.reportValidity(); return false; }
    return true;
  }

  // ---------- submit ----------
  function classify(topicKey, message) {
    var topic = TOPICS.filter(function (t) { return t[0] === topicKey; })[0];
    var hits = (message.match(FLAGGED) || []).map(function (w) { return w.toLowerCase(); });
    hits = hits.filter(function (w, i) { return hits.indexOf(w) === i; });
    if (topic[2] === 'review') return { route: 'review', why: 'topic', hits: hits, topic: topic[1] };
    if (hits.length) return { route: 'review', why: 'words', hits: hits, topic: topic[1] };
    return { route: 'project', why: '', hits: [], topic: topic[1] };
  }
  function track(name, params) {
    try {
      if (window.dataLayer) window.dataLayer.push({ event: name });
      if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
    } catch (e) { /* analytics must never block the form */ }
  }
  function submit() {
    if (state.sending) return;
    var v = function (id) { return dlg.querySelector(id).value.trim(); };
    if (dlg.querySelector('#bk-site').value) { dlg.close(); return; } // honeypot
    var verdict = classify(v('#bk-topic'), v('#bk-msg'));
    var code = els.country.value === 'Other' ? '' : els.code.textContent + ' ';
    var lead = {
      name: v('#bk-name'), email: v('#bk-email'), phone: code + v('#bk-phone'),
      service: verdict.route === 'project' ? 'Call booking request' : 'Call request for review',
      message: v('#bk-msg'), page: location.pathname,
      extras: {
        'Slot (IST)': longTime(state.slot, 'Asia/Kolkata'),
        'Slot (visitor time)': longTime(state.slot, state.tz),
        'Time zone': state.tz,
        'Country': els.country.value,
        'Topic': verdict.topic,
        'Routing': verdict.route === 'project' ? 'Project: slot needs confirming' : (verdict.why === 'topic' ? 'Review: partnership or other topic, no slot held' : 'Review: job or vendor words, no slot held')
      }
    };
    if (v('#bk-company')) lead.extras['Company'] = v('#bk-company');
    if (verdict.hits.length) lead.extras['Flagged words'] = verdict.hits.join(', ');

    state.sending = true; els.next.disabled = true; els.error.hidden = true;
    els.next.textContent = 'Sending…';

    function sendLead() {
      return fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: !!j.ok, status: r.status, error: j.error }; }); })
        .catch(function () { return { ok: false }; });
    }
    function finish(kind, res) {
      state.sending = false;
      if (!res.ok) { fail(lead, res); return; }
      showResult(kind, verdict, lead);
      track(kind === 'review' ? 'call_request_review' : 'generate_lead', { lead_type: kind === 'booked' ? 'call_booked' : 'call_booking', routing: kind });
    }
    function asReview(why) {
      verdict = { route: 'review', why: why, hits: verdict.hits, topic: verdict.topic };
      lead.service = 'Call request for review';
      lead.extras['Routing'] = 'Review: job or vendor words, no slot held';
    }

    if (verdict.route !== 'project') { sendLead().then(function (res) { finish('review', res); }); return; }

    // A real project: put it on the calendar first, then tell Google Chat what happened.
    fetch('/api/book', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot: state.slot, tz: state.tz, name: lead.name, email: lead.email, phone: lead.phone, country: els.country.value, company: v('#bk-company'), topic: v('#bk-topic'), message: lead.message, website: '' })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { j.status = r.status; return j; }); })
      .catch(function () { return { ok: false, reason: 'unavailable' }; })
      .then(function (b) {
        if (b.ok) {
          lead.service = 'Call booked';
          lead.extras['Routing'] = 'Booked on your calendar, invite sent to ' + lead.email + ' and nihar@creuto.com';
          if (b.meetLink) lead.extras['Meet link'] = b.meetLink;
          state.meet = !!b.meet;
          sendLead().then(function (res) { res.ok = true; finish('booked', res); }); // the calendar already has it: show success even if Chat hiccups
          return;
        }
        if (b.reason === 'taken') {
          state.sending = false; state.slot = 0;
          var note = dlg.querySelector('#bk-notice');
          note.textContent = 'Sorry, that time was just taken. Please pick another one.';
          note.hidden = false;
          loadLive(true).then(function () { go(1); });
          return;
        }
        if (b.route === 'review') { asReview('words'); sendLead().then(function (res) { finish('review', res); }); return; }
        if (b.status === 400 && b.error) { state.sending = false; fail(lead, { status: 400, error: b.error }); return; }
        sendLead().then(function (res) { finish('request', res); }); // calendar not connected or not answering: send it to Chat to confirm by hand
      });
  }
  function fail(lead, res) {
    els.next.disabled = false; els.next.innerHTML = 'Request this call ' + ARROW;
    var lines = ['Name: ' + lead.name, 'Email: ' + lead.email, 'Phone: ' + lead.phone, 'Time: ' + lead.extras['Slot (IST)'], '', lead.message].join('\n');
    var href = 'mailto:me@niharrout.com?subject=' + encodeURIComponent('Call request: ' + lead.name) + '&body=' + encodeURIComponent(lines);
    els.error.hidden = false;
    els.error.innerHTML = (res.status === 400 && res.error ? esc(res.error) : 'We could not send that just now. Please try again, or') + (res.status === 400 && res.error ? '' : ' <a href="' + href + '">email your request instead</a>.');
  }
  function showResult(kind, verdict, lead) {
    dlg.querySelector('.bk-head').hidden = true;
    ['1', '2', '3'].forEach(function (s) { dlg.querySelector('[data-panel="' + s + '"]').hidden = true; });
    dlg.querySelector('#bk-foot').hidden = true;
    var first = esc(lead.name.split(/\s+/)[0]);
    if (kind === 'booked') {
      els.done.innerHTML = CHECK_SVG + '<h3>You&rsquo;re booked</h3>' +
        '<p>Thank you, ' + first + '. A calendar invite is on its way to ' + esc(lead.email) + (state.meet ? ', with a Google Meet link' : '') + '.</p>' +
        '<div class="bk-slot"><b>' + esc(longTime(state.slot, state.tz)) + '</b>' + (state.tz === 'Asia/Kolkata' ? '' : esc(longTime(state.slot, 'Asia/Kolkata'))) + '</div>' +
        '<div><button class="bk-btn is-primary" type="button" data-bk-close>Done</button></div>';
    } else if (kind === 'request') {
      els.done.innerHTML = CHECK_SVG + '<h3>Call request received</h3>' +
        '<p>Thank you, ' + first + '. I will confirm this time with you by email.</p>' +
        '<div class="bk-slot"><b>' + esc(longTime(state.slot, state.tz)) + '</b>' + (state.tz === 'Asia/Kolkata' ? '' : esc(longTime(state.slot, 'Asia/Kolkata'))) + '</div>' +
        '<div><button class="bk-btn is-primary" type="button" data-bk-close>Done</button></div>';
    } else {
      els.done.innerHTML = CHECK_SVG + '<h3>Thank you for your request</h3>' +
        '<p>Thank you for your request. Our team will review it and get back to you if it is a fit.</p>' +
        (verdict.why === 'words' ? '<p>Looks like this is about careers or partnership. For jobs, please apply on the <a href="/work-with-me">Work with me</a> page.</p>' : '') +
        '<div><button class="bk-btn is-primary" type="button" data-bk-close>Done</button></div>';
    }
    els.done.hidden = false;
    els.body.scrollTop = 0;
  }

  // ---------- open / close ----------
  function reset() {
    if (!dlg) return;
    state.step = 1; state.sending = false; state.slot = 0; state.day = '';
    dlg.querySelector('.bk-head').hidden = false;
    dlg.querySelector('#bk-foot').hidden = false;
    els.done.hidden = true; els.done.innerHTML = '';
    els.form.reset();
    var tzGuess = TZ_COUNTRY[state.tz]; if (tzGuess) els.country.value = tzGuess;
    syncCode(); updateCount(); els.error.hidden = true;
    dlg.querySelector('#bk-notice').hidden = true;
    loadLive(true); go(1);
  }
  function open() {
    build();
    if (!els.done.hidden) reset();
    go(state.step === 1 ? 1 : state.step);
    if (!dlg.open) dlg.showModal();
    document.documentElement.classList.add('bk-lock');
    loadLive(false);
    return true;
  }
  function updateCount() {
    var n = els.msg.value.trim().length;
    els.count.textContent = n >= 20 ? n + ' characters' : n + ' / 20 characters minimum';
    els.count.classList.toggle('ok', n >= 20);
  }

  function bind() {
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) { dlg.close(); return; }
      var t = e.target.closest && e.target.closest('button, a');
      if (!t) return;
      if (t.hasAttribute('data-bk-close')) { dlg.close(); return; }
      if (t.classList.contains('bk-day')) { state.day = t.getAttribute('data-day'); els.days.querySelectorAll('.bk-day').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); }); renderTimes(); return; }
      if (t.classList.contains('bk-time')) { dlg.querySelector('#bk-notice').hidden = true; state.slot = +t.getAttribute('data-ts'); els.times.querySelectorAll('.bk-time').forEach(function (b) { b.setAttribute('aria-pressed', String(b === t)); }); refreshFooter(); els.next.disabled = false; return; }
      if (t.id === 'bk-back') go(state.step - 1);
    });
    els.tz.addEventListener('change', function () { state.tz = els.tz.value; renderDays(); });
    els.country.addEventListener('change', function () { syncCode(); });
    els.msg.addEventListener('input', function () { els.msg.setCustomValidity(''); updateCount(); });
    dlg.addEventListener('input', function (e) { if (e.target.setCustomValidity) e.target.setCustomValidity(''); });
    els.form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (state.step === 1) { if (state.slot) go(2); }
      else if (state.step === 2) { if (validStep2()) go(3); }
      else if (validStep3()) submit();
    });
    dlg.addEventListener('close', function () {
      document.documentElement.classList.remove('bk-lock');
      if (!els.done.hidden) reset();
    });
  }

  // ---------- take over the Book a Call buttons ----------
  var SELECTOR = 'a[data-calendly], a.btn-book-call, a[href="#calendly"], a[href*="calendly.com/creuto"]';
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest(SELECTOR);
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (typeof HTMLDialogElement === 'undefined') return; // old browser: the link opens Calendly as before
    e.preventDefault();
    e.stopPropagation();
    track('contact_click', { contact_method: 'book_call', click_location: 'booking popup' });
    open();
  }, true);

  window.nrBooking = { open: open };
})();
