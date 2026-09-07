import Link from "next/link";
import Magnetic from "./Magnetic";
import { Reveal } from "./Reveal";
import type { Package } from "@/lib/services";

/**
 * A conventional pricing-card structure translated into Xark's editorial
 * system: hairlines, oversized pricing, and one Klein-blue recommendation.
 */
export default function Packages({
  packages,
  serviceName,
}: {
  packages: Package[];
  serviceName: string;
}) {
  const TierName = "h3";

  return (
    <div className="grid gap-px border border-[color:var(--color-hairline)] bg-[color:var(--color-hairline)] md:grid-cols-3">
      {packages.map((pkg, i) => {
        const featured = pkg.featured;

        return (
          <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
            <article
              className={`relative flex h-full flex-col p-6 md:min-h-[39rem] md:p-8 ${
                featured ? "bg-klein text-paper" : "bg-paper text-ink"
              }`}
            >
              <div className="flex min-h-6 items-center justify-between gap-4">
                <span
                  className={`font-mono text-xs ${
                    featured ? "text-paper/55" : "text-ink/35"
                  }`}
                  aria-hidden="true"
                >
                  0{i + 1}
                </span>
                {featured ? (
                  <span className="eyebrow rounded-full border border-paper/30 px-3 py-1 text-paper">
                    Recommended
                  </span>
                ) : null}
              </div>

              <TierName
                className={`display-tight mt-8 text-2xl ${
                  featured ? "text-paper" : "text-ink"
                }`}
              >
                {pkg.name}
              </TierName>

              <div className="mt-7 flex flex-wrap items-end gap-x-4 gap-y-1">
                <p
                  className={`display text-[clamp(2.4rem,4vw,4.5rem)] ${
                    featured ? "text-paper" : "text-klein"
                  }`}
                >
                  {pkg.price}
                </p>
                {pkg.originalPrice ? (
                  <p
                    className={`pb-1 font-mono text-sm line-through ${
                      featured ? "text-paper/50" : "text-ink/40"
                    }`}
                  >
                    {pkg.originalPrice}
                  </p>
                ) : null}
              </div>

              <p
                className={`mt-3 font-mono text-xs uppercase tracking-[0.12em] ${
                  featured ? "text-paper/60" : "text-ink/45"
                }`}
              >
                Typical timeline / {pkg.duration}
              </p>

              <p
                className={`mt-5 font-serif italic text-lg leading-snug ${
                  featured ? "text-paper/80" : "text-ink/70"
                }`}
              >
                {pkg.summary}
              </p>

              <ul
                className={`mt-8 border-t ${
                  featured ? "border-paper/25" : "border-ink/15"
                }`}
              >
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className={`flex gap-3 border-b py-3 ${
                      featured ? "border-paper/20" : "border-ink/10"
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        featured
                          ? "border-paper/45 text-paper"
                          : "border-klein/40 text-klein"
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className="h-2.5 w-2.5"
                        fill="none"
                      >
                        <path
                          d="m2.25 6.2 2.1 2.05 5.4-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2 md:mt-auto">
                <Magnetic>
                  <Link
                    href="/contact"
                    className={`eyebrow inline-flex items-center gap-4 rounded-full px-6 py-3.5 transition-colors ${
                      featured
                        ? "bg-paper text-ink hover:bg-ink hover:text-paper"
                        : "bg-ink text-paper hover:bg-klein"
                    }`}
                    data-hover
                  >
                    <span className="sr-only">
                      {serviceName} &mdash; {pkg.name}:{" "}
                    </span>
                    Choose {pkg.name}
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </Magnetic>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Section wrapper used on the service detail pages. */
export function PackagesSection({
  packages,
  serviceName,
}: {
  packages: Package[];
  serviceName: string;
}) {
  return (
    <section className="px-5 py-20 md:px-10 md:py-28">
      <Reveal>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4 text-klein">Packages</p>
            <h2 className="display-tight max-w-xl text-3xl md:text-5xl">
              Three ways to <span className="accent-word">work with us</span>
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-ink/60">
            Clear scope, a visible starting price, and enough flexibility to
            shape the right {serviceName.toLowerCase()} engagement together.
          </p>
        </div>
      </Reveal>
      <Packages packages={packages} serviceName={serviceName} />
    </section>
  );
}
