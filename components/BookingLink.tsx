/**
 * Optional call booking. Renders nothing unless NEXT_PUBLIC_CAL_LINK is set —
 * no placeholder button pointing at a Cal.com account that doesn't exist.
 *
 * Framed as an alternative rather than the next step. "Book a 30-minute intro
 * call" belonged to a studio sales cycle; here a call is the slower path, and
 * offering it first would undercut the brief that most projects start from.
 */
export default function BookingLink() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK;
  if (!calLink) return null;

  return (
    <div>
      <p className="eyebrow mb-4 text-brand">Prefer to talk it through?</p>
      <a
        href={`https://cal.com/${calLink}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-secondary"
      >
        Book a 15-minute call
      </a>
      <p className="mt-3 max-w-xs text-sm text-muted">
        Not required — most projects start from the written brief, which is
        quicker for you and gives the designer more to work from.
      </p>
    </div>
  );
}
