/**
 * Free URL Shortener. Sends the pasted link to /api/shorten and shows the short link with a Copy button.
 * The last few links are kept in this browser only (localStorage), never on the server.
 */
(function () {
  'use strict';

  var form = document.getElementById('short-form');
  if (!form) return;

  var input = document.getElementById('short-input');
  var button = document.getElementById('short-btn');
  var hint = document.getElementById('short-hint');
  var result = document.getElementById('short-result');
  var link = document.getElementById('short-link');
  var orig = document.getElementById('short-orig');
  var copyBtn = document.getElementById('short-copy');
  var errorEl = document.getElementById('short-error');
  var historyBox = document.getElementById('short-history');
  var historyList = document.getElementById('short-history-list');
  var clearBtn = document.getElementById('short-clear');
  var KEY = 'nr_short_history';
  var MAX = 8;

  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]') || []; } catch (e) { return []; } }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX))); } catch (e) { /* storage unavailable: history just is not kept */ } }

  function shorten(text) {
    var s = String(text || '').trim();
    return s.length > 56 ? s.slice(0, 55) + '…' : s;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;left:-9999px;top:0;';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy') ? resolve() : reject(); } catch (e) { reject(e); }
      ta.remove();
    });
  }

  function flash(btn, text) {
    var old = btn.getAttribute('data-label') || btn.textContent;
    btn.setAttribute('data-label', old);
    btn.textContent = text;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = old; }, 1600);
  }

  function renderHistory() {
    var list = load();
    historyList.textContent = '';
    historyBox.hidden = !list.length;
    list.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.short; a.target = '_blank'; a.rel = 'noopener nofollow'; a.textContent = item.short.replace(/^https:\/\//, '');
      var o = document.createElement('span');
      o.className = 'short-history-orig'; o.textContent = shorten(item.url); o.title = item.url;
      var c = document.createElement('button');
      c.type = 'button'; c.className = 'short-copy is-small'; c.textContent = 'Copy';
      c.addEventListener('click', function () { copyText(item.short).then(function () { flash(c, 'Copied'); }, function () { flash(c, 'Press Ctrl+C'); }); });
      li.appendChild(a); li.appendChild(o); li.appendChild(c);
      historyList.appendChild(li);
    });
  }

  function showError(message) {
    errorEl.textContent = message;
    errorEl.hidden = false;
    result.hidden = true;
  }

  function track(provider) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', 'tool_use', { tool_name: 'url_shortener', provider: provider || '' });
    } catch (e) { /* analytics must never get in the way */ }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value.trim();
    errorEl.hidden = true;
    if (!value) { showError('Paste a link to shorten.'); input.focus(); return; }

    button.disabled = true;
    button.textContent = 'Shortening…';
    fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: value })
    })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (json) { return { status: r.status, json: json }; }); })
      .then(function (res) {
        if (!res.json.ok) { showError(res.json.error || 'Something went wrong. Please try again.'); return; }
        link.href = res.json.short;
        link.textContent = res.json.short.replace(/^https:\/\//, '');
        orig.textContent = 'Original: ' + shorten(value.replace(/^(?!https?:\/\/)/i, 'https://'));
        result.hidden = false;
        var list = load().filter(function (i) { return i.short !== res.json.short; });
        list.unshift({ short: res.json.short, url: value });
        save(list);
        renderHistory();
        track(res.json.provider);
        copyText(res.json.short).then(function () { flash(copyBtn, 'Copied'); }, function () { /* the Copy button is still there */ });
      })
      .catch(function () { showError('Could not reach the shortening service. Check your connection and try again.'); })
      .then(function () { button.disabled = false; button.textContent = 'Shorten link'; });
  });

  copyBtn.addEventListener('click', function () {
    copyText(link.href).then(function () { flash(copyBtn, 'Copied'); }, function () { flash(copyBtn, 'Press Ctrl+C'); });
  });

  clearBtn.addEventListener('click', function () { save([]); renderHistory(); });

  input.addEventListener('input', function () { errorEl.hidden = true; });

  renderHistory();
})();
