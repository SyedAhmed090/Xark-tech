import type { Metadata } from "next";
import { Archivo, Newsreader, Spline_Sans_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://xark.tech"),
  title: "Xark Tech — We make software feel human",
  description:
    "Xark Tech is an independent design agency in Austin, TX, focused on complex B2B software — fintech, healthcare, logistics. Brand identity, product design, and web experiences.",
  openGraph: {
    title: "Xark Tech — We make software feel human",
    description:
      "Independent design agency in Austin, TX, focused on complex B2B software — fintech, healthcare, logistics.",
    url: "/",
    siteName: "Xark Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xark Tech — We make software feel human",
    description:
      "Independent design agency in Austin, TX, focused on complex B2B software — fintech, healthcare, logistics.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Xark Tech",
  description:
    "Independent design agency in Austin, TX, focused on complex B2B software — fintech, healthcare, logistics.",
  url: "https://xark.tech",
  email: "hello@xark.tech",
  foundingDate: "2014",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Austin",
    addressRegion: "TX",
    addressCountry: "US",
  },
  founder: { "@type": "Person", name: "Syed Ahmed" },
  sameAs: [
    "https://instagram.com",
    "https://linkedin.com",
    "https://dribbble.com",
    "https://x.com",
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
