import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Section from "@/components/Section";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { PROJECTS, getProject, type Project } from "@/lib/projects";
import { ORG_REF, absoluteUrl, breadcrumbs, pageMeta, pageUrl } from "@/lib/site";

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
  return pageMeta({
    title: `${project.name} — case study`,
    description: project.summary,
    path: `/work/${project.slug}`,
    images: [`/portfolio/${project.slug}-photo.jpg`],
  });
}

function caseStudySchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${project.name} — ${project.category} case study`,
    description: project.summary,
    url: pageUrl(`/work/${project.slug}`),
    image: absoluteUrl(`/portfolio/${project.slug}-photo.jpg`),
    author: ORG_REF,
    publisher: ORG_REF,
    about: project.services,
    // Case studies carry a year, not a full publication date.
    datePublished: `${project.year}-01-01`,
    inLanguage: "en-US",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl(`/work/${project.slug}`),
    },
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
    <>
      <JsonLd data={caseStudySchema(project)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.name, path: `/work/${project.slug}` },
        ])}
      />
      <Nav />
      <main id="main" className="pt-32">
        <Section size="none">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">
              {project.category} — {project.year}
            </p>
            {/* Stated before the title, not buried in the body: a reader must
                not be able to mistake this for a paid client engagement. */}
            <p className="eyebrow mb-6 inline-block rounded-full border border-ink/20 px-3 py-1.5 text-ink/60">
              {project.kind}
            </p>
            {/* Floor is 2.25rem, not 3rem: single-word titles like "Meridian"
                can't wrap, and at 3rem the ultra-wide display face overflowed
                a 320px viewport by 6px. Only affects widths under ~400px. */}
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
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
            {/* The prototype is the strongest evidence this project has —
                it's a real build, not a mockup, so link it prominently. */}
            <Link
              href={project.demoHref}
              className="eyebrow mt-8 inline-block rounded-full bg-brand px-6 py-3 text-paper transition-colors hover:bg-ink"
            >
              Open the prototype →
            </Link>
          </Reveal>
        </Section>

        <Section size="none" className="mt-16">
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm md:aspect-[21/9]">
              {project.cover}
            </div>
          </Reveal>
        </Section>

        <Section inner="max-w-[84rem] grid gap-16 md:grid-cols-3 md:gap-10">
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
        </Section>

        <Section size="none" className="pb-16 md:pb-24">
          <Reveal>
            <p className="eyebrow mb-10 text-brand">Inside the process</p>
          </Reveal>
          <div className="flex flex-col gap-16">
            {project.artifacts.map((artifact, i) => (
              <Reveal key={artifact.caption} delay={i * 0.05}>
                <figure className={i % 2 === 1 ? "md:ml-auto md:w-4/5" : "md:w-4/5"}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                    {artifact.panel}
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="font-mono text-xs text-brand">
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
        </Section>

        <Section className="bg-ink text-paper">
          <div className="grid gap-12 md:grid-cols-3 md:gap-8 md:divide-x md:divide-paper/15">
            {project.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08} className="md:px-8 md:first:pl-0">
                <p className="display text-4xl text-paper md:text-5xl">{stat.value}</p>
                <p className="eyebrow mt-3 text-paper/50">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        <Section size="lg">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">Next case</p>
            <Link href={`/work/${next.slug}`} className="group block">
              <h2 className="display-tight text-4xl transition-colors group-hover:text-brand md:text-7xl">
                {next.name} →
              </h2>
              <p className="mt-3 text-ink/60">{next.category}</p>
            </Link>
            <Link
              href="/work"
              className="eyebrow mt-12 inline-block py-1.5 text-ink/60 transition-colors hover:text-brand"
            >
              ← All work
            </Link>
          </Reveal>
        </Section>

        <Footer />
      </main>
    </>
  );
}
