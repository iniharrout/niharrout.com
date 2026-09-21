/**
 * Mobile App Development Cost & Timeline Calculator (Multi-Step Wizard)
 * NiharRout.com Interactive Tools Suite
 */

(function () {
  'use strict';

  // Base state
  const state = {
    currentStep: 1, // 1: Archetype, 2: Platform, 3: Features, 4: Design Tier
    currency: 'INR', // 'INR' or 'USD'
    archetype: 'ecommerce',
    platforms: ['cross_platform', 'include_admin'],
    features: ['auth_social', 'payments', 'push_sms'],
    designTier: 'custom'
  };

  // Archetype Data with realistic, high-calibre production figures
  const ARCHETYPES = {
    ecommerce: {
      name: 'E-Commerce / Marketplace',
      shortName: 'Amazon / Marketplace',
      tagline: 'Amazon, Flipkart, or D2C brand store with catalog & seller panel',
      baseWeeks: 10,
      baseInrMin: 1450000,
      baseInrMax: 2250000,
      benchmark: 'Like Amazon: Involves customer shopping app, product catalog, cart/checkout, payment gateways, order tracking, and vendor/admin inventory management. Building an enterprise Amazon costs tens of millions, but a solid, scalable production MVP with multi-vendor flows and mobile apps typically scopes between ₹18L – ₹32L+ ($22k – $40k+ USD).'
    },
    ondemand: {
      name: 'On-Demand Service & Booking',
      shortName: 'Urban Company / On-Demand',
      tagline: 'Urban Company, Uber, or Swiggy: live slots, partner app, real-time dispatch',
      baseWeeks: 11,
      baseInrMin: 1600000,
      baseInrMax: 2450000,
      benchmark: 'Like Urban Company / Uber: Dual-sided marketplace requiring customer app, provider/agent app, real-time dispatch state machine, geolocation tracking, and dynamic slot scheduling. A production system with real-time sockets typically ranges ₹20L – ₹35L+ ($25k – $45k+ USD).'
    },
    healthtech: {
      name: 'HealthTech & Care Registry',
      shortName: 'Care & Registry / Telehealth',
      tagline: 'Organ/donor registries, tele-consultation, clinic bookings, secure health data',
      baseWeeks: 9,
      baseInrMin: 1350000,
      baseInrMax: 2100000,
      benchmark: 'Like Organ Registries / Healthcare Portals: Prioritizes encrypted patient records, verified donor-recipient matching logic, doctor tele-consultations, slot concurrency, and audit-logged role permissions. Production healthcare builds typically scope between ₹16L – ₹28L+ ($20k – $35k+ USD).'
    },
    b2b_saas: {
      name: 'Custom B2B SaaS & Enterprise ERP',
      shortName: 'Custom ERP / B2B SaaS',
      tagline: 'Operations systems, inventory, field staff workflows, enterprise audit tracking',
      baseWeeks: 10,
      baseInrMin: 1500000,
      baseInrMax: 2350000,
      benchmark: 'Like Custom ERPs: High-throughput operational databases, custom approval workflows, multi-tenant partitioning, and offline sync for field operators. Real-world custom ERPs scope from ₹18L – ₹32L+ ($24k – $42k+ USD).'
    },
    social_chat: {
      name: 'Social, Community & Live Chat',
      shortName: 'Social & Real-Time Chat',
      tagline: 'Community feeds, real-time messaging, WebSocket channels, media sharing',
      baseWeeks: 9,
      baseInrMin: 1250000,
      baseInrMax: 1950000,
      benchmark: 'Like Discord or Community Apps: Real-time WebSocket connection pools, push notification fanouts, user profile directories, and content moderation feeds.'
    },
    mvp_lean: {
      name: '0-to-1 Startup Prototype',
      shortName: 'Lean MVP Prototype',
      tagline: 'Laser-focused on 1 core loop. Minimum scope to validate paying demand in 5–7 weeks',
      baseWeeks: 6,
      baseInrMin: 750000,
      baseInrMax: 1150000,
      benchmark: 'Fastest time-to-market: Laser-focused core loop with senior engineering and clean architecture to validate customer demand or raise funding. Typical scope ranges ₹8L – ₹14L ($10k – $18k USD).'
    }
  };

  // Feature Addons (in INR addition and extra weeks)
  const FEATURES = {
    auth_social: { name: 'Phone OTP & Social Auth', inrMin: 75000, inrMax: 120000, weeks: 0.5 },
    payments: { name: 'Payments & Subscriptions (Razorpay/Stripe)', inrMin: 140000, inrMax: 220000, weeks: 1.2 },
    realtime_chat: { name: 'In-App Live Chat & WebSockets', inrMin: 160000, inrMax: 260000, weeks: 1.5 },
    geo_tracking: { name: 'Live GPS & Route Tracking', inrMin: 180000, inrMax: 280000, weeks: 1.5 },
    ai_copilot: { name: 'AI / LLM Assistant & Smart Search', inrMin: 220000, inrMax: 350000, weeks: 2.0 },
    push_sms: { name: 'Push Alerts & WhatsApp/SMS', inrMin: 70000, inrMax: 110000, weeks: 0.5 },
    multilingual: { name: 'Multi-Language Localization', inrMin: 90000, inrMax: 150000, weeks: 1.0 },
    offline_sync: { name: 'Offline-First Local Storage & Sync', inrMin: 150000, inrMax: 240000, weeks: 1.2 }
  };

  // Platform Multipliers
  const PLATFORM_CONFIG = {
    cross_platform: { mult: 1.0, weeks: 0, label: 'Cross-Platform (Flutter / RN)' },
    native_both: { mult: 1.45, weeks: 3.0, label: 'Separate Native Swift & Kotlin' },
    include_admin: { inrMin: 280000, inrMax: 450000, weeks: 2.0, label: 'Web Admin Portal' }
  };

  // Design Tiers
  const DESIGN_TIERS = {
    mvp: { mult: 0.95, label: 'Clean Utilitarian MVP', weeks: -0.5 },
    custom: { mult: 1.0, label: 'Custom Branded & Polished', weeks: 0 },
    editorial: { mult: 1.25, label: 'High-End Editorial & Micro-interactions', weeks: 2.0 }
  };

  // Currency calculations
  const INR_TO_USD_RATE = 1 / 86;
  const US_MARKET_FACTOR = 1.35; // Reflects US/European delivery standard benchmark

  function formatCurrency(inrAmount, isMax = false) {
    if (state.currency === 'INR') {
      const lakhs = (inrAmount / 100000).toFixed(1);
      return `₹${lakhs} Lakhs`;
    } else {
      const usdAmount = inrAmount * INR_TO_USD_RATE * US_MARKET_FACTOR;
      const thousands = Math.round(usdAmount / 1000);
      return `$${thousands}k USD`;
    }
  }

  function calculate() {
    const arch = ARCHETYPES[state.archetype];
    let minInr = arch.baseInrMin;
    let maxInr = arch.baseInrMax;
    let weeks = arch.baseWeeks;

    // Features
    state.features.forEach(fKey => {
      const f = FEATURES[fKey];
      if (f) {
        minInr += f.inrMin;
        maxInr += f.inrMax;
        weeks += f.weeks;
      }
    });

    // Platforms
    if (state.platforms.includes('native_both')) {
      minInr *= PLATFORM_CONFIG.native_both.mult;
      maxInr *= PLATFORM_CONFIG.native_both.mult;
      weeks += PLATFORM_CONFIG.native_both.weeks;
    }
    if (state.platforms.includes('include_admin')) {
      minInr += PLATFORM_CONFIG.include_admin.inrMin;
      maxInr += PLATFORM_CONFIG.include_admin.inrMax;
      weeks += PLATFORM_CONFIG.include_admin.weeks;
    }

    // Design Tier
    const dt = DESIGN_TIERS[state.designTier];
    minInr *= dt.mult;
    maxInr *= dt.mult;
    weeks += dt.weeks;

    // Rounding to clean thousands
    minInr = Math.round(minInr / 50000) * 50000;
    maxInr = Math.round(maxInr / 50000) * 50000;
    weeks = Math.round(weeks);

    return {
      minInr,
      maxInr,
      weeks,
      benchmark: arch.benchmark
    };
  }

  function goToStep(stepNum) {
    if (stepNum < 1 || stepNum > 4) return;
    state.currentStep = stepNum;

    // Update Step Tabs
    document.querySelectorAll('.step-tab').forEach((tab, index) => {
      const tabStep = index + 1;
      tab.classList.remove('active');
      if (tabStep === state.currentStep) {
        tab.classList.add('active');
      }
      if (tabStep < state.currentStep) {
        tab.classList.add('completed');
        const numEl = tab.querySelector('.step-tab-num');
        if (numEl) numEl.textContent = '✓';
      } else {
        tab.classList.remove('completed');
        const numEl = tab.querySelector('.step-tab-num');
        if (numEl) numEl.textContent = `0${tabStep}`;
      }
    });

    // Show active step container
    document.querySelectorAll('.calc-step').forEach((stepEl, index) => {
      if (index + 1 === state.currentStep) {
        stepEl.classList.add('active');
      } else {
        stepEl.classList.remove('active');
      }
    });

    // Scroll smoothly to the top of the calculator container if needed
    const container = document.getElementById('calc-wizard-top');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    render();
  }

  function render() {
    const result = calculate();
    const arch = ARCHETYPES[state.archetype];

    // Update Price Display
    const priceEl = document.getElementById('calc-price-display');
    if (priceEl) {
      priceEl.textContent = `${formatCurrency(result.minInr)} – ${formatCurrency(result.maxInr, true)}`;
    }

    // Update Standard label
    const standardEl = document.getElementById('calc-standard-label');
    if (standardEl) {
      if (state.currency === 'INR') {
        standardEl.innerHTML = '🇮🇳 <strong>Indian Standard Delivery</strong> · Full senior squad';
      } else {
        standardEl.innerHTML = '🇺🇸 <strong>US &amp; Global Standard</strong> · Dedicated boutique squad';
      }
    }

    // Update Timeline
    const timelineEl = document.getElementById('calc-timeline-display');
    if (timelineEl) {
      timelineEl.textContent = `${result.weeks - 1}–${result.weeks + 1} Weeks`;
    }

    // Update Benchmark Box
    const benchEl = document.getElementById('calc-benchmark-text');
    if (benchEl) {
      benchEl.textContent = result.benchmark;
    }

    // Update Breakdown
    const bDiscovery = document.getElementById('breakdown-discovery');
    const bDesign = document.getElementById('breakdown-design');
    const bFrontend = document.getElementById('breakdown-frontend');
    const bBackend = document.getElementById('breakdown-backend');
    const bDeploy = document.getElementById('breakdown-deploy');

    if (bDiscovery) bDiscovery.textContent = formatCurrency(result.minInr * 0.15);
    if (bDesign) bDesign.textContent = formatCurrency(result.minInr * 0.20);
    if (bFrontend) bFrontend.textContent = formatCurrency(result.minInr * 0.35);
    if (bBackend) bBackend.textContent = formatCurrency(result.minInr * 0.20);
    if (bDeploy) bDeploy.textContent = formatCurrency(result.minInr * 0.10);

    // Update Sidebar Selected Summary Pills
    const sumArch = document.getElementById('sum-arch-val');
    const sumPlat = document.getElementById('sum-plat-val');
    const sumFeat = document.getElementById('sum-feat-val');
    const sumTier = document.getElementById('sum-tier-val');

    if (sumArch) sumArch.textContent = arch.shortName;
    if (sumPlat) {
      const isNative = state.platforms.includes('native_both');
      const hasAdmin = state.platforms.includes('include_admin');
      sumPlat.textContent = `${isNative ? 'Native iOS & Android' : 'Flutter/RN'}${hasAdmin ? ' + Admin' : ''}`;
    }
    if (sumFeat) sumFeat.textContent = `${state.features.length} core features`;
    if (sumTier) sumTier.textContent = DESIGN_TIERS[state.designTier].label;

    // Update Calendly link with summary params
    const bookBtn = document.getElementById('btn-book-calc');
    if (bookBtn) {
      const summaryText = encodeURIComponent(
        `App Scope: ${arch.name} (${formatCurrency(result.minInr)} - ${formatCurrency(result.maxInr, true)}, ~${result.weeks} wks, ${DESIGN_TIERS[state.designTier].label})`
      );
      bookBtn.href = `https://calendly.com/creuto/meet?a1=${summaryText}`;
    }
  }

  function init() {
    // Stepper Tabs Click
    document.querySelectorAll('.step-tab').forEach((tab, index) => {
      tab.addEventListener('click', () => {
        goToStep(index + 1);
      });
    });

    // Step Prev/Next Buttons
    document.querySelectorAll('.btn-step-next').forEach(btn => {
      btn.addEventListener('click', function () {
        goToStep(state.currentStep + 1);
      });
    });

    document.querySelectorAll('.btn-step-prev').forEach(btn => {
      btn.addEventListener('click', function () {
        goToStep(state.currentStep - 1);
      });
    });

    // Sidebar "Edit" links
    document.querySelectorAll('[data-jump-step]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetStep = parseInt(this.getAttribute('data-jump-step'), 10);
        goToStep(targetStep);
      });
    });

    // Currency Toggle
    const currencyBtns = document.querySelectorAll('.currency-btn');
    currencyBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        currencyBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        state.currency = this.getAttribute('data-currency');
        render();
      });
    });

    // Archetype Selection
    const archOptions = document.querySelectorAll('[data-archetype]');
    archOptions.forEach(card => {
      card.addEventListener('click', function () {
        archOptions.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        state.archetype = this.getAttribute('data-archetype');
        render();
      });
    });

    // Platform Selection
    const platOptions = document.querySelectorAll('[data-platform]');
    platOptions.forEach(card => {
      card.addEventListener('click', function () {
        const plat = this.getAttribute('data-platform');
        if (plat === 'cross_platform' || plat === 'native_both') {
          state.platforms = state.platforms.filter(p => p !== 'cross_platform' && p !== 'native_both');
          state.platforms.push(plat);
          document.querySelectorAll('[data-platform="cross_platform"], [data-platform="native_both"]').forEach(c => c.classList.remove('selected'));
          this.classList.add('selected');
        } else if (plat === 'include_admin') {
          if (state.platforms.includes('include_admin')) {
            state.platforms = state.platforms.filter(p => p !== 'include_admin');
            this.classList.remove('selected');
          } else {
            state.platforms.push('include_admin');
            this.classList.add('selected');
          }
        }
        render();
      });
    });

    // Feature Checkboxes
    const featOptions = document.querySelectorAll('[data-feature]');
    featOptions.forEach(card => {
      card.addEventListener('click', function () {
        const fKey = this.getAttribute('data-feature');
        if (state.features.includes(fKey)) {
          state.features = state.features.filter(f => f !== fKey);
          this.classList.remove('selected');
        } else {
          state.features.push(fKey);
          this.classList.add('selected');
        }
        render();
      });
    });

    // Design Tier
    const tierOptions = document.querySelectorAll('[data-tier]');
    tierOptions.forEach(card => {
      card.addEventListener('click', function () {
        tierOptions.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        state.designTier = this.getAttribute('data-tier');
        render();
      });
    });

    // Copy Estimate Summary
    const copyBtn = document.getElementById('btn-copy-estimate');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        const res = calculate();
        const arch = ARCHETYPES[state.archetype];
        const text = [
          `--- MOBILE APPLICATION ESTIMATE SUMMARY ---`,
          `Application Model: ${arch.name}`,
          `Estimated Investment: ${formatCurrency(res.minInr)} – ${formatCurrency(res.maxInr, true)} (${state.currency === 'INR' ? 'Indian Standard' : 'US/Global Standard'})`,
          `Estimated Timeline: ${res.weeks - 1} to ${res.weeks + 1} Weeks`,
          `Platforms: ${state.platforms.map(p => PLATFORM_CONFIG[p]?.label).join(' + ')}`,
          `Selected Capabilities: ${state.features.map(f => FEATURES[f]?.name).join(', ')}`,
          `Design Standard: ${DESIGN_TIERS[state.designTier].label}`,
          `Squad: 1 Product Strategist, 1 Tech Architect, 2 Mobile Devs, 1 UI/UX Designer, 1 QA Specialist`,
          `Calculated via niharrout.com/tools/app-cost-calculator`
        ].join('\n');

        navigator.clipboard.writeText(text).then(() => {
          showToast('Estimate summary copied to clipboard!');
        }).catch(() => {
          showToast('Summary copied!');
        });
      });
    }

    goToStep(1);
  }

  function showToast(msg) {
    let toast = document.getElementById('tool-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'tool-toast';
      toast.className = 'tool-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
