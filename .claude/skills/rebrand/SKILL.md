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

## 0. Intake

- Locate the new logo (the user uploads it, or it lands in `assets/`). Read it
  with the image tool so you actually *see* it — shapes, the wordmark, which
  colours dominate, whether it has transparency or a baked background.
- Determine the brand/wordmark **name**. Prefer what the user says; otherwise
  read it off the logo. Distinguish the *wordmark* (changes) from any literal
  **place / proper names** inside it that must stay (e.g. a city or district
  name). When unsure which strings are brand vs. place, ask once.
- Note the aspect ratio. A wide wordmark needs different sizing/markup than the
  old square mark; you may need to generate a square variant for
  `apple-touch-icon` / JSON-LD `logo` / a 404 hero (see Phase 4).

## 1. Extract the palette

```
python3 .claude/skills/rebrand/scripts/palette.py assets/<logo>.png --n 6
```

This prints the dominant saturated colours with a rough role guess. Sanity-check
against what you saw in the image. Pick the 2–4 true brand colours (ignore
anti-aliasing fringe colours). Keep the exact logo hexes — they are your
*fills* (buttons, dots, tags, glows).

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
python3 .claude/skills/rebrand/scripts/ink.py contrast '#8fba47' '#ffffff'   # check
python3 .claude/skills/rebrand/scripts/ink.py ink '#8fba47' --ratio 4.5      # derive ink
```

  Targets: **4.5** body text, **3.0** large text / UI borders. Map roles:
  pick the strongest-contrast brand colour as the primary text accent
  (links, nav, dates, labels), the ink variants for secondary accents,
  and reserve the bright fills for buttons/dots/tags with black text.

## 3. Propagate through CSS (drive everything from tokens)

- Rewrite the `:root` block as the single source of truth: bg, surfaces, text,
  muted, `--color-border`, the logo hexes, the `*-ink` variants, and semantic
  aliases like `--color-link` / `--color-link-hover`. Soften shadows for a
  light backdrop.
- Replace **hardcoded** hexes throughout with tokens (a global
  `sed 's/#oldborder/var(--color-border)/g'` is fine for repeated values).
  Grep for both hex *and* decimal `rgba(r, g, b, a)` forms — they hide in
  box-shadows, gradients and `drop-shadow` filters.
- Remap each text-accent rule per Phase 2. **Rule:** only swap usages that sit
  directly on the page/section background. **Leave** anything that has its own
  explicit dark sub-background (a dark pill, a hover-fill, the hero photo
  overlay, a "past" chip) — those are already fine and re-skinning them breaks
  them.
- For a section that intentionally keeps a dark backdrop (e.g. a hero over a
  photo), scope light text locally: `.hero { color: #f4f4f5 } .hero .btn--ghost
  { color:#fff; border-color: rgba(255,255,255,.55) }` — overriding tokens on an
  ancestor won't retro-fix already-resolved descendant colours.
- Each standalone page with its own embedded `<style>` (`pexeso/`, `404.html`,
  `pamphlet.html`) has its **own** `:root`; convert each in parallel. Give each
  the **same set of semantic tokens** as the main stylesheet (hover-darken
  variants, error/validation colours, anything beyond the base palette) — a
  page that's missing a token just hardcodes a hex inline instead, which is
  exactly how drift sneaks back in.
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
  and any per-page UI strings. **Leave place/proper names** untouched.
- **Logo files →** point every `<img>` / icon / `apple-touch-icon` at the new
  asset. Generate a **square** variant if the new logo is wide (white rounded
  padding via PIL) for icons / JSON-LD / 404. Drop now-redundant white "patch"
  backgrounds behind the logo once the page itself is light.
- **Motif cleanup →** if the *old* brand had a graphic gimmick baked into the
  UI (an icon repeated as flip-card fronts, a mascot, a toggle-switch echoing
  the old name, a themed favicon, placeholder emoji), hunt it down and replace
  it with the new logo or a neutral equivalent. Redesign the favicon to echo
  the new logo's shapes, not the old pun.
- The OG-image template is a build artifact (a screenshot source), not a live
  page — update it for consistency but flag that the actual `og-*.png` must be
  re-rendered manually.

## 5. Screenshot self-review (non-negotiable)

```
npx http-server . -p 4173 -c-1 &              # serve
python3 .claude/skills/rebrand/scripts/shoot.py http://localhost:4173/ /tmp/home.png --slices 7
```

Read the slices and judge, honestly, as a designer would: Is every text legible
(no light-on-light / dark-on-dark)? Are the brand colours used with intent, not
randomly? Do headings, accents and buttons feel coherent? Any orphaned dark
panel, invisible border, broken logo, or leftover old motif? Shoot the other
pages too (`/pexeso/`, `/404.html`, `/pexeso/pamphlet.html`). Iterate until it
looks professional — then say so plainly.

> Note: in a sandbox, external fonts/CDNs and absolute production URLs may not
> resolve locally (broken QR / logo via full `https://…` paths). That's a
> localhost artifact, not a regression — verify the relative-path assets.

## 6. Verify & commit

- `node --check` every touched JS file; validate the JSON-LD block parses.
- Final grep: zero references to the old name (except legitimate place names),
  old logo files, or the old motif remain.
- **Final colour audit — run across every `.html`/`.css` file, not just the
  ones you remember touching:**
  ```
  grep -rnoE '#[0-9a-fA-F]{3,6}' --include='*.html' --include='*.css' .
  ```
  For every hit, it should be one of: a token *definition* inside a `:root`,
  a literal `#000`/`#fff` paired with a *fill* background (legitimate —
  fills don't need ink variants), or a deliberately-scoped local override
  (e.g. the hero's dark-backdrop text). Anything else — a bare brand-ish hex
  sitting in a rule body — is a leftover that should be a `var(--...)`
  instead. This is what catches stale hover colours and per-page token gaps
  that the rest of the workflow doesn't surface.
- Commit tokens / text / assets as separate logical commits; push.
