#!/usr/bin/env node
/**
 * Stamps the animated hero demos (scripts/hero-demos.js) into the hand-written pages, between
 * <!-- demo:card --> ... <!-- /demo:card --> (or demo:bar) markers. The city pages get theirs from
 * build-locations.js. Usage: node scripts/build-hero-demos.js
 */
const fs = require('fs');
const path = require('path');
const { card, bar } = require('./hero-demos');

const ROOT = path.resolve(__dirname, '..');
const PAGES = {
  'services/ai-product-development/index.html': { card: 'ai' },
  'ai-product-development-bhubaneswar/index.html': { card: 'ai' },
  'services/mobile-app-development/index.html': { card: 'mobile', proof: { src: '/work/flashnow-card.jpg', alt: 'FlashNow, a quick-commerce app built by Creuto, shown on a phone', w: 1024, h: 660, href: '/work/flashnow', title: 'FlashNow', sub: 'Quick-commerce mobile app' } },
  'services/web-application-development/index.html': { card: 'web', proof: { src: '/work/sky1-card.jpg', alt: 'A laptop showing a booking platform built by Creuto', w: 1024, h: 682, href: '/work/sky1-event-booking', title: 'Sky1', sub: 'Event and vendor booking platform' } },
  'services/custom-software-development/index.html': { card: 'software', proof: { src: '/work/erp-manufacturing-card.jpg', alt: 'Operations dashboard from a custom ERP that Creuto built for a manufacturer', w: 1024, h: 716, href: '/work/custom-erp-manufacturing', title: 'Manufacturing ERP', sub: 'Custom ERP for a manufacturer' } },
  'services/product-strategy-prd/index.html': { card: 'strategy', proof: { src: '/assets/img/modern-workshop.jpg', alt: 'A wall of paper app screens and user journeys during a product planning session', w: 1000, h: 667, label: 'From a real session', title: 'Product planning', sub: 'App screens and user journeys mapped on a wall' } },
  'mobile-app-development-bhubaneswar/index.html': { card: 'mobile', proof: { src: '/work/mml-card.jpg', alt: 'Make My Look, a salon booking app built by Creuto', w: 1024, h: 768, href: '/work/make-my-look', title: 'Make My Look', sub: 'Salon booking mobile app' } },
  'services/index.html': { bar: 'hub' },
};

let changed = 0;
for (const [rel, cfg] of Object.entries(PAGES)) {
  const file = path.join(ROOT, rel);
  let html = fs.readFileSync(file, 'utf8').replace(/<!-- (\/?)ai:card -->/g, '<!-- $1demo:card -->');
  const type = cfg.card ? 'card' : 'bar';
  const pattern = new RegExp(`<!-- demo:${type} -->[\\s\\S]*?<!-- /demo:${type} -->`);
  if (!pattern.test(html)) { console.error(`marker demo:${type} missing in ${rel}`); process.exitCode = 1; continue; }
  const body = cfg.card ? card(cfg.card, { proof: cfg.proof }) : bar(cfg.bar);
  const next = html.replace(pattern, () => `<!-- demo:${type} -->\n          ${body}\n          <!-- /demo:${type} -->`);
  if (next !== fs.readFileSync(file, 'utf8')) { fs.writeFileSync(file, next); changed++; }
}
console.log(`hero demos: ${Object.keys(PAGES).length} pages checked, ${changed} updated`);
