/**
 * NiharRout.com - Interactions Engine
 * Features:
 * 1. Sticky Navigation Elevation
 * 2. Accessible Dropdowns
 * 3. Minimalist FAQ Accordion Toggle
 * 4. Dynamic Footer Year
 * 5. Smooth Anchor Scrolling
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

  // 2. Dropdowns Handling
  function initDropdowns() {
    var dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(function (item) {
      item.addEventListener('mouseenter', function () {
        item.classList.add('open');
      });
      item.addEventListener('mouseleave', function () {
        item.classList.remove('open');
      });

      var link = item.querySelector('.nav-link');
      if (!link) return;

      link.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          var isOpen = item.classList.contains('open');
          if (isOpen) {
            item.classList.remove('open');
          } else {
            dropdownItems.forEach(function (d) { d.classList.remove('open'); });
            item.classList.add('open');
          }
        }
      });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-item-dropdown')) {
        dropdownItems.forEach(function (d) { d.classList.remove('open'); });
      }
    });
  }

  // 3. Universal FAQ Accordion
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item, .faq-item-minimal, .faq-item-excited');
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq-question, .faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close other items in the same container
        var parentContainer = item.parentElement;
        var siblings = parentContainer ? parentContainer.querySelectorAll('.faq-item, .faq-item-minimal, .faq-item-excited') : faqItems;
        siblings.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            var otherBtn = other.querySelector('.faq-question, .faq-question-btn');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
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

  // 5. Smooth Anchor Scrolling
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          var headerOffset = 80;
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
