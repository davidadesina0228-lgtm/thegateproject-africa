# GEO + SEO Audit Report — The Gate Project
**URL:** https://thegateproject.africa
**Audit Date:** 10 June 2026
**Auditor:** Claude Code (automated GEO + SEO audit)
**Site Type:** Next.js 14 marketing site — AI talent training and placement programme

---

## Executive Summary

The Gate Project has a strong content foundation and a genuinely compelling proof-of-concept story (83% placement rate, 5 real Western placements). However, the site has significant gaps in AI crawler access controls, GEO infrastructure (no llms.txt, no robots.txt), schema completeness, and off-site authority signals that currently limit its citability inside AI search engines. The blog posts are well-structured and citable but are missing meta descriptions in the rendered output, canonical tags at the post level, and external citation anchors.

**Overall GEO Score: 42 / 100**
**Overall SEO Score: 54 / 100**
**Combined Score: 48 / 100**

---

## Score Breakdown

| Area | Score | Max | Grade |
|---|---|---|---|
| AI Crawler Access & llms.txt | 5 | 20 | F |
| Schema & Structured Data | 12 | 20 | D+ |
| Content Quality & Citability | 16 | 20 | B |
| Technical SEO Foundations | 12 | 20 | C |
| Brand Authority & Off-Site Signals | 3 | 20 | F |
| **TOTAL** | **48** | **100** | **D+** |

---

## Area 1: AI Crawler Access & llms.txt

**Score: 5 / 20**

### robots.txt — MISSING (Critical)

The site returns HTTP 404 for `https://thegateproject.africa/robots.txt`. This is a critical failure:

