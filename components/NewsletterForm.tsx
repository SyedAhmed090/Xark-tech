"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";

/* Posts to /api/subscribe.php, the PHP endpoint deployed alongside the static
   export. If that endpoint is missing or PHP isn't executing (404/405/501) it
   says so honestly instead of faking a success state. */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "unconfigured" | "rate-limited" | "error"
  >("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot }),
      });
      if (res.ok) {
        setStatus("sent");
        return;
      }
      if (res.status === 429) {
        setStatus("rate-limited");
        return;
      }
      // 404/405 mean the PHP file is absent or PHP isn't running; 501 is the
      // old Next route's "not configured".
      setStatus(
        res.status === 404 || res.status === 405 || res.status === 501
          ? "unconfigured"
          : "error"
      );
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <p className="font-serif italic text-xl text-ink">
        You’re on the list — new essays land in your inbox.
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={submit} className="flex flex-wrap items-end gap-4">
        <label className="flex flex-1 min-w-[220px] flex-col gap-2">
          <span className="eyebrow text-ink/50">
            Get new essays by email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="border-b border-ink/25 bg-transparent py-3 text-lg text-ink outline-none transition-colors placeholder:text-ink/30 focus:border-klein"
          />
        </label>
        <label className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
          Company
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
        <Magnetic strength={0.2}>
          <button
            type="submit"
            disabled={status === "sending"}
            className="eyebrow rounded-full bg-ink px-7 py-3.5 text-paper transition-colors hover:bg-klein disabled:opacity-60"
            data-hover
          >
            {status === "sending" ? "…" : "Subscribe →"}
          </button>
        </Magnetic>
      </form>
      {status === "unconfigured" && (
        <p className="mt-3 text-sm text-ink/50">
          Sign-ups aren’t wired up yet — email{" "}
          <a href="mailto:hello@xarktech.com" className="underline underline-offset-4">
            hello@xarktech.com
          </a>{" "}
          and we’ll add you by hand.
        </p>
      )}
      {status === "rate-limited" && (
        <p role="alert" className="mt-3 text-sm text-ink/50">
          That’s a few attempts in a short window — please try again shortly.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-3 text-sm text-ink/50">
          That didn’t go through — try again, or email hello@xarktech.com.
        </p>
      )}
    </div>
  );
}
