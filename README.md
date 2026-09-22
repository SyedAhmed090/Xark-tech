# Xark Tech

Marketing site for Xark Tech. Next.js 16 (App Router) built as a **static
export** and deployed to Apache on cPanel shared hosting.

## Why static

The hosting has no Node runtime — cPanel offers Git Version Control but not
"Setup Node.js App" — so `next start` is not an option. The site is exported to
plain HTML/CSS/JS, and the two pieces that genuinely need a server (the contact
and newsletter forms) run as PHP, which the host does provide.

Three consequences worth knowing before you change anything:

1. **Security headers live in `deploy/.htaccess`, not `next.config.ts`.**
   Static exports don't support `headers()`. Editing the Next config will not
   change what the server sends.
2. **There are no Route Handlers.** `app/api/*` cannot exist. The form
   endpoints are `deploy/api/*.php`.
3. **Image Optimization is off** (`images.unoptimized`). `next/image` ships the
   original file, so watch the weight of anything added to `public/`.

## Local development

```bash
npm install
npm run dev
```

The PHP endpoints do not run under `next dev`. Both forms degrade honestly when
they get a 404 — the contact form falls back to a `mailto:` compose, the
newsletter says sign-ups aren't wired up. To exercise the real endpoints:

```bash
npm run build
cd out && php -S 127.0.0.1:8000
```

`mail()` won't deliver without a local MTA, so expect a `send-failed` on the
contact form; validation, honeypot, rate limiting and storage all work.

## Build

```bash
npm run build
```

This runs `next build` and then `scripts/prepare-deploy.mjs`, which merges
`deploy/` into `out/`. The result is a single directory whose **contents** go
into `public_html`. The script fails loudly if `.htaccess` didn't make it —
without that file the site silently loses every security header.

## Deploying

See [`DEPLOY.md`](./DEPLOY.md).

## Content policy

The four case studies are **self-initiated concept projects**, not client
engagements, and the site says so on every surface that shows them — the work
index, each tile, and a badge above each case study title. Each one links to a
working prototype under `app/demo/`.

This matters when editing `lib/projects.tsx`: the `stats` field holds design
facts about the artifact (pattern counts, screen counts), never outcome
metrics. There is no deployment behind these projects, so there is nothing to
measure, and inventing a number would misrepresent concept work as client
results.

The same rule applies site-wide. An earlier version of this site carried
invented testimonials attributed to named people, a "trusted by" client logo
strip, five unearned design awards, and a fabricated founding date and team.
Those were removed rather than restated with different numbers. If you add a
claim — a client, an award, a metric, a colleague — it needs to be true and
checkable.
