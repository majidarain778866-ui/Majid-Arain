import React, { useEffect, useState } from "react";
import { Article } from "../types";
import { ARTICLES, SERVICES, PROJECTS } from "../data";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Calendar,
  Share2,
  Copy,
  Check,
  CheckCircle2,
  Code2,
  ExternalLink,
  Sparkles,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion } from "motion/react";

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject: (projectId: string) => void;
  onContactClick: (serviceCategory?: string) => void;
}

export default function ArticleDetailPage({
  article,
  onBack,
  onSelectArticle,
  onSelectService,
  onSelectProject,
  onContactClick
}: ArticleDetailPageProps) {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on mount or when article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [article.slug]);

  // Inject Schema.org BlogPosting structured data
  useEffect(() => {
    const scriptId = "article-json-ld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.metaDescription,
      "articleBody": article.sections.map((s) => s.content.join(" ")).join(" "),
      "keywords": article.seoKeywords.join(", "),
      "datePublished": "2026-10-01",
      "author": {
        "@type": "Person",
        "name": article.author.name,
        "jobTitle": article.author.role
      },
      "publisher": {
        "@type": "Organization",
        "name": "MAJID — Digital Architecture",
        "logo": {
          "@type": "ImageObject",
          "url": "https://res.cloudinary.com/dikrzzri0/image/upload/v1783144714/905b2bcb-249d-4bf3-9527-6ddced773b75_ouvukr.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": window.location.href
      }
    };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [article]);

  const currentIndex = ARTICLES.findIndex((a) => a.slug === article.slug);
  const prevArticle = ARTICLES[(currentIndex - 1 + ARTICLES.length) % ARTICLES.length];
  const nextArticle = ARTICLES[(currentIndex + 1) % ARTICLES.length];

  const relatedService = SERVICES.find((s) => s.id === article.relatedServiceId);
  const relatedProject = PROJECTS.find((p) => p.id === article.relatedProjectId);

  const handleCopyCode = (code: string, idx: number) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeIndex(idx);
      setTimeout(() => setCopiedCodeIndex(null), 2000);
    }
  };

  const handleShareLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <article className="relative min-h-screen text-white pt-28 pb-32 px-4 md:px-8 max-w-4xl mx-auto">
      {/* Background radial glow */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full luxury-glow-1 pointer-events-none opacity-25" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] rounded-full luxury-glow-2 pointer-events-none opacity-20" />

      {/* Top Navigation Bar: Breadcrumb + Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel-light hover:border-[#B5121B] text-xs font-mono text-zinc-300 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF1E56] group-hover:-translate-x-1 transition-transform" />
          <span>Return to All Insights</span>
        </button>

        <button
          onClick={handleShareLink}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
        >
          {copiedLink ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Link Copied!
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-[#00F2FE]" /> Share Article
            </>
          )}
        </button>
      </div>

      {/* Article Header & Metadata */}
      <header className="space-y-6 mb-12">
        {/* Zero-Pill Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="text-[#FF6584] font-semibold">{article.category}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>{article.publishedAt}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="flex items-center gap-1 text-zinc-300">
            <Clock className="w-3.5 h-3.5 text-[#00F2FE]" /> {article.readTime}
          </span>
        </div>

        {/* Large Headline */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
          {article.title}
        </h1>

        {/* Lead Excerpt */}
        <p className="text-base md:text-lg text-zinc-300 font-sans font-light leading-relaxed border-l-2 border-[#B5121B] pl-4 py-1">
          {article.excerpt}
        </p>

        {/* Author Bio Card */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <div className="w-10 h-10 rounded-full bg-[#1F080D] border border-[#B5121B]/60 flex items-center justify-center font-display font-bold text-sm text-[#FF6584]">
            M
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-none">{article.author.name}</p>
            <p className="text-xs text-zinc-400 font-mono mt-1">{article.author.role}</p>
          </div>
        </div>
      </header>

      {/* Main Body Sections */}
      <div className="space-y-12 text-zinc-300 font-sans text-sm md:text-base leading-relaxed font-light">
        {article.sections.map((section, sIndex) => (
          <section key={section.subheading} className="space-y-5">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight pt-4">
              {section.subheading}
            </h2>

            {section.content.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-zinc-300 leading-relaxed">
                {paragraph}
              </p>
            ))}

            {/* Code Snippet Box with Copy Affordance */}
            {section.codeSnippet && (
              <div className="my-6 rounded-2xl bg-[#090C14] border border-white/10 overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#121624] border-b border-white/10 text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-[#00F2FE]" />
                    <span className="uppercase text-[10px] tracking-wider font-semibold text-zinc-300">
                      {section.codeSnippet.language}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopyCode(section.codeSnippet!.code, sIndex)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                  >
                    {copiedCodeIndex === sIndex ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-zinc-400" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-zinc-200 leading-relaxed">
                  <code>{section.codeSnippet.code}</code>
                </pre>
              </div>
            )}

            {/* Key Takeaway Callout Box */}
            {section.keyTakeaway && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1F080D] to-[#120608] border border-[#B5121B]/40 flex items-start gap-3 my-6">
                <CheckCircle2 className="w-4 h-4 text-[#FF1E56] shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF6584] font-bold block mb-1">
                    Architectural Invariant
                  </span>
                  <p className="text-xs md:text-sm text-zinc-200 font-sans font-normal leading-relaxed">
                    {section.keyTakeaway}
                  </p>
                </div>
              </div>
            )}
          </section>
        ))}
      </div>

      {/* Tags Footer */}
      <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider mr-2">Topics:</span>
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-xs text-zinc-300 bg-white/5 px-3 py-1 rounded-lg border border-white/10"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Related Real-World Work Cross-Link */}
      {(relatedProject || relatedService) && (
        <div className="my-14 p-6 md:p-8 rounded-3xl glass-panel border border-[#B5121B]/40 bg-gradient-to-b from-[#18090D] to-[#0A0406] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF1E56]" />
            <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
              Applied Architecture in Production
            </h3>
          </div>

          <p className="text-xs text-zinc-400 font-sans">
            See the exact engineering methodologies discussed in this analysis implemented in our live client portfolio:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {relatedProject && (
              <div
                onClick={() => onSelectProject(relatedProject.id)}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#FF1E56] transition-colors cursor-pointer group"
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF1E56]">
                  Case Study
                </span>
                <h4 className="font-display text-sm font-bold text-white group-hover:text-[#FF6584] transition-colors flex items-center justify-between mt-1">
                  {relatedProject.title}
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00F2FE]" />
                </h4>
                <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-1">
                  {relatedProject.result}
                </p>
              </div>
            )}

            {relatedService && (
              <div
                onClick={() => onSelectService(relatedService.id)}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#00F2FE] transition-colors cursor-pointer group"
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#00F2FE]">
                  Service Offering
                </span>
                <h4 className="font-display text-sm font-bold text-white group-hover:text-[#00F2FE] transition-colors flex items-center justify-between mt-1">
                  {relatedService.title}
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#00F2FE]" />
                </h4>
                <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-1">
                  Starting at {relatedService.startingPrice} · {relatedService.turnaroundTime}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Next / Previous Article Switcher */}
      <div className="my-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous */}
        <button
          onClick={() => onSelectArticle(prevArticle.slug)}
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#B5121B]/60 text-left transition-all group flex items-center justify-between"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
              ← Previous Analysis
            </span>
            <h4 className="font-display text-sm font-bold text-white group-hover:text-[#FF6584] transition-colors line-clamp-1">
              {prevArticle.title}
            </h4>
            <span className="font-mono text-[11px] text-[#00F2FE]">{prevArticle.category}</span>
          </div>
          <ArrowLeft className="w-4 h-4 text-zinc-500 group-hover:text-[#FF1E56] group-hover:-translate-x-1 transition-all shrink-0 ml-2" />
        </button>

        {/* Next */}
        <button
          onClick={() => onSelectArticle(nextArticle.slug)}
          className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-[#00F2FE]/60 text-right transition-all group flex items-center justify-between flex-row-reverse"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
              Next Analysis →
            </span>
            <h4 className="font-display text-sm font-bold text-white group-hover:text-[#00F2FE] transition-colors line-clamp-1">
              {nextArticle.title}
            </h4>
            <span className="font-mono text-[11px] text-[#FF1E56]">{nextArticle.category}</span>
          </div>
          <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-[#00F2FE] group-hover:translate-x-1 transition-all shrink-0 mr-2" />
        </button>
      </div>

      {/* Strategic Call to Action */}
      <div className="mt-16 p-8 rounded-3xl glass-panel border border-[#B5121B]/40 text-center bg-gradient-to-b from-[#220B15] to-[#0A0C14] space-y-5">
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Commission This Architecture For Your Platform
        </h3>
        <p className="text-zinc-300 font-sans font-light text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
          Skip generic agency templates. Partner directly with Majid to engineer sub-50ms web platforms, 3D WebGL stores, or autonomous AI media workflows.
        </p>
        <button
          onClick={() => onContactClick(article.category)}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#B5121B] via-[#FF1E56] to-[#00F2FE] text-black font-display text-xs font-black tracking-wider uppercase hover:opacity-90 shadow-2xl transition-all"
        >
          Initiate Architectural Brief
        </button>
      </div>
    </article>
  );
}
