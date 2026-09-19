/**
 * Location page lead form: posts to /api/lead and falls back to a prefilled
 * mailto: link if the endpoint is unavailable or not configured.
 */
(function () {
  'use strict';

  var form = document.querySelector('[data-loc-form]');
  if (!form) return;

  var status = form.querySelector('.loc-form-status');
  var button = form.querySelector('button[type="submit"]');

  function show(kind, message) {
    if (!status) return;
    status.className = 'loc-form-status -' + kind;
    status.textContent = message;
  }

  function mailtoFallback(data) {
    var subject = 'Enquiry: ' + (data.service || 'Project') + (data.city ? ' (' + data.city + ')' : '');
    var body = [
      'Name: ' + data.name,
      'Email: ' + data.email,
      data.phone ? 'Phone: ' + data.phone : '',
      data.budget ? 'Budget: ' + data.budget : '',
      '',
      data.message
    ].join('\n');
    window.location.href = 'mailto:me@niharrout.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    var fields = new FormData(form);
    var data = {};
    fields.forEach(function (value, key) { data[key] = String(value); });
    data.page = window.location.pathname;

    if (button) button.disabled = true;
    show('ok', 'Sending…');

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (json) {
          return { status: response.status, json: json };
        });
      })
      .then(function (result) {
        if (result.json.ok) {
          form.reset();
          show('ok', 'Thank you. Nihar’s team will reply within one working day.');
        } else if (result.json.fallback) {
          show('err', 'Opening your email app so you can send this directly…');
          mailtoFallback(data);
        } else {
          show('err', result.json.error || 'Something went wrong. Please email me@niharrout.com.');
        }
      })
      .catch(function () {
        show('err', 'Network error. Opening your email app instead…');
        mailtoFallback(data);
      })
      .then(function () {
        if (button) button.disabled = false;
      });
  });
})();
