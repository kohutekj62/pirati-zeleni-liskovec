#!/usr/bin/env node
/**
 * fetch-fb-posts.js — pull the latest Facebook page posts into the website
 *
 * WHY
 *   The site is static and has a strict Content-Security-Policy (see the
 *   meta tag in index.html): no third-party scripts, no third-party frames,
 *   no images from other servers. So Facebook's own "Page Plugin" widget
 *   cannot be embedded — and we would not want it anyway, because it sets
 *   Meta's cookies on every visitor, which would force a cookie banner.
 *
 *   Instead we fetch the posts HERE, on your computer, before publishing:
 *   the texts land in js/fb-posts.js and the photos in assets/fb/. The
 *   published site then serves them like any other local content — no
 *   cookies, no external requests, no CSP changes, and it keeps our own
 *   design.
 *
 * WHAT YOU NEED (once)
 *   A Facebook Page access token with the pages_read_engagement permission.
 *   Step-by-step instructions are in README.md, section "Facebook strip".
 *   Put the token in a file called .fb-token in this folder (it is
 *   git-ignored, so it never leaves your computer) or in the FB_PAGE_TOKEN
 *   environment variable.
 *
 * USAGE
 *   npm run fb            — refresh the strip, then commit and publish
 *
 * Safe to re-run: photos already downloaded are kept, photos of posts that
 * dropped off the strip are deleted.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

/* How many posts the strip shows. Older ones are dropped. */
const HOW_MANY = 6;

/* Where the downloaded photos go (relative to the site root). */
const IMG_DIR = 'assets/fb';

/* Which Graph API version to call. Meta retires versions after ~2 years; if
   the script reports an unsupported version, bump this or set FB_API_VERSION. */
const API_VERSION = process.env.FB_API_VERSION || 'v23.0';

const GRAPH = 'https://graph.facebook.com/' + API_VERSION;

/* ── the token ─────────────────────────────────────────────────────────── */
function readToken() {
  if (process.env.FB_PAGE_TOKEN) return process.env.FB_PAGE_TOKEN.trim();
  const file = path.join(ROOT, '.fb-token');
  if (fs.existsSync(file)) {
    const t = fs.readFileSync(file, 'utf8').trim();
    if (t) return t;
  }
  return null;
}

/* ── talking to Facebook ───────────────────────────────────────────────── */
async function graph(pathAndQuery, token) {
  const sep = pathAndQuery.includes('?') ? '&' : '?';
  const url = GRAPH + pathAndQuery + sep + 'access_token=' + encodeURIComponent(token);
  const res = await fetch(url);
  const body = await res.json().catch(function () { return null; });

  if (!res.ok || (body && body.error)) {
    const err = (body && body.error) || {};
    console.error('\nFacebook refused the request:');
    console.error('  ' + (err.message || ('HTTP ' + res.status)));
    if (err.type)  console.error('  type: ' + err.type + (err.code ? ' (code ' + err.code + ')' : ''));
    console.error('\nUsual causes:');
    console.error('  • the token expired or was revoked — make a new one (README, "Facebook strip")');
    console.error('  • the token is a USER token, not a PAGE token');
    console.error('  • the app is missing the pages_read_engagement permission');
    console.error('  • Graph API ' + API_VERSION + ' is retired — try FB_API_VERSION=v24.0 npm run fb');
    process.exit(1);
  }
  return body;
}

/* ── photos ────────────────────────────────────────────────────────────── */
async function downloadPhoto(url, destAbs) {
  const res = await fetch(url);
  if (!res.ok) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(destAbs, buf);
  return true;
}

/* A safe, stable file name: date first so the folder sorts chronologically. */
function photoName(post) {
  const date = post.created_time.slice(0, 10);
  const tail = String(post.id).split('_').pop().replace(/[^A-Za-z0-9]/g, '');
  return date + '-' + tail + '.jpg';
}

