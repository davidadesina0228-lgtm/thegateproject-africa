import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { graduates } from "@/lib/alumni";
import { Reveal } from "./HomeMotion";
import styles from "./HomeSections.module.css";
import { telegramLinkProps } from "@/lib/site";

const curriculum = [
  {
    title: "AI automation",
    description:
      "Turn repetitive tasks into working systems. Build connected workflows, chatbots, and AI agents that solve everyday business problems.",
    tools: ["n8n workflows", "Claude API", "Chatbots & voice agents"],
    project: "Build a lead qualification workflow, from first enquiry to CRM update.",
  },
  {
    title: "GEO & AI search",
    description:
      "Help businesses show up in AI-powered search. Learn Generative Engine Optimization, content auditing, and the foundations of Answer Engine Optimization.",
    tools: ["GEO & AEO", "Content strategy", "Search visibility"],
    project: "Audit a business’s content and develop a practical AI search strategy.",
  },
  {
    title: "LinkedIn & lead generation",
    description:
      "Build a professional presence with purpose. Connect profile positioning, useful content, and targeted outreach into a repeatable lead generation process.",
    tools: ["Profile positioning", "Outreach systems", "Lead generation"],
    project: "Create an outreach pipeline that identifies and qualifies potential clients.",
  },
];

const journey = [
  {
    title: "Apply.",
    text: "Choose your path and take a short interview. We look for commitment, curiosity, and the readiness to learn.",
  },
  {
    title: "Train.",
    text: "Spend six weeks learning practical AI skills with guidance from working practitioners.",
  },
  {
    title: "Build.",
    text: "Put the learning to work. Create a portfolio of functioning systems and real deliverables.",
  },
  {
    title: "Connect.",
    text: "Get support and introductions to international companies looking for the skills you’ve developed.",
  },
];

const alumni = [
  {
    name: "Samuel Oluwatobi Odukoya",
    role: "AI Automation Engineer",
    company: "CH4B, UK",
    photo: "/alumni/samuel.jpg",
    caption: "From healthcare to AI automation.",
  },
  {
    name: "Esther Abem",
    role: "AI Automation & GEO Specialist",
    company: "Better People Recruitment",
    photo: "/alumni/esther.jpg",
    caption: "From AI basics to real client systems.",
  },
  {
    name: "Eniola Rosilu",
    role: "AI Automation Specialist",
    company: "Host Planet & WISH",
    photo: "/alumni/eniola.jpg",
    caption: "Studying medicine. Building automation.",
  },
];

