#!/usr/bin/env node
/**
 * Copies everything in deploy/ into the static export at out/, producing a
 * single directory whose contents go straight into public_html.
 *
 * This exists because `next build` only emits the exported site. The Apache
 * config and the PHP form endpoints are deployment artifacts, not part of the
 * Next app, so they live in deploy/ and are merged in afterwards. Running the
 * copy in a script rather than by hand means a deploy can never go out with a
 * stale .htaccess or a missing endpoint.
 *
 * Wired into `npm run build`, so `out/` is always complete.
 */

import { cp, access, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const source = path.join(root, "deploy");
const target = path.join(root, "out");

async function exists(dir) {
  try {
    await access(dir, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Skip entirely on Vercel (used as a preview environment for reviewing changes
 * before they go to cPanel). Vercel has no Apache and no PHP, so .htaccess is
 * inert there and the .php files would be served as plain text — publishing
 * their source. Nothing secret lives in them today, but that stops being true
 * the moment SMTP credentials are added, and a preview host is the wrong place
 * to find that out.
 */
if (process.env.VERCEL) {
  console.log("prepare-deploy: VERCEL detected — skipping Apache/PHP artifacts.");
  process.exit(0);
}

if (!(await exists(target))) {
  console.error(
    "prepare-deploy: out/ not found. Run `next build` with output: \"export\" first."
  );
  process.exit(1);
}

if (!(await exists(source))) {
  console.error("prepare-deploy: deploy/ not found — nothing to copy.");
  process.exit(1);
}

// recursive + dereference so symlinks become real files on the server, and
// force so a rebuild overwrites the previous copy rather than failing.
await cp(source, target, {
  recursive: true,
  dereference: true,
  force: true,
});

const copied = await readdir(source, { recursive: true });
console.log(
  `prepare-deploy: merged ${copied.length} entries from deploy/ into out/`
);

// The .htaccess is the piece most likely to go missing (dotfiles get dropped
// by some copy tools and archive settings), and the site loses every security
// header without it — so fail loudly rather than shipping a silent downgrade.
if (!(await exists(path.join(target, ".htaccess")))) {
  console.error("prepare-deploy: .htaccess missing from out/ after copy.");
  process.exit(1);
}

console.log("prepare-deploy: out/ is ready to upload to public_html.");
