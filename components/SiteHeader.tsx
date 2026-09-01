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

/**
 * Renders a plain anchor for same-page hashes and a Link for real navigations.
 *
 * next/link intercepts hash clicks and does a soft navigation that updates the
 * URL without scrolling, so anchors handled by the router silently do nothing.
 */
function LogoLink({
  plain,
  children,
  ...props
}: {
  plain: boolean;
  href: string;
  className?: string;
  "aria-label"?: string;
  children: React.ReactNode;
}) {
  return plain ? <a {...props}>{children}</a> : <Link {...props}>{children}</Link>;
}

export function SiteHeader({ page }: Props) {
  const onLanding = page === "landing";

  return (
    <header className={styles.header}>
      <div className={`shell ${styles.inner}`}>
        <div className={styles.brand}>
          {/* On the landing page this is a same-page hash, which next/link
              would swallow without scrolling; from Careers it is a real
              navigation, so Link earns its prefetch. */}
          <LogoLink
            href={onLanding ? "#top" : "/"}
            plain={onLanding}
            className={styles.logoLink}
            aria-label={`${ORG.name} home`}
          >
            <Image
              src={ORG.lockup}
              // The link already carries the accessible name.
              alt=""
              width={ORG.lockupWidth}
              height={ORG.lockupHeight}
              className={styles.logo}
              priority
            />
          </LogoLink>
          <Link
            href="/careers"
            className={styles.careersPill}
            aria-current={onLanding ? undefined : "page"}
          >
            Careers
          </Link>
        </div>

        <nav className={styles.nav} aria-label="Primary">
          {/* Plain anchors, not next/link. Link intercepts the click and does a
              soft navigation that sets the hash without ever scrolling, so
              every one of these silently did nothing. Native fragment
              navigation scrolls, respects scroll-padding-top, and works with
              JavaScript disabled. */}
          {NAV.map(({ href, label }) => (
            <a
              key={href}
              // On the landing page these are in-page anchors; from Careers they
              // have to carry the "/" so they navigate home and then scroll.
              href={onLanding ? href.replace(/^\//, "") : href}
              className={styles.navLink}
            >
              {label}
            </a>
          ))}
          <a href={onLanding ? "#book" : "#talk"} className={styles.apply}>
            Apply
          </a>
        </nav>
      </div>
    </header>
  );
}
