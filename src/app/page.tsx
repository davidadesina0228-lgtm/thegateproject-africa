import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { HomeNav } from "@/components/marketing/HomeNav";
import { Reveal } from "@/components/marketing/HomeMotion";
import { HomeSections } from "@/components/marketing/HomeSections";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.home}>
      <a className={styles.skipLink} href="#main-content">Skip to content</a>
      <HomeNav />
      <main id="main-content" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-heading">
          <div className={styles.heroPhoto}>
            <Image src="/alumni/samuel.jpg" alt="Samuel Oluwatobi Odukoya, Gate Project alumnus and AI Automation Engineer" fill priority sizes="(max-width: 700px) 100vw, 60vw" />
          </div>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}><span className={styles.smallGate} aria-hidden="true" /> African talent. Global opportunity.</p>
            <h1 id="hero-heading" className={styles.heroTitle}>
              <span>Built in Africa.</span><span>Ready for</span><span className={styles.serif}>the world.</span>
            </h1>
            <p className={styles.heroDescription}>Your ambition deserves a way forward. Build practical AI skills, work on real projects, and connect with international companies.</p>
            <div className={styles.heroActions}>
              <Link href="/apply" className={styles.button}>Find your way in <ArrowUpRight size={18} aria-hidden="true" /></Link>
              <a href="#programme" className={styles.textLink}>Explore the programme <ArrowDown size={16} aria-hidden="true" /></a>
            </div>
            <p className={styles.heroNote}>6 weeks. Fully funded for selected applicants.</p>
          </div>
          <Link href="/alumni" className={styles.heroCaption} aria-label="Meet Samuel and the Gate Project alumni">
            <span className={styles.captionIndex}>01 / THE PEOPLE BEHIND THE PROGRESS</span>
            <span className={styles.captionName}>Samuel Oluwatobi Odukoya <ArrowUpRight size={22} aria-hidden="true" /></span>
            <span className={styles.captionRole}>From healthcare to AI Automation Engineer · CH4B, UK</span>
          </Link>
          <a href="#the-opportunity" className={styles.scrollCue}><ArrowDown size={14} aria-hidden="true" /> A new chapter starts here</a>
        </section>
        <section className={styles.proof} aria-label="Programme at a glance">
          <div className={styles.proofIntro}><span className={styles.eyebrow}>Small cohort.</span><span>Real outcomes.</span></div>
          <div><strong>6 <span>weeks</span></strong><p>Hands-on, focused learning</p></div>
          <div><strong>15+</strong><p>Graduate placements since May</p></div>
          <div><strong>100% <span>funded</span></strong><p>For selected scholarship participants</p></div>
        </section>
        <section id="the-opportunity" className={styles.mission} aria-labelledby="mission-heading">
          <Reveal><p className={styles.eyebrow}>01 / The opportunity</p></Reveal>
          <div className={styles.missionGrid}>
            <Reveal><h2 id="mission-heading">Talent has no borders.<br /><em>Opportunity shouldn’t either.</em></h2></Reveal>
            <Reveal delay={100} className={styles.missionBody}>
              <p>Africa has the talent. We help open the door.</p>
              <p>The Gate Project brings practical AI training, experienced mentors, and introductions to international companies into one focused programme.</p>
              <p>You build things that work. You leave with a portfolio that speaks for itself. And you have people in your corner as you take the next step.</p>
              <Link href="/about" className={styles.textLink}>The story behind the project <ArrowUpRight size={18} aria-hidden="true" /></Link>
            </Reveal>
          </div>
        </section>
        <HomeSections />
        <section className={styles.people} aria-labelledby="people-heading">
          <Reveal className={styles.peopleIntro}>
            <p className={styles.eyebrow}>Built on experience. Shared with purpose.</p>
            <h2 id="people-heading">Real people.<br /><em>In your corner.</em></h2>
            <Link href="/about#founders" className={styles.textLink}>Meet your mentors <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </Reveal>
          <Reveal delay={100} className={styles.founders}>
            <div className={styles.founder}>
              <div className={styles.founderPhoto}><Image src="/founders/david.jpg" alt="David Adesina" fill sizes="(max-width: 700px) 40vw, 240px" /></div>
              <h3>David Adesina</h3><p>Co-founder · AI Automation</p>
            </div>
            <div className={styles.founder}>
              <div className={styles.founderPhoto}><Image src="/founders/dean.jpg" alt="Dean Whitby" fill sizes="(max-width: 700px) 40vw, 240px" /></div>
              <h3>Dean Whitby</h3><p>Co-founder · GEO & Lead Generation</p>
            </div>
          </Reveal>
        </section>
        <section className={styles.closing} aria-labelledby="closing-heading">
          <Reveal>
            <p className={styles.eyebrow}>Your next chapter</p>
            <h2 id="closing-heading">There’s a place<br />for <em>your potential.</em></h2>
            <div className={styles.closingBottom}>
              <p>Bring your curiosity. Bring your commitment.<br />Let’s see where they can take you.</p>
              <Link href="/apply" className={styles.button}>Apply for a scholarship <ArrowUpRight size={20} aria-hidden="true" /></Link>
            </div>
          </Reveal>
          <span className={styles.closingMark} aria-hidden="true">↗</span>
        </section>
      </main>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" className={styles.wordmark} aria-label="The Gate Project home"><Image src="/nav-logo.png" alt="" width={44} height={44} /><span>The Gate<br />Project<span className={styles.wordmarkDot}>.</span></span></Link>
          <p>Built for Africa.<br />Open to the world.</p>
          <nav aria-label="Footer navigation"><Link href="/about">Our story</Link><Link href="/alumni">Alumni</Link><Link href="/blog">Journal</Link><Link href="/apply#paid-mentorship">Mentorship</Link><Link href="/auth/login">Sign in <ArrowUpRight size={14} aria-hidden="true" /></Link></nav>
        </div>
        <div className={styles.footerBottom}><span>© {new Date().getFullYear()} The Gate Project</span><a href="https://t.me/Thegateprojectafrica" target="_blank" rel="noopener noreferrer">Join our Telegram community <ArrowRight size={14} aria-hidden="true" /></a><span>Talent is everywhere. Let’s open doors.</span></div>
      </footer>
    </div>
  );
}
