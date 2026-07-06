"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const INTRO_SEEN_KEY = "xark-intro-seen";

const LETTERS = ["X", "A", "R", "K"];

export default function Preloader() {
  const [done, setDone] = useState(false);

  useLayoutEffect(() => {
    // Play the intro once per browser session
    if (sessionStorage.getItem(INTRO_SEEN_KEY)) {
      setDone(true);
      return;
    }
    const t = setTimeout(() => {
      sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      setDone(true);
    }, 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="flex items-end overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter}
                className="display text-paper text-[16vw] leading-none md:text-[9vw]"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  delay: 0.15 + i * 0.09,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="mb-[2vw] font-mono text-klein text-[3vw] md:text-[1.4vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              ®
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
