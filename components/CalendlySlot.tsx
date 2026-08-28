/**
 * Placeholder for the Calendly embed.
 *
 * Kept as a component so both booking sections share one hatched panel, and so
 * dropping in the real widget later is a single edit.
 *
 * TODO(#4): blocked on the Calendly account. Two calendars are needed — creator
 * bookings on / and employment calls on /careers — so this will likely take a
 * per-page scheduling URL rather than one shared embed.
 */
export function CalendlySlot({ note }: { note: string }) {
  return (
    <div className="embedSlot">
      <span className="embedSlot__title">Calendly embed</span>
      <span className="embedSlot__note">{note}</span>
    </div>
  );
}
