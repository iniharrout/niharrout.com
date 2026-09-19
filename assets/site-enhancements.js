/**
 * NiharRout.com - Official HubSpot Design System Interactions
 * Features:
 * 1. Sticky Navigation Elevation
 * 2. Dropdown Interaction & Accessibility
 * 3. Interactive FAQ Accordion
 * 4. Mobile Navigation Drawer Toggle
 * 5. Dynamic Footer Year
 * 6. Smooth In-Page Anchor Scrolling
 */

(function () {
  'use strict';

  // 1. Sticky Navigation Elevation
  function initStickyNav() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function handleScroll() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Dropdown Hover & Touch Handling
  function initDropdowns() {
    var dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(function (item) {
      var link = item.querySelector('.nav-link');
      if (!link) return;

      // Toggle on touch devices
      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          var menu = item.querySelector('.dropdown-menu');
          if (menu) {
            var isOpen = menu.style.display === 'block';
            menu.style.display = isOpen ? 'none' : 'block';
            menu.style.opacity = isOpen ? '0' : '1';
            menu.style.visibility = isOpen ? 'hidden' : 'visible';
            menu.style.pointerEvents = isOpen ? 'none' : 'auto';
          }
        }
      });
    });
  }

  // 3. Interactive FAQ Accordion
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(function (item) {
      var questionBtn = item.querySelector('.faq-question');
      if (!questionBtn) return;

      questionBtn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Optional: close other open items for cleaner single-accordion behavior
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            var otherBtn = other.querySelector('.faq-question');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          questionBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // 4. Dynamic Footer Year
  function initFooterYear() {
    var yrSpan = document.getElementById('yr');
    if (yrSpan) {
      yrSpan.textContent = new Date().getFullYear();
    }
  }

  // 5. Smooth Anchor Scrolling with Header Offset
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerOffset = 84;
          var elementPosition = targetEl.getBoundingClientRect().top;
          var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initStickyNav();
      initDropdowns();
      initFAQ();
      initFooterYear();
      initSmoothScroll();
    });
  } else {
    initStickyNav();
    initDropdowns();
    initFAQ();
    initFooterYear();
    initSmoothScroll();
  }
})();
