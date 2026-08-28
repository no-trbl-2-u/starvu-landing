import type { Metadata } from "next";

import { ApplicationForm, type Field } from "@/components/ApplicationForm";
import { BookingPanel } from "@/components/BookingPanel";
import { CALENDLY_CAREERS_URL } from "@/lib/calendly";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { AVAILABILITY_OPTIONS, JOBS, REQUIREMENTS } from "@/lib/jobs";
import { ORG } from "@/lib/site";
import { careersGraph } from "@/lib/structured-data";

import styles from "./careers.module.css";

const DESCRIPTION =
  "Starvu is hiring remote client engagement specialists for messaging and customer service. Part-time or full-time, shift work available, no prior industry experience required. Applicants must be 18 or older.";

export const metadata: Metadata = {
  title: {
    absolute: `Careers at ${ORG.name} — Remote client engagement specialist jobs`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/careers" },
  openGraph: {
    type: "website",
    url: "/careers",
    title: `Careers at ${ORG.name} — Now staffing client engagement specialists`,
    description: DESCRIPTION,
  },
};

const FIELDS: readonly Field[] = [
  {
    kind: "text",
    name: "name",
    label: "Full name",
    placeholder: "Your name",
    autoComplete: "name",
  },
  {
    kind: "email",
    name: "email",
    label: "Email",
    placeholder: "you@email.com",
    autoComplete: "email",
  },
  {
    kind: "select",
    name: "role",
    label: "Which role",
    options: [...JOBS.map((job) => job.optionLabel), "Either one"],
  },
  {
    kind: "select",
    name: "availability",
    label: "Availability",
    options: AVAILABILITY_OPTIONS,
  },
  {
    kind: "text",
    name: "coverage",
    label: "Time zone and hours you can cover",
    placeholder: "e.g. EST, evenings and weekends",
  },
  {
    kind: "text",
    name: "referral",
    label: `How did you hear about ${ORG.name}?`,
    placeholder: "DM, QR code, referral, other",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd data={careersGraph} />
      <SiteHeader page="careers" />

      <main id="main">
        <section className={`shell ${styles.hero}`}>
          <p className="kicker">
            Careers at {ORG.name} <span className="dot">·</span> Remote{" "}
            <span className="dot">·</span> Part-time &amp; full-time
          </p>
          <h1 className={styles.heroTitle}>
            <span className="gradientLine">Now staffing</span>
            <span className="goldLine">
              Client engagement
              <br />
              specialists
            </span>
          </h1>
          <p className="lede">
            Behind every creator on our roster is a team handling the
            conversations. We are hiring{" "}
            <strong>client engagement specialists</strong> to run that side of
            the business: messaging and customer service for our talent and
            their subscribers, part-time or full-time, on shifts that cover the
            clock.
          </p>
          <div className="btnRow">
            <a href="#talk" className="btn btn--primary">
              Book a call
            </a>
            <a href={`mailto:${ORG.careersEmail}`} className="btn btn--ghost">
              Email us
            </a>
          </div>
        </section>

        <section className="band" aria-labelledby="open-roles">
          <div className="shell section">
            <p id="open-roles" className="eyebrow eyebrow--spaced">
              Open roles
            </p>
            <div className={`cardGrid ${styles.roleGrid}`}>
              {JOBS.map((job, index) => (
                <article key={job.id} id={job.id} className={`card ${styles.roleCard}`}>
                  <p className="cardIndex">
                    Role {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className={styles.roleTitle}>{job.title}</h2>
                  <p className={styles.roleTrack}>{job.track}</p>
                  <p className={styles.roleBody}>{job.description}</p>
                  <p className={styles.roleTerms}>
                    {job.terms.map((term, i) => (
                      <span key={term}>
                        {i > 0 && <span className="dot"> · </span>}
                        {term}
                      </span>
                    ))}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="shell section split" aria-labelledby="what-we-ask">
          <div>
            <p className={`eyebrow ${styles.asksEyebrow}`}>What we ask for</p>
            <h2
              id="what-we-ask"
              className={`sectionHeading ${styles.asksHeading}`}
            >
              No prior industry experience required.
            </h2>
          </div>
          <ul className="checklist">
            {REQUIREMENTS.map((requirement) => (
              <li key={requirement}>{requirement}</li>
            ))}
          </ul>
        </section>

        <section id="talk" className="band" aria-labelledby="lets-talk">
          <div className="shell section">
            <h2 id="lets-talk" className={styles.talkTitle}>
              Let&rsquo;s talk
            </h2>
            <p className={styles.talkLede}>
              Book a short call to discuss the role, the hours you want, and how
              pay works. No cost and no obligation. We reply within 24 hours.
            </p>
            <div className="bookGrid">
              <BookingPanel
                url={CALENDLY_CAREERS_URL}
                label="Pick a time"
                summary="A short call about the role, the hours you want, and how pay works. No cost and no obligation."
              />
              <ApplicationForm
                id="careers-application"
                fields={FIELDS}
                schedulingUrl={CALENDLY_CAREERS_URL}
                note="You must be 18 or older. Applicants complete identity verification before hire."
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter page="careers" />
    </>
  );
}
