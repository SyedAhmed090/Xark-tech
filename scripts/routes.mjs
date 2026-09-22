/**
 * Shared route list for the audit scripts, read from the running site's own
 * sitemap rather than hardcoded.
 *
 * Every audit previously carried its own copy of the route list. When the
 * services were renamed for the small-business repositioning, all four lists
 * silently pointed at dead slugs — the audits kept passing because they were
 * auditing 404s, which is the worst possible failure mode for a checker.
 */
export async function routesFromSitemap(base) {
  const res = await fetch(new URL("/sitemap.xml", base));
  if (!res.ok) {
    throw new Error(
      `Could not read /sitemap.xml (${res.status}). Is the server running at ${base}?`,
    );
  }
  const xml = await res.text();
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    // Normalise: the sitemap emits absolute URLs on the production origin,
    // and audits run against localhost.
    .map((p) => (p.length > 1 ? p.replace(/\/$/, "") : p));

  if (paths.length === 0) throw new Error("Sitemap contained no <loc> entries");
  return [...new Set(paths)].sort();
}
