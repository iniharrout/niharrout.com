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

// Three guides per service page, where a closer match exists than the family default.
const BY_SUB = {
  'custom-erp-development': ['erp-vs-crm-difference', 'why-custom-erp-implementations-fail', 'legacy-software-modernization-guide'],
  'crm-development': ['custom-crm-vs-salesforce-hubspot-zoho', 'whatsapp-business-api-guide', 'erp-vs-crm-difference'],
  'enterprise-application-development': ['web-application-development-build-vs-buy', 'how-to-choose-a-tech-stack-for-your-startup', 'software-maintenance-cost-and-planning'],
  'software-consulting': ['how-to-choose-a-software-development-company', 'freelancer-vs-agency-for-app-development', 'agile-vs-waterfall-software-development'],
  'legacy-application-modernization': ['legacy-software-modernization-guide', 'why-custom-erp-implementations-fail', 'aws-vs-azure-vs-google-cloud-for-startups'],
  'ecommerce-solutions': ['how-to-build-a-multi-vendor-marketplace-app', 'upi-payment-integration-for-apps', 'how-to-build-a-quick-commerce-app'],
  'android-app-development': ['native-vs-cross-platform-app-development', 'app-store-and-google-play-approval-guide', 'app-store-optimization-guide'],
  'ios-app-development': ['native-vs-cross-platform-app-development', 'app-store-and-google-play-approval-guide', 'mobile-app-security-checklist'],
  'react-native-app-development': ['react-native-vs-flutter', 'react-native-mobile-app-playbook', 'native-vs-cross-platform-app-development'],
  'flutter-app-development': ['react-native-vs-flutter', 'native-vs-cross-platform-app-development', 'app-development-cost-factors-india'],
  'mobile-app-qa-testing': ['mobile-app-security-checklist', 'app-store-and-google-play-approval-guide', 'software-maintenance-cost-and-planning'],
  'mobile-app-modernization': ['legacy-software-modernization-guide', 'software-maintenance-cost-and-planning', 'react-native-vs-flutter'],
  'customized-web-development': ['website-vs-web-app-difference', 'how-to-choose-a-tech-stack-for-your-startup', 'web-application-development-build-vs-buy'],
  'enterprise-web-development': ['web-application-development-build-vs-buy', 'legacy-software-modernization-guide', 'how-to-build-a-saas-product'],
  'cross-platform-development': ['native-vs-cross-platform-app-development', 'pwa-vs-native-app', 'react-native-vs-flutter'],
  'pwa-development': ['pwa-vs-native-app', 'website-vs-web-app-difference', 'mobile-app-vs-web-app-which-to-build-first'],
  'on-site-seo-development': ['website-vs-web-app-difference', 'app-store-optimization-guide', 'pwa-vs-native-app'],
  'cms-development': ['website-vs-web-app-difference', 'how-to-choose-a-tech-stack-for-your-startup', 'software-maintenance-cost-and-planning'],
  'cloud-consulting': ['aws-vs-azure-vs-google-cloud-for-startups', 'legacy-software-modernization-guide', 'how-to-choose-a-tech-stack-for-your-startup'],
  'ci-cd-implementation': ['software-maintenance-cost-and-planning', 'agile-vs-waterfall-software-development', 'aws-vs-azure-vs-google-cloud-for-startups'],
  'kubernetes-implementation': ['aws-vs-azure-vs-google-cloud-for-startups', 'how-to-choose-a-tech-stack-for-your-startup', 'legacy-software-modernization-guide'],
  'serverless-architecture': ['aws-vs-azure-vs-google-cloud-for-startups', 'how-to-build-a-saas-product', 'how-to-choose-a-tech-stack-for-your-startup'],
  'cloud-cost-optimisation': ['aws-vs-azure-vs-google-cloud-for-startups', 'software-maintenance-cost-and-planning', 'app-development-cost-factors-india'],
  'infrastructure-monitoring': ['software-maintenance-cost-and-planning', 'mobile-app-security-checklist', 'aws-vs-azure-vs-google-cloud-for-startups'],
  'ai-development': ['generative-ai-use-cases-for-business', 'how-to-add-ai-to-an-existing-product', 'how-to-reduce-ai-hallucinations'],
  'ai-consulting': ['generative-ai-use-cases-for-business', 'rag-vs-fine-tuning', 'ai-agents-for-business'],
  'ai-powered-mobile-app-development': ['how-to-add-ai-to-an-existing-product', 'how-to-build-an-ai-chatbot-for-business', 'react-native-vs-flutter'],
  'machine-learning-analytics': ['rag-vs-fine-tuning', 'generative-ai-use-cases-for-business', 'pragmatic-enterprise-ai-workflows'],
  'generative-ai': ['generative-ai-use-cases-for-business', 'how-to-reduce-ai-hallucinations', 'rag-vs-fine-tuning'],
  'chatgpt-solutions': ['how-to-build-an-ai-chatbot-for-business', 'how-to-reduce-ai-hallucinations', 'openai-select-partner'],
  'mvp-development': ['mvp-vs-prototype-vs-proof-of-concept', 'cost-to-build-mvp-2026', 'how-long-does-it-take-to-build-an-app'],
  'rapid-prototyping': ['mvp-vs-prototype-vs-proof-of-concept', 'ui-vs-ux-design-difference', 'how-to-validate-a-startup-idea'],
  'technical-architecture': ['how-to-choose-a-tech-stack-for-your-startup', 'aws-vs-azure-vs-google-cloud-for-startups', 'how-to-build-a-saas-product'],
  'investor-ready-demos': ['how-to-validate-a-startup-idea', 'mvp-vs-prototype-vs-proof-of-concept', 'what-is-a-prd-how-to-write-a-product-requirements-document'],
  'post-launch-iteration': ['software-maintenance-cost-and-planning', 'app-store-optimization-guide', 'how-to-write-user-stories'],
};

