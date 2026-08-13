/**
 * Homepage FAQ content. Lives here rather than inside the client component so
 * server components can read it for FAQPage structured data — importing a
 * value from a "use client" module into a server component yields a client
 * reference stub, not the data.
 *
 * Answers must stay consistent with lib/services.ts pricing: Google treats
 * FAQ schema that contradicts on-page or sitewide content as untrustworthy.
 */
export const FAQ_ITEMS = [
  {
    q: "What does an engagement cost?",
    a: "Motion and 3D work starts at $20k, brand identity at $35k, marketing sites at $45k, and embedded product design at $50k per month, booked by the quarter. Every service has three package tiers — we scope fixed-fee wherever possible, so you know the number before we start, not after.",
  },
  {
    q: "How long does a typical project take?",
    a: "A brand and site together usually run 8–12 weeks. Product design is ongoing — most clients engage us for a quarter at a time, with two-week working cycles inside it.",
  },
  {
    q: "Who actually works on our project?",
    a: "The four people on this page. We don’t sell you partners and staff you with juniors — whoever you meet in the first call is who does the work.",
  },
  {
    q: "Can you work with our in-house team?",
    a: "Yes, and it usually goes best that way. We embed in your rituals — your standups, your Figma, your Slack — and leave behind a design system your team can run without us.",
  },
  {
    q: "How do we start?",
    a: "Email hello@xarktech.com with a couple of lines about what you’re building. We’ll book a 30-minute intro call, and if it’s a fit you’ll have a scoped proposal within a week.",
  },
];
