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
};

/**
 * ISO date the current listings went live. Google requires `datePosted`, and
 * drops postings whose `validThrough` has passed — bump both when you re-post.
 */
export const DATE_POSTED = "2026-08-01";
export const VALID_THROUGH = "2027-08-01";

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
  },
] as const;

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
