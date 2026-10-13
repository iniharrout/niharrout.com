/**
 * Blueprint preview: the progress line that joins the numbered sections fills as you scroll, each section's dot
 * lights up once you reach it, and sections fade in. Pure progressive enhancement: without JavaScript everything is visible.
 */
(function () {
  'use strict';
  var sections = Array.prototype.slice.call(document.querySelectorAll('.bp-sec'));
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.bp-reveal'));
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  var ticking = false;
  function update() {
    ticking = false;
    var mid = window.innerHeight * 0.55;
    sections.forEach(function (sec) {
      var r = sec.getBoundingClientRect();
      var f = (mid - r.top) / r.height;
      f = Math.max(0, Math.min(1, f));
      sec.style.setProperty('--f', f.toFixed(3));
      sec.classList.toggle('on', mid - r.top > 90);
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
