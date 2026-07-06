import type { Metadata } from "next";
import { Archivo, Newsreader, Spline_Sans_Mono } from "next/font/google";
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
    "Xark Tech is an independent design agency in Austin, TX. Brand identity, product design, and web experiences for companies that ship.",
  openGraph: {
    title: "Xark Tech — We make software feel human",
    description:
      "Independent design agency in Austin, TX. Brand identity, product design, and web experiences for companies that ship.",
    url: "/",
    siteName: "Xark Tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xark Tech — We make software feel human",
    description:
      "Independent design agency in Austin, TX. Brand identity, product design, and web experiences for companies that ship.",
  },
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
        {children}
      </body>
    </html>
  );
}
