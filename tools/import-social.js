#!/usr/bin/env node
/**
 * import-social.js — copy hand-picked Facebook / Instagram posts onto the website
 *
 * WHY
 *   We have no access to Meta's developer API, so posts cannot be pulled in
 *   automatically. And we would not embed Meta's own widgets anyway: they
 *   load from Facebook while someone browses our site, set Meta's cookies
 *   (= a cookie banner) and break the strict Content-Security-Policy in
 *   index.html. So the posts are copied over BY HAND, a few chosen ones at a
 *   time, and published like any other content on the site.
 *
 * HOW
 *   For each post you want on the web, put two files into the social/ folder,
 *   with the same name:
 *
 *     social/2026-09-23-prochazka.txt   ← link + text of the post
 *     social/2026-09-23-prochazka.jpg   ← its photo (optional; .jpg/.png/.webp)
 *
 *   The name starts with the date of the post. The .txt file looks like this:
 *
 *     https://www.facebook.com/pirati.staryliskovec/posts/…
 *
 *     Ve středu jsme opět vyrazili na procházku…
 *     (the rest of the post, line breaks are kept)
 *
 *   The first line is the link to the post; whether it is Facebook or
 *   Instagram is read from that link. Everything after it is the text.
 *
 *   Then run  npm run social . It turns the photos into small web-ready
 *   copies in assets/social/ and writes js/social-posts.js, which the page
 *   reads. To take a post off the web, delete its two files and run it again.
 *
 * USAGE
 *   npm run social        — rebuild the section, then commit and publish
 *
 * Safe to re-run any number of times.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.resolve(__dirname, '..');

/* Where you put the posts (the source) … */
const SRC_DIR = 'social';
/* … and where the web-ready photos end up (generated, do not edit). */
const IMG_DIR = 'assets/social';
const DATA_FILE = 'js/social-posts.js';

/* The cards are at most ~340 px wide; 800 px stays sharp on phones with
   high-density screens while keeping each photo well under 100 kB. */
const IMG_WIDTH = 800;
const IMG_QUALITY = 78;

const PHOTO_EXT = ['.jpg', '.jpeg', '.png', '.webp'];

/* Which network a post link belongs to. */
function networkOf(url) {
  var host;
  try { host = new URL(url).hostname.toLowerCase().replace(/^(www|m|web)\./, ''); }
  catch (e) { return null; }
  if (host === 'facebook.com' || host === 'fb.com' || host === 'fb.watch') return 'facebook';
  if (host === 'instagram.com' || host === 'instagr.am') return 'instagram';
  return null;
}

/* "2026-09-23-Procházka u rybníka" → "2026-09-23-prochazka-u-rybnika":
   web-safe file names, whatever the source file was called. */
function slug(name) {
  return name.normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

function isRealDate(iso) {
  var d = new Date(iso + 'T00:00:00Z');
  return !isNaN(d) && d.toISOString().slice(0, 10) === iso;
}

/* ── reading one post ──────────────────────────────────────────────────── */
function readPost(txtName, problems) {
  var base = txtName.slice(0, -4);
  var where = SRC_DIR + '/' + txtName;

  var date = base.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}/.test(base) || !isRealDate(date)) {
    problems.push(where + ': the name must start with the date of the post, e.g. 2026-09-23-prochazka.txt');
    return null;
  }

  var lines = fs.readFileSync(path.join(ROOT, SRC_DIR, txtName), 'utf8')
    .replace(/^﻿/, '').replace(/\r\n?/g, '\n').split('\n');
  while (lines.length && !lines[0].trim()) lines.shift();

  var url = (lines.shift() || '').trim();
  var network = networkOf(url);
  if (!network) {
    problems.push(where + ': the first line must be the link to the Facebook or Instagram post (got "' + url + '")');
    return null;
  }

  var text = lines.join('\n').trim().replace(/\n{3,}/g, '\n\n');

  var photos = fs.readdirSync(path.join(ROOT, SRC_DIR)).filter(function (f) {
    var ext = path.extname(f);
    return f.slice(0, -ext.length) === base && PHOTO_EXT.indexOf(ext.toLowerCase()) !== -1;
  });
  if (photos.length > 1) {
    problems.push(where + ': more than one photo with this name (' + photos.join(', ') + ') — keep just one');
    return null;
  }
  if (!text && !photos.length) {
    problems.push(where + ': no text and no photo — nothing to show');
    return null;
  }

  return { base: base, date: date, network: network, url: url, text: text, photo: photos[0] || null };
}

