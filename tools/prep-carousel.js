#!/usr/bin/env node
/**
 * prep-carousel.js — make web-ready copies of photos for the O nás carousel
 *
 * WHY
 *   Photos straight from a phone or Google Drive weigh 1–5 MB each; the
 *   carousel shows a dozen of them right under the hero, so they have to be
 *   small. This turns each one into a WebP of at most 1000 px, typically
 *   80–150 kB, in assets/carousel/. Your originals are not touched.
 *
 * USAGE
 *   npm run carousel -- "C:\path\to\photo.jpg" "C:\path\to\other.png" …
 *
 *   The web copy is named after the original (lower-case, no accents or
 *   spaces), so rename the originals first if you want nicer names, e.g.
 *   zastavka-pred.jpg / zastavka-po.jpg for a before/after pair.
 *
 *   It then prints the lines to paste into js/content.js → carousel:
 *   (README section 4, "Change the O nás photo carousel").
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = 'assets/carousel';

/* The carousel is at most 900 px wide; 1000 px keeps photos and the text on
   the posters sharp on high-density screens. */
const MAX_SIDE = 1000;
const QUALITY = 75;

function slug(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

(async function main() {
  const files = process.argv.slice(2);
  if (!files.length) {
    console.error('Which photos? Example:');
    console.error('  npm run carousel -- "C:\\Users\\me\\Downloads\\zastavka-pred.jpg"');
    process.exit(1);
  }

  fs.mkdirSync(path.join(ROOT, OUT_DIR), { recursive: true });
  const made = [];

  for (const file of files) {
    if (!fs.existsSync(file)) { console.error('  not found: ' + file); process.exitCode = 1; continue; }
    const name = slug(path.basename(file, path.extname(file))) + '.webp';
    const out = path.join(ROOT, OUT_DIR, name);
    try {
      await sharp(file)
        .rotate()                                   /* honour the phone's EXIF orientation */
        .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 6, smartSubsample: true })
        .toFile(out);
    } catch (e) {
      console.error('  could not read ' + file + ' (' + e.message + ')');
      process.exitCode = 1;
      continue;
    }
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log('  saved ' + OUT_DIR + '/' + name + '  (' + kb + ' kB)');
    made.push(name);
  }

  if (!made.length) return;
  console.log('\nNow add them to js/content.js → carousel: — a single photo looks like');
  console.log('    { image: "carousel/' + made[0] + '", link: "",');
  console.log('      cs: "what the photo shows", en: "the same in English" },');
  console.log('and a before/after pair like');
  console.log('    { before: "carousel/…-pred.webp", after: "carousel/…-po.webp", link: "",');
  console.log('      cs: { before: "…", after: "…" }, en: { before: "…", after: "…" } },');
})();
