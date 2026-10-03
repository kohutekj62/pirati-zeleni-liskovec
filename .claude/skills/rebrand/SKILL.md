---
name: rebrand
description: >
  Re-skin the whole site from a single new logo. Given one logo image (and,
  optionally, the new brand/coalition name), extract its palette, derive
  WCAG-safe colour tokens, decide a professional light/dark scheme as a
  designer would, then propagate it across every page: CSS tokens, text
  wordmark, logos, flip-cards, favicon, OG image, 404 and pamphlet — and
  verify the result with headless-Chromium screenshots. Use when the user
  says "rebrand", "here's the new logo", "change the brand", or hands over a
  logo and expects the colours/name/assets updated everywhere.
---

# Rebrand from a single logo

The promise: the user drops in **one logo**, and you take it from there —
estimate the colours, parse the name, assess the whole colour scheme as an
experienced designer / marketer / UX specialist, and amend every colour, logo,
flip-card and text accordingly. Finish with a screenshot self-review and only
declare done when it looks genuinely professional.

Work through the phases in order. Commit logical groups separately (tokens,
text, assets) rather than one giant commit.

## Toolchain

The three helpers are **Node**, not Python — this machine has no Python, and
the repo already ships `playwright` + `sharp` as devDependencies. Always run
them **from the repo root** so `require` resolves:

```
node .claude/skills/rebrand/scripts/palette.js <logo>      # extract brand colours
node .claude/skills/rebrand/scripts/ink.js                 # WCAG contrast / ink tokens
node .claude/skills/rebrand/scripts/shoot.js <url> <out>   # screenshots + click-driven states
```

## 0. Intake

- Locate the new logo (the user uploads it, or it lands in `assets/`). Read it
  with the image tool so you actually *see* it — shapes, the wordmark, which
  colours dominate, whether it has transparency or a baked background.
- Determine the brand/wordmark **name**. Prefer what the user says; otherwise
  read it off the logo. Distinguish the *wordmark* (changes) from any literal
  **place / proper names** inside it that must stay (e.g. a city or district
  name). When unsure which strings are brand vs. place, ask once.
- Note the aspect ratio. A wide wordmark needs different sizing/markup than the
  old square mark; you will need several derived variants (see Phase 4).

## 1. Extract the palette

```
node .claude/skills/rebrand/scripts/palette.js assets/<logo>.png --n 6
```

This prints the dominant saturated colours with a rough role guess. Sanity-check
against what you saw in the image. Pick the 2–4 true brand colours (ignore
anti-aliasing fringe colours). Keep the exact logo hexes — they are your
*fills* (buttons, dots, tags, glows).

- **Read the `# skipped:` line at the bottom.** It counts the pixels dropped as
  transparent, near-white/near-black, or grey. A logo that is mostly
  "near-white/black" is a black-or-white mark whose real brand colour is the
  achromatic one — and the saturated list above will then over-report an
  incidental accent as if it were primary. That is exactly this site's case:
  the Piráti black (`#141414`) is a top-tier brand colour that *never* appears
  in the palette output. Do not let the script's ranking overrule the image.

## 2. Decide the scheme like a designer

Make a deliberate call, don't just invert what's there:

- **Background:** most campaign / civic sites read best as **white** with dark
  text. Pick white unless the logo or user clearly wants dark. The user's bar is
  "perfect from the marketing and UX perspective" — default to clean, airy,
  high-contrast.
- **Text:** near-black (`#1a1a1a`), secondary muted grey that still passes AA.
- **Surfaces:** white page + faintly brand-tinted light panels for cards /
  alternating sections + a hairline `--color-border` token.
- **Accents — the critical part:** bright logo colours usually **fail as text**
  on white. Check each, and derive a darkened "ink" variant for text use while
  keeping the bright original for fills:

