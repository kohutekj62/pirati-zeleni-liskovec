# Pexeso Starý Lískovec — Maintenance Guide

A browser memory-card game built for the Starý Lískovec ON campaign.
The entire game lives in **one file**: `pexeso/index.html` — no build step, no npm, no dependencies.

---

## File structure

```
pexeso/
├── index.html      ← the whole game: HTML structure, CSS styles, JS logic
├── assets/         ← place photos go here (see "Adding photos" below)
└── README.md       ← you are here
```

The main-site assets (logo, fonts) are one level up and referenced with `../assets/` and `../css/`.

---

## How the game works (quick overview)

- There are **3 rounds** (categories), each with a **pool of 8 places**.
- When a player starts a round, a random subset of places is drawn from the pool — the size depends on the chosen **difficulty** (Easy: 4, Normal: 6, Hard: 8).
- Each place gets **2 cards** in the grid. The player flips cards to find matching pairs.
- On a successful match, an **info card** slides up showing the place's photo, name, location, description and history.
- "Play again" always deals a fresh random set from the pool, so the game is different each time.

---

## How to add a place to an existing round

1. Open `pexeso/index.html` and find the `const ROUNDS = [` block near the top of the `<script>`.
2. Find the round you want to extend — each round starts with `{ id: 1, ...`, `{ id: 2, ...`, etc.
3. Add a new entry inside that round's `places: [` array (before the closing `]`).

**Copy this template and fill it in:**

```js
{
  id: "unique-kebab-slug",    // internal identifier — lowercase letters, numbers, hyphens only
                              // must be unique across ALL rounds
  photo: null,                // or "assets/my-photo.jpg" once you have a photo (see below)
  emoji: "🏡",                // fallback icon shown when photo is null
  cs: {
    name:     "Název místa",
    location: "Ulice nebo oblast, Brno-Starý Lískovec",
    desc:     "Krátký popis — co to je a proč je to zajímavé (2–3 věty).",
    history:  "Historické pozadí (1–2 věty).",
  },
  en: {
    name:     "Place name in English",
    location: "Street or area, Brno-Starý Lískovec",
    desc:     "Short description in English (2–3 sentences).",
    history:  "Historical note in English (1–2 sentences).",
  },
},
```

**Things to remember:**
- The `id` must be **unique across all rounds**. Use lowercase letters, numbers and hyphens — no spaces, no Czech diacritics (e.g. `"park-pod-sidlistem"`, not `"Park Pod sídlištěm"`).
- Both `cs` and `en` blocks are **required**. The game switches language live; if either block is missing it will crash.
- You can add as many places as you like to a pool. The game picks randomly from however many exist, so more places = more variety.

---

## How to add a new round (category)

1. Find the `ROUNDS` array in `index.html`.
2. Add a new object after the last `},` inside the array:

```js
{
  id: 4,          // next number after the last round's id
  emoji: "⚽",    // emoji shown on the round selector card
  cs: { title: "Nová kategorie" },
  en: { title: "New category" },
  places: [
    // add at least as many places as the hard difficulty setting (currently 8)
    // — fewer will work, but hard mode won't feel any different from normal
  ]
},
```

The new round will automatically appear in:
- the round selector screen
- the in-game category pills
- the SEO text section at the bottom of the page

No other code changes are needed.

---

## How to add real photos

1. Take or find a photo of the place. Recommended: **600 × 450 px, JPEG**, under 200 KB.
2. Name the file after the place's `id`, e.g. `park-pod-sidlistem.jpg`.
3. Copy the file into the `pexeso/assets/` folder.
4. In `ROUNDS`, find the place entry and change `photo: null` to:
   ```js
   photo: "assets/park-pod-sidlistem.jpg",
   ```

The photo appears in two places:
- On the **front of the card** — top 78%, object-fit cover (cropped to fill).
- In the **info overlay** — full width, 180 px tall, also cropped.

Leaving `photo: null` is fine — the emoji is shown instead and the game works perfectly.

---

## Difficulty settings

The difficulty controls how many card pairs are dealt per round. Find this block:

```js
const DIFFICULTY_LEVELS = [
  { id: "easy",   pairs: 4 },
  { id: "normal", pairs: 6 },
  { id: "hard",   pairs: 8 },
];
```

To change the number of cards per level, edit the `pairs` value.

To change the **default difficulty** when the page loads, find:

```js
let difficulty = "normal";
```

…and change `"normal"` to `"easy"` or `"hard"`.

**Important:** if a level's `pairs` is higher than a round's pool size, the game automatically caps it at the pool size (`Math.min` in `getPairsCount`). It won't crash, but that level won't feel any harder than the one below — so keep `hard.pairs ≤ smallest pool size` (currently 8).

---

## Updating text and translations

All user-visible text lives in the `UI` object near the top of the `<script>`:

```js
const UI = {
  cs: { back_link: "← Zpět na web", ... },
  en: { back_link: "← Back to site", ... },
};
```

To change a label, find the key and update its value in **both `cs` and `en`**.

The helper `t("key")` returns the string for the current language, falling back to Czech if a key is missing.

**To add a new language:**
1. Copy the entire `cs: { ... }` block.
2. Change the key to your language code (e.g. `"de"`).
3. Translate all the values.
4. Update the `lang-btn` click handler to cycle through the new language.
5. Update `applyI18n()` to set `document.documentElement.lang` correctly.

---

## The SEO content section

At the bottom of the select screen there is a `<section class="seo-content">` that players never interact with — it exists so Google can index every place name and description, helping the page appear in searches like "Starý Lískovec park" or "Kosmonautů ulice Brno".

**This section is built automatically from `ROUNDS` data** by the `renderSeoList()` function. Every place you add will appear there automatically — you don't need to edit anything separately.

---

## Deploying to the live site

The pexeso lives on the `feature/pexeso` branch, separate from `master`.

When ready to go public:
1. Make sure all changes are committed and pushed to `feature/pexeso`.
2. Merge `feature/pexeso` into `master` (or open a pull request).
3. GitHub Pages rebuilds automatically — the game will be live at  
   `https://www.staryliskovec-on.cz/pexeso/` within 1–2 minutes.

To link to the game from the main campaign site, add the URL to the relevant section in `js/content.js`.
