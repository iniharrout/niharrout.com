/**
 * The site's guides as link cards, and which guides belong next to which service family and
 * industry theme. Service and industry pages show three matching guides and a link to the About
 * page, so every guide and the founder page get internal links from across the site (pages with
 * few internal links are found and valued less by search engines).
 *
 * Titles and descriptions come from the guide modules (scripts/blog/<slug>.js) and the older
 * guides list (scripts/blog/older.js), so they stay in sync with the posts.
 */
const fs = require('fs');
const path = require('path');

const OLDER = require('../blog/older');

function guide(slug) {
  const file = path.join(__dirname, '..', 'blog', slug + '.js');
  if (fs.existsSync(file)) {
    const p = require(file);
    return { slug, title: p.title, text: p.cardDesc, tag: p.category };
  }
  const o = OLDER[slug];
  if (!o) throw new Error('unknown guide: ' + slug);
  return { slug, title: o.title, text: o.blurb, tag: o.tag };
}

// Three guides per service family (keys match scripts/site-data/services.js families).
const BY_FAMILY = {
  custom: ['why-custom-erp-implementations-fail', 'web-application-development-build-vs-buy', 'how-to-choose-a-software-development-company'],
  mobile: ['mobile-app-vs-web-app-which-to-build-first', 'react-native-mobile-app-playbook', 'cost-to-build-mvp-2026'],
  web: ['web-application-development-build-vs-buy', 'mobile-app-vs-web-app-which-to-build-first', 'fixed-price-vs-time-and-materials-software-development'],
  devops: ['how-to-choose-a-software-development-company', 'fixed-price-vs-time-and-materials-software-development', 'web-application-development-build-vs-buy'],
  ai: ['how-to-add-ai-to-an-existing-product', 'pragmatic-enterprise-ai-workflows', 'openai-select-partner'],
  startup: ['what-is-a-prd-how-to-write-a-product-requirements-document', 'cost-to-build-mvp-2026', 'product-scoping-framework-kill-feature-bloat'],
};

// Three guides per industry theme (titles match the groups in scripts/site-data/industries.js).
const BY_THEME = [
  [/commerce|services/i, ['cost-to-build-mvp-2026', 'mobile-app-vs-web-app-which-to-build-first', 'how-to-choose-a-software-development-company']],
  [/industry|infrastructure/i, ['why-custom-erp-implementations-fail', 'web-application-development-build-vs-buy', 'how-to-add-ai-to-an-existing-product']],
  [/technology|media/i, ['what-is-a-prd-how-to-write-a-product-requirements-document', 'react-native-mobile-app-playbook', 'product-scoping-framework-kill-feature-bloat']],
  [/finance|health|public/i, ['how-to-add-ai-to-an-existing-product', 'pragmatic-enterprise-ai-workflows', 'fixed-price-vs-time-and-materials-software-development']],
];

const forFamily = (key) => (BY_FAMILY[key] || BY_FAMILY.startup).map(guide);
function forTheme(themeTitle) {
  const hit = BY_THEME.find(([re]) => re.test(themeTitle));
  return (hit ? hit[1] : BY_FAMILY.startup).map(guide);
}

module.exports = { guide, forFamily, forTheme, BY_FAMILY };
