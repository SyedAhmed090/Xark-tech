export type Package = {
  name: string;
  /** One line on who this tier is for — sits under the name. */
  summary: string;
  /** Display price, e.g. "$199" or "$99 / month". */
  price: string;
  /**
   * Numeric price in USD. Kept alongside the display string so JSON-LD can
   * emit a real Offer price — search engines can't parse "$99 / month", and
   * a priced Offer is what makes a package eligible for rich results.
   */
  priceUsd: number;
  /** Absent means one-time. "month" renders and bills as a subscription. */
  interval?: "month";
  /**
   * Deliberately no `originalPrice`. The promotional catalogue this ladder
   * absorbed carried a crossed-out list price on every tier, which is the
   * discount theatre the rest of the site is positioned against — a permanent
   * "was" price that was never charged is not a saving, and it undercuts the
   * one thing we ask buyers to trust: that the number is the number. Bundles
   * do show a saving, but against the real sum of tiers sold on this site.
   */
  duration: string;
  /** Scope for this tier. Each tier is additive over the one before it. */
  includes: string[];
  /** The tier we steer most clients toward — rendered on ink. */
  featured?: boolean;
};

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  rhythm: { title: string; detail: string }[];
  duration: string;
  /** Entry price — matches the first package tier. */
  price: string;
  /**
   * Which intake form a purchase routes to. There is no checkout: the buyer
   * fills the brief for what they bought and it arrives by email, which is
   * also how the production team gets its instructions.
   */
  briefType: "logo" | "website" | "general";
  packages: Package[];
  related: string[]; // project slugs
};

/**
 * A bundle is the same work sold as one decision instead of three. New
 * businesses don't know they need a logo *and* a site *and* a Google profile
 * until someone tells them, so the bundles carry the homepage and the
 * individual services exist for people who already know what they want.
 */
