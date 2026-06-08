"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle, GraduationCap, Loader2, Send } from "lucide-react";
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

const initialForm: ApplicationForm = {
  fullName: "",
  email: "",
  country: "",
  track: "learner",
  whyJoin: "",
  linkedinUrl: "",
};

const paths = [
  {
    track: "learner" as Track,
    title: "Learner Path",
    subtitle: "For talented beginners ready to build a serious AI portfolio.",
    icon: GraduationCap,
    bullets: [
      "No prior AI experience required",
      "6-week structured training program",
      "Hands-on AI automation, GEO, and n8n projects",
      "Weekly mentorship and portfolio reviews",
      "Placement support after proof of skill",
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

export default function ApplyPage() {
  const [form, setForm] = useState<ApplicationForm>(initialForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

  const submitApplication = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    console.log("Submitting Gate Project application:", form);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Application request failed");
      }

      setStatus("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Application submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SiteNav />

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
              Applications open
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
              Apply for Cohort 2
            </h1>
            <p className="text-lg md:text-2xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Choose the route that matches your current skill level. We will review your
              application and follow up with the next step.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {paths.map((path, index) => (
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
                  <h2 className="text-2xl font-black text-white mb-2">{path.title}</h2>
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
      </section>

      <section className="py-28 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              Application Form
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

      <SiteFooter />
    </main>
  );
}
