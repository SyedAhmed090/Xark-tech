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
    tone: "bg-klein text-paper",
  },
];

export default function Team() {
  return (
    <section id="team" className="px-5 py-24 hairline-t md:px-10 md:py-36">
      <Reveal>
        <p className="eyebrow mb-4 text-klein">The people</p>
        <h2 className="display-tight max-w-3xl text-4xl md:text-6xl">
          Founder-led. The person you meet is the person doing the work.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-10 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-16">
        {TEAM.map((person, i) => (
          <Reveal key={person.name} delay={i * 0.07}>
            <div className="group" data-hover>
              <div
                className={`grain relative flex aspect-[3/4] items-end overflow-hidden rounded-sm p-6 transition-transform duration-500 ease-out group-hover:-translate-y-2 ${person.tone}`}
              >
                <span className="font-serif italic text-[7rem] leading-none opacity-90 transition-transform duration-500 group-hover:scale-110">
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
            No account layer, no handoff to juniors, no big reveal at the end.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
            Xark Tech is deliberately small. Every engagement is run by the
            person who scoped it, which keeps decisions fast and the work
            consistent from first call to launch. When a project needs a
            specialist — an illustrator, a copywriter, an engineer — we bring in
            trusted collaborators and tell you exactly who is doing what.
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-ink/70">
            The trade-off is honest: we take on fewer projects at a time. If the
            timing doesn&rsquo;t work, we&rsquo;ll say so on the first call
            rather than stretch and under-deliver.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
