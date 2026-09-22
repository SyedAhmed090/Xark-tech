"use client";

import { useState } from "react";
import { SITE } from "@/lib/site";
import { mailtoFallback, submitJson } from "@/lib/submitForm";

/* Posts to /api/contact.php, the PHP endpoint deployed alongside the static
   export. If that endpoint is missing or PHP isn't executing (404/405/501),
   it falls back to composing in the visitor's mail client rather than showing
   a dead end — a misconfigured server should still let someone reach us. */
export default function ContactForm({
  theme = "brand",
}: {
  theme?: "brand" | "paper";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [budget, setBudget] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rate-limited"
  >("idle");
  const [honeypot, setHoneypot] = useState("");

  const onKlein = theme === "brand";
  const label = onKlein ? "text-paper/75" : "text-ink/60";
  const field = onKlein
    ? "border-paper/40 text-paper placeholder:text-paper/55 focus:border-paper"
    : "border-ink/25 text-ink placeholder:text-ink/45 focus:border-brand";
  const button = onKlein
    ? "bg-paper text-ink hover:bg-ink hover:text-paper"
    : "bg-brand text-paper hover:bg-ink";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const result = await submitJson("/api/contact.php", {
      name,
      email,
      message,
      budget,
      company: honeypot,
    });

    if (result === "sent") return setStatus("sent");
    if (result === "rate-limited") return setStatus("rate-limited");
    if (result === "error") return setStatus("error");

    // Server-side gap the visitor can't fix — hand them their mail client
    // rather than a dead end.
    setStatus("idle");
    mailtoFallback(
      SITE.email,
      `Project inquiry${name ? ` from ${name}` : ""}`,
      `${message}${budget ? `
Budget: ${budget}` : ""}

— ${name}${
        email ? ` (${email})` : ""
      }`,
    );
  };

  if (status === "sent") {
    return (
      <div aria-live="polite">
        <p className={`text-3xl md:text-4xl ${onKlein ? "text-paper" : "text-ink"}`}>
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
          <option value="Under $500">Under $500</option>
          <option value="$500–1,500">$500–1,500</option>
          <option value="$1,500–3,000">$1,500–3,000</option>
          <option value="$3,000+">$3,000+</option>
          <option value="Monthly plan">Monthly plan</option>
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
        <button
          type="submit"
          disabled={status === "sending"}
          className={`eyebrow w-fit rounded-full px-9 py-5 transition-colors disabled:opacity-60 ${button}`}
        >
          {status === "sending" ? "Sending…" : "Send inquiry →"}
        </button>
    </form>
  );
}
