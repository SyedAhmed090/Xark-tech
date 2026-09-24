import Link from "next/link";
import HeroVisual from "./HeroVisual";
import Section from "./Section";
import { ENTRY_PRICE } from "@/lib/services";

/**
 * A server component, deliberately. The old hero was a client component that
 * pulled in framer-motion, a Three.js canvas and a preloader handshake before
 * a visitor could read a single word. The job of this block is to answer
 * "what is this and what does it cost" before the fold on a phone, so it
 * ships as HTML with no JavaScript at all.
 */
const PROOF = [
  "Full vector files on every package",
  "You own everything, no credit fee",
  "Fixed prices, delivery date up front",
];

export default function Hero() {
  return (
    // The hero is the blue field. Its bottom padding used to be 2/4 only
    // because the bundles band opened with its own; across a colour change it
    // has to carry its own.
    <Section
      size="none"
      className="bg-brand pt-28 pb-16 text-paper md:pt-32 md:pb-20"
      inner="max-w-6xl grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16"
    >
      <div>
        <p className="eyebrow text-brand">
          Logos, websites &amp; branding for small business
        </p>

        <h1 className="display display-hero mt-5 max-w-4xl">
          Everything your business needs to{" "}
          <span className="accent-word">look the part</span>.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          Logos from {ENTRY_PRICE}. Websites from $399. Real designers, fixed
          prices, and a delivery date before you pay a cent — no quotes, no
          sales calls, no surprises.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/packages" className="btn btn-invert">
            See packages &amp; prices
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Tell us what you need
          </Link>
        </div>

        <ul className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
          {PROOF.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <Tick />
              <span className="text-muted">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* pb-12 on the wrapper: the files card hangs below the site card, and
          without it the next section clips it on mobile. */}
      <div className="pb-12 lg:pb-0">
        <HeroVisual />
      </div>
    </Section>
  );
}

/** Shared tick. aria-hidden because the list item text carries the meaning. */
export function Tick({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden="true"
      className={`shrink-0 text-accent ${className}`}
    >
      <path
        d="M3 8.5l3.2 3.2L13 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
