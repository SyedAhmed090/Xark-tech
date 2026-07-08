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
  const name = String(data.name ?? "").slice(0, 200);
  const email = String(data.email ?? "").slice(0, 200);
  const message = String(data.message ?? "").slice(0, 5000);
  const budget = String(data.budget ?? "").slice(0, 50);
  const honeypot = String(data.company ?? "");

  // Bots fill the hidden field — pretend success, send nothing
  if (honeypot) {
    return Response.json({ ok: true });
  }
  if (!message && !email) {
    return Response.json({ ok: false, reason: "empty" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet — the form falls back to a mailto: compose
    return Response.json({ ok: false, reason: "unconfigured" }, { status: 501 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Xark website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO ?? "hello@xark.tech"],
        reply_to: email || undefined,
        subject: `Project inquiry${name ? ` from ${name}` : ""}`,
        text: `${message}${budget ? `\nBudget: ${budget}` : ""}\n\n— ${name}${email ? ` (${email})` : ""}`,
      }),
    });
    if (!res.ok) {
      return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
