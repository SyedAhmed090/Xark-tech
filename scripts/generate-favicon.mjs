// Builds app/favicon.ico from app/icon.svg so the mark is maintained in one
// place. Rasterizes with Playwright (already a devDependency), then wraps the
// PNGs in a multi-size ICO container — PNG-in-ICO is valid and universally
// supported, and avoids pulling in an image-processing dependency.
//
// Run with: node scripts/generate-favicon.mjs
import { chromium } from "playwright";
import { readFile, writeFile } from "node:fs/promises";

const SIZES = [16, 32, 48];
const svg = await readFile(new URL("../app/icon.svg", import.meta.url), "utf8");

const browser = await chromium.launch();
const pngs = [];

for (const size of SIZES) {
  const page = await browser.newPage({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1,
  });
  // Transparent background so the SVG's own rounded rect defines the shape.
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}
     svg{display:block;width:${size}px;height:${size}px}</style>${svg}`,
    { waitUntil: "load" },
  );
  const buf = await page.screenshot({ omitBackground: true, type: "png" });
  pngs.push({ size, buf });
  await page.close();
}
await browser.close();

// ---- ICO assembly ----
const HEADER = 6;
const ENTRY = 16;
const dataOffsetStart = HEADER + ENTRY * pngs.length;

const header = Buffer.alloc(HEADER);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: 1 = icon
header.writeUInt16LE(pngs.length, 4); // image count

const entries = [];
let offset = dataOffsetStart;
for (const { size, buf } of pngs) {
  const e = Buffer.alloc(ENTRY);
  e.writeUInt8(size === 256 ? 0 : size, 0); // width (0 means 256)
  e.writeUInt8(size === 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette count
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // color planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(buf.length, 8); // size of image data
  e.writeUInt32LE(offset, 12); // offset of image data
  entries.push(e);
  offset += buf.length;
}

const ico = Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
const out = new URL("../app/favicon.ico", import.meta.url);
await writeFile(out, ico);

console.log(
  `wrote app/favicon.ico — ${ico.length} bytes, sizes: ${pngs.map((p) => `${p.size}×${p.size} (${p.buf.length}B)`).join(", ")}`,
);
