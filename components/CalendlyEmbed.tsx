"use client";

import { useEffect } from "react";
import { themed } from "@/lib/calendly";

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Calendly inline booking widget.
 *
 * Kept as a component so both booking sections share one embed and the
 * scheduling URL is the only thing that differs between them.
 *
 * The anchor inside the container is not dead markup. It is what crawlers,
 * agents, and anyone without JavaScript get, because widget.js only replaces
 * the container's contents once it loads — so the booking link is in the
 * static HTML either way.
 *
 * The script is injected from an effect rather than rendered into the document,
 * which keeps it off the critical path; both booking sections sit at the bottom
 * of a long page. It is fetched once even when two embeds mount.
 */
export function CalendlyEmbed({ url, label }: { url: string; label: string }) {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="embed">
      <div
        className="calendly-inline-widget embed__widget"
        data-url={themed(url)}
        data-resize="true"
      >
        <a className="embed__fallback" href={url}>
          {label}
        </a>
      </div>
    </div>
  );
}
