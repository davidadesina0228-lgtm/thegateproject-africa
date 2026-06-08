"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Globe, Shield, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.12 } },
};

const stats = [
  { number: "100%", label: "Placement Rate", sub: "Cohort 1" },
  { number: "5/5", label: "Graduates Placed", sub: "in real paid roles" },
  { number: "6", label: "Weeks", sub: "to career transformation" },
  { number: "3", label: "Countries", sub: "Nigeria · Georgia · UK" },
];

const steps = [
  {
    step: "01",
    title: "Apply",
    desc: "Choose your track — Learner Path (beginners) or Intern Path (experienced professionals). No gatekeepers.",
  },
  {
    step: "02",
    title: "Train",
    desc: "6 weeks of intensive, hands-on training in AI Automation, GEO, LinkedIn Authority, and n8n workflow engineering.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Create a portfolio of real deliverables that Western companies can see, test, and evaluate directly.",
  },
  {
    step: "04",
    title: "Get Placed",
    desc: "We match you with vetted Western companies ready to hire African talent. This is where the gate opens.",
  },
];

const skills = [
  { icon: Zap, title: "AI Automation", desc: "n8n, Claude API, workflow engineering, chatbots, voice agents" },
  { icon: Globe, title: "GEO & AEO", desc: "Generative Engine Optimization and Answer Engine Optimization for AI-first search" },
  { icon: Shield, title: "LinkedIn Authority", desc: "Lead generation, profile optimization, outreach systems that convert" },
  { icon: Award, title: "Real Deliverables", desc: "You graduate with a working portfolio — not a certificate, but proof" },
];

const featuredAlumni = [
  {
    name: "Samuel Oluwatobi Odukoya",
    role: "AI Automation Engineer",
    placement: "CH4B UK",
    result: "Hired within 1 week of graduating",
    photo: "/alumni/samuel.jpg",
    country: "Nigeria → United Kingdom",
    quote: "The Gate Project gave me the exact skills UK companies were searching for.",
  },
  {
    name: "Esther Abem",
    role: "AI Automation & GEO Specialist",
    placement: "Better People Recruitment",
    result: "Placed June 2026",
    photo: "/alumni/esther.jpg",
    country: "Nigeria → UK market",
    quote: "I went from knowing nothing about AI to running automation systems for a UK recruitment firm.",
  },
  {
    name: "James Ibiyemi",
    role: "AI & GEO Specialist",
    placement: "Tenacious AI Marketing Global",
    result: "Placed April 2026",
    photo: "/alumni/james.jpg",
    country: "Nigeria → Global",
    quote: "Consistent learning and hands-on practice can quickly transform a beginner into a specialist.",
  },
];

