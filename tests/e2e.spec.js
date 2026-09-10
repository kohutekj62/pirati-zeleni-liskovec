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
    await expect(page.locator("#people-grid .person")).toHaveCount(8);
    await expect(page.locator("#events-list .event")).toHaveCount(4);
    // Mobile viewport (≤480px) shows 1 news card at a time; desktop shows 3.
    const vp = page.viewportSize();
    const expectedNews = vp && vp.width <= 480 ? 1 : 3;
    await expect(page.locator("#news-grid .news-card")).toHaveCount(expectedNews);
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

  test("people cards show a real photo, falling back to the logo when one is missing", async ({ page }) => {
    const cards = page.locator("#people-grid .person");
    await expect(cards).toHaveCount(8);

    const first = cards.first();

    // Guard against the "invisible photo" bug: the photo frame must have a
    // real rendered height (not collapsed to zero), and the <img> inside —
    // whether it's the real photo or the onerror-triggered logo fallback —
    // must actually have loaded.
    const photoBox = await first.locator(".person__photo").boundingBox();
    expect(photoBox && photoBox.height, "photo frame should have real height").toBeGreaterThan(150);

    const img = first.locator(".person__photo img");
    await expect(img, "photo image should be visible").toBeVisible();
    await expect.poll(() => img.evaluate((el) => el.naturalWidth), "photo image should have loaded")
      .toBeGreaterThan(0);

    // A candidate with no photo file on disk falls back to the logo
    // placeholder instead of a broken-image icon. The <img> is loading="lazy",
    // so scroll it into view first or the browser never even fetches it.
    const missingPhoto = page.locator('#people-grid .person:has-text("Kateřina Křížová") .person__photo img');
    await missingPhoto.scrollIntoViewIfNeeded();
    await expect(missingPhoto).toHaveClass(/is-placeholder/);
    await expect.poll(() => missingPhoto.evaluate((el) => el.naturalWidth), "placeholder logo should have loaded")
      .toBeGreaterThan(0);
  });

  test("contact form rejects an empty submit with an error message", async ({ page }) => {
    await page.locator("#cf-submit").click();
    const status = page.locator("#cf-status");
    await expect(status).toHaveClass(/is-error/);
    await expect(status).not.toBeEmpty();
  });

  test("contact form accepts a properly filled submit", async ({ page }) => {
    // Mock the Formspree API so CI never hits the real endpoint
    // (external calls fail in sandboxed runners and waste the monthly quota).
    await page.route("**/formspree.io/**", route =>
      route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) })
    );
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

  test("the dev banner does not appear on the home page", async ({ page }) => {
    await expect(page.locator("#dev-banner")).toHaveCount(0);
  });

  test("mobile: no horizontal scrollbar (no content wider than viewport)", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth);
    expect(overflow, "body should not be wider than the viewport (horizontal scroll)").toBe(false);
  });

  test("mobile: people photo cards have real height and load correctly", async ({ page }) => {
    const btn = page.locator("#menu-btn");
    if (!(await btn.isVisible())) { test.skip(true, "desktop layout"); }

    const photo = page.locator("#people-grid .person .person__photo").first();
    const box = await photo.boundingBox();
    expect(box && box.height, "photo frame must have real height on mobile").toBeGreaterThan(100);

    const img = photo.locator("img");
    await expect.poll(() => img.evaluate((el) => el.naturalWidth), "photo image should have loaded")
      .toBeGreaterThan(0);
  });
});

// ============================================================================
//  The transparency notice is the only page that still carries the dev banner,
//  because it is the only page waiting on outside data (the vydavatel's
//  invoices). tools/sync-transparency-visibility.js drops the banner as soon as
//  those placeholders are filled in, so these tests skip themselves once that
//  happens rather than failing.
// ============================================================================
test.describe("Transparency notice", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/transparentnost/", { waitUntil: "domcontentloaded" });
  });

  test("carries the dev banner while invoice figures are still missing", async ({ page }) => {
    const unresolved = await page.locator("span.todo", { hasText: /faktur/i }).count();
    if (unresolved === 0) { test.skip(true, "invoice placeholders resolved — banner is gone by design"); }

    await expect(page.locator("#dev-banner")).toBeVisible();
  });

  test("the dev banner can be dismissed", async ({ page }) => {
    const unresolved = await page.locator("span.todo", { hasText: /faktur/i }).count();
    if (unresolved === 0) { test.skip(true, "invoice placeholders resolved — banner is gone by design"); }

    const banner = page.locator("#dev-banner");
    await expect(banner).toBeVisible();
    await page.locator("#dev-banner-close").click();
    await expect(banner).toBeHidden();
  });
});
