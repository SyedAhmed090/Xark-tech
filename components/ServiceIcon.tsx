/**
 * One glyph per service, drawn here rather than pulled from an icon library.
 *
 * Seven identical text tiles is what made the services block forgettable, and
 * a generic icon set is what makes a site look templated — which is the thing
 * being fixed. These are deliberately one family: a 24-unit grid, a single
 * 1.6 stroke, round caps and joins, no fills. They read at 20px and they do
 * not pretend to be illustration.
 *
 * Inline SVG, so they cost markup rather than a request — which matters more
 * than usual here, since `images: { unoptimized: true }` means anything in
 * public/ ships at full weight.
 */
const PATHS: Record<string, React.ReactNode> = {
  // Two primitives overlapping — a mark. The first version drew an artboard
  // with a circle in it and read as a generic "image" icon.
  "logo-design": (
    <>
      <circle cx="9.25" cy="9.25" r="5.25" />
      <rect x="9" y="9" width="10.5" height="10.5" rx="2.5" />
    </>
  ),
  // A browser window.
  "web-design": (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M2.5 9h19" />
      <path d="M6 6.75h.01M8.75 6.75h.01" />
    </>
  ),
  // A shopping bag.
  ecommerce: (
    <>
      <path d="M4.5 8h15l-1.1 11.2a1.5 1.5 0 0 1-1.5 1.3H7.1a1.5 1.5 0 0 1-1.5-1.3L4.5 8Z" />
      <path d="M8.75 10V6.5a3.25 3.25 0 0 1 6.5 0V10" />
    </>
  ),
  // A frame with a play head.
  "video-animation": (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="M10 9.25l4.5 2.75L10 14.75V9.25Z" />
    </>
  ),
  // A shield, checked.
  "website-care": (
    <>
      <path d="M12 3l7 2.75v5.5c0 4.2-2.9 7.6-7 9.25-4.1-1.65-7-5.05-7-9.25v-5.5L12 3Z" />
      <path d="M9 12l2.25 2.25L15.25 10" />
    </>
  ),
  // A map pin.
  "local-seo": (
    <>
      <path d="M12 21s6.5-5.4 6.5-10.25a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  // A speech bubble, mid-conversation.
  "social-media": (
    <>
      <path d="M20.5 12.25c0 4-3.8 7.25-8.5 7.25a9.9 9.9 0 0 1-2.9-.43L4.5 20.5l1.3-3.55A6.9 6.9 0 0 1 3.5 12.25C3.5 8.25 7.3 5 12 5s8.5 3.25 8.5 7.25Z" />
      <path d="M9 12.25h.01M12 12.25h.01M15 12.25h.01" />
    </>
  ),
};

export default function ServiceIcon({
  slug,
  className = "",
}: {
  slug: string;
  className?: string;
}) {
  const paths = PATHS[slug];
  if (!paths) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths}
    </svg>
  );
}
