"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "@/lib/projects";

const SCENE_MS = 2800;

const SCENES = PROJECTS.map((p) => ({
  name: p.name,
  line: p.stats[0] ? `${p.stats[0].value} — ${p.stats[0].label}` : p.category,
  cover: p.cover,
}));

export default function Reel({ onClose }: { onClose: () => void }) {
  const [index, setIndex] = useState(0);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Move keyboard focus into the dialog, restore it on close
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => previous?.focus();
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SCENES.length),
      SCENE_MS
    );
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      clearInterval(id);
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose]);

  const scene = SCENES[index];

  return (
    <motion.div
      ref={dialogRef}
      tabIndex={-1}
      className="fixed inset-0 z-[95] flex flex-col bg-ink text-paper outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
    >
      {/* progress bars */}
      <div className="flex gap-2 px-5 pt-5 md:px-10">
        {SCENES.map((s, i) => (
          <div key={s.name} className="h-px flex-1 overflow-hidden bg-paper/20">
            {i === index && (
              <motion.div
                className="h-full bg-klein"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
                style={{ transformOrigin: "left" }}
              />
            )}
            {i < index && <div className="h-full bg-paper/60" />}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between px-5 py-4 md:px-10">
        <span className="eyebrow text-paper/60">Xark Tech — Reel ’24–’26</span>
        <button
          type="button"
          onClick={onClose}
          className="eyebrow rounded-full border border-paper/30 px-5 py-2.5 transition-colors hover:border-paper hover:bg-paper hover:text-ink"
        >
          Close ✕
        </button>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={scene.name}
            className="absolute inset-0 grid grid-rows-[1fr_auto] gap-6 px-5 pb-10 md:grid-cols-[1.2fr_1fr] md:grid-rows-1 md:items-center md:px-10"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div>
              <motion.h2
                className="display text-[clamp(3rem,9vw,9rem)]"
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                {scene.name}
              </motion.h2>
              <p className="eyebrow mt-4 text-klein">{scene.line}</p>
            </div>
            <motion.div
              className="relative h-[36svh] overflow-hidden rounded-sm md:h-[60svh]"
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: SCENE_MS / 1000, ease: "linear" }}
            >
              {scene.cover}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
