import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";

import { ORG, SITE_URL } from "@/lib/site";

import "./globals.css";

/**
 * Both faces are self-hosted by next/font, so there is no render-blocking
 * request to fonts.googleapis.com and no layout shift while they load.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Lets every page express canonical/OG URLs as plain relative paths.
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${ORG.name} — Talent management for creators and couples`,
    template: `%s — ${ORG.name}`,
  },
  description: ORG.description,
  applicationName: ORG.name,
  authors: [{ name: ORG.legalName, url: SITE_URL }],
  creator: ORG.legalName,
  publisher: ORG.legalName,
  openGraph: {
    type: "website",
    siteName: ORG.name,
    locale: "en_US",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
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
  icons: { icon: ORG.logo, apple: ORG.logo },
  // The site is 18+ throughout; this is the signal filters actually read.
  other: { rating: "adult" },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${archivo.variable} ${plexMono.variable}`}>
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
