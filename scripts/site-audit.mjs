// Structural + functional audit: console errors, broken assets, link integrity,
// heading hierarchy, duplicate ids, anchor targets, accessible names.
import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";
const ROUTES = [
  "/",
  "/services",
  "/packages",
  "/work",
  "/studio",
  "/journal",
  "/contact",
  "/privacy",
  "/terms",
  "/services/brand-identity",
  "/services/product-design",
  "/services/web-design-build",
  "/services/motion-3d",
  "/work/meridian",
  "/work/atlas-freight",
  "/work/forma-studio",
  "/work/loop-health",
  "/journal/why-we-stay-four-people",
  "/journal/motion-is-a-language-not-a-garnish",
  "/journal/design-systems-are-a-management-tool",
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

const report = [];
const allInternalLinks = new Set();
const allExternalLinks = new Set();

for (const route of ROUTES) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text().slice(0, 180));
  });
  page.on("pageerror", (err) => pageErrors.push(String(err).slice(0, 180)));
  page.on("requestfailed", (req) =>
    failedRequests.push(`${req.method()} ${req.url().slice(0, 120)} — ${req.failure()?.errorText}`),
  );
  page.on("response", (res) => {
    if (res.status() >= 400) failedRequests.push(`HTTP ${res.status()} ${res.url().slice(0, 120)}`);
  });

  await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90_000 });
  await page.waitForTimeout(900);

  const data = await page.evaluate(() => {
    // Heading hierarchy
    const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => ({
      level: Number(h.tagName[1]),
      text: (h.textContent || "").trim().slice(0, 50),
    }));
    const h1s = headings.filter((h) => h.level === 1);
    const skips = [];
    for (let i = 1; i < headings.length; i++) {
      if (headings[i].level - headings[i - 1].level > 1) {
        skips.push(`h${headings[i - 1].level} -> h${headings[i].level} at "${headings[i].text}"`);
      }
    }

    // Duplicate ids
    const ids = {};
    for (const el of document.querySelectorAll("[id]")) {
      ids[el.id] = (ids[el.id] || 0) + 1;
    }
    const dupeIds = Object.entries(ids).filter(([, n]) => n > 1).map(([k, n]) => `${k}×${n}`);

    // Images
    const imgs = [...document.querySelectorAll("img")];
    const brokenImgs = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.currentSrc || i.src);
    const noAlt = imgs.filter((i) => !i.hasAttribute("alt")).length;
    const emptyAlt = imgs.filter((i) => i.getAttribute("alt") === "").length;

    // Links
    const internal = [];
    const external = [];
    const emptyLinks = [];
    for (const a of document.querySelectorAll("a[href]")) {
      const href = a.getAttribute("href");
      const name = (a.textContent || "").trim() || a.getAttribute("aria-label") || "";
      if (!name) emptyLinks.push(href);
      if (href.startsWith("http")) external.push(href);
      else if (href.startsWith("/")) internal.push(href);
    }

    // Anchor targets referenced on this page
    const anchorRefs = [...document.querySelectorAll('a[href^="/#"], a[href^="#"]')].map((a) =>
      a.getAttribute("href").replace(/^\/?#/, ""),
    );
    const missingAnchors = [...new Set(anchorRefs)].filter(
      (id) => id && !document.getElementById(id),
    );

    // Buttons without accessible names
    const namelessButtons = [...document.querySelectorAll("button")].filter((b) => {
      const t = (b.textContent || "").trim();
      return !t && !b.getAttribute("aria-label") && !b.getAttribute("title");
    }).length;

    // Form controls without labels
    const unlabeled = [...document.querySelectorAll("input,select,textarea")].filter((el) => {
      if (el.type === "hidden") return false;
      if (el.getAttribute("aria-label") || el.getAttribute("aria-labelledby")) return false;
      if (el.id && document.querySelector(`label[for="${el.id}"]`)) return false;
      if (el.closest("label")) return false;
      return true;
    }).map((el) => `${el.tagName.toLowerCase()}[name=${el.getAttribute("name")}]`);

    return {
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content?.length ?? 0,
      h1Count: h1s.length,
      h1Text: h1s.map((h) => h.text),
      headingCount: headings.length,
      skips,
      dupeIds,
      imgCount: imgs.length,
      brokenImgs,
      noAlt,
      emptyAlt,
      internal: [...new Set(internal)],
      external: [...new Set(external)],
      emptyLinks,
      missingAnchors,
      namelessButtons,
      unlabeled,
    };
  });

  data.internal.forEach((l) => allInternalLinks.add(l));
  data.external.forEach((l) => allExternalLinks.add(l));

  report.push({ route, consoleErrors, pageErrors, failedRequests, ...data });
  await page.close();
}

await browser.close();

// ---- Output ----
console.log("################ PER-PAGE ################");
for (const r of report) {
  const issues = [];
  if (r.pageErrors.length) issues.push(`${r.pageErrors.length} JS page errors`);
  if (r.consoleErrors.length) issues.push(`${r.consoleErrors.length} console errors`);
  if (r.failedRequests.length) issues.push(`${r.failedRequests.length} failed requests`);
  if (r.h1Count !== 1) issues.push(`h1 count = ${r.h1Count}`);
  if (r.skips.length) issues.push(`${r.skips.length} heading skips`);
  if (r.dupeIds.length) issues.push(`dupe ids: ${r.dupeIds.join(",")}`);
  if (r.brokenImgs.length) issues.push(`${r.brokenImgs.length} broken images`);
  if (r.noAlt) issues.push(`${r.noAlt} img without alt attr`);
  if (r.missingAnchors.length) issues.push(`missing anchors: ${r.missingAnchors.join(",")}`);
  if (r.emptyLinks.length) issues.push(`${r.emptyLinks.length} links w/o accessible name`);
  if (r.namelessButtons) issues.push(`${r.namelessButtons} buttons w/o name`);
  if (r.unlabeled.length) issues.push(`unlabeled inputs: ${r.unlabeled.join(",")}`);
  if (!r.description) issues.push("no meta description");

  console.log(`\n${r.route}`);
  console.log(`  title(${r.title.length}): ${r.title}`);
  console.log(`  headings: ${r.headingCount}, h1: ${JSON.stringify(r.h1Text)}`);
  if (issues.length) {
    for (const i of issues) console.log(`  !! ${i}`);
    for (const e of r.pageErrors) console.log(`     pageerror: ${e}`);
    for (const e of r.consoleErrors) console.log(`     console: ${e}`);
    for (const e of r.failedRequests) console.log(`     request: ${e}`);
    for (const s of r.skips) console.log(`     skip: ${s}`);
  } else {
    console.log("  clean");
  }
}

console.log("\n################ LINK INVENTORY ################");
console.log("internal:", [...allInternalLinks].sort().join(" "));
console.log("\nexternal:", [...allExternalLinks].sort().join("\n          "));
