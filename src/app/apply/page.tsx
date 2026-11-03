import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Reveal } from "@/components/marketing/HomeMotion";
import styles from "./apply.module.css";

const TELEGRAM_LINK = "https://t.me/Thegateprojectafrica";

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
  { title: "Join the conversation.", desc: 'Join our Telegram group and type “FDE” for the free scholarship. We will reach out to you.' },
  { title: "Have a short interview.", desc: "We will invite you for a brief conversation to understand your background, your commitment, and what you are aiming for." },
  { title: "Find your place.", desc: "If you pass the interview, you will be added to the Cohort 4 training group and given your start date." },
];

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
    </MarketingShell>
  );
}
