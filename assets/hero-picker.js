/**
 * Homepage hero picker: "What do you want to build?"
 * Shows a matching piece of work and tailored buttons for the chosen option; once something is
 * chosen, WhatsApp becomes the main button. No prices are shown here on purpose.
 */
(function () {
  'use strict';
  var root = document.getElementById('heroPicker');
  if (!root) return;

  var DATA = {
    mobile: { article: 'a', label: 'mobile app', name: 'Make My Look', meta: '200+ vendors onboarded at launch, live in 16 weeks', href: '/work/make-my-look' },
    web: { article: 'a', label: 'web app', name: 'Custom ERP for manufacturing', meta: '4 departments unified, monthly close cut to 1 day', href: '/work/custom-erp-manufacturing' },
    ai: { article: 'an', label: 'AI product', name: 'AI product development', meta: 'RAG pipelines and task agents, OpenAI Select Partner', href: '/services/ai-product-development' }
  };

  var chips = [].slice.call(root.querySelectorAll('.hp-chips [role="radio"]'));
  var el = function (id) { return document.getElementById(id); };

  function track(key) {
    try {
      var payload = JSON.stringify({ event: 'picker', where: key, page: location.pathname });
      if (navigator.sendBeacon) navigator.sendBeacon('/api/track', new Blob([payload], { type: 'application/json' }));
      if (window.dataLayer) window.dataLayer.push({ event: 'hero_picker', picker_choice: key, page_path: location.pathname });
    } catch (e) { /* tracking must never get in the way */ }
  }

  function select(key, focus) {
    var d = DATA[key];
    if (!d) return;
    chips.forEach(function (chip) {
      var on = chip.getAttribute('data-key') === key;
      chip.setAttribute('aria-checked', String(on));
      chip.tabIndex = on ? 0 : -1;
      if (on && focus) chip.focus();
    });
    el('hpProofName').textContent = d.name;
    el('hpProofMeta').textContent = d.meta;
    el('hpProof').setAttribute('href', d.href);
    root.classList.add('is-picked');
    var call = el('hpCta').parentNode, wa = el('hpWa');
    call.className = 'hero-btn-secondary';
    wa.className = 'hero-btn-primary';
    el('hpCta').textContent = 'Book a free call';
    el('hpWaText').textContent = 'Discuss your ' + d.label + ' on WhatsApp';
    el('hpWa').setAttribute('href', 'https://wa.me/917608844995?text=' + encodeURIComponent("Hi Nihar, I'm planning " + d.article + " " + d.label + " and would like to talk. When would be a good time?"));
    el('hpResult').hidden = false;
  }

  chips.forEach(function (chip, i) {
    chip.tabIndex = i === 0 ? 0 : -1;
    chip.addEventListener('click', function () {
      select(chip.getAttribute('data-key'), false);
      track(chip.getAttribute('data-key'));
    });
    chip.addEventListener('keydown', function (event) {
      var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
      if (!step) return;
      event.preventDefault();
      var next = chips[(i + step + chips.length) % chips.length];
      select(next.getAttribute('data-key'), true);
      track(next.getAttribute('data-key'));
    });
  });
})();
