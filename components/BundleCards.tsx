import Link from "next/link";
import Section from "./Section";
import { Tick } from "./Hero";
import {
  BUNDLES,
  bundleListUsd,
  bundleSaving,
  type Bundle,
} from "@/lib/services";

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/**
 * The homepage's commercial centre of gravity.
 *
 * A new business rarely knows it needs a logo *and* a site *and* a Google
 * listing — it knows it needs to open. Each bundle is named for that job and
 * priced under the sum of its tiers, so the saving is the reason to decide
 * now rather than buy one piece and never return for the rest.
 */
export default function BundleCards() {
  return (
    /* The commercial centre of the page, so it is the one band that gets the
       heavy weight and the one grid where the cards are not all equal — the
       bundle most people buy is physically bigger, not just outlined. */
    <Section size="lg" className="bg-sand">
        <div className="max-w-2xl">
          <p className="eyebrow text-brand">Best sellers</p>
          <h2 className="display display-section mt-4">
            Start with everything you need
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Buy the pieces together and pay less than buying them one at a
            time. One price, one timeline, one team.
          </p>
        </div>

        <ul className="mt-12 grid items-start gap-5 lg:grid-cols-[1fr_1.18fr_1fr]">
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.slug} bundle={bundle} />
          ))}
        </ul>
    </Section>
  );
}

function BundleCard({ bundle }: { bundle: Bundle }) {
  const saving = bundleSaving(bundle);
  const listUsd = bundleListUsd(bundle);
  const featured = bundle.featured;

  return (
    <li
      className={`card relative flex flex-col ${
        featured
          ? "border-2 border-ink bg-surface p-7 md:p-9 lg:-mt-4"
          : "p-6 md:p-7"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded bg-ink px-3 py-1 text-xs font-bold text-paper">
          Most popular
        </span>
      )}

      <h3 className={`display-tight ${featured ? "text-2xl md:text-3xl" : "text-xl"}`}>
        {bundle.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {bundle.summary}
      </p>

      <div className="mt-6 flex items-end gap-3">
        <span className={`price ${featured ? "text-5xl md:text-6xl" : "text-4xl"}`}>
          {bundle.price}
        </span>
        {/* The list price is struck because it is a real sum of real tiers,
            not an inflated anchor — the components are individually priced
            on the same site and a visitor can add them up. */}
        <span className="pb-1 text-sm text-muted line-through">
          {money(listUsd)}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="badge">Save {money(saving)}</span>
        <span className="text-xs text-muted">{bundle.duration}</span>
      </div>

      <ul className="mt-6 flex flex-col gap-2.5 border-t border-[color:var(--color-line)] pt-6">
        {bundle.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm">
            <span className="mt-0.5">
              <Tick />
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-7 pt-1 md:mt-auto">
        <Link
          href={`/brief?package=${bundle.slug}`}
          className={`btn w-full ${featured ? "btn-primary" : "btn-secondary"}`}
        >
          <span className="sr-only">{bundle.name}: </span>
          Get started
        </Link>
      </div>
    </li>
  );
}
