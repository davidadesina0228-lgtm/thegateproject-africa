"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Alumni", href: "/alumni" },
  { label: "Blog", href: "/blog" },
];

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
            <Image
              src="/nav-logo.png"
              alt="The Gate Project"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="text-white font-bold text-lg tracking-tight">The Gate Project</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary hover:text-white text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/apply"
              className="bg-gold hover:bg-gold-light text-black text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-gold/20"
            >
              Apply Now
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
            className="md:hidden w-10 h-10 rounded-lg border border-border bg-surface flex items-center justify-center text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-5 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-secondary hover:text-white hover:bg-white/5 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/apply"
              onClick={closeMenu}
              className="block rounded-lg bg-gold px-4 py-3 text-center text-black font-bold hover:bg-gold-light transition-colors"
            >
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
