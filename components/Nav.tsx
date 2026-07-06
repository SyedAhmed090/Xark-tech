"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Magnetic from "./Magnetic";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160);
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 bg-paper/85 backdrop-blur-sm hairline-b"
      animate={{ y: hidden ? "-100%" : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
        <a href="#top" className="display-tight text-lg tracking-tight">
          XARK<span className="font-mono text-xs align-super text-klein">®</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="eyebrow text-ink/70 transition-colors hover:text-klein"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Magnetic>
          <a
            href="#contact"
            className="eyebrow inline-block rounded-full bg-ink px-5 py-2.5 text-paper transition-colors hover:bg-klein"
          >
            Start a project
          </a>
        </Magnetic>
      </nav>
    </motion.header>
  );
}
