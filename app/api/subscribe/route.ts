export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }
  if (typeof payload !== "object" || payload === null) {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;
  const email = String(data.email ?? "")
    .slice(0, 200)
    .trim();
  const honeypot = String(data.company ?? "");

  if (honeypot) {
    return Response.json({ ok: true });
  }
  if (!email || !email.includes("@")) {
    return Response.json({ ok: false, reason: "invalid-email" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!key || !audienceId) {
    // Not configured yet — no mailing list exists to add them to
    return Response.json({ ok: false, reason: "unconfigured" }, { status: 501 });
  }

  try {
    const res = await fetch(
      `https://api.resend.com/audiences/${audienceId}/contacts`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, unsubscribed: false }),
      }
    );
    if (!res.ok) {
      return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
