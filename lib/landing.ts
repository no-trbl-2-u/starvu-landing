/**
 * Landing page copy. Kept beside the careers data so both pages read their
 * content from `lib/` and the FAQ can be emitted as `FAQPage` structured data
 * without restating the answers in a second place.
 */

export const BENEFITS = [
  {
    no: "01",
    title: "Weekly team meetings",
    body: "Sit down with your manager and the roster every week to review numbers, plan content, and copy what works.",
  },
  {
    no: "02",
    title: "24/7 support",
    body: "A real person on the other end at any hour, not a ticket queue and not a bot.",
  },
  {
    no: "03",
    title: "Make your own schedule",
    body: "You set the hours you film and post. We build the promotion calendar around your life.",
  },
  {
    no: "04",
    title: "Runway modeling",
    body: "Runway and brand opportunities off-platform for talent who want to grow past subscriptions.",
  },
] as const;

export const STEPS = [
  {
    no: "Step 01",
    title: "Apply",
    body: "Fill in the short form at the bottom of this page: your name, how to reach you, and where you post.",
  },
  {
    no: "Step 02",
    title: "We review and verify",
    body: "We read every application and reply within 24 hours. Verification means valid government-issued photo ID and platform verification. Couples verify individually.",
  },
  {
    no: "Step 03",
    title: "Free 1:1 call",
    body: "A private call with a manager. We go through your page, what we would promote first, the schedule that fits your life, and the management terms. You ask us anything. No cost and no obligation.",
  },
  {
    no: "Step 04",
    title: "Sign",
    body: "You receive the Talent Management Agreement to read before signing anything. Then the 90 days begin.",
  },
] as const;

export const WHO_WE_SIGN = [
  "18 years of age or older.",
  "Valid government-issued photo identification.",
  "Platform verification.",
  "Couples: both partners must apply and verify individually.",
] as const;

/** Rendered as <details> and mirrored into FAQPage JSON-LD. */
export const FAQ = [
  {
    q: "Commission and terms?",
    a: "Commission and terms are covered on the call and set out in the Talent Management Agreement, which you receive to read before you sign anything.",
  },
  {
    q: 'What does "we run the business" cover?',
    a: "Promotion, chatting, scheduling, and brand deals. You make the content and set the hours you film and post. We build the promotion calendar around your life and review the numbers with you every week.",
  },
  {
    q: "How do privacy and discretion work?",
    a: "We never publish talent names or photos without written consent. All personal data and documents are stored encrypted and never shared.",
  },
  {
    q: "What happens after the trial?",
    a: "There is no long-term commitment. If it isn't the right fit you walk with everything you built: your page, your content, your audience. If it is, we keep going on the terms set out in the Talent Management Agreement.",
  },
] as const;

export const CREATOR_TYPE_OPTIONS = ["Solo creator", "Couple"] as const;

export const EARNINGS_HEADLINE = "$15K–$30K";
