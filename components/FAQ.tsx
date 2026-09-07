"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { FAQ_ITEMS } from "@/lib/faq";

function Item({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof FAQ_ITEMS)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `faq-panel-${index}`;
  return (
    <div className="hairline-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center justify-between gap-6 py-7 text-left"
        data-hover
      >
        <span className="display-tight text-xl md:text-2xl">{item.q}</span>
        <motion.span
          className="font-serif italic text-3xl text-klein"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-8 leading-relaxed text-ink/70">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Before you email</p>
            <h2 className="display-tight text-4xl md:text-5xl">
              The questions everyone asks first.
            </h2>
          </Reveal>
        </div>
        <div className="hairline-t">
          {FAQ_ITEMS.map((item, i) => (
            <Reveal key={item.q} delay={i * 0.04}>
              <Item
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
