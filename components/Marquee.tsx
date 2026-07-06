const ITEMS = [
  "Brand identity",
  "Product design",
  "Web development",
  "Motion & 3D",
  "Design systems",
];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="display px-6 py-4 text-3xl text-paper md:text-5xl">
            {item}
          </span>
          <span className="font-serif italic text-2xl text-paper/60 md:text-4xl">
            ✕
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="overflow-hidden bg-klein" aria-hidden>
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  );
}
