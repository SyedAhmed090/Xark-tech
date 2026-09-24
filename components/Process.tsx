import { Reveal } from "./Reveal";
import Section from "./Section";

/**
 * The real process, not an agency one.
 *
 * This block previously described a multi-week embedded engagement —
 * stakeholder interviews, weekly working sessions, a design system handed to
 * the client's team. That was true of the studio it was written for, and it
 * sits three screens below a hero promising a logo in three days. A visitor
 * who reads both believes neither.
 */
const STEPS = [
  {
    number: "01",
    name: "Choose",
    detail:
      "Pick a package from the price list. Every number is on the page, so there is no quote to wait for and no call to sit through before you know what it costs.",
  },
  {
    number: "02",
    name: "Brief",
    detail:
      "Fill in the brief — it asks everything a discovery call would, in plain language. We reply with a delivery date before any work starts, and before you pay.",
  },
  {
    number: "03",
    name: "Draft",
    detail:
      "First concepts come back in days, not weeks. You pick a direction and tell us what to change in your own words — no design vocabulary required.",
  },
  {
    number: "04",
    name: "Deliver",
    detail:
      "Revisions, then the final files: the full vector set, web formats, and full ownership. Nothing is held back, and there is no fee to remove our name.",
  },
];

export default function Process() {
  return (
    <Section
      id="process"
      size="lg"
      className="bg-sand"
      inner="max-w-6xl grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20"
    >
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="eyebrow mb-4 text-brand">How we work</p>
            <h2 className="display display-section">
              Four steps, and you know the price at step one.
            </h2>
            <p className="mt-6 max-w-sm text-muted">
              Most agency processes are theater — a discovery phase whose main
              deliverable is an invoice. Ours is four steps because that is how
              many it takes to get you a finished thing.
            </p>
          </Reveal>
        </div>

        <div className="hairline-t">
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.05}>
              <div className="grid grid-cols-[auto_1fr] gap-6 py-7 hairline-b md:gap-12">
                <span className="font-mono text-sm text-brand">{step.number}</span>
                <div>
                  <h3 className="display-tight text-xl md:text-2xl">
                    {step.name}
                  </h3>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted">
                    {step.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
    </Section>
  );
}
