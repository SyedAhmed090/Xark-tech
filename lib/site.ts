import type { Metadata } from "next";

/**
 * Single source of truth for anything that changes when the business does.
 * Previously the origin was duplicated across layout, robots, sitemap and the
 * JSON-LD block — which is how three of them ended up on the wrong domain.
 */
export const SITE = {
  /** Production origin, no trailing slash. */
  url: "https://xarktech.com",
  name: "Xark Tech",
  tagline: "Design your small business can afford",
  email: "info@xarktech.com",
  description:
    "Logos, websites and branding for small businesses. Fixed prices published on the page, full file ownership on every package, and a delivery date before you pay. Based in Sheridan, WY.",
  /** Shorter variant for social cards, where long text is truncated. */
  shortDescription:
    "Logos from $99 and websites from $399 for small businesses — fixed prices, full ownership, no sales calls.",
  /**
   * No foundingDate: the previous value (2014) was not verified, and an
   * unverifiable date asserted in JSON-LD is a claim to search engines rather
   * than decoration. Add a real one here and the layout emits it again.
   */
  founder: "Syed Ahmed",
  locale: "en_US",
  address: {
    locality: "Sheridan",
    region: "WY",
    country: "US",
    street: "30 N Gould St Ste R",
    postalCode: "82801",
  },
  phone: "+13074009487" as string | null,
  /**
   * Verified profile URLs for JSON-LD `sameAs` and the footer. Deliberately
   * empty: the previous values pointed at platform homepages rather than real
   * profiles, which asserts a false entity relationship to search engines.
   * Add real profile URLs here and both surfaces pick them up.
   */
  socials: [] as { label: string; href: string }[],
  /**
   * tawk.to live chat. Both values come from the embed snippet tawk gives you:
   * Administration → Channels → Chat Widget shows a URL of the form
   * https://embed.tawk.to/<propertyId>/<widgetId>.
   *
   * Empty means no widget renders at all — see components/Chat.tsx. These are
   * public identifiers, not secrets: they appear in the page source of every
   * site running tawk, which is why they live here rather than in an env var
   * a static export could not read at runtime anyway.
   */
  chat: {
    /** TODO(launch): tawk.to property id. */
    propertyId: "",
    /** TODO(launch): tawk.to widget id, usually "default". */
    widgetId: "",
  },
} as const;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = "/") {
  return new URL(path, SITE.url).toString();
}

/**
 * Per-page metadata with a self-referencing canonical. Every indexable page
 * should use this — duplicate content without canonicals is the single most
 * common way a small site splits its own ranking signals.
 */
export function pageMeta({
  title,
  description,
  path,
  images,
}: {
  /** Page title without the site suffix — the template adds it. */
  title: string;
  description: string;
  /** Site-relative path, e.g. "/packages". */
  path: string;
  images?: string[];
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      url: path,
      siteName: SITE.name,
      locale: SITE.locale,
      type: "website",
      ...(images ? { images } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE.name}`,
      description,
      ...(images ? { images } : {}),
    },
  };
}

/**
 * Pages that exist for humans but shouldn't compete in search results.
 * Takes the path so the canonical is self-referencing — without it these pages
 * inherit the root layout's "/" canonical, which points search engines at the
 * homepage while also telling them not to index, a contradictory signal.
 */
export function noindexPage(path: string): Metadata {
  return {
    robots: { index: false, follow: false },
    alternates: { canonical: path },
  };
}

/** The organization node other schema blocks reference instead of restating. */
export const ORG_REF = { "@id": `${SITE.url}/#organization` };

/**
 * BreadcrumbList for a nested page. Gives search results the hierarchical
 * path instead of a bare URL, and helps crawlers understand site structure.
 * Always start the trail at the homepage.
 */
export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
