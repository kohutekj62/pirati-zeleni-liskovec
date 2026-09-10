#!/usr/bin/env node
/**
 * Publish dev → prod:
 *   1. Abort if working tree is dirty
 *   2. Branch off current HEAD, write prod's CNAME, bump sitemap.xml's
 *      lastmod, re-stamp asset hashes
 *   3. Push that branch to the `prod` remote as `main`
 *   4. Delete the temp branch — master is untouched throughout
 *
 * Usage:  node tools/publish-prod.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function run(cmd, opts = {}) {
  const result = execSync(cmd, { cwd: ROOT, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts });
  return result ? result.trim() : '';
}

// ── 1. Guard: clean working tree ─────────────────────────────────────────────
const dirty = run('git status --porcelain')
  .split('\n').filter(l => l && !l.startsWith('??')).join('\n');
if (dirty) {
  console.error('Uncommitted changes detected. Commit or stash before publishing.');
  console.error(dirty);
  process.exit(1);
}

const base = run('git rev-parse --abbrev-ref HEAD');
const tempBranch = 'publish/prod-' + Date.now();

try {
  // ── 2. Temp branch ───────────────────────────────────────────────────────────
  run(`git checkout -b ${tempBranch}`);
  console.log(`Branched off ${base} → ${tempBranch}`);

  // ── 3. Swap pamphlet QR URL dev → prod ───────────────────────────────────────
  const pamphletPath = path.join(ROOT, 'pexeso', 'pamphlet.html');
  let pamphlet = fs.readFileSync(pamphletPath, 'utf8');
  const PROD_URL = 'https://www.pirati-zeleni-liskovec.cz/pexeso/';
  pamphlet = pamphlet.replace(/https:\/\/kohutekj62\.github\.io\/pirati-zeleni-liskovec-dev\/pexeso\//g, PROD_URL);
  fs.writeFileSync(pamphletPath, pamphlet, 'utf8');
  console.log('pamphlet QR URL → prod');

  // ── 5. Ensure prod custom domain CNAME file ──────────────────────────────────
  // Only prod serves on a custom domain — this file must never reach master/dev,
  // so it's written straight onto the temp branch, not tracked at the source.
  const cnamePath = path.join(ROOT, 'CNAME');
  fs.writeFileSync(cnamePath, 'www.pirati-zeleni-liskovec.cz\n', 'utf8');
  console.log('CNAME written for prod custom domain');

  // ── 6. Bump sitemap.xml lastmod so Google sees a change signal each publish ───
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const todayISO = new Date().toISOString().slice(0, 10);
  sitemap = sitemap.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${todayISO}</lastmod>`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
  console.log('sitemap.xml lastmod bumped to ' + todayISO);

  // ── 7. Re-stamp asset hashes (content.js hash changed) ───────────────────────
  run('node tools/stamp-assets.js');
  console.log('Asset hashes re-stamped');

  // ── 8. Commit ─────────────────────────────────────────────────────────────────
  run('git add js/content.js pexeso/pamphlet.html index.html pexeso/index.html 404.html js/render.js CNAME sitemap.xml transparentnost/index.html transparentnost/qr.html');
  run('git commit -m "publish: clear dev banner for production"');

  // ── 9. Push to prod ───────────────────────────────────────────────────────────
  run('git push prod HEAD:main --force', { stdio: 'inherit' });
  console.log('\nPublished to prod (kohutekj62/pirati-zeleni-liskovec)');

} finally {
  // ── 7. Return to original branch + clean up ───────────────────────────────────
  run(`git checkout ${base}`);
  try { run(`git branch -D ${tempBranch}`); } catch (_) {}
  console.log(`Back on ${base}`);
}
