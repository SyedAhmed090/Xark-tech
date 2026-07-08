import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Careers — Xark Tech",
  description:
    "No open roles right now — but we read every portfolio that lands in our inbox.",
};

const REALITIES = [
  {
    title: "Four people, on purpose",
    detail:
      "We grow deliberately and rarely. When we do, it’s because the work demands a person, not because a spreadsheet says headcount.",
  },
  {
    title: "Senior work from day one",
    detail:
      "There is no bench and no shadowing period. Whoever joins presents to clients in their first month.",
  },
  {
    title: "Austin, mostly",
    detail:
      "We work from a studio in East Austin three days a week. The other two are yours, wherever they happen.",
  },
];

export default function CareersPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="grid gap-10 px-5 md:grid-cols-[2fr_1fr] md:gap-8 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Careers</p>
            <h1 className="display text-[clamp(2.5rem,9vw,9rem)]">
              No open roles
              <br />
              <span className="accent-word">right now</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              We’re a team of four and we like it that way — but exceptional
              people change plans. We read every portfolio that lands in our
              inbox, and we reply to all of them.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Team today</span>
                <span className="font-mono text-sm">4 people</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Based in</span>
                <span className="font-mono text-sm">Austin, TX</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Open roles</span>
                <span className="font-mono text-sm">0, by design</span>
              </div>
            </div>
          </Reveal>
        </header>

        <section className="grid gap-10 px-5 py-20 md:grid-cols-3 md:gap-8 md:px-10 md:py-28">
          {REALITIES.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="hairline-t pt-6">
                <h2 className="display-tight text-xl md:text-2xl">{r.title}</h2>
                <p className="mt-4 leading-relaxed text-ink/70">{r.detail}</p>
              </div>
            </Reveal>
          ))}
        </section>

        <section className="px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <h2 className="display-tight max-w-2xl text-3xl md:text-5xl">
              Think we’d regret not meeting you?
            </h2>
            <div className="mt-10">
              <Magnetic>
                <a
                  href="mailto:hello@xark.tech?subject=Portfolio"
                  className="eyebrow inline-block rounded-full bg-klein px-8 py-4 text-paper transition-colors hover:bg-ink"
                  data-hover
                >
                  Send your portfolio →
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
