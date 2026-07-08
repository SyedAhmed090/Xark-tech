"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "./Reveal";

const ITEMS = [
  {
    q: "What does an engagement cost?",
    a: "Brand identity work starts at $35k, marketing sites at $45k, and embedded product design at $50k per month, booked by the quarter. We scope fixed-fee wherever possible — you should know the number before we start, not after.",
  },
  {
    q: "How long does a typical project take?",
    a: "A brand and site together usually run 8–12 weeks. Product design is ongoing — most clients engage us for a quarter at a time, with two-week working cycles inside it.",
  },
  {
    q: "Who actually works on our project?",
    a: "The four people on this page. We don’t sell you partners and staff you with juniors — whoever you meet in the first call is who does the work.",
  },
  {
    q: "Can you work with our in-house team?",
    a: "Yes, and it usually goes best that way. We embed in your rituals — your standups, your Figma, your Slack — and leave behind a design system your team can run without us.",
  },
  {
    q: "How do we start?",
    a: "Email hello@xark.tech with a couple of lines about what you’re building. We’ll book a 30-minute intro call, and if it’s a fit you’ll have a scoped proposal within a week.",
  },
];

function Item({
  item,
  index,
  open,
  onToggle,
}: {
  item: (typeof ITEMS)[number];
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
          {ITEMS.map((item, i) => (
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
