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
    a: "Logos start at $99 for three original concepts and two revision rounds. $149 adds more concepts and revisions, $199 adds unlimited revisions for two weeks plus a social profile set, $249 covers an illustrated mark, $399 adds stationery and a colour and type system, and $899 is a complete identity with brand guidelines. Every tier — including the $99 one — includes the full vector file set and full ownership.",
  },
  {
    q: "How much does a small business website cost?",
    a: "A three-page starter site is $399 and takes about a week. Most small businesses choose the $799 Business Site: six pages, a content system you can edit yourself, a blog, and your Google Business Profile set up. A twelve-page site with booking or quote capture is $1,099, larger multi-location sites run to $2,499, and online stores start at $1,299.",
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
    a: "Logos take three to five days. A starter site is about a week, a business site ten days, and an online store two to three weeks. You get a delivery date when you submit your brief, not after.",
  },
  {
    q: "Who actually works on our project?",
    a: "A professional designer, briefed directly from what you write in the brief. Every concept is reviewed before it reaches you, and you deal with one point of contact throughout rather than being passed around.",
  },
  {
    q: "What happens after my site goes live?",
    a: "You own the site and the accounts, so you can walk away or manage it yourself. If you'd rather not, Website Care is $99 a month for updates, daily backups, security scanning, uptime monitoring and thirty minutes of edits. Business and Pro sites include the first months free. Cancel any time.",
  },
  {
    q: "How do we start?",
    a: `Pick a package and fill in the brief — it asks everything a call would, and work starts as soon as it lands. If you would rather talk first, chat is on every page during business hours, or email ${SITE.email}.`,
  },
];
