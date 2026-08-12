import Link from "next/link";
import Magnetic from "./Magnetic";
import { Reveal } from "./Reveal";
import type { Package } from "@/lib/services";

/**
 * Three-tier package ladder. Columns are divided by hairlines rather than
 * boxed into cards, so the block reads like the rest of the site's editorial
 * tables. The featured tier inverts to ink, matching the investment band.
 */
export default function Packages({
  packages,
  serviceName,
}: {
  packages: Package[];
  serviceName: string;
}) {
  // Always h3: on both surfaces the nearest ancestor heading is an h2 (the
  // "Three ways to work with us" section, or the service name on /packages).
  const TierName = "h3";

  return (
    <div className="hairline-t grid md:grid-cols-3">
      {packages.map((pkg, i) => {
        const dark = pkg.featured;
        return (
          <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
            <div
              className={`flex h-full flex-col p-6 md:p-8 ${
                dark ? "bg-ink text-paper" : "hairline-b md:border-b-0"
              } ${i > 0 ? "md:border-l md:border-[color:var(--color-hairline)]" : ""}`}
            >
              <div className="flex items-baseline justify-between">
                <TierName
                  className={`eyebrow ${dark ? "text-paper" : "text-klein"}`}
                >
                  {pkg.name}
                </TierName>
                {dark && (
                  <span className="eyebrow text-paper/50">Most chosen</span>
                )}
              </div>

              <p
                className={`display mt-6 text-4xl md:text-5xl ${
                  dark ? "text-paper" : ""
                }`}
              >
                {pkg.price}
              </p>

              <p
                className={`mt-3 font-mono text-sm ${
                  dark ? "text-paper/60" : "text-ink/50"
                }`}
              >
                {pkg.duration}
              </p>

              <p
                className={`mt-5 font-serif italic text-lg leading-snug ${
                  dark ? "text-paper/80" : "text-ink/70"
                }`}
              >
                {pkg.summary}
              </p>

              <ul
                className={`mt-8 ${
                  dark ? "border-t border-paper/20" : "hairline-t"
                }`}
              >
                {pkg.includes.map((item) => (
                  <li
                    key={item}
                    className={`flex items-baseline gap-3 py-3 ${
                      dark ? "border-b border-paper/20" : "hairline-b"
                    }`}
                  >
                    <span
                      className={`font-serif italic ${
                        dark ? "text-paper/60" : "text-klein"
                      }`}
                      aria-hidden="true"
                    >
                      ✕
                    </span>
                    <span className="text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2 md:mt-auto">
                <Magnetic>
                  <Link
                    href="/contact"
                    className={`eyebrow inline-block rounded-full px-6 py-3 transition-colors ${
                      dark
                        ? "bg-paper text-ink hover:bg-klein hover:text-paper"
                        : "border border-ink/20 text-ink/70 hover:border-klein hover:text-klein"
                    }`}
                    data-hover
                  >
                    <span className="sr-only">
                      {serviceName} — {pkg.name}:{" "}
                    </span>
                    Enquire →
                  </Link>
                </Magnetic>
              </div>
            </div>
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
            Every engagement starts with a conversation, not a checkout. These
            are the shapes most {serviceName.toLowerCase()} projects take.
          </p>
        </div>
      </Reveal>
      <Packages packages={packages} serviceName={serviceName} />
    </section>
  );
}
