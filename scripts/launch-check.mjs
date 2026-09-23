/**
 * Pre-deploy check. Reads the built `out/` directory — what actually ships —
 * rather than the source, because the failures that matter at launch are the
 * ones that only exist after a build: a sitemap on the wrong origin, a missing
 * .htaccess, a PHP endpoint that never got copied.
 *
 * Exits non-zero on anything that would break or embarrass in production.
 * Warnings are things to decide about, not blockers.
 *
 *   npm run build && node scripts/launch-check.mjs
 */
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";
const fails = [];
const warns = [];

const fail = (m) => fails.push(m);
const warn = (m) => warns.push(m);
const read = (p) => readFileSync(join(OUT, p), "utf8");

if (!existsSync(OUT)) {
  console.error("No out/ directory — run `npm run build` first.");
  process.exit(1);
}

// --- Files that must have survived prepare-deploy ---------------------------
for (const f of [
  ".htaccess",
  "api/config.php",
  "api/contact.php",
  "api/subscribe.php",
  "api/brief.php",
  "robots.txt",
  "sitemap.xml",
  "index.html",
]) {
  if (!existsSync(join(OUT, f))) fail(`missing from out/: ${f}`);
}

// --- Origin consistency -----------------------------------------------------
const robots = read("robots.txt");
const sitemap = read("sitemap.xml");
const origin = (robots.match(/Sitemap:\s*(https?:\/\/[^/\s]+)/) || [])[1];

if (!origin) fail("robots.txt has no Sitemap line");
else {
  if (origin.includes("localhost")) fail(`robots.txt points at ${origin}`);
  const strays = [...sitemap.matchAll(/<loc>(https?:\/\/[^/]+)/g)]
    .map((m) => m[1])
    .filter((o) => o !== origin);
  if (strays.length) fail(`sitemap URLs on a different origin: ${[...new Set(strays)].join(", ")}`);
}

// --- Sitemap must name the URL the page claims as canonical -----------------
// A sitemap full of redirects is not broken, but it tells search engines a
// different address than every page does.
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let mismatched = 0;
for (const loc of locs) {
  const path = new URL(loc).pathname;
  const file = join(OUT, path === "/" ? "index.html" : `${path}index.html`);
  if (!existsSync(file)) {
    fail(`sitemap lists ${path} but no page was exported there`);
    continue;
  }
  const canonical = (readFileSync(file, "utf8").match(
    /<link rel="canonical" href="([^"]+)"/,
  ) || [])[1];
  if (canonical && canonical !== loc) {
    mismatched++;
    if (mismatched <= 3) fail(`sitemap says ${loc}, page says ${canonical}`);
  }
}
if (mismatched > 3) fail(`…and ${mismatched - 3} more sitemap/canonical mismatches`);

// --- noindex pages must not be advertised -----------------------------------
for (const loc of locs) {
  const path = new URL(loc).pathname;
  const file = join(OUT, path === "/" ? "index.html" : `${path}index.html`);
  if (existsSync(file) && /content="noindex/.test(readFileSync(file, "utf8"))) {
    fail(`${path} is noindex but is listed in the sitemap`);
  }
}

// --- Organization schema completeness ---------------------------------------
const home = read("index.html");
const blocks = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .map((m) => {
    try {
      return JSON.parse(m[1]);
    } catch {
      return null;
    }
  })
  .filter(Boolean);
const nodes = blocks.flatMap((b) => b["@graph"] ?? [b]);
const org = nodes.find((n) =>
  ["Organization", "LocalBusiness", "ProfessionalService"].includes(n["@type"]),
);

if (!org) fail("no Organization node in the homepage JSON-LD");
else {
  if (!org.telephone) warn("Organization schema has no telephone");
  if (!org.address?.streetAddress) warn("Organization schema has no street address");
  if (!org.sameAs?.length)
    warn("Organization schema has no sameAs — add real social profile URLs in lib/site.ts");
  if (/design studio|B2B|fintech/i.test(org.description ?? ""))
    fail("Organization description still describes the old studio positioning");
}

// --- Live chat --------------------------------------------------------------
if (!home.includes("tawk.to"))
  warn("tawk.to is not configured — set SITE.chat in lib/site.ts, or chat will not appear");

// --- Leftover markers -------------------------------------------------------
const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(html|txt|xml)$/.test(e.name)) out.push(full);
  }
  return out;
};
for (const file of walk(OUT)) {
  const body = readFileSync(file, "utf8");
  for (const marker of ["TODO(launch)", "lorem ipsum", "Q4 2026"]) {
    if (body.toLowerCase().includes(marker.toLowerCase())) {
      fail(`"${marker}" present in ${file.replace(/\\/g, "/")}`);
    }
  }
}

// --- Report -----------------------------------------------------------------
for (const w of warns) console.log(`  WARN  ${w}`);
for (const f of fails) console.log(`  FAIL  ${f}`);

console.log(
  `\n${locs.length} pages checked — ${fails.length} blocking, ${warns.length} to decide.`,
);
if (!fails.length && !warns.length) console.log("Ready to deploy.");
process.exit(fails.length ? 1 : 0);
