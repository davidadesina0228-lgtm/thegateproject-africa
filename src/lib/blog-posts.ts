export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  metaDescription: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  authorRole: string;
  readTime: string;
  tags: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-become-an-ai-automation-specialist-in-africa",
    title: "How to Become an AI Automation Specialist in Africa With No Tech Background",
    excerpt:
      "You don't need a computer science degree to build a career in AI automation. Here is what the job involves, which skills to learn in order, what projects prove you can do it, and how to get placed.",
    metaDescription:
      "Learn how to become an AI automation specialist in Africa without a tech background: the skills, tools like n8n, portfolio projects, and how to get placed in a remote role.",
    publishedAt: "2026-11-03",
    author: "David Adesina",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "7 min read",
    tags: ["AI Automation", "Career", "Guide"],
  },
  {
    slug: "ai-voice-agents-n8n-vapi-business-use-cases",
    title: "AI Voice Agents With n8n and Vapi: 5 Real Business Use Cases",
    excerpt:
      "Voice agents can confirm appointments, qualify leads and check stock without a human on the line. Here is how they work with n8n and Vapi, five use cases our graduates built, and how to make them reliable.",
    metaDescription:
      "How AI voice agents work with n8n and Vapi, plus 5 real business use cases: appointment booking, speed-to-lead calling, stock checks and more, with tips for making them reliable.",
    publishedAt: "2026-11-03",
    author: "David Adesina",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "6 min read",
    tags: ["AI Automation", "n8n", "Voice Agents"],
  },
  {
    slug: "why-western-companies-are-hiring-african-ai-talent",
    title: "Why Western Companies Are Quietly Building Their AI Teams in Africa",
    excerpt:
      "Talent shortages in Europe and North America are pushing global companies toward a continent with a young, skilled, and AI-ready workforce. Here's what's driving the shift — and what it means for African professionals.",
    metaDescription:
      "Western companies are increasingly hiring African AI professionals for remote roles. Discover why Africa is the world's fastest-growing digital talent market and how professionals can position themselves to benefit.",
    publishedAt: "2026-06-05",
    author: "David Adesina",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "6 min read",
    tags: ["AI Hiring", "African Talent", "Remote Work"],
  },
  {
    slug: "what-is-geo-generative-engine-optimization-2026",
    title: "What Is GEO? The Skill That Is Replacing Traditional SEO in 2026",
    excerpt:
      "ChatGPT hit 900 million weekly active users in 2026. When people search for your business, they're increasingly asking an AI — not Google. Generative Engine Optimization is how you show up in those answers.",
    metaDescription:
      "Generative Engine Optimization (GEO) is the practice of making your brand visible in AI-generated search answers. Learn what it is, why it matters more than traditional SEO in 2026, and how to do it.",
    publishedAt: "2026-06-03",
    author: "Dean Whitby",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "7 min read",
    tags: ["GEO", "SEO", "AI Search"],
  },
  {
    slug: "n8n-automation-workflows-companies-pay-for",
    title: "5 n8n Automation Workflows Western Companies Are Actively Paying For",
    excerpt:
      "n8n reached a $2.5 billion valuation in 2025. Businesses that once needed a full operations team now need one skilled automation engineer. These are the five workflows that command real salaries.",
    metaDescription:
      "These 5 n8n automation workflows are in high demand at Western companies in 2026. Learn what they do, how to build them, and how African AI professionals are using these skills to land remote roles.",
    publishedAt: "2026-05-28",
    author: "David Adesina",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "8 min read",
    tags: ["n8n", "AI Automation", "Skills"],
  },
  {
    slug: "gate-project-cohort-1-from-beginner-to-placed",
    title: "From Beginner to Placed: Inside The Gate Project's First Three Cohorts",
    excerpt:
      "Three cohorts. About 25 people trained. More than 15 placements since May. This is the story of how The Gate Project went from a first class in March to a growing network of placed AI specialists.",
    metaDescription:
      "Three cohorts, about 25 people trained and 15+ placements since May. Read how African professionals went from beginner to placed AI automation and GEO specialists at The Gate Project.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-11-03",
    author: "David Adesina",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "5 min read",
    tags: ["Gate Project", "Alumni", "AI Careers"],
  },
  {
    slug: "african-professional-guide-to-western-remote-jobs-2026",
    title: "The African Professional's 2026 Playbook for Landing a Western Remote Role",
    excerpt:
      "The opportunity is real. Western companies are hiring from Nigeria, Kenya, Ghana, and across the continent. But the gap is not talent — it's positioning. Here is the exact playbook to close it.",
    metaDescription:
      "A step-by-step guide for African professionals who want to land remote roles at Western companies in 2026. Covers skills, LinkedIn positioning, proof of work, and the application process.",
    publishedAt: "2026-06-01",
    author: "Dean Whitby",
    authorRole: "Co-Founder, The Gate Project",
    readTime: "9 min read",
    tags: ["Career", "Remote Work", "Guide"],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
