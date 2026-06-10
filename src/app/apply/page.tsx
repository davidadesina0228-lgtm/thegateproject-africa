"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Loader2,
  MessageCircle,
  Send,
  Star,
  Zap,
} from "lucide-react";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

const TELEGRAM_LINK = "https://t.me/Thegateprojectafrica";

type MentorshipEnquiry = {
  fullName: string;
  email: string;
  message: string;
};

const initialMentorshipForm: MentorshipEnquiry = {
  fullName: "",
  email: "",
  message: "",
};

const scholarshipPaths = [
  {
    title: "Learner Path",
    subtitle: "For talented beginners ready to build a serious AI portfolio.",
    icon: GraduationCap,
    bullets: [
      "No prior AI experience required",
      "6-week structured training programme",
      "Hands-on AI automation, GEO, and n8n projects",
      "Weekly mentorship and portfolio reviews",
      "Placement support after proof of skill",
      "Unpaid internship opportunity to add to your CV",
    ],
  },
  {
    title: "Intern Path",
    subtitle: "For experienced professionals ready for Western opportunities.",
    icon: Briefcase,
    bullets: [
      "For candidates with existing digital or technical skills",
      "Profile vetting, positioning, and interview preparation",
      "Sharpened LinkedIn authority and lead generation systems",
      "Direct matching with vetted Western companies",
      "Mentorship while placement conversations progress",
    ],
  },
];

const steps = [
  {
    number: "01",
    title: "Join the Telegram Group",
    desc: 'Click the button below to join our group. Type "Intern" if you are applying for the free scholarship, or "Training" if you want to skip the cohort and go straight into the paid mentorship track. We will reach out to you.',
  },
  {
    number: "02",
    title: "Short Interview",
    desc: "We will invite you for a brief conversation to understand your background and what you are aiming for.",
  },
  {
    number: "03",
    title: "Get Added to Cohort 2",
    desc: "Pass the interview and you are in. You will be added to the Cohort 2 training group and given your start date.",
  },
];

const paidFeatures = [
  { icon: Zap, text: "Start this week — no cohort waitlist, no application queue" },
  { icon: Star, text: "Personal mentorship directly from David Adesina and Dean Whitby" },
  { icon: CheckCircle, text: "The exact AI automation, GEO, and n8n skills Cohort 1 graduates are being hired for" },
  { icon: CheckCircle, text: "Taught by the founders — these are the same skills they use to earn" },
  { icon: CheckCircle, text: "Placement is our goal for every mentee — no guarantee, but it is the mission" },
  { icon: CheckCircle, text: "Unpaid internship opportunity to add real-world experience to your CV" },
];

