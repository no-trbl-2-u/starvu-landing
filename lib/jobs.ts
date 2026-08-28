/**
 * Open roles. This is the single source for the rendered role cards, the role
 * picker in the application form, and the `JobPosting` structured data that
 * feeds Google Jobs — so a role can never appear on the page without also being
 * indexable, or vice versa.
 */

export type Job = {
  /** Stable slug, used as the JobPosting `identifier`. */
  id: string;
  title: string;
  /** Short qualifier shown under the title ("Messaging", "Customer service"). */
  track: string;
  /** Plain-prose summary. Also becomes the JobPosting description. */
  description: string;
  /** Terms line rendered under the card, split on the gold interpunct. */
  terms: readonly string[];
  employmentType: readonly ("FULL_TIME" | "PART_TIME")[];
  /** Label used in the application form's role <select>. */
  optionLabel: string;
  /**
   * The day this role actually became publicly visible, as YYYY-MM-DD.
   *
   * Per-role rather than global so the two tracks can open and close
   * independently. Bump it when genuinely re-posting a role — not on every
   * deploy, which would be a claim we cannot support.
   */
  datePosted: string;
};

/**
 * How long a posting stays live before it has to be renewed.
 *
 * Google removes a posting from the jobs experience once `validThrough` has
 * passed. A short, realistic window is deliberate: the previous year-long one
 * is what let the dates rot unnoticed, because nothing ever forced a review.
 */
const POSTING_WINDOW_DAYS = 90;

/** Adds days to a YYYY-MM-DD date, staying in UTC so there is no drift. */
function addDays(date: string, days: number): string {
  const shifted = new Date(`${date}T00:00:00Z`);
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}

/** The closing date Google should see for a role. */
export function validThrough(job: Job): string {
  return addDays(job.datePosted, POSTING_WINDOW_DAYS);
}

export const JOBS: readonly Job[] = [
  {
    id: "client-engagement-specialist-messaging",
    title: "Client engagement specialist",
    track: "Messaging",
    description:
      "You hold the conversations on a creator's page: greeting subscribers, answering questions, and keeping the tone consistent with how that creator writes. Strong written English and fast, reliable typing matter more than prior experience.",
    terms: ["Remote", "Part-time or full-time", "Shift work"],
    employmentType: ["PART_TIME", "FULL_TIME"],
    optionLabel: "Client engagement specialist, messaging",
    datePosted: "2026-08-27",
  },
  {
    id: "client-engagement-specialist-customer-service",
    title: "Client engagement specialist",
    track: "Customer service",
    description:
      "You are the real person on the other end of our 24/7 support promise, for talent and for subscribers. Billing questions, access problems, and anything that needs a calm, clear answer at an odd hour.",
    terms: ["Remote", "Part-time or full-time", "Nights & weekends available"],
    employmentType: ["PART_TIME", "FULL_TIME"],
    optionLabel: "Client engagement specialist, customer service",
    datePosted: "2026-08-27",
  },
] as const;


/**
 * Refuses to ship an expired posting.
 *
 * Structured data that Google will reject is worse than no structured data:
 * it fails silently, and the only symptom is losing the Google Jobs channel
 * without ever being told. Dates rot on their own, so the build has to be the
 * thing that notices. Production fails loudly; dev only warns, so a stale date
 * does not block local work.
 */
const today = new Date().toISOString().slice(0, 10);
const expired = JOBS.filter((job) => validThrough(job) < today);

if (expired.length > 0) {
  const detail = expired
    .map((job) => `  ${job.id} — posted ${job.datePosted}, expired ${validThrough(job)}`)
    .join("\n");
  const message = [
    `${expired.length} job posting(s) have passed validThrough and Google will drop them:`,
    detail,
    "Renew by updating datePosted in lib/jobs.ts, or remove the role.",
  ].join("\n");

  if (process.env.NODE_ENV === "production") throw new Error(message);
  console.warn(`\n[jobs] ${message}\n`);
}

/** Baseline requirements, shared by every role. */
export const REQUIREMENTS: readonly string[] = [
  "18 years of age or older.",
  "Fluent written English and a comfortable typing speed.",
  "Your own computer and a stable internet connection.",
  "Discretion. You handle private information and sign a confidentiality agreement.",
  "Comfort working with adult content.",
] as const;

export const AVAILABILITY_OPTIONS = [
  "Part-time",
  "Full-time",
  "Flexible",
] as const;
