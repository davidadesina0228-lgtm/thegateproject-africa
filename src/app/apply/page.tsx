"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  CheckCircle,
  GraduationCap,
  Loader2,
  Send,
  Star,
  Zap,
} from "lucide-react";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

type Track = "learner" | "intern";

type ApplicationForm = {
  fullName: string;
  email: string;
  country: string;
  track: Track;
  whyJoin: string;
  linkedinUrl: string;
};

type MentorshipEnquiry = {
  fullName: string;
  email: string;
  message: string;
};

const initialForm: ApplicationForm = {
  fullName: "",
  email: "",
  country: "",
  track: "learner",
  whyJoin: "",
  linkedinUrl: "",
};

const initialMentorshipForm: MentorshipEnquiry = {
  fullName: "",
  email: "",
  message: "",
};

const scholarshipPaths = [
  {
    track: "learner" as Track,
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
    track: "intern" as Track,
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

const paidFeatures = [
  { icon: Zap, text: "Start this week — no cohort waitlist, no application queue" },
  { icon: Star, text: "Personal 1-on-1 mentorship directly from David Adesina and Dean Whitby" },
  { icon: CheckCircle, text: "The exact AI automation, GEO, and n8n skills Cohort 1 graduates are being hired for" },
  { icon: CheckCircle, text: "Taught by the founders — these are the same skills they use to earn" },
  { icon: CheckCircle, text: "Placement is our goal for every mentee — no guarantee, but it is the mission" },
  { icon: CheckCircle, text: "Unpaid internship opportunity to add real-world experience to your CV" },
];

export default function ApplyPage() {
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mentorshipForm, setMentorshipForm] = useState<MentorshipEnquiry>(initialMentorshipForm);
  const [mentorshipStatus, setMentorshipStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    const track = new URLSearchParams(window.location.search).get("track");
    if (track === "learner" || track === "intern") {
      setForm((current) => ({ ...current, track }));
    }
  }, []);

  const updateField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updateMentorshipField = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setMentorshipForm((current) => ({ ...current, [name]: value }));
  };

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Application request failed");
      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Application submission failed:", error);
      setStatus("error");
    }
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
              Two Ways to Join
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
              Get In.
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Get Placed.
              </span>
            </h1>
            <p className="text-lg md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed mb-10">
              Free scholarship for those who qualify. Paid personal mentorship for those who want to
              start now. Both paths lead to the same place — real AI skills and real placements.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#scholarship"
                className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-gold/25"
              >
                Apply for Free Scholarship
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#paid-mentorship"
                className="inline-flex items-center gap-2 bg-transparent border border-gold/40 hover:border-gold text-gold hover:text-white font-bold text-base px-8 py-4 rounded-xl transition-all"
              >
                $100 Paid Mentorship
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
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
              <motion.button
                type="button"
                key={path.track}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                onClick={() => setForm((current) => ({ ...current, track: path.track }))}
                className={`text-left bg-surface border rounded-2xl p-8 transition-all ${
                  form.track === path.track
                    ? "border-gold shadow-2xl shadow-gold/10"
                    : "border-border hover:border-gold/30"
                }`}
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
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarship Application Form */}
      <section className="py-20 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              Scholarship Application
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-5">
              Tell us where you are starting from.
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              Clear answers help us understand your fit, your goals, and the path that gives you
              the strongest chance of success.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            onSubmit={submitApplication}
            className="grid md:grid-cols-2 gap-5"
          >
            <label className="space-y-2">
              <span className="text-white text-sm font-semibold">Full Name</span>
              <input
                required
                name="fullName"
                value={form.fullName}
                onChange={updateField}
                placeholder="Your full name"
                autoComplete="name"
              />
            </label>

            <label className="space-y-2">
              <span className="text-white text-sm font-semibold">Email</span>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={updateField}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>

            <label className="space-y-2">
              <span className="text-white text-sm font-semibold">Country</span>
              <input
                required
                name="country"
                value={form.country}
                onChange={updateField}
                placeholder="Nigeria"
                autoComplete="country-name"
              />
            </label>

            <label className="space-y-2">
              <span className="text-white text-sm font-semibold">Which track</span>
              <select required name="track" value={form.track} onChange={updateField}>
                <option value="learner">Learner</option>
                <option value="intern">Intern</option>
              </select>
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-white text-sm font-semibold">Why do you want to join?</span>
              <textarea
                required
                name="whyJoin"
                value={form.whyJoin}
                onChange={updateField}
                placeholder="Tell us about your goals, current skills, and what you want this program to unlock."
                rows={6}
              />
            </label>

            <label className="space-y-2 md:col-span-2">
              <span className="text-white text-sm font-semibold">LinkedIn URL</span>
              <input
                required
                type="url"
                name="linkedinUrl"
                value={form.linkedinUrl}
                onChange={updateField}
                placeholder="https://www.linkedin.com/in/your-profile"
                autoComplete="url"
              />
            </label>

            <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 pt-3">
              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold text-base px-8 py-4 rounded-xl transition-all shadow-xl shadow-gold/25 hover:shadow-gold/40"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Submit Application
              </button>

              {status === "success" && (
                <p className="text-sm text-gold font-medium">
                  Application submitted. We will review it and follow up soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-400 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </div>
          </motion.form>

          <div className="mt-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-secondary hover:text-white text-sm font-medium transition-colors"
            >
              Learn more about The Gate Project
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
              Don&apos;t Want to Wait for a Cohort?
              <br />
              <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
                Start Learning This Week.
              </span>
            </h2>
            <p className="text-secondary text-lg max-w-2xl leading-relaxed">
              The free scholarship runs on a fixed cohort schedule. The paid track starts when you
              do — personal mentorship from the founders, the exact same skills, and the same goal:
              getting you placed.
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
