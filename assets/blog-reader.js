/* Guide pages: reading progress bar, current section in the contents list, copy-link button. */
(function () {
  var bar = document.querySelector('.reader-progress span');
  var article = document.querySelector('.reader .prose');
  var links = Array.prototype.slice.call(document.querySelectorAll('.reader-side .article-toc a'));
  var targets = links.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  var ticking = false;

  function update() {
    ticking = false;
    if (bar && article) {
      var r = article.getBoundingClientRect();
      var total = r.height - window.innerHeight * 0.6;
      var done = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.2) / Math.max(total, 1)));
      bar.style.transform = 'scaleX(' + done + ')';
    }
    var current = -1;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i] && targets[i].getBoundingClientRect().top < 140) current = i;
    }
    links.forEach(function (a, i) { a.classList.toggle('is-active', i === current); });
  }
  function onScroll() { if (!ticking) { ticking = true; window.requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();

  // close the mobile contents list after a section is picked
  var mobile = document.querySelector('.reader-toc-mobile');
  if (mobile) mobile.addEventListener('click', function (e) { if (e.target.closest('a')) mobile.removeAttribute('open'); });

  var copy = document.querySelector('.reader-copy');
  if (copy) copy.addEventListener('click', function () {
    var url = copy.getAttribute('data-copy');
    var msg = copy.querySelector('.reader-copy-done');
    function done(text) { if (msg) { msg.textContent = text; setTimeout(function () { msg.textContent = ''; }, 1800); } }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(function () { done('Link copied'); }, function () { done(url); });
    else done(url);
  });
})();
