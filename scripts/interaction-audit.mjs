// Drives the actual interactive surfaces: accordion, mobile menu, forms,
// keyboard navigation, and reduced-motion behaviour.
import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const browser = await chromium.launch();
const log = (s) => console.log(s);

// ---------- 1. FAQ accordion ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/#faq`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const btn = page.locator("#faq button").first();
  const expandedBefore = await btn.getAttribute("aria-expanded");
  const controls = await btn.getAttribute("aria-controls");
  await btn.click();
  await page.waitForTimeout(500);
  const expandedAfter = await btn.getAttribute("aria-expanded");
  const panelVisible = controls
    ? await page.locator(`#${controls}`).isVisible().catch(() => "no-panel")
    : "no aria-controls";
  log("== FAQ accordion ==");
  log(`  aria-expanded: ${expandedBefore} -> ${expandedAfter}`);
  log(`  aria-controls: ${controls ?? "MISSING"}  panel visible after click: ${panelVisible}`);
  // keyboard
  await btn.press("Enter");
  await page.waitForTimeout(300);
  log(`  after Enter: aria-expanded=${await btn.getAttribute("aria-expanded")}`);
  await page.close();
}

// ---------- 2. Mobile menu ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  const toggle = page.locator('button[aria-label="Open menu"]');
  log("\n== Mobile menu ==");
  log(`  toggle found: ${await toggle.count()}`);
  await toggle.click();
  await page.waitForTimeout(700);
  const linksVisible = await page.locator('nav[aria-label="Mobile"] a').count();
  const htmlOverflow = await page.evaluate(() => document.documentElement.style.overflow);
  log(`  links in open menu: ${linksVisible}, scroll locked: ${htmlOverflow === "hidden"}`);
  // Is focus trapped / is Escape handled?
  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  const stillOpen = await page.locator('nav[aria-label="Mobile"]').count();
  log(`  closes on Escape: ${stillOpen === 0}`);
  const closeBtn = page.locator('button[aria-label="Close menu"]');
  if (await closeBtn.count()) {
    await closeBtn.click();
    await page.waitForTimeout(600);
    log(`  closes via button: ${(await page.locator('nav[aria-label="Mobile"]').count()) === 0}`);
    log(`  scroll unlocked after close: ${(await page.evaluate(() => document.documentElement.style.overflow)) !== "hidden"}`);
  }
  await page.close();
}

// ---------- 3. Contact form ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const dialogs = [];
  page.on("dialog", (d) => { dialogs.push(d.message()); d.dismiss(); });
  let navigatedTo = null;
  page.on("framenavigated", (f) => { if (f === page.mainFrame()) navigatedTo = f.url(); });

  await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  log("\n== Contact form ==");
  const form = page.locator("form").first();
  const inputs = await page.locator("form input, form textarea, form select").count();
  log(`  fields: ${inputs}`);

  // Submit empty — does native validation stop it?
  await form.locator('button[type="submit"], button:not([type])').first().click();
  await page.waitForTimeout(400);
  const invalidCount = await page.evaluate(
    () => [...document.querySelectorAll("form :invalid")].length,
  );
  log(`  empty submit -> :invalid elements: ${invalidCount} (native validation ${invalidCount ? "active" : "NOT blocking"})`);

  // Fill and submit properly
  await page.fill('input[name="email"]', "audit@example.com");
  const nameField = page.locator('input[name="name"]');
  if (await nameField.count()) await page.fill('input[name="name"]', "Audit Bot");
  const msg = page.locator('textarea[name="message"]');
  if (await msg.count()) await page.fill('textarea[name="message"]', "Automated audit probe.");
  await form.locator('button[type="submit"], button:not([type])').first().click();
  await page.waitForTimeout(2500);
  log(`  after valid submit, url = ${page.url()}`);
  log(`  navigated to mailto: ${String(navigatedTo).startsWith("mailto:")}`);
  const bodyText = await page.locator("body").innerText();
  const feedback = ["Got it", "thank you", "didn’t go through", "try again", "error"].filter((t) =>
    bodyText.includes(t),
  );
  log(`  visible feedback on page: ${feedback.length ? feedback.join(" / ") : "NONE — user sees no confirmation"}`);
  await page.close();
}

// ---------- 4. Newsletter form ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/journal/why-we-stay-four-people`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  log("\n== Newsletter form ==");
  const email = page.locator('input[type="email"]').first();
  if (!(await email.count())) { log("  no newsletter form found"); }
  else {
    await email.fill("audit@example.com");
    await page.locator("form").filter({ has: email }).locator("button").first().click();
    await page.waitForTimeout(2500);
    const t = await page.locator("body").innerText();
    const states = ["didn’t go through", "Thanks", "try again", "already", "error"].filter((s) => t.includes(s));
    log(`  feedback: ${states.length ? states.join(" / ") : "NONE"}`);
  }
  await page.close();
}

// ---------- 5. Keyboard: skip link + focus visibility ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  log("\n== Keyboard ==");
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    const cs = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(),
      text: (el.textContent || "").trim().slice(0, 30),
      outline: cs.outlineWidth,
      visible: el.getBoundingClientRect().top > -50,
    };
  });
  log(`  first Tab -> <${first.tag}> "${first.text}" outline=${first.outline} onscreen=${first.visible}`);

  // Tab through 25 stops, count any with no visible focus indicator
  let noIndicator = 0;
  const order = [];
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName.toLowerCase(),
        label: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 22),
        outlineWidth: cs.outlineWidth,
        outlineStyle: cs.outlineStyle,
      };
    });
    if (!info) break;
    order.push(info.label || info.tag);
    if (info.outlineStyle === "none" || info.outlineWidth === "0px") noIndicator++;
  }
  log(`  tab stops sampled: ${order.length}, without focus outline: ${noIndicator}`);
  log(`  order: ${order.slice(0, 14).join(" > ")}`);
  await page.close();
}

// ---------- 6. Reduced motion ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);
  log("\n== prefers-reduced-motion: reduce ==");
  const state = await page.evaluate(() => {
    const preloader = document.querySelector(".z-\\[90\\]");
    const cursor = document.querySelector(".mix-blend-difference");
    // Is content actually visible, or stuck at Reveal's initial opacity 0?
    const revealed = [...document.querySelectorAll("main div")]
      .slice(0, 60)
      .filter((el) => getComputedStyle(el).opacity === "0").length;
    return {
      preloaderPresent: Boolean(preloader),
      customCursorPresent: Boolean(cursor),
      hiddenBlocks: revealed,
      bodyText: document.body.innerText.length,
    };
  });
  log(`  custom cursor suppressed: ${!state.customCursorPresent}`);
  log(`  preloader still shown: ${state.preloaderPresent}`);
  log(`  blocks stuck at opacity 0: ${state.hiddenBlocks}`);
  log(`  text content length: ${state.bodyText}`);
  log(`  js errors: ${errs.length ? errs.join("; ") : "none"}`);
  await page.close();
}

// ---------- 7. JS disabled ----------
{
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const text = await page.evaluate(() => document.body.innerText.length).catch(() => -1);
  const visible = await page.locator("h1").first().isVisible().catch(() => false);
  log("\n== JavaScript disabled ==");
  log(`  body text length: ${text}, h1 visible: ${visible}`);
  await ctx.close();
}

await browser.close();
