import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apply — Free AI Scholarship",
  description:
    "Apply for The Gate Project's free AI scholarship. Cohort 4 starts in January. Join the Telegram group, pass a short interview, and start your journey to a Western remote role.",
  alternates: { canonical: "https://thegateproject.africa/apply" },
  openGraph: {
    title: "Apply for The Gate Project",
    description:
      "A free, six-week AI scholarship for African professionals. Two paths, real AI skills and placement support.",
    url: "https://thegateproject.africa/apply",
    images: [{ url: "https://thegateproject.africa/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
