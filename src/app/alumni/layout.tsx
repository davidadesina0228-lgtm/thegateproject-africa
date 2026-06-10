import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cohort 1 Alumni | The Gate Project",
  description:
    "Meet the 5 Nigerian professionals placed in Western companies by The Gate Project's first cohort. Full project portfolios, placement stories, and the skills that got them hired.",
  alternates: { canonical: "https://thegateproject.africa/alumni" },
  openGraph: {
    title: "The Gate Project — Cohort 1 Alumni",
    description:
      "5 Nigerian graduates. 5 Western placements. All beginners. See exactly what each of them built and where they landed.",
    url: "https://thegateproject.africa/alumni",
    images: [{ url: "https://thegateproject.africa/og-image.jpg", width: 1200, height: 630 }],
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
