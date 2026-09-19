/**
 * Enquiry forms: location pages, homepage, /services/ pages and the b2b startup form.
 *
 * Delivery order:
 *   1. POST /api/lead        -> Google Chat (needs LEAD_WEBHOOK_URL on the server)
 *   2. POST to Formspree     -> the site's existing form endpoint, used if step 1 is unavailable
 * On success the visitor is sent to /thank-you/. If both channels fail, the form stays
 * on the page with a message and a mailto link (no automatic redirect to an email app).
 */
(function () {
  'use strict';

  var FORMSPREE_DEFAULT = 'https://formspree.io/f/xbjnqypk';
  var forms = document.querySelectorAll('form[action*="formspree.io"], form#startupLeadForm, form[data-loc-form]');
  if (!forms.length) return;

  var CORE = { name: 1, email: 1, phone: 1, budget: 1, details: 1, message: 1, service: 1, service_interest: 1, project_type: 1, city: 1 };
  var IGNORED = { _gotcha: 1, _subject: 1, _next: 1, _replyto: 1, _cc: 1, website: 1 };

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) { data[key] = String(value).trim(); });
    return data;
  }

  function toLead(form, data) {
    var extras = {};
    Object.keys(data).forEach(function (key) {
      if (!CORE[key] && !IGNORED[key] && data[key]) extras[key] = data[key];
    });
    var service = data.service || data.service_interest || data.project_type || '';
    if (!service && form.id === 'startupLeadForm') service = 'B2B Software for Startups';
    return {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      budget: data.budget || '',
      message: data.details || data.message || '',
      service: service,
      city: data.city || '',
      page: window.location.pathname,
      extras: extras
    };
  }

  function statusEl(form) {
    var el = form.querySelector('.loc-form-status');
    if (el) return el;
    el = form.parentNode.querySelector('.lead-form-status');
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

  function show(form, ok, message, mailtoHref) {
    var el = statusEl(form);
    el.textContent = message;
    if (mailtoHref) {
      el.appendChild(document.createTextNode(' '));
      var link = document.createElement('a');
      link.href = mailtoHref;
      link.textContent = 'Email us instead';
      link.style.cssText = 'display:inline-block;font-weight:700;color:inherit;text-decoration:underline;';
      el.appendChild(link);
    }
    if (el.classList.contains('loc-form-status')) {
      el.className = 'loc-form-status ' + (ok ? '-ok' : '-err');
      return;
    }
    el.style.display = 'block';
    el.style.background = ok ? '#e6f7ec' : '#fef0eb';
    el.style.color = ok ? '#00823a' : '#be3300';
    el.style.border = '1px solid ' + (ok ? '#b3ebd3' : 'rgba(255,72,0,.25)');
  }

  function mailtoHref(lead) {
    var lines = ['Name: ' + lead.name, 'Email: ' + lead.email];
    if (lead.phone) lines.push('Phone: ' + lead.phone);
    if (lead.service) lines.push('Service: ' + lead.service);
    if (lead.city) lines.push('City: ' + lead.city);
    if (lead.budget) lines.push('Budget: ' + lead.budget);
    Object.keys(lead.extras).forEach(function (k) { lines.push(k.replace(/_/g, ' ') + ': ' + lead.extras[k]); });
    lines.push('', lead.message);
    var subject = 'Enquiry: ' + (lead.service || 'Project') + (lead.city ? ' (' + lead.city + ')' : '') + ' - ' + lead.name;
    return 'mailto:me@niharrout.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lines.join('\n'));
  }

  function toFormspree(form, lead) {
    var action = form.getAttribute('action') || '';
    var url = action.indexOf('formspree.io') !== -1 ? action : FORMSPREE_DEFAULT;
    var flat = {
      name: lead.name, email: lead.email, phone: lead.phone, service: lead.service, city: lead.city,
      budget: lead.budget, message: lead.message, page: lead.page,
      _subject: 'New ' + (lead.service || 'project') + ' enquiry' + (lead.city ? ' (' + lead.city + ')' : '')
    };
    Object.keys(lead.extras).forEach(function (k) { flat[k] = lead.extras[k]; });
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(flat)
    }).then(function (response) { return response.ok; });
  }

  // Resolves { done: true } or { done: false, error?: string }.
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
        return toFormspree(form, lead)
          .then(function (ok) { return { done: ok }; })
          .catch(function () { return { done: false }; });
      });
  }

  function goToThankYou(lead) {
    try {
      sessionStorage.setItem('leadThanks', JSON.stringify({ name: lead.name, service: lead.service, city: lead.city }));
    } catch (e) { /* storage unavailable: the page still works without personalisation */ }
    window.location.assign('/thank-you/');
  }

  Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var data = collect(form);
      if (data._gotcha || data.website) { form.reset(); return; } // honeypots

      var lead = toLead(form, data);
      var button = form.querySelector('button[type="submit"]');
      if (button) button.disabled = true;
      show(form, true, 'Sending…');

      deliver(form, lead).then(function (result) {
        if (result.done) {
          form.reset();
          goToThankYou(lead);
          return;
        }
        show(form, false, result.error || 'We could not send this just now. Please try again in a moment, or', result.error ? null : mailtoHref(lead));
        if (button) button.disabled = false;
      });
    });
  });
})();
