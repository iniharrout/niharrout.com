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
      var link = item.querySelector('.nav-link');
      if (!link) return;

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

  // 3. Minimalist FAQ Accordion
  function initFAQ() {
    var faqItems = document.querySelectorAll('.faq-item-minimal');
    faqItems.forEach(function (item) {
      var btn = item.querySelector('.faq-question-btn');
      if (!btn) return;

      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('open');

        // Close other items
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('open');
            var otherBtn = other.querySelector('.faq-question-btn');
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

  // 6. Calendly Integration
  function initCalendly() {
    function openCalendlyModal(e) {
      if (e) e.preventDefault();
      if (window.Calendly && typeof window.Calendly.initPopupWidget === 'function') {
        window.Calendly.initPopupWidget({
          url: 'https://calendly.com/creuto/meet?primary_color=ff5f2d&text_color=2d3e50'
        });
      } else {
        window.open('https://calendly.com/creuto/meet', '_blank');
      }
    }

    // Attach to all elements with data-calendly="true" or .btn-book-call
    document.querySelectorAll('[data-calendly="true"], .btn-book-call, a[href="#calendly"]').forEach(function (btn) {
      btn.addEventListener('click', openCalendlyModal);
    });

    // Initialize badge widget if script is loaded
    function setupBadge() {
      if (window.Calendly && typeof window.Calendly.initBadgeWidget === 'function') {
        // Prevent duplicate badges
        if (!document.querySelector('.calendly-badge-widget')) {
          window.Calendly.initBadgeWidget({
            url: 'https://calendly.com/creuto/meet?primary_color=ff5f2d&text_color=2d3e50',
            text: 'Schedule time with me',
            color: '#FF5F2D',
            textColor: '#ffffff',
            branding: false
          });
        }
      } else {
        setTimeout(setupBadge, 400);
      }
    }
    setupBadge();
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initStickyNav();
      initDropdowns();
      initFAQ();
      initFooterYear();
      initSmoothScroll();
      initCalendly();
    });
  } else {
    initStickyNav();
    initDropdowns();
    initFAQ();
    initFooterYear();
    initSmoothScroll();
    initCalendly();
  }
})();
