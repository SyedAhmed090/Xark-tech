import type { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";
import { SERVICES } from "@/lib/services";

const BASE = "https://xark.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, priority: 1 },
    { url: `${BASE}/work`, priority: 0.9 },
    { url: `${BASE}/studio`, priority: 0.8 },
    { url: `${BASE}/contact`, priority: 0.8 },
    ...PROJECTS.map((p) => ({ url: `${BASE}/work/${p.slug}`, priority: 0.7 })),
    ...SERVICES.map((s) => ({
      url: `${BASE}/services/${s.slug}`,
      priority: 0.7,
    })),
  ];
}
