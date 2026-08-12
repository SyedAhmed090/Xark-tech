export type Package = {
  name: string;
  /** One line on who this tier is for — sits under the name. */
  summary: string;
  price: string;
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
  packages: Package[];
  related: string[]; // project slugs
};

export const SERVICES: Service[] = [
  {
    slug: "brand-identity",
    name: "Brand identity",
    tagline: "A point of view your market can’t unsee.",
    description:
      "Positioning, naming, and a visual system built to survive contact with the real world — pitch decks, app stores, trade-show booths, and the group chat where your customers talk about you. We design identities for companies that ship software, so everything works on a screen first.",
    deliverables: [
      "Positioning & messaging",
      "Naming",
      "Logo & visual identity",
      "Type & color systems",
      "Voice & tone guidelines",
      "Launch asset kit",
    ],
    rhythm: [
      {
        title: "Weeks 1–2",
        detail:
          "Stakeholder interviews, competitor teardown, and a positioning workshop. We leave with the one sentence everything else must serve.",
      },
      {
        title: "Weeks 3–5",
        detail:
          "Two identity directions, tested against real applications — your product UI, your deck, your social — never on a blank artboard.",
      },
      {
        title: "Weeks 6–8",
        detail:
          "The chosen direction built out into a full system with guidelines your team and vendors can actually follow.",
      },
    ],
    duration: "6–8 weeks",
    price: "From $35k",
    packages: [
      {
        name: "Essential",
        summary:
          "One product, one market. The identity you need to launch and look credible.",
        price: "$35k",
        duration: "6 weeks",
        includes: [
          "Positioning & messaging",
          "Logo & core visual identity",
          "Type & color systems",
          "One-page usage guide",
        ],
      },
      {
        name: "Studio",
        summary:
          "The full system, tested against every place your brand actually shows up.",
        price: "$60k",
        duration: "8–10 weeks",
        featured: true,
        includes: [
          "Everything in Essential",
          "Naming & verbal identity",
          "Voice & tone guidelines",
          "Launch asset kit",
          "Two identity directions, applied to real surfaces",
        ],
      },
      {
        name: "Partner",
        summary:
          "For companies rebranding a portfolio, or entering a second market.",
        price: "$95k",
        duration: "12 weeks +",
        includes: [
          "Everything in Studio",
          "Sub-brand & product naming architecture",
          "Motion identity",
          "Photography & illustration direction",
          "Two quarters of brand stewardship",
        ],
      },
    ],
    related: ["meridian", "forma-studio"],
  },
  {
    slug: "product-design",
    name: "Product design",
    tagline: "Interfaces designed around how people actually work.",
    description:
      "Research, interface design, and design systems for B2B software teams in fintech, healthcare, and logistics — embedded in your rituals, shipping against your sprints. One senior pod, one workstream: we design with your engineers, not at them, and we test with real users before anything is declared done.",
    deliverables: [
      "UX research & user interviews",
      "Journey mapping",
      "Interface design",
      "Prototyping & usability testing",
      "Design systems (Figma + code)",
      "Engineering handoff & QA",
    ],
    rhythm: [
      {
        title: "Every two weeks",
        detail:
          "A working cycle: research or design goal set Monday, tested prototype or shipped screens by Friday of week two.",
      },
      {
        title: "Every Friday",
        detail:
          "A working session in your Figma — not a presentation. You see the thinking mid-flight and steer early.",
      },
      {
        title: "Every quarter",
        detail:
          "A step back: what shipped, what the metrics say, and what the next quarter's design bets should be.",
      },
    ],
    duration: "Quarterly commitments",
    price: "From $50k / month",
    packages: [
      {
        name: "Essential",
        summary:
          "One senior designer embedded in one workstream, for a single quarter.",
        price: "$50k / month",
        duration: "One quarter",
        includes: [
          "Interface design against your sprints",
          "Fortnightly working cycles",
          "Figma library maintained as we go",
          "Engineering handoff & QA",
        ],
      },
      {
        name: "Studio",
        summary:
          "A senior pod — design plus research — running two quarters with your team.",
        price: "$75k / month",
        duration: "Two quarters",
        featured: true,
        includes: [
          "Everything in Essential",
          "UX research & user interviews",
          "Journey mapping",
          "Prototyping & usability testing",
          "Quarterly design-bet review",
        ],
      },
      {
        name: "Partner",
        summary:
          "We own design for the product. Annual commitment, multiple workstreams.",
        price: "$110k / month",
        duration: "Annual",
        includes: [
          "Everything in Studio",
          "Multiple parallel workstreams",
          "Design system in Figma + code",
          "Standing research cadence",
          "Roadmap input at the exec table",
        ],
      },
    ],
    related: ["loop-health", "atlas-freight"],
  },
  {
    slug: "web-design-build",
    name: "Web design & build",
    tagline: "Sites that load fast, rank well, and convert.",
    description:
      "Marketing sites, e-commerce, and editorial platforms — designed and engineered under one roof so nothing gets lost in a handoff. Performance budgets from day one, a CMS your team will actually use, and the animation restraint to stay fast.",
    deliverables: [
      "Site strategy & information architecture",
      "Design & art direction",
      "Next.js / Astro development",
      "CMS integration",
      "Performance & technical SEO",
      "Analytics & launch support",
    ],
    rhythm: [
      {
        title: "Weeks 1–3",
        detail:
          "Architecture, content model, and design direction — approved against real copy, not lorem ipsum.",
      },
      {
        title: "Weeks 4–8",
        detail:
          "Design and build run in parallel. A staging link exists from week four; you watch the site come alive, page by page.",
      },
      {
        title: "Weeks 9–12",
        detail:
          "Content load, QA across devices, performance pass, and launch — with a care plan so it stays fast after we leave.",
      },
    ],
    duration: "8–12 weeks",
    price: "From $45k",
    packages: [
      {
        name: "Essential",
        summary:
          "A marketing site that loads fast and says the right thing. Up to eight pages.",
        price: "$45k",
        duration: "8 weeks",
        includes: [
          "Site strategy & information architecture",
          "Design & art direction",
          "Next.js build, up to 8 pages",
          "Performance budget & technical SEO",
        ],
      },
      {
        name: "Studio",
        summary:
          "The full site, with a CMS your team will actually use and content we help load.",
        price: "$70k",
        duration: "10–12 weeks",
        featured: true,
        includes: [
          "Everything in Essential",
          "CMS integration & editor training",
          "Unlimited page templates",
          "Motion & interaction design",
          "Analytics & launch support",
        ],
      },
      {
        name: "Partner",
        summary:
          "E-commerce or editorial platforms, plus a care plan so it stays fast after launch.",
        price: "$110k",
        duration: "12 weeks + care plan",
        includes: [
          "Everything in Studio",
          "E-commerce or editorial platform build",
          "Localization & multi-region setup",
          "Ongoing performance monitoring",
          "Two quarters of iteration",
        ],
      },
    ],
    related: ["forma-studio", "meridian"],
  },
  {
    slug: "motion-3d",
    name: "Motion & 3D",
    tagline: "The layer that makes digital feel alive.",
    description:
      "Micro-interactions, WebGL, product films, and launch assets. Motion is a language, not a garnish — we use it to explain, to confirm, and occasionally to show off, always inside a performance budget.",
    deliverables: [
      "Interaction & motion design",
      "WebGL / Three.js experiences",
      "Product launch films",
      "Social & campaign assets",
      "Lottie / Rive animation libraries",
      "Motion guidelines & tokens",
    ],
    rhythm: [
      {
        title: "Week 1",
        detail:
          "Motion audit and art direction: what should move, why, and what it must never cost in load time.",
      },
      {
        title: "Weeks 2–4",
        detail:
          "Prototypes in the browser, not in After Effects — you review the real thing at real frame rates.",
      },
      {
        title: "Weeks 5–6",
        detail:
          "Production, optimization, and a handoff kit your engineers can extend without us.",
      },
    ],
    duration: "2–6 weeks",
    price: "From $20k",
    packages: [
      {
        name: "Essential",
        summary:
          "A focused motion pass — the handful of moments that carry the most weight.",
        price: "$20k",
        duration: "2 weeks",
        includes: [
          "Motion audit & art direction",
          "Interaction & motion design",
          "Browser prototypes at real frame rates",
          "Lottie / Rive handoff files",
        ],
      },
      {
        name: "Studio",
        summary:
          "WebGL and 3D work, built inside a performance budget your engineers can keep.",
        price: "$38k",
        duration: "4–6 weeks",
        featured: true,
        includes: [
          "Everything in Essential",
          "WebGL / Three.js experiences",
          "Motion guidelines & tokens",
          "Social & campaign assets",
          "Handoff kit your team can extend",
        ],
      },
      {
        name: "Partner",
        summary:
          "Launch films and a standing motion retainer for teams shipping continuously.",
        price: "$65k",
        duration: "Retained, per quarter",
        includes: [
          "Everything in Studio",
          "Product launch film",
          "Full animation library",
          "Quarterly motion refresh",
          "On-call for launch moments",
        ],
      },
    ],
    related: ["forma-studio", "meridian"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
