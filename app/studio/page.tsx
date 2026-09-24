import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "About",
  description:
    "Design and development for small businesses — published prices, full file ownership, and a delivery date before you pay. Based in Sheridan, WY.",
  path: "/studio",
});

/**
 * These were studio values — shipping over showing, arguing with evidence,
 * leaving a team stronger. All true of the old positioning, and all addressed
 * to a product team choosing a studio. The four below are the promises this
 * site actually makes, and each one is checkable by the buyer before paying.
 */
const VALUES = [
  {
    name: "The price is the price",
    detail:
      "Every package is priced on the page. No quote to wait for, no call before you learn what something costs, and no number that moves once we know what you can afford.",
  },
  {
    name: "You own all of it",
    detail:
      "Every logo ships the full vector set — AI, EPS, SVG, PDF — including the $99 one. Budget logo services hand over a JPEG and charge again for the files a printer will accept. We don’t put our name on your site either, so there is nothing to pay to remove.",
  },
  {
    name: "The real number, honoured",
    detail:
      "If a package says two revision rounds, it means two. Advertising “unlimited” and capping it in the contract is the oldest trick in this industry, and it is why people arrive here not trusting anyone.",
  },
  {
    name: "A date before you pay",
    detail:
      "You get a delivery date with the price, not after your deposit clears. If a website misses the date we gave you, the deposit comes back.",
  },
];

/**
 * The "Recognition" section that stood here listed five Awwwards / FWA / CSSDA
 * wins that could not be substantiated, each linked to the real award body's
 * site. Award directories are public and checkable, so this was the highest-risk
 * claim on the site. Removed rather than rewritten — add real awards here only
 * when there are entries to point at.
 */

export default function StudioPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32">
        <Section size="none" inner="max-w-[84rem] grid gap-10 md:grid-cols-[2fr_1fr] md:gap-8">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">About us</p>
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
              Proper design, at a price a small business can{" "}
              <span className="accent-word">actually pay</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Based</span>
                <span className="font-mono text-sm">Sheridan, WY</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Starts at</span>
                <span className="font-mono text-sm">$99</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Turnaround</span>
                <span className="font-mono text-sm">3–21 days</span>
              </div>
            </div>
          </Reveal>
        </Section>

        <Section inner="max-w-[84rem] grid gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <p className="text-xl leading-relaxed text-ink/80 md:text-2xl">
              Most small businesses get one of two offers: a $40 logo from a
              marketplace that arrives as an unusable JPEG, or a $15,000 agency
              proposal after three meetings. We built the thing that should
              exist in between.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-muted">
              We work with trades, shops, clinics, studios and brand-new
              businesses — people who need to look credible and be findable,
              and who would rather spend an afternoon on a written brief than
              three weeks in meetings. Every package has a fixed price, a fixed
              scope and a delivery date, so the thing you agreed to is the
              thing that arrives.
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              Design and build are handled by a production team we work with
              directly, and nothing reaches you until it has been reviewed
              here. That is how these prices are possible without the quality
              being the thing that pays for them.
            </p>
            <p className="mt-6 leading-relaxed text-muted">
              The case studies on this site are self-initiated concept
              projects — each designed and built as a working prototype you
              can open and use. We label them as such rather than implying a
              client list we don’t have, and you are welcome to judge the
              craft on them.
            </p>
          </Reveal>
        </Section>

        <Section className="hairline-t">
          <Reveal>
            <p className="eyebrow mb-12 text-brand">What we believe</p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-20 md:gap-y-14">
            {VALUES.map((value, i) => (
              <Reveal key={value.name} delay={i * 0.06}>
                <h2 className="display-tight text-2xl md:text-3xl">
                  {value.name}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted">
                  {value.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Team />

        <Section size="lg">
          <Reveal>
            <h2 className="display-tight max-w-2xl text-3xl md:text-4xl">
              Know what you need? Every price is on one page.
            </h2>
            <div className="mt-10">
                <Link
                  href="/packages"
                  className="btn btn-primary"
                >
                  See packages &amp; prices
                </Link>
            </div>
          </Reveal>
        </Section>

        <Footer />
      </main>
    </>
  );
}
