import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Terms of use",
  description:
    "The terms that apply to using the Xark Tech website, including content ownership and governing law.",
  path: "/terms",
});

const SECTIONS = [
  {
    title: "This site",
    body: "This website is operated by Xark Tech LLC, Austin, Texas. Its content — text, design, illustrations, and code — belongs to Xark Tech and may not be reproduced commercially without permission. Client names and project details are shown with permission or in anonymized, illustrative form.",
  },
  {
    title: "No engagement without a contract",
    body: "Nothing on this site constitutes an offer, quote, or engagement. Pricing shown is indicative starting pricing; actual engagements are governed by a signed statement of work. Contacting us through the site creates no obligation on either side.",
  },
  {
    title: "Accuracy",
    body: "We keep the site current in good faith, but metrics, availability windows, and pricing can change without notice. Case study results reflect specific engagements and do not guarantee similar outcomes.",
  },
  {
    title: "External links",
    body: "Links to third-party sites (award bodies, social platforms) are provided for convenience. We are not responsible for their content or their privacy practices.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the State of Texas. Questions about them can be sent to hello@xarktech.com.",
  },
];

export default function TermsPage() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main id="main" className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-klein">Legal</p>
            <h1 className="display text-[clamp(2.5rem,8vw,7rem)]">
              Terms of use
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