export default function ApplyPage() {
  const [mentorshipForm, setMentorshipForm] = useState<MentorshipEnquiry>(initialMentorshipForm);
  const [mentorshipStatus, setMentorshipStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const updateMentorshipField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMentorshipForm((current) => ({ ...current, [name]: value }));
  };

  const submitMentorshipEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMentorshipStatus("loading");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...mentorshipForm, track: "paid-mentorship" }),
      });
      if (!response.ok) throw new Error("Enquiry request failed");
      setMentorshipStatus("success");
      setMentorshipForm(initialMentorshipForm);
    } catch (error) {
      console.error("Mentorship enquiry failed:", error);
      setMentorshipStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-40 pb-24 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_0%,rgba(212,175,55,0.1),transparent_62%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/25 rounded-full text-gold text-xs font-semibold tracking-widest uppercase mb-8">
              Free Scholarship — Cohort 2
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
              Apply for Free.
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Get Placed for Real.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed mb-10">
              The Gate Project is a fully-funded 6-week AI training programme for African professionals.
              If you are selected, your training is <span className="text-white font-semibold">completely free</span> —
              and we work to place you in a Western company when you graduate.
            </p>
            <a
              href="#scholarship"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold text-lg px-10 py-5 rounded-xl transition-all shadow-xl shadow-gold/25 hover:-translate-y-0.5"
            >
              Apply for the Free Scholarship
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-secondary/50 text-sm mt-5">
              Didn&apos;t qualify or can&apos;t wait?{" "}
              <a href="#paid-mentorship" className="underline underline-offset-4 hover:text-secondary transition-colors">
                There is a $100 mentorship option.
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Free Scholarship Tracks */}
      <section id="scholarship" className="pb-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gold/50" />
              <span className="text-gold text-xs font-bold tracking-widest uppercase">
                Free Scholarship Programme
              </span>
            </div>
            <h2 className="text-3xl font-black text-white">Apply for Cohort 2</h2>
            <p className="text-secondary mt-2 text-sm">
              Competitive selection. Free training. Real placement support.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            {scholarshipPaths.map((path, index) => (
              <motion.div
                key={path.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-left bg-surface border border-border rounded-2xl p-8"
              >
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <path.icon className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-2xl font-black text-white">{path.title}</h2>
                      <span className="text-xs font-bold text-gold bg-gold/10 border border-gold/20 px-2 py-0.5 rounded-full">
                        FREE
                      </span>
                    </div>
                    <p className="text-secondary leading-relaxed">{path.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {path.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 text-secondary text-sm">
                      <CheckCircle className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply — Telegram CTA */}
      <section className="py-20 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              How to Apply
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5">
              Three Steps. No Fees.
            </h2>
            <p className="text-secondary text-lg leading-relaxed max-w-xl mx-auto">
              Join the Telegram group, introduce yourself, pass a short interview.
              If you are selected, your training is free and we work to place you when you graduate.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-6 mb-14"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-background border border-border rounded-2xl p-6 text-center"
              >
                <div className="text-4xl font-black text-gold/20 mb-4">{step.number}</div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Telegram CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gold hover:bg-gold-light text-black font-bold text-lg px-10 py-5 rounded-xl transition-all shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5"
            >
              <MessageCircle className="w-6 h-6" />
              Join the Cohort 2 Telegram Group
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-secondary/60 text-sm mt-4">
              Free to join. Interview required. Limited spots available.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Paid Mentorship Track */}
      <section id="paid-mentorship" className="py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-px bg-gold/50" />
              <span className="text-gold text-xs font-bold tracking-widest uppercase">
                Paid Mentorship Track
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Didn&apos;t Qualify — or Can&apos;t Wait?
            </h2>
            <p className="text-secondary text-lg max-w-2xl leading-relaxed">
              The scholarship is selective and runs on a cohort schedule. If you did not make the
              cut or want to start immediately, there is a $100 mentorship option. Same skills,
              same goal — just a different entry point.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Info card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-surface border border-gold/30 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-72 h-72 bg-gold/5 rounded-full -translate-y-36 translate-x-36 pointer-events-none" />

                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
                    <Star className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">Personal Mentorship</h3>
                    <p className="text-gold text-sm font-bold">$100 · 6 Weeks · Limited Spots</p>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {paidFeatures.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-secondary text-sm">
                      <Icon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-border pt-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-black text-white">$100</span>
                    <span className="text-secondary text-sm">for the full 6-week programme</span>
                  </div>
                  <p className="text-secondary/60 text-xs">
                    Classes begin once we reach 20 confirmed participants. Payment confirmed at that point.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Enquiry form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-surface border border-border rounded-2xl p-8">
                <h3 className="text-xl font-black text-white mb-2">Express Your Interest</h3>
                <p className="text-secondary text-sm mb-6 leading-relaxed">
                  Send us your details and we will be in touch within 24 hours to get you started.
                </p>

                <form onSubmit={submitMentorshipEnquiry} className="space-y-5">
                  <label className="block space-y-2">
                    <span className="text-white text-sm font-semibold">Full Name</span>
                    <input
                      required
                      name="fullName"
                      value={mentorshipForm.fullName}
                      onChange={updateMentorshipField}
                      placeholder="Your full name"
                      autoComplete="name"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-white text-sm font-semibold">Email</span>
                    <input
                      required
                      type="email"
                      name="email"
                      value={mentorshipForm.email}
                      onChange={updateMentorshipField}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                  </label>

                  <label className="block space-y-2">
                    <span className="text-white text-sm font-semibold">Tell us about yourself</span>
                    <textarea
                      name="message"
                      value={mentorshipForm.message}
                      onChange={updateMentorshipField}
                      placeholder="What skills do you have now? What do you want to learn? Why are you interested in starting immediately?"
                      rows={4}
                    />
                  </label>

                  <button
                    type="submit"
                    disabled={mentorshipStatus === "loading"}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-gold/25"
                  >
                    {mentorshipStatus === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Enquiry
                      </>
                    )}
                  </button>

                  {mentorshipStatus === "success" && (
                    <p className="text-sm text-gold font-medium text-center">
                      Enquiry received. We will be in touch within 24 hours.
                    </p>
                  )}
                  {mentorshipStatus === "error" && (
                    <p className="text-sm text-red-400 font-medium text-center">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
