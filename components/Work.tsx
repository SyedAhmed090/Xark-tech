import Link from "next/link";
import { Reveal } from "./Reveal";
import Section from "./Section";
import { PROJECTS } from "@/lib/projects";

/**
 * A band, not a gallery.
 *
 * This used to render four full case-study tiles, which cost the homepage
 * 888KB of JPEG - against 49KB of gzipped HTML for the whole page - to show a
 * treasury dashboard, a patient check-in app, an architecture studio site and
 * a freight dispatch board to someone pricing a $399 website for their shop.
 * Wrong audience, and nine times the page's own weight, so both problems take
 * the same fix: name the work, link to it, ship none of it here.
 *
 * The concepts stay on /work, where the copy already explains why the briefs
 * are software. Anyone who wants that proof is one click away; everyone else
 * stops paying to download it.
 */
export default function Work() {
  return (
    <Section id="work" size="sm" className="bg-paper">
      <Reveal>
        <div className="md:grid md:grid-cols-[1fr_1.15fr] md:gap-16">
          <div>
            <p className="eyebrow mb-4 text-brand">Selected work</p>
            <h2 className="display display-section">
              Concept projects, built not mocked up
            </h2>
          </div>

          <div className="mt-6 md:mt-0">
            <p className="max-w-xl leading-relaxed text-muted">
              Four self-initiated concepts, each designed and then actually
              built, so you can open the prototype rather than take our word for
              it. They are deliberately hard briefs: if the detail holds up at
              that level, it holds up on a five-page site for a local business.
            </p>

            <ul className="mt-7 grid gap-2 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="flex items-baseline gap-2 rounded-full border border-[color:var(--color-line-strong)] px-4 py-2 text-sm font-semibold transition-colors hover:border-brand hover:text-brand"
                  >
                    {project.name}
                    <span className="font-mono text-xs text-muted">
                      {project.category}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/work"
              className="mt-7 inline-block inline-block py-1.5 text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              See all four in full &rarr;
            </Link>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
