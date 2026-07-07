import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.name} — Xark Tech case study`,
    description: project.summary,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const next =
    PROJECTS[(PROJECTS.findIndex((p) => p.slug === project.slug) + 1) % PROJECTS.length];

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">
              Case study — {project.category} — {project.year}
            </p>
            <h1 className="display text-[clamp(3rem,12vw,11rem)]">
              {project.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              {project.summary}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {project.services.map((s) => (
                <li
                  key={s}
                  className="eyebrow rounded-full border border-ink/20 px-3 py-1.5 text-ink/60"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </header>

        <Reveal className="mt-16 px-5 md:px-10">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]">
            {project.cover}
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-[1600px] gap-16 px-5 py-24 md:grid-cols-3 md:gap-10 md:px-10 md:py-36">
          {(
            [
              ["The challenge", project.challenge],
              ["The approach", project.approach],
              ["The outcome", project.outcome],
            ] as const
          ).map(([title, body], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <h2 className="display-tight text-2xl">{title}</h2>
              <p className="mt-5 leading-relaxed text-ink/70">{body}</p>
            </Reveal>
          ))}
        </div>

        <section className="px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <p className="eyebrow mb-10 text-klein">Inside the process</p>
          </Reveal>
          <div className="flex flex-col gap-16">
            {project.artifacts.map((artifact, i) => (
              <Reveal key={artifact.caption} delay={i * 0.05}>
                <figure className={i % 2 === 1 ? "md:ml-auto md:w-4/5" : "md:w-4/5"}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                    {artifact.panel}
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-klein">
                      0{i + 1}
                    </span>
                    <span className="max-w-md text-sm text-ink/60">
                      {artifact.caption}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="bg-ink px-5 py-20 text-paper md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8 md:divide-x md:divide-paper/15">
            {project.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="md:px-8 md:first:pl-0">
                <p className="display text-5xl text-paper md:text-6xl">{stat.value}</p>
                <p className="eyebrow mt-3 text-paper/50">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-5 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Next case</p>
            <Link href={`/work/${next.slug}`} className="group block" data-hover>
              <h2 className="display-tight text-4xl transition-colors group-hover:text-klein md:text-7xl">
                {next.name} →
              </h2>
              <p className="mt-3 text-ink/60">{next.category}</p>
            </Link>
            <Link
              href="/#work"
              className="eyebrow mt-12 inline-block text-ink/60 transition-colors hover:text-klein"
            >
              ← All work
            </Link>
          </Reveal>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
