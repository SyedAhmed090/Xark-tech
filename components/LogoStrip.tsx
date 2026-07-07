"use client";

import { Reveal } from "./Reveal";

/* Text wordmarks with distinct type treatments — stands in for client logo SVGs */
const CLIENTS = [
  { name: "Meridian", className: "display-tight text-xl" },
  { name: "Loop Health", className: "font-serif italic text-2xl" },
  { name: "ATLAS", className: "font-mono text-lg tracking-[0.3em]" },
  { name: "Forma", className: "display text-lg" },
  { name: "halcyon", className: "font-serif italic text-2xl lowercase" },
  { name: "PIER & POST", className: "font-mono text-sm tracking-[0.2em]" },
  { name: "Northbeam", className: "display-tight text-xl" },
  { name: "KESTREL", className: "display text-base tracking-[0.15em]" },
];

export default function LogoStrip() {
  return (
    <section className="px-5 py-16 hairline-b md:px-10 md:py-20">
      <Reveal>
        <p className="eyebrow mb-10 text-ink/50">
          Trusted by product teams at
        </p>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-8">
        {CLIENTS.map((client, i) => (
          <Reveal key={client.name} delay={i * 0.04}>
            <span
              className={`block text-ink/55 transition-colors duration-300 hover:text-ink ${client.className}`}
            >
              {client.name}
            </span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
