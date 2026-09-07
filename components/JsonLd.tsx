/**
 * Renders a schema.org block. Server component — the payload is serialized at
 * build time and ships as static HTML, so crawlers see it without running JS.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
