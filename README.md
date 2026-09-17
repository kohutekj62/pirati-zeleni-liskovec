# Starý Lískovec ON (SLON) — coalition website

The campaign website for the **Piráti + Zelení** coalition in Brno–Starý Lískovec,
for the municipal elections in autumn 2026. Czech by default, switchable to English.

🌐 Live at **https://www.staryliskovec-on.cz**
📦 Code at **https://github.com/kohutekj62/SL-ON**

This README is written for someone with **no coding experience**. Take it slowly,
follow the steps, and you can run the whole site yourself.

---

## 1. The one thing to remember

> **All the words on the website live in one file: [`js/content.js`](js/content.js).**

To change any text, you open that file, edit the text between `"quotes"`, and save.
Czech and English sit right next to each other. You almost never need anything else.

There is **no build step** and **no software required just to run the site** — it's
plain HTML/CSS/JavaScript. You can literally double-click `index.html` to open it.

---

## 2. See the site on your own computer

**The easy way:** open the folder and **double-click `index.html`**. It opens in your
browser. That's it. (The language switch and everything else work this way.)

**The "proper" way** (behaves exactly like the real server — recommended before publishing):

```bash
npm install      # first time only, see section 6
npm run serve    # then open the address it prints, e.g. http://127.0.0.1:4173
```

Press `Ctrl + C` in the terminal to stop it.

---

## 3. What each file is for

| File / folder | What it holds | Do you edit it? |
|---|---|---|
| **`js/content.js`** | ⭐ **All the text** (Czech + English), candidates, program, events, news, links | **Yes — this is your main file** |
| `assets/` | Images: the logo, the elephant, candidate photos | Yes — drop new photos here |
| `css/styles.css` | Colours, fonts, spacing, the whole look | Only to change the design |
| `index.html` | The page structure (the skeleton) | Rarely |
| `js/i18n.js` | The Czech/English switching machinery | No |
| `js/render.js` | Builds the lists from `content.js` | No |
| `js/main.js` | Clicks: menu, language, the elephant flip, forms | No |
| `js/fb-posts.js` | The Facebook posts shown in the strip — **generated**, see section 12 | No — `npm run fb` writes it |
| `pexeso/data/places.csv` | ⭐ **All pexeso content** — every place, description, coordinate, photo and link in one spreadsheet | **Yes — open in Excel** |
| `pexeso/index.html` | The game engine (screens, card flip, scoring, CSV loader) | No |
| `tests/` | Automated tests | No (just run them) |
| `README.md`, `QA-CHECKLIST.md` | These guides | — |

Every file is **heavily commented**, so if you do open one, the comments explain
what each part does.

---

## 4. How to do the common edits

### ✏️ Change a piece of text
1. Open `js/content.js`.
2. Use your editor's **Find** (Ctrl+F) to search for a few words of the text you want to change.
3. Edit the text **inside the quotes only**. Leave commas, colons and brackets alone.
4. Save. Refresh the page.

> **Golden rules:** only change text inside `"..."`; never delete a comma `,`, colon `:`
> or bracket `{ } [ ]`. If your text needs a quote mark inside it, type `\"`.

### 🖼️ Change a candidate's photo
1. Put the new photo in `assets/people/` (use a simple name: lowercase, no spaces, e.g. `jana-nova.jpg`).
2. In `js/content.js`, find that person and change their `photo:` line to the new file name.

### ➕ Add or remove a candidate / program point / event / news post
In `js/content.js`, each item is one block inside `{ ... }`.
- **To add one:** copy a whole existing block (including its trailing comma `},`) and edit the copy.
- **To remove one:** delete its whole block (including the comma).

### 🎨 Change the colours or fonts
Open `css/styles.css`. Right at the top is a block called `:root` with friendly names
like `--color-yellow` and `--font-display`. Change a value there and it updates everywhere.

### 🔌 Fill in your real details (do this once)
Open `js/content.js`, find the **`config`** block at the top, and replace every `TODO…`:
- `email`, `phone` — shown in the *Spojme se* section.
- `facebook`, `instagram`, `twitter`, `youtube` — paste your page URLs (leave `""` to hide one).
- `formspreeId` — to make the contact form send you real e-mails (see below).
- `newsletterAction` — to switch on the newsletter box (see below).

#### Make the contact form send real e-mails (free)
1. Go to **https://formspree.io**, sign up, create a form, and connect your e-mail.
2. Formspree gives you a form address like `https://formspree.io/f/`**`xxxxxxxx`**.
3. Copy **only the `xxxxxxxx`** part into `formspreeId` in `js/content.js`.

Until you do this, the form still works — it opens the visitor's own e-mail app instead.

#### Switch on the newsletter box
Paste the *form action URL* from your e-mail tool (Mailchimp / Ecomail / MailerLite)
into `newsletterAction`. Leave it `""` and the newsletter box stays hidden.

