"use client";

import { useState } from "react";

import { withPrefill, type Prefill } from "@/lib/calendly";
import { openScheduler } from "@/lib/calendly-widget";

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
  /** Scheduling URL the answers are carried into. */
  schedulingUrl: string;
};

/**
 * Folds the answers into the one free-text question the event type has.
 *
 * Name and email are passed separately because Calendly has dedicated fields
 * for them, so they are skipped here to avoid asking twice.
 */
function summarise(fields: readonly Field[], data: FormData): Prefill {
  const value = (name: string) => String(data.get(name) ?? "").trim();

  const rest = fields
    .filter((field) => field.name !== "name" && field.name !== "email")
    .map((field) => [field.label, value(field.name)] as const)
    .filter(([, answer]) => answer.length > 0)
    .map(([label, answer]) => `${label}: ${answer}`)
    .join("\n");

  return { name: value("name"), email: value("email"), a1: rest };
}

/**
 * The creator and careers application forms.
 *
 * Real `<form>` semantics — named fields, `required`, autocomplete hints — so
 * the browser validates and autofills.
 *
 * TODO(#2): this is an interim route, not a submit target. The answers are
 * carried into Calendly as booking prefill, so a completed booking reaches
 * Jesse with the application attached. Anyone who fills the form and does not
 * finish booking is still lost — closing #2 needs a Pages Function, because the
 * site is a static export and has no server routes.
 */
export function ApplicationForm({ id, fields, note, schedulingUrl }: Props) {
  const [redirecting, setRedirecting] = useState(false);

  return (
    <form
      className="form"
      id={id}
      name={id}
      noValidate={false}
      onSubmit={(event) => {
        event.preventDefault();
        const url = withPrefill(
          schedulingUrl,
          summarise(fields, new FormData(event.currentTarget)),
        );

        // The widget is fetched on demand now, so there is a beat before the
        // scheduler appears. openScheduler falls back to navigating to the same
        // prefilled URL, so a blocked script cannot strand an applicant.
        setRedirecting(true);
        void openScheduler(url).finally(() => setRedirecting(false));
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

      <button type="submit" className="btn btn--primary">
        Continue to pick a time
      </button>

      <div className="formFoot">
        {/* Mounted from first render and empty until submit, so the
            confirmation is announced as a change to a watched region. */}
        <p className="formStatus" role="status">
          {redirecting ? "Opening the calendar\u2026" : ""}
        </p>
        <p className="formNote">{note}</p>
      </div>
    </form>
  );
}
