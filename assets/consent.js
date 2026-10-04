/**
 * Cookie consent banner for Google Analytics (Consent Mode). The small inline script in <head> (written by
 * scripts/build-analytics.js) decides whether this visitor needs a choice (Europe, UK and nearby time zones) and
 * exposes window.nrConsent. For those visitors Google's analytics script is not loaded until they press Accept.
 * Everyone else is counted as before and sees no banner. Anyone can change their choice later through the
 * "Cookie settings" link in the footer.
 */
(function () {
  'use strict';

  var consent = window.nrConsent;
  if (!consent) return;

  var banner = null;

  function build() {
    var el = document.createElement('div');
    el.className = 'nr-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-labelledby', 'nr-consent-title');
    el.setAttribute('aria-describedby', 'nr-consent-text');
    el.innerHTML =
      '<p class="nr-consent-title" id="nr-consent-title">Cookies and analytics</p>' +
      '<p class="nr-consent-text" id="nr-consent-text">I use Google Analytics to see which pages are useful. It only loads if you accept. ' +
      '<a href="/privacy-policy">Privacy policy</a></p>' +
      '<div class="nr-consent-actions">' +
        '<button type="button" class="nr-consent-btn" data-choice="denied">Decline</button>' +
        '<button type="button" class="nr-consent-btn is-accept" data-choice="granted">Accept</button>' +
      '</div>';
    el.addEventListener('click', function (event) {
      var btn = event.target.closest && event.target.closest('[data-choice]');
      if (!btn) return;
      if (btn.getAttribute('data-choice') === 'granted') consent.accept(); else consent.decline();
      hide();
    });
    return el;
  }

  function show() {
    if (banner) return;
    banner = build();
    document.body.appendChild(banner);
    requestAnimationFrame(function () { requestAnimationFrame(function () { banner.classList.add('is-in'); }); });
  }

  function hide() {
    if (!banner) return;
    var node = banner;
    banner = null;
    node.classList.remove('is-in');
    setTimeout(function () { node.remove(); }, 300);
  }

  if (consent.required && !consent.saved) show();

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('[data-cookie-settings]');
    if (!link) return;
    event.preventDefault();
    show();
  });
})();
