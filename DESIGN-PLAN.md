# Design plan

The functionality and the copy are now right for a small-business buyer. The
look is not. This is what was wrong, why, and the order it is being fixed in.

Nothing here changes a price, a promise or a form. It is layout, rhythm,
colour and imagery only.

---

## Status

| Step | State |
|---|---|
| 1 — One grid, one rhythm, one scale | **Done** |
| 2 — A visual spine | **Done** |
| 3 — Pictures | **Partial** — everything that needs no camera |
| 4 — Proof | **Blocked** — needs real testimonials |
| 5 — Retarget the work section | **Done** |

Four commits on `design-refresh`, off `main`.

### What is still outstanding

1. **Real testimonials.** Step 4's whole point. Three quotes with a name, a
   trade and a face. Nothing else unblocks it, and inventing them is the one
   thing this site has consistently refused to do.
2. **Photography.** The hero, the bundle stills and the file-set shot. Needs
   either credits (the Higgsfield account has 1.85 on the free plan) or real
   photos. See "What step 3 actually shipped" for why the hero was drawn rather
   than generated even before credits became the constraint.
3. **Small-business work to show.** The deepest problem on the site and the one
   none of this fixes. Step 5 stopped the four B2B concepts being the first and
   heaviest thing a buyer meets; it did not make them the right work.
4. **`launch-check` has never run against this branch.** `out/` is locked by an
   unrelated `python -m http.server` process, so `next build` compiles and
   generates all 56 pages but cannot complete the static export. Nothing here
   has been verified against a production build — only against `next dev` and
   the four audit scripts.

### What was verified, and how

Every step: `tsc` clean, `eslint` 0 errors, `site-audit` exit 0 on 25/25
routes, `tablet-contrast-audit` no failures at 768/834/1024, `mobile-audit`
only its documented-benign findings (the spam honeypot label, inline-link
target sizes in prose, 10px captions inside scaled UI mockups).

One pre-existing defect found and left alone: under `prefers-reduced-motion`,
framer-motion produces an SSR/client mismatch and React regenerates the tree.
Confirmed pre-existing by stashing. `Reveal` also has no reduced-motion
handling, so those users get content sitting at opacity 0 until they scroll
past it.

---

## What was wrong

Kept in the present tense it was written in — it is the record of what the
site looked like before any of this. Each finding carries where it was fixed.

### 1. The page is two design systems stacked on top of each other

> **Fixed in step 1.** `components/Section.tsx` — one band, one column, one
> rhythm, everywhere.

The repositioning rebuilt the top of the homepage and left the agency-era
sections below it. They were never reconciled, so the page changes visual
language halfway down. Measured:

| Section | Container | Vertical rhythm | H2 scale |
|---|---|---|---|
| Hero | `max-w-6xl` | `pt-28 pb-2` | clamp → 4.5rem |
| BundleCards | `max-w-6xl` | `py-16 md:py-24` | 3xl → 4xl |
| ServiceGrid | `max-w-6xl` | `py-16 md:py-24` | 3xl → 4xl |
| WhatYouGet | `max-w-4xl` | `py-16 md:py-24` | 3xl → 4xl |
| **Process** | **none — full bleed** | `py-24 md:py-36` | 4xl → 5xl |
| **Work** | **none — full bleed** | `py-24 md:py-36` | 4xl → 6xl |
| **FAQ** | **none — full bleed** | `py-24 md:py-36` | 4xl → 5xl |
| **CTA** | **none — full bleed** | `py-28 md:py-40` | clamp → **9rem** |

Inner pages (`/packages`, `/studio`) use a third rhythm again: `py-20 md:py-28`.

The container line is the one a visitor feels without knowing why. On any
monitor wider than ~1200px the left edge of the content jumps inward and back
out as you scroll. A 9rem headline immediately under a 4xl one reads as two
different sites.

### 2. There are no pictures

