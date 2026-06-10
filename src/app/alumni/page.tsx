"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flag, Building2, ExternalLink, Wrench } from "lucide-react";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

const graduates = [
  {
    name: "Samuel Oluwatobi Odukoya",
    role: "AI Automation Engineer",
    company: "CH4B — Central Hub For Business, UK",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "Within 1 week of graduating",
    photo: "/alumni/samuel.jpg",
    background: "Healthcare professional. No prior AI experience before The Gate Project.",
    quote:
      "What excites me most about AI is not the technology itself, but the ability to use it to solve real problems, eliminate repetitive work, and help businesses operate more efficiently.",
    story:
      "Coming from healthcare, Samuel had never built an automation before joining. Within one week of graduating he was hired by CH4B, a UK business coaching firm, where he now designs and implements the entire AI operations layer — from coaching session intelligence to CRM sync and client tracking.",
    trainingProjects: [
      "Trip Inquiry Automation System (n8n + Google Sheets + Gmail)",
      "Real Estate Lead Classification & Routing Workflow",
      "AI-Powered Telegram Assistant",
      "Telegram Content Generation Automation",
      "AI Maintenance Request Management System",
    ],
    placementProjects: [
      "AI Business Coaching Automation Platform — processes coaching sessions end-to-end: recordings → transcripts → insights → action plans → CRM updates",
      "AI Meeting Intelligence System — transforms coaching calls into structured business intelligence (challenges, risks, priorities, accountability actions)",
      "CRM-to-Airtable Synchronisation Platform — client records, membership tracking, progress monitoring",
      "AI-Powered Client Success Tracking System — milestones, blueprint stages, performance scorecards",
      "Automated Session Management — captures transcripts, action items, summaries, and coaching notes automatically",
      "AI-Powered CRM Note Generation — converts coaching conversations into structured CRM documentation",
    ],
    skills: ["AI Automation", "Workflow Engineering", "CRM Automation", "Airtable", "GEO", "API Integrations", "Business Intelligence Workflows"],
  },
  {
    name: "Eniola Rosilu",
    role: "AI Automation Specialist",
    company: "Host Planet & WISH",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "May 2026",
    photo: "/alumni/eniola.jpg",
    background: "Medical student at Caucasus University, Tbilisi, Georgia. Surface-level AI knowledge before the programme.",
    quote:
      "The Gate Project has been one of the most practically impactful learning experiences of my life. It challenges you to build real things for real clients.",
    story:
      "A medical student who built production-grade AI automation systems for real UK clients while simultaneously studying medicine in Georgia. She secured her placement in May 2026 and immediately began deploying live systems for Host Planet.",
    trainingProjects: [
      "n8n workflow automation — multi-step pipelines connecting APIs, databases, and communication tools",
      "Claude API integration for lead qualification and content generation",
      "WhatsApp chatbot development with structured system prompts",
      "LinkedIn content strategies for personal and brand growth",
    ],
    placementProjects: [
      "LinkedIn Lead Qualification & Outreach Pipeline (Host Planet) — Phantombuster scraping → Airtable logging → Claude API lead scoring → personalised Gmail outreach → real-time status updates",
      "Podcast Guest Management Workflow (Host Planet) — pulls guest profiles, drafts personalised outreach via Claude API, logs all communication in Airtable, automates follow-up sequences",
      "AI Content Engine (Host Planet) — takes raw inputs (episode topics, guest names, STR themes) and auto-generates LinkedIn posts, email newsletters, and summaries in brand voice",
    ],
    skills: ["n8n", "Claude API", "LinkedIn Automation", "Podcast Management", "AI Content Engine", "WhatsApp Chatbots", "Airtable"],
  },
  {
    name: "James Ibiyemi",
    role: "AI & GEO Specialist",
    company: "Tenacious AI Marketing Global",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "April 2026",
    photo: "/alumni/james.jpg",
    background: "Complete beginner. No prior AI, automation, or GEO experience before the programme.",
    quote:
      "Consistent learning and hands-on practice can quickly transform a beginner into someone capable of building valuable AI-powered systems.",
    story:
      "James joined with zero technical background and secured his placement at Tenacious AI Marketing Global in April — before the programme had even finished. He went from complete beginner to AI & GEO Specialist in weeks.",
    trainingProjects: [
      "Blog Audit Automation System — automated content analysis and SEO/GEO audit pipeline",
      "Voice Agent — conversational AI agent built for client intake and query handling",
      "Chatbot — structured AI chatbot with system prompts and response logic",
      "Prompt Question Audit System — quality control automation for AI prompt libraries",
      "AI Agents & Workflow Automations — end-to-end business process automations",
    ],
    placementProjects: [
      "Applying GEO strategies for client visibility in AI-powered search results",
      "AI automation workflows for marketing operations at Tenacious AI",
      "Lead generation systems and content pipeline automation",
    ],
    skills: ["GEO", "AI Automation", "n8n", "Voice Agents", "Chatbots", "Blog Audit Systems", "Lead Generation"],
  },
  {
    name: "Oluwaninyo Alamu",
    role: "LinkedIn & GEO Specialist",
    company: "Secured Placement",
    companyUrl: null,
    nationality: "Nigerian",
    placedMonth: "April 2026",
    photo: "/alumni/oluwaninyo.jpg",
    background: "Basic AI user — familiar with ChatGPT as a search tool. No GEO knowledge before the programme.",
    quote:
      "I have gained knowledge and skills that will remain valuable for many years to come. The experience showed me that staying open to change is essential for future success.",
    story:
      "Oluwaninyo arrived with surface-level AI familiarity and no GEO awareness whatsoever. He secured his placement before the programme ended. He is currently building his employer's LinkedIn presence, improving profile positioning, and developing targeted lead generation systems.",
    trainingProjects: [
      "LinkedIn profile optimisation — restructuring for discoverability and authority",
      "GEO strategy development — structuring content for AI-powered search visibility",
      "Lead generation systems within specific target niches",
      "AI tool application for content creation and workflow improvement",
    ],
    placementProjects: [
      "LinkedIn presence optimisation — profile effectiveness, visibility, and professional positioning for employer",
      "Niche lead generation — identifying and generating qualified leads within target markets",
      "Transitioning into full AI automation implementation phase",
    ],
    skills: ["GEO", "LinkedIn Optimization", "Lead Generation", "AI Tools", "Content Strategy"],
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
    background: "Used ChatGPT and Gemini for basic tasks. No automation, n8n, or GEO experience before the programme.",
    quote:
      "AI is far more than just a tool — it is a powerful resource that can drive innovation, improve productivity, and create meaningful solutions for businesses across industries.",
    story:
      "Esther joined the programme knowing only ChatGPT and Gemini for basic productivity. Over six weeks — learning AI automation and n8n from David, and GEO, lead generation and blog strategy from Dean — she built real skills through hands-on client work. She secured her placement with Better People Recruitment, a UK firm, and describes the experience as opening doors she never imagined possible.",
    trainingProjects: [
      "AI automation workflows using n8n — multi-step business process automations",
      "GEO strategy — positioning brands for visibility in AI-driven search environments",
      "Lead generation systems — outreach and qualification workflows",
      "Blog writing and content strategy optimised for AI-first discoverability",
      "Hands-on work with real clients and businesses during training",
    ],
    placementProjects: [
      "AI automation systems for Better People Recruitment operations",
      "GEO strategy implementation — improving digital visibility in AI-generated search",
      "Workflow creation for recruitment process efficiency",
      "Lead generation and content positioning for the UK market",
    ],
    skills: ["AI Automation", "GEO", "Workflow Creation", "n8n", "Lead Generation", "Content Strategy"],
  },
];

