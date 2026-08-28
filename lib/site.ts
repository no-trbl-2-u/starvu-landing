/**
 * Site-wide constants. Everything that appears in more than one place — nav,
 * contact addresses, the legal disclaimer, the canonical origin — lives here so
 * the pages, the sitemap, the JSON-LD and llms.txt can never drift apart.
 */

/**
 * Canonical origin, without a trailing slash.
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the environment for the production domain. On
 * Vercel preview builds we fall back to the deployment URL so canonical tags and
 * OG images resolve there too, rather than pointing previews at production.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://starvu.com")
).replace(/\/$/, "");

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

export const ORG = {
  legalName: "Starvu LLC",
  name: "Starvu",
  region: "Pennsylvania",
  country: "US",
  talentEmail: "talent@starvu.com",
  careersEmail: "careers@starvu.com",
  social: "@starvu",
  logo: "/assets/starvu-logo.png",
  logoWidth: 484,
  logoHeight: 202,
  description:
    "Starvu is an independent talent management company for solo creators and couples on OnlyFans and premium content platforms, handling promotion, chatting, scheduling and brand deals.",
} as const;

export const NAV = [
  { href: "/#what-you-get", label: "What you get" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#book", label: "Book" },
] as const;

/** Shown in both footers; the careers page appends its own hiring clauses. */
export const AFFILIATION_DISCLAIMER =
  "Starvu LLC is an independent talent management company and is not affiliated with, endorsed by, or sponsored by OnlyFans or Fenix International Limited.";

export const COPYRIGHT = `© ${new Date().getFullYear()} Starvu LLC.`;
