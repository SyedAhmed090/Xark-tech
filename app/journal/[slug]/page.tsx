import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import JsonLd from "@/components/JsonLd";
import { POSTS, getPost, type Post } from "@/lib/posts";
import { ORG_REF, absoluteUrl, breadcrumbs, pageMeta } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    ...pageMeta({
      title: post.title,
      description: post.dek,
      path: `/journal/${post.slug}`,
    }),
    // Articles get the richer OG type, which pageMeta defaults to "website".
    openGraph: {
      title: `${post.title} — Xark Tech`,
      description: post.dek,
      url: `/journal/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function postSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.dek,
    url: absoluteUrl(`/journal/${post.slug}`),
    datePublished: post.date,
    dateModified: post.date,
    author: ORG_REF,
    publisher: ORG_REF,
    inLanguage: "en-US",
    wordCount: post.body.join(" ").split(/\s+/).length,
    articleBody: post.body.join("\n\n"),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/journal/${post.slug}`),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const next =
    POSTS[(POSTS.findIndex((p) => p.slug === post.slug) + 1) % POSTS.length];
  const mid = Math.ceil(post.body.length / 2);

  return (
    <SmoothScroll>
      <JsonLd data={postSchema(post)} />
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <article className="px-5 md:px-10">
          <header className="mx-auto max-w-4xl">
            <Reveal>
              <p className="eyebrow mb-4 text-klein">
                Journal — {post.displayDate} — {post.readingTime}
              </p>
              <h1 className="display-tight text-[clamp(2.25rem,6vw,5.5rem)]">
                {post.title}
              </h1>
              <p className="mt-6 font-serif italic text-xl text-ink/70 md:text-2xl">
                {post.dek}
              </p>
            </Reveal>
          </header>

          <div className="mx-auto max-w-3xl py-16 md:py-20">
            {post.body.slice(0, mid).map((para, i) => (
              <Reveal key={i} delay={Math.min(i * 0.04, 0.15)}>
                <p className="mb-7 text-lg leading-relaxed text-ink/80">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <blockquote className="my-14 border-l-2 border-klein pl-8 font-serif italic text-2xl leading-snug text-ink md:text-3xl">
                {post.pullQuote}
              </blockquote>
            </Reveal>

            {post.body.slice(mid).map((para, i) => (
              <Reveal key={mid + i}>
                <p className="mb-7 text-lg leading-relaxed text-ink/80">
                  {para}
                </p>
              </Reveal>
            ))}

            <Reveal>
              <p className="mt-12 flex items-center gap-3">
                <span className="h-px w-10 bg-klein" aria-hidden />
                <span className="eyebrow text-ink/60">
                  The Xark Tech team — Austin, TX
                </span>
              </p>
            </Reveal>
          </div>
        </article>

        <section className="px-5 hairline-t md:px-10">
          <Reveal>
            <div className="mx-auto max-w-3xl py-12 md:py-16">
              <p className="eyebrow mb-5 text-klein">Enjoyed this?</p>
              <NewsletterForm />
            </div>
          </Reveal>
        </section>

        <section className="px-5 py-16 hairline-t md:px-10 md:py-24">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Read next</p>
            <Link href={`/journal/${next.slug}`} className="group block" data-hover>
              <h2 className="display-tight text-3xl transition-colors group-hover:text-klein md:text-5xl">
                {next.title} →
              </h2>
            </Link>
            <Link
              href="/journal"
              className="eyebrow mt-10 inline-block py-1.5 text-ink/60 transition-colors hover:text-klein"
            >
              ← All notes
            </Link>
          </Reveal>
        </section>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
