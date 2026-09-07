import type { Metadata, Viewport } from "next";
import { Archivo, Newsreader, Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SITE, absoluteUrl } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic"],
});

const splineMono = Spline_Sans_Mono({
  variable: "--font-spline-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

/**
 * themeColor lives on the viewport export, not metadata. Two entries so the
 * browser chrome tracks the visitor's scheme — the site itself is light-only,
 * but a dark-mode phone showing a paper-coloured status bar looks broken.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#101012" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    // Pages supply only their own name; this appends the brand.
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "design",
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
    url: "/",
    siteName: SITE.name,
    locale: SITE.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
  },
};

const ORG_ID = `${SITE.url}/#organization`;

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: SITE.name,
      description: SITE.shortDescription,
      url: SITE.url,
      email: SITE.email,
      foundingDate: SITE.foundingDate,
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        addressCountry: SITE.address.country,
        // Omitted entirely rather than emitted empty when unknown.
        ...(SITE.address.street ? { streetAddress: SITE.address.street } : {}),
        ...(SITE.address.postalCode
          ? { postalCode: SITE.address.postalCode }
          : {}),
      },
      ...(SITE.phone ? { telephone: SITE.phone } : {}),
      founder: { "@type": "Person", name: SITE.founder },
      // No sameAs until real profile URLs exist — see SITE.socials.
      ...(SITE.socials.length
        ? { sameAs: SITE.socials.map((s) => s.href) }
        : {}),
      areaServed: { "@type": "Country", name: "United States" },
      knowsAbout: [
        "Brand identity",
        "Product design",
        "Design systems",
        "Web design and development",
        "Motion design",
        "B2B software",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Design services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.tagline,
            url: absoluteUrl(`/services/${service.slug}`),
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.shortDescription,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${splineMono.variable} h-full antialiased`}
    >
      <body className="has-custom-cursor min-h-full flex flex-col bg-paper text-ink">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <Analytics />
      </body>
    </html>
  );
}
