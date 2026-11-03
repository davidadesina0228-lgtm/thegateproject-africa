import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni | The Gate Project",
  description:
    "Meet some of The Gate Project's graduates from Nigeria and Cape Verde. 15+ placements since May, with Cohort 4 starting in January. See what they built and the skills that got them placed.",
  alternates: { canonical: "https://thegateproject.africa/alumni" },
  openGraph: {
    title: "The Gate Project — Alumni",
    description:
      "15+ placements since May. Meet some of our graduates and see exactly what each of them built. Cohort 4 begins in January.",
    url: "https://thegateproject.africa/alumni",
    images: [{ url: "https://thegateproject.africa/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
