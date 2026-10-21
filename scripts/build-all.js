#!/usr/bin/env node
/**
 * One command to rebuild everything generated, in the right order:
 *   location pages -> blog guides -> city links -> careers pages -> work index -> book page -> hero demos -> shared header/footer -> social preview tags -> analytics tag
 * Run it after editing partials/, scripts/locations/* or the hero demo markup. Then, before a release,
 * run `node scripts/build-sitemap.js` and `node scripts/seo-audit.js`.
 */
const { execFileSync } = require('child_process');
const path = require('path');

for (const step of ['build-locations.js', 'build-blog.js', 'build-city-links.js', 'build-careers.js', 'build-work-index.js', 'build-book-page.js', 'build-services-pages.js', 'build-industries.js', 'build-hero-demos.js', 'build-doodles.js', 'build-nav.js', 'build-chrome.js', 'build-share-meta.js', 'build-analytics.js', 'build-pwa.js', 'build-llms.js']) {
  console.log(`> ${step}`);
  execFileSync(process.execPath, [path.join(__dirname, step)], { stdio: 'inherit' });
}
