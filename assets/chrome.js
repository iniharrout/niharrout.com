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

  var ANNOUNCEMENT = {
    id: 'openai-select-partner',
    tag: 'Partnership news',
    title: 'Creuto is now an OpenAI Select Partner',
    text: 'Why the partnership matters, and what it changes for teams building AI that has to work in production.',
    cta: 'Read the announcement',
    href: '/blog/openai-select-partner',
    image: '/assets/blog/openai-select-partner-banner.jpg',
    strip: '/assets/blog/openai-select-partner-strip.jpg',
    imageAlt: 'Creuto and OpenAI Select Partner logos',
    hideOn: ['/blog/openai-select-partner', '/thank-you'],
    modalOn: ['/'],
    toastDelay: 2500,
    modalDelay: 7000
  };

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
