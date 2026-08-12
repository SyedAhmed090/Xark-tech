import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import Packages from "@/components/Packages";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/services";

export const metadata: Metadata = pageMeta({
  title: "Packages & pricing",
  description:
    "What it costs to work with Xark Tech. Three tiers across brand identity, product design, web design & build, and motion & 3D — from $20k.",
  path: "/packages",
});

export default function PackagesPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="grid gap-10 px-5 md:grid-cols-[2fr_1fr] md:gap-8 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Packages</p>
            <h1 className="display text-[clamp(2.5rem,9vw,9rem)]">
              What it costs
              <br />
              <span className="accent-word">to work with us</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              No hidden day rates and no discovery call before you can see a
              number. Every service runs on the same three-rung ladder — a
              scoped start, the engagement most clients pick, and a partnership
              for teams who need us standing by.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Services</span>
                <span className="font-mono text-sm">{SERVICES.length}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Entry point</span>
                <span className="font-mono text-sm">$20k</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Team size</span>
                <span className="font-mono text-sm">4 people</span>
              </div>
            </div>
          </Reveal>
        </header>

        <nav
          aria-label="Jump to service"
          className="px-5 pt-16 md:px-10 md:pt-24"
        >
          <Reveal>
            <ul className="flex flex-wrap gap-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="eyebrow inline-block rounded-full border border-ink/20 px-4 py-2 text-ink/70 transition-colors hover:border-klein hover:text-klein"
                    data-hover
                  >
                    {s.name} ↓
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </nav>

        {SERVICES.map((service) => (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-28 px-5 py-16 md:px-10 md:py-24"
          >
            <Reveal>
              <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="display-tight text-3xl md:text-5xl">
                    {service.name}
                  </h2>
                  <p className="mt-4 max-w-xl font-serif italic text-lg text-ink/70">
                    {service.tagline}
                  </p>
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="eyebrow inline-block shrink-0 py-1.5 text-klein transition-opacity hover:opacity-60"
                  data-hover
                >
                  Full service detail →
                </Link>
              </div>
            </Reveal>
            <Packages packages={service.packages} serviceName={service.name} />
          </section>
        ))}

        <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-paper/50">Not sure which</p>
                <h2 className="display-tight mt-4 max-w-2xl text-3xl md:text-5xl">
                  Tell us the problem. We&rsquo;ll tell you the shape.
                </h2>
                <p className="mt-6 max-w-xl leading-relaxed text-paper/70">
                  Most projects don&rsquo;t land neatly in one tier, and some
                  need two services running together. A twenty-minute call is
                  usually enough to scope it honestly.
                </p>
              </div>
              <Magnetic>
                <Link
                  href="/contact"
                  className="eyebrow inline-block shrink-0 rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
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
