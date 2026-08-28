/**
 * Calendly scheduling URLs.
 *
 * The site is a static export, so there is no request-time env read — these
 * resolve at `next build` and are baked into the HTML. The fallbacks are the
 * live Starvu account so a build without env vars still ships a working link.
 *
 * TODO(#4): both pages currently point at the same 30-minute event type, the
 * only one on the account. Once a second event type exists for employment
 * calls, set NEXT_PUBLIC_CALENDLY_CAREERS_URL to it — no code change needed.
 */

const ACCOUNT = "https://calendly.com/jesse-starvu";

/** Creator bookings, embedded on /. */
export const CALENDLY_CREATOR_URL =
  process.env.NEXT_PUBLIC_CALENDLY_CREATOR_URL ?? `${ACCOUNT}/30min`;

/** Employment calls, embedded on /careers. */
export const CALENDLY_CAREERS_URL =
  process.env.NEXT_PUBLIC_CALENDLY_CAREERS_URL ?? `${ACCOUNT}/30min`;

/**
 * Widget query params that theme the embed to match the page. Calendly takes
 * colors as bare hex, so these track the design tokens in globals.css by hand.
 */
const THEME = new URLSearchParams({
  hide_gdpr_banner: "1",
  hide_landing_page_details: "1",
  background_color: "0b1120", // --surface
  text_color: "e8ecf4", // --text
  primary_color: "dcbd78", // --gold
}).toString();

/** Applies the site theme to a scheduling URL. */
export function themed(url: string): string {
  return `${url}?${THEME}`;
}
