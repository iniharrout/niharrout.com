/**
 * Routes the site's enquiry forms to /api/lead (Google Chat).
 * Covers forms posting to Formspree and the b2b startup form (which used mailto).
 * Fallback if /api/lead is unavailable or the webhook is not configured:
 *   Formspree forms -> Formspree (the channel they used before)
 *   other forms     -> a prefilled mailto: link
 */
(function () {
  'use strict';

  var forms = document.querySelectorAll('form[action*="formspree.io"], form#startupLeadForm');
  if (!forms.length) return;

  var CORE = { name: 1, email: 1, phone: 1, budget: 1, details: 1, message: 1, service: 1, service_interest: 1, project_type: 1 };
  var IGNORED = { _gotcha: 1, _subject: 1, _next: 1, _replyto: 1, _cc: 1 };

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = String(value).trim(); });
    return data;
  }

  function toLead(data) {
    var extras = {};
    Object.keys(data).forEach(function (key) {
      if (!CORE[key] && !IGNORED[key] && data[key]) extras[key] = data[key];
    });
    return {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      budget: data.budget || '',
      message: data.details || data.message || '',
      service: data.service || data.service_interest || data.project_type || '',
      page: window.location.pathname,
      extras: extras
    };
  }

  function statusEl(form) {
    var el = form.parentNode.querySelector('.lead-form-status');
    if (!el) {
      el = document.createElement('div');
      el.className = 'lead-form-status';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      el.style.cssText = 'display:none;margin-top:14px;padding:12px 14px;border-radius:8px;font-size:14px;line-height:1.5;';
      form.parentNode.insertBefore(el, form.nextSibling);
    }
    return el;
  }

  function show(form, ok, message) {
    var el = statusEl(form);
    el.style.display = 'block';
    el.style.background = ok ? '#e6f7ec' : '#fef0eb';
    el.style.color = ok ? '#00823a' : '#be3300';
    el.style.border = '1px solid ' + (ok ? '#b3ebd3' : 'rgba(255,72,0,.25)');
    el.textContent = message;
  }

  function mailtoFallback(lead) {
    var subject = 'Enquiry: ' + (lead.service || 'Project') + ' - ' + lead.name;
    var lines = ['Name: ' + lead.name, 'Email: ' + lead.email];
    if (lead.phone) lines.push('Phone: ' + lead.phone);
    if (lead.budget) lines.push('Budget: ' + lead.budget);
    Object.keys(lead.extras).forEach(function (k) { lines.push(k.replace(/_/g, ' ') + ': ' + lead.extras[k]); });
    lines.push('', lead.message);
    window.location.href = 'mailto:me@niharrout.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  // Resolves true if the lead was delivered by any channel.
  function deliver(form, lead) {
    return fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    })
      .then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (json) {
          if (json.ok) return { done: true };
          if (response.status === 400) return { done: false, error: json.error };
          throw new Error('lead api unavailable');
        });
      })
      .catch(function () {
        var action = form.getAttribute('action') || '';
        if (action.indexOf('formspree.io') === -1) return { done: false, mail: true };
        return fetch(action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(function (response) { return response.ok ? { done: true } : { done: false, mail: true }; })
          .catch(function () { return { done: false, mail: true }; });
      });
  }

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = collect(form);
      if (data._gotcha) { form.reset(); return; } // honeypot

      var lead = toLead(data);
      if (!lead.service && form.id === 'startupLeadForm') lead.service = 'B2B Software for Startups';
      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      show(form, true, 'Sending…');

      deliver(form, lead).then(function (result) {
        if (result.done) {
          form.reset();
          show(form, true, 'Thank you. Nihar’s team will reply within one working day.');
        } else if (result.mail) {
          show(form, false, 'Opening your email app so you can send this directly…');
          mailtoFallback(lead);
        } else {
          show(form, false, result.error || 'Please check your details and try again.');
        }
        if (button) button.disabled = false;
      });
    });
  });
})();
