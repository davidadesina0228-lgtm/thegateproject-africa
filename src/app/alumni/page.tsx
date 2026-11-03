import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Building2 } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Reveal } from "@/components/marketing/HomeMotion";
import { alumniStats, graduates } from "@/lib/alumni";
import styles from "./alumni.module.css";

export default function AlumniPage() {
  return (
    <MarketingShell>
      <section className={styles.hero} aria-labelledby="alumni-heading">
        <div className={styles.container}>
          <p className={styles.eyebrow}>Our graduates</p>
          <h1 id="alumni-heading" className={styles.title}>
            They went first.
            <em>Here&apos;s what happened.</em>
          </h1>
          <div className={styles.heroBottom}>
            <p>
              15+ placements since May, with graduates from Nigeria, Cape Verde and Ethiopia coming from healthcare,
              medicine, engineering, finance and more.
            </p>
            <p>Here is a selection of what some of them built and where they landed.</p>
          </div>
          <div className={styles.stats}>
            {alumniStats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.list} aria-label="Graduate profiles">
        <div className={styles.container}>
          {graduates.map((grad, index) => {
            const projects = [...grad.trainingProjects, ...grad.placementProjects];
            const projectsLabel = "projectsLabel" in grad && grad.projectsLabel ? grad.projectsLabel : "Projects built";
            const linkedIn = "linkedIn" in grad ? (grad.linkedIn as string) : null;
            return (
              <Reveal key={grad.name}>
                <article className={styles.graduate} aria-labelledby={`grad-${index}`}>
                  <div className={styles.photoWrap}>
                    <div className={styles.photo}>
                      {grad.photo ? (
                        <Image
                          src={grad.photo}
                          alt={`${grad.name}, ${grad.role}`}
                          fill
                          sizes="(max-width: 700px) 88vw, 36vw"
                        />
                      ) : (
                        <span className={styles.photoFallback} aria-hidden="true">
                          {grad.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </span>
                      )}
                    </div>
                    <p className={styles.nationality}>{grad.nationality}</p>
                  </div>

                  <div>
                    <p className={styles.meta}>{grad.placedMonth}</p>
                    <h2 id={`grad-${index}`} className={styles.name}>{grad.name}</h2>
                    <p className={styles.role}>{grad.role}</p>
                    <p className={styles.background}>{grad.background}</p>

                    {grad.company &&
                      (grad.companyUrl ? (
                        <a href={grad.companyUrl} target="_blank" rel="noopener noreferrer" className={styles.company}>
                          <Building2 size={16} aria-hidden="true" />
                          {grad.company}
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </a>
                      ) : (
                        <span className={styles.company}>
                          <Building2 size={16} aria-hidden="true" />
                          {grad.company}
                        </span>
                      ))}

                    <p className={styles.story}>{grad.story}</p>

                    {grad.quote && (
                      <blockquote className={styles.quote}>
                        <p>&ldquo;{grad.quote}&rdquo;</p>
                      </blockquote>
                    )}

                    <ul className={styles.skills} aria-label={`${grad.name} skills`}>
                      {grad.skills.map((skill) => (
                        <li key={skill}>{skill}</li>
                      ))}
                    </ul>

                    {linkedIn && (
                      <a href={linkedIn} target="_blank" rel="noopener noreferrer" className={styles.linkedin}>
                        View LinkedIn profile <ArrowUpRight size={14} aria-hidden="true" />
                      </a>
                    )}

                    <details className={styles.projects}>
                      <summary>
                        <span>{projectsLabel}</span>
                        <span aria-hidden="true">+</span>
                      </summary>
                      <ul>
                        {projects.map((project) => (
                          <li key={project}>{project}</li>
                        ))}
                      </ul>
                    </details>
                  </div>
                </article>
              </Reveal>
            );
          })}

          <Reveal className={styles.note}>
            <p>
              These are some of our graduates, not all of them. Many others have completed the programme and been
              placed, but not everyone has a photo to share or wants to be featured online.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={styles.closing} aria-labelledby="alumni-closing">
        <div className={styles.container}>
          <Reveal>
            <p className={styles.eyebrow}>Cohort 4 begins in January</p>
            <h2 id="alumni-closing">
              Your story starts <em>at the gate.</em>
            </h2>
            <div className={styles.closingBottom}>
              <p>
                Every one of these graduates started with little or no professional AI experience. The only thing that
                changed was stepping through the gate.
              </p>
              <div className={styles.actions}>
                <Link href="/apply?track=learner" className={styles.button}>
                  Apply as a learner <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
                <Link href="/apply?track=intern" className={styles.textLink}>
                  Apply as an intern <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </MarketingShell>
  );
}
