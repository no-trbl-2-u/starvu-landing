import Image from "next/image";
import Link from "next/link";

import { NAV, ORG } from "@/lib/site";

import styles from "./SiteHeader.module.css";

type Props = {
  /**
   * Which page is rendering. Landing keeps its section links as same-page
   * anchors so they scroll rather than navigate; Careers marks its own pill as
   * the current page and points Apply at its local form.
   */
  page: "landing" | "careers";
};

export function SiteHeader({ page }: Props) {
  const onLanding = page === "landing";

  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.brand}>
          <Link
            href={onLanding ? "/#top" : "/"}
            className={styles.logoLink}
            aria-label={`${ORG.name} home`}
          >
            <Image
              src={ORG.logo}
              // The link already carries the accessible name.
              alt=""
              width={ORG.logoWidth}
              height={ORG.logoHeight}
              className={styles.logo}
              priority
            />
          </Link>
          <Link
            href="/careers"
            className={styles.careersPill}
            aria-current={onLanding ? undefined : "page"}
          >
            Careers
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              // On the landing page these are in-page anchors; from Careers they
              // have to carry the "/" so they navigate home and then scroll.
              href={onLanding ? href.replace(/^\//, "") : href}
              className={styles.navLink}
            >
              {label}
            </Link>
          ))}
          <Link href={onLanding ? "#book" : "#talk"} className={styles.apply}>
            Apply
          </Link>
        </nav>
      </div>
    </header>
  );
}
