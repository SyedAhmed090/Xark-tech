import { Reveal } from "./Reveal";

const TEAM = [
  {
    name: "Syed Ahmed",
    role: "Founder & Creative Director",
    initials: "SA",
    tone: "bg-klein text-paper",
  },
  {
    name: "Maya Chen",
    role: "Head of Design",
    initials: "MC",
    tone: "bg-ink text-paper",
  },
  {
    name: "Jordan Blake",
    role: "Engineering Lead",
    initials: "JB",
    tone: "bg-tint text-klein",
  },
  {
    name: "Priya Nair",
    role: "Strategy Director",
    initials: "PN",
    tone: "bg-stone/50 text-ink",
  },
];

export default function Team() {
  return (
    <section id="team" className="px-5 py-24 hairline-t md:px-10 md:py-36">
      <Reveal>
        <p className="eyebrow mb-4 text-klein">The people</p>
        <h2 className="display-tight max-w-3xl text-4xl md:text-6xl">
          A senior team of four. No account layers, no juniors on your budget.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </section>
  );
}