> **Partly fixed in step 3.** Service glyphs, a drawn hero visual and the
> trade strip. Every photographic slot is still open.

Outside the logo and four portfolio covers, the site contains zero imagery —
not one photo, illustration, icon set or screenshot. Every homepage section is
words inside a white rounded box on a warm white ground. That is why it reads
as a document rather than a business.

`grep -rn "next/image\|<img" app components` returns two hits, both the logo.

### 3. The only pictures on the site are aimed at the old audience

> **Contained in step 5, not fixed.** They no longer load on the homepage or
> the service pages, and `Work` left the primary nav. Replacing them with
> small-business work is still outstanding.

All four case studies are B2B software concepts — a treasury dashboard, a
patient check-in app, an architecture studio site, a freight dispatch board —
each labelled "Self-initiated concept project", reachable from a nav item
called **Work**. The photography is genuinely good. It is selling to the
customer this business no longer has. A plumber pricing a $399 website sees
nothing that looks like their own trade.

### 4. No social proof of any kind

> **Still true**, except the trade strip. Step 4 is blocked on real
> testimonials.

There is no testimonials component. The homepage's own ordering comment
promises one — "has it worked before (Work, Testimonials)" — and it does not
exist. No faces, no client names, no star rating, no count of jobs delivered.
For a fixed-price offer bought without a call, proof is the whole sale.

### 5. Studio voice survives in the chrome

> **Fixed in step 1.** Footer line, live clock, ping dot and CTA headline all
> gone; `/studio` remains the About route.

- Footer: "Independent design studio."
- CTA headline: "Let's make something worth shipping" — a portfolio line, not
  an offer.
- Footer carries a live ticking Denver clock and a pinging status dot.
- Nav routes About through `/studio`.

### 6. Colour carries no structure

> **Fixed in step 2.** Nine bands, no two adjacent alike, and a page ground
> far enough off white to do structural work.

One blue, one green, ink, and two near-whites. Sections are separated only by
swapping `paper` for `surface`, a difference of about 2%. The result is an
undifferentiated stack — nothing signals "this is the part that matters."

---

## The plan

Five steps, in dependency order. Each is shippable on its own and each ends
with the audits and `launch-check` green.

### Step 1 — One grid, one rhythm, one scale — done

The largest visual gain for the smallest diff, and everything after it depends
on the page being consistent first.

- A single `Section` wrapper: `max-w-6xl` container, `px-5 md:px-10`, one
  vertical rhythm (`py-16 md:py-24`, with a `lg` variant at `py-24 md:py-32`
  for the two sections that should breathe). Applied to every section on every
  page, replacing eight hand-tuned paddings.
- One heading scale in `globals.css`: h1 `clamp(2.25rem, 6.5vw, 4.5rem)`, h2
  `text-3xl md:text-4xl`, h3 `text-lg`. The 9rem CTA and the 6xl Work headline
  come down to it.
- Delete the leftover studio chrome: footer "design studio" line, the live
  clock, the ping dot, the CTA headline.

**Shipped as planned, plus two the survey had missed:** `Nav` was also on
`max-w-[1600px]`, so the logo started left of everything beneath it, and six
h1s were oversized rather than the two the table named (`/contact` at 10rem,
`/work` at 11rem, not-found at 13rem). With the clock gone the footer stopped
being a client component, so that JavaScript left every page. Net −13 lines
across 25 files, plus `components/Section.tsx`. Homepage 9814px → 8896px.

### Step 2 — Give the page a visual spine — done

Once the rhythm is uniform, the page needs deliberate contrast so it does not
read as one long card list.

- Alternate three grounds with intent rather than by accident: `paper` for
  argument, `surface` for anything with a price in it, `ink` for the two
  moments that should stop you (the comparison table and the closing CTA).
- Widen the tint range: a light blue wash behind the bundle section so the
  commercial centre of the page is visibly the centre.
