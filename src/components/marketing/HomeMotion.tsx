"use client";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./HomeMotion.module.css";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;
    // Render readable content first, then prepare only off-screen elements for animation.
    if (element.getBoundingClientRect().top > window.innerHeight) element.dataset.waiting = "true";
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { delete element.dataset.waiting; observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(element);
    const show = () => { if (preference.matches) delete element.dataset.waiting; };
    preference.addEventListener("change", show);
    return () => { observer.disconnect(); preference.removeEventListener("change", show); };
  }, []);
  return <div ref={ref} className={`${styles.reveal} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>{children}</div>;
}
