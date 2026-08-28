import Image from "next/image";
import Link from "next/link";

import { AFFILIATION_DISCLAIMER, COPYRIGHT, ORG } from "@/lib/site";

import styles from "./SiteFooter.module.css";

/** The two disclaimers differ: one covers earnings claims, one covers hiring. */
const LEGAL = {
  landing: [
    "Applicants must be 18 years of age or older and provide valid government-issued photo identification and platform verification.",
    "Couples: both partners must apply and verify individually.",
    "Earnings figures reflect gross revenue reported by top-performing talent following the Starvu content and promotion system and are not typical, projected, or guaranteed.",
    "Individual results depend on content volume, consistency, niche, and audience.",
    AFFILIATION_DISCLAIMER,
    "Management terms, commission, and trial conditions are set out in the Talent Management Agreement provided before signing.",
    COPYRIGHT,
  ],
  careers: [
    "Applicants must be 18 years of age or older and provide valid government-issued photo identification.",
    "All roles involve working with adult content and require a signed confidentiality agreement.",
    "Role, hours, and compensation are set out in writing before hire.",
    AFFILIATION_DISCLAIMER,
    COPYRIGHT,
  ],
} as const;

export function SiteFooter({ page }: { page: "landing" | "careers" }) {
  const onLanding = page === "landing";

  return (
    <footer
      className={`${styles.footer} ${onLanding ? styles["footer--panel"] : ""}`}
    >
      <div className={`shell ${styles.inner}`}>
        <div className={styles.top}>
          <Image
            src={ORG.logo}
            alt={ORG.name}
            width={ORG.logoWidth}
            height={ORG.logoHeight}
            className={styles.logo}
          />
          <div className={styles.contact}>
            {onLanding ? (
              <>
                <a href={`mailto:${ORG.talentEmail}`}>{ORG.talentEmail}</a>
                <span>DM {ORG.social}</span>
                <span>{ORG.region}, USA</span>
              </>
            ) : (
              <>
                <a href={`mailto:${ORG.careersEmail}`}>{ORG.careersEmail}</a>
                <a href={`mailto:${ORG.talentEmail}`}>{ORG.talentEmail}</a>
                <span>DM {ORG.social}</span>
                <Link href="/">Creator signing page</Link>
              </>
            )}
          </div>
        </div>
        <p className="legal">{LEGAL[page].join(" ")}</p>
      </div>
    </footer>
  );
}
