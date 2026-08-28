# Calendar roadmap

Living record of the Calendly integration: what is live, what is next, and what
is blocked on a decision. Update it in the same PR that changes the behaviour —
a stale roadmap is worse than none.

**Account:** `calendly.com/jesse-starvu` · Jesse Smallwood · `jesse@starvu.net` ·
`America/New_York` · org owner.

**Credentials:** `CALENDLY_API_KEY` in the gitignored `.env`. A non-expiring
personal access token with full org-owner scope. Server-side only — it must
never reach a `NEXT_PUBLIC_*` variable or the client bundle.

---

## Done

- [x] **Live embed on both booking sections.** `/` and `/careers` render the real
      widget instead of the hatched placeholder. PR #7, closed issue #4.
- [x] **Per-page scheduling URLs.** `lib/calendly.ts` reads
      `NEXT_PUBLIC_CALENDLY_CREATOR_URL` and `NEXT_PUBLIC_CALENDLY_CAREERS_URL`,
      falling back to the live account, so the two pages can diverge without a
      code change.
- [x] **Booking link in the static HTML.** The anchor inside the widget container
      is what crawlers, agents and no-JS visitors get; `widget.js` only replaces
      the container contents once it loads.
- [x] **Widget themed to the design tokens.** Background, text and primary colours
      are passed as embed params from `lib/calendly.ts`.

---

## Next

### 1. Application form reaches a human — partial

Issue #2. The forms currently transmit nothing; the button only flips to a
"sent" state. The interim fix routes form answers into Calendly as booking
prefill, so a completed booking carries the applicant's details.

- [ ] Prefill `name`, `email` and the remaining answers into the widget on submit
- [ ] Replace the "Application sent" copy, which is untrue today
- [ ] **Still outstanding:** someone who fills the form and never books is still
      lost. Only a real submit target closes issue #2.

### 2. Second event type — blocked on Calendly dashboard

The account has exactly one event type (`30min`). Issue #4 asked for two —
creator bookings and employment calls — and auto-closed on merge without that
half being done.

- [ ] Create an employment-call event type in the Calendly dashboard.
      **The API cannot do this**; event type creation is UI-only.
- [ ] Set `NEXT_PUBLIC_CALENDLY_CAREERS_URL` to it. That is the entire code change.

### 3. Booking notifications — blocked on decisions

- [ ] Cloudflare Pages Function receiving `invitee.created` / `invitee.canceled`
- [ ] Forward to email rather than a database (see *Decisions* below)
- [ ] Same function handles form submissions, closing issue #2 properly

The site is a static export (`output: "export"`), so there are no Next.js API
routes. This has to be a Pages Function; there is no `functions/` directory yet.

### 4. Calendar SEO — recover what the iframe hides

An iframe's contents are never attributed to the host page, so every fact inside
the widget currently belongs to `calendly.com`. Availability splits in two:

| | Example | Changes when | Safe as static HTML |
|---|---|---|---|
| Durable | "Mon–Sat 9–6 ET, Sun until 8" | Jesse edits his hours | Yes |
| Perishable | "Next opening Friday 2pm" | Every booking | No — goes stale |

- [ ] **Facade pattern.** Replace the auto-loading iframe with a crawlable HTML
      panel (hours, duration, timezone, what the call covers) plus a button that
      loads the widget on click. Fixes the SEO hole and the third-party
      performance cost in one change.
- [ ] **Booking in `/llms.txt`.** The route exists and is generated from `lib/`,
      but its Contact section lists only two email addresses — an agent reading
      it cannot tell that Starvu takes calls at all.
- [ ] **`OpeningHoursSpecification` in the JSON-LD.** No Google rich result
      exists for service availability, so expect no snippet. The value is for
      answer engines and LLM crawlers.
- [ ] Do **not** publish specific open slots as static HTML. A stale exact time
      is a visible inaccuracy. Use a durable phrasing such as "usually openings
      within a few days" instead.

Current schedule, for reference — no disabled days today:

```
Sunday             09:00–20:00  America/New_York
Monday–Saturday    09:00–18:00  America/New_York
```

### 5. Attribution

- [ ] UTM params per embed so creator vs. careers bookings are distinguishable
- [ ] Read back off the invitee record

Not urgent to build first: Calendly stores tracking data on its own invitee
records, so this history is recoverable from the API later rather than lost.

---

## Decisions needed

| # | Question | Blocks |
|---|---|---|
| 1 | **`starvu.com` or `starvu.net`?** The site uses `talent@starvu.com` and `careers@starvu.com`; Calendly uses `jesse@starvu.net`. | Email sending, issue #5 |
| 2 | Email provider account and API key — Resend suggested. Cloudflare's free MailChannels route was discontinued in 2024. | Next §3 |
| 3 | Where do notifications land — one inbox, or creator vs. careers split? | Next §3 |
| 4 | Storage: skip the database for now? Recommended, given no volume yet and no dashboard to read it with. | Next §3 |
| 5 | DNS access for SPF/DKIM on the sending domain. Without it, mail lands in spam. | Next §3 |

---

## API capabilities and limits

Verified against the live token — all read endpoints return 200.

**Can do:** read users, event types, scheduled events and invitees, availability
schedules and open slots, routing forms, groups, org memberships; create webhook
subscriptions and single-use scheduling links; cancel events; mark no-shows;
delete invitee data for GDPR requests.

**Cannot do:** create or edit event types, change availability (read-only), or
alter branding. All dashboard-only.

---

## Related issues

- #2 — application forms do not submit anywhere
- #3 — JobPosting dates are placeholders
- #4 — Calendly embed (closed by PR #7; second event type still outstanding)
- #5 — real domain, canonicals off `pages.dev`