const stats = [
  { value: "5", label: "Graduates" },
  { value: "5", label: "Placements Secured" },
  { value: "3", label: "Countries Placed" },
  { value: "6", label: "Weeks Training" },
];

export default function AlumniPage() {
  return (
    <main className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 overflow-hidden px-6 lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-background to-background" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium mb-6">
              Cohort 1 — The Originals
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            They Went First.
            <br />
            <span className="gold-gradient">Here&apos;s What Happened.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-secondary max-w-2xl mx-auto mb-16"
          >
            Six people enrolled. Five graduated and were placed. All Nigerian. All beginners.
            Here is exactly what each of them built and where they landed.
          </motion.p>

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
      <section className="section-padding px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {graduates.map((grad, index) => (
              <motion.div
                key={grad.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="rounded-2xl overflow-hidden border border-border bg-surface"
              >
                {/* Top: photo + headline */}
                <div className={`grid lg:grid-cols-2 gap-0 ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
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

                  <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                    <div className="mb-4">
                      <span className="text-gold text-sm font-medium">{grad.placedMonth}</span>
                      <h2 className="text-3xl font-bold mt-1 mb-1">{grad.name}</h2>
                      <p className="text-secondary mb-1">{grad.role}</p>
                      <p className="text-secondary/60 text-sm italic">{grad.background}</p>
                    </div>

                    <div className="flex items-center gap-2 mb-5 p-3 bg-surface-elevated rounded-lg w-fit">
                      <Building2 className="w-4 h-4 text-gold flex-shrink-0" />
                      {grad.companyUrl ? (
                        <a href={grad.companyUrl} target="_blank" rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-1">
                          {grad.company}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-sm font-medium">{grad.company}</span>
                      )}
                    </div>

                    <p className="text-secondary mb-5 leading-relaxed">{grad.story}</p>

                    <blockquote className="border-l-2 border-gold pl-4 mb-5">
                      <p className="text-white italic leading-relaxed">&ldquo;{grad.quote}&rdquo;</p>
                    </blockquote>

                    <div className="flex flex-wrap gap-2">
                      {grad.skills.map((skill) => (
                        <span key={skill}
                          className="px-3 py-1 bg-gold/10 border border-gold/20 rounded-full text-gold text-xs font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>

                    {"linkedIn" in grad && grad.linkedIn && (
                      <a href={grad.linkedIn as string} target="_blank" rel="noopener noreferrer"
                        className="mt-5 text-sm text-secondary hover:text-gold transition-colors flex items-center gap-1 w-fit">
                        View LinkedIn Profile
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom: what they built */}
                <div className="border-t border-border grid md:grid-cols-2 gap-0">
                  <div className="p-8 lg:p-10 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 mb-5">
                      <Wrench className="w-4 h-4 text-gold" />
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider">Built During Training</h3>
                    </div>
                    <ul className="space-y-2">
                      {grad.trainingProjects.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-secondary text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold/50 mt-1.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-2 mb-5">
                      <Building2 className="w-4 h-4 text-gold" />
                      <h3 className="text-white font-bold text-sm uppercase tracking-wider">Built at Placement</h3>
                    </div>
                    <ul className="space-y-2">
                      {grad.placementProjects.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-secondary text-sm leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5 flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-surface px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
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

      <SiteFooter />
    </main>
  );
}