- Real elevation on cards — a soft shadow rather than a 10%-alpha hairline.
  The current cards are barely distinguishable from the ground they sit on.

**Shipped, with one change of mind.** The plan wanted ink behind both the
comparison table and the closing CTA; that would have put two dark bands either
side of a dark footer. The table went to ink and the CTA kept brand blue, which
separates them properly. The nine bands now read paper → tint → white → ink →
paper → white → paper → brand → ink, and no adjacent pair matches.

`--color-paper` also had to move, which the plan had not anticipated: at
`#fbfaf7` it was 1.04:1 against white, so white cards and white bands did no
structural work at all. At `#f6f3ec` it is 1.11:1 and every token still clears
AA on it (ink 16.3, brand 5.8, muted 5.4, accent 4.8).

Two defects fixed in passing: long service prices broke mid-string and collided
with the duration beside them, and the work tiles' `md:mt-24` stagger left a
column of dead space once the grid was aligned.

### Step 3 — Pictures (the big one — detailed below) — partial

Everything that needs no camera shipped; every photographic slot is still open.
See "What step 3 actually shipped" below for what was built, what was not, and
why the hero was drawn rather than photographed.

### Step 4 — Proof — blocked, except the trade strip

- A testimonials band under `Work`: three quotes, each with a name, a trade
  and a face. Real ones only — placeholder testimonials are worse than none.
- A trade strip: the categories actually served (café, trades, clinic, salon,
  law, fitness) as a quiet row, which does the job "client logos" does for an
  agency without claiming clients that do not exist.
- A delivery counter in the hero proof row once there is a real number.

**The trade strip shipped** as `components/TradeStrip.tsx`, under the hero —
five categories lifted verbatim from the sentence already on `/studio`, so it
adds a surface and not a claim. Extending that list means extending that
sentence first.

**The testimonials band and the delivery counter are blocked on real numbers
and real quotes.** Both stay unbuilt rather than shipping with placeholders.

### Step 5 — Retarget the work section — done

The plan said a strip of logo marks. There are no logo marks to show that would
not be invented client work, so the homepage band names the four concepts,
links each one, and ships no imagery at all. Measured: **910KB → 42KB**, the
42KB being the logo, which is now the only image the homepage loads.

The same tiles were also rendering on all seven service detail pages under an
eyebrow reading "{service.name} in the wild" — a claim of shipped client work,
made with self-initiated concepts, shown to someone pricing a $99 logo. That
block is gone (`/services/logo-design` went 169KB → 42KB), and the header stat
it fed, "Shown here — N cases", now counts packages instead.

`Work` also leaves the primary nav — it stays in the footer sitemap, in the
homepage band, and at a lower sitemap priority (0.9 → 0.6, detail pages 0.7 →
0.5). It is one line in `components/Nav.tsx` to put back.

**Still the real fix:** replacing the four B2B concepts with small-business
work. Nothing here makes that unnecessary — it only stops the wrong work from
being the first thing a buyer sees, and from being the heaviest thing they
download.

---

## The picture plan

This is the part that decides whether the site looks professional, so it is
specified per slot.

### Constraint first

`next.config.ts` sets `images: { unoptimized: true }` — static export, no Node
runtime, so **Next ships the original file at the original size**. Every image
added has to be hand-prepared:

- AVIF with a WebP fallback, JPEG only for photography where AVIF regresses.
- Explicit `width`/`height` on every one — no layout shift.
- Hero-class images ≤ 120KB, cards ≤ 60KB, avatars ≤ 15KB.
- Total added page weight budget: **under 400KB on the homepage**. The current
  homepage ships essentially no images; that headroom is the whole reason this
  is affordable.

### Slot by slot

