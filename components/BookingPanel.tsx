"use client";

import { useState } from "react";

import {
  DURATION_MINUTES,
  TIMEZONE,
  TIMEZONE_LABEL,
  weeklyHours,
} from "@/lib/availability";
import { themed } from "@/lib/calendly";
import { openScheduler } from "@/lib/calendly-widget";

/**
 * The booking panel — a facade in front of the Calendly widget.
 *
 * The widget used to load on mount, which cost every visitor a third-party
 * script and put the only real content (when you can book, how long it takes)
 * inside an iframe, where no crawler attributes it to this page. This renders
 * that content as HTML on our own domain and loads Calendly on click instead.
 *
 * The heading, hours and link are all real markup, so the panel says everything
 * worth saying with JavaScript disabled.
 */
export function BookingPanel({
  url,
  label,
  summary,
}: {
  url: string;
  label: string;
  /** One line on what the call is for. */
  summary: string;
}) {
  const [opening, setOpening] = useState(false);
  const hours = weeklyHours();

  return (
    <div className="panel">
      <p className="panel__kicker">{DURATION_MINUTES}-minute call</p>
      <p className="panel__summary">{summary}</p>

      <h3 className="panel__title">When you can book</h3>
      <dl className="panel__hours">
        {hours.map((range) => (
          <div className="panel__row" key={range.days}>
            <dt>{range.days}</dt>
            <dd className={range.closed ? "is-closed" : undefined}>
              {range.hours}
            </dd>
          </div>
        ))}
      </dl>
      <p className="panel__tz">
        Times shown in {TIMEZONE_LABEL} (<span>{TIMEZONE}</span>). Calendly
        converts them to your own time zone when you pick a slot.
      </p>

      {/* A real link, not just a button: it is the booking path for crawlers,
          agents and anyone without JavaScript. The click handler upgrades it to
          the in-page scheduler for everyone else. */}
      <a
        className="btn btn--primary panel__cta"
        href={themed(url)}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey) return;
          event.preventDefault();
          setOpening(true);
          // Reset once the scheduler is up, so the button is not left mid-sentence
          // when someone closes the popup without booking.
          void openScheduler(themed(url)).finally(() => setOpening(false));
        }}
      >
        {opening ? "Opening\u2026" : label}
      </a>
    </div>
  );
}
