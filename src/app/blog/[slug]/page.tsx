import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, Clock, Calendar, User } from "lucide-react";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
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
      modifiedTime: post.publishedAt,
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

const tagColors: Record<string, string> = {
  "AI Hiring": "bg-blue-500/10 text-blue-400 border-blue-400/20",
  "African Talent": "bg-green-500/10 text-green-400 border-green-400/20",
  "Remote Work": "bg-purple-500/10 text-purple-400 border-purple-400/20",
  GEO: "bg-gold/10 text-gold border-gold/20",
  SEO: "bg-gold/10 text-gold border-gold/20",
  "AI Search": "bg-gold/10 text-gold border-gold/20",
  n8n: "bg-orange-500/10 text-orange-400 border-orange-400/20",
  "AI Automation": "bg-orange-500/10 text-orange-400 border-orange-400/20",
  Skills: "bg-orange-500/10 text-orange-400 border-orange-400/20",
  "Gate Project": "bg-gold/10 text-gold border-gold/20",
  Alumni: "bg-green-500/10 text-green-400 border-green-400/20",
  "AI Careers": "bg-blue-500/10 text-blue-400 border-blue-400/20",
  Career: "bg-purple-500/10 text-purple-400 border-purple-400/20",
  Guide: "bg-secondary/10 text-secondary border-secondary/20",
};

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
    dateModified: post.publishedAt,
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
    <main className="min-h-screen bg-background overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteNav />

      {/* Post hero */}
      <section className="relative pt-36 pb-16 px-6 lg:px-8 overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(212,175,55,0.07),transparent_60%)]" />
        <div className="max-w-3xl mx-auto relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-secondary hover:text-white text-sm mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All articles
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[tag] ?? "bg-secondary/10 text-secondary border-secondary/20"}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-white mb-6">
            {post.title}
          </h1>
          <p className="text-lg text-secondary leading-relaxed mb-8">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-secondary border-t border-border pt-6">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-white font-medium">{post.author}</span>
              <span className="text-secondary">&mdash; {post.authorRole}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Post body */}
      <section className="px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto blog-content">
          <PostContent />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-3xl mx-auto">
          <div className="bg-surface border border-gold/20 rounded-2xl p-8 lg:p-10">
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-4 block">
              The Gate Project — Cohort 2
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4">
              Ready to build the skills this article describes?
            </h2>
            <p className="text-secondary leading-relaxed mb-6">
              The Gate Project is a 6-week AI training and placement programme. We teach AI automation, GEO, n8n
              workflows, and LinkedIn authority — then connect graduates directly with Western companies. Cohort 2
              applications are open.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-7 py-3.5 rounded-xl transition-all shadow-lg shadow-gold/20"
            >
              Apply Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="px-6 lg:px-8 pb-24 border-t border-border pt-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-black text-white mb-8">Keep reading</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-surface border border-border rounded-xl p-6 hover:border-gold/30 transition-all"
                >
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagColors[tag] ?? "bg-secondary/10 text-secondary border-secondary/20"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-white font-bold text-sm leading-snug mb-2 group-hover:text-gold transition-colors">
                    {p.title}
                  </h3>
                  <span className="text-gold text-xs font-bold flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  );
}