const founders = [
  {
    name: "David Adesina",
    photo: "/founders/david.jpg",
    role: "Co-Founder · AI Automation Lead",
    bio: "David trains learners in AI automation, n8n workflow engineering, and practical AI tooling. He has placed multiple African professionals into Western roles and understands, at a technical level, exactly what companies need.",
    focus: ["AI Automation", "n8n & Workflow Engineering", "Talent Pipeline"],
  },
  {
    name: "Dean Whitby",
    photo: "/founders/dean.jpg",
    role: "Co-Founder · GEO & Lead Generation Lead",
    bio: "Dean brings deep expertise in Generative Engine Optimization, lead generation strategy, and content that ranks in AI-powered search. He ensures every Gate Project graduate can operate in the emerging AI-first marketing landscape.",
    focus: ["GEO & AEO Strategy", "Lead Generation", "Blog & Content Systems"],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-gold to-gold-dark rounded-lg flex items-center justify-center shadow-lg shadow-gold/20">
                <span className="text-black font-black text-lg">G</span>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">The Gate Project</span>
            </Link>
            <div className="hidden md:flex items-center gap-10">
              <Link href="/about" className="text-secondary hover:text-white text-sm font-medium transition-colors">About</Link>
              <Link href="/alumni" className="text-secondary hover:text-white text-sm font-medium transition-colors">Alumni</Link>
              <Link href="/blog" className="text-secondary hover:text-white text-sm font-medium transition-colors">Blog</Link>
              <Link
                href="/apply"
                className="bg-gold hover:bg-gold-light text-black text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-lg shadow-gold/20"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(212,175,55,0.08),transparent)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-gold/[0.06] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] border border-gold/[0.09] rounded-full pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-gold/[0.14] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/25 rounded-full text-gold text-xs font-semibold tracking-widest uppercase mb-10">
                <span className="w-1.5 h-1.5 bg-gold rounded-full animate-pulse" />
                Cohort 2 Applications Open
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black leading-[1.05] tracking-tight mb-8"
            >
              Train Here.
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Work Anywhere.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl md:text-2xl text-secondary max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              The Gate Project is the world&apos;s most focused AI talent pipeline — a 6-week
              program that has placed{" "}
              <span className="text-white font-semibold">100% of its graduates</span>{" "}
              into real, paid roles at Western companies.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
            >
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
              >
                Apply for Cohort 2
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/alumni"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white border border-white/15 font-medium text-base px-8 py-4 rounded-xl transition-all"
              >
                See the Results
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden border border-border"
            >
              {stats.map((s) => (
                <div key={s.label} className="bg-background px-6 py-8 text-center">
                  <div className="text-3xl md:text-4xl font-black text-gold mb-1">{s.number}</div>
                  <div className="text-white font-semibold text-sm mb-0.5">{s.label}</div>
                  <div className="text-secondary text-xs">{s.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── What Is The Gate Project ── */}
      <section className="py-32 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
                What We Do
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                We Don&apos;t Just Train.
                <br />
                We{" "}
                <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  Place.
                </span>
              </h2>
              <p className="text-secondary text-lg leading-relaxed mb-6">
                The Gate Project was founded on one belief: African professionals are
                world-class talent. They just need the right skills, the right structure,
                and the right door. We build the door.
              </p>
              <p className="text-secondary text-lg leading-relaxed mb-10">
                Our 6-week program teaches the exact tools Western companies are hiring for
                right now — AI automation, GEO, n8n workflows, and LinkedIn lead generation.
                Then we introduce our graduates to those companies directly.
              </p>
              <div className="flex flex-col gap-3">
                {[
                  "Skills taught by practitioners, not academics",
                  "Portfolio of real deliverables — not just a certificate",
                  "Direct introductions to Western companies",
                  "Cohort 1: 100% placement rate",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-gold flex-shrink-0" />
                    <span className="text-white text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="bg-surface border border-border rounded-2xl p-6 hover:border-gold/30 transition-colors group"
                >
                  <div className="w-10 h-10 bg-gold/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <skill.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="text-white font-bold text-sm mb-2">{skill.title}</h3>
                  <p className="text-secondary text-xs leading-relaxed">{skill.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-32 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Four Steps.
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                One Transformation.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative"
              >
                <div className="bg-background border border-border rounded-2xl p-8 h-full hover:border-gold/30 transition-colors">
                  <div className="text-5xl font-black text-gold/20 mb-6 leading-none">{step.step}</div>
                  <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                  <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gold/30 z-10" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Alumni Results ── */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
          >
            <div>
              <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
                Cohort 1 Results
              </span>
              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                They Went First.
                <br />
                <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                  Here&apos;s What Happened.
                </span>
              </h2>
            </div>
            <Link
              href="/alumni"
              className="inline-flex items-center gap-2 text-gold hover:text-gold-light font-semibold text-sm transition-colors shrink-0"
            >
              See all 5 graduates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredAlumni.map((alum, i) => (
              <motion.div
                key={alum.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/30 transition-all group"
              >
                <div className="relative h-56 bg-background overflow-hidden">
                  <Image
                    src={alum.photo}
                    alt={alum.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-block bg-gold/90 text-black text-xs font-bold px-3 py-1 rounded-full">
                      {alum.result}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-secondary text-xs mb-3 font-medium">{alum.country}</p>
                  <h3 className="text-white font-bold text-lg mb-1">{alum.name}</h3>
                  <p className="text-gold text-sm font-medium mb-1">{alum.role}</p>
                  <p className="text-secondary text-xs mb-5">Placed at {alum.placement}</p>
                  <blockquote className="text-secondary text-sm italic leading-relaxed border-l-2 border-gold/40 pl-4">
                    &ldquo;{alum.quote}&rdquo;
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Two Paths ── */}
      <section className="py-32 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              Who It&apos;s For
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Two Paths.
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                One Destination.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                badge: "Learner Path",
                badgeColor: "bg-blue-500/10 text-blue-400 border border-blue-400/20",
                title: "Starting Out?",
                desc: "No experience required. The Learner Path is a 6-week intensive program that takes you from zero to a working AI portfolio. We teach you what the market actually needs.",
                bullets: [
                  "No prior AI experience needed",
                  "6 weeks, structured curriculum",
                  "Weekly mentorship sessions",
                  "Build a real portfolio",
                  "Internship placement support",
                ],
                cta: "Apply as a Learner",
                href: "/apply?track=learner",
              },
              {
                badge: "Intern Path",
                badgeColor: "bg-gold/10 text-gold border border-gold/25",
                title: "Already Skilled?",
                desc: "Bring your existing skills. The Intern Path is for experienced professionals ready for Western opportunities. We vet your profile, sharpen your edges, and introduce you directly.",
                bullets: [
                  "For professionals with existing skills",
                  "Profile vetting & polishing",
                  "Interview preparation",
                  "Direct company matching",
                  "Mentorship while you wait",
                ],
                cta: "Apply as an Intern",
                href: "/apply?track=intern",
              },
            ].map((path, i) => (
              <motion.div
                key={path.badge}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="bg-background border border-border rounded-2xl p-8 hover:border-gold/30 transition-colors"
              >
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-6 ${path.badgeColor}`}>
                  {path.badge}
                </span>
                <h3 className="text-white font-black text-2xl mb-4">{path.title}</h3>
                <p className="text-secondary text-sm leading-relaxed mb-8">{path.desc}</p>
                <ul className="space-y-3 mb-8">
                  {path.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-secondary text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href={path.href}
                  className="flex items-center justify-center gap-2 w-full bg-gold hover:bg-gold-light text-black font-bold text-sm py-3.5 rounded-xl transition-colors"
                >
                  {path.cta}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders ── */}
      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              The Founders
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Built by Practitioners.
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Not Academics.
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="bg-surface border border-border rounded-2xl p-8 hover:border-gold/30 transition-colors"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden mb-6 border-2 border-gold/30 shadow-xl shadow-gold/10 bg-background">
                  <Image
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <h3 className="text-white font-black text-xl mb-1">{founder.name}</h3>
                <p className="text-gold text-xs font-semibold tracking-wide mb-5">{founder.role}</p>
                <p className="text-secondary text-sm leading-relaxed mb-6">{founder.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {founder.focus.map((f) => (
                    <span
                      key={f}
                      className="text-xs font-medium text-secondary bg-background border border-border px-3 py-1 rounded-full"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-32 px-6 lg:px-8 bg-surface border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(212,175,55,0.07),transparent)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-6 block">
              The Gate Is Open
            </span>
            <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
              Your Cohort 2
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Spot Is Waiting.
              </span>
            </h2>
            <p className="text-xl text-secondary mb-12 max-w-xl mx-auto leading-relaxed">
              Cohort 1 proved it works. Now it&apos;s your turn. Applications for Cohort 2
              are open — and spots are limited.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/apply"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold text-lg px-10 py-5 rounded-xl transition-all shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-white border border-white/15 font-medium text-lg px-10 py-5 rounded-xl hover:bg-white/5 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
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
                {[
                  ["Learner Path", "/apply?track=learner"],
                  ["Intern Path", "/apply?track=intern"],
                  ["Alumni", "/alumni"],
                  ["Blog", "/blog"],
                ].map(([label, href]) => (
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
                {[
                  ["About", "/about"],
                  ["The Founders", "/about#founders"],
                  ["Contact", "/contact"],
                  ["Privacy Policy", "/privacy"],
                ].map(([label, href]) => (
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
              © {new Date().getFullYear()} The Gate Project. All rights reserved.
            </p>
            <p className="text-secondary/60 text-xs">
              Built for Africa. Trusted by the World.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
