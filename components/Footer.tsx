"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SwapText from "./SwapText";

const SITEMAP = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/studio" },
  { label: "Journal", href: "/journal" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "X", href: "https://x.com" },
];

function AustinClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Chicago",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-xs tabular-nums text-paper/60">
      Austin, TX — {time || "··:··:··"}
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-20 text-paper md:px-10">
      <div className="mb-14 flex items-center gap-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-klein opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-klein" />
        </span>
        <span className="eyebrow text-paper/70">
          Accepting Q4 2026 projects
        </span>
      </div>

      <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <p className="display text-5xl md:text-7xl">
            XARK
            <span className="font-mono align-super text-lg text-klein">®</span>
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/60">
            Independent design agency. Based in Austin, Texas — working with
            teams across the United States and worldwide.
          </p>
        </div>

        <nav aria-label="Sitemap">
          <p className="eyebrow mb-5 text-paper/40">Sitemap</p>
          <ul className="flex flex-col gap-3">
            {SITEMAP.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="group text-sm text-paper/80">
                  <SwapText>{link.label}</SwapText>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Social links">
          <p className="eyebrow mb-5 text-paper/40">Elsewhere</p>
          <ul className="flex flex-col gap-3">
            {SOCIALS.map((link) => (
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
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-paper/15 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-xs text-paper/60">
          © 2026 Xark Tech LLC ·{" "}
          <Link href="/privacy" className="transition-colors hover:text-paper">
            Privacy
          </Link>{" "}
          ·{" "}
          <Link href="/terms" className="transition-colors hover:text-paper">
            Terms
          </Link>
        </p>
        <AustinClock />
      </div>
    </footer>
  );
}
