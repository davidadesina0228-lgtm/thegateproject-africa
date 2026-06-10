"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flag, Building2, ExternalLink } from "lucide-react";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

const graduates = [
  {
    name: "James Ibiyemi",
    role: "AI & GEO Specialist",
    company: "Tenacious AI Marketing Global",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "April 2026",
    photo: "/alumni/james.jpg",
    quote:
      "Consistent learning and hands-on practice can quickly transform a beginner into someone capable of building valuable AI-powered systems.",
    skills: ["GEO", "AI Automation", "n8n", "Voice Agents", "Chatbots", "Blog Audit Systems"],
    story:
      "Joined as a complete beginner with zero AI experience. Within weeks was building voice agents, chatbots, and automation workflows. Secured his placement in April — before the program even finished.",
  },
  {
    name: "Oluwaninyo Alamu",
    role: "LinkedIn & GEO Specialist",
    company: "Secured Placement",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "April 2026",
    photo: "/alumni/oluwaninyo.jpg",
    quote:
      "I have gained knowledge and skills that will remain valuable for many years to come. The experience showed me that staying open to change is essential for future success.",
    skills: ["GEO", "LinkedIn Optimization", "Lead Generation", "AI Tools", "Content Strategy"],
    story:
      "Arrived with surface-level AI knowledge and no GEO awareness. Left with a placement secured before the program ended — actively building his employer's LinkedIn presence and lead pipeline from day one.",
  },
  {
    name: "Eniola Rosilu",
    role: "AI Automation Specialist",
    company: "Host Planet & WISH",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "May 2026",
    photo: "/alumni/eniola.jpg",
    quote:
      "The Gate Project has been one of the most practically impactful learning experiences of my life. It challenges you to build real things for real clients.",
    skills: ["n8n", "Claude API", "LinkedIn Automation", "Podcast Management", "AI Content Engine", "WhatsApp Chatbots"],
    story:
      "A medical student who built fully automated LinkedIn lead pipelines, podcast guest management workflows, and AI content engines — all for real UK clients — while balancing her studies in Georgia.",
  },
  {
    name: "Samuel Oluwatobi Odukoya",
    role: "AI Automation Engineer",
    company: "CH4B — Central Hub For Business, UK",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "Within 1 week of graduating",
    photo: "/alumni/samuel.jpg",
    quote:
      "What excites me most about AI is not the technology itself, but the ability to use it to solve real problems and help businesses operate more efficiently.",
    skills: ["AI Automation", "Workflow Engineering", "CRM Automation", "Airtable", "GEO", "API Integrations"],
    story:
      "A healthcare professional who made a full career pivot into AI. Built an entire coaching automation ecosystem for a UK firm — meeting intelligence, CRM sync, client tracking — within weeks of joining.",
  },
  {
    name: "Esther Abem",
    role: "AI Automation & GEO Specialist",
    company: "Better People Recruitment",
    companyUrl: "https://www.betterpeopleltd.co.uk/",
    nationality: "Nigerian",
    placedMonth: "June 2026",
    linkedIn: "https://www.linkedin.com/in/esther-abem-6316193b6",
    photo: "/alumni/esther.jpg",
    quote:
      "AI is far more than just a tool — it is a powerful resource that can drive innovation, improve productivity, and create meaningful solutions for businesses across industries.",
    skills: ["AI Automation", "GEO", "Workflow Creation", "n8n", "Lead Generation", "Content Strategy"],
    story:
      "Arrived knowing only surface-level AI tools. Left with a live placement at a UK recruitment firm. In six weeks she went from observer to practitioner — now applying automation and GEO strategies in a real business.",
  },
];

const stats = [
  { value: "5", label: "Graduates" },
  { value: "5", label: "Placements Secured" },
  { value: "3", label: "Countries" },
  { value: "6", label: "Weeks" },
];

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-background to-background" />
        <div className="container-gate relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              Cohort 1 — The Originals
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            They Went First.
            <br />
            <span className="gold-gradient">Here's What Happened.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-secondary max-w-2xl mx-auto mb-16"
          >
            Five people with no prior AI experience. Six weeks of structured training,
            mentorship, and real-world projects. Every single one placed.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="card text-center py-6">
                <p className="text-4xl font-bold gold-gradient mb-1">{stat.value}</p>
                <p className="text-secondary text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Graduate Cards */}
      <section className="section-padding">
        <div className="container-gate">
          <div className="space-y-12">
            {graduates.map((grad, index) => (
              <motion.div
                key={grad.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className={`grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-border bg-surface ${
                  index % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                {/* Photo side */}
                <div className={`relative aspect-[4/3] lg:aspect-auto min-h-[320px] ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <Image
                    src={grad.photo}
                    alt={grad.name}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <Flag className="w-4 h-4 text-gold" />
                      {grad.nationality}
                    </div>
                  </div>
                </div>

                {/* Content side */}
                <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <div className="mb-6">
                    <span className="text-gold text-sm font-medium">{grad.placedMonth}</span>
                    <h2 className="text-3xl font-bold mt-1 mb-1">{grad.name}</h2>
                    <p className="text-secondary">{grad.role}</p>
                  </div>

                  {/* Company */}
                  <div className="flex items-center gap-2 mb-6 p-3 bg-surface-elevated rounded-lg w-fit">
                    <Building2 className="w-4 h-4 text-gold flex-shrink-0" />
                    {grad.companyUrl ? (
                      <a
                        href={grad.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-1"
                      >
                        {grad.company}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{grad.company}</span>
                    )}
                  </div>

                  {/* Story */}
                  <p className="text-secondary mb-6 leading-relaxed">{grad.story}</p>

                  {/* Quote */}
                  <blockquote className="border-l-2 border-gold pl-4 mb-6">
                    <p className="text-white italic leading-relaxed">"{grad.quote}"</p>
                  </blockquote>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {grad.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* LinkedIn link if available */}
                  {"linkedIn" in grad && grad.linkedIn && (
                    <a
                      href={grad.linkedIn as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 text-sm text-secondary hover:text-gold transition-colors flex items-center gap-1 w-fit"
                    >
                      View LinkedIn Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface">
        <div className="container-gate">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-gold font-medium mb-4 block">Cohort 2 is forming now</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Your Story Starts
              <br />
              <span className="gold-gradient">At The Gate.</span>
            </h2>
            <p className="text-xl text-secondary mb-10 max-w-xl mx-auto">
              Every one of these graduates started with zero professional AI experience.
              The only thing that changed was stepping through the gate.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/apply?track=learner" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
                Apply as a Learner
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/apply?track=intern" className="btn-secondary flex items-center gap-2 text-lg px-8 py-4">
                Apply as an Intern
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="hidden">
        <div className="container-gate flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center">
              <span className="text-black font-bold">G</span>
            </div>
            <span className="font-bold text-white">The Gate Project</span>
          </Link>
          <p className="text-secondary text-sm">
            © {new Date().getFullYear()} The Gate Project. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-secondary text-sm hover:text-gold transition-colors">Privacy</Link>
            <Link href="/terms" className="text-secondary text-sm hover:text-gold transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
      <SiteFooter />
    </main>
  );
}