```
node .claude/skills/rebrand/scripts/ink.js contrast '#78c048' '#ffffff'
node .claude/skills/rebrand/scripts/ink.js ink '#78c048' --bg '#ffffff' --bg '#f6f5f8' --bg '#eef8f1' --ratio 4.5
```

  Targets: **4.5** body text, **3.0** large text / UI borders. Map roles:
  pick the strongest-contrast brand colour as the primary text accent
  (links, nav, dates, labels), the ink variants for secondary accents,
  and reserve the bright fills for buttons/dots/tags with black text.
- **Derive each ink against its worst-case background, not just white.** An
  ink token gets reused on every tinted panel/surface in the palette (cards,
  footers, hover pills), and those are *slightly* darker than pure white —
  enough to drop a ratio that cleared 4.5:1 on white down to ~4.0 on a
  panel. **Pass every surface token as a repeated `--bg`** (as above); the
  script picks the worst one automatically and then prints the resulting ratio
  on each, so you can watch the whole set pass at once. An ink that only
  passes on white is exactly the kind of gap a static screenshot won't show
  but `tests/a11y.spec.js` will catch.
- If `ink.js` prints **UNREACHABLE**, no lightness of that hue reaches the
  target — the hue itself is the problem (yellows and oranges especially).
  Either drop that colour to a 3.0 large-text/border role, or keep it as a
  fill only.

## 3. Propagate through CSS (drive everything from tokens)

- Rewrite the `:root` block in `css/styles.css` as the single source of truth:
  bg, surfaces, text, muted, `--color-border`, `--color-on-dark`, the logo
  hexes, the `*-ink` variants, and semantic aliases like `--color-link` /
  `--color-link-hover`. Soften shadows for a light backdrop.
- **Update the `--color-*-rgb` triplet tokens in lockstep.** `:root` carries
  `--color-green-rgb: 120, 192, 72` alongside `--color-green: #78c048`, and
  every `rgba(var(--color-green-rgb), .3)` tint reads from it. Change a hex
  without changing its triplet and every faded/glowing variant silently keeps
  the *old* brand colour — invisible in a diff, obvious on the page. Grep
  `-rgb:` inside `:root` and convert each one.
