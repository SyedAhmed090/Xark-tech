import Link from "next/link";
import { Reveal } from "./Reveal";
import WorkTile from "./WorkTile";
import { PROJECTS } from "@/lib/projects";

export default function Work() {
  return (
    <section id="work" className="px-5 py-24 md:px-10 md:py-36">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow mb-4 text-klein">Selected work</p>
            <h2 className="display-tight max-w-2xl text-4xl md:text-6xl">
              Concept projects, built not mocked up
            </h2>
          </div>
          <Link
            href="/work"
            className="eyebrow inline-block py-1.5 text-ink/60 transition-colors hover:text-klein"
            data-hover
          >
            All work →
          </Link>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
        {PROJECTS.map((project, i) => (
          <WorkTile key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
