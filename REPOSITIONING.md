# Repositioning: studio → small business

Working plan for taking Xark Tech from a $20k–$110k studio portfolio to a
productized small-business agency. Read `README.md` first for the architecture
(static export, Apache/cPanel, PHP form endpoints) — this file is only about
the repositioning.

**Status: steps 1–3 done and on `main`. Steps 4–6 outstanding.**

---

## Why this shape

The target is the same buyer a high-volume offshore shop sells to — a new or
small business that needs a logo, a site, and to be findable — but one rung up
in expectation. Delivery is offshore, which is what makes the entry prices
viable at this margin.

The decisions below were made deliberately. If you are picking this up later,
these are the ones not to re-litigate without a reason:

| Decision | Why |
|---|---|
| Entry at $99, not $349 | A new business won't start at $349. The cheap tier acquires; the bundles and the monthly plans carry the margin. |
| Six tiers on logos and websites | Absorbed from a promotional catalogue that was briefly a second price list. Depth kept, terms replaced. |
| Full vector files at **every** tier, including $99 | The differentiator, and the one claim a buyer can verify before paying. Budget competitors ship a JPEG and charge again for the files a printer accepts. It costs nothing offshore. |
| No `originalPrice` / struck-through anchors | A "was" price that was never charged is not a saving, and it undercuts the only thing we ask buyers to trust: that the number is the number. Bundles *do* show a saving, summed from real tiers sold on this same site. |
| Real revision counts, honoured | Competitors advertise "unlimited" and cap it in the contract. Ours match, and the terms page already agrees. |
| Brief instead of a discovery call | At $99 a call costs more than the margin. The brief *is* the sales process and the work order. |

Competitor research that produced this positioning is archived outside the
repo at `~/competitor-research/anaxdesigns/` — full teardown, pricing, and the
structural weaknesses the differentiators target.

---

## Done

### 1. Commercial model — `lib/services.ts`

Seven service lines, all priced on the page:

| Line | Ladder |
|---|---|
| Logo & brand identity | $99 / $149 / $199 / $249 / $399 / $899 |
| Website design & build | $399 / $799 / $1,099 / $1,699 / $2,499 / $3,999 |
| Online stores | $1,299 / $1,999 / $3,499 |
| Video & animation | $399 / $799 / $1,299 |
| Website care | $99 / $199 / $449 **per month** |
| Local SEO | $299 / $599 / $1,199 **per month** |
| Social media | $299 / $699 / $1,499 **per month** |

Three bundles carry the homepage: **Open for Business $849**, **Complete Brand
Launch $1,999**, **Store Launch $2,299**.

Invariants enforced at module load, so they fail the build rather than a
customer:

- no two orderable items share a `?package=` value (tiers and bundles share one namespace)
- every bundle is genuinely cheaper than the sum of its parts
- every bundle component references a tier that still exists

`ENTRY_PRICE` and bundle list prices are **derived**, never typed. Both have
already gone stale once when a component tier was repriced.

### 2. Front end

Removed: three.js, @react-three/fiber, @react-three/drei, lenis, Newsreader,
Spline Mono, the preloader, the custom cursor, magnetic buttons. Dependencies
went from ten to five. The hero ships no JavaScript.

Design system in `app/globals.css`: white cards on a warm ground, sentence-case
headings, prices in tabular figures, green reserved strictly for value. Brand
blue fails AA on ink, so dark surfaces substitute a lighter blue via one
unlayered rule rather than a token swap at each call site.

### 3. Brief funnel + chat

- `/brief` reads `?package=`, shows the matching question set (logo / website /
  general), and confirms price and delivery back to the buyer.
- `deploy/api/brief.php` — honeypot, validation, rate limit, and the row
  written to disk **before** mail.
- tawk.to via `components/Chat.tsx`, `lazyOnload`, renders nothing until
  configured. CSP origins added; `'unsafe-eval'` dropped with three.js.

---

## Outstanding

### 4. Service page content

Each of the seven service pages needs **15–20 FAQs**, written to lead with the
answer. There are currently **none** — `lib/faq.ts` covers the homepage only.

This is the cheapest remaining win. Competitors run this density explicitly for
AI answer engines, and at this price point "how much does a logo cost for a
small business" is a query worth owning. Mirror each set into `FAQPage` schema
the way `app/page.tsx` already does, and keep the answers consistent with
`lib/services.ts` — contradicting the page is worse than no schema.

