"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";
import Section from "./Section";
import { FAQ_ITEMS } from "@/lib/faq";

export type FaqItem = { q: string; a: string };

function Item({
  item,
  index,
  open,
  onToggle,
}: {
  item: FaqItem;
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
      >
        <span className="display-tight text-xl md:text-2xl">{item.q}</span>
        <motion.span
          className="text-3xl text-brand"
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

/**
 * Accordion, reused by the homepage and every service page. Takes its items so
 * the service pages don't need a near-identical second component — and so the
 * FAQPage schema on each page can be generated from the same array the page
 * renders, which is the only way to keep the two from contradicting.
 */
export default function FAQ({
  items = FAQ_ITEMS,
  eyebrow = "Before you email",
  heading = "The questions everyone asks first.",
}: {
  items?: readonly FaqItem[];
  eyebrow?: string;
  heading?: string;
} = {}) {
  // Service pages carry fifteen or more; opening the first by default pushes
  // everything below it down for no benefit, so start collapsed when the list
  // is long.
  const [openIndex, setOpenIndex] = useState<number | null>(
    items.length > 8 ? null : 0,
  );

  return (
    <Section
      id="faq"
      className="bg-sand"
      inner="max-w-6xl grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20"
    >
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">{eyebrow}</p>
            <h2 className="display display-section">{heading}</h2>
          </Reveal>
        </div>
        <div className="hairline-t">
          {items.map((item, i) => (
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
    </Section>
  );
}
