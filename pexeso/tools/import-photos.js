#!/usr/bin/env node
/**
 * import-photos.js — convert raw 4:3 JPEGs and wire them into places.csv
 *
 * USAGE
 *   node pexeso/tools/import-photos.js
 *
 * WORKFLOW
 *   1. Drop any number of JPEGs into  pexeso/assets/raw photos/
 *      Name each file after the place id in places.csv, e.g. zs-labska.jpg
 *   2. Run this script from the repo root.
 *   3. Each JPEG is:
 *        - resized / centre-cropped to 1200 × 900 px (4:3)
 *        - saved as WebP at quality 82 (~80–120 KB) in the correct category folder
 *        - photo column in places.csv updated automatically
 *        - original JPEG deleted from raw photos/
 *   4. Commit and push — the game picks up the photos immediately.
 *
 * ADDING A NEW ROUND FOLDER
 *   Create  pexeso/assets/<slug>/  and add its round_id → slug mapping below.
 */

const sharp  = require('sharp');
const csv    = require('csv-parse/sync');   // bundled with playwright deps
const fs     = require('fs');
const path   = require('path');

// ── Config ────────────────────────────────────────────────────────────────────

const ROOT      = path.resolve(__dirname, '../..');
const RAW_DIR   = path.join(ROOT, 'pexeso/assets/raw photos');
const ASSETS    = path.join(ROOT, 'pexeso/assets');
const CSV_PATH  = path.join(ROOT, 'pexeso/data/places.csv');

const WIDTH  = 1200;
const HEIGHT =  900;
const QUALITY = 82;   // WebP quality → targets ~80–120 KB for a typical building shot

// round_id → subfolder inside pexeso/assets/
const ROUND_FOLDER = {
  1: 'priroda-parky',
  2: 'skoly',
  3: 'ulice-jmena',
  4: 'obcanska-vybavenost',
  5: 'zamestnavatele',
  6: 'ulice-jmena',
  7: 'umeni-architektura',
  8: 'doprava',
  9: 'sport-volny-cas',
};

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // Read CSV
  const raw = fs.readFileSync(CSV_PATH, 'utf8');
  const rows = csv.parse(raw, { columns: true, skip_empty_lines: true, relax_quotes: true });

  // Build id → row index and id → round_id maps
  const idToIdx    = {};
  const idToRound  = {};
  rows.forEach((r, i) => { idToIdx[r.id] = i; idToRound[r.id] = Number(r.round_id); });

  // Find all JPEGs in raw photos/
  const jpegs = fs.readdirSync(RAW_DIR).filter(f => /\.(jpe?g)$/i.test(f));
  if (!jpegs.length) { console.log('No JPEGs found in raw photos/ — nothing to do.'); return; }

  for (const file of jpegs) {
    const id = path.basename(file, path.extname(file));
    const srcPath = path.join(RAW_DIR, file);

    // Look up place in CSV
    if (!(id in idToIdx)) {
      console.warn(`⚠  ${file}: no matching id "${id}" in places.csv — skipped`);
      continue;
    }

    const roundId = idToRound[id];
    const folder  = ROUND_FOLDER[roundId];
    if (!folder) {
      console.warn(`⚠  ${file}: unknown round_id ${roundId} — add it to ROUND_FOLDER in this script`);
      continue;
    }

    // Ensure target folder exists
    const destDir = path.join(ASSETS, folder);
    fs.mkdirSync(destDir, { recursive: true });

    const destFile = path.join(destDir, `${id}.webp`);
    const photoRef = `assets/${folder}/${id}.webp`;

    // Convert: resize to 1200×900, centre-crop if needed, save as WebP
    await sharp(srcPath)
      .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
      .webp({ quality: QUALITY })
      .toFile(destFile);

    const kb = Math.round(fs.statSync(destFile).size / 1024);
    console.log(`✓  ${id}.webp  (${kb} KB)  →  assets/${folder}/`);

    // Update CSV row
    rows[idToIdx[id]].photo = photoRef;

    // Delete raw JPEG
    fs.unlinkSync(srcPath);
  }

  // Re-write CSV
  const header = Object.keys(rows[0]);
  const lines  = [
    header.map(quote).join(','),
    ...rows.map(r => header.map(h => quote(r[h] ?? '')).join(','))
  ];
  fs.writeFileSync(CSV_PATH, lines.join('\r\n') + '\r\n', 'utf8');
  console.log('\nplaces.csv updated. Commit and push to publish.');
}

function quote(v) {
  v = String(v);
  return (v.includes(',') || v.includes('"') || v.includes('\n'))
    ? `"${v.replace(/"/g, '""')}"` : v;
}

main().catch(err => { console.error(err); process.exit(1); });