### 5. Retarget the content

Steps 1–3 changed the commercial model and the pages that sell. Several
surfaces were never revisited and now **contradict** the site rather than
merely sounding dated. In rough order of how much damage they do:

1. **`components/Process.tsx` — live on the homepage.** Describes a multi-week
   embedded engagement: *"Two weeks inside your world — stakeholder interviews,
   customer calls"*, *"weekly working sessions"*, *"you see momentum every
   Friday"*, *"a design system your team can run without us"*. The hero three
   screens above it promises a logo in three days. Worst offender, because it
   is on the page that does the most work.

2. **`/contact`** — *"currently booking Q4 2026 engagements"* and *"a scoped
   proposal with a number and a start date, if we're a fit"*, on a site whose
   prices are published and whose brief starts work immediately. Also *"a reply
   from a founder"*, which contradicts both the offshore delivery model and the
   FAQ's own answer about who does the work.

3. **Reply-time conflict.** `/contact` and `components/CTA.tsx` both say *two*
   business days; `BriefForm` says *one*. Pick one and make all three agree.

4. **`components/BookingLink.tsx`** — a cal.com "Rather just talk?" CTA. A call
   option is fine, but it is currently framed as the main alternative on a site
   built around not needing one.

5. **`/studio` (linked as "About")** — *"an independent, founder-led design
   studio"*, *"small by design, serious about craft"*, *"taste opens the
   conversation; research and testing close it"*. Written for a product team
   choosing a studio, not a florist buying a logo.

6. **Journal** — seven posts, all B2B SaaS ("How to choose a B2B SaaS design
   agency"; "What a B2B software rebrand actually costs" still quotes
   $35k–$250k). Retarget to small-business queries.

7. **Case studies** — Meridian, Loop Health, Forma Studio, Atlas Freight are
   enterprise product work. Reframe to small-business outcomes, or replace.
   The terms page already covers the framing ("anonymized, illustrative
   form"); it is the targeting that is wrong.

8. **`/terms` has no revision or refund policy.** It covers site content,
   indicative pricing and governing law, but says nothing about how many
   revisions a package includes or when money comes back. Competitors are
   beatable precisely because their terms contradict their marketing — ours
   should state both, matching what the packages advertise, before taking
   money.

### 6. Launch

Blockers, in order:

1. **Mail delivery is broken on the host.** `mail()` returns true and nothing
   arrives. Submissions are being recorded to `xark-data/` so nothing is lost,
   but no notification is reaching anyone. Check `info@xarktech.com` exists as
   a real mailbox on the cPanel account.
2. **`xarktech.com` returns 403.** Nothing is deployed yet.
3. **`lib/site.ts` has two `TODO(launch)` markers** — phone and street/postal —
   plus `socials: []` and empty tawk.to ids. An Organization schema with no
   telephone, address or `sameAs` is a thin entity.
4. **`brief.php` has never been executed.** There is no PHP on the dev machine,
   so not even a syntax check has run against it. Needs one live submission;
   confirm a row lands in `xark-data/briefs.csv` above `public_html`.

### Not a site problem, but decides whether this works

Offshore delivery needs a routing and QA step between the brief landing and the
client seeing a draft. One review checkpoint is the difference between good
reviews and refund requests. Also worth knowing the jobs-per-week ceiling per
discipline before spending on ads.

---

## Verifying a change

```bash
npm run build          # static export + prepare-deploy → out/
npx serve out          # or: cd out && python -m http.server 3000

AUDIT_BASE=http://localhost:3000 node scripts/site-audit.mjs
AUDIT_BASE=http://localhost:3000 node scripts/mobile-audit.mjs
AUDIT_BASE=http://localhost:3000 node scripts/tablet-contrast-audit.mjs
AUDIT_BASE=http://localhost:3000 node scripts/brief-check.mjs
```

The audits read routes from the site's own sitemap. They used to carry
hardcoded lists, which meant that after a rename they audited 404s and passed —
don't reintroduce that.

Known, benign audit output:

- `/work/*` "tiny text" — text inside scaled UI mockups, not body copy.
- Off-screen `<label>` overflow — the spam honeypot.
- Serving `out/` statically makes `brief.php` return its own source, so
  `brief-check` exercises the mail-client fallback path. That is the intended
  result locally, not a failure.
