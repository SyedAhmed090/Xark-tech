"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Magnetic from "./Magnetic";

const LINKS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Studio", href: "/studio" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/contact" },
];

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col justify-between bg-ink px-5 pb-10 pt-24 text-paper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav aria-label="Mobile">
        <ul className="flex flex-col gap-2">
          {LINKS.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "110%", transition: { delay: 0 } }}
                transition={{
                  delay: 0.08 + i * 0.06,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="display block text-5xl transition-colors hover:text-klein"
                >
                  {link.label}
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
      <motion.div
        className="flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <a href="mailto:hello@xark.tech" className="eyebrow text-paper/70">
          hello@xark.tech
        </a>
        <p className="eyebrow text-paper/40">Austin, TX</p>
      </motion.div>
    </motion.div>
  );
}

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(latest > prev && latest > 160 && !open);
  });

  return (
    <>
      <motion.header
        className={`fixed inset-x-0 top-0 z-[85] transition-colors ${
          open ? "bg-transparent" : "bg-paper/85 backdrop-blur-sm hairline-b"
        }`}
        animate={{ y: hidden ? "-100%" : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 md:px-10">
          <Link
            href="/"
            className={`display-tight text-lg tracking-tight transition-colors ${open ? "text-paper" : ""}`}
          >
            XARK
            <span className="font-mono text-xs align-super text-klein">®</span>
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="eyebrow text-ink/70 transition-colors hover:text-klein"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic>
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className={`eyebrow inline-block rounded-full px-5 py-2.5 transition-colors ${
                  open
                    ? "bg-paper text-ink hover:bg-klein hover:text-paper"
                    : "bg-ink text-paper hover:bg-klein"
                }`}
              >
                Start a project
              </Link>
            </Magnetic>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <motion.span
                className={`block h-px w-6 ${open ? "bg-paper" : "bg-ink"}`}
                animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className={`block h-px w-6 ${open ? "bg-paper" : "bg-ink"}`}
                animate={open ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>
      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
