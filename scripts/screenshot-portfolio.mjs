// One-off tool: screenshots the /demo/* pages into public/portfolio/*.png.
// Run with: node scripts/screenshot-portfolio.mjs
import { chromium } from "playwright";
import { spawn, execSync } from "node:child_process";
import { mkdir } from "node:fs/promises";

const PORT = 4173;
const TARGETS = [
  { slug: "meridian", viewport: { width: 1600, height: 1000 } },
  { slug: "loop-health", viewport: { width: 390, height: 844 } },
  { slug: "forma-studio", viewport: { width: 1600, height: 1000 } },
  { slug: "atlas-freight", viewport: { width: 1600, height: 1000 } },
];

function waitForServer(url, timeoutMs = 60_000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const attempt = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) return resolve();
      } catch {}
      if (Date.now() - start > timeoutMs) return reject(new Error("dev server did not start in time"));
      setTimeout(attempt, 500);
    };
    attempt();
  });
}

async function main() {
  await mkdir("public/portfolio", { recursive: true });

  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    stdio: "ignore",
    shell: true,
  });

  try {
    await waitForServer(`http://localhost:${PORT}/demo/meridian`);

    const browser = await chromium.launch();
    for (const { slug, viewport } of TARGETS) {
      const page = await browser.newPage({ viewport });
      await page.goto(`http://localhost:${PORT}/demo/${slug}`, { waitUntil: "networkidle" });
      // app/template.tsx plays a 0.7s ink-wipe transition on every route — let it finish.
      await page.waitForTimeout(1200);
      await page.screenshot({ path: `public/portfolio/${slug}.png` });
      await page.close();
      console.log(`captured ${slug}.png`);
    }
    await browser.close();
  } finally {
    // shell:true spawns a shell wrapping npx — server.kill() only kills the
    // shell, leaving the real next process (and the port) held open.
    if (process.platform === "win32") {
      try {
        execSync(`taskkill /pid ${server.pid} /T /F`);
      } catch {}
    } else {
      server.kill();
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
