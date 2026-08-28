import type { Metadata } from "next";
import Image from "next/image";

import { ApplicationForm, type Field } from "@/components/ApplicationForm";
import { CalendlyEmbed } from "@/components/CalendlyEmbed";
import { CALENDLY_CREATOR_URL } from "@/lib/calendly";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  BENEFITS,
  CREATOR_TYPE_OPTIONS,
  EARNINGS_HEADLINE,
  FAQ,
  STEPS,
  WHO_WE_SIGN,
} from "@/lib/landing";
import { ORG } from "@/lib/site";
import { landingGraph } from "@/lib/structured-data";

import styles from "./home.module.css";

const DESCRIPTION =
  "Starvu signs solo creators and couples on OnlyFans and premium platforms. You make the content; we run promotion, chatting, scheduling and brand deals. 90-day trial, no long-term commitment. 18+.";

export const metadata: Metadata = {
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title: `${ORG.name} — Now signing solo creators and couples`,
    description: DESCRIPTION,
  },
};

const FIELDS: readonly Field[] = [
  {
    kind: "text",
    name: "name",
    label: "Name or stage name",
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
    kind: "text",
    name: "platforms",
    label: "Where you post",
    placeholder: "Links or handles",
  },
  {
    kind: "select",
    name: "creatorType",
    label: "Solo or couple",
    options: CREATOR_TYPE_OPTIONS,
  },
  {
    kind: "text",
    name: "referral",
    label: `How did you hear about ${ORG.name}?`,
    placeholder: "DM, QR code, referral, other",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={landingGraph} />
      <SiteHeader page="landing" />

      <main id="main">
        <section id="top" className={`shell ${styles.hero}`}>
          <Image
            src={ORG.logo}
            alt={ORG.name}
            width={ORG.logoWidth}
            height={ORG.logoHeight}
            className={styles.heroLogo}
            priority
          />
          <p className="kicker">
            Talent management <span className="dot">·</span> OnlyFans &amp;
            premium content <span className="dot">·</span> {ORG.region}
          </p>
          <h1 className={styles.heroTitle}>
            <span className="gradientLine">Now signing</span>
            <span className="goldLine">
              Solo creators
              <br />
              &amp; couples
            </span>
          </h1>
          <p className={`lede ${styles.heroLede}`}>
            You make the content. We run the business around it:{" "}
            <strong>promotion, chatting, scheduling, and brand deals</strong>,
            handled by a team that answers to you.
          </p>
          <div className="btnRow">
            <a href="#book" className="btn btn--primary">
              Book a call
            </a>
            <a href="#book" className="btn btn--ghost">
              Apply
            </a>
          </div>
        </section>

        <section className={styles.earnings} aria-labelledby="earnings">
          <div className={`shell ${styles.earningsInner}`}>
            <p id="earnings" className={`eyebrow ${styles.earningsEyebrow}`}>
              Monthly gross earning potential
            </p>
            <p className={styles.earningsFigure}>{EARNINGS_HEADLINE}</p>
            <div className={styles.earningsRule} />
            <p className={styles.earningsNote}>
              For talent who run the {ORG.name} system. Earnings vary.
            </p>
          </div>
        </section>

        <section
          id="what-you-get"
          className="shell section"
          aria-labelledby="what-you-get-heading"
        >
          <p id="what-you-get-heading" className="eyebrow eyebrow--spaced">
            What you get
          </p>
          <div className={`cardGrid ${styles.benefitGrid}`}>
            {BENEFITS.map((benefit) => (
              <article key={benefit.no} className="card">
                <p className="cardIndex">{benefit.no}</p>
                <h2 className="cardTitle">{benefit.title}</h2>
                <p className="cardBody">{benefit.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trial} aria-labelledby="trial">
          <div className="shell section">
            <p id="trial" className={`eyebrow ${styles.trialEyebrow}`}>
              The 90-day trial
            </p>
            <h2 className={styles.trialHeading}>
              No long-term commitment. Work with us for 90 days. If it
              isn&rsquo;t the right fit, you walk with everything you built:
              your page, your content, your audience.
            </h2>
          </div>
        </section>

        <section
          id="how-it-works"
          className="shell section"
          aria-labelledby="how-it-works-heading"
        >
          <p id="how-it-works-heading" className="eyebrow eyebrow--spaced">
            How it works
          </p>
          <ol className={styles.stepGrid}>
            {STEPS.map((step) => (
              <li key={step.no} className={styles.step}>
                <p className={styles.stepIndex}>{step.no}</p>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className="cardBody">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="band" aria-labelledby="who-we-sign">
          <div className="shell section split">
            <div>
              <p className={`eyebrow ${styles.whoEyebrow}`}>Who we sign</p>
              <h2 id="who-we-sign" className="sectionHeading">
                Solo creators and couples.
              </h2>
            </div>
            <ul className="checklist">
              {WHO_WE_SIGN.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="band" aria-labelledby="questions">
          <div className="shell section">
            <p id="questions" className={`eyebrow ${styles.faqEyebrow}`}>
              Questions
            </p>
            <div className="faq">
              {FAQ.map(({ q, a }) => (
                <details key={q}>
                  <summary>
                    <span>{q}</span>
                    <span className="faq__plus" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <p className="faq__answer">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="book" className={styles.book} aria-labelledby="book-heading">
          <div className="shell section">
            <h2 id="book-heading" className={styles.bookTitle}>
              Book your call
            </h2>
            <p className={styles.bookLede}>
              Free, private, 1:1 with a manager. Pick a time, or send the form
              and we reply within 24 hours.
            </p>
            <div className="bookGrid">
              <CalendlyEmbed
                url={CALENDLY_CREATOR_URL}
                label="Book a free 1:1 call with a manager"
              />
              <ApplicationForm
                id="creator-application"
                fields={FIELDS}
                schedulingUrl={CALENDLY_CREATOR_URL}
                note="You must be 18 or older. Nothing is published or shared without your written consent."
              />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter page="landing" />
    </>
  );
}
