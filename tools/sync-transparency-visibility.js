#!/usr/bin/env node
/**
 * sync-transparency-visibility.js
 *
 * The transparency notice (transparentnost/index.html) has a few
 * [DOPLNIT podle faktury …] placeholders that can only be filled in once the
 * poster invoices arrive from the vydavatel. Until every invoice placeholder
 * is resolved, the footer link to that notice is hidden on index.html —
 * no reason to send visitors to a legal notice that isn't finished yet.
 *
 * The same check drives the "still being finished" banner at the top of the
 * notice itself — the banner is the only one left on the site, so it appears
 * exactly while the placeholders are unresolved and vanishes once they aren't.
 *
 * USAGE
 *   node tools/sync-transparency-visibility.js   (run before you commit —
 *   wired into .githooks/pre-commit)
 *
 * Idempotent: safe to run on every commit.
 */

const fs = require('fs');
const path = require('path');

function hasUnresolvedInvoicePlaceholders(root) {
  const noticePath = path.join(root, 'transparentnost', 'index.html');
  const notice = fs.readFileSync(noticePath, 'utf8');
  const todoSpans = notice.match(/<span class="todo">[^<]*<\/span>/g) || [];
  return todoSpans.some((span) => /faktur/i.test(span));
}

const LINK_RE = /(<a href="transparentnost\/" data-i18n="footer_transparency"[^>]*?)(\s+hidden)?(>)/;

function syncFooterLink(root) {
  const indexPath = path.join(root, 'index.html');
  let index = fs.readFileSync(indexPath, 'utf8');

  if (!LINK_RE.test(index)) {
    console.warn('  ⚠  sync-transparency-visibility: footer link markup not found (left as-is)');
    return;
  }

  const unresolved = hasUnresolvedInvoicePlaceholders(root);
  index = index.replace(LINK_RE, (m, pre, hiddenAttr, gt) => {
    if (unresolved) return hiddenAttr ? m : `${pre} hidden${gt}`;
    return hiddenAttr ? `${pre}${gt}` : m;
  });
  fs.writeFileSync(indexPath, index, 'utf8');

  console.log(unresolved
    ? '✓  footer transparency-notice link hidden (invoice placeholder(s) unresolved)'
    : '✓  footer transparency-notice link visible (invoice placeholders resolved)');
}

const BANNER_RE = /(<div class="dev-banner" id="dev-banner" role="banner")(\s+hidden)?(>)/;

function syncNoticeBanner(root) {
  const noticePath = path.join(root, 'transparentnost', 'index.html');
  let notice = fs.readFileSync(noticePath, 'utf8');

  if (!BANNER_RE.test(notice)) {
    console.warn('  ⚠  sync-transparency-visibility: dev-banner markup not found (left as-is)');
    return;
  }

  const unresolved = hasUnresolvedInvoicePlaceholders(root);
  notice = notice.replace(BANNER_RE, (m, pre, hiddenAttr, gt) => {
    if (unresolved) return hiddenAttr ? `${pre}${gt}` : m;
    return hiddenAttr ? m : `${pre} hidden${gt}`;
  });
  fs.writeFileSync(noticePath, notice, 'utf8');

  console.log(unresolved
    ? '✓  dev banner shown on the transparency notice (invoice placeholder(s) unresolved)'
    : '✓  dev banner hidden on the transparency notice (invoice placeholders resolved)');
}

module.exports = { hasUnresolvedInvoicePlaceholders, syncFooterLink, syncNoticeBanner };

if (require.main === module) {
  const ROOT = path.resolve(__dirname, '..');
  syncFooterLink(ROOT);
  syncNoticeBanner(ROOT);
}
