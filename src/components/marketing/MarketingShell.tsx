import type { ReactNode } from "react";
import { HomeNav } from "./HomeNav";
import { SiteFooter } from "./SiteFooter";
import styles from "@/app/home.module.css";

/** The public website shares one palette, navigation, and keyboard entry point. */
export function MarketingShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.home}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <HomeNav />
      <main id="main-content" tabIndex={-1}>{children}</main>
      <SiteFooter />
    </div>
  );
}