function Curriculum() {
  return (
    <section id="programme" className={styles.curriculum} aria-labelledby="curriculum-title">
      <div className={`${styles.container} ${styles.curriculumLayout}`}>
        <Reveal className={styles.curriculumIntro}>
          <p className={styles.eyebrow}>02 / The curriculum</p>
          <h2 id="curriculum-title" className={styles.heading}>
            Learn the skills.<br /><em>Do the work.</em>
          </h2>
          <p className={styles.introCopy}>
            Practical skills, taught through real projects. Every week brings you closer
            to work you can show, explain, and stand behind.
          </p>
          <div className={styles.curriculumFootnote}>
            <span className={styles.smallDot} />
            Six weeks. Three areas of focus.
          </div>
        </Reveal>
        <Reveal className={styles.accordion} delay={100}>
          {curriculum.map((item, index) => (
            <details key={item.title} className={styles.subject} open={index === 0}>
              <summary>
                <span className={styles.subjectNumber}>0{index + 1}</span>
                <h3>{item.title}</h3>
                <Plus size={20} strokeWidth={1.5} className={styles.expandIcon} aria-hidden="true" />
              </summary>
              <div className={styles.subjectBody}>
                <p>{item.description}</p>
                <ul className={styles.tools} aria-label={`${item.title} topics`}>
                  {item.tools.map((tool) => <li key={tool}>{tool}</li>)}
                </ul>
                <p className={styles.project}><span>Put it into practice</span>{item.project}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="how-it-works" className={styles.journey} aria-labelledby="journey-title">
      <div className={styles.container}>
        <Reveal className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>03 / The journey</p>
            <h2 id="journey-title" className={styles.heading}>A clear path.<br /><em>A wider world.</em></h2>
          </div>
          <p className={styles.headerAside}>Bring your ambition.<br />We’ll help you put it to work.</p>
        </Reveal>
        <ol className={styles.steps}>
          {journey.map((step, index) => (
            <li key={step.title}>
              <Reveal delay={index * 70}>
                <div className={styles.stepMarker}><span>0{index + 1}</span><ArrowRight size={18} aria-hidden="true" /></div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const featuredNames = new Set(alumni.map((person) => person.name));
const moreGraduates = graduates.filter(
  (grad): grad is typeof grad & { photo: string } => Boolean(grad.photo) && !featuredNames.has(grad.name),
);

function GraduateStrip({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className={styles.marqueeList} aria-label={hidden ? undefined : "More of our graduates"} aria-hidden={hidden || undefined}>
      {moreGraduates.map((grad) => (
        <li key={grad.name} className={styles.marqueeItem}>
          <div className={styles.marqueePhoto}>
            <Image src={grad.photo} alt={hidden ? "" : grad.name} fill sizes="180px" />
          </div>
          <p className={styles.marqueeName}>{grad.name}</p>
          <p className={styles.marqueeRole}>{grad.role}</p>
        </li>
      ))}
    </ul>
  );
}

function Alumni() {
  return (
    <section id="alumni" className={styles.alumni} aria-labelledby="alumni-title">
      <div className={styles.container}>
        <Reveal className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>04 / The people behind the progress</p>
            <h2 id="alumni-title" className={styles.heading}>Potential,<br /><em>in practice.</em></h2>
          </div>
          <div className={styles.alumniAside}>
            <p>Our graduates have secured 15+ placements since May. Meet some of the people who went first.</p>
            <Link href="/alumni" className={styles.textLink}>Explore their stories <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </Reveal>
        <div className={styles.portraits}>
          {alumni.map((person, index) => (
            <Reveal key={person.name} className={styles.person} delay={index * 80}>
              <Link href="/alumni" className={styles.personLink} aria-label={`Read about ${person.name} and our alumni`}>
                <div className={`${styles.portrait} ${index === 0 ? styles.samuel : ""}`} data-reveal="image">
                  <Image src={person.photo} alt={person.name} fill sizes="(max-width: 640px) 90vw, (max-width: 900px) 44vw, 30vw" />
                  <span className={styles.portraitLabel}>Alumni</span>
                  <span className={styles.portraitArrow}><ArrowUpRight size={20} aria-hidden="true" /></span>
                </div>
                <div className={styles.personCaption}>
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                  <span>{person.company}</span>
                </div>
              </Link>
              <p className={styles.personStory}>{person.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className={styles.moreGraduates}>
        <div className={`${styles.container} ${styles.moreHeader}`}>
          <p className={styles.eyebrow}>And many more graduates</p>
          <Link href="/alumni" className={styles.textLink}>See all stories <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
        <div className={styles.marquee}>
          <div className={styles.marqueeTrack}>
            <GraduateStrip />
            <GraduateStrip hidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Pathways() {
  return (
    <section id="pathways" className={styles.pathways} aria-labelledby="pathways-title">
      <div className={styles.container}>
        <Reveal className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>05 / Find your starting point</p>
            <h2 id="pathways-title" className={styles.heading}>Two paths.<br /><em>Your next chapter.</em></h2>
          </div>
          <p className={styles.pathwayAside}>Scholarship training is free for selected applicants. Your commitment is the investment.</p>
        </Reveal>
        <div className={styles.paths}>
          <Reveal className={styles.path}>
            <span className={styles.pathLabel}>Starting something new</span>
            <h3>The Learner Path</h3>
            <p>No AI experience required. Build your foundations, work on practical projects, and develop a portfolio with support along the way.</p>
            <a {...telegramLinkProps} className={styles.pathLink}>Apply as a learner on Telegram <ArrowUpRight size={20} aria-hidden="true" /></a>
          </Reveal>
          <Reveal className={styles.path} delay={80}>
            <span className={styles.pathLabel}>Ready for the next step</span>
            <h3>The FDE Path</h3>
            <p>For Future Development Engineers who already have digital skills. Sharpen your expertise, demonstrate your work, and prepare for opportunities with international companies.</p>
            <a {...telegramLinkProps} className={styles.pathLink}>Apply as an FDE on Telegram <ArrowUpRight size={20} aria-hidden="true" /></a>
          </Reveal>
        </div>
        <div className={styles.pathwaysNote}>
          <p>Selection is by interview. Placement support is included; employment is not guaranteed.</p>
        </div>
      </div>
    </section>
  );
}

export function HomeSections() {
  return <><Curriculum /><Journey /><Alumni /><Pathways /></>;
}
