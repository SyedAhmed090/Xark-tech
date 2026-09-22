// Static export: metadata routes must opt in explicitly or the build
// aborts with "dynamic not configured". See next.config.ts.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — ${SITE.tagline}`,
    short_name: SITE.name,
    description: SITE.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f6f2", // paper
    theme_color: "#101012", // ink — matches the browser chrome tint
    lang: "en-US",
    categories: ["business", "design"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