- **Keep the per-party alias layer.** `:root` maps `--pirati` / `--zeleni`
  onto base brand colours, and the party tags, candidate photo accents and
  partner cards read *those*, not the base tokens. It exists so one partner's
  colour can move without dragging the other's. Re-point the aliases at the new
  palette rather than collapsing them into a single accent — and keep the
  design rule they encode: a **party-specific** colour belongs only on
  content that is exclusive to that party (a party badge on a candidate card).
  Anything representing the coalition as a whole — hero title, section
  underlines, shared accents — uses the joint brand colours. Note
  `.party-tag--pirati` deliberately pairs its dark fill with `#fff` text; that
  literal is correct (Phase 6 will flag it — it's the "fill" exemption).
- Replace **hardcoded** hexes throughout with tokens (a global
  `sed 's/#oldborder/var(--color-border)/g'` is fine for repeated values).
  Grep for both hex *and* decimal `rgba(r, g, b, a)` forms — they hide in
  box-shadows, gradients and `drop-shadow` filters.
- Remap each text-accent rule per Phase 2. **Rule:** only swap usages that sit
  directly on the page/section background. **Leave** anything that has its own
  explicit dark sub-background (a dark pill, a hover-fill, the hero photo
  overlay, a "past" chip) — those are already fine and re-skinning them breaks
  them.
- **The header and footer are permanently dark on every page** (`background:
  rgba(10, 10, 12, 0.92)` header, `0.96` footer) even though the theme is
  light — and `pexeso/index.html` repeats them in its own `<style>`. Deliberate,
  not leftover dark-theme drift — do not "fix" them to white. Their text uses
  `--color-on-dark`; keep that token and keep it near-white. The header also
  carries a brand-coloured bottom border that must move with the palette.
- For any *other* section that intentionally keeps a dark backdrop (e.g. a hero
  over a photo), scope light text locally: `.hero { color: #f4f4f5 } .hero
  .btn--ghost { color:#fff; border-color: rgba(255,255,255,.55) }` — overriding
  tokens on an ancestor won't retro-fix already-resolved descendant colours.
- **The same rule applies to small repeated components, not just hero-sized
  sections** — a photo-card caption sitting on its own
  `linear-gradient(transparent, rgba(0,0,0,.85))` scrim at the bottom of a
  thumbnail is just as "dark backdrop" as the hero, but it's easy to miss
  because it's inside a generic-looking card component, not a page-level
  section. If a rule pairs its own dark gradient/overlay background with a
  text colour, that text colour must be a fixed light value (`#fff`), never
  `var(--color-text)` — grep for `rgba(0,0,0,` / `rgba(10,10,10,` alongside a
  sibling `color:` declaration in the same rule and check each one.
- **Standalone pages carry their own `:root`; convert each in parallel.** The
  current set:

  | page | styling |
  |---|---|
  | `index.html` | uses `css/styles.css` — nothing local |
  | `transparentnost/index.html` | `css/styles.css` + a mostly-layout local `<style>` — **re-themes itself; the only colours in it are the deliberate `.todo` amber, see below** |
  | `pexeso/index.html` | **own `:root`** (~20 tokens, the largest) |
  | `pexeso/pamphlet.html` | **own `:root`** |
  | `404.html` | **own `:root`** |
  | `transparentnost/qr.html` | **own `:root`** (print/poster source — easy to forget) |
  | `assets/og-image.html` | own inline styles, deliberately **dark** — see Phase 4 |

  Give each the **same set of semantic tokens** as the main stylesheet
  (hover-darken variants, error/validation colours, anything beyond the base
  palette) — a page that's missing a token just hardcodes a hex inline
  instead, which is exactly how drift sneaks back in. Note the per-page token
  names are *abbreviated* (`--green-ink`, `--pirati-s`, `--tr`) and do **not**
  match the main stylesheet's `--color-*` names; map them by role, not by name.
- **Some colours are semantic, not brand — do not re-skin them.** The amber
  `.todo` chip in `transparentnost/index.html` (`#fff3cd` / `#6b4e00` /
  `#c9a227`) marks a legally-required field that is still unfilled; it is
  *meant* to clash so nobody ships the page with a placeholder in it.
  Likewise `--color-error` / `--color-error-border` are validation red. Phase 6's
  audit will flag all of these as bare hexes — that is a false positive, leave
  them alone. Only re-derive them if the new palette genuinely collides (e.g.
  the brand itself is amber, so the warning no longer reads as a warning).
- **`<meta name="theme-color">` tracks `--color-bg`, not the accent.** It is
  `#ffffff` on `index.html`, `pexeso/index.html` and
  `transparentnost/index.html` (and absent from `404.html`, `pamphlet.html`,
  `qr.html`). If you keep a white page it needs no change; if you go dark, all
  three must move or mobile browser chrome stays white. `apple-touch-icon`
  exists only on `index.html`.
- **Hover/active states are a common blind spot.** They're easy to skip
  because they don't show in a static screenshot. Grep separately for
  `:hover`, `:active`, `:focus` and check every colour inside is a token, not
  a literal. Watch for a *direction* bug too: a dark theme often brightens on
  hover (lit-up-against-black); a light theme should usually darken instead
  (the new bg is light, so a hover that lightens loses contrast) — don't just
  carry the old hover literal over, re-derive it as a `*-dark` token sibling
  of the `*-ink` ones from Phase 2.

## 4. Swap names, logos and motifs

- **Wordmark text →** new name across visible copy, `<title>`, meta
  description, OG/Twitter tags, JSON-LD (`name`, `logo`, drop a stale
  `alternateName`), `aria-label`s, `alt` text, footer copyright, share text,
  and any per-page UI strings. Most site copy lives in **`js/content.js`**
  (cs + en side by side) — change it there, not in the HTML. **Leave
  place/proper names** untouched.
- **`transparentnost/index.html` is a legal document**, not marketing copy —
  its text is deliberately kept out of `content.js` (EU regulation 2024/900).
  The coalition name in it is the legally-declared *advertiser identity*.
  Update the wordmark there only after confirming with the user, and never
  auto-swap the registered entity, address or funding fields.
- **Logo files → the site needs a four-variant set**, not one file. Produce all
  four (PIL is gone — use `sharp`) or the rebrand breaks pages:

  | variant | used by |
  |---|---|
  | `logo-<brand>.png` | wide wordmark: 404 hero, pamphlet, OG image |
  | `logo-<brand>-reversed.png` | **light-on-dark** — the dark header + footer on `index.html`, `pexeso/index.html`, `transparentnost/index.html`. Miss this and the logo disappears into the black header. |
  | `logo-<brand>-square.png` | `apple-touch-icon`, JSON-LD `logo` |
  | `logo-<brand>-icon.png` | small square mark: the pexeso flip-card fronts, and the people-photo `onerror` fallback in `js/render.js` |

  Point every `<img>` / icon / `apple-touch-icon` at the new assets. Drop
  now-redundant white "patch" backgrounds behind the logo once the page is
  light.
- **Motif cleanup →** if the *old* brand had a graphic gimmick baked into the
  UI, hunt it down and replace it. Concretely here: **every pexeso flip-card
  front is `logo-<brand>-icon.png`**, so the old mark is tiled across the whole
  game board; `assets/favicon.svg` is a hand-written SVG that redraws the
  logo's shapes (currently a pirate flag inside a green→gold gradient ring with
  a pink flower) and must be **redrawn**, not merely recoloured; and
  `assets/who-is-who.png` is orphaned — check before carrying it forward.
