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
        var copy = a.cloneNode(true);
        var famName = a.querySelector('.sc-fam-t');
        if (famName) copy.textContent = famName.textContent;
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
    else if (link.hasAttribute('data-book') || href.indexOf('calendar.app.google') !== -1) name = 'book_call';
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

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
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
