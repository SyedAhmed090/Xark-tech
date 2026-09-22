/**
 * End-to-end check for the brief funnel.
 *
 * The brief is the whole sales process at these prices, and its two riskiest
 * parts are invisible in a build: whether `?package=` resolves to the right
 * question set, and whether a submission that the server cannot process still
 * reaches us instead of silently dying. Both are checked here.
 *
 * Run against a served copy of out/:
 *   AUDIT_BASE=http://localhost:3116 node scripts/brief-check.mjs
 */
import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";

const CASES = [
  {
    param: "logo-design-business",
    expectLabel: "Logo & brand identity — Business",
    expectField: "Logos you admire",
    absentField: "Sites you like",
  },
  {
    param: "web-design-starter-site",
    expectLabel: "Website design & build — Starter Site",
    expectField: "Sites you like",
    absentField: "Logos you admire",
  },
  {
    param: "open-for-business",
    expectLabel: "Open for Business",
    expectField: "Sites you like",
    absentField: "Logos you admire",
  },
  {
    param: "website-care-care-plus",
    expectLabel: "Website care — Care+",
    expectField: "What do you need?",
    absentField: "Logos you admire",
  },
];

const browser = await chromium.launch();
let failures = 0;
const fail = (msg) => {
  console.log("  FAIL " + msg);
  failures++;
};

for (const c of CASES) {
  const page = await browser.newPage();
  await page.goto(`${BASE}/brief/?package=${c.param}`, {
    waitUntil: "networkidle",
  });
  const body = await page.textContent("body");
  const selected = await page.$eval("select", (el) => el.value);

  console.log(`\n?package=${c.param}`);
  if (selected !== c.param) fail(`preselect was "${selected}"`);
  if (!body.includes(c.expectLabel)) fail(`missing label "${c.expectLabel}"`);
  if (!body.includes(c.expectField)) fail(`missing field "${c.expectField}"`);
  if (body.includes(c.absentField)) fail(`wrong brief: "${c.absentField}"`);
  if (!failures) console.log("  ok — right package, right question set");
  await page.close();
}

// An unknown package must not break the page — someone will edit the URL, and
// a stale link from an old campaign must still convert.
{
  const page = await browser.newPage();
  await page.goto(`${BASE}/brief/?package=does-not-exist`, {
    waitUntil: "networkidle",
  });
  const selected = await page.$eval("select", (el) => el.value);
  console.log("\n?package=does-not-exist");
  if (selected !== "") fail(`should fall back to the picker, got "${selected}"`);
  else console.log("  ok — falls back to the picker");
  await page.close();
}

/*
 * Submission with no working PHP. Serving out/ statically returns brief.php as
 * a text file: HTTP 200, body of PHP source. That is exactly the case that
 * used to tell a visitor "sent" when nothing had been sent, so the expected
 * behaviour is a mailto: handoff carrying the whole brief — never a success
 * message.
 */
{
  const page = await browser.newPage();
  let mailto = null;
  page.on("request", (r) => {
    if (r.url().startsWith("mailto:")) mailto = decodeURIComponent(r.url());
  });

  await page.goto(`${BASE}/brief/?package=logo-design-starter`, {
    waitUntil: "networkidle",
  });
  await page.fill('textarea >> nth=0', "We fit and repair garage doors.");
  await page.fill('input[type="text"] >> nth=0', "Sheridan Door Co");
  await page.fill('input[autocomplete="name"]', "Sam Traynor");
  await page.fill('input[type="email"]', "sam@example.com");
  await page.click('button[type="submit"]');
  await page.waitForTimeout(1500);

  const body = await page.textContent("body");
  console.log("\nsubmit with no PHP available");
  if (body.includes("Brief received")) {
    fail("reported success though nothing was sent");
  } else if (!mailto) {
    fail("no mailto: fallback — the brief was lost");
  } else if (!mailto.includes("Sheridan Door Co")) {
    fail("mailto: did not carry the answers");
  } else {
    console.log("  ok — handed the full brief to the mail client");
  }
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} FAILURES` : "\nAll brief checks passed");
process.exit(failures ? 1 : 0);