| Where | What | Why |
|---|---|---|
| **Hero, right half** | One photograph: a real small-business owner's finished branding in use — a café's cup, board and signage together, shot on the counter. | The hero currently has a blank right half at desktop width. This is the single highest-value image on the site: it shows the outcome being sold, not the process. |
| **Bundle cards (×3)** | A small square product still — logo on a card, a phone showing the site, a Google listing on a screen. | Three identical text cards are what makes the commercial section forgettable. |
| **Service cards (×7)** | A flat vector glyph per service, one drawn family, brand blue on tint. | Seven identical text tiles. Icons, not photos — photos at that size become noise. |
| **WhatYouGet table** | One photo beside it: the actual vector file set open on a screen, layers visible. | The claim is "you get real files". Showing the files proves it in a way the table cannot. |
| **Process (×4)** | Nothing photographic. Large numerals and a connecting rule. | Stock "team collaborating" photography here would undo everything else. Deliberate restraint. |
| **Testimonials (×3)** | Real faces, 96px circles. | Faces are the cheapest trust on the page. |
| **Trade strip** | Six line glyphs for the trades served. | |
| **/studio (About)** | One photo of the actual workspace, or none. | A fake team photo is worse than an empty section. |
| **/work** | Replace or demote the four B2B concepts. | See step 5. |

### What step 3 actually shipped

The Higgsfield account has **1.85 credits on the free plan**, so the generation
pipeline this plan assumed is not available. Step 3 shipped the half that needs
no photography, and the photographic slots are still open:

**Done, and costing zero image bytes** — everything below is inline SVG or CSS,
which matters more than usual under `unoptimized: true`:

- Seven service glyphs (`components/ServiceIcon.tsx`), one drawn family.
- The hero's right column (`components/HeroVisual.tsx`) — a finished
  small-business site and its file set, drawn rather than photographed. The
  first attempt used grey bars and read as a loading skeleton; real words at a
  small size read as a finished page.
- The trade strip (`components/TradeStrip.tsx`), five glyphs, categories lifted
  verbatim from what /studio already claims.

**Still open, needs credits or real assets:**

- The hero photograph. Note the constraint that pushed this to a drawing even
  before credits ran out: a generated photo of a café's branding, sitting in a
  hero, reads as portfolio — the exact claim every case study on this site is
  labelled "self-initiated concept" to avoid.
- Bundle card stills, and the file-set photo beside the comparison table.
- Testimonial faces, which wait on real testimonials regardless.

**A weight finding while measuring:** the homepage transfers **910KB across
five images** — the four portfolio covers, unoptimized, plus the logo, with
`loop-health-photo.jpg` alone at 351KB. That is roughly nineteen times the
homepage's entire gzipped HTML (49KB), spent on concept projects aimed at the
audience this business no longer sells to. It is the strongest argument for
step 5 and it is a performance problem, not only a positioning one.

### Sourcing

The four existing portfolio photos were generated through Higgsfield with the
screenshot as a reference, and they are good — that pipeline is proven and is
the right one for the hero, bundle and file-set images.
`scripts/screenshot-portfolio.mjs` already renders the demo builds, so anything
device-in-scene composites the same way.

Two rules for what gets generated:

1. **Never generate a face for a testimonial.** A synthetic person attached to
   a real-sounding quote is a fabricated endorsement. Faces are real or the
   band stays out.
2. **Never generate a photo of "the team" or "the office".** Same reason.

Icons and glyphs are hand-drawn SVG inline, not a dependency and not generated.

### Order within step 3

Hero photo first — it alone changes the impression in the first second. Then
service glyphs (seven at once, one family). Then bundle stills. Then the
file-set photo. Testimonial faces last, because they wait on real testimonials.

---

## What this plan deliberately skips

- No new dependency. No icon library, no animation library beyond the
  framer-motion already installed, no image CDN.
- No dark mode. Nobody comparing three quotes on a phone wants a theme toggle.
- No redesign of the forms, the brief funnel or the pricing logic — all of that
  works and is not what looks wrong.
- No custom illustration style or mascot. Photography plus one glyph family is
  enough, and a house illustration style is a project, not a step.
