#!/usr/bin/env node
/**
 * palette.js — extract the dominant brand colours from a logo image.
 *
 * Usage:  node palette.js <logo.png> [--n 6]
 *
 * Prints the most prominent saturated colours (hex + share + a rough role
 * guess), ignoring transparent pixels and near-white / near-black background.
 * These are the candidate brand tokens you then map into the CSS :root.
 *
 * Needs `sharp`, which this repo already has as a devDependency. Run from the
 * repo root so node resolves it:  node .claude/skills/rebrand/scripts/palette.js …
 */
let sharp;
try { sharp = require('sharp'); }
catch { console.error('sharp is required — run from the repo root, or: npm i -D sharp'); process.exit(1); }

function rgbToHls(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  if (mx === mn) return [0, l, 0];
  const d = mx - mn;
  const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h;
  if (mx === r) h = ((g - b) / d) % 6;
  else if (mx === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return [(h / 6 + 1) % 1, l, s];
}

function roleOf(hue) {
  if (hue < 20 || hue >= 340) return 'red';
  if (hue < 45) return 'orange';
  if (hue < 70) return 'yellow';
  if (hue < 160) return 'green';
  if (hue < 200) return 'cyan';
  if (hue < 255) return 'blue';
  if (hue < 290) return 'violet';
  return 'magenta';
}

(async () => {
  const argv = process.argv.slice(2);
  if (!argv.length) {
    console.error('Usage: node palette.js <logo.png> [--n 6]');
    process.exit(1);
  }
  const file = argv[0];
  const n = argv.includes('--n') ? parseInt(argv[argv.indexOf('--n') + 1], 10) : 6;

  // Downscale for speed, then quantise to merge near-identical shades.
  const { data, info } = await sharp(file)
    .resize(400, 400, { fit: 'inside', withoutEnlargement: true })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const buckets = new Map();
  let greys = 0, transparent = 0, extremes = 0;

  for (let i = 0; i < data.length; i += info.channels) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 128) { transparent++; continue; }              // skip transparent
    const [, l, s] = rgbToHls(r, g, b);
    if (l > 0.93 || l < 0.07) { extremes++; continue; }    // skip near-white / near-black bg
    if (s < 0.15) { greys++; continue; }                   // skip greys
    const key = `${Math.round(r / 24) * 24},${Math.round(g / 24) * 24},${Math.round(b / 24) * 24}`;
    buckets.set(key, (buckets.get(key) || 0) + 1);
  }

  const total = [...buckets.values()].reduce((a, b) => a + b, 0) || 1;
  const top = [...buckets.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);

  console.log(`# palette for ${file}  (${info.width}x${info.height} sampled)`);
  for (const [key, cnt] of top) {
    const [r, g, b] = key.split(',').map(Number);
    const [h, l, s] = rgbToHls(r, g, b);
    const hue = h * 360;
    const hex = '#' + [r, g, b].map(v => Math.min(255, v).toString(16).padStart(2, '0')).join('');
    console.log(`${hex}  ${(cnt / total * 100).toFixed(1).padStart(5)}%  ${roleOf(hue).padEnd(8)}` +
                ` (H${hue.toFixed(0).padStart(3)} S${s.toFixed(2)} L${l.toFixed(2)})`);
  }
  // Skipped-pixel counts matter: a logo that is mostly "extremes" is a
  // black/white mark whose brand colour is the achromatic one, and the
  // saturated list above will over-report an incidental accent.
  console.log(`# skipped: ${transparent} transparent, ${extremes} near-white/black, ${greys} grey`);
})();
