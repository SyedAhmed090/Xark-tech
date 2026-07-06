"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const SERVICES = [
  {
    name: "Brand identity",
    tags: ["Strategy", "Naming", "Visual identity", "Guidelines"],
    blurb:
      "A point of view your market can't unsee — from positioning to the full visual system.",
  },
  {
    name: "Product design",
    tags: ["UX research", "Interface design", "Prototyping", "Design systems"],
    blurb:
      "Software interfaces designed around how people actually work, tested before they ship.",
  },
  {
    name: "Web design & build",
    tags: ["Marketing sites", "E-commerce", "CMS", "Performance"],
    blurb:
      "Websites engineered to load fast, rank well, and convert — designed and built under one roof.",
  },
  {
    name: "Motion & 3D",
    tags: ["Interaction design", "WebGL", "Product film", "Launch assets"],
    blurb:
      "The layer that makes digital feel alive: micro-interactions, 3D, and story-driven motion.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <p className="eyebrow mb-4 text-klein">What we do</p>
        <h2 className="display-tight max-w-3xl text-4xl md:text-6xl">
          Four disciplines, one team, zero handoffs.
        </h2>
      </Reveal>

      <div className="mt-16 hairline-t">
        {SERVICES.map((service, i) => (
          <Reveal key={service.name} delay={i * 0.06}>
            <motion.div
              className="group grid gap-4 py-8 hairline-b md:grid-cols-[1fr_2fr_1fr] md:items-center md:gap-8 md:py-10"
              whileHover="hover"
            >
              <h3 className="display-tight text-2xl transition-colors duration-300 group-hover:text-klein md:text-4xl">
                {service.name}
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
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
