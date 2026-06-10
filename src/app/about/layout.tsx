import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About The Gate Project | Africa's AI Talent Pipeline",
  description:
    "Learn how The Gate Project trains African professionals in AI automation, GEO, and n8n — then places them in Western companies. Meet founders David Adesina and Dean Whitby. Cohort 1: 83% placement rate.",
  alternates: { canonical: "https://thegateproject.africa/about" },
  openGraph: {
    title: "About The Gate Project",
    description:
      "The 6-week programme that placed 5 of 6 graduates into Western AI roles. Founders David Adesina and Dean Whitby built it from the ground up.",
    url: "https://thegateproject.africa/about",
    images: [{ url: "https://thegateproject.africa/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
