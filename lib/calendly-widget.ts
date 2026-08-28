/**
 * Client-side loader for Calendly's widget assets.
 *
 * Nothing is loaded on page load. Both entry points — the booking panel's
 * button and the application form's submit — call `openScheduler`, which
 * fetches the assets on first use. That keeps a third-party script and
 * stylesheet off the critical path for the visitors who never book.
 *
 * The stylesheet is not optional. widget.js builds the popup out of unstyled
 * markup and relies entirely on widget.css to position it: without the
 * stylesheet the overlay computes to `position: static`, lands in document
 * flow partway down the page at a 153px sliver, and the booking flow is
 * effectively dead. Both assets load before the popup is opened.
 */

const WIDGET_JS = "https://assets.calendly.com/assets/external/widget.js";
const WIDGET_CSS = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyApi = { initPopupWidget: (options: { url: string }) => void };

let pending: Promise<CalendlyApi> | null = null;

function loadStylesheet(): Promise<void> {
  if (document.querySelector(`link[href="${WIDGET_CSS}"]`)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = WIDGET_CSS;
    link.onload = () => resolve();
    // Rejecting sends openScheduler down its navigate fallback. An unstyled
    // popup is worse than leaving the page: it looks like nothing happened.
    link.onerror = () => reject(new Error("Calendly stylesheet failed to load"));
    document.head.appendChild(link);
  });
}

function loadScript(): Promise<CalendlyApi> {
  const existing = (window as { Calendly?: CalendlyApi }).Calendly;
  if (existing?.initPopupWidget) return Promise.resolve(existing);

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = WIDGET_JS;
    script.async = true;
    script.onload = () => {
      const api = (window as { Calendly?: CalendlyApi }).Calendly;
      if (api?.initPopupWidget) resolve(api);
      else reject(new Error("Calendly loaded without initPopupWidget"));
    };
    script.onerror = () => reject(new Error("Calendly widget failed to load"));
    document.body.appendChild(script);
  });
}

function loadWidget(): Promise<CalendlyApi> {
  // Cached so two panels, or a panel and a form, share one request.
  pending ??= Promise.all([loadStylesheet(), loadScript()])
    .then(([, api]) => api)
    .catch((error) => {
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
 * asset must never leave someone stuck on a button that does nothing.
 */
export function openScheduler(url: string): Promise<void> {
  return loadWidget()
    .then((calendly) => calendly.initPopupWidget({ url }))
    .catch(() => {
      window.location.href = url;
    });
}
