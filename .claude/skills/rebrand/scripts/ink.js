#!/usr/bin/env node
/**
 * ink.js — WCAG contrast helper for theming. Zero dependencies.
 *
 * Usage:
 *   node ink.js contrast <fg> <bg>            # ratio between two hex colours
 *   node ink.js ink <color> [--bg #ffffff] [--ratio 4.5]
 *                                             # darken (or lighten) a brand colour
 *                                             # the minimum amount needed to hit a
 *                                             # target contrast against bg, keeping
 *                                             # its hue/saturation -> an "ink" token
 *   node ink.js ink <color> --bg #fff --bg #f6f5f8 --bg #eef8f1 [--ratio 4.5]
 *                                             # repeat --bg to derive against the
 *                                             # WORST (lowest-contrast) surface
 *
 * Targets: 4.5 = AA body text, 3.0 = AA large text / UI components.
 */

const USAGE = require('fs').readFileSync(__filename, 'utf8')
  .split('\n').filter(l => l.startsWith(' *')).map(l => l.slice(3)).join('\n');

function parseHex(hex) {
  let h = String(hex).replace(/^#/, '');
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  if (!/^[0-9a-fA-F]{6}$/.test(h)) throw new Error(`not a hex colour: ${hex}`);
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
const toHex = (r, g, b) =>
  '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v)))
    .toString(16).padStart(2, '0')).join('');

const lin = c => (c /= 255, c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
function lum(hex) {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function cr(a, b) {
  const la = lum(a), lb = lum(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/* --- HLS <-> RGB, matching Python's colorsys so results match the old script --- */
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
  h = (h / 6 + 1) % 1;
  return [h, l, s];
}
function hlsToRgb(h, l, s) {
  if (s === 0) return [l * 255, l * 255, l * 255];
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hk = t => {
    t = (t + 1) % 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return [hk(h + 1 / 3) * 255, hk(h) * 255, hk(h - 1 / 3) * 255];
}

/**
 * Shift `hex` along lightness (keeping hue + saturation) the minimum amount
 * needed to reach `ratio` against `bg`. Returns null when even pure black /
 * pure white at this hue cannot reach the target.
 */
function ink(hex, bg = '#ffffff', ratio = 4.5) {
  const [r, g, b] = parseHex(hex);
  const [hh, l, s] = rgbToHls(r, g, b);
  const bgLight = lum(bg) > 0.5;
  const at = ll => { const [rr, gg, bb] = hlsToRgb(hh, ll, s); return toHex(rr, gg, bb); };

  if (cr(hex, bg) >= ratio) return hex;          // already passes, leave it alone
  if (cr(at(bgLight ? 0 : 1), bg) < ratio) return null;   // unreachable at this hue

  let lo = bgLight ? 0 : l, hi = bgLight ? l : 1, best = at(bgLight ? 0 : 1);
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2, cand = at(mid);
    if (cr(cand, bg) >= ratio) { best = cand; if (bgLight) lo = mid; else hi = mid; }
    else { if (bgLight) hi = mid; else lo = mid; }
  }
  return best;
}

function main() {
  const a = process.argv.slice(2);
  if (!a.length) { console.log(USAGE); process.exit(1); }

  if (a[0] === 'contrast' && a.length === 3) {
    console.log(cr(a[1], a[2]).toFixed(2));
    return;
  }

  if (a[0] === 'ink' && a.length >= 2) {
    const color = a[1];
    // Every --bg given; the ink must clear the target on ALL of them, so derive
    // against the one the colour contrasts WORST with.
    const bgs = a.reduce((acc, v, i) => (v === '--bg' && a[i + 1] ? [...acc, a[i + 1]] : acc), []);
    if (!bgs.length) bgs.push('#ffffff');
    const ratio = a.includes('--ratio') ? parseFloat(a[a.indexOf('--ratio') + 1]) : 4.5;

    const worst = bgs.slice(1).reduce((w, c) => (cr(color, c) < cr(color, w) ? c : w), bgs[0]);
    const out = ink(color, worst, ratio);

    if (out === null) {
      console.log(`${color} -> UNREACHABLE at ratio ${ratio} on ${worst} ` +
                  `(even full black/white at this hue falls short — pick a different hue, ` +
                  `or drop the target to 3.0 and use it for large text / borders only)`);
      process.exit(2);
    }
    console.log(`${color} -> ${out}   (worst surface ${worst}: ` +
                `${cr(color, worst).toFixed(2)} -> ${cr(out, worst).toFixed(2)}, target ${ratio})`);
    for (const bg of bgs) console.log(`    on ${bg}: ${cr(out, bg).toFixed(2)}`);
    return;
  }

  console.log(USAGE);
  process.exit(1);
}

if (require.main === module) main();
module.exports = { cr, ink, lum };
