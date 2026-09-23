// Static export: metadata routes must opt in explicitly or the build
// aborts with "dynamic not configured". See next.config.ts.
export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { POSTS } from "@/lib/posts";
import { pageUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: pageUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: pageUrl("/work"), changeFrequency: "monthly", priority: 0.9 },
    { url: pageUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: pageUrl("/packages"), changeFrequency: "monthly", priority: 0.9 },
    { url: pageUrl("/studio"), changeFrequency: "yearly", priority: 0.8 },
    { url: pageUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: pageUrl("/journal"), changeFrequency: "weekly", priority: 0.7 },
    { url: pageUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: pageUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
    ...SERVICES.map((s) => ({
      url: pageUrl(`/services/${s.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...PROJECTS.map((p) => ({
      url: pageUrl(`/work/${p.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...POSTS.map((p) => ({
      url: pageUrl(`/journal/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
