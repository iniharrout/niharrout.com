/**
 * "Work with me" listing: opening a role card shows the role in a pop-up (details first, then the application form).
 * Every card is a real link to the role's own page, so without JavaScript, or with a modified click (new tab),
 * the link simply works. The form itself is handled by assets/lead-forms.js (posts to /api/lead).
 */
(function () {
  'use strict';

  var dialog = document.getElementById('roleDialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  var LIST_URL = '/work-with-me';
  var root = document.documentElement;
  var body = document.getElementById('dlgBody');
  var panes = { details: dialog.querySelector('[data-pane="details"]'), form: dialog.querySelector('[data-pane="form"]') };
  var service = document.getElementById('a-service');
  var form = document.getElementById('applyForm');
  var done = document.getElementById('applyDone');
  var formTitle = document.getElementById('dlgFormTitle');
  var pageLink = document.getElementById('dlgPage');

  function show(name) {
    panes.details.hidden = name !== 'details';
    panes.form.hidden = name !== 'form';
    var scroller = panes[name].querySelector('.wwm-scroll');
    if (scroller) scroller.scrollTop = 0;
  }

  function resetForm(roleValue) {
    var status = form.parentNode.querySelector('.lead-form-status');
    if (status) status.style.display = 'none';
    if (!done.hidden) form.reset();
    form.hidden = false;
    done.hidden = true;
    service.value = roleValue;
    var button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = false;
  }

  function open(card) {
    var tpl = document.getElementById('tpl-' + card.getAttribute('data-slug'));
    if (!tpl) return false;
    body.textContent = '';
    body.appendChild(tpl.content.cloneNode(true));
    var title = body.querySelector('.wwm-d-title');
    formTitle.textContent = 'Apply: ' + (title ? title.textContent : 'this role');
    pageLink.setAttribute('href', card.getAttribute('href'));
    resetForm(card.getAttribute('data-apply'));
    show('details');
    dialog.showModal();
    root.classList.add('wwm-lock');
    try { history.replaceState(null, '', card.getAttribute('href')); } catch (e) { /* address bar stays as is */ }
    return true;
  }

  document.addEventListener('click', function (event) {
    var card = event.target.closest && event.target.closest('a.wwm-rcard');
    if (!card) return;
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (open(card)) event.preventDefault();
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) { dialog.close(); return; } // click on the dimmed backdrop
    var t = event.target.closest && event.target.closest('[data-close], [data-apply-btn], [data-back]');
    if (!t) return;
    if (t.hasAttribute('data-close')) dialog.close();
    else if (t.hasAttribute('data-apply-btn')) { show('form'); var first = document.getElementById('a-name'); if (first) first.focus({ preventScroll: true }); }
    else show('details');
  });

  dialog.addEventListener('close', function () {
    root.classList.remove('wwm-lock');
    try { history.replaceState(null, '', LIST_URL); } catch (e) { /* ignore */ }
  });
})();
