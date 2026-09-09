import { Reveal } from "./Reveal";

/**
 * Replaces the former "Trusted by product teams at" logo strip, which listed
 * invented client wordmarks. A false trust signal is worse than none, so this
 * states the practice's focus instead — a positioning claim the studio can
 * stand behind rather than a client list it can't.
 */
const FOCUS = [
  { name: "Fintech", className: "display-tight text-xl" },
  { name: "Healthcare", className: "font-serif italic text-2xl" },
  { name: "LOGISTICS", className: "font-mono text-lg tracking-[0.3em]" },
  { name: "B2B platforms", className: "display text-lg" },
  { name: "design systems", className: "font-serif italic text-2xl lowercase" },
  { name: "BRAND & IDENTITY", className: "font-mono text-sm tracking-[0.2em]" },
  { name: "Motion", className: "display-tight text-xl" },
  { name: "3D & WEBGL", className: "display text-base tracking-[0.15em]" },
];

export default function FocusStrip() {
  return (
    <section className="px-5 py-16 hairline-b md:px-10 md:py-20">
      <Reveal>
        <p className="eyebrow mb-10 text-ink/50">What we work on</p>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
        {FOCUS.map((item, i) => (
          <Reveal key={item.name} delay={i * 0.04}>
            <span className={`block text-ink/55 ${item.className}`}>
              {item.name}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
