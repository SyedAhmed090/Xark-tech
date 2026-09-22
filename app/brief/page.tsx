import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BriefForm from "@/components/BriefForm";
import { noindexPage } from "@/lib/site";

/**
 * Noindex: this is a funnel step, not a landing page. It has no content worth
 * ranking, and indexing it would put a bare form in results competing with the
 * service pages that actually sell.
 */
export const metadata: Metadata = noindexPage("/brief");

export default function BriefPage() {
  return (
    <>
      <Nav />
      <main id="main" className="pb-20 md:pb-0">
        <section className="px-5 pt-28 pb-16 md:px-10 md:pt-32 md:pb-24">
          <div className="mx-auto max-w-2xl">
            <p className="eyebrow text-brand">Start your project</p>
            <h1 className="display mt-4 text-[clamp(2rem,5.5vw,3.5rem)]">
              Tell us what you need
            </h1>
            <p className="mt-5 leading-relaxed text-muted">
              This replaces the discovery call. Answer what you can — the more
              you tell us here, the closer the first draft lands, and the fewer
              rounds it takes to get right. Nothing is charged yet.
            </p>

            <div className="mt-10">
              {/*
                BriefForm reads `?package=` with useSearchParams, which forces
                everything up to the nearest Suspense boundary to render on the
                client. Bounding it here keeps the heading above prerendered in
                the exported HTML instead of the whole page going blank until
                hydration.
              */}
              <Suspense
                fallback={
                  <div className="card p-8 text-sm text-muted">
                    Loading the brief…
                  </div>
                }
              >
                <BriefForm />
              </Suspense>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
