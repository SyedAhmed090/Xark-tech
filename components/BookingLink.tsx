import Magnetic from "./Magnetic";

/* Renders nothing unless NEXT_PUBLIC_CAL_LINK is set — no placeholder
   booking button pointing at a Cal.com account that doesn't exist yet. */
export default function BookingLink() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  if (!calLink) return null;

  return (
    <div>
      <p className="eyebrow mb-4 text-klein">Rather just talk?</p>
      <Magnetic strength={0.2}>
        <a
          href={`https://cal.com/${calLink}`}
          target="_blank"
          rel="noreferrer"
          className="eyebrow inline-block rounded-full bg-ink px-7 py-4 text-paper transition-colors hover:bg-klein"
          data-hover
        >
          Book a 30-minute intro call →
        </a>
      </Magnetic>
    </div>
  );
}
