/**
 * Client-side loader for Calendly's widget script.
 *
 * The script is not loaded on page load. Both entry points — the booking
 * panel's button and the application form's submit — call `openScheduler`,
 * which fetches it on first use. That keeps a third-party script off the
 * critical path entirely for the visitors who never book, and it means the
 * form no longer depends on the panel having mounted first.
 */

const WIDGET_SRC = "https://assets.calendly.com/assets/external/widget.js";

type CalendlyApi = { initPopupWidget: (options: { url: string }) => void };

let pending: Promise<CalendlyApi> | null = null;

function loadWidget(): Promise<CalendlyApi> {
  const existing = (window as { Calendly?: CalendlyApi }).Calendly;
  if (existing?.initPopupWidget) return Promise.resolve(existing);

  // Cached so two panels, or a panel and a form, share one request.
  pending ??= new Promise<CalendlyApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.onload = () => {
      const api = (window as { Calendly?: CalendlyApi }).Calendly;
      if (api?.initPopupWidget) resolve(api);
      else reject(new Error("Calendly loaded without initPopupWidget"));
    };
    script.onerror = () => reject(new Error("Calendly widget failed to load"));
    document.body.appendChild(script);
  }).catch((error) => {
    // Let a later attempt retry rather than caching the failure forever.
    pending = null;
    throw error;
  });

  return pending;
}

/**
 * Opens the scheduler for `url`, falling back to navigating there.
 *
 * The fallback is the reason this is worth centralising: a blocked or slow
 * script must never leave someone stuck on a button that does nothing.
 */
export function openScheduler(url: string): Promise<void> {
  return loadWidget()
    .then((calendly) => calendly.initPopupWidget({ url }))
    .catch(() => {
      window.location.href = url;
    });
}