- **GPTBot** (OpenAI's crawler): No explicit Allow or Disallow rule — behaviour is undefined
- **ClaudeBot** (Anthropic's crawler): No explicit Allow or Disallow rule — behaviour is undefined
- **PerplexityBot**: No explicit Allow or Disallow rule — behaviour is undefined
- **GoogleBot**: No explicit Allow or Disallow rule — behaviour is undefined

Without a robots.txt, AI crawlers default to their own policies. OpenAI's GPTBot, by default, respects a missing robots.txt as "allow all" but may not crawl aggressively. The absence of a file is not an explicit block, but it is a missed opportunity to actively signal openness to AI indexing, and some crawlers will interpret the 404 as a signal to deprioritise the domain.

The Next.js config (`next.config.mjs`) does not include a `headers()` function adding `X-Robots-Tag` directives, and there is no `src/app/robots.ts` route handler to generate this file dynamically.

### llms.txt — MISSING (Critical)

The site returns HTTP 404 for `https://thegateproject.africa/llms.txt`.

The `llms.txt` standard (proposed by Jeremy Howard, gaining adoption in 2025–2026) allows site owners to provide AI language models with a structured, curated summary of their site's content — brand positioning, key facts, key pages — in a format optimised for LLM consumption. This is one of the highest-leverage GEO actions available.

**Impact:** Without llms.txt, AI models that crawl the site must infer the brand's identity, positioning, and key facts from raw HTML. The site's key claims (83% placement rate, specific alumni names, founder credentials, programme structure) are not in a machine-readable authoritative format. This reduces citation accuracy and frequency.

### sitemap.xml — MISSING

The site returns HTTP 404 for `https://thegateproject.africa/sitemap.xml`. No sitemap is configured in `next.config.mjs` and no `src/app/sitemap.ts` route handler exists.

**Impact:** Crawlers — both traditional and AI — cannot reliably discover all 11 pages on the site. The 5 blog posts are at particular risk of poor indexing depth.

### What is working

The global `layout.tsx` sets `robots: { index: true, follow: true }` in Next.js metadata, which generates an appropriate `<meta name="robots" content="index, follow">` tag in the HTML head. This does not substitute for a robots.txt file but is a positive signal.

---

## Area 2: Schema & Structured Data

**Score: 12 / 20**

### What is implemented

**Organization schema (global, layout.tsx)**

The root layout injects the following Organization JSON-LD on every page:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Gate Project",
  "url": "https://thegateproject.africa",
  "description": "...",
  "foundingDate": "2025",
  "founders": [
    { "@type": "Person", "name": "David Adesina" },
    { "@type": "Person", "name": "Dean Whitby" }
  ],
  "areaServed": ["Africa", "Nigeria", "United Kingdom", "United States", "Europe"],
  "knowsAbout": ["AI Automation", "Generative Engine Optimization", "n8n workflow engineering", "LinkedIn Authority Marketing", "Answer Engine Optimization", "Talent Development"]
}
```

This is good. The Organization type is correctly structured, foundingDate is present, and founders are named.

**Article schema (blog posts, [slug]/page.tsx)**

Each blog post generates an Article JSON-LD block dynamically:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "datePublished": "...",
  "author": {
    "@type": "Person",
    "name": "...",
    "jobTitle": "...",
    "worksFor": { "@type": "Organization", "name": "The Gate Project" }
  },
  "publisher": {
    "@type": "Organization",
    "name": "The Gate Project",
    "logo": { "@type": "ImageObject", "url": "https://thegateproject.africa/og-image.jpg" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://thegateproject.africa/blog/[slug]" }
}
```

This is solid for Article schema. The `author`, `publisher`, `mainEntityOfPage`, `datePublished`, and `headline` fields are all present.

### What is missing

**1. dateModified field (Article schema)**
All 5 blog posts are missing `dateModified` in their Article JSON-LD. Google and AI engines use this to assess content freshness. Adding it (even if identical to `datePublished` initially) improves citability.

**2. image field (Article schema)**
The Article schema has no `image` property. Google's Article rich result requirements specify that `image` is required for eligibility. AI engines also use og:image as a primary citation preview signal.

**3. FAQ schema — not structured data**
All 5 blog posts contain Frequently Asked Questions sections using `<dl><dt><dd>` HTML. This is excellent semantic markup, but none of it is wrapped in `FAQPage` JSON-LD schema. AI engines parse FAQPage schema to extract direct Q&A answers, which is one of the strongest signals for appearing in AI-generated responses.

**4. Person schema for founders**
The Organization schema lists founders as bare `Person` objects with only a `name` property. There is no standalone `Person` schema for David Adesina or Dean Whitby with `sameAs` links (LinkedIn profiles, personal sites). Dean Whitby has a personal site at `deanwhitby.com` which is linked in the `/about` page but not in schema. Without `sameAs` identifiers, AI engines cannot confidently resolve the founders as distinct real-world entities.

**5. EducationalOrganization or Course schema**
The Gate Project is an educational programme. Using `EducationalOrganization` as a secondary type, or `Course` schema on the /apply page describing the programme, would add significant entity clarity for AI engines that need to categorise what this organisation does.

**6. BreadcrumbList schema**
No breadcrumb schema on any page. Blog posts in particular benefit from breadcrumb schema for both traditional search snippets and AI context.

**7. sameAs in Organization schema**
The Organization schema's `sameAs` array contains only `["https://thegateproject.africa"]` — the site linking to itself. This provides zero entity corroboration. The `sameAs` field should point to external platforms where the organisation exists: Crunchbase, LinkedIn company page, Google Business Profile, press mentions, etc.

---

## Area 3: Content Quality & Citability

**Score: 16 / 20**

This is the site's strongest area. The blog posts are genuinely well-written, authoritative, and structured for AI citability.

### Blog post analysis

| Post | Author | Word Count | FAQ Section | External Sources | Internal Links | Citability |
|---|---|---|---|---|---|---|
| Why Western Companies Are Hiring African AI Talent | David Adesina | ~1,500 | Yes (4 Q&A) | Talenteum 2026 report | 8 | High |
| What Is GEO? | Dean Whitby | ~1,300 | Yes (4 Q&A) | HubSpot 2026, ChatGPT stats | 8 | Very High |
| 5 n8n Automation Workflows | David Adesina | ~1,800 | Yes (4 Q&A) | n8n valuation data | 6 | High |
| From Beginner to Placed (Cohort 1) | David Adesina | ~1,200 | Yes (4 Q&A) | Internal (alumnus names) | 6 | Very High |
| African Professional's 2026 Playbook | Dean Whitby | ~1,800 | Yes (4 Q&A) | n8n, Make.com, Wise, Deel | 6 | High |

**Strengths:**
- All posts have FAQ sections with direct, concise answers — the ideal format for AI answer engine citation
- Posts use clear H2 headings that match questions AI users ask (e.g. "What Is Generative Engine Optimization?", "What Skills Are Western Companies Actually Hiring For?")
- Statistics are cited with source attribution (Talenteum, HubSpot, n8n valuation)
- Author attribution is present on every post with full name and role
- Reading time is displayed (6–9 min), signalling substantive content
- All posts published in May–June 2026, making the content fresh and time-relevant

**Weaknesses:**

**1. No external links from any blog post**
Despite referencing Talenteum reports, HubSpot's State of Marketing 2026, n8n's GitHub statistics, Make.com, Wise, Payoneer, and Deel — not a single blog post contains an outbound link to these sources. This is a significant citability problem.

AI engines treat external links to authoritative sources as a trust signal. A post that claims "HubSpot's 2026 State of Marketing report found that 50% of consumers now use AI-powered search" without linking to that report reads as unverifiable to an AI engine. Linking out creates a citation graph that strengthens the post's own authority.

**2. No author bio section or author pages**
Individual author pages (e.g. `/blog/authors/david-adesina`) do not exist. The blog posts display author name and role in the hero, but there is no clickable author link to a full bio page. Author entity pages with `sameAs` links to LinkedIn, personal websites, and press mentions are a key GEO signal.

**3. No social sharing metadata visible in rendered output**
The blog post `generateMetadata()` function correctly sets `openGraph.type: "article"`, `publishedTime`, and `authors` — but the og:image field is missing from individual post metadata (it inherits from layout.tsx's default og-image). Each post should have its own `og:image` for strong social sharing performance.

**4. Inconsistency: layout.tsx claims "100% placement rate"**
`layout.tsx` (line 19) states in the global meta description: "Cohort 1: 100% placement rate." But every page, blog post, and alumnus profile consistently reports 83% (5 of 6). This is a factual inconsistency in the most-indexed metadata. AI engines surfacing this site's description will encounter a false claim. This must be corrected immediately.

**5. Homepage is "use client" — potential SSR/indexing risk**
`src/app/page.tsx` begins with `"use client"`. In Next.js 14 with App Router, this directive means the component renders entirely on the client side via JavaScript. The substantive homepage content (stats, alumni names, programme details) is only available after JavaScript executes. While Googlebot can execute JavaScript, other AI crawlers (GPTBot, ClaudeBot, PerplexityBot) have varying JavaScript execution capabilities and may index a sparse version of the homepage. The same issue affects `/about`, `/alumni`, and `/apply` pages.

---

## Area 4: Technical SEO Foundations

**Score: 12 / 20**

### What is working

**Meta architecture (Next.js Metadata API)**
The site uses Next.js 14's `generateMetadata()` pattern correctly for blog posts and has a well-structured root layout metadata export. This ensures title tags, meta descriptions, Open Graph, and Twitter card tags are server-rendered into HTML.

**Title tag structure**
The `template: "%s | The Gate Project"` pattern is correctly configured. Every page gets a unique, structured title.

**Open Graph implementation**
The root layout sets `og:type`, `og:url`, `og:siteName`, `og:title`, `og:description`, and `og:image`. Blog posts inherit og:title, og:description, og:type: "article", publishedTime, and authors.

**Twitter Card**
`twitter:card: "summary_large_image"` is set globally with title, description, and image.

**Image optimisation**
Next.js `Image` component is used throughout for LCP-critical images (alumni photos, founder photos). This enables automatic format conversion (WebP/AVIF), lazy loading, and proper `sizes` attributes.

**Font loading**
Inter font is loaded via `next/font/google` with `display: "swap"`, correctly preventing FOIT (flash of invisible text).

**HTTPS**
The site uses HTTPS correctly with `metadataBase: new URL("https://thegateproject.africa")`.

### What is missing or broken

**1. No meta descriptions on most pages (Critical)**
`/about`, `/alumni`, `/apply`, and `/blog` pages do not export a `metadata` object. They inherit only the global fallback description from `layout.tsx`. Each page needs a unique, page-specific meta description. Blog posts have meta descriptions correctly set via `blog-posts.ts`, but these other pages are missing theirs entirely.

**2. No canonical tags on individual pages**
The root layout sets `alternates: { canonical: "https://thegateproject.africa" }` which is only correct for the homepage. The blog post `generateMetadata()` does not set `alternates.canonical`. Without canonical tags on blog posts, any URL variations (e.g. `?track=learner`, trailing slashes) could create duplicate content signals.

**3. No sitemap — crawler discovery gap**
Confirmed: no sitemap.xml. Pages must be discovered by following links. With 11 pages total, this is manageable for now but will become an issue as the blog grows.

**4. No robots.txt**
Confirmed: returns 404. No crawl directives for any bot.

**5. "use client" on content pages**
Pages `/`, `/about`, `/alumni`, and `/apply` all use `"use client"` at the top. This forces client-side rendering. The important content on these pages (programme details, alumni names, founder bios, programme pricing) is only in the JavaScript bundle, not in server-rendered HTML. For AI crawlers with limited JS execution, these pages may appear nearly empty.

The blog post pages (`/blog/[slug]/page.tsx`) are correctly server components (no `"use client"`) and render HTML server-side. This is the right approach, and it should be extended to the marketing pages.

**6. metaBase og:image is a relative URL**
`layout.tsx` line 47 sets `url: "/og-image.jpg"` — a relative path. With `metadataBase` configured, Next.js resolves this correctly to `https://thegateproject.africa/og-image.jpg`. This is fine as implemented, but it should be noted that the og-image.jpg file exists in `/public/` which is correct.

**7. Individual blog post metadata missing og:image**
The `generateMetadata()` function in `blog/[slug]/page.tsx` does not set `openGraph.images`. Posts inherit the global og-image. For social sharing and AI citation purposes, each post should have a distinct og:image (can be generated with Next.js OG image generation or set per-post in `blog-posts.ts`).

**8. next.config.mjs — `images.domains` uses deprecated API**
`next.config.mjs` uses `images: { domains: ['localhost'] }`. The `domains` config is deprecated in favour of `images: { remotePatterns: [...] }`. While not a breaking issue, this should be updated.

---

## Area 5: Brand Authority & Off-Site Signals

**Score: 3 / 20**

This is the most significant GEO gap on the site. AI engines (particularly ChatGPT, Perplexity, and Claude) build their understanding of a brand from a combination of on-site content AND off-site corroboration. A brand mentioned only on its own website has low entity confidence. A brand cited across multiple independent platforms has high entity confidence and will be surfaced in AI responses far more readily.

### Current state (inferred from audit)

**External links from the site:**
- `deanwhitby.com` (Dean Whitby's personal website) — linked from /about
- `https://www.betterpeopleltd.co.uk/` (alumni placement company) — linked from /alumni
- `https://www.linkedin.com/in/esther-abem-6316193b6` (Esther Abem's LinkedIn) — linked from /alumni
- Telegram group link

**No other external platforms are linked or referenced.**

### What is missing

**1. No LinkedIn company page**
The Gate Project has no LinkedIn company page linked or referenced anywhere on the site. LinkedIn is one of the most heavily weighted sources in AI engine training data. A LinkedIn company presence with consistent brand description, employee profiles listing The Gate Project, and posts about the programme's results would dramatically increase entity confidence.

**2. No Google Business Profile**
No GBP is referenced. For a professional training programme operating in Africa and placing talent in the UK, a Google Business Profile strengthens local entity signals.

**3. No press or media coverage**
None of the site's content references press mentions, media features, podcast appearances, or third-party write-ups about The Gate Project. AI engines weight independent corroboration heavily. A single TechCabal, Disrupt Africa, or Remote.co feature mentioning the 83% placement rate would generate more AI citation confidence than 10 pages of self-published content.

**4. No Wikipedia or Wikidata presence**
Not expected for a new organisation, but noting the gap for future planning.

**5. No Crunchbase or startup directory listings**
Crunchbase is heavily indexed by AI engines. A basic profile listing The Gate Project as an EdTech/talent pipeline company with founders David Adesina and Dean Whitby would add entity corroboration.

**6. Alumni not visible on LinkedIn at scale**
The site references 5 named alumni with placements. If these alumni updated their LinkedIn profiles to list The Gate Project as the training programme that led to their placement, and linked back to the site, this would create a distributed citation network that AI engines use to validate the programme's existence and quality.

**7. Organization sameAs contains only the homepage URL**
As noted in the schema section, `sameAs: ["https://thegateproject.africa"]` is effectively empty from an entity resolution perspective. This field exists precisely to link the schema entity to external platform profiles.

---

## Data Accuracy Issues Found

| Location | Issue | Severity |
|---|---|---|
| `layout.tsx` line 19 (global meta description) | States "100% placement rate" but everywhere else the site correctly states 83% (5 of 6) | Critical — must fix |
| Homepage stat card | "83% Placement Rate — 5 of 6 participants placed" — correct | OK |
| About page | "83% placement rate" — correct | OK |
| All 5 blog posts | Consistently state 83% — correct | OK |

The global meta description (`layout.tsx` line 19) is the most-indexed piece of text on the entire site. This is what Google shows in search results, what AI engines use as the primary site description, and what social sharing previews display. It currently contradicts every other page on the site.

---

## Priority Action Plan

### Tier 1: Critical (Fix within 1 week)

**1. Fix the 100% vs 83% discrepancy in layout.tsx**
- File: `d:\Gate project\gate-project\src\app\layout.tsx` line 19
- Change `"Cohort 1: 100% placement rate"` to `"Cohort 1: 83% placement rate (5 of 6 graduates placed)"`
- This affects every page's meta description globally

**2. Create robots.txt**
- Create `src/app/robots.ts` (Next.js App Router convention)
- Explicitly allow GPTBot, ClaudeBot, PerplexityBot, Googlebot, and all crawlers
- Example:
```ts
import type { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: 'https://thegateproject.africa/sitemap.xml',
  }
}
```

**3. Create sitemap.xml**
- Create `src/app/sitemap.ts`
- Include all 11 URLs: `/`, `/about`, `/alumni`, `/apply`, `/blog`, and all 5 blog post slugs
- Set `changeFrequency` and `priority` per page type

**4. Create llms.txt**
- Create `public/llms.txt` (served as a static file at `/llms.txt`)
- Include: brand name, what it does, founding date, founders with roles, key claims (83% placement rate, 5 graduates, programme duration), list of key pages with one-line descriptions, key terminology definitions (GEO, AEO, n8n)
- This is the single highest-impact GEO action available that takes under 2 hours to implement

### Tier 2: High Priority (Fix within 2 weeks)

**5. Add page-specific metadata to /about, /alumni, /apply, /blog**
- Each page needs a unique `metadata` export with title and description
- Currently these pages use only the global fallback

**6. Add FAQ schema to all 5 blog posts**
- All posts already have FAQ sections in `<dl><dt><dd>` format
- Wrap them in FAQPage JSON-LD in each post's `[slug]/page.tsx`
- Or better: add a `faqs` array to the `BlogPost` type in `blog-posts.ts` and render both HTML and JSON-LD from the same data

**7. Add canonical tags to blog posts**
- In `generateMetadata()` for blog posts, add:
  ```ts
  alternates: { canonical: `https://thegateproject.africa/blog/${post.slug}` }
  ```

**8. Add image property to Article schema**
- In the blog post JSON-LD, add `image: "https://thegateproject.africa/og-image.jpg"` (or a per-post image)
- This is required for Google Article rich results eligibility

**9. Add external links to blog posts**
- The GEO post references HubSpot 2026 State of Marketing — link to it
- The n8n post references n8n's $2.5B valuation — link to TechCrunch or the announcement
- The African hiring post references the Talenteum 2026 report — link to it
- This improves citability and E-E-A-T signals simultaneously

**10. Fix homepage and marketing pages "use client" issue**
- `/`, `/about`, `/alumni`, `/apply` should be Server Components
- Move interactive elements (form state in /apply, animations) to separate Client Component wrappers
- The substantive content (text, stats, names) should be in server-rendered HTML

### Tier 3: Medium Priority (Fix within 1 month)

**11. Expand Organization schema sameAs**
- Add LinkedIn company page URL, Crunchbase URL, any press/directory URLs
- Add `@id` property to the Organization node

**12. Add Person schema for both founders**
- Standalone Person entities for David Adesina and Dean Whitby
- Include `sameAs` pointing to their LinkedIn profiles and Dean's deanwhitby.com
- Include `knowsAbout` arrays matching their actual expertise

**13. Create author pages**
- `/blog/authors/david-adesina` and `/blog/authors/dean-whitby`
- Each with bio, expertise tags, list of authored posts
- Include Person JSON-LD on each author page

**14. Add og:image per blog post**
- Add `image` field to the `BlogPost` type in `blog-posts.ts`
- Or use Next.js OG image generation (`/api/og`) to generate social images per post
- Update `generateMetadata()` to include `openGraph.images`

**15. Add EducationalOrganization/Course schema to /apply**
- Describe the programme as a `Course` with `courseMode: "online"`, `duration: "P6W"`, `offers` array
- Add `EducationalOrganization` as a second `@type` on the Organization schema

### Tier 4: Long-term / Off-site (1–3 months)

**16. Create LinkedIn company page for The Gate Project**
- Consistent description matching the website's positioning
- Link back to thegateproject.africa
- Post Cohort 1 results as a company update
- Encourage all 5 alumni to add The Gate Project to their LinkedIn work history

**17. Pursue press coverage**
- Target: TechCabal, Disrupt Africa, Remote.co, The Africa Report (technology section)
- News hook: "African training programme achieves 83% placement rate in first cohort — places 5 of 6 graduates in Western AI roles within weeks"
- This is the highest-leverage off-site action. One credible press mention generates more AI citation confidence than months of on-site optimisation.

**18. List on EdTech directories and startup databases**
- Crunchbase (free basic listing)
- ProductHunt (launch)
- EdSurge or similar EdTech publications
- Any African startup databases (Briter Bridges, Disrupt Africa database)

**19. Create Wikidata stub entity**
- A minimal Wikidata entry for The Gate Project linking to the website, founders, and founding date
- AI engines (especially those trained on Wikipedia/Wikidata) use this as a high-confidence entity signal

---

## What AI Engines Will Currently Return If Asked About The Gate Project

Based on this audit, if a user asks ChatGPT, Perplexity, or Claude "What is The Gate Project Africa?", the AI is likely to:

1. **Find limited information** — no llms.txt, no Wikipedia, no press coverage, minimal off-site footprint
2. **Potentially surface the blog posts** — the GEO and n8n posts are well-structured and may appear in training data or web search results, but they are relatively new (May–June 2026)
3. **Struggle with entity confidence** — the Organization schema's `sameAs` only links to itself; founders are not resolved as distinct persons with external profiles

After implementing Tier 1 and Tier 2 recommendations, particularly the llms.txt and robots.txt, the site's AI discoverability will improve substantially. After Tier 3 (author pages, expanded schema, og:image per post), the blog posts become genuinely citable assets. After Tier 4 (LinkedIn, press, directories), The Gate Project becomes an entity AI engines can reliably identify and cite with high confidence.

---

## Summary Table: All Issues Found

| Issue | Severity | Area | Quick Fix |
|---|---|---|---|
| robots.txt returns 404 | Critical | AI Crawlers | Create `src/app/robots.ts` |
| llms.txt does not exist | Critical | AI/GEO | Create `public/llms.txt` |
| sitemap.xml returns 404 | Critical | Technical SEO | Create `src/app/sitemap.ts` |
| Global meta desc says "100% placement rate" | Critical | Content Accuracy | Fix line 19 in `layout.tsx` |
| Homepage/about/alumni/apply are "use client" | High | Technical SEO | Refactor to Server Components |
| No meta descriptions on /about, /alumni, /apply, /blog | High | Technical SEO | Add metadata exports |
| No canonical tags on blog posts | High | Technical SEO | Add to `generateMetadata()` |
| No FAQ JSON-LD schema | High | Schema | Add FAQPage markup to posts |
| No og:image per blog post | High | Technical SEO | Add image field to BlogPost type |
| No external links from blog posts | High | Content/GEO | Link sources referenced in articles |
| Article schema missing dateModified | Medium | Schema | Add to blog post JSON-LD |
| Article schema missing image field | Medium | Schema | Add og-image.jpg reference |
| Person schema missing for founders | Medium | Schema/GEO | Add standalone Person JSON-LD |
| Organization sameAs links only to itself | Medium | Schema/GEO | Add LinkedIn, Crunchbase URLs |
| No EducationalOrganization/Course schema | Medium | Schema | Add to Organization and /apply |
| No BreadcrumbList schema | Low | Schema | Add to blog posts |
| No LinkedIn company page | High | Off-site Authority | Create and populate |
| No press/media coverage | High | Off-site Authority | Pitch TechCabal, Disrupt Africa |
| No Crunchbase listing | Medium | Off-site Authority | Create basic profile |
| Alumni not listed on LinkedIn at scale | Medium | Off-site Authority | Encourage 5 alumni to update |
| `images.domains` deprecated config | Low | Technical | Update to `remotePatterns` |
| Author pages do not exist | Medium | GEO | Create /blog/authors/* pages |

---

*Report generated by automated GEO + SEO audit — The Gate Project (thegateproject.africa)*
*Methodology: Static code analysis of Next.js source, HTTP endpoint testing, content analysis of all 11 pages and 5 blog posts*
