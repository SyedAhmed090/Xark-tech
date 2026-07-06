export type Service = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  rhythm: { title: string; detail: string }[];
  duration: string;
  price: string;
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
    related: ["meridian", "forma-studio"],
  },
  {
    slug: "product-design",
    name: "Product design",
    tagline: "Interfaces designed around how people actually work.",
    description:
      "Research, interface design, and design systems for software teams — embedded in your rituals, shipping against your sprints. We design with your engineers, not at them, and we test with real users before anything is declared done.",
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
    duration: "Quarterly engagements",
    price: "From $60k / quarter",
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
    related: ["forma-studio", "meridian"],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
