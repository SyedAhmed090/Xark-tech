import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Live chat (tawk.to).
 *
 * At these prices a pre-sale question converts or dies within minutes — there
 * is no salesperson to call back, so chat is the only synchronous channel the
 * funnel has. It earns its place despite being third-party JavaScript.
 *
 * `lazyOnload` deliberately: the widget loads during browser idle time, after
 * the page is interactive. Chat is worth nothing if the visitor has already
 * left because the price took four seconds to appear, and this is a site whose
 * buyers arrive on mid-range phones.
 *
 * Renders nothing until a property is configured, so an unset ID is a missing
 * widget rather than a console full of 404s. The matching CSP origins are in
 * deploy/.htaccess — the widget is blocked without them.
 */
export default function Chat() {
  const { propertyId, widgetId } = SITE.chat;
  if (!propertyId || !widgetId) return null;

  return (
    <Script
      id="tawk-to"
      src={`https://embed.tawk.to/${propertyId}/${widgetId}`}
      strategy="lazyOnload"
    />
  );
}
