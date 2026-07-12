#!/usr/bin/env node
/**
 * Publish dev → prod:
 *   1. Abort if working tree is dirty
 *   2. Branch off current HEAD, clear the dev_banner, re-stamp asset hashes
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

  // ── 3. Clear dev_banner ──────────────────────────────────────────────────────
  const contentPath = path.join(ROOT, 'js', 'content.js');
  let src = fs.readFileSync(contentPath, 'utf8');
  src = src.replace(/dev_banner:\s*"[^"]*"/g, 'dev_banner: ""');
  src = src.replace(/show_other_candidates:\s*true/, 'show_other_candidates: false');
  fs.writeFileSync(contentPath, src, 'utf8');
  console.log('dev_banner cleared, other candidates hidden');

  // ── 4. Swap pamphlet QR URL dev → prod ───────────────────────────────────────
  const pamphletPath = path.join(ROOT, 'pexeso', 'pamphlet.html');
  let pamphlet = fs.readFileSync(pamphletPath, 'utf8');
  const PROD_URL = 'https://kohutekj62.github.io/pirati-zeleni-liskovec/pexeso/';
  pamphlet = pamphlet.replace(/https:\/\/kohutekj62\.github\.io\/pirati-zeleni-liskovec-dev\/pexeso\//g, PROD_URL);
  fs.writeFileSync(pamphletPath, pamphlet, 'utf8');
  console.log('pamphlet QR URL → prod');

  // ── 5. Re-stamp asset hashes (content.js hash changed) ───────────────────────
  run('node tools/stamp-assets.js');
  console.log('Asset hashes re-stamped');

  // ── 6. Commit ─────────────────────────────────────────────────────────────────
  run('git add js/content.js pexeso/pamphlet.html index.html pexeso/index.html 404.html js/render.js');
  run('git commit -m "publish: clear dev banner for production"');

  // ── 6. Push to prod ───────────────────────────────────────────────────────────
  run('git push prod HEAD:main --force-with-lease', { stdio: 'inherit' });
  console.log('\nPublished to prod (kohutekj62/pirati-zeleni-liskovec)');

} finally {
  // ── 7. Return to original branch + clean up ───────────────────────────────────
  run(`git checkout ${base}`);
  try { run(`git branch -D ${tempBranch}`); } catch (_) {}
  console.log(`Back on ${base}`);
}
