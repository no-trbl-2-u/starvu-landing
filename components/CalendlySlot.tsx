/**
 * Placeholder for the Calendly embed.
 *
 * Kept as a component so both booking sections share one hatched panel, and so
 * dropping in the real widget later is a single edit.
 */
export function CalendlySlot({ note }: { note: string }) {
  return (
    <div className="embedSlot">
      <span className="embedSlot__title">Calendly embed</span>
      <span className="embedSlot__note">{note}</span>
    </div>
  );
}
