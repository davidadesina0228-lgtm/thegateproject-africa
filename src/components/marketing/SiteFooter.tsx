import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "@/app/home.module.css";
import { telegramLinkProps } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <Link href="/" className={styles.wordmark} aria-label="The Gate Project home">
          <Image src="/nav-logo.png" alt="" width={44} height={44} />
          <span>The Gate<br />Project<span className={styles.wordmarkDot}>.</span></span>
        </Link>
        <p>Built for Africa.<br />Open to the world.</p>
        <nav aria-label="Footer navigation">
          <Link href="/about">Our story</Link>
          <Link href="/alumni">Alumni</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/apply">How to apply</Link>
        </nav>
      </div>
      <div className={styles.footerBottom}>
        <span>© {new Date().getFullYear()} The Gate Project</span>
        <a {...telegramLinkProps}>Join our Telegram community <ArrowRight size={14} aria-hidden="true" /></a>
        <span>Talent is everywhere. Let’s open doors.</span>
      </div>
    </footer>
  );
}
