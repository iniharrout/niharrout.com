/**
 * NiharRout.com - HubSpot Design System Engine & Interactions
 * Features:
 * 1. Interactive Venture Scope & Pricing Estimator (HubSpot Calculator model)
 * 2. Portfolio Category Filter Engine
 * 3. Sticky Navigation Scroll Elevation
 * 4. Animated Proof Metrics Counter
 * 5. Dynamic Footer Year
 */

(function () {
  'use strict';

  var isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  // 2. Interactive Venture Scope & Pricing Estimator
  function initEstimator() {
    var tabs = document.querySelectorAll('.calc-tab-btn');
    if (!tabs.length) return;

    var data = {
      mvp: {
        title: '0-to-1 SaaS & Venture MVP',
        desc: 'End-to-end product architecture and execution designed to launch your core offering to the first 10,000 users with zero technical debt.',
        investment: '$8,000 – $15,000',
        timeline: '6 to 8 Weeks',
        sprints: '3-4 Sprints',
        team: '1 Lead Architect + 2 Full-Stack Engineers',
        stack: 'Next.js 15, Node.js / Python, PostgreSQL, Stripe',
        deliverables: [
          { tit: 'PRD & System Specification', desc: 'Complete functional specification with user journeys and database schema.' },
          { tit: 'Production Cloud Infrastructure', desc: 'Automated CI/CD, secure containerization, and staging/prod environments.' },
          { tit: 'Core SaaS Engine & Auth', desc: 'Multi-tenant authentication, role permissions, and billing subscriptions.' },
          { tit: 'Responsive Web & Mobile App', desc: 'Tailored pixel-perfect interface validated across all devices.' }
        ]
      },
      erp: {
        title: 'Custom Enterprise ERP & Operations Core',
        desc: 'Replaces fractured departmental spreadsheets with one unified, real-time system of record across HR, inventory, CRM, and accounting.',
        investment: '$14,000 – $28,000',
        timeline: '8 to 12 Weeks',
        sprints: '5-6 Sprints',
        team: '1 Lead Architect + 3 Senior Engineers + 1 QA Specialist',
        stack: 'React, Node.js / Go, PostgreSQL, Redis, Docker',
        deliverables: [
          { tit: 'Multi-Department Data Unified', desc: 'One shared database eliminating double-entry across all teams.' },
          { tit: 'Granular Role-Based Permissions', desc: 'Strict field-level privacy protecting salaries, margins, and audits.' },
          { tit: 'Real-Time Inventory & PO Ledger', desc: 'Live warehouse tracking with automated low-stock reorder triggers.' },
          { tit: 'Executive Analytics Dashboard', desc: 'Instant P&L reconciliation and operational throughput telemetry.' }
        ]
      },
      marketplace: {
        title: 'Two-Sided Service & Booking Marketplace',
        desc: 'High-concurrency platform balancing buyer discovery, provider portals, automated escrow payouts, and live availability calendars.',
        investment: '$12,000 – $22,000',
        timeline: '8 to 10 Weeks',
        sprints: '4-5 Sprints',
        team: '1 Lead Architect + 2 Senior Engineers + 1 Mobile Dev',
        stack: 'React / React Native, Node.js, Stripe Connect, WebSockets',
        deliverables: [
          { tit: 'Two-Sided Matching & Booking', desc: 'Real-time calendar synchronization with conflict detection.' },
          { tit: 'Automated Escrow & Split Payouts', desc: 'Compliant vendor onboarding, instant commission splits, and payouts.' },
          { tit: 'Vendor Management Portal', desc: 'Dedicated provider analytics, payout history, and service configuration.' },
          { tit: 'Mobile-Optimized Experience', desc: 'PWA and native mobile workflows for on-the-go provider management.' }
        ]
      },
      ai: {
        title: 'AI Workflows & Autonomous Agent Fleet',
        desc: 'Integration of enterprise LLM models, custom RAG document search, and autonomous task agents directly into your operational stack.',
        investment: '$10,000 – $20,000',
        timeline: '4 to 8 Weeks',
        sprints: '2-4 Sprints',
        team: '1 Lead AI Architect + 2 Machine Learning Engineers',
        stack: 'Python, FastAPI, LangChain, Pinecone / pgvector, OpenAI / Claude',
        deliverables: [
          { tit: 'Custom Domain RAG Pipeline', desc: 'Vector database semantic search over internal documentation and files.' },
          { tit: 'Autonomous Operational Agents', desc: 'Self-executing agent workflows for data extraction, triage, and drafting.' },
          { tit: 'Enterprise Guardrails & Fallbacks', desc: 'PII redaction, token budgeting, and deterministic validation layers.' },
          { tit: 'Telemetry & Accuracy Evaluation', desc: 'Real-time latency tracking, error analysis, and continuous feedback loop.' }
        ]
      }
    };

    function updateView(key) {
      var item = data[key];
      if (!item) return;

      var titleEl = document.getElementById('calcSpecTitle');
      var descEl = document.getElementById('calcSpecDesc');
      var investEl = document.getElementById('calcInvestment');
      var timelineEl = document.getElementById('calcTimeline');
      var sprintsEl = document.getElementById('calcSprints');
      var teamEl = document.getElementById('calcTeam');
      var stackEl = document.getElementById('calcStack');
      var deliverablesEl = document.getElementById('calcDeliverables');

      if (titleEl) titleEl.textContent = item.title;
      if (descEl) descEl.textContent = item.desc;
      if (investEl) investEl.textContent = item.investment;
      if (timelineEl) timelineEl.textContent = item.timeline;
      if (sprintsEl) sprintsEl.textContent = item.sprints;
      if (teamEl) teamEl.textContent = item.team;
      if (stackEl) stackEl.textContent = item.stack;

      if (deliverablesEl) {
        var html = '';
        item.deliverables.forEach(function (d) {
          html += '<div class="calc-deliverable-item">' +
            '<div class="tit"><span style="color:var(--hs-brand); font-weight:800;">✓</span> ' + d.tit + '</div>' +
            '<div class="desc">' + d.desc + '</div>' +
            '</div>';
        });
        deliverablesEl.innerHTML = html;
      }
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
        var key = this.getAttribute('data-calc-tab');
        updateView(key);
      });
    });

    // Default initialization
    updateView('mvp');
  }

  // 3. Case Studies & Portfolio Category Filters
  function initWorkFilters() {
    var filterBtns = document.querySelectorAll('.work-filter-btn');
    var cards = document.querySelectorAll('.work-card');
    if (!filterBtns.length || !cards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter');

        cards.forEach(function (card) {
          var cats = card.getAttribute('data-category') || '';
          if (filter === 'all' || cats.indexOf(filter) !== -1) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 4. Metrics Counter Animation
  function initCounters() {
    if (isReducedMotion) return;

    var counters = document.querySelectorAll('.proof-num');
    if (!counters.length) return;

    var animated = false;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(function (counter) {
            var text = counter.innerText.trim();
            var match = text.match(/([0-9.]+)(.*)/);
            if (!match) return;

            var target = parseFloat(match[1]);
            var suffix = match[2];
            var duration = 1200;
            var start = 0;
            var startTime = null;

            function step(timestamp) {
              if (!startTime) startTime = timestamp;
              var progress = Math.min((timestamp - startTime) / duration, 1);
              var val = progress * target;
              if (target >= 10) {
                counter.innerText = Math.floor(val) + suffix;
              } else {
                counter.innerText = val.toFixed(1) + suffix;
              }
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counter.innerText = text;
              }
            }
            requestAnimationFrame(step);
          });
        }
      });
    }, { threshold: 0.3 });

    var strip = document.querySelector('.proof-strip');
    if (strip) observer.observe(strip);
  }

  // 5. Dynamic Year Updater
  function initYear() {
    var yearEls = document.querySelectorAll('#yr, .copyright-year');
    var currentYear = new Date().getFullYear() || 2026;
    yearEls.forEach(function (el) {
      el.textContent = currentYear;
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initStickyNav();
      initEstimator();
      initWorkFilters();
      initCounters();
      initYear();
    });
  } else {
    initStickyNav();
    initEstimator();
    initWorkFilters();
    initCounters();
    initYear();
  }
})();