/* ── the photo ─────────────────────────────────────────────────────────── */
async function makeWebPhoto(post) {
  var srcAbs = path.join(ROOT, SRC_DIR, post.photo);
  var outName = slug(post.base) + '.webp';
  var outAbs = path.join(ROOT, IMG_DIR, outName);

  /* Only re-encode when the source photo is newer than the copy we made. */
  var fresh = fs.existsSync(outAbs) && fs.statSync(outAbs).mtimeMs >= fs.statSync(srcAbs).mtimeMs;
  if (!fresh) {
    await sharp(srcAbs)
      .rotate()                                         /* honour the phone's EXIF orientation */
      .resize({ width: IMG_WIDTH, withoutEnlargement: true })
      .webp({ quality: IMG_QUALITY })
      .toFile(outAbs);
  }
  var meta = await sharp(outAbs).metadata();
  console.log('  ' + (fresh ? 'kept ' : 'saved') + ' ' + IMG_DIR + '/' + outName);
  return { name: outName, width: meta.width, height: meta.height };
}

/* ── the generated data file ───────────────────────────────────────────── */
function writeDataFile(posts) {
  var lines = [];
  lines.push('/* ==========================================================================');
  lines.push('   social-posts.js  —  hand-picked Facebook / Instagram posts on the website');
  lines.push('   ==========================================================================');
  lines.push('   GENERATED FILE — do not edit by hand, your changes would be overwritten.');
  lines.push('   Edit the files in the social/ folder instead, then run:  npm run social');
  lines.push('   (see tools/import-social.js and README section 12)');
  lines.push('');
  lines.push('   If the list below is empty the "Ze sociálních sítí" section simply does');
  lines.push('   not appear on the page — nothing breaks.');
  lines.push('   ========================================================================== */');
  lines.push('');
  lines.push('window.SOCIAL_POSTS = [');
  posts.forEach(function (p) {
    lines.push('  {');
    lines.push('    date:    ' + JSON.stringify(p.date) + ',');
    lines.push('    network: ' + JSON.stringify(p.network) + ',');
    lines.push('    url:     ' + JSON.stringify(p.url) + ',');
    lines.push('    image:   ' + JSON.stringify(p.image) + ',');
    lines.push('    width:   ' + p.width + ', height: ' + p.height + ',');
    lines.push('    text:    ' + JSON.stringify(p.text));
    lines.push('  },');
  });
  lines.push('];');
  lines.push('');

  fs.writeFileSync(path.join(ROOT, DATA_FILE), lines.join('\r\n'), 'utf8');
}

/* ── main ──────────────────────────────────────────────────────────────── */
(async function main() {
  var srcAbs = path.join(ROOT, SRC_DIR);
  fs.mkdirSync(srcAbs, { recursive: true });
  fs.mkdirSync(path.join(ROOT, IMG_DIR), { recursive: true });

  var problems = [];
  var found = fs.readdirSync(srcAbs)
    .filter(function (f) { return path.extname(f).toLowerCase() === '.txt'; })
    .map(function (f) { return readPost(f, problems); })
    .filter(Boolean);

  /* A photo without its .txt is almost always a typo in one of the names. */
  fs.readdirSync(srcAbs).forEach(function (f) {
    var ext = path.extname(f);
    if (PHOTO_EXT.indexOf(ext.toLowerCase()) === -1) return;
    var base = f.slice(0, -ext.length);
    if (!found.some(function (p) { return p.base === base; }) && !fs.existsSync(path.join(srcAbs, base + '.txt'))) {
      problems.push(SRC_DIR + '/' + f + ': photo without a matching ' + base + '.txt — check the two names are the same');
    }
  });

  if (problems.length) {
    console.error('\nNothing was changed — please fix these first:\n');
    problems.forEach(function (p) { console.error('  • ' + p); });
    console.error('\nHow the files should look: README.md, section 12.');
    process.exit(1);
  }

  found.sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });

  var posts = [];
  var keep = [];
  for (var p of found) {
    var entry = { date: p.date, network: p.network, url: p.url, image: '', width: 0, height: 0, text: p.text };
    if (p.photo) {
      var img = await makeWebPhoto(p);
      entry.image = IMG_DIR + '/' + img.name;
      entry.width = img.width;
      entry.height = img.height;
      keep.push(img.name);
    }
    posts.push(entry);
  }

  /* Throw away web copies of photos whose post was removed. */
  fs.readdirSync(path.join(ROOT, IMG_DIR)).forEach(function (name) {
    if (name.startsWith('.') || keep.indexOf(name) !== -1) return;
    fs.unlinkSync(path.join(ROOT, IMG_DIR, name));
    console.log('  removed ' + IMG_DIR + '/' + name + ' (its post is gone from social/)');
  });

  writeDataFile(posts);

  console.log('\n' + posts.length + ' post(s) written to ' + DATA_FILE);
  if (posts.length > 8) {
    console.log('That is a lot for one strip — consider removing the oldest ones.');
  }
  console.log('Now check the site locally (npm run serve), then commit and publish.');
})();