---

## 5. The fun feature: the elephant 🐘

In the **Lidé** section each person first appears as our neon elephant. Click (or tap,
or press Enter) and it flips to reveal the real photo; click again and the elephant is back.
Each card flips on its own. This is handled in `js/main.js` (function `setupElephantFlip`)
and styled in `css/styles.css` (search for "flip-card").

---

## 6. Testing (your safety net)

The tests open a real browser, click around, and tell you in plain language if
anything broke. **You install the tools once:**

```bash
npm install                              # downloads the test tools (first time only)
npx playwright install chromium          # downloads the test browser (first time only)
```

Then any time you want to check the site:

```bash
npm test            # runs all the browser + accessibility tests
npm run report      # opens a nice visual report of the last run
npm run lh          # Lighthouse: performance / SEO / accessibility scores (needs Chrome)
```

What the tests check: the page and all sections load · the right number of
candidates/program points/events · the **CZ↔EN switch** works and is remembered ·
the **elephant flips** to the photo and back · the program cards expand · the contact
form validates · the mobile menu opens · and there are **no serious accessibility problems**.

You don't have to run these by hand every time — see the next section: GitHub runs
them for you automatically.

---

## 7. Publishing your changes

You have two ways. **Both automatically trigger the tests and re-publish the site.**

### Option A — edit on the GitHub website (easiest, nothing to install)
1. Go to https://github.com/kohutekj62/SL-ON
2. Click the file you want to change (e.g. `js/content.js`), then the ✏️ pencil icon.
3. Make your edit, scroll down, and press **Commit changes**.
4. Wait ~1–2 minutes. GitHub runs the tests (green ✓ / red ✗ shown next to your commit)
   and updates the live site.

### Option B — from your computer (after `git` is set up)
```bash
git add .
git commit -m "Update program text"
git push
```

> The site re-publishes itself a minute or two after every push. If a test fails
> (red ✗), click it on GitHub to read what to fix — your live site keeps the last
> working version until you fix it.

---

## 8. First-time deployment to GitHub Pages + the custom domain

You only do this **once**. After that, section 7 is all you need.

### Step 1 — Put the site on GitHub
If you edited locally, push everything (see Option B above). The repository already
contains the website files, a `CNAME` file (the domain) and a `.nojekyll` file.

### Step 2 — Turn on GitHub Pages
1. Open **https://github.com/kohutekj62/SL-ON** → **Settings** (top menu) → **Pages** (left menu).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to **`master`** and the folder to **`/ (root)`**, then **Save**.
4. After a minute the site is live at the temporary address **https://kohutekj62.github.io/SL-ON/**.
   (Open it to check everything works before pointing your domain at it.)

### Step 3 — Connect the domain `www.staryliskovec-on.cz`
1. **In GitHub:** Settings → Pages → **Custom domain**, type `www.staryliskovec-on.cz`, **Save**.
   (This is also already stored in the `CNAME` file in the repo.)
2. **At your domain registrar** (wherever you bought `staryliskovec-on.cz`), open the
   **DNS settings** and add these records:

   | Type | Name / Host | Value | Note |
   |---|---|---|---|
   | `CNAME` | `www` | `kohutekj62.github.io` | the main address |
   | `A` | `@` | `185.199.108.153` | apex → GitHub |
   | `A` | `@` | `185.199.109.153` | apex → GitHub |
   | `A` | `@` | `185.199.110.153` | apex → GitHub |
   | `A` | `@` | `185.199.111.153` | apex → GitHub |

   *(`@` means the bare domain `staryliskovec-on.cz`. The four `A` records make it
   redirect to the `www` version. Some registrars write `www` as `www.staryliskovec-on.cz.`
   — both are fine.)*

3. **Wait.** DNS changes can take from a few minutes up to 24 hours.
4. Back in GitHub Pages, once it says the domain is verified, tick **Enforce HTTPS**
   (this gives you the padlock 🔒 and a free certificate). If the option is greyed out,
   wait a bit longer for DNS, then refresh.

That's it — `https://www.staryliskovec-on.cz` now shows your site.

---

## 9. Troubleshooting

| Problem | Most likely fix |
|---|---|
| The page is blank or text shows as `undefined` | A comma `,` or quote `"` is missing in `js/content.js`. Run `npm test` — it points to it. Or undo your last edit. |
| Fonts look plain | The Google Fonts didn't load — check the internet connection / try again. |
| A photo doesn't appear | The `photo:` file name in `content.js` doesn't exactly match the file in `assets/people/` (watch capital letters and spaces). |
| The contact form opens an e-mail app instead of sending | That's the fallback. Set `formspreeId` in `content.js` (section 4) to send real e-mails. |
| Custom domain shows a 404 | DNS not finished yet, or the `CNAME` file got removed. Wait, and re-check Step 3. |
| GitHub shows a red ✗ on my commit | Click it → read which test failed → fix and commit again. The live site keeps the last good version meanwhile. |

