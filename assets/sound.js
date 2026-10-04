/**
 * Optional sound effects. Off by default: nothing plays until a visitor switches the small speaker button on, and the
 * choice is remembered. Sounds are generated in the browser with Web Audio (no audio files): a soft tick on the main
 * actions and a gentle two-note chime when an enquiry is sent. Not shown to visitors who prefer reduced motion.
 */
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;

  var KEY = 'nr_sound';
  var ctx = null;
  var on = false;
  try { on = localStorage.getItem(KEY) === '1'; } catch (e) { /* storage unavailable: starts off */ }

  var ACTIONS = '.hero-btn-primary, .hero-btn-secondary, .btn-solid, .cl-button, .sc-cta, .sc-call, .sc-wa, .faq2-btn, .cx-method, .nr-consent-btn.is-accept, form button[type="submit"], a[data-calendly], a[href^="tel:"], a[href*="wa.me"]';

  function context() {
    if (!ctx) { try { ctx = new AC(); } catch (e) { return null; } }
    if (ctx.state === 'suspended') { try { ctx.resume(); } catch (e) { /* needs a gesture */ } }
    return ctx;
  }

  function note(freq, start, dur, peak, type) {
    var c = context();
    if (!c || c.state !== 'running') return;
    var t0 = c.currentTime + start;
    var osc = c.createOscillator();
    var gain = c.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.82, t0 + dur);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  var sound = {
    enabled: function () { return on; },
    tick: function () { if (on && !document.hidden) { note(980, 0, 0.07, 0.05, 'triangle'); } },
    success: function () { if (on && !document.hidden) { note(659, 0, 0.18, 0.06); note(880, 0.13, 0.26, 0.06); } },
  };
  window.nrSound = sound;

  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nr-sound';
  btn.setAttribute('aria-label', 'Sound effects');
  var ICON = {
    off: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="m16 9.5 5 5m0-5-5 5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
    on: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4.2 4.2 0 0 1 0 6M18 6.5a7.6 7.6 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>',
  };
  var footLink;
  function paint() {
    btn.innerHTML = on ? ICON.on : ICON.off;
    btn.classList.toggle('is-on', on);
    btn.setAttribute('aria-pressed', String(on));
    btn.title = on ? 'Sound effects: on (click to turn off)' : 'Sound effects: off (click to turn on)';
    if (footLink) footLink.textContent = on ? 'Sound: on' : 'Sound: off';
  }
  paint();

  function toggle() {
    on = !on;
    try { localStorage.setItem(KEY, on ? '1' : '0'); } catch (e) { /* ignore */ }
    paint();
    if (on) { context(); setTimeout(function () { note(980, 0, 0.07, 0.05, 'triangle'); }, 30); }
  }

  btn.addEventListener('click', function (event) { event.stopPropagation(); toggle(); });

  document.addEventListener('click', function (event) {
    if (!on || !event.target.closest) return;
    var hit = event.target.closest(ACTIONS);
    if (hit && !hit.closest('.nr-sound') && !hit.closest('[data-sound-toggle]')) { context(); sound.tick(); }
  }, true);

  function mount() {
    document.body.appendChild(btn);
    var legal = document.querySelector('.sc-foot-legal');
    if (legal) {
      footLink = document.createElement('a');
      footLink.href = '#sound';
      footLink.setAttribute('data-sound-toggle', '');
      footLink.setAttribute('role', 'switch');
      footLink.addEventListener('click', function (event) { event.preventDefault(); toggle(); footLink.setAttribute('aria-checked', String(on)); });
      var back = legal.querySelector('a[href="#top"]');
      legal.insertBefore(footLink, back || null);
      paint();
      footLink.setAttribute('aria-checked', String(on));
    }
    var footer = document.querySelector('footer.sc-footer');
    if (footer && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        btn.classList.toggle('is-hidden', entries[0].isIntersecting);
      }, { threshold: 0.05 }).observe(footer);
    }
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
