import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thegateproject.africa"),
  title: {
    default: "The Gate Project | Africa's AI Talent Pipeline",
    template: "%s | The Gate Project",
  },
  description:
    "The Gate Project is a 6-week AI training and placement programme connecting African professionals with Western companies. Cohort 1: 83% placement rate — 5 of 6 graduates placed in Western companies. Apply for Cohort 2.",
  keywords: [
    "African AI talent",
    "AI training programme Africa",
    "internship pipeline Africa UK",
    "GEO training Africa",
    "n8n automation Africa",
    "African professionals Western companies",
    "AI automation course Nigeria",
    "generative engine optimization",
    "talent development Africa",
    "The Gate Project",
    "David Adesina",
    "Dean Whitby",
  ],
  authors: [{ name: "The Gate Project" }],
  creator: "The Gate Project",
  publisher: "The Gate Project",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://thegateproject.africa",
    siteName: "The Gate Project",
    title: "The Gate Project | Africa's AI Talent Pipeline",
    description:
      "6 weeks. Real AI skills. 83% placement rate — 5 of 6 graduates placed. The Gate Project trains African professionals and places them in Western companies.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Gate Project — Africa's AI Talent Pipeline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Gate Project | Africa's AI Talent Pipeline",
    description:
      "6 weeks. Real AI skills. 83% placement rate. Train here. Work anywhere.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://thegateproject.africa",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "EducationalOrganization"],
  "@id": "https://thegateproject.africa/#organization",
  name: "The Gate Project",
  url: "https://thegateproject.africa",
  description:
    "The Gate Project is a 6-week AI talent development and placement programme that connects African professionals with Western companies. Cohort 1 achieved an 83% placement rate — 5 of 6 graduates placed in paid remote roles. Founded by David Adesina and Dean Whitby.",
  foundingDate: "2025",
  founders: [
    {
      "@type": "Person",
      name: "David Adesina",
      jobTitle: "Co-Founder, AI Automation Lead",
      worksFor: { "@type": "Organization", name: "The Gate Project" },
      knowsAbout: ["AI Automation", "n8n workflow engineering", "AI talent development"],
    },
    {
      "@type": "Person",
      name: "Dean Whitby",
      jobTitle: "Co-Founder, GEO & Lead Generation Lead",
      url: "https://deanwhitby.com",
      sameAs: ["https://deanwhitby.com"],
      worksFor: { "@type": "Organization", name: "The Gate Project" },
      knowsAbout: ["Generative Engine Optimization", "Lead Generation", "Answer Engine Optimization"],
    },
  ],
  areaServed: ["Africa", "Nigeria", "United Kingdom", "United States", "Europe"],
  knowsAbout: [
    "AI Automation",
    "Generative Engine Optimization",
    "n8n workflow engineering",
    "LinkedIn Authority Marketing",
    "Answer Engine Optimization",
    "Talent Development",
    "African AI talent pipeline",
    "Remote work placement",
  ],
  sameAs: [
    "https://t.me/Thegateprojectafrica",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
