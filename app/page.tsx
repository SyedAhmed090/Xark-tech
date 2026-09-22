import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import BundleCards from "@/components/BundleCards";
import ServiceGrid from "@/components/ServiceGrid";
import WhatYouGet from "@/components/WhatYouGet";
import Process from "@/components/Process";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import JsonLd from "@/components/JsonLd";
import { FAQ_ITEMS } from "@/lib/faq";
import { ORG_REF } from "@/lib/site";

/** Mirrors the visible FAQ verbatim — Google penalises schema that doesn't
 *  match on-page content, so this must stay generated from FAQ_ITEMS. */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
  publisher: ORG_REF,
};

/**
 * Order is the argument, in the sequence a small-business buyer actually asks
 * it: what is this and what does it cost (Hero), what should I buy
 * (BundleCards), what else do you do (ServiceGrid), why you and not the
 * cheaper option (WhatYouGet), how does it work (Process), has it worked
 * before (Work, Testimonials), and the objections (FAQ).
 *
 * The old order opened with a 3D canvas and reached price on the fifth
 * screen — a visitor comparing three quotes on a phone never got there.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={FAQ_SCHEMA} />
      <Nav />
      <main id="main" className="pb-20 md:pb-0">
        <Hero />
        <BundleCards />
        <ServiceGrid />
        <WhatYouGet />
        <Process />
        <Work />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
      <StickyCTA />
    </>
  );
}
