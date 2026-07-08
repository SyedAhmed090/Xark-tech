/* Screenshot target for the Forma Studio case study — an architecture
   portfolio homepage. No real photography; the shipped design leans on
   restrained type and full-bleed color fields instead of stock imagery. */

const PROJECTS = [
  { name: "Cedar Ridge House", year: "2025", tone: "bg-ink" },
  { name: "Marfa Pavilion", year: "2024", tone: "bg-[#8a6d3b]" },
  { name: "Salt Flat Studio", year: "2024", tone: "bg-stone" },
];

export default function FormaStudioDemo() {
  return (
    <div className="flex h-[1000px] w-[1600px] flex-col bg-paper font-sans text-ink">
      <header className="flex items-center justify-between px-16 py-8">
        <span className="font-mono text-sm tracking-widest">FORMA STUDIO</span>
        <nav className="flex gap-10 text-sm text-ink/60">
          <span>Work</span>
          <span>Practice</span>
          <span>Journal</span>
          <span>Contact</span>
        </nav>
      </header>

      <section className="flex flex-1 items-center gap-16 px-16">
        <div className="w-[38%]">
          <p className="mb-6 font-mono text-xs uppercase tracking-widest text-[#8a6d3b]">
            Selected work, 2019–2026
          </p>
          <h1 className="font-serif text-[64px] italic leading-[1.05]">
            Buildings that hold still light.
          </h1>
        </div>
        <div className="relative h-[76%] w-[62%] overflow-hidden">
          <div className="absolute inset-0 bg-ink" />
          <div className="absolute inset-x-[18%] bottom-0 top-[22%] bg-[#8a6d3b]" />
          <div className="absolute bottom-[8%] left-[8%] right-[8%] flex items-end justify-between text-paper">
            <p className="font-serif text-3xl italic">Cedar Ridge House</p>
            <p className="font-mono text-xs text-paper/60">Austin, TX — 2025</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-px bg-hairline">
        {PROJECTS.map((p) => (
          <div key={p.name} className={`relative h-64 ${p.tone}`}>
            <div className="absolute bottom-6 left-6 text-paper">
              <p className="font-serif text-xl italic">{p.name}</p>
              <p className="mt-1 font-mono text-xs text-paper/50">{p.year}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
