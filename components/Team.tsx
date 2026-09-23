import { Reveal } from "./Reveal";
import { SITE } from "@/lib/site";

/**
 * Only the founder is listed. The previous version named three additional
 * designers who could not be verified; inventing colleagues misrepresents who
 * a client would actually be working with, which is the one thing this section
 * exists to answer. Add real people to TEAM and the grid below scales to them.
 */
const TEAM = [
  {
    name: SITE.founder,
    role: "Founder & Creative Director",
    initials: "SA",
    tone: "bg-brand text-paper",
  },
];

export default function Team() {
  return (
    <section id="team" className="px-5 py-24 hairline-t md:px-10 md:py-36">
      <Reveal>
        <p className="eyebrow mb-4 text-brand">The people</p>
        {/* Was "the person you meet is the person doing the work" — true of
            the studio, and now contradicted by the production team described
            on this same page and in the FAQ. Claiming otherwise is the kind
            of small lie a client discovers on day two. */}
        <h2 className="display-tight max-w-3xl text-4xl md:text-6xl">
          Founder-led, with a production team — and one person accountable for
          what reaches you.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
        {TEAM.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.07}>
            <div className="group">
              <div
                className={`grain relative flex aspect-[3/4] items-end overflow-hidden rounded-sm p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2 ${person.tone}`}
              >
                <span className="text-[7rem] leading-none opacity-90 transition-transform duration-500 group-hover:scale-110">
                  {person.initials}
                </span>
                <span className="eyebrow absolute right-5 top-5 opacity-50">
                  XARK — 0{i + 1}
                </span>
              </div>
              <h3 className="display-tight mt-4 text-xl">{person.name}</h3>
              <p className="mt-1 text-sm text-ink/60">{person.role}</p>
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.12} className="md:pt-6">
          <p className="max-w-xl text-xl leading-relaxed text-ink/80 md:text-2xl">
            No account manager, no sales team, and nothing reaches you unseen.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Design and build are handled by a production team we work with
            directly. Every brief is read here, and every draft is reviewed here
            before it goes to you — so there is one person accountable for what
            lands in your inbox, whoever drew it.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            That structure is why the prices on this site are possible. It also
            means fixed scope: a package is a package, and anything outside it
            gets quoted rather than absorbed quietly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
