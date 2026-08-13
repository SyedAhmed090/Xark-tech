import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/** Common destinations, so a wrong URL isn't a dead end with one way out. */
const ROUTES = [
  { label: "Work", href: "/work", detail: "Case studies" },
  { label: "Services", href: "/services", detail: "What we do" },
  { label: "Packages", href: "/packages", detail: "What it costs" },
  { label: "Journal", href: "/journal", detail: "Notes and essays" },
];

export default function NotFound() {
  return (
    <>
      <Nav />
      <main id="main" className="flex min-h-svh flex-col justify-center bg-ink px-5 py-32 text-paper md:px-10">
        <svg viewBox="0 0 100 100" className="mb-8 h-16 w-16" aria-hidden>
          <path
            d="M22 22 L78 78 M78 22 L22 78"
            stroke="#2016e8"
            strokeWidth="12"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="display text-[clamp(3.5rem,18vw,13rem)] leading-none">
          404
        </h1>
        <p className="mt-6 font-serif italic text-2xl text-paper/70 md:text-3xl">
          This page shipped without us.
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/50">
          The address doesn&rsquo;t exist — it may have moved, or it never made
          it out of the design file.
        </p>

        <nav aria-label="Popular pages" className="mt-14 max-w-2xl">
          <h2 className="eyebrow mb-5 text-paper/40">Try one of these</h2>
          <ul className="border-t border-paper/15">
            {ROUTES.map((route) => (
              <li key={route.href} className="border-b border-paper/15">
                <Link
                  href={route.href}
                  className="group flex items-baseline justify-between gap-6 py-4"
                  data-hover
                >
                  <span className="display-tight text-xl transition-colors group-hover:text-paper/60 md:text-2xl">
                    {route.label}
                  </span>
                  <span className="font-mono text-xs text-paper/50">
                    {route.detail}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12">
          <Link
            href="/"
            className="eyebrow inline-block rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
            data-hover
          >
            ← Back to the homepage
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
