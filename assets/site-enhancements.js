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

  // 6. Calendly Integration
  function initCalendly() {
    function openCalendlyModal(e) {
      if (e) e.preventDefault();
      var isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      if (isMobile) {
        // On mobile devices, open Calendly's native mobile interface directly.
        // This avoids iframe scroll traps, clipped time slots, and keyboard overlaps on mobile browsers.
        window.open('https://calendly.com/creuto/meet', '_blank');
        return;
      }
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
            text: 'Schedule a Call with Me',
            color: '#FF5F2D',
            textColor: '#ffffff',
            branding: false
          });

          // Ensure reliable mobile experience when tapping the floating badge
          setTimeout(function () {
            var badge = document.querySelector('.calendly-badge-widget');
            if (badge) {
              badge.addEventListener('click', function (e) {
                var isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
                if (isMobile) {
                  e.stopPropagation();
                  e.preventDefault();
                  window.open('https://calendly.com/creuto/meet', '_blank');
                }
              }, true);
            }
          }, 450);
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
