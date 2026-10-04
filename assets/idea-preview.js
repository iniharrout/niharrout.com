/**
 * "Type an idea. Watch it take shape." A small, purely client-side illustration. The idea you type only changes the
 * preview on this page and the pre-filled WhatsApp message behind the button. Nothing is sent anywhere.
 */
(function () {
  'use strict';

  var input = document.getElementById('ideaInput');
  var device = document.getElementById('ideaDevice');
  var cta = document.getElementById('ideaCta');
  if (!input || !device) return;

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var samples = ['an app for booking dog walkers', 'a portal for our logistics clients', 'a helpdesk that answers from our docs'];
  var labels = { mobile: 'mobile app', web: 'web app', ai: 'AI product' };
  var type = 'mobile';
  var idea = samples[0];
  var typed = false;
  var sampleIdx = 0;
  var timer = null;

  function h(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }
  function bars(n, cls) {
    var wrap = h('div', cls || 'ip-lines');
    for (var i = 0; i < n; i++) wrap.appendChild(h('i'));
    return wrap;
  }
  function title(text) {
    var t = text.replace(/^(an?|the|my|our)\s+/i, '').trim();
    t = t.charAt(0).toUpperCase() + t.slice(1);
    return t.length > 30 ? t.slice(0, 29).trim() + '…' : t;
  }

  function phone() {
    var root = h('div', 'ip-phone');
    root.appendChild(h('span', 'ip-notch'));
    var head = h('div', 'ip-head');
    head.appendChild(h('small', null, 'Your idea'));
    head.appendChild(h('strong', null, title(idea)));
    root.appendChild(head);
    root.appendChild(h('div', 'ip-search'));
    var cards = h('div', 'ip-cards');
    ['Popular', 'Nearby'].forEach(function (name) {
      var c = h('div', 'ip-card');
      c.appendChild(h('span', 'ip-thumb'));
      c.appendChild(h('b', null, name));
      c.appendChild(bars(2));
      cards.appendChild(c);
    });
    root.appendChild(cards);
    root.appendChild(h('div', 'ip-btn', 'Get started'));
    var tabs = h('div', 'ip-tabs');
    for (var i = 0; i < 4; i++) tabs.appendChild(h('i', i === 0 ? 'is-on' : ''));
    root.appendChild(tabs);
    return root;
  }

  function web() {
    var root = h('div', 'ip-browser');
    var bar = h('div', 'ip-bar');
    bar.appendChild(h('i')); bar.appendChild(h('i')); bar.appendChild(h('i'));
    bar.appendChild(h('span', null, 'yourapp.com'));
    root.appendChild(bar);
    var body = h('div', 'ip-bbody');
    var side = h('div', 'ip-side');
    for (var i = 0; i < 5; i++) side.appendChild(h('i', i === 0 ? 'is-on' : ''));
    body.appendChild(side);
    var main = h('div', 'ip-main');
    main.appendChild(h('strong', null, title(idea)));
    var tiles = h('div', 'ip-tiles');
    for (var t = 0; t < 3; t++) { var tile = h('div', 'ip-tile'); tile.appendChild(h('i')); tile.appendChild(h('b')); tiles.appendChild(tile); }
    main.appendChild(tiles);
    var chart = h('div', 'ip-chart');
    [38, 62, 48, 80, 58, 92, 70].forEach(function (v, k) { var b = h('i'); b.style.height = v + '%'; b.style.animationDelay = (k * 70) + 'ms'; chart.appendChild(b); });
    main.appendChild(chart);
    body.appendChild(main);
    root.appendChild(body);
    return root;
  }

  function ai() {
    var root = h('div', 'ip-chat');
    var head = h('div', 'ip-chat-head');
    head.appendChild(h('span', 'ip-spark', '✦'));
    head.appendChild(h('strong', null, title(idea)));
    root.appendChild(head);
    root.appendChild(h('div', 'ip-bubble ip-me', 'What can you tell me about this?'));
    var bot = h('div', 'ip-bubble ip-bot');
    bot.appendChild(bars(3));
    var src = h('div', 'ip-src');
    src.appendChild(h('span', null, 'Source 1'));
    src.appendChild(h('span', null, 'Source 2'));
    bot.appendChild(src);
    root.appendChild(bot);
    root.appendChild(h('div', 'ip-input', 'Ask a follow-up'));
    return root;
  }

  function render() {
    device.className = 'idea-device is-' + type;
    device.textContent = '';
    device.appendChild(type === 'mobile' ? phone() : type === 'web' ? web() : ai());
    device.classList.remove('is-swap');
    void device.offsetWidth;
    device.classList.add('is-swap');
    if (cta) {
      var msg = 'Hi Nihar, I have an idea for ' + (type === 'ai' ? 'an ' : 'a ') + labels[type] + ': ' + idea + '. Can we talk?';
      cta.href = 'https://wa.me/917608844995?text=' + encodeURIComponent(msg);
    }
  }

  function setIdea(value) {
    idea = value.trim() || samples[sampleIdx];
    render();
  }

  var debounce = null;
  input.addEventListener('input', function () {
    typed = true;
    clearInterval(timer);
    clearTimeout(debounce);
    debounce = setTimeout(function () { setIdea(input.value); }, 220);
  });

  document.querySelectorAll('.idea-types button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      type = btn.getAttribute('data-type');
      document.querySelectorAll('.idea-types button').forEach(function (b) { b.setAttribute('aria-checked', String(b === btn)); });
      render();
    });
  });

  render();
  if (!reduce) {
    timer = setInterval(function () {
      if (typed || document.hidden) return;
      sampleIdx = (sampleIdx + 1) % samples.length;
      idea = samples[sampleIdx];
      render();
    }, 3600);
  }
})();
