import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import LogoStrip from "@/components/LogoStrip";
import Services from "@/components/Services";
import Work from "@/components/Work";
import FeaturedCase from "@/components/FeaturedCase";
import Stats from "@/components/Stats";
import Process from "@/components/Process";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <LogoStrip />
        <Services />
        <Work />
        <FeaturedCase />
        <Stats />
        <Process />
        <Team />
        <Testimonials />
        <FAQ />
        <CTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
