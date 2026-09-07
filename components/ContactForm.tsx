"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";

/* Posts to /api/contact; if the backend isn't configured (501) it falls
   back to composing in the visitor's mail client. */
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
    "idle" | "sending" | "sent" | "error"
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, budget, company: honeypot }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      unconfigured = res.status === 501;
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
      window.location.href = `mailto:hello@xarktech.com?subject=${subject}&body=${body}`;
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
      {status === "error" && (
        <p
          role="alert"
          className={`text-sm ${onKlein ? "text-paper" : "text-ink"}`}
        >
          That didn’t go through — please email us directly at{" "}
          <a href="mailto:hello@xarktech.com" className="underline underline-offset-4">
            hello@xarktech.com
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
