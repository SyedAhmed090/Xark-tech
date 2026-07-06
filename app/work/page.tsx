import type { Metadata } from "next";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkTile from "@/components/WorkTile";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Xark Tech",
  description:
    "Selected case studies from Xark Tech: fintech, healthcare, architecture, and logistics — brand, product, and web.",
};

export default function WorkIndex() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">
              All work — {PROJECTS.length} case studies — 2024–2026
            </p>
            <h1 className="display text-[clamp(3rem,12vw,11rem)]">Work</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              Every engagement here shipped. Each case covers the challenge,
              the approach, and what changed — the numbers included.
            </p>
          </Reveal>
        </header>

        <div className="grid gap-10 px-5 py-20 md:grid-cols-2 md:gap-x-10 md:gap-y-20 md:px-10 md:py-28">
          {PROJECTS.map((project, i) => (
            <WorkTile key={project.slug} project={project} index={i} />
          ))}
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