- **The OG image is a build artifact.** `assets/og-image.html` is the
  **template**; `assets/og-pic.png` is the **rendered output** it produces, and
  that PNG is what `index.html` and `pexeso/index.html` point `og:image` /
  `twitter:image` at. The template is **1200×1200 square** (square on purpose:
  WhatsApp squishes 1200×630 instead of cropping it), on a dark `#0a0a0a`
  ground, over the photo `../header-photo.jpg`, with the wordmark **hardcoded
  as literal HTML** (`PIR&Aacute;TI<br>A ZELEN&Iacute;`) — `content.js` does
  not reach it, so edit that headline by hand. Then **re-render the PNG
  yourself**; nothing does it automatically:
  ```
  node .claude/skills/rebrand/scripts/shoot.js http://localhost:4173/assets/og-image.html assets/og-pic.png --w 1200
  ```
  Keep it square. If you change the canvas size, update `og:image:width` /
  `og:image:height` in both `index.html` and `pexeso/index.html` too.
- **Leave the domain alone unless the user changes it.**
  `assets/qr-transparentnost.{svg,png}` encode the production URL, and
  `tools/publish-prod.js` hardcodes the domain and writes `CNAME`. A *name*
  change is not a *domain* change. If the domain does change, regenerate the QR
  pair and update `publish-prod.js`, `sitemap.xml`, `robots.txt`, every
  `<link rel="canonical">` and the JSON-LD.

## 5. Screenshot self-review (non-negotiable)

```
npx http-server . -p 4173 -c-1 --silent    # 4173 matches playwright.config.js
node .claude/skills/rebrand/scripts/shoot.js http://localhost:4173/ /tmp/home.png --slices 7
```

If the server exits with `EADDRINUSE`, one is already running — just use it.
`shoot.js` captures the **full page** (no manual height guess) and reports
console errors and failed requests, which catch a broken or renamed logo path
far faster than eyeballing does.