// Three guides per industry page, where a closer match exists than the theme default.
const BY_INDUSTRY = {
  healthcare: ['how-to-build-a-telemedicine-app', 'dpdp-act-guide-for-app-founders', 'mobile-app-security-checklist'],
  fintech: ['how-to-build-a-fintech-app-in-india', 'upi-payment-integration-for-apps', 'mobile-app-security-checklist'],
  ecommerce: ['how-to-build-a-multi-vendor-marketplace-app', 'upi-payment-integration-for-apps', 'how-to-build-a-quick-commerce-app'],
  logistics: ['how-to-build-a-quick-commerce-app', 'how-to-build-a-food-delivery-app', 'legacy-software-modernization-guide'],
  education: ['how-to-build-an-edtech-app', 'dpdp-act-guide-for-app-founders', 'react-native-vs-flutter'],
  'real-estate': ['how-to-build-a-real-estate-app', 'custom-crm-vs-salesforce-hubspot-zoho', 'whatsapp-business-api-guide'],
  restaurant: ['how-to-build-a-food-delivery-app', 'how-to-build-a-quick-commerce-app', 'upi-payment-integration-for-apps'],
  'on-demand': ['how-to-build-a-food-delivery-app', 'how-to-build-a-multi-vendor-marketplace-app', 'salon-booking-app-development'],
  'fitness-wellness': ['salon-booking-app-development', 'pwa-vs-native-app', 'app-store-optimization-guide'],
  events: ['how-to-build-a-multi-vendor-marketplace-app', 'upi-payment-integration-for-apps', 'whatsapp-business-api-guide'],
  manufacturing: ['erp-vs-crm-difference', 'why-custom-erp-implementations-fail', 'legacy-software-modernization-guide'],
  saas: ['how-to-build-a-saas-product', 'how-to-choose-a-tech-stack-for-your-startup', 'aws-vs-azure-vs-google-cloud-for-startups'],
  government: ['legacy-software-modernization-guide', 'dpdp-act-guide-for-app-founders', 'the-future-of-digital-india-is-homegrown'],
  'social-networking': ['how-to-reduce-ai-hallucinations', 'app-store-optimization-guide', 'mobile-app-security-checklist'],
  'media-entertainment': ['generative-ai-use-cases-for-business', 'pwa-vs-native-app', 'app-store-optimization-guide'],
  'travel-hospitality': ['how-to-build-a-multi-vendor-marketplace-app', 'whatsapp-business-api-guide', 'upi-payment-integration-for-apps'],
};
const forSub = (key, famKey) => (BY_SUB[key] || BY_FAMILY[famKey] || BY_FAMILY.startup).map(guide);
const forIndustry = (slug, themeTitle) => (BY_INDUSTRY[slug] ? BY_INDUSTRY[slug].map(guide) : forTheme(themeTitle));

module.exports = { guide, forFamily, forTheme, forSub, forIndustry, BY_FAMILY };
