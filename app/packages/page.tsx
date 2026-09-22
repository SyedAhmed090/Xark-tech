import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";
import Packages from "@/components/Packages";
import { Reveal } from "@/components/Reveal";
import { PACKAGE_GROUPS } from "@/lib/packages";
import { pageMeta } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Packages & pricing",
  description:
    "Logo, website, e-commerce, and animation packages from Xark Tech, with transparent promotional pricing starting at $99.",
  path: "/packages",
});

const PACKAGE_PROMISES = [
  {
    number: "01",
    title: "Clear starting prices",
    detail: "The promotional price and core scope are visible before you enquire.",
  },
  {
    number: "02",
    title: "Revisions included",
    detail: "Every creative package states its included revision allowance.",
  },
  {
    number: "03",
    title: "Production-ready files",
    detail: "Final formats are prepared for the web, print, or video delivery.",
  },
] as const;

export default function PackagesPage() {
  const packageCount = PACKAGE_GROUPS.reduce(
    (total, group) => total + group.packages.length,
    0,
  );

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="grid gap-10 px-5 pb-16 md:grid-cols-[2fr_1fr] md:gap-8 md:px-10 md:pb-24">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Packages &amp; pricing</p>
            <h1 className="display text-[clamp(2.5rem,9vw,9rem)]">
              Clear scope.
              <br />
              <span className="accent-word">Real numbers.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Choose a focused logo, website, e-commerce, or animation package
              with the scope and promotional price visible from the start.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <div className="hairline-t">
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Categories</span>
                <span className="font-mono text-sm">{PACKAGE_GROUPS.length}</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Entry point</span>
                <span className="font-mono text-sm">$99</span>
              </div>
              <div className="flex items-baseline justify-between py-4 hairline-b">
                <span className="eyebrow text-ink/50">Package options</span>
                <span className="font-mono text-sm">{packageCount}</span>
              </div>
            </div>
          </Reveal>
        </header>

        <section
          aria-label="What every package includes"
          className="grid bg-klein px-5 py-8 text-paper md:grid-cols-3 md:px-10 md:py-0"
        >
          {PACKAGE_PROMISES.map((promise, i) => (
            <Reveal key={promise.title} delay={i * 0.06}>
              <div
                className={`py-6 md:min-h-44 md:px-8 md:py-10 ${
                  i > 0 ? "md:border-l md:border-paper/20" : "md:pl-0"
                }`}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="display-tight text-xl">{promise.title}</h2>
                  <span className="font-mono text-xs text-paper/45">
                    {promise.number}
                  </span>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/70">
                  {promise.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </section>

        <nav
          aria-label="Jump to package category"
          className="sticky top-[72px] z-40 border-b border-paper/10 bg-ink px-5 py-4 text-paper md:top-[73px] md:px-10"
        >
          <div className="flex items-center gap-5 overflow-x-auto">
            <span className="eyebrow hidden shrink-0 text-paper/45 md:block">
              Explore
            </span>
            <ul className="flex min-w-max gap-2">
              {PACKAGE_GROUPS.map((group) => (
                <li key={group.slug}>
                  <a
                    href={`#${group.slug}`}
                    className="eyebrow inline-block rounded-full border border-paper/20 px-4 py-2 text-paper/70 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
                    data-hover
                  >
                    {group.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {PACKAGE_GROUPS.map((group, i) => (
          <section
            key={group.slug}
            id={group.slug}
            className={`scroll-mt-36 px-5 py-20 md:px-10 md:py-28 ${
              i % 2 === 1 ? "bg-tint/50" : ""
            }`}
          >
            <Reveal>
              <div className="mb-12 grid gap-5 md:grid-cols-[5rem_1fr_auto] md:items-end md:gap-8">
                <span className="font-mono text-sm text-klein">0{i + 1}</span>
                <div className="max-w-3xl">
                  <p className="eyebrow mb-3 text-ink/45">Choose your level</p>
                  <h2 className="display-tight text-4xl md:text-6xl">
                    {group.name} packages
                  </h2>
                  <p className="mt-4 max-w-xl font-serif italic text-lg text-ink/70">
                    {group.tagline}
                  </p>
                </div>
                <Link
                  href={group.detailsHref}
                  className="eyebrow inline-block shrink-0 py-1.5 text-klein transition-opacity hover:opacity-60 md:text-right"
                  data-hover
                >
                  Full service detail &rarr;
                </Link>
              </div>
            </Reveal>

            <Packages packages={group.packages} serviceName={group.name} />

            <p className="mt-5 text-right font-mono text-xs text-ink/45">
              Promotional package prices shown in US dollars.
            </p>
          </section>
        ))}

        <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
          <Reveal>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow text-paper/50">Need a custom mix?</p>
                <h2 className="display-tight mt-4 max-w-2xl text-3xl md:text-5xl">
                  Bring the problem. We&rsquo;ll shape the package.
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
                  Start a conversation &rarr;
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
