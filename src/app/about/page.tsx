"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Globe2, Network, Sparkles } from "lucide-react";
import { SiteFooter } from "@/components/marketing/SiteFooter";
import { SiteNav } from "@/components/marketing/SiteNav";

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

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
  {
    title: "AI Automation",
    icon: Bot,
    desc: "Build practical systems that remove repetitive work and turn AI tools into reliable business operations.",
  },
  {
    title: "GEO/AEO",
    icon: Globe2,
    desc: "Learn how brands become discoverable in generative search, answer engines, and AI-assisted buying journeys.",
  },
  {
    title: "LinkedIn Authority",
    icon: Sparkles,
    desc: "Develop profiles, content, and outreach systems that create trust before the first sales conversation.",
  },
  {
    title: "n8n Workflows",
    icon: Network,
    desc: "Design production-ready automations across CRMs, content pipelines, lead systems, and client operations.",
  },
];

const results = [
  { value: "83%", label: "Placement Rate" },
  { value: "5 of 6", label: "Graduates Placed" },
  { value: "3", label: "Countries" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <SiteNav />

      <section className="relative pt-40 pb-28 px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(212,175,55,0.11),transparent_65%)]" />
        <div className="absolute left-1/2 top-20 h-[520px] w-[520px] -translate-x-1/2 rounded-full border border-gold/10" />
        <div className="absolute left-1/2 top-36 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-gold/10" />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/25 rounded-full text-gold text-xs font-semibold tracking-widest uppercase mb-8">
              Built for African talent
            </span>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-8">
              We Built The Gate Because We Knew The Talent Was There
            </h1>
            <p className="text-lg md:text-2xl text-secondary leading-relaxed max-w-3xl mx-auto">
              The missing piece was never ability. It was access, structure, proof, and a direct bridge
              to companies ready to hire skilled African professionals.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-28 px-6 lg:px-8 border-y border-border bg-surface">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              The Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              Train deeply.
              <br />
              Place directly.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6 text-lg text-secondary leading-relaxed"
          >
            <p>
              The Gate Project is a 6-week AI training and placement program connecting
              African professionals with Western companies. Learners build practical skills in
              AI automation, GEO, LinkedIn authority, and workflow engineering.
            </p>
            <p>
              The program is built around market proof. Participants learn the systems companies
              are buying now, create deliverables that demonstrate competence, and enter a placement
              pipeline designed around real hiring needs.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="founders" className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              The Founders
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Two operators building the bridge between skill and opportunity.
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {founders.map((founder, index) => (
              <motion.article
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.7 }}
                className="bg-surface border border-border rounded-2xl overflow-hidden hover:border-gold/30 transition-colors"
              >
                <div className="relative h-80 bg-background">
                  <Image
                    src={founder.photo}
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                </div>
                <div className="p-8 lg:p-10">
                  <h3 className="text-3xl font-black text-white mb-2">{founder.name}</h3>
                  <p className="text-gold text-sm font-semibold tracking-wide mb-6">{founder.role}</p>
                  <p className="text-secondary leading-relaxed mb-7">{founder.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-7">
                    {founder.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium text-secondary bg-background border border-border px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {founder.website && (
                    <a
                      href={founder.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm font-bold transition-colors"
                    >
                      deanwhitby.com
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-8 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mb-14"
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              What We Teach
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Practical AI skills that map to real business demand.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachingAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.6 }}
                className="bg-background border border-border rounded-2xl p-7 hover:border-gold/30 transition-colors"
              >
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                  <area.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="text-white text-lg font-black mb-3">{area.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.85fr_1.15fr] gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-5 block">
              The Results
            </span>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-7">
              Cohort 1 proved the model.
            </h2>
            <p className="text-secondary text-lg leading-relaxed">
              Six professionals enrolled in the first cohort, which began training on March 2nd, 2025.
              Five graduated and were placed across three countries in real AI-first roles.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid sm:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border"
          >
            {results.map((result) => (
              <div key={result.label} className="bg-surface px-8 py-10 text-center">
                <div className="text-4xl md:text-5xl font-black text-gold mb-2">{result.value}</div>
                <div className="text-white font-semibold text-sm">{result.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 lg:px-8 bg-surface border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgba(212,175,55,0.08),transparent)]" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <span className="text-gold text-xs font-semibold tracking-widest uppercase mb-6 block">
            Apply for Cohort 2
          </span>
          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            Ready to build proof the market can see?
          </h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto mb-10">
            Choose the path that fits where you are now. The destination is the same:
            practical skill, real deliverables, and a shot at Western placements.
          </p>
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-black font-bold text-lg px-10 py-5 rounded-xl transition-all shadow-2xl shadow-gold/30 hover:shadow-gold/50 hover:-translate-y-0.5"
          >
            Apply Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      <SiteFooter />
    </main>
  );
}
