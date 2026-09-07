// Mobile audit: horizontal overflow, tap-target sizes, and font legibility
// across every indexable route at three phone widths.
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
  "/journal/why-we-stay-four-people",
];
const VIEWPORTS = [
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "iPhone 14", width: 390, height: 844 },
  { name: "narrow", width: 320, height: 640 },
];

const browser = await chromium.launch();
const results = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: "networkidle", timeout: 90_000 });
    // Let reveal animations settle so nothing is mid-transform when measured.
    await page.waitForTimeout(700);

    const audit = await page.evaluate((vpWidth) => {
      const doc = document.documentElement;
      const scrollWidth = Math.max(doc.scrollWidth, document.body.scrollWidth);

      // Elements physically wider than the viewport or spilling past its edge.
      const offenders = [];
      for (const el of document.querySelectorAll("body *")) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const style = getComputedStyle(el);
        if (style.position === "fixed") continue;
        if (r.right > vpWidth + 1 || r.left < -1) {
          // Ignore anything intentionally clipped by an ancestor.
          let clipped = false;
          let p = el.parentElement;
          while (p) {
            const ps = getComputedStyle(p);
            if (ps.overflowX === "hidden" || ps.overflowX === "auto" || ps.overflow === "hidden") {
              clipped = true;
              break;
            }
            p = p.parentElement;
          }
          if (!clipped) {
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls: (el.className || "").toString().slice(0, 70),
              right: Math.round(r.right),
              width: Math.round(r.width),
            });
          }
        }
      }

      // Interactive targets smaller than the 24px WCAG 2.2 minimum.
      const smallTargets = [];
      for (const el of document.querySelectorAll(
        "a, button, input, select, textarea, [role=button]",
      )) {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        if (r.height < 24 || r.width < 24) {
          smallTargets.push({
            tag: el.tagName.toLowerCase(),
            text: (el.textContent || "").trim().slice(0, 28),
            w: Math.round(r.width),
            h: Math.round(r.height),
          });
        }
      }

      // Body copy below 12px is a Google mobile-usability flag.
      const tinyText = [];
      for (const el of document.querySelectorAll("p, li, span, a, div")) {
        if (!el.textContent || el.textContent.trim().length < 12) continue;
        if (el.children.length > 0) continue;
        const fs = parseFloat(getComputedStyle(el).fontSize);
        if (fs && fs < 12) {
          tinyText.push({ size: fs, text: el.textContent.trim().slice(0, 34) });
        }
      }

      return {
        scrollWidth,
        overflow: scrollWidth - vpWidth,
        offenders: offenders.slice(0, 6),
        offenderCount: offenders.length,
        smallTargets: smallTargets.slice(0, 6),
        smallTargetCount: smallTargets.length,
        tinyText: tinyText.slice(0, 4),
        tinyTextCount: tinyText.length,
      };
    }, vp.width);

    results.push({ vp: vp.name, width: vp.width, route, ...audit });
  }
  await context.close();
}

await browser.close();

// Report
let problems = 0;
for (const vp of VIEWPORTS) {
  console.log(`\n=== ${vp.name} (${vp.width}px) ===`);
  for (const r of results.filter((x) => x.vp === vp.name)) {
    const flags = [];
    if (r.overflow > 0) flags.push(`H-OVERFLOW +${r.overflow}px`);
    if (r.smallTargetCount) flags.push(`${r.smallTargetCount} small targets`);
    if (r.tinyTextCount) flags.push(`${r.tinyTextCount} tiny text`);
    if (flags.length) {
      problems++;
      console.log(`  ${r.route.padEnd(38)} ${flags.join(" | ")}`);
      for (const o of r.offenders) {
        console.log(`      overflow: <${o.tag}> right=${o.right} w=${o.width} .${o.cls}`);
      }
      for (const t of r.smallTargets) {
        console.log(`      target: <${t.tag}> ${t.w}x${t.h} "${t.text}"`);
      }
      for (const t of r.tinyText) {
        console.log(`      text: ${t.size}px "${t.text}"`);
      }
    } else {
      console.log(`  ${r.route.padEnd(38)} OK`);
    }
  }
}
console.log(`\n${problems} route/viewport combinations with findings.`);