Read the slices and judge, honestly, as a designer would: Is every text legible
(no light-on-light / dark-on-dark)? Are the brand colours used with intent, not
randomly? Do headings, accents and buttons feel coherent? Any orphaned dark
panel, invisible border, broken logo, or leftover old motif? Shoot the other
pages too (`/pexeso/`, `/404.html`, `/pexeso/pamphlet.html`,
`/transparentnost/`, `/transparentnost/qr.html`). Iterate until it looks
professional — then say so plainly.

> Note: in a sandbox, external fonts/CDNs and absolute production URLs may not
> resolve locally (broken QR / logo via full `https://…` paths). That's a
> localhost artifact, not a regression — verify the relative-path assets.

- **A static screenshot only shows the resting state.** Anything that renders
  only after an interaction — a flipped memory-card face, an open hamburger
  menu, a hover/focus style, a validation error — is invisible to a plain
  shot. Use `--click` (repeatable, applied in order) to drive it:

```
node .claude/skills/rebrand/scripts/shoot.js http://localhost:4173/pexeso/ /tmp/pex.png --click ".round-card" --click ".card"
```

  That enters a round and flips a card, which is the only way to see the card
  *front* motif and the info-card colours.
- **Run the axe suite** — `npx playwright test` (it starts its own server on
  4173) — and treat any `color-contrast` violation as a real bug, not noise.
  It catches the "ink only checked against white" gap from Phase 2 and the
  "dark backdrop using the theme text token" gap from Phase 3.
- **But know its blind spot:** `tests/a11y.spec.js` scans **only the home
  page** (cs + en). `pexeso/`, `404.html`, `pamphlet.html` and
  `transparentnost/` are *not* covered — a green run says nothing about them.
  Review those by screenshot, or extend the spec.

## 6. Verify & commit

- `node --check` every touched JS file; validate the JSON-LD block parses.
- Final grep: zero references to the old name (except legitimate place names),
  old logo files, or the old motif remain.
- **Final colour audit — run across every `.html`/`.css` file, not just the
  ones you remember touching:**
  ```
  grep -rnoE '#[0-9a-fA-F]{3,6}' --include='*.html' --include='*.css' \
    --exclude-dir=node_modules --exclude-dir=Concept --exclude-dir=.lighthouseci .
  ```
  (The excludes matter: `Concept/` holds saved third-party pages and
  `.lighthouseci/` holds generated reports — both are full of foreign hexes,
  and neither is yours to change.) Every remaining hit should be one of: a
  token *definition* inside a `:root`, a literal `#000`/`#fff` paired with a
  *fill* background (legitimate — fills don't need ink variants), or a
  deliberately-scoped local override (e.g. the dark header/footer). Anything
  else — a bare brand-ish hex sitting in a rule body — is a leftover that
  should be a `var(--...)` instead.
- **Re-stamp the cache-busting hashes — a rebrand is exactly what they exist
  for.** Every logo/favicon/css byte you changed sits behind a URL whose name
  never changes, so returning visitors keep seeing the *old* logo until the
  `?v=` moves:
  ```
  node tools/stamp-assets.js
  ```
  `.githooks/pre-commit` runs this automatically, but **only if the clone has
  `git config core.hooksPath .githooks`** (local config, not stored in the
  repo — re-run it on a fresh clone). Two traps:
  - `stamp-assets.js` has a **hardcoded `PAGES` list** that currently omits
    `pexeso/pamphlet.html`, and a `JS_FILES` list holding only `js/render.js`.
    If you add a page, or reference a logo from another JS file, add it to
    those lists or it never gets stamped.
  - the pre-commit hook only re-stages `index.html` and `pexeso/index.html`,
    so refreshed stamps in `404.html` / `transparentnost/*.html` land in the
    working tree **unstaged**. After committing, check `git status` and commit
    those too.
- Commit tokens / text / assets as separate logical commits; push.
