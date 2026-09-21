/**
 * Site chrome behaviour: announcement bar, dropdown menus, mobile menu and the footer year.
 * The header and footer themselves are plain HTML (partials/*.html).
 */
(function () {
  'use strict';

  var announce = document.getElementById('sc-announce');
  if (announce) {
    var key = 'sc-announce-' + (announce.getAttribute('data-announce') || 'news');
    var dismissed = false;
    try { dismissed = localStorage.getItem(key) === '1'; } catch (e) {}
    if (dismissed) announce.hidden = true;
    var close = announce.querySelector('.sc-announce-close');
    if (close) close.addEventListener('click', function () {
      announce.hidden = true;
      try { localStorage.setItem(key, '1'); } catch (e) {}
    });
  }

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
