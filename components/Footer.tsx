const SITEMAP = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "X", href: "https://x.com" },
];

export default function Footer() {
  return (
    <footer className="bg-ink px-5 pb-10 pt-20 text-paper md:px-10">
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
                <a
                  href={link.href}
                  className="text-sm text-paper/80 transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
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
        <p className="font-mono text-xs text-paper/40">
          © 2026 Xark Tech LLC. All rights reserved.
        </p>
        <p className="font-mono text-xs text-paper/40">
          30.2672° N, 97.7431° W — Austin, TX
        </p>
      </div>
    </footer>
  );
}
