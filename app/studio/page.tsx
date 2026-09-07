import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Team from "@/components/Team";
import Magnetic from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Studio",
  description:
    "An independent design agency in Sheridan, WY. Four senior people, twelve years, and a bias for work that ships.",
  path: "/studio",
});

const VALUES = [
  {
    name: "Ship over show",
    detail:
      "Portfolio pieces that never launched don’t count. We measure ourselves on what’s live, in front of users, doing its job.",
  },
  {
    name: "Argue with evidence",
    detail:
      "Taste opens the conversation; research and testing close it. When we push back — and we will — we bring receipts.",
  },
  {
    name: "Small on purpose",
    detail:
      "Four people is a decision, not a phase. It keeps seniors on the work, decisions fast, and your budget out of the org chart.",
  },
  {
    name: "Leave them stronger",
    detail:
      "Every engagement ends with systems and habits your team can run without us. Dependency is bad design.",
  },
];

const AWARDS = [
  { year: "2026", award: "Awwwards Site of the Day", project: "Forma Studio", href: "https://www.awwwards.com" },
  { year: "2025", award: "FWA of the Day", project: "Meridian", href: "https://thefwa.com" },
  { year: "2025", award: "CSSDA Website of the Day", project: "Meridian", href: "https://www.cssdesignawards.com" },
  { year: "2024", award: "Awwwards Honorable Mention", project: "Loop Health", href: "https://www.awwwards.com" },
  { year: "2024", award: "CSSDA UX Award", project: "Atlas Freight", href: "https://www.cssdesignawards.com" },
];

export default function StudioPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="grid gap-10 px-5 md:grid-cols-[2fr_1fr] md:gap-8 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">The studio</p>
            <h1 className="display text-[clamp(2.75rem,10vw,10rem)]">
              Small by design,
              <br />
              <span className="accent-word">serious</span> about craft
            </h1>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Founded</span>
                <span className="font-mono text-sm">2014, Sheridan WY</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Team</span>
                <span className="font-mono text-sm">4 people</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Focus</span>
                <span className="font-mono text-sm">Fintech, health, logistics</span>
              </div>
            </div>
          </Reveal>
        </header>

        <section className="grid gap-12 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <p className="text-xl leading-relaxed text-ink/80 md:text-2xl">
              Xark Tech started in 2014 with a simple irritation: software that
              worked but felt like homework. Twelve years later we’re still
              four people in Sheridan, still independent, and still convinced
              that how something feels is part of whether it works.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-ink/70">
              Most of our work is complex B2B software — fintech, healthcare,
              logistics — the kind with real compliance constraints and users
              who can’t afford to be confused. Occasionally something outside
              that lane is worth the detour, like an architecture studio’s
              portfolio. Every engagement is small on purpose: the people you
              meet are the people doing the work. No account layer, no
              juniors billed as seniors, no big reveal at the end. Just
              weekly momentum you can see, and a deliverable at every step
              you can hold.
            </p>
            <p className="mt-6 leading-relaxed text-ink/70">
              When we’re not shipping client work, we’re teaching design
              systems, running a monthly critique night for local designers,
              and arguing about typography over breakfast.
            </p>
          </Reveal>
        </section>

        <section className="px-5 py-20 hairline-t md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow mb-12 text-klein">What we believe</p>
          </Reveal>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-20 md:gap-y-14">
            {VALUES.map((value, i) => (
              <Reveal key={value.name} delay={i * 0.06}>
                <h2 className="display-tight text-2xl md:text-3xl">
                  {value.name}
                </h2>
                <p className="mt-4 max-w-md leading-relaxed text-ink/70">
                  {value.detail}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <Team />

        <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
          <Reveal>
            <p className="eyebrow mb-10 text-paper/50">Recognition</p>
          </Reveal>
          <div className="border-t border-paper/15">
            {AWARDS.map((row, i) => (
              <Reveal key={`${row.year}-${row.award}`} delay={i * 0.04}>
                <a
                  href={row.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-6 border-b border-paper/15 py-5 md:gap-12"
                  data-hover
                >
                  <span className="font-mono text-sm text-klein">{row.year}</span>
                  <span className="display-tight text-lg transition-colors group-hover:text-klein md:text-2xl">
                    {row.award} <span className="opacity-0 transition-opacity group-hover:opacity-100">↗</span>
                  </span>
                  <span className="font-mono text-xs text-paper/60">
                    {row.project}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <h2 className="display-tight max-w-2xl text-3xl md:text-5xl">
              Sound like people you’d want in your corner?
            </h2>
            <div className="mt-10">
              <Magnetic>
                <Link
                  href="/contact"
                  className="eyebrow inline-block rounded-full bg-klein px-8 py-4 text-paper transition-colors hover:bg-ink"
                  data-hover
                >
                  Start a conversation →
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
