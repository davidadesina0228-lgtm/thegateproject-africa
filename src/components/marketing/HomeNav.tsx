"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import styles from "@/app/home.module.css";
import { telegramLinkProps } from "@/lib/site";

const links = [{ label: "The programme", href: "/#programme" }, { label: "Our story", href: "/about" }, { label: "Alumni", href: "/alumni" }, { label: "Journal", href: "/blog" }, { label: "How to apply", href: "/apply" }];
export function HomeNav() {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const closeOutside = (event: PointerEvent) => { if (!header.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => { document.removeEventListener("keydown", closeOnEscape); document.removeEventListener("pointerdown", closeOutside); };
  }, [open]);
  return (
    <>
    <a {...telegramLinkProps} className={styles.announce} aria-label="Cohort 4 begins January 2027. Applications are open. Join on Telegram (opens Telegram)">
      <span className={styles.announceDot} aria-hidden="true" />
      <span>Cohort 4 begins January 2027</span>
      <span className={styles.announceSep} aria-hidden="true">·</span>
      <span className={styles.announceMore}>Applications are open. Join on Telegram</span>
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
    <header ref={header} className={styles.header}>
      <Link href="/" className={styles.wordmark} aria-label="The Gate Project home"><Image src="/nav-logo.png" alt="" width={40} height={40} /><span>The Gate<br />Project<span className={styles.wordmarkDot}>.</span></span></Link>
      <nav className={styles.desktopNav} aria-label="Main navigation">{links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
      <div className={styles.navActions}><a {...telegramLinkProps} className={styles.navApply} aria-label="Join on Telegram (opens Telegram)"><span><span className={styles.navApplyLong}>Join on </span>Telegram</span><ArrowUpRight size={16} aria-hidden="true" /></a></div>
      <button ref={toggle} type="button" className={styles.menuToggle} aria-expanded={open} aria-controls="home-mobile-menu" aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(value => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      {open && <nav id="home-mobile-menu" className={styles.mobileNav} aria-label="Mobile navigation">{links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}<a {...telegramLinkProps} onClick={() => setOpen(false)}>Join on Telegram <ArrowUpRight size={16} aria-hidden="true" /></a></nav>}
    </header>
    </>
  );
}
