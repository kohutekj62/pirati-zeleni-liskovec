#!/usr/bin/env node
/**
 * shoot.js — screenshot helper for visual rebrand review. Cross-platform.
 *
 * Usage:
 *   node shoot.js <url> <out.png> [--w 420] [--slices N] [--full] [--click SEL]...
 *
 * Captures a full-page screenshot and (optionally) writes N vertical slices
 * next to it (out.1.png, out.2.png …) so each fits in a single image-read.
 *
 * Uses Playwright's bundled Chromium — the same browser `npx playwright test`
 * drives — so it works on Windows/macOS/Linux with no separate Chrome install.
 * Run from the repo root so node resolves `playwright`.
 *
 * Start a static server first (matches playwright.config.js):
 *   npx http-server . -p 4173 -c-1
 *
 * --click drives an interaction before the shot; repeat it to chain several.
 * A static shot only captures the RESTING state, so anything behind a click
 * (a flipped memory card, an open hamburger menu, a validation error) needs
 * this or it never gets reviewed. Example:
 *   node shoot.js http://localhost:4173/pexeso/ out.png --click "#start" --click ".card"
 */
let chromium;
try { ({ chromium } = require('playwright')); }
catch { console.error('playwright is required — run from the repo root, or: npm i -D playwright'); process.exit(1); }

let sharp = null;
try { sharp = require('sharp'); } catch { /* slicing is optional */ }

(async () => {
  const a = process.argv.slice(2);
  if (a.length < 2) {
    console.error('Usage: node shoot.js <url> <out.png> [--w 420] [--slices N] [--full] [--click SEL]...');
    process.exit(1);
  }
  const [url, out] = a;
  const w = a.includes('--w') ? parseInt(a[a.indexOf('--w') + 1], 10) : 420;
  const slices = a.includes('--slices') ? parseInt(a[a.indexOf('--slices') + 1], 10) : 0;
  const clicks = a.reduce((acc, v, i) => (v === '--click' && a[i + 1] ? [...acc, a[i + 1]] : acc), []);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });

  const problems = [];
  page.on('console', m => { if (m.type() === 'error') problems.push('CONSOLE: ' + m.text()); });
  page.on('pageerror', e => problems.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', r => problems.push('404/FAILED: ' + r.url()));

  await page.goto(url, { waitUntil: 'networkidle' });

  for (const sel of clicks) {
    await page.click(sel);
    await page.waitForTimeout(600);   // let the flip / open animation settle
  }
  await page.waitForTimeout(400);

  await page.screenshot({ path: out, fullPage: true });
  const box = await page.evaluate(() => ({ h: document.documentElement.scrollHeight }));
  console.log(`wrote ${out} (${w}x${box.h}, full page)`);

  // A broken logo or a stale asset path shows up here long before it shows up
  // in a screenshot you have to eyeball — surface it loudly.
  if (problems.length) {
    console.log('\n!! page problems (check these before trusting the screenshot):');
    for (const p of [...new Set(problems)]) console.log('   ' + p);
  } else {
    console.log('no console errors or failed requests');
  }

  if (slices > 0) {
    if (!sharp) { console.error('slicing needs sharp: npm i -D sharp'); }
    else {
      const meta = await sharp(out).metadata();
      const step = Math.floor(meta.height / slices);
      for (let i = 0; i < slices; i++) {
        const top = i * step;
        const height = i === slices - 1 ? meta.height - top : step;
        const name = out.replace(/\.png$/i, '') + `.${i + 1}.png`;
        await sharp(out).extract({ left: 0, top, width: meta.width, height }).toFile(name);
        console.log(`  slice ${name}  y=${top}-${top + height}`);
      }
    }
  }

  await browser.close();
})();
