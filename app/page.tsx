import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FocusStrip from "@/components/FocusStrip";
import Services from "@/components/Services";
import Work from "@/components/Work";
import FeaturedCase from "@/components/FeaturedCase";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Team from "@/components/Team";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
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

export default function Home() {
  return (
    <SmoothScroll>
      <JsonLd data={FAQ_SCHEMA} />
      <Preloader />
      <Cursor />
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <FocusStrip />
        <Services />
        <Work />
        <FeaturedCase />
        <Stats />
        <Process />
        <Team />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
