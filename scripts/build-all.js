#!/usr/bin/env node
/**
 * One command to rebuild everything generated, in the right order:
 *   location pages -> hero demos -> shared header/footer -> social preview tags -> analytics tag
 * Run it after editing partials/, scripts/locations/* or the hero demo markup. Then, before a release,
 * run `node scripts/build-sitemap.js` and `node scripts/seo-audit.js`.
 */
const { execFileSync } = require('child_process');
const path = require('path');

for (const step of ['build-locations.js', 'build-hero-demos.js', 'build-chrome.js', 'build-share-meta.js', 'build-analytics.js']) {
  console.log(`> ${step}`);
  execFileSync(process.execPath, [path.join(__dirname, step)], { stdio: 'inherit' });
}
