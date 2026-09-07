import type { NextConfig } from "next";

/**
 * Content-Security-Policy notes — read before tightening:
 *
 * - `script-src` needs 'unsafe-inline' because Next.js inlines its bootstrap
 *   and RSC flight payload, and the JSON-LD blocks are inline <script> tags.
 *   Removing it requires a nonce issued per request from middleware; that is a
 *   deliberate change, not a config tweak.
 * - `'unsafe-eval'` is required by the WebGL stack (three.js compiles shader
 *   and material code at runtime). Dropping it breaks the hero on the homepage.
 * - `va.vercel-scripts.com` is Vercel Web Analytics; `blob:` covers the worker
 *   and canvas output three.js creates.
 * - `frame-ancestors 'none'` is the modern equivalent of X-Frame-Options, which
 *   is also sent below for older browsers that ignore CSP.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "worker-src 'self' blob:",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  // Legacy clickjacking protection for browsers that ignore frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No feature on this site needs these, so deny them outright.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Hosts terminate TLS, but sending this ourselves means it survives a move.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Hide the framework fingerprint.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
