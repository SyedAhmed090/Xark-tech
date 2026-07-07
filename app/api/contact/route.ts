export async function POST(req: Request) {
  let payload: { name?: string; email?: string; message?: string };
  try {
    payload = await req.json();
  } catch {
    return Response.json({ ok: false, reason: "bad-request" }, { status: 400 });
  }

  const name = (payload.name ?? "").toString().slice(0, 200);
  const email = (payload.email ?? "").toString().slice(0, 200);
  const message = (payload.message ?? "").toString().slice(0, 5000);
  if (!message && !email) {
    return Response.json({ ok: false, reason: "empty" }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet — the form falls back to a mailto: compose
    return Response.json({ ok: false, reason: "unconfigured" }, { status: 501 });
  }

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
      text: `${message}\n\n— ${name}${email ? ` (${email})` : ""}`,
    }),
  });

  if (!res.ok) {
    return Response.json({ ok: false, reason: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
