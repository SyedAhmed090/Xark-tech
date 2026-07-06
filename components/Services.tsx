"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    slug: "brand-identity",
    name: "Brand identity",
    tags: ["Strategy", "Naming", "Visual identity", "Guidelines"],
    blurb:
      "A point of view your market can’t unsee — from positioning to the full visual system.",
    preview: (
      <div className="flex h-full w-full items-center justify-center bg-klein">
        <span className="display text-6xl text-paper">✕</span>
      </div>
    ),
  },
  {
    slug: "product-design",
    name: "Product design",
    tags: ["UX research", "Interface design", "Prototyping", "Design systems"],
    blurb:
      "Software interfaces designed around how people actually work, tested before they ship.",
    preview: (
      <div className="flex h-full w-full flex-col justify-center gap-2 bg-ink p-6">
        <div className="h-2 w-3/4 rounded bg-paper/70" />
        <div className="h-2 w-1/2 rounded bg-klein" />
        <div className="h-2 w-2/3 rounded bg-paper/30" />
        <div className="mt-2 h-8 w-24 rounded-full bg-paper" />
      </div>
    ),
  },
  {
    slug: "web-design-build",
    name: "Web design & build",
    tags: ["Marketing sites", "E-commerce", "CMS", "Performance"],
    blurb:
      "Websites engineered to load fast, rank well, and convert — designed and built under one roof.",
    preview: (
      <div className="flex h-full w-full flex-col bg-tint p-4">
        <div className="mb-3 flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-ink/30" />
          <span className="h-2 w-2 rounded-full bg-ink/30" />
          <span className="h-2 w-2 rounded-full bg-klein" />
        </div>
        <div className="flex-1 rounded bg-paper p-4">
          <div className="h-3 w-2/3 rounded bg-ink/80" />
          <div className="mt-2 h-2 w-1/2 rounded bg-ink/20" />
        </div>
      </div>
    ),
  },
  {
    slug: "motion-3d",
    name: "Motion & 3D",
    tags: ["Interaction design", "WebGL", "Product film", "Launch assets"],
    blurb:
      "The layer that makes digital feel alive: micro-interactions, 3D, and story-driven motion.",
    preview: (
      <div className="flex h-full w-full items-center justify-center bg-ink">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-klein">
          <span className="ml-1 inline-block h-0 w-0 border-y-8 border-l-[14px] border-y-transparent border-l-paper" />
        </div>
      </div>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 25 });
  const springY = useSpring(y, { stiffness: 250, damping: 25 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = e.clientX - rect.left + 24;
    const ny = e.clientY - rect.top - 90;
    // Teleport while the card is hidden so it doesn't spring in from a corner
    if (active === null) {
      x.jump(nx);
      y.jump(ny);
    } else {
      x.set(nx);
      y.set(ny);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      onMouseMove={onMouseMove}
      className="relative px-5 py-24 md:px-10 md:py-36"
    >
      <Reveal>
        <p className="eyebrow mb-4 text-klein">What we do</p>
        <h2 className="display-tight max-w-3xl text-4xl md:text-6xl">
          Four disciplines, one team, zero handoffs.
        </h2>
      </Reveal>

      <div className="mt-16 hairline-t">
        {SERVICES.map((service, i) => (
          <Reveal key={service.name} delay={i * 0.06}>
            <Link
              href={`/services/${service.slug}`}
              className="group grid gap-4 py-8 hairline-b md:grid-cols-[1fr_2fr_1fr] md:items-center md:gap-8 md:py-10"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              data-hover
            >
              <h3 className="display-tight text-2xl transition-colors duration-300 group-hover:text-klein md:text-4xl">
                {service.name}
                <span className="ml-3 inline-block opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  →
                </span>
              </h3>
              <p className="max-w-lg text-ink/70">{service.blurb}</p>
              <ul className="flex flex-wrap gap-2 md:justify-end">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    className="eyebrow rounded-full border border-ink/20 px-3 py-1.5 text-ink/60 transition-colors duration-300 group-hover:border-klein/40 group-hover:text-klein"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </Link>
          </Reveal>
        ))}
      </div>

      {/* Preview card trails the cursor across the rows — fine pointers only */}
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block" aria-hidden>
        <AnimatePresence>
          {active !== null && (
            <motion.div
              className="absolute left-0 top-0 h-44 w-60 overflow-hidden rounded-sm shadow-2xl"
              style={{ x: springX, y: springY }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {SERVICES[active].preview}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