export type Bundle = {
  slug: string;
  name: string;
  /** The job the buyer is actually hiring this to do. */
  summary: string;
  price: string;
  priceUsd: number;
  /**
   * The tiers this bundle is made of, by service slug and tier name. The list
   * price is summed from these rather than typed out, because a hand-written
   * total silently goes stale the moment a component tier is repriced — which
   * it already did once, leaving every advertised saving wrong.
   */
  components: { service: string; tier: string; months?: number }[];
  duration: string;
  includes: string[];
  briefType: Service["briefType"];
  featured?: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "logo-design",
    name: "Logo & brand identity",
    tagline: "A logo you own outright, in every file you'll ever need.",
    description:
      "Most cheap logo services hand you a low-resolution JPEG and charge extra for the files a printer, sign-maker, or app store will actually accept. We don't. Every tier — including the $99 one — ships the full vector set: AI, EPS, SVG, PDF, PNG and JPG, in colour, black, and reversed. You own all of it, and there is no fee to remove our name from anything.",
    deliverables: [
      "Original logo concepts",
      "Full vector file set (AI, EPS, SVG, PDF)",
      "Web formats (PNG, JPG, favicon)",
      "Colour, black and reversed versions",
      "Usage guide",
      "Full ownership, no credit fee",
    ],
    rhythm: [
      {
        title: "Day 1",
        detail:
          "You fill in the logo brief — business, audience, what you like and what you can't stand. No call required unless you want one.",
      },
      {
        title: "Days 2–3",
        detail:
          "Concepts come back. You pick a direction and tell us what to change, in plain language.",
      },
      {
        title: "Days 4–5",
        detail:
          "Revisions, then the final file pack lands in your inbox with everything unlocked.",
      },
    ],
    duration: "3–5 days",
    price: "From $99",
    briefType: "logo",
    packages: [
      {
        name: "Starter",
        summary:
          "A new business that needs a real logo today, not a placeholder.",
        price: "$99",
        priceUsd: 99,
        duration: "3 days",
        includes: [
          "3 original concepts",
          "2 revision rounds",
          "Full vector file set — AI, EPS, SVG, PDF",
          "Web formats and favicon",
          "Full ownership",
        ],
      },
      {
        name: "Startup",
        summary:
          "A little more range to choose from, and room to change your mind.",
        price: "$149",
        priceUsd: 149,
        duration: "3 days",
        includes: [
          "Everything in Starter",
          "4 original concepts",
          "5 revision rounds",
          "Two designers on the brief",
        ],
      },
      {
        name: "Business",
        summary:
          "The one most clients pick — the logo plus the pieces you need the week after.",
        price: "$199",
        priceUsd: 199,
        duration: "4 days",
        featured: true,
        includes: [
          "Everything in Starter",
          "6 original concepts",
          "Unlimited revisions for 14 days",
          "Colour, black and reversed versions",
          "Social profile and cover set",
          "One-page usage guide",
        ],
      },
      {
        name: "Illustrated",
        summary:
          "A drawn mark — a character, crest or scene — when a wordmark won't carry it.",
        price: "$249",
        priceUsd: 249,
        duration: "5–7 days",
        includes: [
          "Everything in Business",
          "2 custom illustrated concepts",
          "Hand-drawn detail work",
          "Simplified version for small sizes",
        ],
      },
      {
        name: "Brand Kit",
        summary:
          "A logo plus the print and identity basics, so everything matches.",
        price: "$399",
        priceUsd: 399,
        duration: "5–7 days",
        includes: [
          "Everything in Business",
          "10 original concepts",
          "Colour and typography system",
          "Business card, letterhead and envelope",
          "Email signature",
          "Icon set",
        ],
      },
      {
        name: "Complete Identity",
        summary:
          "For a rebrand, or a business that needs to look established from day one.",
        price: "$899",
        priceUsd: 899,
        duration: "10–14 days",
        includes: [
          "Everything in Brand Kit",
          "Unlimited concepts",
          "Tagline and naming support",
          "Brand guidelines PDF",
          "Launch asset kit",
          "Animated logo for social and video",
        ],
      },
    ],
    related: ["forma-studio", "meridian"],
  },
  {
    slug: "web-design",
    name: "Website design & build",
    tagline: "A site that loads fast, ranks, and asks for the sale.",
    description:
      "Built on a content system you can update yourself, so you're never paying us to change a phone number. Every build ships mobile-first, tested on real devices, with the technical SEO already in place — page titles, descriptions, structured data, sitemap and Google Search Console connected before you go live. Hosting and domain guidance included; you own the accounts.",
    deliverables: [
      "Custom design, mobile-first",
      "Content management system",
      "Contact and lead capture forms",
      "On-page and technical SEO",
      "Google Business Profile setup",
      "Analytics and Search Console",
    ],
    rhythm: [
      {
        title: "Days 1–2",
        detail:
          "Website brief in, sitemap and page plan agreed. You send content, or we write it.",
      },
      {
        title: "Days 3–6",
        detail:
          "Design comes back as real pages you can click through on your phone, not flat mockups.",
      },
      {
        title: "Days 7–10",
        detail:
          "Revisions, testing across devices, then launch on your domain with everything connected.",
      },
    ],
    duration: "7–14 days",
    price: "From $399",
    briefType: "website",
    packages: [
      {
        name: "Starter Site",
        summary: "Three pages that make you findable and contactable. Fast.",
        price: "$399",
        priceUsd: 399,
        duration: "7 days",
        includes: [
          "3 pages",
          "Mobile-first responsive design",
          "Contact form",
          "Basic on-page SEO",
          "Google Analytics",
        ],
      },
      {
        name: "Business Site",
        summary:
          "The standard small-business site — pages for every service, plus a blog.",
        price: "$799",
        priceUsd: 799,
        duration: "10 days",
        featured: true,
        includes: [
          "Everything in Starter",
          "6 pages",
          "Content management system",
          "Blog",
          "Google Business Profile setup",
          "Search Console and sitemap",
          "1 month of Website Care included",
        ],
      },
      {
        name: "Pro Site",
        summary:
          "More pages, booking or quote capture, and a proper speed and SEO pass.",
        price: "$1,099",
        priceUsd: 1099,
        duration: "14 days",
        includes: [
          "Everything in Business",
          "12 pages",
          "Booking or quote request system",
          "Speed optimisation pass",
          "Structured data markup",
          "Copywriting for every page",
          "3 months of Website Care included",
        ],
      },
      {
        name: "Advanced Site",
        summary:
          "More pages, written for you, and the integrations a busy business needs.",
        price: "$1,699",
        priceUsd: 1699,
        duration: "18 days",
        includes: [
          "Everything in Pro",
          "18 pages",
          "Copywriting for every page",
          "CRM or email-marketing integration",
          "Multi-step enquiry forms",
        ],
      },
      {
        name: "Corporate Site",
        summary:
          "Multiple locations or service areas, each with its own page that ranks.",
        price: "$2,499",
        priceUsd: 2499,
        duration: "25 days",
        includes: [
          "Everything in Advanced",
          "30 pages",
          "Location and service-area pages",
          "Advanced schema markup",
          "Staff or team directory",
          "6 months of Website Care included",
        ],
      },
      {
        name: "Custom Build",
        summary:
          "Portals, integrations, or anything that needs to talk to another system.",
        price: "From $3,999",
        priceUsd: 3999,
        duration: "Quoted",
        includes: [
          "Everything in Pro",
          "Custom functionality",
          "Third-party integrations",
          "User accounts or portal",
          "Dedicated project manager",
        ],
      },
    ],
    related: ["forma-studio", "atlas-freight"],
  },
  {
    slug: "ecommerce",
    name: "Online stores",
    tagline: "Start selling without a six-month build.",
    description:
      "Shopify or WooCommerce, set up properly: products loaded, payments live, shipping and tax configured, and the abandoned-cart email switched on before launch. You get the admin login and a walkthrough recording, so adding a product doesn't mean raising a support ticket.",
    deliverables: [
      "Shopify or WooCommerce build",
      "Product upload and organisation",
      "Payment gateway setup",
      "Shipping and tax configuration",
      "Abandoned cart recovery",
      "Admin training walkthrough",
    ],
    rhythm: [
      {
        title: "Days 1–3",
        detail:
          "Platform chosen, store structure and categories agreed, product data collected.",
      },
      {
        title: "Days 4–10",
        detail:
          "Store built and designed, products loaded, payments and shipping configured and tested.",
      },
      {
        title: "Days 11–14",
        detail:
          "Test orders end to end, then launch with your walkthrough recording.",
      },
    ],
    duration: "10–21 days",
    price: "From $1,299",
    briefType: "website",
    packages: [
      {
        name: "Starter Store",
        summary: "A first store, with a tight product range.",
        price: "$1,299",
        priceUsd: 1299,
        duration: "10 days",
        includes: [
          "Shopify or WooCommerce setup",
          "Up to 25 products",
          "Payment gateway",
          "Shipping and tax setup",
          "Mobile-optimised checkout",
        ],
      },
      {
        name: "Online Store",
        summary: "A full catalogue with the recovery and trust pieces in place.",
        price: "$1,999",
        priceUsd: 1999,
        duration: "14 days",
        featured: true,
        includes: [
          "Everything in Starter Store",
          "Up to 50 products",
          "Custom design",
          "Abandoned cart recovery",
          "Product reviews",
          "Discount and promotion setup",
          "3 months of Care+ included",
        ],
      },
      {
        name: "Advanced Store",
        summary:
          "Larger catalogues, subscriptions, or selling in more than one place.",
        price: "$3,499",
        priceUsd: 3499,
        duration: "21 days",
        includes: [
          "Everything in Online Store",
          "Unlimited products",
          "Subscriptions or bookings",
          "Multi-channel selling",
          "Inventory sync",
          "Custom integrations",
        ],
      },
    ],
    related: ["forma-studio"],
  },
  {
    slug: "video-animation",
    name: "Video & animation",
    tagline: "Explain what you do in sixty seconds.",
    description:
      "Scripted, voiced and animated explainers for the top of your homepage, your ads, or your social feed. We're straight about how they're made: the entry tier uses AI-assisted storyboarding and first-pass animation, finished by a human. The top tier is bespoke throughout, with no AI in the final cut. Both are priced accordingly.",
    deliverables: [
      "Script writing",
      "Storyboard",
      "Professional voice-over",
      "Animation and motion graphics",
      "Music and sound effects",
      "Delivery in every aspect ratio you need",
    ],
    rhythm: [
      {
        title: "Days 1–3",
        detail: "Brief in, script written and approved before anything moves.",
      },
      {
        title: "Days 4–8",
        detail: "Storyboard, then voice-over recorded against the approved script.",
      },
      {
        title: "Days 9–14",
        detail: "Animation, sound design, revisions, final delivery.",
      },
    ],
    duration: "7–21 days",
    price: "From $399",
    briefType: "general",
    packages: [
      {
        name: "Explainer 30",
        summary: "A short, clear thirty seconds for your homepage or an ad.",
        price: "$399",
        priceUsd: 399,
        duration: "7 days",
        includes: [
          "30 second video",
          "Script writing",
          "Professional voice-over",
          "Music and sound effects",
          "HD delivery",
          "2 revision rounds",
        ],
      },
      {
        name: "Explainer 60",
        summary: "A full minute — enough to explain something that needs explaining.",
        price: "$799",
        priceUsd: 799,
        duration: "14 days",
        featured: true,
        includes: [
          "Everything in Explainer 30",
          "60 second video",
          "Custom illustrated characters",
          "Unlimited revisions for 14 days",
          "Square and vertical cuts for social",
        ],
      },
      {
        name: "Premium 90",
        summary:
          "Bespoke throughout. No AI in the final cut, and the source files are yours.",
        price: "$1,299",
        priceUsd: 1299,
        duration: "21 days",
        includes: [
          "Everything in Explainer 60",
          "90 second video",
          "Fully bespoke animation",
          "4K delivery",
          "Every aspect ratio",
          "Source files included",
        ],
      },
    ],
    related: ["loop-health"],
  },
  {
    slug: "website-care",
    name: "Website care",
    tagline: "Someone whose job it is to keep your site up.",
    description:
      "Updates, backups, security and small changes, handled on a schedule instead of whenever something breaks. Every plan includes real human time each month for the edits you'd otherwise put off — a new phone number, swapped photos, updated opening hours. Cancel any month; we don't hold your site hostage.",
    deliverables: [
      "Core, theme and plugin updates",
      "Daily offsite backups",
      "Security scanning and malware removal",
      "Uptime monitoring",
      "Monthly content edits",
      "Monthly report",
    ],
    rhythm: [
      {
        title: "Week 1",
        detail:
          "We audit the site, take a full backup, and fix anything already broken.",
      },
      {
        title: "Monthly",
        detail:
          "Updates applied on staging first, security scan, speed check, and your included edit time.",
      },
      {
        title: "Anytime",
        detail: "Email us a change. Cancel whenever — no notice period.",
      },
    ],
    duration: "Monthly, cancel anytime",
    price: "From $99 / month",
    briefType: "general",
    packages: [
      {
        name: "Care",
        summary: "A brochure or business site that needs to stay up and current.",
        price: "$99 / month",
        priceUsd: 99,
        interval: "month",
        duration: "Monthly",
        includes: [
          "Updates tested on staging",
          "Daily offsite backups",
          "Weekly security scans",
          "Uptime monitoring",
          "30 minutes of edits each month",
          "48 hour response",
        ],
      },
      {
        name: "Care+",
        summary: "A store, where an hour of downtime is lost money.",
        price: "$199 / month",
        priceUsd: 199,
        interval: "month",
        duration: "Monthly",
        featured: true,
        includes: [
          "Everything in Care",
          "Checkout and payment monitoring",
          "Plugin compatibility testing before updates",
          "Order-safe backups",
          "1 hour of edits each month",
          "24 hour priority response",
        ],
      },
      {
        name: "Priority",
        summary: "Custom builds and anything with an integration that can break.",
        price: "$449 / month",
        priceUsd: 449,
        interval: "month",
        duration: "Monthly",
        includes: [
          "Everything in Care+",
          "3 hours of developer time each month",
          "Server and dependency management",
          "API and integration monitoring",
          "Same business day response",
          "Monthly call",
        ],
      },
    ],
    related: ["atlas-freight"],
  },
  {
    slug: "local-seo",
    name: "Local SEO",
    tagline: "Get found by the people already looking for you.",
    description:
      "Most small businesses don't need national rankings — they need to appear when someone nearby searches for what they sell. We optimise your Google Business Profile, fix the citations that disagree about your address, build the pages that answer local search queries, and report on calls and directions, not vanity keyword positions.",
    deliverables: [
      "Google Business Profile optimisation",
      "Local citation cleanup",
      "Keyword research and mapping",
      "On-page optimisation",
      "Review generation strategy",
      "Monthly reporting",
    ],
    rhythm: [
      {
        title: "Month 1",
        detail:
          "Full audit, Google Business Profile fixed, citations corrected, technical issues cleared.",
      },
      {
        title: "Months 2–3",
        detail:
          "Location and service pages built and optimised, review strategy running.",
      },
      {
        title: "Ongoing",
        detail:
          "Content, monitoring, and a monthly report on calls, directions and enquiries.",
      },
    ],
    duration: "3 month minimum",
    price: "From $299 / month",
    briefType: "general",
    packages: [
      {
        name: "Local Starter",
        summary: "One location that needs to show up on the map.",
        price: "$299 / month",
        priceUsd: 299,
        interval: "month",
        duration: "Monthly",
        includes: [
          "Google Business Profile optimisation",
          "15 target keywords",
          "Citation cleanup",
          "On-page optimisation",
          "Monthly report",
        ],
      },
      {
        name: "Growth",
        summary: "Competing for searches beyond your own business name.",
        price: "$599 / month",
        priceUsd: 599,
        interval: "month",
        duration: "Monthly",
        featured: true,
        includes: [
          "Everything in Local Starter",
          "40 target keywords",
          "2 optimised pages each month",
          "2 blog posts each month",
          "Competitor tracking",
          "Review generation",
          "Monthly strategy call",
        ],
      },
      {
        name: "Authority",
        summary: "Multiple locations, or a competitive market you need to win.",
        price: "$1,199 / month",
        priceUsd: 1199,
        interval: "month",
        duration: "Monthly",
        includes: [
          "Everything in Growth",
          "80 target keywords",
          "Multi-location optimisation",
          "Link building",
          "4 blog posts each month",
          "AI search visibility tracking",
        ],
      },
    ],
    related: ["meridian"],
  },
  {
    slug: "social-media",
    name: "Social media",
    tagline: "Show up consistently without doing it yourself.",
    description:
      "Designed posts, written captions, scheduled and published on the platforms your customers actually use. You approve a month at a time from a shared calendar, so nothing goes out that you haven't seen. Reporting covers reach, engagement and — where we can attribute it — enquiries.",
    deliverables: [
      "Content calendar",
      "Custom post design",
      "Caption writing and hashtag research",
      "Scheduling and publishing",
      "Community management",
      "Monthly reporting",
    ],
    rhythm: [
      {
        title: "Week 1",
        detail:
          "Profile audit, templates designed in your brand, first calendar built.",
      },
      {
        title: "Monthly",
        detail:
          "Calendar shared for approval, posts scheduled, comments and messages handled.",
      },
      {
        title: "Month end",
        detail: "Report on reach, engagement and enquiries, then plan the next month.",
      },
    ],
    duration: "3 month minimum",
    price: "From $299 / month",
    briefType: "general",
    packages: [
      {
        name: "Social Starter",
        summary: "Two platforms, posted consistently.",
        price: "$299 / month",
        priceUsd: 299,
        interval: "month",
        duration: "Monthly",
        includes: [
          "2 platforms",
          "12 posts each month",
          "Custom designed graphics",
          "Caption and hashtag writing",
          "Scheduling",
          "Monthly report",
        ],
      },
      {
        name: "Social Growth",
        summary: "More platforms, more posts, and short video in the mix.",
        price: "$699 / month",
        priceUsd: 699,
        interval: "month",
        duration: "Monthly",
        featured: true,
        includes: [
          "Everything in Social Starter",
          "4 platforms",
          "20 posts each month",
          "4 short videos or Reels",
          "Stories each week",
          "Daily community management",
          "Monthly strategy call",
        ],
      },
      {
        name: "Social Pro",
        summary: "A full content operation, including video production.",
        price: "$1,499 / month",
        priceUsd: 1499,
        interval: "month",
        duration: "Monthly",
        includes: [
          "Everything in Social Growth",
          "5+ platforms",
          "30+ posts each month",
          "Full short-form video production",
          "Influencer outreach",
          "Paid promotion management",
          "Dedicated account manager",
        ],
      },
    ],
    related: ["loop-health"],
  },
];

