/**
 * The hero's right column: what a buyer is actually purchasing, drawn rather
 * than photographed.
 *
 * The plan called for a photograph here. Two things ruled that out for now —
 * there are no real client photos to use, and a generated one of a café's
 * branding sitting in a hero reads as portfolio, which is the claim this site
 * has been careful not to make (every case study is labelled a self-initiated
 * concept for the same reason). So this shows the deliverables instead: a
 * finished site, and the file set that comes with it.
 *
 * The first attempt drew the site as grey bars and read as a loading skeleton,
 * which is the opposite of "look the part". Real words at a small size read as
 * a finished page. The business is deliberately generic — no name, no logo, a
 * placeholder domain — so it illustrates the product without implying a client.
 *
 * Drawn in CSS in the same idiom as the case-study artifacts in lib/projects,
 * which also means it costs markup instead of bytes: `images: { unoptimized:
 * true }` makes anything in public/ ship at full weight.
 */
const NAV = ["Menu", "Hours", "Contact"];

export default function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[27rem] lg:mr-0 lg:max-w-none"
    >
      <div className="card overflow-hidden">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-[color:var(--color-line)] bg-paper px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="h-2 w-2 rounded-full bg-ink/15" />
          <span className="ml-2 flex-1 rounded-full bg-surface px-3 py-1 text-center font-mono text-[10px] text-ink/40">
            yourbusiness.com
          </span>
        </div>

        {/* The site */}
        <div className="bg-surface">
          <div className="flex items-center justify-between border-b border-[color:var(--color-line)] px-5 py-3">
            <span className="flex items-center gap-1.5">
              <span className="h-4 w-4 rounded-sm bg-ink" />
              <span className="text-[11px] font-extrabold tracking-tight">
                Your Business
              </span>
            </span>
            <span className="flex gap-3">
              {NAV.map((item) => (
                <span key={item} className="text-[9px] text-ink/50">
                  {item}
                </span>
              ))}
            </span>
          </div>

          <div className="px-5 pb-11 pt-6">
            <p className="text-[9px] font-bold uppercase tracking-[0.1em] text-brand">
              Open today until 6pm
            </p>
            <p className="display mt-2 text-[22px] leading-[1.05]">
              Fresh bread,
              <br />
              every morning.
            </p>
            <span className="mt-4 inline-block rounded-full bg-brand px-4 py-2 text-[10px] font-semibold text-white">
              Order online
            </span>

            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {["Sourdough", "Pastries", "Coffee"].map((item, i) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-lg border border-[color:var(--color-line)]"
                >
                  {/* Three tints rather than one, so the row reads as three
                      different things and not as a repeated placeholder. */}
                  <span
                    className={`block h-9 ${
                      ["bg-tint", "bg-accent-tint", "bg-paper"][i]
                    }`}
                  />
                  <span className="block px-2 py-1.5 text-[8px] font-semibold">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The files — the thing cheap logo services charge again for */}
      <div className="card absolute -bottom-7 -left-5 flex items-center gap-2.5 p-3 md:-left-9">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ink">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
            <circle cx="12" cy="12" r="6.5" stroke="#fff" strokeWidth="2" />
            <path d="M12 5.5v13" stroke="#fff" strokeWidth="2" />
          </svg>
        </span>
        <span className="flex gap-1">
          {["AI", "EPS", "SVG", "PDF"].map((ext) => (
            <span
              key={ext}
              className="rounded bg-tint px-1.5 py-0.5 font-mono text-[10px] font-bold text-brand"
            >
              {ext}
            </span>
          ))}
        </span>
      </div>

      {/* The promise the hero makes, restated on the artefact itself */}
      <div className="card absolute -right-3 -top-5 flex items-center gap-2 px-3 py-2 md:-right-6">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-[11px] font-semibold">Live in 7 days</span>
      </div>
    </div>
  );
}
