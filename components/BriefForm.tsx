"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BRIEF_FIELDS, BRIEF_TITLES, type BriefField } from "@/lib/brief";
import { allPackages, findPackage } from "@/lib/services";
import { SITE } from "@/lib/site";
import { mailtoFallback, submitJson } from "@/lib/submitForm";

const PACKAGES = allPackages();

/**
 * The brief. This is the whole sales process at these prices — there is no
 * call, so what the buyer types here is what the production team works from.
 *
 * Reads `?package=` to know which question set to show and to confirm back
 * what was clicked. Arriving with no package is normal (someone can land here
 * from the nav), so the picker is the fallback rather than an error.
 */
export default function BriefForm() {
  const params = useSearchParams();
  const preselected = findPackage(params.get("package"));

  const [choice, setChoice] = useState(preselected?.param ?? "");
  const selected = findPackage(choice);
  const briefType = selected?.briefType ?? "general";
  const fields = BRIEF_FIELDS[briefType];

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error" | "rate-limited"
  >("idle");

  const set = (name: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [name]: value }));

  /** Label/value pairs, so the email and CSV read like the form looked. */
  const answeredPairs = () =>
    fields
      .map((f) => ({ label: f.label, value: (answers[f.name] ?? "").trim() }))
      .filter((pair) => pair.value !== "");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    const result = await submitJson("/api/brief.php", {
      package: selected?.label ?? "Not specified",
      packageParam: selected?.param ?? "",
      price: selected?.price ?? "",
      briefType,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      answers: answeredPairs(),
      company: honeypot,
    });

    if (result === "sent") return setStatus("sent");
    if (result === "rate-limited") return setStatus("rate-limited");
    if (result === "error") return setStatus("error");

    // Server-side gap. Hand over the whole brief rather than losing it —
    // a mail client the visitor already has beats a dead end.
    setStatus("idle");
    const lines = [
      `Package: ${selected?.label ?? "Not specified"}`,
      "",
      ...answeredPairs().map((p) => `${p.label}: ${p.value}`),
      "",
      `${contact.name}${contact.email ? ` (${contact.email})` : ""}`,
      contact.phone,
    ];
    mailtoFallback(
      SITE.email,
      `${BRIEF_TITLES[briefType]} — ${selected?.label ?? "enquiry"}`,
      lines.join("\n"),
    );
  };

  if (status === "sent") {
    return (
      <div aria-live="polite" className="card p-8">
        <h2 className="display-tight text-2xl">Brief received.</h2>
        <p className="mt-4 max-w-md leading-relaxed text-muted">
          We have everything we need to start. You&rsquo;ll get a confirmation
          and a delivery date by email within one business day — if anything in
          the brief needs clarifying, we&rsquo;ll ask then rather than guess.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-[color:var(--color-line-strong)] bg-surface px-4 py-3 text-base outline-none transition-colors focus:border-brand";

  return (
    <form onSubmit={submit} className="flex flex-col gap-8">
      <div className="card p-6">
        <label className="flex flex-col gap-2">
          <span className="eyebrow text-muted">What are you ordering?</span>
          <select
            value={choice}
            onChange={(e) => {
              setChoice(e.target.value);
              // Question sets differ per brief type; keeping stale answers
              // would submit a logo answer against a website order.
              setAnswers({});
            }}
            className={input}
          >
            <option value="">Not sure yet — just tell us below</option>
            {PACKAGES.map((p) => (
              <option key={p.param} value={p.param}>
                {p.label} — {p.price}
              </option>
            ))}
          </select>
        </label>
        {selected && (
          <p className="mt-3 text-sm text-muted">
            <span className="font-semibold text-ink">{selected.price}</span> ·
            delivered in {selected.duration.toLowerCase()}
          </p>
        )}
      </div>

      <fieldset className="flex flex-col gap-6">
        <legend className="display-tight mb-2 text-xl">
          {BRIEF_TITLES[briefType]}
        </legend>
        {fields.map((f) => (
          <Field
            key={f.name}
            field={f}
            value={answers[f.name] ?? ""}
            onChange={(v) => set(f.name, v)}
            className={input}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-6">
        <legend className="display-tight mb-2 text-xl">How to reach you</legend>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">
            Your name <span className="text-brand">*</span>
          </span>
          <input
            type="text"
            autoComplete="name"
            required
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className={input}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">
            Email <span className="text-brand">*</span>
          </span>
          <input
            type="email"
            autoComplete="email"
            required
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className={input}
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Phone</span>
          <input
            type="tel"
            autoComplete="tel"
            value={contact.phone}
            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
            className={input}
          />
        </label>
      </fieldset>

      {/* Honeypot — hidden from humans, bots fill it. */}
      <label
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden
      >
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
        <p role="alert" className="text-sm">
          That&rsquo;s a few submissions in a short time. Please wait a little
          and try again, or email{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>
          .
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-sm">
          That didn&rsquo;t go through — please email{" "}
          <a href={`mailto:${SITE.email}`} className="underline">
            {SITE.email}
          </a>{" "}
          and we&rsquo;ll pick it up from there.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary w-full disabled:opacity-60 sm:w-fit"
      >
        {status === "sending" ? "Sending…" : "Send the brief"}
      </button>
      <p className="-mt-4 text-xs text-muted">
        No payment is taken here. We confirm scope and a delivery date first.
      </p>
    </form>
  );
}

function Field({
  field,
  value,
  onChange,
  className,
}: {
  field: BriefField;
  value: string;
  onChange: (v: string) => void;
  className: string;
}) {
  const label = (
    <span className="text-sm font-semibold">
      {field.label}
      {field.required && <span className="text-brand"> *</span>}
    </span>
  );

  return (
    <label className="flex flex-col gap-2">
      {label}
      {field.help && <span className="-mt-1 text-xs text-muted">{field.help}</span>}
      {field.type === "textarea" ? (
        <textarea
          rows={3}
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${className} resize-y`}
        />
      ) : field.type === "select" ? (
        <select
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        >
          <option value="">Choose one…</option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          required={field.required}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={className}
        />
      )}
    </label>
  );
}
