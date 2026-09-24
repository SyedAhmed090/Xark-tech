# Design plan

The functionality and the copy are now right for a small-business buyer. The
look is not. This is what was wrong, why, and the order it is being fixed in.

Nothing here changes a price, a promise or a form. It is layout, rhythm,
colour and imagery only.

---

## Second direction change — the layout was the problem

Colour-blocking landed and was still disliked. Asked what was wrong, the answer
was the layout, and looking at the page that is plainly right: **seven of the
nine bands were one of two shapes.** Bundles and Services were both "heading,
then a row of equal cards". Process, Work and FAQ were all "heading in the left
column, content in the right" — three consecutively. Everything sat in a
1152px column with dead margin either side, and every band carried identical
vertical padding, so nothing dominated.

Step 1 caused a good part of that. It fixed an *inconsistent* layout by forcing
every section into one container, one rhythm and one shape — which removed the
inconsistency and produced monotony. Consistency belongs in the system (the
spacing scale, the type scale, the palette), not in the composition.

What changed:

- **Column 1152px → 1344px**, so a wide screen is used rather than margined.
- **Three section weights** (`sm`/`md`/`lg`) instead of one, so the bundles own
  their screen and the trade strip and work footnote do not.
- **Services: card grid → a dense price list.** A row per service — name,
  what it is, what it costs, how long. It reads the way somebody comparing
  quotes reads, and it looks nothing like the bundles above it.
- **Process: vertical list → four across.** Four short steps had been four
  screens of scrolling; laid out horizontally the whole process fits one, which
  is also the point it is making.
- **FAQ: one tall column → two.** Half the height, and it stops being the third
  "heading left, list right" in a row.
- **Bundles: the featured card is physically bigger**, not an outline on an
  identical box.

One bug worth recording: each service row was its own grid, so `auto` tracks
sized to that row's content and nothing aligned down the column — taglines
started at seven different x positions. Fixed tracks resolve identically in
every row.

---

## Direction change — the palette was the problem

Steps 1–5 fixed structure: one grid, one rhythm, grounds that alternate, no
more 868KB of wrong-audience photography. The result was coherent and still
disliked, for a reason the original plan never addressed — it kept the palette
it inherited. `paper` and `surface` were both near-white, so roughly 85% of
every page was pale ground carrying one blue and one green in small doses.
Clean, and forgettable, which is a credibility problem on a site whose promise
is "look the part".

Step 1 made that worse in one respect: it fixed an inconsistent type scale by
levelling everything to `text-3xl md:text-4xl`, which removed the drama along
with the inconsistency. A scale can be consistent and still hold a real display
step; it now does (`.display-hero`, `.display-section`).

**The new direction is colour-blocked.** Every band commits to a field —
blue, sand, ink or bone — and nothing sits on near-white. Hard edges: 4px card
radius instead of 14px, no shadows, buttons no longer pills.

Because the same token now lands on four different grounds, three combinations
fail AA (brand blue is 2.8:1 on ink and 4.6:1 on sand; the value green is
3.8:1 on sand; muted is 3.2:1 on ink and 4.2:1 on sand). Rather than picking a
variant per call site, `globals.css` substitutes per field, unlayered so it
beats the utilities — the same mechanism that was already there for one case,
extended to cover the rest.

Homepage band order: blue → ink → sand → bone → ink → sand → bone → sand →
blue → ink. No two adjacent bands match.

**Rolled out to the homepage only.** Inner pages pick up the new tokens —
palette, radius, no shadows, the display tier — but still sit on a single
ground each; they need the band treatment before this is finished.

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
4. **Two launch-check warnings, both deliberate.** `SITE.socials` is empty so
   the Organization schema has no `sameAs`, and `SITE.chat` is unset so no chat
   widget renders. Both are data only this business has; the wiring is done.

### What was verified, and how

Every step: `tsc` clean, `eslint` 0 errors, `site-audit` exit 0 on 25/25
routes, `tablet-contrast-audit` no failures at 768/834/1024, `mobile-audit`
only its documented-benign findings (the spam honeypot label, inline-link
target sizes in prose, 10px captions inside scaled UI mockups).

The static export itself is verified: `npm run build` completes,
`npm run launch-check` reports **25 pages, 0 blocking, 2 to decide**, and the
audits were re-run against `out/` served statically, not only against
`next dev`.

Two pre-existing defects found and left alone, both confirmed pre-existing by
building `main` and comparing:

- Under `prefers-reduced-motion`, framer-motion produces an SSR/client mismatch
  and React regenerates the tree. `Reveal` also has no reduced-motion handling,
  so those users get content sitting at opacity 0 until they scroll past it.
- ~~RSC prefetch payloads 404 in the static export.~~ **Fixed** in
  `scripts/prepare-deploy.mjs`. Next wrote each payload into nested
  directories (`__next.services/$d$slug/__PAGE__.txt`) while the client router
  asked for the same thing with dots (`__next.services.$d$slug.__PAGE__.txt`);
  on a Next server the request is routed rather than resolved against a
  filesystem, so nothing notices, but Apache serving a static export 404s every
  one. The deploy step now renames them to the spelling the client uses —
  renames rather than copies, since the nested form is never requested. The
  mapping was derived by serving the export and checking the candidate name
  against all 41 distinct 404s, not guessed. Across the 25-route sweep:
  **186 404s and 186 console errors → 0**, with client-side routing verified
  intact.

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
