/**
 * Click-to-load YouTube player. The page ships only a poster image; the YouTube player
 * (privacy-enhanced domain, no cookies until played) is created when the visitor presses play.
 */
(function () {
  'use strict';
  var warmed = false;

  function warm() {
    if (warmed) return;
    warmed = true;
    ['https://www.youtube-nocookie.com', 'https://i.ytimg.com'].forEach(function (href) {
      var l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      document.head.appendChild(l);
    });
  }

  document.querySelectorAll('.vid[data-yt]').forEach(function (fig) {
    var btn = fig.querySelector('.vid-play');
    var frame = fig.querySelector('.vid-frame');
    if (!btn || !frame) return;
    btn.addEventListener('pointerenter', warm, { once: true });
    btn.addEventListener('focus', warm, { once: true });
    btn.addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(fig.getAttribute('data-yt')) + '?autoplay=1&rel=0&playsinline=1&modestbranding=1';
      f.title = fig.getAttribute('data-title') || 'Video';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      f.setAttribute('allowfullscreen', '');
      f.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.innerHTML = '';
      frame.appendChild(f);
      f.focus();
    });
  });
})();
