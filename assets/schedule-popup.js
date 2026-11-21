/**
 * Book a Call pop-up. Every Book a Call button is a plain link to the Calendly booking page (it works
 * with no JavaScript and opens in a new tab). With JavaScript, this script opens that same booking page inside a
 * pop-up instead (a bottom sheet on phones), so visitors stay on the site. The calendar only loads when the
 * pop-up opens, so it costs nothing on page load.
 */
(function () {
  'use strict';

  var SHORT = 'https://calendly.com/creuto/meet';
  var EMBED = 'https://calendly.com/creuto/meet?embed_type=Inline&embed_domain=www.niharrout.com&hide_gdpr_banner=1&primary_color=1d4ed8';
  var dlg = null;

  function build() {
    if (dlg) return;
    dlg = document.createElement('dialog');
    dlg.className = 'sp-dialog';
    dlg.setAttribute('aria-labelledby', 'sp-title');
    dlg.innerHTML =
      '<div class="sp-head"><div><h2 id="sp-title">Book a free strategy call</h2><p>30 minutes with Nihar. Pick a time that suits you.</p></div>' +
      '<button class="sp-x" type="button" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div>' +
      '<div class="sp-body"><p class="sp-loading">Loading the calendar…</p></div>' +
      '<div class="sp-foot"><span>Times are shown in your own time zone.</span><a href="' + SHORT + '" target="_blank" rel="noopener">Open in a new tab</a></div>';
    document.body.appendChild(dlg);
    dlg.querySelector('.sp-x').addEventListener('click', function () { dlg.close(); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); }); // click on the dimmed backdrop
    dlg.addEventListener('close', function () { document.documentElement.classList.remove('sp-lock'); });
  }

  function open() {
    build();
    var body = dlg.querySelector('.sp-body');
    if (!body.querySelector('iframe')) {
      var f = document.createElement('iframe');
      f.title = 'Book a call with Nihar: Calendly booking page';
      f.src = EMBED;
      f.addEventListener('load', function () { var l = body.querySelector('.sp-loading'); if (l) l.remove(); });
      body.appendChild(f);
    }
    dlg.showModal();
    document.documentElement.classList.add('sp-lock');
  }

  function track() {
    try {
      var detail = { event: 'contact_click', contact_method: 'book_call', click_location: 'popup', page_path: location.pathname };
      if (window.dataLayer) window.dataLayer.push(detail);
      if (typeof window.gtag === 'function') window.gtag('event', 'contact_click', { contact_method: 'book_call', click_location: 'popup' });
      if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([JSON.stringify({ event: 'book_call', where: 'popup', page: location.pathname })], { type: 'application/json' }));
    } catch (err) { /* tracking must never block the pop-up */ }
  }

  // Runs first (capture phase) and stops the click there, so nothing else on the page can act on a Book a Call click.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href="' + SHORT + '"]');
    if (!a || a.closest('.sp-dialog') || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (typeof HTMLDialogElement === 'undefined') return; // very old browser: the link opens the booking page in a new tab
    e.preventDefault();
    e.stopPropagation();
    track();
    if (location.pathname.replace(/\/$/, '') === '/book') { // the calendar is already on this page: bring it into view
      var embed = document.querySelector('.wwm-embed');
      if (embed) embed.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    open();
  }, true);
})();