---

## 10. Under the hood (for a developer who joins later)

- **No framework, no build.** Plain semantic HTML + CSS custom properties + vanilla JS,
  loaded as classic `<script>` tags (works over `file://` too).
- **Single source of content:** `js/content.js` (`window.CONTENT`). `i18n.js` handles
  language (`window.I18N`), `render.js` builds the DOM (`window.RENDER`), `main.js` wires
  interactions. Scripts must load in that order (see the bottom of `index.html`).
- **Accessibility:** semantic landmarks, skip link, keyboard-operable flip-cards
  (`<button aria-pressed>`), `prefers-reduced-motion` support, focus-visible styles.
  Enforced by `tests/a11y.spec.js` (axe, WCAG 2 A/AA, serious+critical = fail).
- **Tests:** Playwright (`tests/e2e.spec.js`) on Desktop Chrome + Pixel 5; Lighthouse via
  `lighthouserc.json`. CI in `.github/workflows/ci.yml` runs both on every push/PR.
- **Hosting:** GitHub Pages, branch `master`, root. `CNAME` + `.nojekyll` included.
  Asset paths are **relative** so it works both at the `github.io/SL-ON/` URL and the
  custom domain.

---

## 11. The pexeso minigame — how to maintain the content

> **All the places, descriptions, coordinates and links live in one file:
> [`pexeso/data/places.csv`](pexeso/data/places.csv)**
>
> You edit it in Excel (or LibreOffice Calc, or Google Sheets).
> The game downloads it automatically when someone opens the page — no code change needed.

### How to edit the spreadsheet

1. Open `pexeso/data/places.csv` in Excel. It will ask about encoding — choose **UTF-8**.
   (Or drag the file into Google Sheets and it opens perfectly.)
