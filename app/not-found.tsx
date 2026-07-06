import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-ink px-5 text-center text-paper">
      <svg viewBox="0 0 100 100" className="mb-8 h-20 w-20" aria-hidden>
        <path
          d="M22 22 L78 78 M78 22 L22 78"
          stroke="#2016e8"
          strokeWidth="12"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="display text-[clamp(4rem,20vw,14rem)] leading-none">404</h1>
      <p className="mt-4 font-serif italic text-2xl text-paper/70 md:text-3xl">
        This page shipped without us.
      </p>
      <p className="mt-3 max-w-sm text-sm text-paper/50">
        The address doesn’t exist — it may have moved, or it never made it out
        of the design file.
      </p>
      <Link
        href="/"
        className="eyebrow mt-10 inline-block rounded-full bg-paper px-8 py-4 text-ink transition-colors hover:bg-klein hover:text-paper"
      >
        ← Back to the homepage
      </Link>
    </main>
  );
}
