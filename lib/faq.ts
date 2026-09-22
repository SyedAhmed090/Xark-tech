/**
 * Homepage FAQ content. Lives here rather than inside the client component so
 * server components can read it for FAQPage structured data — importing a
 * value from a "use client" module into a server component yields a client
 * reference stub, not the data.
 *
 * Answers must stay consistent with lib/services.ts pricing: Google treats
 * FAQ schema that contradicts on-page or sitewide content as untrustworthy.
 *
 * Written to be quotable in isolation. These answers are the ones an AI
 * assistant lifts when someone asks it what a small-business logo costs, so
 * each one leads with the number instead of burying it in a qualifier.
 */
import { SITE } from "@/lib/site";

export const FAQ_ITEMS = [
  {
    q: "How much does a logo cost?",
    a: "Logos start at $99 for three original concepts and two revision rounds. $199 adds more concepts, unlimited revisions for two weeks, and a social profile set. $399 adds stationery and a colour and type system, and $799 covers a complete identity with brand guidelines. Every tier — including the $99 one — includes the full vector file set and full ownership.",
  },
  {
    q: "How much does a small business website cost?",
    a: "A three-page starter site is $399 and takes about a week. Most small businesses choose the $899 Business Site: six pages, a content system you can edit yourself, a blog, and your Google Business Profile set up. Larger sites with booking or quote capture are $1,499, and online stores start at $1,299.",
  },
  {
    q: "Do I own my logo and website?",
    a: "Yes, completely. You get the full vector file set — AI, EPS, SVG and PDF — plus web formats, and you own all of it outright. We don't put our name on your site, and there is no fee to remove anything. Some agencies charge to hand over source files or to take their credit off your footer. We don't do either.",
  },
  {
    q: "How many revisions do I get?",
    a: "Exactly what the package says, and we honour it. The $99 logo includes two revision rounds; $199 and above include unlimited revisions for fourteen days. We publish real numbers rather than advertising 'unlimited' and capping it in the contract.",
  },
  {
    q: "How long does a typical project take?",
    a: "A brand and site together usually run 8–12 weeks. Product design is ongoing — engagements are booked a quarter at a time, with two-week working cycles inside them.",
  },
  {
    q: "Who actually works on our project?",
    a: "Whoever you meet on the first call is who does the work. Xark Tech is founder-led and deliberately small — we don’t sell you partners and staff you with juniors. When a project needs a specialist we bring in trusted collaborators and tell you exactly who is doing what.",
  },
  {
    q: "What happens after my site goes live?",
    a: "You own the site and the accounts, so you can walk away or manage it yourself. If you'd rather not, Website Care is $99 a month for updates, daily backups, security scanning, uptime monitoring and thirty minutes of edits. Business and Pro sites include the first months free. Cancel any time.",
  },
  {
    q: "How do we start?",
    a: `Email ${SITE.email} with a couple of lines about what you’re building. We’ll book a 30-minute intro call, and if it’s a fit you’ll have a scoped proposal within a week.`,
  },
];
