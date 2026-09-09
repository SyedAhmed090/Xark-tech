import type { Metadata } from "next";
import { SITE, pageMeta } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Privacy policy",
  description:
    "How Xark Tech handles the small amount of data this site collects, and how to ask us to delete it.",
  path: "/privacy",
});

const SECTIONS = [
  {
    title: "What we collect",
    body: "If you use the contact form, we receive the name, email address, and message you type — nothing else. The site also records anonymous, aggregate usage data (page views, referrers, country-level location) through Vercel Analytics, which does not use cookies and does not identify individual visitors.",
  },
  {
    title: "What we do with it",
    body: "Contact form submissions are delivered to our inbox and used only to reply to you. Analytics data is used to understand which pages are useful. We do not sell, rent, or share any of it with third parties, and we do not run advertising or tracking pixels.",
  },
  {
    title: "Where it lives",
    body: "This site is hosted on Vercel. Form submissions are transmitted via our email provider and stored in our email inbox. We keep inquiry emails for as long as the conversation is relevant, then delete them.",
  },
  {
    title: "Your choices",
    body: `You can email us directly instead of using the form. You can ask us to delete any correspondence at any time by writing to ${SITE.email}, and we will.`,
  },
  {
    title: "Changes",
    body: "If this policy changes, the date below changes with it. Material changes will be noted on this page.",
  },
];

export default function PrivacyPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Legal</p>
            <h1 className="display text-[clamp(2.5rem,8vw,7rem)]">
              Privacy policy
            </h1>
            <p className="mt-6 font-mono text-xs text-ink/50">
              Last updated: July 2026
            </p>
          </Reveal>
        </header>
        <div className="max-w-3xl px-5 py-16 md:px-10 md:py-24">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <section className="py-8 hairline-b">
                <h2 className="display-tight text-xl md:text-2xl">{s.title}</h2>
                <p className="mt-4 leading-relaxed text-ink/70">{s.body}</p>
              </section>
            </Reveal>
          ))}
        </div>
        <Footer />
      </main>
    </SmoothScroll>
  );
}