2. Edit any cell you need. The column names are in the first row — don't rename them.
3. Save the file as **CSV UTF-8** (in Excel: *File → Save As → CSV UTF-8 (comma delimited)*).
4. Commit and push (or paste into GitHub's web editor). The live game updates in ~1 minute.

> **Do not** change the first row (the column names). The game reads them by name, not by position.
> You CAN reorder rows, add rows at the bottom, or sort — it doesn't matter.

### What each column does

| Column | What to put | Example |
|---|---|---|
| `round_id` | Which round this place belongs to (1–9) | `3` |
| `round_emoji` | The emoji for that round | `🏘️` |
| `round_cs` | Czech round title | `Ulice a historie` |
| `round_en` | English round title | `Streets & history` |
| `id` | A unique short name — letters, digits, hyphens only, no spaces or Czech letters | `kostel-sv-jana` |
| `emoji` | The emoji shown when no photo is loaded yet | `⛪` |
| `photo` | Path to the photo file, relative to the `pexeso/` folder — leave empty if no photo yet | `assets/culture/kostel.jpg` |
| `web` | The full URL of the place's website — leave empty if there is none | `https://www.fnbrno.cz` |
| `lat` | Latitude — decimal degrees, e.g. `49.1730` | `49.1755` |
| `lng` | Longitude — decimal degrees, e.g. `16.5900` | `16.5900` |
| `azimuth` | Compass direction the Street View camera faces (0 = north, 90 = east, 180 = south, 270 = west) — leave empty if you haven't checked | `135` |
| `name_cs` | Czech display name | `Kostel sv. Jana Nepomuckého` |
| `location_cs` | Czech location line (shown in small text) | `Starý Lískovec, Brno` |
| `desc_cs` | Czech description (1–3 sentences) | `Farní kostel jako ...` |
| `history_cs` | Czech historical note (1–2 sentences, shown in italic) | `Pochází z 18. století ...` |
| `name_en` | English name | `St John of Nepomuk Church` |
| `location_en` | English location | `Starý Lískovec, Brno` |
| `desc_en` | English description | `The parish church ...` |
| `history_en` | English historical note | `The church dates from ...` |

### How to add a photo for a place

1. Take (or find) a photo of the place.
2. Save it as a `.jpg` or `.webp` — keep the file name short and simple, e.g. `kostel.jpg`.
3. Put it in the `pexeso/assets/` folder inside a subfolder that matches the round, e.g. `pexeso/assets/culture/kostel.jpg`.
4. In the CSV, set the `photo` column for that place to `assets/culture/kostel.jpg`.
5. Commit and push.

> Ideal photo size: **800 × 600 px** or similar landscape format. The card shows it at 180 px tall, so anything larger is fine — the game scales it down automatically.

### How to add a new place to an existing round

1. Open the CSV in Excel.
2. Add a new row at the bottom (or anywhere — order doesn't matter within a round).
3. Fill in all columns. Use the same `round_id` as the other places in that round.
4. Make sure the `id` column is unique across the whole file — no two rows can share the same ID.
5. Save and push.

### How to add a completely new round

1. Pick a new `round_id` number (e.g. `10`).
2. Add one row per place, all with `round_id = 10`, and fill in `round_emoji`, `round_cs`, `round_en`.
3. The game shows the first **6 rounds** on the main selection screen. To make a new round visible there, you can either keep the total at ≤ 6, or edit `renderRoundsGrid()` in `pexeso/index.html` to raise the limit (`ROUNDS.slice(0, 6)` → `ROUNDS.slice(0, 9)`).

### Finding the right Street View coordinates and azimuth

1. Go to **Google Maps** and find the place.
2. Drag the yellow Street View person (bottom-right corner) onto the street in front of the place.
3. When Street View opens, look at the URL — it contains something like `@49.1755,16.5900,3a,75y,**135**h`. The number before `h` is the azimuth (heading).
4. Copy the latitude and longitude into `lat` / `lng`, and the heading into `azimuth`.

## 12. The Facebook strip — your page posts on the website

Under the Kronika there is a strip called **Z Facebooku** with the last few posts
from the coalition's Facebook page.

**How it works — and why it is not Facebook's own widget.** Facebook offers a
ready-made box you can paste into a page, but it loads from Facebook while
someone is browsing our site: it would set Meta's cookies on every visitor, which
means we would legally need a cookie banner, and it ignores our design. So we do
it the other way round: **you** download the posts onto your computer, they get
published together with the rest of the site, and a visitor's browser never talks
to Facebook at all. No cookies, no banner, and the posts look like the rest of
the site.

The price is that the strip does not update itself — it refreshes when you run
one command (below). If there are no posts downloaded, the strip does not appear
on the page at all.

### Everyday use

```bash
npm run fb      # downloads the latest posts + photos
npm run serve   # have a look at the site (optional)
git add -A && git commit -m "Refresh the Facebook strip" && git push
```

Then publish as usual (section 7). The texts land in `js/fb-posts.js` and the
photos in `assets/fb/` — both are ordinary files in the repository, so whatever
you see locally is exactly what goes live.

The strip keeps the **6 newest posts that have some text**. Photo-only posts are
skipped. Photos of posts that dropped off the strip are deleted automatically.

### One-time setup — the access token

`npm run fb` needs a password-like key ("Page access token") that lets it read
your own page. Making one is free and takes about fifteen minutes of clicking in
Facebook's developer site. You must be an **administrator of the Facebook page**.

1. Go to **developers.facebook.com** and log in with the account that administers
   the page. Accept the developer registration if it asks.
2. **My Apps → Create App.** For "What do you want your app to do?" pick
   **Other**, then app type **Business**. Name it anything (e.g. "Web SLON").
   The app can stay in *development* mode forever — you are not publishing an app
   and no review by Meta is needed, because you are an admin of both the app and
   the page.
3. Open the **Graph API Explorer**: developers.facebook.com/tools/explorer
4. Top right, pick your app in the **Meta App** dropdown.
5. In **Permissions**, add `pages_show_list` and `pages_read_engagement`.
6. Click **Generate Access Token** and approve the dialog that opens (make sure
   the coalition page is ticked).
7. The token you now have is short-lived (about an hour). To get a permanent one:
   - open the **Access Token Debugger**: developers.facebook.com/tools/debug/accesstoken
   - paste the token, click **Debug**, then **Extend Access Token** at the bottom
   - copy the extended token, go back to the Explorer, paste it in the token
     field and call `me/accounts`
   - in the answer find your page and copy its `access_token` — **this** is the
     one you want. Page tokens made this way do not expire.
8. In the project folder create a file called **`.fb-token`** and paste the token
   into it as the only line. The file is git-ignored, so it stays on your
   computer and never reaches GitHub.

Then run `npm run fb`. It should print the page name and how many posts it saved.

> **Never put the token anywhere else** — not into `content.js`, not into a commit
> message, not into a chat. Anyone who has it can read your page through the API.
> If it leaks, remove the app in Facebook settings and make a new token.

### When it stops working

Facebook refuses the request and the script prints why. The usual causes:

| What it says | What to do |
|---|---|
| token expired / invalid | make a new token (step 7 above) |
| unsupported version | Meta retired that API version: `FB_API_VERSION=v24.0 npm run fb` (try the next number up), then change the default in `tools/fetch-fb-posts.js` |
| missing permission | the token lacks `pages_read_engagement` — redo steps 5–7 |
| nothing saved, no error | the last posts are photo-only; the strip only takes posts with text |

---

Made with 💚💛💜 for Starý Lískovec.