/**
 * Homepage best sellers. Priced below the sum of their parts, because the
 * saving is the reason to decide today instead of buying one piece now and
 * the rest "later" — which usually means never.
 */
export const BUNDLES: Bundle[] = [
  {
    slug: "open-for-business",
    name: "Open for Business",
    summary:
      "Everything a new business needs to open its doors: a logo, a site, and a Google listing that shows up.",
    price: "$849",
    priceUsd: 849,
    components: [
      { service: "logo-design", tier: "Business" },
      { service: "web-design", tier: "Business Site" },
    ],
    duration: "14 days",
    featured: true,
    briefType: "website",
    includes: [
      "Business logo — 6 concepts, full vector files",
      "Business Site — 6 pages with a CMS and blog",
      "Google Business Profile set up and verified",
      "Business email on your own domain",
      "1 month of Website Care",
    ],
  },
  {
    slug: "store-launch",
    name: "Store Launch",
    summary:
      "A brand and a working shop, from nothing to taking your first order.",
    price: "$2,299",
    priceUsd: 2299,
    components: [
      { service: "logo-design", tier: "Business" },
      { service: "ecommerce", tier: "Online Store" },
      { service: "website-care", tier: "Care+", months: 3 },
    ],
    duration: "21 days",
    briefType: "website",
    includes: [
      "Business logo — 6 concepts, full vector files",
      "Online Store — 50 products, custom design",
      "Payments, shipping and tax configured",
      "Abandoned cart recovery",
      "3 months of Care+",
    ],
  },
  {
    slug: "complete-brand-launch",
    name: "Complete Brand Launch",
    summary:
      "For a rebrand or a serious launch — the full identity, a twelve-page site, and three months of getting found.",
    price: "$1,999",
    priceUsd: 1999,
    components: [
      { service: "logo-design", tier: "Brand Kit" },
      { service: "web-design", tier: "Pro Site" },
      { service: "website-care", tier: "Care", months: 3 },
      { service: "local-seo", tier: "Local Starter", months: 3 },
    ],
    duration: "21 days",
    briefType: "website",
    includes: [
      "Brand Kit — logo, colour and type system, stationery",
      "Pro Site — 12 pages, booking system, speed and SEO pass",
      "3 months of Website Care",
      "3 months of Local SEO",
      "Google Business Profile and Search Console",
    ],
  },
];

