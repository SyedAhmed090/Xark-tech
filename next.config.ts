import type { NextConfig } from "next";

/**
 * The site is deployed as a static export to Apache on cPanel shared hosting,
 * which has no Node runtime. Two consequences worth knowing before editing:
 *
 * 1. There is no `headers()` block here any more. Static exports don't support
 *    it, so the CSP and every other security header now live in
 *    `deploy/.htaccess` and are merged into `out/` by scripts/prepare-deploy.mjs.
 *    Edit them there — changing this file will not affect what the server sends.
 *
 * 2. Image Optimization is off. It needs a Node server, so `next/image` runs
 *    unoptimized and ships the original files. Keep an eye on the weight of
 *    anything added to public/.
 *
 * Route handlers are also unsupported, which is why the contact and newsletter
 * endpoints are PHP files in deploy/api/ rather than app/api/ routes.
 */
const nextConfig: NextConfig = {
  output: "export",

  /**
   * Emits `work/meridian/index.html` instead of `work/meridian.html`, which is
   * what Apache's DirectoryIndex resolves without any rewrite rules. Without
   * this every clean URL would 404 on the server.
   */
  trailingSlash: true,

  images: { unoptimized: true },

  // Hide the framework fingerprint. Apache also unsets it in .htaccess, since
  // this setting only covers responses Next itself serves.
  poweredByHeader: false,
};

export default nextConfig;
