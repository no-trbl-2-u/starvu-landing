"use client";

import { useState } from "react";

export type Field =
  | {
      kind: "text" | "email";
      name: string;
      label: string;
      placeholder: string;
      autoComplete?: string;
    }
  | {
      kind: "select";
      name: string;
      label: string;
      options: readonly string[];
    };

type Props = {
  /** Distinguishes the two forms in the DOM and in any future submit handler. */
  id: string;
  fields: readonly Field[];
  /** Fine print rendered under the button. */
  note: string;
};

/**
 * The creator and careers application forms.
 *
 * Real `<form>` semantics — named fields, `required`, autocomplete hints — so
 * the browser validates and autofills, and so wiring a submit target later is a
 * one-line change.
 *
 * TODO: post to a real endpoint (route handler or server action). Until then the
 * button only reflects the submitted state, matching the design's behaviour, and
 * applicants are directed to the email addresses in the footer.
 */
export function ApplicationForm({ id, fields, note }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="form"
      id={id}
      name={id}
      noValidate={false}
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      {fields.map((field) => {
        const fieldId = `${id}-${field.name}`;
        return (
          <label className="field" key={field.name} htmlFor={fieldId}>
            <span className="field__label">{field.label} *</span>
            {field.kind === "select" ? (
              <select id={fieldId} name={field.name} required defaultValue="">
                <option value="" disabled>
                  Select one
                </option>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={fieldId}
                name={field.name}
                type={field.kind}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                required
              />
            )}
          </label>
        );
      })}

      <button type="submit" className="btn btn--primary" disabled={sent}>
        {sent ? "Application sent" : "Send application"}
      </button>

      <div className="formFoot">
        {/* Mounted from first render and empty until submit, so the
            confirmation is announced as a change to a watched region. */}
        <p className="formStatus" role="status">
          {sent ? "Thanks — we reply within 24 hours." : ""}
        </p>
        <p className="formNote">{note}</p>
      </div>
    </form>
  );
}
