/**
 * Site chrome behaviour: announcement card and pop-up, dropdown menus, mobile menu and the footer year.
 * The header and footer themselves are plain HTML (partials/*.html).
 */
(function () {
  'use strict';

  var header = document.getElementById('site-header');
  if (!header) return;

  var menus = header.querySelectorAll('.sc-has-menu');
  var burger = header.querySelector('.sc-burger');
  var drawer = document.getElementById('sc-drawer');

  function closeMenus(except) {
    menus.forEach(function (item) {
      if (item === except) return;
      item.classList.remove('open');
      var toggle = item.querySelector('.sc-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  }

  function setDrawer(open) {
    if (!burger || !drawer) return;
    drawer.hidden = !open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    burger.classList.toggle('is-open', open);
    header.classList.toggle('is-menu-open', open);
    document.documentElement.classList.toggle('sc-lock', open);
  }

  menus.forEach(function (item) {
    var toggle = item.querySelector('.sc-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', function (event) {
      event.stopPropagation();
      var open = !item.classList.contains('open');
      closeMenus(item);
      item.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
  });

  // Mega menus: pointing at (or tabbing to) a service family shows its services.
  header.querySelectorAll('.sc-mega').forEach(function (mega) {
    var fams = mega.querySelectorAll('.sc-fam');
    var panels = mega.querySelectorAll('.sc-mega-panel');
    function show(key) {
      fams.forEach(function (f) { f.classList.toggle('is-active', f.getAttribute('data-fam') === key); });
      panels.forEach(function (p) { p.classList.toggle('is-active', p.getAttribute('data-fam') === key); });
    }
    fams.forEach(function (f) {
      f.addEventListener('mouseenter', function () { show(f.getAttribute('data-fam')); });
      f.addEventListener('focus', function () { show(f.getAttribute('data-fam')); });
    });
  });

  // Call button: on a computer, show the number and the options (there may be no calling app); on phones the link dials at once.
  var callBtn = header.querySelector('.sc-call');
  var callPop = header.querySelector('.sc-callpop');
  if (callBtn && callPop && window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    callBtn.setAttribute('data-pop', '1');
    callBtn.setAttribute('aria-haspopup', 'dialog');
    callBtn.setAttribute('aria-expanded', 'false');
    var setPop = function (open) { callPop.hidden = !open; callBtn.setAttribute('aria-expanded', String(open)); };
    callBtn.addEventListener('click', function (event) { event.preventDefault(); setPop(callPop.hidden); });
    document.addEventListener('click', function (event) {
      if (!callPop.hidden && !callPop.contains(event.target) && !callBtn.contains(event.target)) setPop(false);
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !callPop.hidden) { setPop(false); callBtn.focus(); }
    });
    var copyBtn = callPop.querySelector('[data-copy]');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      var done = function () { copyBtn.textContent = 'Copied'; setTimeout(function () { copyBtn.textContent = 'Copy number'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('+917608844995').then(done, done);
      else done();
    });
  }

  // "Call me" links that show a label instead of the number: on a computer the first click reveals the number
  // (a second click still dials); on a phone the link dials at once.
  document.addEventListener('click', function (event) {
    var a = event.target.closest && event.target.closest('a[data-reveal-phone]');
    if (!a || a.getAttribute('data-revealed')) return;
    if (!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches)) return;
    event.preventDefault();
    var label = a.querySelector('[data-phone-text]');
    if (label) label.textContent = a.getAttribute('data-reveal-phone');
    a.setAttribute('data-revealed', '1');
    a.setAttribute('data-pop', '1'); // not a call yet: keeps the click out of the contact-click count
    setTimeout(function () { a.removeAttribute('data-pop'); }, 0);
  }, true);

  // Mobile menu: built from the desktop menus above so the two never drift apart.
  var acc = drawer && drawer.querySelector('[data-sc-acc]');
  if (acc) {
    var chevron = '<svg viewBox="0 0 10 6" aria-hidden="true"><path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    header.querySelectorAll('.sc-links > .sc-item').forEach(function (li, index) {
      if (li.classList.contains('sc-item-ai')) { // the sparkle AI link becomes the first, plain entry in the phone menu
        var aiLink = li.querySelector('a.sc-ai');
        if (aiLink) {
          var plainAi = document.createElement('a');
          plainAi.className = 'sc-acc-link';
          plainAi.href = aiLink.getAttribute('href');
          plainAi.textContent = 'AI';
          acc.appendChild(plainAi);
        }
        return;
      }
      var link = li.querySelector('.sc-link');
      var menu = li.querySelector('.sc-menu');
      if (!link) return;
      var label = link.textContent.trim();
      if (!menu) {
        var plain = document.createElement('a');
        plain.className = 'sc-acc-link';
        plain.href = link.getAttribute('href');
        plain.textContent = label;
        acc.appendChild(plain);
        return;
      }
      var item = document.createElement('div');
      item.className = 'sc-acc-item';
      var panelId = 'sc-acc-' + index;
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'sc-acc-btn';
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-controls', panelId);
      button.innerHTML = '<span></span>' + chevron;
      button.firstChild.textContent = label;
      var panel = document.createElement('div');
      panel.className = 'sc-acc-panel';
      panel.id = panelId;
      var inner = document.createElement('div');
      inner.className = 'sc-acc-inner';
      // mega menus list dozens of links; the phone menu shows only the top level (families, industries) and the "all" link
      var mobileLinks = menu.classList.contains('sc-mega') ? menu.querySelectorAll('a.sc-fam, a.sc-ind, a.sc-menu-all') : menu.querySelectorAll('a');
      mobileLinks.forEach(function (a) {
        if (a.closest('.sc-mega-strip')) return; // the desktop promo strip is not repeated in the phone menu
        var copy = a.cloneNode(true);
        // desktop entries carry an icon and a description; the phone menu shows just the name
        var name = a.querySelector('.sc-fam-t') || a.querySelector('.sc-entry-t strong');
        if (name) copy.textContent = name.textContent;
        if (a.classList.contains('sc-menu-all')) copy.className = 'sc-acc-all';
        inner.appendChild(copy);
      });
      panel.appendChild(inner);
      item.appendChild(button);
      item.appendChild(panel);
      acc.appendChild(item);
      button.addEventListener('click', function () {
        var open = !item.classList.contains('open');
        acc.querySelectorAll('.sc-acc-item.open').forEach(function (other) {
          other.classList.remove('open');
          other.querySelector('.sc-acc-btn').setAttribute('aria-expanded', 'false');
        });
        item.classList.toggle('open', open);
        button.setAttribute('aria-expanded', String(open));
      });
    });
  }

  if (burger && drawer) {
    burger.addEventListener('click', function () { setDrawer(drawer.hidden); });
    drawer.addEventListener('click', function (event) {
      if (event.target.closest('a')) setDrawer(false);
    });
  }

  document.addEventListener('click', function (event) {
    if (!header.contains(event.target)) closeMenus();
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { closeMenus(); setDrawer(false); }
  });
  window.addEventListener('resize', function () {
    if (window.innerWidth > 991) setDrawer(false);
  });

  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Contact-button tracking: which button was tapped and where. Sends to /api/track (a no-op until
  // CLICK_WEBHOOK_URL is set on the host) and also to dataLayer / gtag / plausible if one is ever added.
  function whereOnPage(el) {
    if (el.classList.contains('sc-wafab')) return 'floating button';
    if (el.closest('#quote')) return 'quote section';
    if (el.closest('#sc-drawer')) return 'mobile menu';
    if (el.closest('.sc-header')) return 'nav';
    if (el.closest('.sc-footer')) return 'footer';
    if (el.closest('#hero')) return 'hero';
    if (el.closest('#next')) return 'next steps';
    if (el.closest('#faq')) return 'faq';
    if (el.closest('#contact')) return 'contact section';
    return 'page';
  }
  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a');
    if (!link) return;
    if (link.hasAttribute('data-pop')) return; // opens the number pop-over; the Call now button inside it is what counts
    var href = link.getAttribute('href') || '';
    var name = null;
    if (href.indexOf('tel:') === 0) name = 'call';
    else if (href.indexOf('wa.me') !== -1) name = 'whatsapp';
    else if (link.hasAttribute('data-book') || href.indexOf('calendly.com/') !== -1) name = 'book_call';
    else if (href.indexOf('mailto:') === 0) name = 'email';
    if (!name) return;
    var where = whereOnPage(link);
    try {
      var payload = JSON.stringify({ event: name, where: where, page: location.pathname });
      if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
      var detail = { event: 'contact_click', contact_method: name, click_location: where, page_path: location.pathname };
      if (window.dataLayer) window.dataLayer.push(detail);
      if (typeof window.gtag === 'function') window.gtag('event', 'contact_click', { contact_method: name, click_location: where });
      if (typeof window.plausible === 'function') window.plausible('contact_click', { props: { method: name, location: where } });
    } catch (e) { /* tracking must never get in the way of the click */ }
  }, true);

  // Where this visitor first came from (search engine, LinkedIn, an ad, ...), kept in this browser for 90 days.
  // Nothing is sent anywhere: assets/lead-forms.js adds it to an enquiry only when the visitor submits a form.
  (function rememberSource() {
    try {
      var KEY = 'nr-src';
      var q = new URLSearchParams(location.search);
      var host = '';
      try { host = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, '') : ''; } catch (e) {}
      var campaign = q.get('utm_source') || q.get('gclid') || q.get('fbclid');
      var saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      var fresh = saved && Date.now() - saved.ts < 90 * 864e5;
      if (!campaign && (fresh || /(^|\.)niharrout\.com$/.test(host))) return;
      var source = 'Direct or bookmark';
      var RULES = [[/google\./, 'Google search'], [/bing\.com/, 'Bing search'], [/duckduckgo/, 'DuckDuckGo'], [/yahoo\./, 'Yahoo search'],
        [/chatgpt\.com|openai\.com/, 'ChatGPT'], [/perplexity/, 'Perplexity'], [/gemini\.google|bard\.google/, 'Gemini'], [/claude\.ai/, 'Claude'],
        [/linkedin|lnkd\.in/, 'LinkedIn'], [/facebook|fb\.com|instagram/, 'Facebook or Instagram'], [/(^|\.)x\.com|t\.co$|twitter/, 'X (Twitter)'],
        [/clutch\.co/, 'Clutch'], [/goodfirms/, 'GoodFirms'], [/creuto\.com/, 'creuto.com'], [/whatsapp/, 'WhatsApp'], [/github/, 'GitHub']];
      if (host) {
        source = 'Website: ' + host;
        for (var i = 0; i < RULES.length; i++) if (RULES[i][0].test(host)) { source = RULES[i][1]; break; }
      }
      if (q.get('gclid')) source = 'Google Ads';
      else if (q.get('utm_source')) source = q.get('utm_source') + (q.get('utm_medium') ? ' / ' + q.get('utm_medium') : '');
      localStorage.setItem(KEY, JSON.stringify({ source: source, landing: location.pathname, campaign: q.get('utm_campaign') || '', ts: Date.now() }));
    } catch (e) { /* storage blocked: enquiries simply arrive without a source */ }
  })();

  // Floating WhatsApp button, shown once the visitor scrolls. Not on careers, booking or thank-you pages.
  (function whatsappButton() {
    if (/^\/(work-with-me|thank-you|book|offline|preview)(\/|$)/.test(location.pathname) || document.querySelector('[data-no-wa], .sc-wafab')) return;
    var h1 = document.querySelector('h1');
    var topic = h1 ? h1.textContent.replace(/\s+/g, ' ').trim().slice(0, 90) : document.title;
    var text = 'Hi Nihar, I found your website (' + topic + ') and would like to discuss a project.';
    var a = document.createElement('a');
    a.className = 'sc-wafab';
    a.href = 'https://wa.me/917608844995?text=' + encodeURIComponent(text);
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Chat with Nihar on WhatsApp');
    a.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.22-.08-.39-.12-.55.13-.16.24-.63.8-.78.96-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.74 2.74 0 0 0-.86 2.04 4.76 4.76 0 0 0 1 2.53 10.9 10.9 0 0 0 4.17 3.68c1.55.67 2.16.73 2.94.61.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.1-.22-.16-.47-.28Z"/></svg><span class="sc-wafab-label">Chat on WhatsApp</span>';
    document.body.appendChild(a);
    function toggle() { a.classList.toggle('is-on', window.scrollY > 320); }
    toggle();
    window.addEventListener('scroll', toggle, { passive: true });
  })();

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // live local times (footer country cards, country pages): [data-clock data-tz] shows the time there,
  // [data-clock-diff data-tz] the gap to India (data-short gives "IST +1:30", otherwise a sentence)
  var clocks = document.querySelectorAll('[data-clock]');
  var diffs = document.querySelectorAll('[data-clock-diff]');
  function offsetMin(tz, d) {
    return Math.round((new Date(d.toLocaleString('en-US', { timeZone: tz })) - new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }))) / 60000);
  }
  function span(m) { var h = Math.floor(m / 60), r = m % 60; return h + (r ? ':' + (r < 10 ? '0' : '') + r : '') ; }
  function words(m) { var h = Math.floor(m / 60), r = m % 60; return (h ? h + (h === 1 ? ' hour' : ' hours') : '') + (r ? (h ? ' ' : '') + r + ' minutes' : ''); }
  function tick() {
    var now = new Date();
    clocks.forEach(function (el) {
      try { el.textContent = now.toLocaleTimeString('en-US', { timeZone: el.getAttribute('data-tz'), hour: 'numeric', minute: '2-digit' }); } catch (e) { /* unknown zone: keep the label */ }
    });
    diffs.forEach(function (el) {
      var tz = el.getAttribute('data-tz'), m;
      try { m = offsetMin(tz, now) - offsetMin('Asia/Kolkata', now); } catch (e) { return; }
      if (el.hasAttribute('data-short')) {
        el.textContent = m === 0 ? 'Home' : 'IST ' + (m > 0 ? '+' : '\u2212') + span(Math.abs(m));
      } else {
        el.textContent = m === 0 ? 'Same time as India' : 'India is ' + words(Math.abs(m)) + (m > 0 ? ' behind' : ' ahead') + ' right now';
      }
    });
  }
  if (clocks.length || diffs.length) { tick(); setInterval(tick, 30000); }
})();