/* ── the generated data file ───────────────────────────────────────────── */
function writeDataFile(pageUrl, posts) {
  const lines = [];
  lines.push('/* ==========================================================================');
  lines.push('   fb-posts.js  —  the latest Facebook posts, copied onto the website');
  lines.push('   ==========================================================================');
  lines.push('   GENERATED FILE — do not edit by hand, your changes would be overwritten.');
  lines.push('   Refresh it with:  npm run fb   (see tools/fetch-fb-posts.js)');
  lines.push('');
  lines.push('   If the list below is empty the "Z Facebooku" strip simply does not');
  lines.push('   appear on the page — nothing breaks.');
  lines.push('   ========================================================================== */');
  lines.push('');
  lines.push('window.FB_POSTS = {');
  lines.push('  fetched: ' + JSON.stringify(new Date().toISOString().slice(0, 10)) + ',');
  lines.push('  page:    ' + JSON.stringify(pageUrl) + ',');
  lines.push('  posts: [');
  posts.forEach(function (p) {
    lines.push('    {');
    lines.push('      date:  ' + JSON.stringify(p.date) + ',');
    lines.push('      text:  ' + JSON.stringify(p.text) + ',');
    lines.push('      image: ' + JSON.stringify(p.image) + ',');
    lines.push('      url:   ' + JSON.stringify(p.url));
    lines.push('    },');
  });
  lines.push('  ]');
  lines.push('};');
  lines.push('');

  const out = lines.join('\r\n');
  fs.writeFileSync(path.join(ROOT, 'js', 'fb-posts.js'), out, 'utf8');
}

/* ── main ──────────────────────────────────────────────────────────────── */
(async function main() {
  const token = readToken();
  if (!token) {
    console.error('No Facebook token found.');
    console.error('Put it in a file called .fb-token in the project folder,');
    console.error('or run:  FB_PAGE_TOKEN=... npm run fb');
    console.error('\nHow to get one: README.md, section "Facebook strip".');
    process.exit(1);
  }

  /* Who does this token belong to? A page token answers with the page. */
  const me = await graph('/me?fields=id,name,link', token);
  console.log('Page: ' + me.name + ' (' + me.id + ')');

  const fields = 'id,message,created_time,permalink_url,full_picture';
  const feed = await graph('/' + me.id + '/posts?limit=25&fields=' + fields, token);

  const raw = (feed && feed.data) || [];
  const chosen = raw
    .filter(function (p) { return p.message && p.message.trim(); })
    .slice(0, HOW_MANY);

  if (!chosen.length) {
    console.log('No posts with text found — writing an empty strip.');
  }

  const imgDirAbs = path.join(ROOT, IMG_DIR);
  fs.mkdirSync(imgDirAbs, { recursive: true });

  const posts = [];
  const keep = [];

  for (const p of chosen) {
    const entry = {
      date: p.created_time.slice(0, 10),
      text: p.message.trim(),
      image: '',
      url: p.permalink_url || '',
    };

    if (p.full_picture) {
      const name = photoName(p);
      const abs = path.join(imgDirAbs, name);
      if (fs.existsSync(abs)) {
        entry.image = IMG_DIR + '/' + name;
        keep.push(name);
        console.log('  kept  ' + name);
      } else if (await downloadPhoto(p.full_picture, abs)) {
        entry.image = IMG_DIR + '/' + name;
        keep.push(name);
        console.log('  saved ' + name);
      } else {
        console.log('  photo could not be downloaded for the post from ' + entry.date);
      }
    }

    posts.push(entry);
  }

  /* Throw away photos belonging to posts that are no longer on the strip. */
  fs.readdirSync(imgDirAbs).forEach(function (name) {
    if (name.startsWith('.')) return;
    if (keep.indexOf(name) === -1) {
      fs.unlinkSync(path.join(imgDirAbs, name));
      console.log('  removed ' + name + ' (post no longer on the strip)');
    }
  });

  const pageUrl = me.link || 'https://www.facebook.com/' + me.id;
  writeDataFile(pageUrl, posts);

  console.log('\n' + posts.length + ' post(s) written to js/fb-posts.js');
  console.log('Now check the site locally (npm run serve), then commit and publish.');
})();
