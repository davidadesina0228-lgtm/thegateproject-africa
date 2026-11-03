"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowDown, ArrowUpRight, Check, Loader2, Send } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Reveal } from "@/components/marketing/HomeMotion";
import styles from "./apply.module.css";

const TELEGRAM_LINK = "https://t.me/Thegateprojectafrica";
type MentorshipEnquiry = { fullName: string; email: string; message: string };
const initialMentorshipForm: MentorshipEnquiry = { fullName: "", email: "", message: "" };

const scholarshipPaths = [
  {
    title: "The Learner Path",
    subtitle: "For talented beginners ready to build a serious AI portfolio.",
    bullets: ["No prior AI experience required", "6-week structured training programme", "Hands-on AI automation, GEO, and n8n projects", "Weekly mentorship and portfolio reviews", "Placement support after proof of skill", "Unpaid FDE placement to add real-world experience to your CV"],
  },
  {
    title: "The FDE Path",
    subtitle: "Future Development Engineers: experienced professionals ready for international opportunities.",
    bullets: ["For candidates with existing digital or technical skills", "Profile vetting, positioning, and interview preparation", "Sharpened LinkedIn authority and lead generation systems", "Direct matching with vetted Western companies", "Mentorship while placement conversations progress"],
  },
];

const steps = [
  { title: "Join the conversation.", desc: 'Join our Telegram group and type “FDE” for the free scholarship or “Training” for paid mentorship. We will reach out to you.' },
  { title: "Have a short interview.", desc: "We will invite you for a brief conversation to understand your background, your commitment, and what you are aiming for." },
  { title: "Find your place.", desc: "If you pass the interview, you will be added to the Cohort 4 training group and given your start date." },
];

const paidFeatures = [
  "Personal mentorship directly from David Adesina and Dean Whitby",
  "Practical AI automation, GEO, and n8n skills our graduates are being hired for",
  "Taught by the founders, using the same skills they apply in their own work",
  "Placement support throughout your journey; employment is not guaranteed",
  "Unpaid FDE placement to add real-world experience to your CV",
];

