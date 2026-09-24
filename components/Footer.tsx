import Image from "next/image";
import Link from "next/link";
import SwapText from "./SwapText";
import { SITE } from "@/lib/site";

const SITEMAP = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

// Social profiles come from SITE.socials, which is empty until real profile
// URLs exist — the previous hardcoded list pointed at platform homepages.

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-20 text-paper md:px-10">
      <div className="mx-auto max-w-[84rem]">
      <p className="eyebrow mb-14 text-paper/70">Taking on new projects now</p>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          {/* invert turns the black mark white for the dark footer — which
              only works because logo.png is genuinely transparent. */}
          <Image
            src="/logo.png"
            alt="Xark Tech"
            width={878}
            height={406}
            className="h-20 w-auto object-contain invert md:h-24"
          />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Logos, websites and branding for small business. Based in Sheridan,
            Wyoming — working with owners across the United States.
          </p>
        </div>

        <nav aria-label="Sitemap">
          <p className="eyebrow mb-4 text-paper/40">Sitemap</p>
          {/* gap-0.5 + py-1.5 keeps the visual rhythm of the old gap-3 while
              giving each link a 27px touch target (WCAG 2.2 minimum is 24px). */}
          <ul className="flex flex-col gap-0.5">
            {SITEMAP.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-label={link.label}
                  className="group inline-block py-1.5 text-sm text-paper/80"
                >
                  <SwapText>{link.label}</SwapText>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-4 text-paper/40">Get in touch</p>
          <ul className="flex flex-col gap-0.5">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-block py-1.5 text-sm text-paper/80 transition-colors hover:text-paper"
              >
                {SITE.email}
              </a>
            </li>
            <li className="py-1.5 text-sm leading-relaxed text-paper/60">
              <address className="not-italic">
                <span className="block">{SITE.address.street}</span>
                <span className="block">
                  {SITE.address.locality}, {SITE.address.region}{" "}
                  {SITE.address.postalCode}
                </span>
              </address>
            </li>
            {SITE.phone && (
              <li>
                <a
                  href={`tel:${SITE.phone}`}
                  className="inline-block py-1.5 text-sm text-paper/80 transition-colors hover:text-paper"
                >
                  {SITE.phone}
                </a>
              </li>
            )}
          </ul>

          {SITE.socials.length > 0 && (
            <nav aria-label="Social links" className="mt-8">
              <p className="eyebrow mb-5 text-paper/40">Elsewhere</p>
              <ul className="flex flex-col gap-3">
                {SITE.socials.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-paper/80 transition-colors hover:text-paper"
                    >
                      {link.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-paper/15 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-paper/60">
          © 2026 Xark Tech LLC ·{" "}
          <Link
            href="/privacy"
            className="inline-block py-1.5 transition-colors hover:text-paper"
          >
            Privacy
          </Link>{" "}
          ·{" "}
          <Link
            href="/terms"
            className="inline-block py-1.5 transition-colors hover:text-paper"
          >
            Terms
          </Link>
        </p>
      </div>
      </div>
    </footer>
  );
}
