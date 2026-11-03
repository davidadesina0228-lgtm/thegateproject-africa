import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Reveal } from "@/components/marketing/HomeMotion";
import styles from "./about.module.css";

const founders = [
  {
    name: "David Adesina",
    role: "Co-Founder & AI Automation Lead",
    photo: "/founders/david.jpg",
    bio: "David trains learners in AI automation, n8n workflow engineering, Claude API, chatbots, and voice agents. The Gate Project's pipeline then connects those trained professionals directly to Western companies that need exactly those skills.",
    tags: ["AI Automation", "n8n", "Claude API", "Voice Agents"],
  },
  {
    name: "Dean Whitby",
    role: "Co-Founder & GEO Lead",
    photo: "/founders/dean.jpg",
    bio: "Dean is an expert in Generative Engine Optimization, lead generation, LinkedIn authority, and AI-first content strategy. He helps Gate learners become visible, credible, and commercially useful in the markets hiring them.",
    tags: ["GEO", "Lead Generation", "LinkedIn Authority", "AI Content"],
    website: "https://deanwhitby.com/",
  },
];

const teachingAreas = [
  { title: "AI Automation", desc: "Build practical systems that remove repetitive work and turn AI tools into reliable business operations." },
  { title: "GEO/AEO", desc: "Learn how brands become discoverable in generative search, answer engines, and AI-assisted buying journeys." },
  { title: "LinkedIn Authority", desc: "Develop profiles, content, and outreach systems that create trust before the first sales conversation." },
  { title: "n8n Workflows", desc: "Design production-ready automations across CRMs, content pipelines, lead systems, and client operations." },
];

const results = [
  { value: "15+", label: "Placements since May" },
  { value: "~25", label: "People trained" },
  { value: "3", label: "Cohorts in 2026" },
];

export default function AboutPage() {
  return (
    <MarketingShell>
      <section className={`${styles.container} ${styles.hero}`} aria-labelledby="about-heading">
        <Reveal>
          <p className={styles.eyebrow}>Our story / Built for African talent</p>
          <h1 id="about-heading" className={styles.title}>The talent was<br />always <em>here.</em></h1>
          <div className={styles.heroBottom}>
            <p className={styles.heroStatement}>We built The Gate<br />to open the door.</p>
            <p>The missing piece was never ability. It was access, structure, proof, and a direct bridge to companies ready to hire skilled African professionals.</p>
          </div>
        </Reveal>
      </section>

      <section className={`${styles.container} ${styles.mission}`} aria-labelledby="mission-heading">
        <Reveal>
          <p className={styles.eyebrow}>01 / The mission</p>
          <h2 id="mission-heading">Train deeply.<br /><em>Connect directly.</em></h2>
        </Reveal>
        <Reveal delay={100} className={styles.missionCopy}>
          <p>The Gate Project is a 6-week AI training and placement programme connecting African professionals with Western companies. Learners build practical skills in AI automation, GEO, LinkedIn authority, and workflow engineering.</p>
          <p>The programme is built around proof. Participants learn the systems companies need, create deliverables that demonstrate competence, and receive placement support shaped by real hiring needs.</p>
          <Link href="/#programme" className={styles.textLink}>Explore the programme <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </Reveal>
      </section>

      <section id="founders" className={`${styles.container} ${styles.founders}`} aria-labelledby="founders-heading">
        <Reveal className={styles.sectionHeader}>
          <div><p className={styles.eyebrow}>02 / The founders</p><h2 id="founders-heading">Experience, shared<br /><em>with purpose.</em></h2></div>
          <p>Two practitioners building the connection between skill and opportunity.</p>
        </Reveal>
        <div className={styles.founderGrid}>
          {founders.map((founder, index) => (
            <Reveal key={founder.name} delay={index * 100}>
              <article className={styles.founder}>
                <div className={styles.portrait} data-reveal="image"><Image src={founder.photo} alt={founder.name} fill sizes="(max-width: 700px) 88vw, 40vw" /></div>
                <div className={styles.founderDetails}>
                  <h3>{founder.name}</h3>
                  <p className={styles.role}>{founder.role}</p>
                  <p className={styles.bio}>{founder.bio}</p>
                  <ul className={styles.tags} aria-label={`${founder.name}'s teaching areas`}>{founder.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                  {founder.website && <a href={founder.website} target="_blank" rel="noopener noreferrer" className={styles.textLink}>deanwhitby.com <ArrowUpRight size={18} aria-hidden="true" /></a>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.teaching} aria-labelledby="teaching-heading">
        <div className={styles.container}>
          <Reveal className={styles.sectionHeader}>
            <div><p className={styles.eyebrow}>03 / What we teach</p><h2 id="teaching-heading">Useful skills.<br /><em>Real applications.</em></h2></div>
            <p>Learn through the work. Build systems that solve practical business problems.</p>
          </Reveal>
          <div className={styles.areas}>
            {teachingAreas.map((area, index) => <Reveal key={area.title} delay={index * 70} className={styles.area}><span className={styles.areaNumber}>0{index + 1}</span><h3>{area.title}</h3><p>{area.desc}</p></Reveal>)}
          </div>
        </div>
      </section>

      <section className={`${styles.container} ${styles.results}`} aria-labelledby="results-heading">
        <Reveal className={styles.resultsCopy}>
          <p className={styles.eyebrow}>04 / The progress</p>
          <h2 id="results-heading">A growing body<br /><em>of proof.</em></h2>
          <p>About 25 people have been trained across three cohorts in 2026. Graduates have secured 15+ placements since May in real AI-first roles, with some placed more than once.</p>
          <Link href="/alumni" className={styles.textLink}>Meet the graduates <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </Reveal>
        <Reveal delay={100} className={styles.stats}>
          {results.map(result => <div key={result.label}><strong>{result.value}</strong><span>{result.label}</span></div>)}
        </Reveal>
      </section>

      <section className={styles.closing} aria-labelledby="closing-heading">
        <Reveal className={styles.container}>
          <p className={styles.eyebrow}>Apply for Cohort 4</p>
          <h2 id="closing-heading">Make your next move<br /><em>mean something.</em></h2>
          <div className={styles.closingBottom}>
            <p>Choose the path that fits where you are now. Build practical skills, real deliverables, and the confidence to pursue international opportunities.</p>
            <Link href="/apply" className={styles.button}>Apply for a scholarship <ArrowUpRight size={20} aria-hidden="true" /></Link>
          </div>
        </Reveal>
      </section>
    </MarketingShell>
  );
}
