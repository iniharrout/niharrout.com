/**
 * Mobile App Development Cost & Timeline Calculator
 * NiharRout.com Interactive Tools Suite
 */

(function () {
  'use strict';

  // Base state
  const state = {
    currency: 'INR', // 'INR' or 'USD'
    archetype: 'ecommerce',
    platforms: ['cross_platform', 'include_admin'],
    features: ['auth_social', 'payments', 'push_sms'],
    designTier: 'custom',
    scaleUsers: 10000
  };

  // Archetype Data
  const ARCHETYPES = {
    ecommerce: {
      name: 'E-Commerce / Multi-Vendor Marketplace',
      tagline: 'Amazon, Flipkart, or Shopify-style commerce',
      baseWeeks: 8,
      baseInrMin: 550000,
      baseInrMax: 850000,
      benchmark: 'Like Amazon: Involves customer shopping app, product catalog, cart/checkout, payment gateways, order tracking, and vendor/admin inventory management. Enterprise Amazon costs millions to run at scale, but a high-performing 0-to-1 marketplace MVP launches reliably within this bracket.'
    },
    ondemand: {
      name: 'On-Demand Service & Booking',
      tagline: 'Urban Company, Uber, or Swiggy-style delivery',
      baseWeeks: 9,
      baseInrMin: 650000,
      baseInrMax: 950000,
      benchmark: 'Like Urban Company / Uber: Dual-sided marketplace requiring customer app, provider/agent app, real-time dispatch state machine, geolocation tracking, and dynamic slot scheduling.'
    },
    healthtech: {
      name: 'HealthTech & Care Management',
      tagline: 'Telehealth, donor/organ registry, clinic scheduling',
      baseWeeks: 7,
      baseInrMin: 480000,
      baseInrMax: 780000,
      benchmark: 'Like Healthcare / Registry Portals: Prioritizes encrypted patient records, doctor scheduling, video consultation or verified listing matching with audit-logged role permissions.'
    },
    b2b_saas: {
      name: 'Custom B2B SaaS & Enterprise ERP',
      tagline: 'Operations workflow, supply chain, multi-tenant portal',
      baseWeeks: 8,
      baseInrMin: 580000,
      baseInrMax: 900000,
      benchmark: 'Like Custom ERPs: High-throughput data tables, complex approval workflows, multi-tenant data partitioning, and offline sync for field operators.'
    },
    social_chat: {
      name: 'Social, Community & Messaging',
      tagline: 'Feed, direct chat, audio/video channels, groups',
      baseWeeks: 7,
      baseInrMin: 450000,
      baseInrMax: 720000,
      benchmark: 'Like Discord or Community Apps: Real-time WebSocket connection pools, push notification fanouts, user profile directories, and content moderation feeds.'
    },
    mvp_lean: {
      name: 'Lean 0-to-1 Startup Prototype',
      tagline: 'Ultra-focused core value proposition to test PMF',
      baseWeeks: 5,
      baseInrMin: 320000,
      baseInrMax: 490000,
      benchmark: 'Fastest time-to-market: Trims secondary bloat and launches the primary user loop within 4 to 6 weeks to collect investor interest or early paying customers.'
    }
  };

  // Feature Addons (in INR addition and extra weeks)
  const FEATURES = {
    auth_social: { name: 'Social & Phone OTP Auth', inrMin: 35000, inrMax: 55000, weeks: 0.5 },
    payments: { name: 'Payments & Subscriptions (Razorpay/Stripe)', inrMin: 60000, inrMax: 90000, weeks: 1.0 },
    realtime_chat: { name: 'In-App Live Chat & WebSockets', inrMin: 70000, inrMax: 110000, weeks: 1.2 },
    geo_tracking: { name: 'Live GPS & Route Tracking', inrMin: 75000, inrMax: 120000, weeks: 1.2 },
    ai_copilot: { name: 'AI / LLM Integration & Smart Search', inrMin: 85000, inrMax: 140000, weeks: 1.5 },
    push_sms: { name: 'Push Alerts & Transactional SMS', inrMin: 30000, inrMax: 45000, weeks: 0.5 },
    multilingual: { name: 'Multi-Language Localization', inrMin: 40000, inrMax: 65000, weeks: 0.8 },
    offline_sync: { name: 'Offline-First Local Storage & Sync', inrMin: 65000, inrMax: 95000, weeks: 1.0 }
  };

  // Platform Multipliers
  const PLATFORM_CONFIG = {
    cross_platform: { mult: 1.0, weeks: 0, label: 'Cross-Platform (Flutter / React Native)' },
    native_both: { mult: 1.45, weeks: 2.5, label: 'Separate Native Swift & Kotlin Apps' },
    include_admin: { inrMin: 90000, inrMax: 160000, weeks: 1.5, label: 'Web Admin Operations Portal' }
  };

  // Design Tiers
  const DESIGN_TIERS = {
    mvp: { mult: 0.9, label: 'Clean Utilitarian MVP', weeks: -0.5 },
    custom: { mult: 1.0, label: 'Custom Branded & Polished', weeks: 0 },
    editorial: { mult: 1.2, label: 'High-End Editorial & Micro-interactions', weeks: 1.5 }
  };

  // USD Conversion Ratio & Global standard multiplier
  // US standard baseline is priced reflecting global boutique product management & engineering delivery
  const INR_TO_USD_RATE = 1 / 86; // live spot baseline
  const US_MARKET_FACTOR = 2.4;   // Reflects US/European delivery standard benchmark vs offshore Indian standard

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

    // Rounding
    minInr = Math.round(minInr / 10000) * 10000;
    maxInr = Math.round(maxInr / 10000) * 10000;
    weeks = Math.round(weeks);

    return {
      minInr,
      maxInr,
      weeks,
      benchmark: arch.benchmark
    };
  }

  function render() {
    const result = calculate();

    // Update Price
    const priceEl = document.getElementById('calc-price-display');
    if (priceEl) {
      priceEl.textContent = `${formatCurrency(result.minInr)} – ${formatCurrency(result.maxInr, true)}`;
    }

    // Update Standard label
    const standardEl = document.getElementById('calc-standard-label');
    if (standardEl) {
      if (state.currency === 'INR') {
        standardEl.innerHTML = '🇮🇳 <strong>Indian Standard Delivery</strong> · In-house full-time team';
      } else {
        standardEl.innerHTML = '🇺🇸 <strong>US &amp; Global Standard</strong> · Fully dedicated squad';
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

    // Update Calendly link with summary params
    const bookBtn = document.getElementById('btn-book-calc');
    if (bookBtn) {
      const summaryText = encodeURIComponent(
        `App Estimate: ${ARCHETYPES[state.archetype].name} (${formatCurrency(result.minInr)} - ${formatCurrency(result.maxInr, true)}, ${result.weeks} wks)`
      );
      bookBtn.href = `https://calendly.com/creuto/meet?a1=${summaryText}`;
    }
  }

  // Event Listeners
  function init() {
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
        
        // Single choice between cross vs native
        if (plat === 'cross_platform' || plat === 'native_both') {
          state.platforms = state.platforms.filter(p => p !== 'cross_platform' && p !== 'native_both');
          state.platforms.push(plat);
          document.querySelectorAll('[data-platform="cross_platform"], [data-platform="native_both"]').forEach(c => c.classList.remove('selected'));
          this.classList.add('selected');
        } else if (plat === 'include_admin') {
          // Toggle admin portal
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
          `Application Type: ${arch.name}`,
          `Estimated Investment: ${formatCurrency(res.minInr)} – ${formatCurrency(res.maxInr, true)} (${state.currency === 'INR' ? 'Indian Standard' : 'US/Global Standard'})`,
          `Estimated Timeline: ${res.weeks - 1} to ${res.weeks + 1} Weeks`,
          `Platforms: ${state.platforms.join(', ')}`,
          `Features Selected: ${state.features.map(f => FEATURES[f]?.name).join(', ')}`,
          `Design Tier: ${DESIGN_TIERS[state.designTier].label}`,
          `Recommended Squad: 1 Product Strategist, 1 Tech Lead, 2 Mobile Developers, 1 UI/UX Designer, 1 QA`,
          `Calculated via niharrout.com/tools/app-cost-calculator`
        ].join('\n');

        navigator.clipboard.writeText(text).then(() => {
          showToast('Estimate summary copied to clipboard!');
        }).catch(() => {
          showToast('Summary copied!');
        });
      });
    }

    render();
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
