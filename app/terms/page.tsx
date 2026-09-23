import type { Metadata } from "next";
import { SITE, pageMeta } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = pageMeta({
  title: "Terms",
  description:
    "What each package includes, how many revisions you get, when refunds apply, and what you own when the work is done.",
  path: "/terms",
});

const SECTIONS = [
  {
    title: "This site",
    body: "This website is operated by Xark Tech LLC, Sheridan, Wyoming. Its content — text, design, illustrations, and code — belongs to Xark Tech and may not be reproduced commercially without permission. Client names and project details are shown with permission or in anonymized, illustrative form.",
  },
  {
    title: "Prices and scope",
    body: "Package prices on this site are fixed, not estimates: the price shown is what that package costs, and the scope listed with it is what it includes. Work outside a package's listed scope is quoted separately and only starts once you have agreed it in writing. Submitting a brief creates no obligation on either side — we confirm scope, price and a delivery date first.",
  },
  {
    title: "Revisions",
    body: "Each package states its own number of revision rounds and we honour exactly that. Logo packages from $199 upward include unlimited revisions for fourteen days from the first concepts; the $99 package includes two rounds. A revision means changes to the direction you selected. Asking to start again from a different concept is new work, and we will say so and quote it rather than absorb it quietly or run out of goodwill halfway through.",
  },
  {
    title: "What we need from you",
    body: "Every project starts from your brief, and websites also need your text and images unless you have bought copywriting. We will tell you what is outstanding. If we are waiting on you, the delivery date moves by the time we waited — it is not lost, and we do not charge a penalty for it. If a project goes quiet for more than sixty days we may close it and invoice for the work completed to that point.",
  },
  {
    title: "Delivery dates and refunds",
    body: "You get a delivery date in writing before you pay. If a website build misses the date we gave you, for reasons that are ours rather than a delay in receiving your content, your deposit is refunded on request. Design work — logos and brand identity — is refundable in full until the first concepts are sent, because after that the work exists. Monthly plans can be cancelled at any time and are not refunded for the month already in progress; nothing is locked into a minimum term.",
  },
  {
    title: "What you own",
    body: "On final payment, the delivered design is yours outright. Every logo package, including the $99 one, ships the full vector set — AI, EPS, SVG and PDF — plus web formats, and there is no charge to release them. We do not place our name on your website and there is no fee to remove anything. Third-party assets used in a project, such as licensed fonts or stock photography, remain under their own licences, and we will tell you which apply.",
  },
  {
    title: "Accuracy",
    body: "We keep the site current in good faith, but pricing and turnaround times can change without notice. A price you have already been quoted in writing does not change. Case studies shown here are self-initiated concept projects and are labelled as such; they demonstrate craft rather than promise a particular result for your business.",
  },
  {
    title: "External links",
    body: "Links to third-party sites (award bodies, social platforms) are provided for convenience. We are not responsible for their content or their privacy practices.",
  },
  {
    title: "Governing law",
    body: `These terms are governed by the laws of the State of Wyoming. Questions about them can be sent to ${SITE.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pt-32">
        <header className="px-5 md:px-10">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">Legal</p>
            <h1 className="display text-[clamp(2.25rem,6.5vw,4.5rem)]">
              Terms
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
    </>
  );
}
