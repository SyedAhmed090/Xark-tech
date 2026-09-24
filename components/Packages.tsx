import Link from "next/link";
import Section from "./Section";
import { Tick } from "./Hero";
import { packageParam, type Package } from "@/lib/services";

/**
 * The package ladder, as cards rather than the old hairline-divided editorial
 * columns. Cards are the convention this buyer already reads fluently from
 * every other pricing page they are comparing against, and a boxed edge makes
 * it obvious which features belong to which price.
 *
 * Tailwind scans source for whole class names, so a computed
 * `lg:grid-cols-${n}` is never emitted — the column counts are spelled out.
 * Four-tier ladders drop to two columns on tablet so cells stay readable.
 */
const COLUMNS: Record<number, string> = {
  1: "sm:grid-cols-1",
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export default function Packages({
  packages,
  serviceName,
  serviceSlug,
}: {
  packages: Package[];
  serviceName: string;
  serviceSlug?: string;
}) {
  return (
    <ul className={`grid gap-4 ${COLUMNS[packages.length] ?? COLUMNS[3]}`}>
      {packages.map((pkg) => {
        const featured = pkg.featured;
        return (
          <li
            key={pkg.name}
            className={`card relative flex flex-col p-6 ${
              featured ? "border-brand ring-1 ring-brand" : ""
            }`}
          >
            {featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                Most chosen
              </span>
            )}

            {/* h3: the nearest ancestor heading is always the section's h2. */}
            <h3 className="display-tight text-lg">{pkg.name}</h3>

            <p className="price mt-4 text-3xl">{pkg.price}</p>
            <p className="mt-2 text-xs text-muted">{pkg.duration}</p>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {pkg.summary}
            </p>

            <ul className="mt-5 flex flex-col gap-2.5 border-t border-[color:var(--color-line)] pt-5">
              {pkg.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <span className="mt-0.5">
                    <Tick />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-1 md:mt-auto">
              <Link
                href={`/brief?package=${packageParam(serviceSlug ?? "", pkg.name)}`}
                className={`btn w-full ${
                  featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                <span className="sr-only">
                  {serviceName} — {pkg.name}:{" "}
                </span>
                Get started
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Section wrapper used on the service detail pages. */
export function PackagesSection({
  packages,
  serviceName,
  serviceSlug,
}: {
  packages: Package[];
  serviceName: string;
  serviceSlug?: string;
}) {
  return (
    <Section className="bg-surface">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-brand">Packages</p>
            <h2 className="display-tight mt-4 text-3xl md:text-4xl">
              {serviceName} pricing
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Pick a package and fill in the brief. No call needed — though we
            are on chat if you would rather ask first.
          </p>
        </div>
        <Packages
          packages={packages}
          serviceName={serviceName}
          serviceSlug={serviceSlug}
        />
    </Section>
  );
}
