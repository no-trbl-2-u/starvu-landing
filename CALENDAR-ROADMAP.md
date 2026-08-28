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

- [x] **Booking panel replaces the auto-loading embed.** The widget used to load
      on mount, putting the only real content — when you can book, how long it
      takes — inside an iframe, where no crawler attributes it to this page. The
      panel renders that as HTML and loads Calendly on click.
- [x] **Hours published as crawlable text** on `/`, `/careers`, `/llms.txt` and
      in the JSON-LD, from `lib/calendly-availability.json`.
- [x] **`npm run sync:availability`** regenerates that file from the account, so
      the published hours have a refresh path rather than being hand-typed.
- [x] **No third-party script on load.** `assets.calendly.com` no longer appears
      in the static HTML at all; `lib/calendly-widget.ts` fetches it on first use
      and is shared by the panel and the form.
- [x] **`Service` node with `OpeningHoursSpecification`** in both page graphs.

---

## Next

### 1. Application form reaches a human — partial, #2

Done: submit folds the answers into the Calendly booking prefill and opens the
scheduler, so a completed booking carries the application on the invitee record.
The untrue "Thanks — we reply within 24 hours" copy is gone.

- [ ] **Still outstanding:** someone who fills the form and never finishes
      booking is still lost. The form has no submit target, so nothing is
      transmitted until #10 exists. Only that closes #2.

### 2. Second event type — #9, blocked on Calendly dashboard

The account has exactly one event type (`30min`). Issue #4 asked for two —
creator bookings and employment calls — and auto-closed on merge without that
half being done.

- [ ] Create an employment-call event type in the Calendly dashboard.
      **The API cannot do this**; event type creation is UI-only.
- [ ] Set `NEXT_PUBLIC_CALENDLY_CAREERS_URL` to it. That is the entire code change.

### 3. Booking notifications — #10, blocked on decisions

- [ ] Cloudflare Pages Function receiving `invitee.created` / `invitee.canceled`
- [ ] Forward to email rather than a database (see *Decisions* below)
- [ ] Same function handles form submissions, closing issue #2 properly

The site is a static export (`output: "export"`), so there are no Next.js API
routes. This has to be a Pages Function; there is no `functions/` directory yet.

### 4. Calendar SEO — done, with one standing chore

Shipped: the facade panel, hours in `/llms.txt`, and `OpeningHoursSpecification`
in the JSON-LD. An iframe's contents are never attributed to the host page, so
everything worth indexing now exists outside it.

Specific open slots are still deliberately **not** published. A built-once "next
opening Friday 2pm" is wrong by Tuesday, and a stale exact time is a visible
inaccuracy. The page says "usually openings within a few days" instead.

- [ ] **#12 — re-sync the published hours before launch, and whenever they
      change.** `lib/calendly-availability.json` is a snapshot; it does not
      update itself.

### 5. Attribution — #11

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
- #9 — create the employment-call event type
- #10 — Calendly webhook to email
- #11 — tag bookings with their source page
- #12 — re-sync published booking hours
