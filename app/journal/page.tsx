import type { Metadata } from "next";
import Link from "next/link";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import NewsletterForm from "@/components/NewsletterForm";
import { POSTS } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Journal — Xark Tech",
  description:
    "Notes on design systems, motion, and running a small studio — from the team at Xark Tech.",
};

export default function JournalIndex() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="grid gap-10 px-5 md:grid-cols-[2fr_1fr] md:gap-8 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Journal</p>
            <h1 className="display text-[clamp(2.75rem,11vw,10rem)]">
              Notes from
              <br />
              the <span className="accent-word">studio</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">
              What we’re learning about design systems, motion, and running a
              small studio — written when we have something to say, not on a
              content calendar.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="md:pt-24">
            <Link
              href={`/journal/${POSTS[0].slug}`}
              className="group block hairline-t pt-6"
              data-hover
            >
              <p className="eyebrow mb-3 text-ink/50">Latest</p>
              <h2 className="display-tight text-xl transition-colors group-hover:text-klein">
                {POSTS[0].title}
              </h2>
              <p className="mt-2 font-mono text-xs text-ink/50">
                {POSTS[0].displayDate} — {POSTS[0].readingTime} →
              </p>
            </Link>
          </Reveal>
        </header>

        <div className="px-5 md:px-10">
          <Reveal delay={0.1}>
            <div className="rounded-sm bg-tint/50 p-6 md:p-8">
              <NewsletterForm />
            </div>
          </Reveal>
        </div>

        <div className="px-5 py-16 md:px-10 md:py-24">
          <div className="hairline-t">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="group grid gap-3 py-10 hairline-b md:grid-cols-[auto_1fr_auto] md:items-baseline md:gap-12"
                  data-hover
                >
                  <span className="font-mono text-xs text-klein">
                    {post.displayDate}
                  </span>
                  <span>
                    <h2 className="display-tight text-2xl transition-colors group-hover:text-klein md:text-4xl">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-ink/60">{post.dek}</p>
                  </span>
                  <span className="font-mono text-xs text-ink/50">
                    {post.readingTime} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}
