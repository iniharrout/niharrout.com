/**
 * Startup & Project Name Generator with Keyword Pinning
 * NiharRout.com Interactive Tools Suite
 */

(function () {
  'use strict';

  // State
  const state = {
    keywords: ['organ', 'cart'],
    pinnedKeywords: ['organ'],
    style: 'all', // 'all', 'compound', 'suffixes', 'short', 'evocative', 'abstract'
    industry: 'all', // 'all', 'tech_ai', 'fintech', 'ecommerce', 'healthtech', 'b2b_saas', 'logistics'
    favorites: []
  };

  // Lexicons & Morphemes
  const PREFIXES = [
    'Nova', 'Hyper', 'Omni', 'Velo', 'Aero', 'Syn', 'Meta', 'Kinet', 'Apex', 'Prime',
    'Nexus', 'Pulse', 'Strat', 'Core', 'Zen', 'Flex', 'True', 'Alt', 'Bold', 'Bright',
    'Vital', 'Echo', 'Shift', 'Quantum', 'Opti', 'Rapid', 'Aura', 'Onward', 'Crest', 'Atlas'
  ];

  const SUFFIXES = [
    'ly', 'ify', 'io', 'ex', 'flow', 'sync', 'pulse', 'stack', 'wave', 'node',
    'hub', 'kit', 'base', 'loop', 'craft', 'forge', 'grid', 'run', 'path', 'dock',
    'works', 'lab', 'mate', 'link', 'sphere', 'mark', 'mind', 'scale', 'port', 'shift'
  ];

  const EVOCATIVE_ROOTS = [
    'Loom', 'Forge', 'Nest', 'Peak', 'Haven', 'Harbor', 'Beacon', 'Anchor', 'Ridge',
    'Crest', 'Vanguard', 'Origin', 'Foundry', 'Compass', 'Prism', 'Orbit', 'Canopy', 'Spark'
  ];

  const ABSTRACT_ENDINGS = ['ix', 'ox', 'a', 'um', 'is', 'on', 'ra', 'vo', 'en', 'os'];

  const INDUSTRY_TERMS = {
    tech_ai: { prefixes: ['Cortex', 'Cogni', 'Neural', 'Deep', 'Intel'], suffixes: ['bot', 'ai', 'net', 'flow'], taglines: ['Autonomous intelligence engine', 'AI copilot for modern workflows', 'Neural decision platform'] },
    fintech: { prefixes: ['Pay', 'Vault', 'Ledger', 'Mint', 'Coin'], suffixes: ['pay', 'cap', 'settle', 'fold'], taglines: ['Next-gen settlement and payments', 'Automated treasury infrastructure', 'Frictionless capital workflows'] },
    ecommerce: { prefixes: ['Cart', 'Shop', 'Market', 'Bazaar', 'Drop'], suffixes: ['cart', 'mart', 'drop', 'store'], taglines: ['Modern multi-channel commerce platform', 'High-velocity retail operations', 'Frictionless checkout experience'] },
    healthtech: { prefixes: ['Care', 'Vital', 'Life', 'Med', 'Cure'], suffixes: ['care', 'pulse', 'med', 'health'], taglines: ['Patient-first care and registry portal', 'Secure clinical workflow engine', 'Next-gen health coordination'] },
    b2b_saas: { prefixes: ['Ops', 'Sync', 'Task', 'Desk', 'Suite'], suffixes: ['desk', 'stack', 'ops', 'suite'], taglines: ['Unified operational system of record', 'Enterprise workflow automation', 'Scalable team productivity engine'] },
    logistics: { prefixes: ['Fleet', 'Route', 'Swift', 'Dispatch', 'Cargo'], suffixes: ['track', 'haul', 'route', 'ship'], taglines: ['Real-time dispatch and fleet routing', 'Autonomous delivery orchestrator', 'End-to-end supply visibility'] }
  };

  function capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  function cleanWord(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '').trim();
  }

  // Generation Engines
  function generateCompound(keyword, ind) {
    const list = ind && INDUSTRY_TERMS[ind] ? INDUSTRY_TERMS[ind].prefixes.concat(PREFIXES) : PREFIXES;
    const partner = list[Math.floor(Math.random() * list.length)];
    return Math.random() > 0.5
      ? `${capitalize(keyword)}${partner}`
      : `${partner}${capitalize(keyword)}`;
  }

  function generateSuffix(keyword) {
    const suf = SUFFIXES[Math.floor(Math.random() * SUFFIXES.length)];
    const kw = keyword.toLowerCase();
    // Smooth transition
    if (suf === 'ly' && kw.endsWith('l')) return `${capitalize(kw)}y`;
    if (suf === 'ify' && (kw.endsWith('e') || kw.endsWith('y'))) return `${capitalize(kw.slice(0, -1))}ify`;
    return `${capitalize(kw)}${suf}`;
  }

  function generateShort(keyword) {
    const kw = keyword.toLowerCase().slice(0, 4);
    const endings = ['o', 'a', 'x', 'i', 'u', 'e', 'ex'];
    const end = endings[Math.floor(Math.random() * endings.length)];
    return capitalize(`${kw}${end}`);
  }

  function generateEvocative(keyword) {
    const root = EVOCATIVE_ROOTS[Math.floor(Math.random() * EVOCATIVE_ROOTS.length)];
    return Math.random() > 0.5
      ? `${root} ${capitalize(keyword)}`
      : `${capitalize(keyword)} ${root}`;
  }

  function generateAbstract(keyword) {
    const clean = keyword.toLowerCase().slice(0, 5);
    const ending = ABSTRACT_ENDINGS[Math.floor(Math.random() * ABSTRACT_ENDINGS.length)];
    return capitalize(`${clean}${ending}`);
  }

  function generateTagline(name, keyword, industry) {
    const indData = INDUSTRY_TERMS[industry] || (Object.values(INDUSTRY_TERMS)[Math.floor(Math.random() * Object.values(INDUSTRY_TERMS).length)]);
    const template = indData.taglines[Math.floor(Math.random() * indData.taglines.length)];
    return `${template} built around ${keyword}.`;
  }

  function generateNames() {
    const results = [];
    const keywordsToUse = state.pinnedKeywords.length > 0
      ? state.pinnedKeywords
      : (state.keywords.length > 0 ? state.keywords : ['craft', 'flow']);

    const styles = state.style === 'all'
      ? ['compound', 'suffixes', 'short', 'evocative', 'abstract']
      : [state.style];

    const targetCount = 18;
    const seen = new Set();

    let attempts = 0;
    while (results.length < targetCount && attempts < 150) {
      attempts++;
      const currentKw = keywordsToUse[Math.floor(Math.random() * keywordsToUse.length)];
      const currentStyle = styles[Math.floor(Math.random() * styles.length)];
      let name = '';

      switch (currentStyle) {
        case 'compound':
          name = generateCompound(currentKw, state.industry !== 'all' ? state.industry : null);
          break;
        case 'suffixes':
          name = generateSuffix(currentKw);
          break;
        case 'short':
          name = generateShort(currentKw);
          break;
        case 'evocative':
          name = generateEvocative(currentKw);
          break;
        case 'abstract':
          name = generateAbstract(currentKw);
          break;
      }

      const cleanKey = name.toLowerCase().replace(/\s+/g, '');
      if (name && !seen.has(cleanKey) && name.length >= 4 && name.length <= 18) {
        seen.add(cleanKey);
        results.push({
          name: name,
          cleanName: cleanKey,
          style: currentStyle,
          keyword: currentKw,
          tagline: generateTagline(name, currentKw, state.industry)
        });
      }
    }

    return results;
  }

  function renderKeywords() {
    const container = document.getElementById('keyword-tags-container');
    if (!container) return;

    container.innerHTML = '';
    if (state.keywords.length === 0) {
      container.innerHTML = '<span style="font-size:13px; color:var(--tool-ink-3);">No keywords added yet. Type a keyword above or click a suggestion.</span>';
      return;
    }

    state.keywords.forEach(kw => {
      const isPinned = state.pinnedKeywords.includes(kw);
      const tag = document.createElement('div');
      tag.className = `keyword-tag ${isPinned ? 'is-pinned' : ''}`;
      tag.innerHTML = `
        <button type="button" class="tag-pin-btn" title="${isPinned ? 'Click to Unpin' : 'Click to Pin this keyword'}">
          ${isPinned ? '📌' : '📍'}
        </button>
        <span>${kw}</span>
        <button type="button" class="tag-del-btn" title="Remove keyword">×</button>
      `;

      // Pin toggle
      tag.querySelector('.tag-pin-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        togglePin(kw);
      });

      // Delete
      tag.querySelector('.tag-del-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        removeKeyword(kw);
      });

      container.appendChild(tag);
    });

    // Update pinned count label
    const pinnedHint = document.getElementById('pinned-status-hint');
    if (pinnedHint) {
      if (state.pinnedKeywords.length > 0) {
        pinnedHint.innerHTML = `<strong>${state.pinnedKeywords.length}</strong> pinned (names will anchor directly to these)`;
      } else {
        pinnedHint.textContent = 'Click 📍 to pin keywords so all names anchor around them';
      }
    }
  }

  function togglePin(kw) {
    if (state.pinnedKeywords.includes(kw)) {
      state.pinnedKeywords = state.pinnedKeywords.filter(k => k !== kw);
    } else {
      state.pinnedKeywords.push(kw);
    }
    renderKeywords();
    runGeneration();
  }

  function addKeyword(word) {
    const cleaned = cleanWord(word).toLowerCase();
    if (cleaned && !state.keywords.includes(cleaned)) {
      state.keywords.push(cleaned);
      if (state.keywords.length === 1) {
        state.pinnedKeywords.push(cleaned);
      }
      renderKeywords();
      runGeneration();
    }
  }

  function removeKeyword(kw) {
    state.keywords = state.keywords.filter(k => k !== kw);
    state.pinnedKeywords = state.pinnedKeywords.filter(k => k !== kw);
    renderKeywords();
    runGeneration();
  }

  function renderFavorites() {
    const container = document.getElementById('favorites-container');
    const drawer = document.getElementById('favorites-drawer');
    if (!container || !drawer) return;

    if (state.favorites.length === 0) {
      drawer.style.display = 'none';
      return;
    }

    drawer.style.display = 'block';
    container.innerHTML = '';
    state.favorites.forEach(fav => {
      const pill = document.createElement('div');
      pill.className = 'fav-pill';
      pill.innerHTML = `
        <span>${fav}</span>
        <span class="fav-remove" title="Remove from favorites">×</span>
      `;
      pill.querySelector('.fav-remove').addEventListener('click', () => {
        toggleFavorite(fav);
      });
      container.appendChild(pill);
    });
  }

  function toggleFavorite(name) {
    if (state.favorites.includes(name)) {
      state.favorites = state.favorites.filter(n => n !== name);
      showToast(`Removed "${name}" from favorites`);
    } else {
      state.favorites.push(name);
      showToast(`Saved "${name}" to favorites!`);
    }
    try {
      localStorage.setItem('nr_saved_startup_names', JSON.stringify(state.favorites));
    } catch (e) {}
    renderFavorites();
    updateCardSavedStates();
  }

  function updateCardSavedStates() {
    document.querySelectorAll('.name-card').forEach(card => {
      const name = card.getAttribute('data-name');
      const btn = card.querySelector('.btn-save');
      if (btn) {
        if (state.favorites.includes(name)) {
          btn.classList.add('saved');
          btn.innerHTML = '★ Saved';
        } else {
          btn.classList.remove('saved');
          btn.innerHTML = '☆ Save';
        }
      }
    });
  }

  function runGeneration() {
    const grid = document.getElementById('names-grid');
    if (!grid) return;

    const names = generateNames();
    grid.innerHTML = '';

    names.forEach(item => {
      const card = document.createElement('div');
      card.className = 'name-card';
      card.setAttribute('data-name', item.name);

      const isSaved = state.favorites.includes(item.name);
      const encodedClean = encodeURIComponent(item.cleanName);

      card.innerHTML = `
        <div>
          <div class="name-top">
            <h3 class="name-text">${item.name}</h3>
            <span class="name-style-tag">${item.style}</span>
          </div>
          <p class="name-tagline">${item.tagline}</p>
          <div class="name-domains">
            <a href="https://www.namecheap.com/domains/registration/results/?domain=${encodedClean}.com" target="_blank" rel="noopener" class="domain-pill">.com ↗</a>
            <a href="https://www.namecheap.com/domains/registration/results/?domain=${encodedClean}.ai" target="_blank" rel="noopener" class="domain-pill">.ai ↗</a>
            <a href="https://www.namecheap.com/domains/registration/results/?domain=${encodedClean}.io" target="_blank" rel="noopener" class="domain-pill">.io ↗</a>
            <a href="https://www.namecheap.com/domains/registration/results/?domain=${encodedClean}.co" target="_blank" rel="noopener" class="domain-pill">.co ↗</a>
          </div>
        </div>
        <div class="name-actions">
          <button type="button" class="name-btn btn-copy" title="Copy to clipboard">
            📋 Copy
          </button>
          <button type="button" class="name-btn btn-save ${isSaved ? 'saved' : ''}">
            ${isSaved ? '★ Saved' : '☆ Save'}
          </button>
        </div>
      `;

      // Copy
      card.querySelector('.btn-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(item.name).then(() => {
          showToast(`Copied "${item.name}" to clipboard`);
        });
      });

      // Save
      card.querySelector('.btn-save').addEventListener('click', () => {
        toggleFavorite(item.name);
      });

      grid.appendChild(card);
    });

    // Update count display
    const countEl = document.getElementById('results-count-display');
    if (countEl) {
      countEl.textContent = `${names.length} brandable suggestions generated`;
    }
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

  function init() {
    // Load favorites from localStorage
    try {
      const saved = localStorage.getItem('nr_saved_startup_names');
      if (saved) state.favorites = JSON.parse(saved);
    } catch (e) {}

    // Input form
    const inputField = document.getElementById('namer-input');
    const addBtn = document.getElementById('btn-add-keyword');

    if (inputField && addBtn) {
      const handleAdd = () => {
        const val = inputField.value.trim();
        if (val) {
          // split commas if user typed multiple
          val.split(/[\s,]+/).forEach(w => addKeyword(w));
          inputField.value = '';
        }
      };

      addBtn.addEventListener('click', handleAdd);
      inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleAdd();
        }
      });
    }

    // Presets
    document.querySelectorAll('[data-preset-kw]').forEach(chip => {
      chip.addEventListener('click', function () {
        const kw = this.getAttribute('data-preset-kw');
        addKeyword(kw);
      });
    });

    // Style filter
    const styleSelect = document.getElementById('namer-style-select');
    if (styleSelect) {
      styleSelect.addEventListener('change', function () {
        state.style = this.value;
        runGeneration();
      });
    }

    // Industry filter
    const indSelect = document.getElementById('namer-industry-select');
    if (indSelect) {
      indSelect.addEventListener('change', function () {
        state.industry = this.value;
        runGeneration();
      });
    }

    // Generate CTA
    const genBtn = document.getElementById('btn-generate-names');
    if (genBtn) {
      genBtn.addEventListener('click', () => {
        runGeneration();
      });
    }

    renderKeywords();
    renderFavorites();
    runGeneration();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
