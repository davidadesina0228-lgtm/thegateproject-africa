"use client";

import Link from "next/link";

const programmeLinks = [
  ["Learner Path", "/apply?track=learner"],
  ["Intern Path", "/apply?track=intern"],
  ["Alumni", "/alumni"],
  ["Blog", "/blog"],
];

const companyLinks = [
  ["About", "/about"],
  ["The Founders", "/about#founders"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/privacy"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-20 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
                <span className="text-black font-black text-lg">G</span>
              </div>
              <span className="text-white font-bold text-lg">The Gate Project</span>
            </Link>
            <p className="text-secondary text-sm leading-relaxed max-w-xs mb-6">
              Africa&apos;s premier AI talent pipeline. 6 weeks. Real skills.
              Real placements. No gatekeepers.
            </p>
            <p className="text-secondary/60 text-xs">thegateproject.africa</p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-5">Programme</h4>
            <ul className="space-y-3">
              {programmeLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-secondary hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-5">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-secondary hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary/60 text-xs">
            &copy; {new Date().getFullYear()} The Gate Project. All rights reserved.
          </p>
          <p className="text-secondary/60 text-xs">
            Built for Africa. Trusted by the World.
          </p>
        </div>
      </div>
    </footer>
  );
}
