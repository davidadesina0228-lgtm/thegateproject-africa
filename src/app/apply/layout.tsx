import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply | The Gate Project — Free Scholarship & Paid Mentorship",
  description:
    "Apply for The Gate Project's free AI scholarship (Cohort 2) or join the $100 paid mentorship track. Join the Telegram group, pass a short interview, and start your journey to a Western remote role.",
  alternates: { canonical: "https://thegateproject.africa/apply" },
  openGraph: {
    title: "Apply for The Gate Project",
    description:
      "Free scholarship for those who qualify. $100 paid mentorship for those who want to start now. Both paths lead to real AI skills and Western placements.",
    url: "https://thegateproject.africa/apply",
    images: [{ url: "https://thegateproject.africa/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
