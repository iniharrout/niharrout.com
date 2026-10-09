#!/usr/bin/env node
/**
 * Regenerates /llms.txt, a short, plain-text index of the site for AI assistants, from the real pages
 * (titles and descriptions are read from each page, so it never drifts). Part of build-all.js.
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const S = 'https://www.niharrout.com';
const read = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');
const dec = (t) => t.replace(/&amp;/g, '&').replace(/&rsquo;/g, "'").replace(/&quot;/g, '"');
const page = (p) => (p === '/' ? 'index.html' : p.replace(/^\//, '') + '/index.html');
const title = (p) => dec((read(page(p)).match(/<title>([\s\S]*?)<\/title>/) || [])[1] || p).replace(/\s*\|.*$/, '').trim();
const desc = (p) => dec((read(page(p)).match(/<meta name="description" content="([^"]*)"/) || [])[1] || '');
const dirs = (d) => fs.readdirSync(path.join(ROOT, d)).filter((x) => fs.existsSync(path.join(ROOT, d, x, 'index.html'))).sort();
const line = (p, name, d) => `- [${name || title(p)}](${S}${p === '/' ? '/' : p}): ${d || desc(p)}`;

const out = [
  '# Nihar Ranjan Rout | Creuto', '',
  '> Nihar Ranjan Rout is the Founder and CEO of Creuto, a founder-led product and engineering company based in Bhubaneswar, India. He has 8+ years in product management and has led 50+ products: mobile apps, web apps, custom software and ERP, and AI products. Work is done by an in-house team, starts with a PRD and a clickable prototype, and uses fixed milestones. Clients own all code. Creuto is an OpenAI Select Partner and has a 5.0 rating from 16 verified Clutch reviews.', '',
  '## Start here',
  line('/', 'Homepage'), line('/about', 'About Nihar Ranjan Rout'),
  line('/about/facts', 'Company fact sheet'), line('/services', 'Services overview'), '',
  '## Services',
  ...['mobile-app-development', 'web-application-development', 'custom-software-development', 'ai-product-development', 'product-strategy-prd'].map((s) => line('/services/' + s)), '',
  '## Guides (written by Nihar Ranjan Rout)',
  ...dirs('blog').map((s) => line('/blog/' + s)), '',
  '## Case studies',
  ...dirs('work').map((s) => line('/work/' + s)), '',
  '## Costs and tools',
  line('/project-costs'),
  ...dirs('tools').map((s) => line('/tools/' + s)), '',
  '## Contact',
  '- Book a free 45-minute call: https://calendly.com/creuto/meet',
  '- Email: me@niharrout.com',
  '- Phone and WhatsApp: +91 76088 44995', '',
  '## Elsewhere',
  '- LinkedIn: https://www.linkedin.com/in/iniharrout',
  '- Clutch reviews: https://clutch.co/profile/creuto',
  '- Creuto: https://creuto.com',
  '- GitHub: https://github.com/iniharrout',
  '- YouTube: https://www.youtube.com/@niharroutofficial', '',
];
fs.writeFileSync(path.join(ROOT, 'llms.txt'), out.join('\n'));
console.log(`llms.txt: ${out.length} lines`);
