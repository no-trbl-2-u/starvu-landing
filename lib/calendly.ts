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
  background_color: "ffffff", // --surface
  text_color: "2a211c", // --text
  primary_color: "7e5d41", // --accent-ink
}).toString();

/** Applies the site theme to a scheduling URL. */
export function themed(url: string): string {
  return `${url}?${THEME}`;
}

/**
 * Answers carried into the booking form.
 *
 * `a1` is Calendly's first custom question — on the live event type that is
 * "Please share anything that will help prepare for our meeting", a free text
 * field. The application answers beyond name and email are folded into it,
 * because the event type has no other questions to map them onto.
 */
export type Prefill = { name?: string; email?: string; a1?: string };

/** Adds prefill answers to a themed scheduling URL. */
export function withPrefill(url: string, prefill: Prefill): string {
  const params = new URLSearchParams(THEME);
  for (const [key, value] of Object.entries(prefill)) {
    if (value) params.set(key, value);
  }
  return `${url}?${params.toString()}`;
}