function MentorshipForm() {
  const [form, setForm] = useState<MentorshipEnquiry>(initialMentorshipForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const updateField = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm(current => ({ ...current, [name]: value }));
    if (status !== "loading") setStatus("idle");
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, track: "paid-mentorship" }),
      });
      if (!response.ok) throw new Error("Enquiry request failed");
      setStatus("success");
      setForm(initialMentorshipForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className={styles.formPanel}>
      <p className={styles.eyebrow}>Start a conversation</p>
      <h3>Express your interest.</h3>
      <p id="enquiry-description" className={styles.formIntro}>Send us your details and we will be in touch within 24 hours.</p>
      <form onSubmit={submit} className={styles.form} aria-describedby="enquiry-description" aria-busy={status === "loading"}>
        <label htmlFor="mentorship-name">Full name <span>(required)</span></label>
        <input id="mentorship-name" required name="fullName" value={form.fullName} onChange={updateField} placeholder="Your full name" autoComplete="name" disabled={status === "loading"} />
        <label htmlFor="mentorship-email">Email <span>(required)</span></label>
        <input id="mentorship-email" required type="email" name="email" value={form.email} onChange={updateField} placeholder="you@example.com" autoComplete="email" disabled={status === "loading"} />
        <label htmlFor="mentorship-message">Tell us about yourself <span>(optional)</span></label>
        <textarea id="mentorship-message" name="message" value={form.message} onChange={updateField} placeholder="What skills do you have now, and what would you like to learn?" rows={4} disabled={status === "loading"} />
        <button type="submit" disabled={status === "loading"} className={styles.submit}>
          {status === "loading" ? <>Sending enquiry <Loader2 size={18} className={styles.spinner} aria-hidden="true" /></> : <>Send enquiry <Send size={17} aria-hidden="true" /></>}
        </button>
        <div aria-live="polite" aria-atomic="true" className={styles.feedback}>
          {status === "success" && <p className={styles.success}>Enquiry received. We will be in touch within 24 hours.</p>}
          {status === "error" && <p className={styles.error}>We couldn’t send your enquiry. Your details are still here. Please try again.</p>}
        </div>
      </form>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <MarketingShell>
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="apply-title">
        <Reveal>
          <p className={styles.eyebrow}>The Gate Project / Cohort 4</p>
          <h1 id="apply-title">Your next chapter<br /><em>starts here.</em></h1>
        </Reveal>
        <Reveal className={styles.heroAside} delay={100}>
          <p>A fully funded, six-week AI programme for African professionals ready to put their ambition to work.</p>
          <p>If you are selected, your training is completely free. You build practical skills and a portfolio, with support to connect with international companies.</p>
          <a href="#scholarship" className={styles.button}>Explore the scholarship <ArrowDown size={17} aria-hidden="true" /></a>
          <a href="#paid-mentorship" className={styles.subtleLink}>Also available: $300 mentorship <ArrowUpRight size={15} aria-hidden="true" /></a>
        </Reveal>
      </section>

      <section id="scholarship" className={`${styles.container} ${styles.scholarship}`} aria-labelledby="scholarship-title">
        <Reveal className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>01 / The scholarship</p><h2 id="scholarship-title">Two starting points.<br /><em>One way forward.</em></h2></div>
          <p>Apply for Cohort 4.<br />Competitive selection. Free training.<br />Real placement support.</p>
        </Reveal>
        <div className={styles.paths}>
          {scholarshipPaths.map((path, index) => (
            <Reveal key={path.title} className={styles.path} delay={index * 80}>
              <span className={styles.pathIndex}>0{index + 1} / Fully funded for selected applicants</span>
              <h3>{path.title}</h3><p>{path.subtitle}</p>
              <ul>{path.bullets.map(bullet => <li key={bullet}><Check size={16} aria-hidden="true" /><span>{bullet}</span></li>)}</ul>
              <a href="#how-to-apply" className={styles.pathLink}>How to apply <ArrowUpRight size={18} aria-hidden="true" /></a>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="how-to-apply" className={styles.application} aria-labelledby="application-title">
        <div className={styles.container}>
          <Reveal className={styles.sectionHeading}>
            <div><p className={styles.eyebrow}>02 / Make your introduction</p><h2 id="application-title">Three steps.<br /><em>No application fees.</em></h2></div>
            <p>Join the group. Introduce yourself.<br />Let’s find out where you want to go.</p>
          </Reveal>
          <ol className={styles.steps}>{steps.map((step, index) => <li key={step.title}><Reveal delay={index * 70}><span className={styles.stepIndex}>0{index + 1}</span><h3>{step.title}</h3><p>{step.desc}</p></Reveal></li>)}</ol>
          <Reveal className={styles.telegramRow}>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className={styles.lightButton}>Join the Cohort 4 Telegram group <ArrowUpRight size={18} aria-hidden="true" /></a>
            <p>Free to join. Interview required.<br />Limited places available.</p>
          </Reveal>
        </div>
      </section>

      <section id="paid-mentorship" className={`${styles.container} ${styles.mentorship}`} aria-labelledby="mentorship-title">
        <Reveal className={styles.sectionHeading}>
          <div><p className={styles.eyebrow}>03 / Another way in</p><h2 id="mentorship-title">The same skills.<br /><em>A different starting point.</em></h2></div>
          <p>The scholarship is selective. Paid mentorship offers another route to learn with the founders and build practical experience.</p>
        </Reveal>
        <div className={styles.mentorshipGrid}>
          <Reveal className={styles.mentorshipInfo}>
            <p className={styles.eyebrow}>Personal mentorship / Six weeks</p>
            <div className={styles.price}>$300<span>for the full programme</span></div>
            <ul className={styles.featureList}>{paidFeatures.map(feature => <li key={feature}><Check size={16} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
            <p className={styles.scheduleNote}>Classes begin once we reach 20 confirmed participants. The start date and payment are confirmed at that point.</p>
          </Reveal>
          <Reveal delay={100}><MentorshipForm /></Reveal>
        </div>
      </section>
    </MarketingShell>
  );
}
