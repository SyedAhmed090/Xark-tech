"use client";

import { useState } from "react";
import Magnetic from "./Magnetic";

/* Opens the visitor's mail client with everything prefilled — no backend needed */
export default function ContactForm({
  theme = "klein",
}: {
  theme?: "klein" | "paper";
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onKlein = theme === "klein";
  const label = onKlein ? "text-paper/60" : "text-ink/50";
  const field = onKlein
    ? "border-paper/40 text-paper placeholder:text-paper/35 focus:border-paper"
    : "border-ink/25 text-ink placeholder:text-ink/30 focus:border-klein";
  const button = onKlein
    ? "bg-paper text-ink hover:bg-ink hover:text-paper"
    : "bg-klein text-paper hover:bg-ink";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      `Project inquiry${name ? ` from ${name}` : ""}`
    );
    const body = encodeURIComponent(
      `${message}\n\n— ${name}${email ? ` (${email})` : ""}`
    );
    window.location.href = `mailto:hello@xark.tech?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <label className="flex flex-col gap-2">
        <span className={`eyebrow ${label}`}>Your name</span>
        <input
          type="text"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane@company.com"
          className={`border-b bg-transparent py-3 text-lg outline-none transition-colors ${field}`}
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className={`eyebrow ${label}`}>What are you building?</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          placeholder="A few lines is plenty."
          className={`resize-none border-b bg-transparent py-3 text-lg outline-none transition-colors ${field}`}
        />
      </label>
      <Magnetic strength={0.25}>
        <button
          type="submit"
          className={`eyebrow w-fit rounded-full px-9 py-5 transition-colors ${button}`}
          data-hover
        >
          Send inquiry →
        </button>
      </Magnetic>
    </form>
  );
}
