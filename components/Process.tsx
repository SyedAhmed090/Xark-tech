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
    /* Four across, not four down.
     *
     * This was a sticky heading in a left column with the steps listed down a
     * right one — the same shape as the two sections after it, and four full
     * screens of scrolling to read four short paragraphs. Laid out
     * horizontally the whole process fits one screen, which is also the point
     * being made: it is short. */
    <Section id="process" size="lg" className="bg-sand">
      <Reveal>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4 text-brand">How we work</p>
          <h2 className="display display-section">
            Four steps, and you know the price at step one.
          </h2>
          <p className="mt-5 max-w-xl text-muted">
            Most agency processes are theater — a discovery phase whose main
            deliverable is an invoice. Ours is four steps because that is how
            many it takes to get you a finished thing.
          </p>
        </div>
      </Reveal>

      <ol className="mt-12 grid gap-px border-t-2 border-ink sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.06}>
            <li className="h-full border-t border-[color:var(--color-line-strong)] pt-6 sm:border-t-0 sm:border-l sm:pl-6 sm:pt-0 lg:pl-8">
              <span className="price block text-4xl text-brand md:text-5xl">
                {step.number}
              </span>
              <h3 className="display-tight mt-4 text-xl">{step.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.detail}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
