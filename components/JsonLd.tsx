/**
 * Emits a schema.org payload as a JSON-LD script tag.
 *
 * Escaping `<` is what keeps a `</script>` sequence inside any string value from
 * closing the tag early; JSON.stringify itself does not escape it.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
