// Static export: metadata routes must opt in explicitly or the build
// aborts with "dynamic not configured". See next.config.ts.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE, absoluteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Demo pages are interactive props for the case studies, not content.
      disallow: "/demo",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
