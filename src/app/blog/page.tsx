import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import { Reveal } from "@/components/marketing/HomeMotion";
import styles from "./journal.module.css";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | The Gate Project",
  description:
    "Insights on AI automation, GEO, n8n workflows, and how African professionals are landing remote roles at Western companies.",
  alternates: { canonical: "https://thegateproject.africa/blog" },
  openGraph: {
    title: "Blog | The Gate Project",
    description:
      "Insights on AI automation, GEO, n8n workflows, and how African professionals are landing remote roles at Western companies.",
    url: "https://thegateproject.africa/blog",
    images: [{ url: "https://thegateproject.africa/og-image.jpg", width: 1200, height: 630 }],
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <MarketingShell>
      <div className={styles.journal}>
        <section className={`${styles.container} ${styles.hero}`} aria-labelledby="journal-title">
          <p className={styles.eyebrow}>The journal / Ideas into practice</p>
          <h1 id="journal-title">Insights on AI, GEO,<br /><em>and African talent.</em></h1>
          <p className={styles.lead}>Practical writing on AI automation, Generative Engine Optimization, n8n workflows, and how African professionals are building careers at Western companies.</p>
        </section>

        <section className={styles.container} aria-label="Featured article">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className={styles.featured}>
              <div className={styles.featureImage}>
                <Image src="/founders/david.jpg" alt="David Adesina, co-founder and author" fill priority sizes="(max-width: 700px) 88vw, 40vw" />
                <span className={styles.imageCaption}>From the desk of David Adesina</span>
              </div>
              <div className={styles.featureCopy}>
                <p className={styles.eyebrow}>The latest / 01</p>
                <div className={styles.tags}>{featured.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className={styles.meta}><span>{featured.author}</span><span><Clock size={14} aria-hidden="true" />{featured.readTime}</span><time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time></div>
                <span className={styles.featureRead}>Read the article <ArrowUpRight size={20} aria-hidden="true" /></span>
              </div>
            </Link>
          </Reveal>
        </section>

        <section className={`${styles.container} ${styles.articles}`} aria-labelledby="more-articles">
          <div className={styles.sectionLabel}><h2 id="more-articles">More from the journal</h2><span>{rest.length} articles</span></div>
          <div className={styles.articleGrid}>
            {rest.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 2) * 80}>
                <Link href={`/blog/${post.slug}`} className={styles.articleLink}>
                  <div className={styles.articleTop}><span className={styles.articleNumber}>{String(index + 2).padStart(2, "0")}</span><ArrowUpRight size={22} aria-hidden="true" /></div>
                  <div className={styles.tags}>{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <div className={styles.meta}><span>{post.author}</span><span><Clock size={14} aria-hidden="true" />{post.readTime}</span></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.callToAction} aria-labelledby="journal-cta-title">
          <div className={styles.container}>
            <Reveal>
              <p className={styles.eyebrow}>Your next chapter / Cohort 4</p>
              <h2 id="journal-cta-title">Take what you learn.<br /><em>Build something real.</em></h2>
              <div className={styles.ctaBottom}><p>Cohort 4 begins in January and applications are open. Six weeks of training, a real portfolio, and support connecting with international companies.</p><Link href="/apply" className={styles.button}>Apply for Cohort 4 <ArrowUpRight size={18} aria-hidden="true" /></Link></div>
            </Reveal>
          </div>
        </section>
      </div>
    </MarketingShell>
  );
}
