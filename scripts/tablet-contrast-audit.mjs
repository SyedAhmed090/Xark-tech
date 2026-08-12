// Tablet-width overflow plus WCAG AA contrast sampling on real rendered text.
import { chromium } from "playwright";

const BASE = process.env.AUDIT_BASE ?? "http://localhost:3000";
const ROUTES = ["/", "/services", "/packages", "/work", "/studio", "/journal", "/contact",
  "/services/brand-identity", "/work/meridian", "/journal/why-we-stay-four-people"];
const WIDTHS = [768, 834, 1024];

const browser = await chromium.launch();

console.log("== Tablet overflow ==");
for (const w of WIDTHS) {
  const page = await browser.newPage({ viewport: { width: w, height: 1000 } });
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: "networkidle", timeout: 90_000 });
    await page.waitForTimeout(500);
    const o = await page.evaluate((vw) => document.documentElement.scrollWidth - vw, w);
    if (o > 0) console.log(`  ${w}px ${r}: OVERFLOW +${o}px`);
  }
  await page.close();
  console.log(`  ${w}px: checked ${ROUTES.length} routes`);
}

console.log("\n== Contrast (WCAG AA: 4.5 normal, 3.0 large >=24px or bold >=18.66px) ==");
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const seen = new Map();

for (const r of ROUTES) {
  await page.goto(BASE + r, { waitUntil: "networkidle", timeout: 90_000 });
  // Scroll so lazy-revealed text is painted at full opacity.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40));
    }
  });
  await page.waitForTimeout(1200);

  const found = await page.evaluate(() => {
    const srgb = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    const lum = ([r, g, b]) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
    const parse = (s) => {
      const m = s.match(/rgba?\(([^)]+)\)/); if (!m) return null;
      const p = m[1].split(",").map((x) => parseFloat(x));
      return { rgb: [p[0], p[1], p[2]], a: p.length > 3 ? p[3] : 1 };
    };
    const blend = (fg, bg, a) => fg.map((c, i) => c * a + bg[i] * (1 - a));
    const bgOf = (el) => {
      let n = el;
      while (n && n !== document.documentElement) {
        const c = parse(getComputedStyle(n).backgroundColor);
        if (c && c.a > 0.5) return c.rgb;
        n = n.parentElement;
      }
      return [247, 246, 242];
    };

    const out = [];
    for (const el of document.querySelectorAll("p,span,a,li,h1,h2,h3,h4,figcaption,label,button,div")) {
      if (el.children.length > 0) continue;
      const text = (el.textContent || "").trim();
      if (text.length < 3) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") continue;
      if (parseFloat(cs.opacity) < 0.95) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 4 || rect.height < 4) continue;

      const fg = parse(cs.color); if (!fg) continue;
      const bg = bgOf(el);
      const eff = fg.a < 1 ? blend(fg.rgb, bg, fg.a) : fg.rgb;
      const L1 = lum(eff), L2 = lum(bg);
      const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
      const size = parseFloat(cs.fontSize);
      const weight = Number(cs.fontWeight) || 400;
      const large = size >= 24 || (size >= 18.66 && weight >= 700);
      const required = large ? 3 : 4.5;
      if (ratio < required) {
        out.push({
          ratio: Math.round(ratio * 100) / 100, required, size, weight,
          color: cs.color, text: text.slice(0, 40),
          cls: (el.className || "").toString().slice(0, 44),
        });
      }
    }
    return out;
  });

  for (const f of found) {
    const key = `${f.color}|${f.size}|${f.cls}`;
    if (!seen.has(key)) seen.set(key, { ...f, route: r });
  }
}
await page.close();
await browser.close();

const rows = [...seen.values()].sort((a, b) => a.ratio - b.ratio);
if (!rows.length) console.log("  no failures found");
for (const f of rows) {
  console.log(`  ${f.ratio} (needs ${f.required})  ${f.size}px/${f.weight}  ${f.color}  "${f.text}"`);
  console.log(`      .${f.cls}   [${f.route}]`);
}
