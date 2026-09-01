import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";

import { ORG, SITE_URL } from "@/lib/site";

import "./globals.css";

/**
 * Both faces are self-hosted by next/font, so there is no render-blocking
 * request to fonts.googleapis.com and no layout shift while they load.
 *
 * Cormorant Garamond is the display face: a high-contrast old-style serif that
 * matches the letterforms of the STARVU wordmark. Jost carries everything else
 * — body copy, labels, buttons — as a warm geometric sans.
 */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
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
  icons: { icon: ORG.icon, apple: ORG.icon },
  // The site is 18+ throughout; this is the signal filters actually read.
  other: { rating: "adult" },
};

export const viewport: Viewport = {
  themeColor: "#fbf6f0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <a className="skipLink" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