/**
 * Identifies a tier in the `?package=` parameter the brief form reads.
 *
 * "+" is spelled out rather than stripped: a naive slugify turns both "Care"
 * and "Care+" into "care", so the two Website Care tiers collided and the
 * brief arrived naming the wrong plan — silently, since a wrong-but-valid
 * value looks exactly like a right one.
 */
export function packageParam(serviceSlug: string, tierName: string) {
  const tier = tierName
    .toLowerCase()
    .replace(/\+/g, "-plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${serviceSlug}-${tier}`;
}

/**
 * Guards the rule above. Two tiers resolving to one parameter is invisible in
 * the UI and only shows up as a production order for the wrong package, so it
 * fails the build instead.
 */
for (const service of SERVICES) {
  const params = service.packages.map((p) => packageParam(service.slug, p.name));
  const duplicates = params.filter((p, i) => params.indexOf(p) !== i);
  if (duplicates.length) {
    throw new Error(
      `Duplicate package parameter in "${service.slug}": ${[...new Set(duplicates)].join(", ")}`,
    );
  }
}

/**
 * Cheapest package anywhere on the site, formatted for display. Derived rather
 * than typed out: the entry price appears on several pages, and a hardcoded
 * copy is how the old "$20k" survived three price changes.
 */
export const ENTRY_PRICE = `$${Math.min(
  ...SERVICES.flatMap((s) => s.packages.map((p) => p.priceUsd)),
).toLocaleString("en-US")}`;

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getBundle(slug: string) {
  return BUNDLES.find((b) => b.slug === slug);
}

/** What the bundle's parts cost bought separately on this same site. */
export function bundleListUsd(bundle: Bundle) {
  return bundle.components.reduce((total, part) => {
    const service = getService(part.service);
    const tier = service?.packages.find((p) => p.name === part.tier);
    if (!tier) {
      throw new Error(
        `Bundle "${bundle.slug}" references missing tier ${part.service}/${part.tier}`,
      );
    }
    return total + tier.priceUsd * (part.months ?? 1);
  }, 0);
}

/** Saving on a bundle versus buying the tiers separately. */
export function bundleSaving(bundle: Bundle) {
  return bundleListUsd(bundle) - bundle.priceUsd;
}

/**
 * Every bundle must actually save money, or the struck-through list price is
 * a lie. Checked at module load so it fails the build, not the customer.
 */
for (const bundle of BUNDLES) {
  if (bundleSaving(bundle) <= 0) {
    throw new Error(
      `Bundle "${bundle.slug}" is not cheaper than its parts (${bundleListUsd(bundle)} vs ${bundle.priceUsd})`,
    );
  }
}
