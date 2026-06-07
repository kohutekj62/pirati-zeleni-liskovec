// ============================================================================
//  e2e.spec.js  —  "end to end" tests: does the website actually work?
// ============================================================================
//  Each test() below describes one thing a visitor should be able to do.
//  Run them with:   npm test
//  If one fails, the message tells you which behaviour broke and where.
// ============================================================================
const { test, expect } = require("@playwright/test");

test.describe("Starý Lískovec ON website", () => {

  // Open the home page fresh before every test.
  // We wait for "domcontentloaded" (HTML + scripts ready) rather than "load"
  // (which also waits for big images and the external Google Fonts) — the JS
  // builds the page on DOMContentLoaded, so that's all the tests need.
  test.beforeEach(async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });
  });

  test("shows the hero and all seven main sections", async ({ page }) => {
    await expect(page.locator("#hero")).toBeVisible();
    for (const id of ["about", "program", "people", "meet", "news", "contact", "partners"]) {
      await expect(page.locator("#" + id), `section #${id} should be on the page`).toBeVisible();
    }
  });

  test("builds the right number of items from content.js", async ({ page }) => {
    await expect(page.locator("#program-list .program-card")).toHaveCount(6);
    await expect(page.locator("#people-grid .person")).toHaveCount(5);
    await expect(page.locator("#events-list .event")).toHaveCount(10);
    await expect(page.locator("#news-grid .news-card")).toHaveCount(3);
  });

  test("the menu links point at the sections", async ({ page }) => {
    const expected = ["#about", "#program", "#people", "#meet", "#news", "#contact", "#partners"];
    const hrefs = await page.locator(".main-nav a").evaluateAll(
      (els) => els.map((a) => a.getAttribute("href"))
    );
    expect(hrefs).toEqual(expected);
  });

  test("language toggle switches Czech ⇄ English and remembers the choice", async ({ page }) => {
    const kicker = page.locator(".hero__kicker");

    // Starts in Czech
    await expect(kicker).toContainText("Komunální");
    await expect(page.locator("html")).toHaveAttribute("lang", "cs");

    // Switch to English
    await page.locator("#lang-toggle").click();
    await expect(kicker).toContainText("Municipal");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    // The choice survives a page reload
    await page.reload();
    await expect(page.locator(".hero__kicker")).toContainText("Municipal");
  });

  test("program cards expand and collapse when clicked", async ({ page }) => {
    const first = page.locator("#program-list .program-card").first();
    expect(await first.evaluate((el) => el.open)).toBe(false);     // closed at the start
    await first.locator("summary").click();
    expect(await first.evaluate((el) => el.open)).toBe(true);      // open after a click
  });

  test("clicking the elephant flips to the real photo and back (each card on its own)", async ({ page }) => {
    const cards = page.locator("#people-grid .flip-card");
    const first = cards.first();
    const second = cards.nth(1);

    // Guard against the "invisible elephant" bug: the card AND its front face
    // must have a real rendered height (not collapsed to zero), and the
    // elephant image must be on screen.
    const cardBox = await first.boundingBox();
    expect(cardBox && cardBox.height, "flip-card should have real height").toBeGreaterThan(150);
    const faceBox = await first.locator(".flip-card__face--front").boundingBox();
    expect(faceBox && faceBox.height, "front face should fill the card").toBeGreaterThan(150);
    await expect(first.locator(".flip-card__face--front img"), "elephant image should be visible").toBeVisible();

    // The back of the card holds the real photo from assets/people/
    await expect(first.locator(".flip-card__face--back img")).toHaveAttribute("src", /assets\/people\//);

    // Starts un-flipped
    await expect(first).toHaveAttribute("aria-pressed", "false");

    // Click → flips to photo
    await first.click();
    await expect(first).toHaveAttribute("aria-pressed", "true");
    await expect(first).toHaveClass(/is-flipped/);

    // The other cards are unaffected (independent toggles)
    await expect(second).toHaveAttribute("aria-pressed", "false");

    // Click again → flips back to the elephant
    await first.click();
    await expect(first).toHaveAttribute("aria-pressed", "false");
  });

  test("contact form rejects an empty submit with an error message", async ({ page }) => {
    await page.locator("#cf-submit").click();
    const status = page.locator("#cf-status");
    await expect(status).toHaveClass(/is-error/);
    await expect(status).not.toBeEmpty();
  });

  test("contact form accepts a properly filled submit", async ({ page }) => {
    await page.fill("#cf-name", "Jan Tester");
    await page.fill("#cf-email", "jan@example.com");
    await page.fill("#cf-message", "Dobrý den, toto je testovací zpráva.");
    await page.locator("#cf-submit").click();
    await expect(page.locator("#cf-status")).toHaveClass(/is-ok/);
  });

  test("the hamburger menu opens on a phone-sized screen", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    // This only applies to the small-screen layout; skip on desktop.
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout has no hamburger"); }
    await btn.click();
    await expect(page.locator("#main-nav")).toHaveClass(/is-open/);
    await expect(btn).toHaveAttribute("aria-expanded", "true");
  });

  // -------------------------------------------------------------------------
  // MOBILE-ONLY tests
  // Each test skips itself on the desktop project (hamburger not visible = desktop).
  // -------------------------------------------------------------------------

  test("mobile: nav is fully hidden when the hamburger is closed", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    // The last nav link ("Přátelé") was peeking above the dev-banner before the
    // visibility:hidden fix. isVisible() returns false for visibility:hidden elements
    // and would have caught the original bug.
    const lastLink = page.locator(".main-nav a").last();
    await expect(lastLink, "last nav link must not be visible when hamburger is closed").not.toBeVisible();
  });

  test("mobile: nav closes after tapping a link", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    await btn.click();
    await expect(page.locator("#main-nav")).toHaveClass(/is-open/);

    // Tap the first nav link — menu should collapse
    await page.locator(".main-nav a").first().click();
    await expect(page.locator("#main-nav")).not.toHaveClass(/is-open/);
    await expect(btn).toHaveAttribute("aria-expanded", "false");
  });

  test("mobile: dev-banner is visible at page load", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    await expect(page.locator("#dev-banner")).toBeVisible();
  });

  test("mobile: dev-banner can be dismissed", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    const banner = page.locator("#dev-banner");
    await expect(banner).toBeVisible();
    await page.locator("#dev-banner-close").click();
    await expect(banner).toBeHidden();
  });

  test("mobile: no horizontal scrollbar (no content wider than viewport)", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow, "body should not be wider than the viewport (horizontal scroll)").toBe(false);
  });

  test("mobile: flip-cards have real height and work on touch", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    const first = page.locator("#people-grid .flip-card").first();
    const box = await first.boundingBox();
    expect(box && box.height, "flip-card must have real height on mobile").toBeGreaterThan(100);

    // Tap to flip
    await first.click();
    await expect(first).toHaveAttribute("aria-pressed", "true");

    // Tap again to flip back
    await first.click();
    await expect(first).toHaveAttribute("aria-pressed", "false");
  });
});
