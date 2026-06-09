import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SiteNav } from "@/components/marketing/SiteNav";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Blog | The Gate Project",
  description:
    "Insights on AI automation, GEO, n8n workflows, and how African professionals are landing remote roles at Western companies.",
  openGraph: {
    title: "Blog | The Gate Project",
    description:
      "Insights on AI automation, GEO, n8n workflows, and how African professionals are landing remote roles at Western companies.",
  },
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

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SiteNav />

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(212,175,55,0.09),transparent_65%)]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/25 rounded-full text-gold text-xs font-semibold tracking-widest uppercase mb-8">
              The Gate Project Blog
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight mb-6">
              Insights on AI, GEO,
              <br />
              and African Talent
            </h1>
            <p className="text-lg text-secondary leading-relaxed max-w-2xl">
              Practical writing on AI automation, Generative Engine Optimization, n8n workflows, and how
              African professionals are building careers at Western companies.
            </p>
          </div>
        </div>
      </section>

      {/* Featured post */}
      <section className="px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/30 transition-all"
          >
            <div className="grid lg:grid-cols-2">
              <div className="h-56 lg:h-auto bg-gradient-to-br from-gold/10 via-background to-surface flex items-center justify-center p-12 border-b lg:border-b-0 lg:border-r border-border">
                <div className="text-gold/20 font-black text-[120px] leading-none select-none">
                  01
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-5">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[tag] ?? "bg-secondary/10 text-secondary border-secondary/20"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4 group-hover:text-gold transition-colors">
                  {featured.title}
                </h2>
                <p className="text-secondary leading-relaxed mb-6">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-secondary">
                    <span>{featured.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featured.readTime}
                    </span>
                    <span>{formatDate(featured.publishedAt)}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-gold text-sm font-bold group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Post grid */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-xl font-black text-white">More articles</h2>
            <span className="text-secondary text-sm">{rest.length} articles</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-surface border border-border rounded-2xl p-7 hover:border-gold/30 transition-all flex flex-col"
              >
                <div className="flex flex-wrap gap-2 mb-5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagColors[tag] ?? "bg-secondary/10 text-secondary border-secondary/20"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-black text-white leading-snug mb-3 group-hover:text-gold transition-colors flex-1">
                  {post.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 text-xs text-secondary">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <span className="text-gold text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-8 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
            Ready to apply?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight mb-6">
            Reading about it is step one.
            <br />
            Doing it is how you get placed.
          </h2>
          <p className="text-secondary leading-relaxed mb-8 max-w-xl mx-auto">
            Cohort 2 applications are open. Six weeks of training, a real portfolio, and a direct shot at Western
            placement.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold px-8 py-4 rounded-xl transition-all shadow-xl shadow-gold/20"
          >
            Apply for Cohort 2
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
