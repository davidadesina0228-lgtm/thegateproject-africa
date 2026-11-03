import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import { MarketingShell } from "@/components/marketing/MarketingShell";
import styles from "../journal.module.css";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const canonicalUrl = `https://thegateproject.africa/blog/${slug}`;
  return {
    title: `${post.title} | The Gate Project`,
    description: post.metaDescription,
    authors: [{ name: post.author }],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author],
      url: canonicalUrl,
      images: [
        {
          url: "https://thegateproject.africa/og-image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: ["https://thegateproject.africa/og-image.jpg"],
    },
  };
}

const contentMap: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "how-to-become-an-ai-automation-specialist-in-africa": () =>
    import("../posts/how-to-become-an-ai-automation-specialist-in-africa"),
  "ai-voice-agents-n8n-vapi-business-use-cases": () =>
    import("../posts/ai-voice-agents-n8n-vapi-business-use-cases"),
  "why-western-companies-are-hiring-african-ai-talent": () =>
    import("../posts/why-western-companies-are-hiring-african-ai-talent"),
  "what-is-geo-generative-engine-optimization-2026": () =>
    import("../posts/what-is-geo-generative-engine-optimization-2026"),
  "n8n-automation-workflows-companies-pay-for": () =>
    import("../posts/n8n-automation-workflows-companies-pay-for"),
  "gate-project-cohort-1-from-beginner-to-placed": () =>
    import("../posts/gate-project-cohort-1-from-beginner-to-placed"),
  "african-professional-guide-to-western-remote-jobs-2026": () =>
    import("../posts/african-professional-guide-to-western-remote-jobs-2026"),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post || !contentMap[slug]) notFound();

  const { default: PostContent } = await contentMap[slug]();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://thegateproject.africa/blog/${post.slug}#article`,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    image: {
      "@type": "ImageObject",
      url: "https://thegateproject.africa/og-image.jpg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      worksFor: {
        "@type": "Organization",
        "@id": "https://thegateproject.africa/#organization",
        name: "The Gate Project",
        url: "https://thegateproject.africa",
      },
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://thegateproject.africa/#organization",
      name: "The Gate Project",
      url: "https://thegateproject.africa",
      logo: {
        "@type": "ImageObject",
        url: "https://thegateproject.africa/og-image.jpg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://thegateproject.africa/blog/${post.slug}`,
    },
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <MarketingShell>
      <div className={styles.journal}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <article>
          <header className={styles.postHero}>
            <div className={styles.readingWidth}>
              <Link href="/blog" className={styles.backLink}><ArrowLeft size={16} aria-hidden="true" />Back to the journal</Link>
              <div className={styles.tags}>{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <h1>{post.title}</h1>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              <div className={styles.byline}>
                <div><strong>{post.author}</strong><span>{post.authorRole}</span></div>
                <div className={styles.meta}><time dateTime={post.publishedAt}><Calendar size={14} aria-hidden="true" />{formatDate(post.publishedAt)}</time><span><Clock size={14} aria-hidden="true" />{post.readTime}</span></div>
              </div>
            </div>
          </header>
          <div className={`${styles.readingWidth} ${styles.postBody} blog-content`}><PostContent /></div>
        </article>

        <aside className={`${styles.readingWidth} ${styles.articleCta}`} aria-labelledby="article-cta-title">
          <p className={styles.eyebrow}>The Gate Project / Cohort 4</p>
          <h2 id="article-cta-title">Put your curiosity<br /><em>to work.</em></h2>
          <p>The Gate Project is a 6-week AI training and placement programme. We teach AI automation, GEO, n8n workflows, and LinkedIn authority, then connect graduates with international companies. Cohort 4 begins in January and applications are open.</p>
          <Link href="/apply" className={styles.button}>Apply now <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </aside>

        {relatedPosts.length > 0 && (
          <section className={`${styles.readingWidth} ${styles.related}`} aria-labelledby="related-title">
            <div className={styles.sectionLabel}><h2 id="related-title">Keep reading</h2><Link href="/blog" className={styles.backLink}>All articles <ArrowUpRight size={16} aria-hidden="true" /></Link></div>
            <div className={styles.relatedGrid}>
              {relatedPosts.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} className={styles.articleLink}>
                  <div className={styles.tags}>{related.tags.slice(0, 2).map(tag => <span key={tag}>{tag}</span>)}</div>
                  <h3>{related.title}</h3>
                  <span className={styles.readLink}>Read the article <ArrowUpRight size={16} aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </MarketingShell>
  );
}
