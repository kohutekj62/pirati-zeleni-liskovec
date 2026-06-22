#!/usr/bin/env node
/**
 * stamp-assets.js — cache-busting for the static site
 *
 * WHY
 *   Browsers (and the GitHub Pages/Fastly CDN) cache css/js/images
 *   aggressively. Without a version marker, returning visitors keep seeing
 *   an old js/content.js — or an old logo.png after a rebrand — long after
 *   you publish a change, because the URL never changed.
 *
 * WHAT IT DOES
 *   Rewrites every local <script src> / <link href> / <img src> in the HTML
 *   pages to carry a ?v=<hash> query, where <hash> is a short hash of that
 *   file's current contents. The query changes only when the file actually
 *   changes, so unchanged files stay cached and changed files are re-fetched
 *   at once.
 *
 * USAGE
 *   node tools/stamp-assets.js          (run before you commit a css/js change)
 *
 * Idempotent: strips any existing ?v=… and re-stamps from current content.
 */

const fs   = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');

// HTML pages to process (relative to repo root)
const PAGES = ['index.html', 'pexeso/index.html', '404.html'];

// Matches  src="…"  or  href="…"  pointing at a local .js/.css/.png/.svg/.jpg
// (with optional ?v=…) — images get cache-busted too, since a rebrand changes
// the bytes behind logo/favicon URLs that otherwise never change name.
const ASSET_RE = /(src|href)=("|')([^"']+?\.(?:js|css|png|jpe?g|svg))(\?v=[^"']*)?\2/g;

function shortHash(absPath) {
  const buf = fs.readFileSync(absPath);
  return crypto.createHash('md5').update(buf).digest('hex').slice(0, 8);
}

let totalStamped = 0;

for (const page of PAGES) {
  const htmlPath = path.join(ROOT, page);
  const htmlDir  = path.dirname(htmlPath);
  let html = fs.readFileSync(htmlPath, 'utf8');
  let pageCount = 0;

  html = html.replace(ASSET_RE, (match, attr, q, ref) => {
    // Leave absolute / external URLs untouched
    if (/^https?:\/\//i.test(ref) || ref.startsWith('//')) return match;

    const assetPath = path.resolve(htmlDir, ref);
    if (!fs.existsSync(assetPath)) {
      console.warn(`  ⚠  ${page}: referenced file not found → ${ref} (left as-is)`);
      return match;
    }
    const v = shortHash(assetPath);
    pageCount++;
    return `${attr}=${q}${ref}?v=${v}${q}`;
  });

  fs.writeFileSync(htmlPath, html, 'utf8');
  console.log(`✓  ${page} — stamped ${pageCount} asset reference(s)`);
  totalStamped += pageCount;
}

console.log(`\nDone. ${totalStamped} reference(s) stamped. Commit the HTML changes.`);
