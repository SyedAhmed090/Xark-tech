# Deploying to cPanel

The site is a static export plus two PHP endpoints. Nothing needs Node on the
server.

## Before the first deploy

Check these in cPanel — each one causes a specific, non-obvious failure:

| Check | Where | Why |
|---|---|---|
| PHP 7.4 or newer | "Select PHP Version" / "MultiPHP Manager" | The endpoints use `filter_var`, `fputcsv`, `flock`. 7.4+ is safe; 8.x is better. |
| `mod_headers` enabled | Ask your host if unsure | Without it every security header in `.htaccess` is silently ignored. The site still works, so you won't notice. |
| `mod_rewrite` enabled | Usually on by default | Without it the HTTPS and www redirects don't fire. |
| AutoSSL certificate issued | "SSL/TLS Status" | `.htaccess` sends HSTS with a two-year max-age. Deploying that **before** HTTPS works will make browsers refuse the site. If the certificate isn't ready, comment out the `Strict-Transport-Security` line until it is. |
| `mail()` not disabled | Ask your host | Some shared plans disable it. If so, see "If mail() is blocked" below. |

## Build

```bash
npm install
npm run build
```

This produces `out/`, containing the exported site, `.htaccess`, and `api/`.
The build fails if `.htaccess` didn't get copied.

## Upload

1. Zip the **contents** of `out/` — not the folder itself. The archive should
   have `index.html` at its top level, not `out/index.html`.
   ```bash
   cd out && zip -r ../xark-site.zip . -x '.DS_Store'
   ```
   `zip` includes dotfiles by default, but **verify `.htaccess` is in the
   archive** before uploading — some GUI zip tools drop it silently:
   ```bash
   unzip -l ../xark-site.zip | grep htaccess
   ```
2. cPanel → **File Manager** → `public_html`.
3. Delete the default `index.html` / `cgi-bin` placeholder if present.
4. Upload `xark-site.zip`, then right-click → **Extract**.
5. Delete the zip from the server afterwards.

## After uploading

Create the data directory **one level above `public_html`**, so it is never
web-readable:

```
/home/<cpanel-user>/xark-data/
```

Set it to `0700`. The subscribe endpoint creates it automatically if PHP has
permission, but making it yourself avoids a first-signup failure.

Then set the delivery address. In `public_html/api/config.php`:

- `CONTACT_TO` — where inquiries land (default `hello@xarktech.com`)
- `CONTACT_FROM` — must be an address **on this domain**, or your own SPF
  record won't cover it and mail lands in spam. Create `website@xarktech.com`
  in cPanel → Email Accounts first.

## Verify

Work through all of these — several fail silently:

- [ ] `https://xarktech.com` loads, `http://` redirects to it
- [ ] `https://www.xarktech.com` redirects to the bare domain
- [ ] A deep link works directly: `https://xarktech.com/work/meridian/`
- [ ] A bad URL shows the styled 404, not Apache's default
- [ ] `/sitemap.xml` and `/robots.txt` return correctly
- [ ] Headers are present:
      `curl -sI https://xarktech.com | grep -i "content-security\|strict-transport"`
      — **empty output means `mod_headers` is off**, and the site is serving
      with no security headers at all
- [ ] Social card is served as an image, not a download:
      `curl -sI https://xarktech.com/work/meridian/opengraph-image | grep -i content-type`
      should say `image/png`
- [ ] Contact form: submit a real message and confirm it arrives, then reply to
      it and confirm the reply reaches the address you typed
- [ ] Newsletter: sign up, then confirm the row appears in
      `/home/<cpanel-user>/xark-data/subscribers.csv`
- [ ] `https://xarktech.com/api/config.php` returns 403

## Updating the site later

There is no build step on the server, so every content change means: build
locally, re-zip, re-upload. Only the changed files need replacing, but the
whole `out/` is simplest.

To get push-to-deploy instead, cPanel's **Git Version Control** can pull this
repo and run a `.cpanel.yml` that copies files into `public_html` — but since
the server can't run `next build`, `out/` would have to be committed to the
repo (it's currently in `.gitignore`) or built by a CI job that pushes the
result to a deploy branch.

## If mail() is blocked

Some shared plans disable `mail()`. Symptom: the contact form returns
`send-failed` (HTTP 502) while everything else works.

The fix is authenticated SMTP through your own mailbox: vendor PHPMailer into
`deploy/api/`, point it at `mail.xarktech.com` on port 465, and move the
mailbox password into a file **above `public_html`**. The rest of the endpoint
— validation, honeypot, rate limiting, header sanitisation — stays as is.
