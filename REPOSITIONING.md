# Repositioning: studio → small business

Working plan for taking Xark Tech from a $20k–$110k studio portfolio to a
productized small-business agency. Read `README.md` first for the architecture
(static export, Apache/cPanel, PHP form endpoints) — this file is only about
the repositioning.

**Status: steps 1–5 done and on `main`. Step 6 is blocked on host access.**

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

## Status by step

### 4. Service page content — done

102 FAQs across the seven service pages, each mirrored into FAQPage schema
generated from the same array the page renders. Answers lead with the number,
the timeframe or a plain yes/no, because they are written to be quoted in
isolation by an assistant rather than skimmed.

They deliberately cover the awkward questions — refunds, whether AI is used,
whether the work is outsourced, whether first place on Google can be
guaranteed. Several argue against a sale. Those are the questions stopping the
purchase; omitting them moves the doubt somewhere it cannot be answered.

### 5. Retarget the content — done

Every surface that still spoke to a B2B product team has been rewritten:
the homepage process block, `/contact`, the reply-time promise (one business
day everywhere now), `BookingLink`, `/studio`, the terms, and all five journal
posts. Two posts that could not be retargeted were retired.

`lib/site.ts` was the important one: its `description` is both the site-wide
meta description and the Organization schema description, and it still said
"an independent design studio focused on complex B2B software". The Open Graph
card still said "We make software feel human".

**Still open here:** the four case studies are enterprise software concepts.
They are honestly labelled as self-initiated concept work and `/work` now
frames them as craft demonstrations, but replacing the *subjects* with
small-business ones means rebuilding four working prototypes. That is a design
job to schedule, not a copy fix.

### 6. Launch — blocked on host access

`npm run launch-check` verifies the built `out/` before deploy: required files,
origin consistency, sitemap/canonical agreement, noindex pages wrongly listed,
Organization schema completeness, and leftover placeholder markers. It exits
non-zero on anything that would break in production.

It currently reports **0 blocking, 2 to decide**:

1. **tawk.to is not configured.** Set `SITE.chat.propertyId` and `widgetId` in
   `lib/site.ts` or no chat widget renders. The CSP already allows the vendor.
2. **No `sameAs` in the Organization schema.** Add real social profile URLs to
   `SITE.socials` — deliberately empty rather than pointing at platform
   homepages, which asserts a relationship that does not exist.

Two things the check cannot see, both needing the live host:

3. **Mail delivery is broken.** `mail()` returns true and nothing arrives.
   Every form writes its row to `xark-data/*.csv` above `public_html` first, so
   nothing is being lost, but no notification reaches anyone. Confirm
   `info@xarktech.com` exists as a real mailbox on the cPanel account.
   `tools/mailtest.php` is there to diagnose it.
4. **`brief.php` has never been executed.** There is no PHP on the dev machine,
   so not even a syntax check has run against it. Needs one live submission;
   confirm a row lands in `xark-data/briefs.csv` above `public_html`.

`xarktech.com` returning 403 simply means nothing is deployed yet.

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

npm run launch-check      # reads out/ directly; run before every deploy
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
