import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkTile from "@/components/WorkTile";
import Magnetic from "@/components/Magnetic";
import { Reveal } from "@/components/Reveal";
import { SERVICES, getService } from "@/lib/services";
import { PROJECTS } from "@/lib/projects";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  const title = `${service.name} — Xark Tech`;
  const description = `${service.tagline} ${service.duration}, ${service.price.toLowerCase()}.`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const related = PROJECTS.filter((p) => service.related.includes(p.slug));
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Service</p>
            <h1 className="display text-[clamp(2.75rem,9vw,9rem)]">
              {service.name}
            </h1>
            <p className="mt-6 max-w-xl font-serif italic text-2xl text-ink/80 md:text-3xl">
              {service.tagline}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-ink/70">
              {service.description}
            </p>
          </Reveal>
        </header>

        <section className="mx-auto grid gap-16 px-5 py-20 md:grid-cols-2 md:gap-20 md:px-10 md:py-28">
          <Reveal>
            <h2 className="eyebrow mb-8 text-klein">What you get</h2>
            <ul className="hairline-t">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-baseline gap-4 py-4 hairline-b"
                >
                  <span className="font-serif italic text-klein">✕</span>
                  <span className="display-tight text-lg md:text-xl">{d}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="eyebrow mb-8 text-klein">How it runs</h2>
            <div className="flex flex-col gap-8">
              {service.rhythm.map((step) => (
                <div key={step.title}>
                  <h3 className="font-mono text-sm text-klein">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/70">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="bg-ink px-5 py-16 text-paper md:px-10 md:py-20">
          <Reveal>
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-8 md:flex-row md:gap-20">
                <div>
                  <p className="eyebrow text-paper/50">Typical engagement</p>
                  <p className="display mt-2 text-3xl md:text-4xl">
                    {service.duration}
                  </p>
                </div>
                <div>
                  <p className="eyebrow text-paper/50">Investment</p>
                  <p className="display mt-2 text-3xl md:text-4xl">
                    {service.price}
                  </p>
                </div>
              </div>
              <Magnetic>
                <Link
                  href="/contact"
                  className="eyebrow inline-block rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
                  data-hover
                >
                  Start a conversation →
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </section>

        {related.length > 0 && (
          <section className="px-5 py-20 md:px-10 md:py-28">
            <Reveal>
              <p className="eyebrow mb-10 text-klein">
                {service.name} in the wild
              </p>
            </Reveal>
            <div className="grid gap-10 md:grid-cols-2 md:gap-x-10">
              {related.map((project, i) => (
                <WorkTile key={project.slug} project={project} index={i} />
              ))}
            </div>
          </section>
        )}

        <section className="px-5 pb-24 md:px-10 md:pb-32">
          <Reveal>
            <p className="eyebrow mb-6 text-ink/50">Other services</p>
            <ul className="flex flex-wrap gap-3">
              {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="eyebrow inline-block rounded-full border border-ink/20 px-4 py-2 text-ink/70 transition-colors hover:border-klein hover:text-klein"
                    data-hover
                  >
                    {s.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
