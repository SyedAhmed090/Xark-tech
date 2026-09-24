import type { ReactNode } from "react";

/**
 * Every band on the site, so that one rhythm and one measure survive the next
 * edit.
 *
 * Before this, sections carried hand-tuned padding and half of them had no
 * container at all: Hero, BundleCards and ServiceGrid sat in a 1152px column
 * while Process, Work, FAQ and CTA ran full bleed to the viewport edge. On any
 * monitor wider than the column the content edge jumped inward and back out as
 * you scrolled — the single most visible thing wrong with the page.
 *
 * `className` styles the full-bleed outer band (grounds, hairlines); `inner`
 * *replaces* the column's classes rather than adding to them, so a section
 * that wants a narrower measure or a grid must restate the width it wants.
 * That is deliberate: two `max-w-*` utilities cannot override one another —
 * Tailwind emits both and CSS source order decides the winner, not the order
 * they were written in. Same reason vertical rhythm is a prop and not a
 * className.
 */
/**
 * Three weights, not one. Every band carrying identical padding is what made
 * the page a metronome — nothing dominated, so nothing read as important.
 * `sm` is for the connective bands (a strip, a footnote), `lg` for the two
 * that should own their screen.
 */
const PAD = {
  sm: "py-10 md:py-14",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
  /** Caller sets its own vertical padding — page tops that clear the nav. */
  none: "",
} as const;

export default function Section({
  id,
  size = "md",
  className = "",
  inner = "",
  children,
}: {
  id?: string;
  size?: keyof typeof PAD;
  className?: string;
  inner?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`px-5 md:px-10 ${PAD[size]} ${className}`}>
      <div className={`mx-auto ${inner || "max-w-[84rem]"}`}>{children}</div>
    </section>
  );
}
