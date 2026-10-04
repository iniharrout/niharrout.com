/**
 * "Where I am right now" card in the homepage contact section.
 * Shows the local time in Bhubaneswar, the visitor's own time and how far apart the two are,
 * and the current weather in Bhubaneswar (Open-Meteo, no key, no cookies, nothing about the
 * visitor is sent: the request carries only fixed coordinates). The weather is fetched once
 * the card scrolls into view and cached for 20 minutes. If anything fails the card still works.
 */
(function () {
  'use strict';

  // The project-brief form is tucked away until someone asks for it.
  var toggle = document.querySelector('.cx-brief-toggle');
  var panel = document.getElementById('briefPanel');
  function setBrief(open) {
    if (!toggle || !panel) return;
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('is-open', open);
  }
  if (toggle && panel) {
    toggle.addEventListener('click', function () { setBrief(panel.hidden); });
    document.addEventListener('click', function (event) {
      var link = event.target.closest && event.target.closest('a[data-open-brief]');
      if (link) setBrief(true);
    });
    if (location.hash === '#brief') { setBrief(true); }
  }

  var card = document.getElementById('liveCard');
  if (!card || typeof Intl === 'undefined' || !Intl.DateTimeFormat) return;

  var HOME_TZ = 'Asia/Kolkata';
  var timeEl = document.getElementById('liveTime');
  var youEl = document.getElementById('liveYou');
  var noteEl = document.getElementById('liveNote');
  var wxCell = document.getElementById('liveWxCell');
  var wxEl = document.getElementById('liveWx');

  var visitorTz = '';
  try { visitorTz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* fall back to browser default */ }

  function fmt(tz) {
    var opts = { hour: 'numeric', minute: '2-digit', hour12: true };
    if (tz) opts.timeZone = tz;
    return new Intl.DateTimeFormat('en-US', opts);
  }

  // Offset (minutes) of a zone from UTC at a given instant, derived from formatted parts.
  function offsetMinutes(tz, date) {
    var o = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' };
    if (tz) o.timeZone = tz;
    var parts = {};
    new Intl.DateTimeFormat('en-US', o).formatToParts(date).forEach(function (p) { parts[p.type] = parseInt(p.value, 10); });
    var asUtc = Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second);
    return Math.round((asUtc - Math.floor(date.getTime() / 1000) * 1000) / 60000);
  }

  function gap(mins) {
    var a = Math.abs(mins), h = Math.floor(a / 60), m = a % 60;
    if (m) return h + 'h ' + m + 'm';
    return h + (h === 1 ? ' hour' : ' hours');
  }

  function render() {
    var now = new Date();
    var home = fmt(HOME_TZ), you = fmt(visitorTz);
    timeEl.textContent = home.format(now);
    youEl.textContent = you.format(now);

    var diff = offsetMinutes(HOME_TZ, now) - offsetMinutes(visitorTz, now);
    var zone = '';
    if (diff === 0) zone = 'same time zone as you';
    else if (diff > 0) zone = gap(diff) + ' ahead of you';
    else zone = gap(diff) + ' behind you';
    noteEl.textContent = zone;
  }

  var WEATHER = {
    0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Fog',
    51: 'Light drizzle', 53: 'Drizzle', 55: 'Drizzle', 56: 'Freezing drizzle', 57: 'Freezing drizzle',
    61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Freezing rain', 67: 'Freezing rain',
    71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
    80: 'Rain showers', 81: 'Rain showers', 82: 'Heavy showers', 85: 'Snow showers', 86: 'Snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
  };

  function showWeather(temp, code) {
    if (typeof temp !== 'number' || !isFinite(temp)) return;
    var label = WEATHER[code] || '';
    wxEl.textContent = Math.round(temp) + '°C' + (label ? ', ' + label : '');
    wxCell.hidden = false;
  }

  function loadWeather() {
    var KEY = 'contactLiveWx', TTL = 20 * 60 * 1000;
    try {
      var cached = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      if (cached && Date.now() - cached.t < TTL) { showWeather(cached.temp, cached.code); return; }
    } catch (e) { /* storage unavailable */ }
    if (!window.fetch) return;
    var url = 'https://api.open-meteo.com/v1/forecast?latitude=20.2961&longitude=85.8245&current=temperature_2m,weather_code&timezone=Asia%2FKolkata';
    var ctl = window.AbortController ? new AbortController() : null;
    var timer = ctl ? setTimeout(function () { ctl.abort(); }, 6000) : null;
    fetch(url, ctl ? { signal: ctl.signal } : undefined)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (timer) clearTimeout(timer);
        if (!d || !d.current) return;
        var temp = d.current.temperature_2m, code = d.current.weather_code;
        showWeather(temp, code);
        try { sessionStorage.setItem(KEY, JSON.stringify({ t: Date.now(), temp: temp, code: code })); } catch (e) { /* ignore */ }
      })
      .catch(function () { if (timer) clearTimeout(timer); });
  }

  try { render(); } catch (e) { return; }
  card.hidden = false;
  setInterval(function () { try { render(); } catch (e) { /* keep last values */ } }, 30000);

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) { io.disconnect(); loadWeather(); }
    }, { rootMargin: '300px 0px' });
    io.observe(card);
  } else {
    loadWeather();
  }
})();
