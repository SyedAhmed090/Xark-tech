import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import Link from "next/link";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import WorkTile from "@/components/WorkTile";
import { Reveal } from "@/components/Reveal";
import { PROJECTS } from "@/lib/projects";

export const metadata: Metadata = pageMeta({
  title: "Work",
  description:
    "Self-initiated concept projects from Xark Tech — each one designed and then actually built, so you can open the prototype rather than take our word for the craft.",
  path: "/work",
});

export default function WorkIndex() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32">
        <Section size="none">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">
              All work — {PROJECTS.length} concept projects — 2024–2026
            </p>
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">Work</h1>
            {/* These are ambitious software concepts, not small-business
                sites, and pretending otherwise in the copy would be worse than
                saying so. Framed as a craft demonstration until the case
                studies are rebuilt around the work now being sold. */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Self-initiated concept projects — each one designed and then
              actually built, so you can open the prototype rather than take
              our word for it. They are deliberately hard briefs: if the
              detail holds up at this level, it holds up on a five-page site
              for a local business.
            </p>
          </Reveal>
        </Section>

        {/* WorkTile headings are h3. Without an h2 here the outline jumped
            h1 -> h3, which screen readers report as a missing level. */}
        <Section>
          <h2 className="sr-only">Case studies</h2>
          <div className="grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
            {PROJECTS.map((project, i) => (
              <WorkTile key={project.slug} project={project} index={i} />
            ))}
          </div>
        </Section>

        <Section size="none" className="pb-16 md:pb-24">
          <Reveal>
            <h2 className="display-tight max-w-2xl text-3xl md:text-4xl">
              Want yours to be the next case here?
            </h2>
            <Link
              href="/contact"
              className="eyebrow mt-10 inline-block rounded-full bg-brand px-8 py-4 text-paper transition-colors hover:bg-ink"
            >
              Start a project →
            </Link>
          </Reveal>
        </Section>

        <Footer />
      </main>
    </>
  );
}