/**
 * Announcement: one place to change or retire it. Set ANNOUNCEMENT to null to remove both the
 * slide-up card (every page) and the pop-up (homepage, desktop, once per visitor).
 * Change `id` when announcing something new so visitors who dismissed the last one see it.
 */
(function () {
  'use strict';

  var ANNOUNCEMENT = null;

  if (!ANNOUNCEMENT) return;

  var path = location.pathname.replace(/\/+$/, '') || '/';
  if (ANNOUNCEMENT.hideOn.indexOf(path) !== -1) return;

  var toastKey = 'sc-toast-' + ANNOUNCEMENT.id;
  var modalKey = 'sc-modal-' + ANNOUNCEMENT.id;
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function get(key) { try { return localStorage.getItem(key) === '1'; } catch (e) { return false; } }
  function set(key) { try { localStorage.setItem(key, '1'); } catch (e) {} }
  function el(tag, cls, html) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (html != null) node.innerHTML = html;
    return node;
  }
  var esc = function (t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var modalShown = false;

  function showToast() {
    if (get(toastKey) || modalShown || document.querySelector('.sc-toast')) return;
    var toast = el('aside', 'sc-toast',
      '<a class="sc-toast-link" href="' + esc(ANNOUNCEMENT.href) + '">' +
        '<img class="sc-toast-img" src="' + esc(ANNOUNCEMENT.strip) + '" alt="' + esc(ANNOUNCEMENT.imageAlt) + '" width="720" height="104" decoding="async">' +
        '<span class="sc-toast-body">' +
          '<span class="sc-toast-tag"><i class="sc-toast-dot" aria-hidden="true"></i>' + esc(ANNOUNCEMENT.tag) + '</span>' +
          '<span class="sc-toast-title" style="display:block">' + esc(ANNOUNCEMENT.title) + '</span>' +
          '<span class="sc-toast-cta">' + esc(ANNOUNCEMENT.cta) + ' <span aria-hidden="true">&rarr;</span></span>' +
        '</span>' +
      '</a>' +
      '<button class="sc-toast-close" type="button" aria-label="Dismiss announcement">&times;</button>');
    toast.setAttribute('aria-label', 'Announcement');
    document.body.appendChild(toast);

    function dismiss() {
      set(toastKey);
      toast.classList.remove('is-in');
      toast.classList.add('is-out');
      setTimeout(function () { toast.remove(); }, reduced ? 0 : 300);
    }
    toast.querySelector('.sc-toast-close').addEventListener('click', dismiss);
    toast.querySelector('.sc-toast-link').addEventListener('click', function () { set(toastKey); });
    requestAnimationFrame(function () { requestAnimationFrame(function () { toast.classList.add('is-in'); }); });
  }

  function showModal() {
    if (get(modalKey) || document.querySelector('.sc-modal')) return;
    var drawer = document.getElementById('sc-drawer');
    if (document.documentElement.classList.contains('sc-lock') || (drawer && !drawer.hidden)) return;
    modalShown = true;
    var previous = document.activeElement;
    var modal = el('div', 'sc-modal',
      '<div class="sc-modal-card" role="dialog" aria-modal="true" aria-labelledby="sc-modal-title">' +
        '<img class="sc-modal-img" src="' + esc(ANNOUNCEMENT.image) + '" alt="' + esc(ANNOUNCEMENT.imageAlt) + '" width="1400" height="533" decoding="async">' +
        '<div class="sc-modal-body">' +
          '<p class="sc-modal-tag"><i class="sc-modal-dot" aria-hidden="true"></i>' + esc(ANNOUNCEMENT.tag) + '</p>' +
          '<h2 class="sc-modal-title" id="sc-modal-title">' + esc(ANNOUNCEMENT.title) + '</h2>' +
          '<p class="sc-modal-text">' + esc(ANNOUNCEMENT.text) + '</p>' +
          '<div class="sc-modal-actions">' +
            '<a class="sc-modal-btn" href="' + esc(ANNOUNCEMENT.href) + '">' + esc(ANNOUNCEMENT.cta) + ' <span aria-hidden="true">&rarr;</span></a>' +
            '<button class="sc-modal-later" type="button">Maybe later</button>' +
          '</div>' +
        '</div>' +
        '<button class="sc-modal-close" type="button" aria-label="Close announcement">&times;</button>' +
      '</div>');
    document.body.appendChild(modal);
    document.documentElement.classList.add('sc-lock');

    function close() {
      set(modalKey);
      document.removeEventListener('keydown', onKey);
      modal.classList.remove('is-in');
      document.documentElement.classList.remove('sc-lock');
      setTimeout(function () { modal.remove(); }, reduced ? 0 : 300);
      if (previous && previous.focus) previous.focus();
    }
    function onKey(event) {
      if (event.key === 'Escape') { close(); return; }
      if (event.key !== 'Tab') return;
      var items = modal.querySelectorAll('a, button');
      var first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    modal.querySelector('.sc-modal-close').addEventListener('click', close);
    modal.querySelector('.sc-modal-later').addEventListener('click', close);
    modal.querySelector('.sc-modal-btn').addEventListener('click', function () { set(modalKey); set(toastKey); });
    modal.addEventListener('click', function (event) { if (event.target === modal) close(); });
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { requestAnimationFrame(function () { modal.classList.add('is-in'); modal.querySelector('.sc-modal-btn').focus(); }); });
  }

  var wantsModal = ANNOUNCEMENT.modalOn.indexOf(path) !== -1 && !get(modalKey) && window.innerWidth >= 900;
  if (wantsModal) setTimeout(showModal, ANNOUNCEMENT.modalDelay);
  // when the pop-up is coming, keep the card back so the two never stack on the same visit
  else setTimeout(showToast, ANNOUNCEMENT.toastDelay);
})();
