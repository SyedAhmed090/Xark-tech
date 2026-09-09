"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";
import { SITE } from "@/lib/site";

/* Posts to /api/contact.php, the PHP endpoint deployed alongside the static
   export. If that endpoint is missing or PHP isn't executing (404/405/501),
   it falls back to composing in the visitor's mail client rather than showing
   a dead end — a misconfigured server should still let someone reach us. */
export default function ContactForm({
  theme = "klein",
}: {
  theme?: "klein" | "paper";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rate-limited"
  >("idle");
  const [honeypot, setHoneypot] = useState("");

  const onKlein = theme === "klein";
  const label = onKlein ? "text-paper/75" : "text-ink/60";
  const field = onKlein
    ? "border-paper/40 text-paper placeholder:text-paper/55 focus:border-paper"
    : "border-ink/25 text-ink placeholder:text-ink/45 focus:border-klein";
  const button = onKlein
    ? "bg-paper text-ink hover:bg-ink hover:text-paper"
    : "bg-klein text-paper hover:bg-ink";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    let unconfigured = false;
    try {
      const res = await fetch("/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, budget, company: honeypot }),
      });
      // A 200 is not proof of anything on its own. If PHP isn't executing,
      // Apache serves contact.php as a static file — status 200, body full of
      // PHP source — and trusting res.ok alone would show the visitor a
      // success message for a message that was never sent. Only our own JSON
      // counts as delivery.
      let payload: { ok?: boolean } | null = null;
      try {
        payload = await res.json();
      } catch {
        payload = null;
      }

      if (res.ok && payload?.ok === true) {
        setStatus("sent");
        return;
      }
      // 200 but not our JSON: the endpoint isn't running as PHP. Nothing the
      // visitor can do, so hand them the mail client rather than a lie.
      if (res.ok) {
        unconfigured = true;
      }
      // 429 is the rate limiter, and it means the endpoint is working — the
      // visitor needs telling to wait, not a mail client.
      if (!unconfigured && res.status === 429) {
        setStatus("rate-limited");
        return;
      }
      // 404/405 mean the PHP file is absent or PHP isn't running; 501 is the
      // old Next route's "not configured". All three are server-side gaps the
      // visitor can't fix, so hand them a working alternative. Note ||= — a
      // plain assignment here would clear the flag set by the 200-but-not-JSON
      // case above.
      unconfigured ||=
        res.status === 404 || res.status === 405 || res.status === 501;
    } catch {
      // network failure — treat like unconfigured and let email carry it
      unconfigured = true;
    }
    if (unconfigured) {
      // No backend yet — compose in the visitor's mail app instead
      setStatus("idle");
      const subject = encodeURIComponent(
        `Project inquiry${name ? ` from ${name}` : ""}`
      );
      const budgetLine = budget ? `\nBudget: ${budget}` : "";
      const body = encodeURIComponent(
        `${message}${budgetLine}\n\n— ${name}${email ? ` (${email})` : ""}`
      );
      window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
      return;
    }
    // The backend exists but the send failed — tell the visitor honestly
    setStatus("error");
  };

  if (status === "sent") {
    return (
      <div aria-live="polite">
        <p className={`font-serif italic text-3xl md:text-4xl ${onKlein ? "text-paper" : "text-ink"}`}>
          Got it — thank you.
        </p>
        <p className={`mt-4 max-w-sm text-sm leading-relaxed ${onKlein ? "text-paper/70" : "text-ink/60"}`}>
          Your note is in our inbox. A founder will reply within two business
          days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <label className="flex flex-col gap-2">
        <span className={`eyebrow ${label}`}>Your name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Appleseed"
          className={`border-b bg-transparent py-3 text-lg outline-none transition-colors ${field}`}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className={`eyebrow ${label}`}>Work email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@company.com"
          className={`border-b bg-transparent py-3 text-lg outline-none transition-colors ${field}`}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className={`eyebrow ${label}`}>Rough budget</span>
        <select
          name="budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={`border-b bg-transparent py-3 text-lg outline-none transition-colors ${field}`}
        >
          <option value="">Not sure yet</option>
          <option value="Under $25k">Under $25k</option>
          <option value="$25k–75k">$25k–75k</option>
          <option value="$75k–150k">$75k–150k</option>
          <option value="$150k+">$150k+</option>
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className={`eyebrow ${label}`}>What are you building?</span>
        <textarea
          name="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="A few lines is plenty."
          className={`resize-none border-b bg-transparent py-3 text-lg outline-none transition-colors ${field}`}
        />
      </label>
      {/* Honeypot — hidden from humans, bots fill it */}
      <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        Company
        <input
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </label>
      {status === "rate-limited" && (
        <p
          role="alert"
          className={`text-sm ${onKlein ? "text-paper" : "text-ink"}`}
        >
          That’s a few messages in a short window — please wait a little
          before sending another, or email us directly at{" "}
          <a
            href={`mailto:${SITE.email}`}
            className="underline underline-offset-4"
          >
            {SITE.email}
          </a>
          .
        </p>
      )}
      {status === "error" && (
        <p
          role="alert"
          className={`text-sm ${onKlein ? "text-paper" : "text-ink"}`}
        >
          That didn’t go through — please email us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="underline underline-offset-4">
            {SITE.email}
          </a>
          .
        </p>
      )}
      <Magnetic strength={0.25}>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`eyebrow w-fit rounded-full px-9 py-5 transition-colors disabled:opacity-60 ${button}`}
          data-hover
        >
          {status === "sending" ? "Sending…" : "Send inquiry →"}
        </button>
      </Magnetic>
    </form>
  );
}
