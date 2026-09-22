/**
 * Shared POST handling for the site's forms.
 *
 * The reasoning here is subtle enough that having two copies guarantees they
 * drift, and the failure mode of getting it wrong is telling a visitor their
 * message was sent when it wasn't.
 */
export type SubmitResult =
  /** Our endpoint ran and confirmed it. */
  | "sent"
  /** Rate limiter tripped. The endpoint works; the visitor should wait. */
  | "rate-limited"
  /** Server-side gap the visitor can't fix — fall back to their mail client. */
  | "unconfigured"
  /** The endpoint ran and genuinely failed. */
  | "error";

export async function submitJson(
  endpoint: string,
  payload: unknown,
): Promise<SubmitResult> {
  let unconfigured = false;
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // A 200 is not proof of anything on its own. If PHP isn't executing,
    // Apache serves the .php file as a static asset — status 200, body full of
    // PHP source — and trusting res.ok alone would show a success message for
    // a submission that was never processed. Only our own JSON counts.
    let body: { ok?: boolean } | null = null;
    try {
      body = await res.json();
    } catch {
      body = null;
    }

    if (res.ok && body?.ok === true) return "sent";

    // 200 but not our JSON: the endpoint isn't running as PHP.
    if (res.ok) unconfigured = true;

    // The endpoint is working and pushing back — say so rather than handing
    // over a mail client.
    if (!unconfigured && res.status === 429) return "rate-limited";

    // 404/405 mean the file is absent or PHP isn't running; 501 is the old
    // Next route's "not configured". All three are server-side gaps. Note
    // ||= — a plain assignment would clear the flag set by the 200 case above.
    unconfigured ||=
      res.status === 404 || res.status === 405 || res.status === 501;
  } catch {
    // Network failure — treat like unconfigured and let email carry it.
    unconfigured = true;
  }

  return unconfigured ? "unconfigured" : "error";
}

/** Hands the visitor's own mail client the message, when our endpoint can't. */
export function mailtoFallback(to: string, subject: string, body: string) {
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
