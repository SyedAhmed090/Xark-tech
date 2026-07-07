import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";
import { POSTS } from "@/lib/posts";

const BASE = "https://xark.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/work`, priority: 0.9 },
    { url: `${BASE}/studio`, priority: 0.8 },
    { url: `${BASE}/contact`, priority: 0.8 },
    { url: `${BASE}/journal`, priority: 0.7 },
    { url: `${BASE}/careers`, priority: 0.5 },
    { url: `${BASE}/privacy`, priority: 0.2 },
    { url: `${BASE}/terms`, priority: 0.2 },
    ...PROJECTS.map((p) => ({ url: `${BASE}/work/${p.slug}`, priority: 0.7 })),
    ...SERVICES.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      priority: 0.7,
    })),
    ...POSTS.map((p) => ({
      url: `${BASE}/journal/${p.slug}`,
      lastModified: p.date,
      priority: 0.6,
    })),
  ];
}
