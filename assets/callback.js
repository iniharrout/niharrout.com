/**
 * "Call me back" mini form: one field (phone). Posts to /api/lead like the other enquiry forms,
 * then sends the visitor to the thank-you page. The visitor's time zone is sent along so the
 * call can be placed at a sensible hour. Without JavaScript the form stays hidden and the
 * plain phone link next to it is the way in.
 */
(function () {
  'use strict';

  function track(where) {
    try {
      var payload = JSON.stringify({ event: 'callback', where: where, page: location.pathname });
      if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
      if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead', lead_type: 'callback', page_path: location.pathname });
      if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { lead_type: 'callback' });
    } catch (e) { /* tracking must never block the form */ }
  }

  document.querySelectorAll('form.cb').forEach(function (form) {
    form.hidden = false;
    var input = form.querySelector('input[name="phone"]');
    var button = form.querySelector('button[type="submit"]');
    var status = form.querySelector('.cb-status');
    var hp = form.querySelector('input[name="website"]');

    function say(text, bad) {
      if (!status) return;
      status.textContent = text;
      status.className = 'cb-status' + (bad ? ' is-bad' : '');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var phone = (input.value || '').trim();
      var digits = phone.replace(/\D/g, '');
      if (digits.length < 8 || digits.length > 15) {
        say('Please enter a valid phone number, including the country code.', true);
        input.focus();
        return;
      }
      var tz = '';
      try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { /* optional */ }
      button.disabled = true;
      say('Sending…', false);
      fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          email: '',
          phone: phone,
          service: 'Callback',
          message: 'Please call me back.',
          page: location.pathname,
          website: hp ? hp.value : '',
          extras: tz ? { timezone: tz } : {}
        })
      })
        .then(function (r) { return r.json().catch(function () { return {}; }); })
        .then(function (json) {
          if (!json.ok) throw new Error('failed');
          track(form.getAttribute('data-where') || 'page');
          try { sessionStorage.setItem('leadThanks', JSON.stringify({ name: '', service: 'Callback', city: '' })); } catch (e) { /* optional */ }
          window.location.assign('/thank-you');
        })
        .catch(function () {
          button.disabled = false;
          say('Could not send that just now. Please call or WhatsApp +91 76088 44995 instead.', true);
        });
    });
  });
})();
