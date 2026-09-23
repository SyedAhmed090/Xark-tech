import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import JsonLd from "@/components/JsonLd";
import {
  POSTS,
  getPost,
  headingId,
  plainText,
  postHeadings,
  postProse,
  postWordCount,
  relatedPosts,
  runs,
  type Block,
  type Post,
  type Rich,
} from "@/lib/posts";
import { ORG_REF, absoluteUrl, breadcrumbs, pageMeta, pageUrl } from "@/lib/site";

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
  // The dek addresses someone already reading; metaDescription is written for
  // the search result. Fall back to the dek when a post has no dedicated one.
  const description = post.metaDescription ?? post.dek;
  return {
    ...pageMeta({
      title: post.title,
      description,
      path: `/journal/${post.slug}`,
    }),
    // Articles get the richer OG type, which pageMeta defaults to "website".
    openGraph: {
      title: `${post.title} — Xark Tech`,
      description,
      url: `/journal/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function postSchema(post: Post) {
  const prose = postProse(post);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription ?? post.dek,
    url: pageUrl(`/journal/${post.slug}`),
    datePublished: post.date,
    dateModified: post.date,
    author: ORG_REF,
    publisher: ORG_REF,
    inLanguage: "en-US",
    wordCount: postWordCount(post),
    articleBody: prose.join("\n\n"),
    // The section headings, so a crawler can see the shape of the argument
    // without parsing the body.
    articleSection: postHeadings(post).map((h) => h.text),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl(`/journal/${post.slug}`),
    },
  };
}

/** Mirrors the on-page questions. Never add a Q&A here that isn't visible. */
function faqSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (post.faqs ?? []).map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: plainText(faq.a) },
    })),
  };
}

const LINK_CLASS =
  "text-brand underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand";

/** Authored text with its inline links resolved. */
function Runs({ text }: { text: Rich }) {
  return (
    <>
      {runs(text).map((run, i) =>
        typeof run === "string" ? (
          run
        ) : (
          <Link key={i} href={run.href} className={LINK_CLASS}>
            {run.text}
          </Link>
        ),
      )}
    </>
  );
}

function BodyBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2
          id={headingId(block.text)}
          className="display-tight mt-14 mb-6 scroll-mt-32 text-2xl md:text-3xl"
        >
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mb-7 text-lg leading-relaxed text-ink/80">
          <Runs text={block.text} />
        </p>
      );
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List
          className={`mb-7 space-y-3 pl-6 text-lg leading-relaxed text-ink/80 ${
            block.ordered ? "list-decimal" : "list-disc"
          } marker:text-brand`}
        >
          {block.items.map((item, i) => (
            <li key={i} className="pl-1">
              <Runs text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "quote":
      return (
        <blockquote className="my-14 border-l-2 border-brand pl-8 font-serif text-2xl leading-snug italic text-ink md:text-3xl">
          {block.text}
        </blockquote>
      );
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const headings = postHeadings(post);
  const related = relatedPosts(post);
  const faqs = post.faqs ?? [];

  return (
    <>
      <JsonLd data={postSchema(post)} />
      {faqs.length > 0 && <JsonLd data={faqSchema(post)} />}
      <JsonLd
        data={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${post.slug}` },
        ])}
      />
      <Nav />
      <main id="main" className="pt-32">
        <article className="px-5 md:px-10">
          <header className="mx-auto max-w-4xl">
            <Reveal>
              <p className="eyebrow mb-4 text-brand">
                Journal — {post.displayDate} — {post.readingTime}
              </p>
              <h1 className="display-tight text-[clamp(2.25rem,6vw,5.5rem)]">
                {post.title}
              </h1>
              <p className="mt-6 font-serif text-xl italic text-ink/70 md:text-2xl">
                {post.dek}
              </p>
            </Reveal>
          </header>

          <div className="mx-auto max-w-3xl py-16 md:py-20">
            {/* Long pieces get a contents list: it gives readers the argument at
                a glance and gives every section a shareable anchor. */}
            {headings.length >= 3 && (
              <Reveal>
                <nav
                  aria-labelledby="contents-heading"
                  className="mb-16 hairline-t pt-6"
                >
                  <p
                    id="contents-heading"
                    className="eyebrow mb-4 text-ink/50"
                  >
                    In this piece
                  </p>
                  <ul className="space-y-0.5">
                    {headings.map((heading) => (
                      <li key={heading.id}>
                        {/* py-1.5 takes these to a 29px target: they are a
                            navigation list, so the inline-link exception to
                            WCAG 2.2 target size does not apply. */}
                        <Link
                          href={`#${heading.id}`}
                          className="inline-block py-1.5 text-ink/70 transition-colors hover:text-brand"
                        >
                          {heading.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            )}

            {post.blocks.map((block, i) => (
              <Reveal
                key={i}
                delay={block.kind === "p" ? Math.min(i * 0.02, 0.1) : 0}
              >
                <BodyBlock block={block} />
              </Reveal>
            ))}

            <Reveal>
              <p className="mt-12 flex items-center gap-3">
                <span className="h-px w-10 bg-brand" aria-hidden />
                <span className="eyebrow text-ink/60">
                  The Xark Tech team — Sheridan, WY
                </span>
              </p>
            </Reveal>
          </div>
        </article>

        {faqs.length > 0 && (
          <section className="px-5 hairline-t md:px-10">
            <div className="mx-auto max-w-3xl py-16 md:py-20">
              <Reveal>
                <h2 className="display-tight mb-10 text-2xl md:text-3xl">
                  Common questions
                </h2>
              </Reveal>
              <dl>
                {faqs.map((faq, i) => (
                  <Reveal key={faq.q} delay={Math.min(i * 0.05, 0.15)}>
                    <div className="mb-9">
                      <dt className="mb-3 text-lg font-medium text-ink">
                        {faq.q}
                      </dt>
                      <dd className="text-lg leading-relaxed text-ink/70">
                        <Runs text={faq.a} />
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </section>
        )}

        <section className="px-5 hairline-t md:px-10">
          <Reveal>
            <div className="mx-auto max-w-3xl py-12 md:py-16">
              <p className="eyebrow mb-5 text-brand">Enjoyed this?</p>
              <NewsletterForm />
            </div>
          </Reveal>
        </section>

        {related.length > 0 && (
          <section className="px-5 py-16 hairline-t md:px-10 md:py-24">
            <Reveal>
              <p className="eyebrow mb-4 text-brand">Read next</p>
              <div className="space-y-8">
                {related.map((next) => (
                  <Link
                    key={next.slug}
                    href={`/journal/${next.slug}`}
                    className="group block"
                  >
                    <h2 className="display-tight text-3xl transition-colors group-hover:text-brand md:text-5xl">
                      {next.title} →
                    </h2>
                    <p className="mt-3 max-w-xl text-ink/60">{next.dek}</p>
                  </Link>
                ))}
              </div>
              <Link
                href="/journal"
                className="eyebrow mt-10 inline-block py-1.5 text-ink/60 transition-colors hover:text-brand"
              >
                ← All notes
              </Link>
            </Reveal>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}
