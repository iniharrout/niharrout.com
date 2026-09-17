/**
 * niharrout.com - Corporate Visual System & Motion Enhancements
 * Purposeful, restrained motion: AOS integration, stat counters, hero parallax, and card interactions.
 */

(function () {
  'use strict';

  var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Initialize AOS (Animate On Scroll) if loaded
  function initAOS() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 520,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        once: true,
        offset: 50,
        disable: isReducedMotion
      });
    }
  }

  // 2. Animate Numeric Stats (Counting up smoothly from 0)
  function initCounters() {
    if (isReducedMotion) return;

    var statElements = document.querySelectorAll('.val, [data-counter]');
    if (!statElements.length) return;

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        obs.unobserve(el);

        var originalHTML = el.innerHTML;
        var textContent = el.textContent.trim();

        // Check if there is a number to animate
        var match = textContent.match(/([^\d.]*)([\d.]+)(.*)/);
        if (!match) return;

        var prefix = match[1];
        var targetNum = parseFloat(match[2]);
        var suffix = match[3];
        if (isNaN(targetNum)) return;

        var isFloat = match[2].indexOf('.') !== -1;
        var decimals = isFloat ? (match[2].split('.')[1] || '').length : 0;
        var duration = 1200;
        var startTime = null;

        var hasSup = el.querySelector('.sup');
        var supHTML = hasSup ? hasSup.outerHTML : '';

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var elapsed = timestamp - startTime;
          var progress = Math.min(elapsed / duration, 1);
          // Ease-out exponential curve
          var ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          var current = targetNum * ease;
          var formatted = isFloat ? current.toFixed(decimals) : Math.round(current);

          if (hasSup) {
            el.innerHTML = prefix + formatted + ' ' + supHTML;
          } else {
            el.textContent = prefix + formatted + suffix;
          }

          if (progress < 1) {
            window.requestAnimationFrame(step);
          } else {
            el.innerHTML = originalHTML;
          }
        }

        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.15 });

    statElements.forEach(function (el) {
      if (/\d/.test(el.textContent.trim())) {
        observer.observe(el);
      }
    });
  }

  // 3. Subtle Hero Photo Parallax & Slow Scale on Scroll
  function initHeroParallax() {
    if (isReducedMotion) return;

    var heroImg = document.querySelector('.hero-portrait-img');
    if (!heroImg) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var top = window.pageYOffset || document.documentElement.scrollTop;
          if (top < 850) {
            var ty = top * 0.065;
            var sc = 1 + top * 0.00012;
            heroImg.style.transform = 'translateY(' + ty + 'px) scale(' + sc + ')';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 4. Spotlight Testimonial Slider Controls
  function initTestimonialSpotlight() {
    var card = document.getElementById('testiSpotlight');
    if (!card) return;

    var slides = card.querySelectorAll('.testi-slide');
    if (slides.length <= 1) return;

    var currentIdx = 0;

    function showSlide(idx) {
      if (idx < 0) idx = slides.length - 1;
      if (idx >= slides.length) idx = 0;
      currentIdx = idx;

      slides.forEach(function (slide, i) {
        if (i === currentIdx) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      // Update dots across all slide controls
      var allDots = card.querySelectorAll('.testi-dot');
      allDots.forEach(function (dot) {
        var dotIdx = parseInt(dot.getAttribute('data-index'), 10);
        if (dotIdx === currentIdx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    // Prev / Next button listeners
    card.addEventListener('click', function (e) {
      var prevBtn = e.target.closest('.testi-nav-btn[aria-label="Previous review"], #testiPrev, #testiPrev2');
      var nextBtn = e.target.closest('.testi-nav-btn[aria-label="Next review"], #testiNext, #testiNext2');
      var dot = e.target.closest('.testi-dot');

      if (prevBtn) {
        e.preventDefault();
        showSlide(currentIdx - 1);
      } else if (nextBtn) {
        e.preventDefault();
        showSlide(currentIdx + 1);
      } else if (dot) {
        e.preventDefault();
        var targetIndex = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(targetIndex)) {
          showSlide(targetIndex);
        }
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initAOS();
      initCounters();
      initHeroParallax();
      initTestimonialSpotlight();
    });
  } else {
    initAOS();
    initCounters();
    initHeroParallax();
    initTestimonialSpotlight();
  }
})();
