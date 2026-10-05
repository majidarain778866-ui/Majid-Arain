import React, { useState } from "react";
import { ARTICLES } from "../data";
import { Article } from "../types";
import { BookOpen, ArrowUpRight, Clock, Calendar, Sparkles, Code2, Layers, TrendingUp, Cpu } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

interface AgencyInsightsProps {
  onSelectArticle: (slug: string) => void;
}

export default function AgencyInsights({ onSelectArticle }: AgencyInsightsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Engineering", "Design & UX", "Performance Marketing", "Automation"];

  const filteredArticles = selectedCategory === "All"
    ? ARTICLES
    : ARTICLES.filter((article) => article.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Engineering": return <Code2 className="w-3.5 h-3.5 text-[#00F2FE]" />;
      case "Design & UX": return <Layers className="w-3.5 h-3.5 text-[#FF6584]" />;
      case "Performance Marketing": return <TrendingUp className="w-3.5 h-3.5 text-[#FF1E56]" />;
      case "Automation": return <Cpu className="w-3.5 h-3.5 text-[#10B981]" />;
      default: return <BookOpen className="w-3.5 h-3.5 text-[#FF1E56]" />;
    }
  };

  return (
    <section id="insights" className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Ambient background flares */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] rounded-full luxury-glow-1 pointer-events-none opacity-30" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full luxury-glow-2 pointer-events-none opacity-25" />

      {/* Header */}
      <ScrollReveal variant="fade-up" duration={0.8}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F080D] border border-[#B5121B]/40 text-[10px] uppercase tracking-widest text-[#FF334B] mb-4 font-semibold shadow-[0_0_15px_rgba(181,18,27,0.3)]">
              <BookOpen className="w-3.5 h-3.5 text-[#FF1E56]" />
              Engineering Journal & Technical Insights
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              Architectural Insights <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-[#FF1E56] bg-clip-text text-transparent glow-text">
                That Define The Modern Web
              </span>
            </h2>
            <p className="text-zinc-300 font-sans font-light text-sm mt-4 leading-relaxed">
              We document our production methodologies, sub-50ms latency blueprints, 3D WebGL optimization secrets, and algorithmic marketing engines.
            </p>
          </div>

          {/* Interactive Filter Tabs (Segmented controls) */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#13080C] border border-[#B5121B]/30 rounded-xl shrink-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-mono transition-all rounded-lg ${
                    isActive
                      ? "bg-[#B5121B] text-white font-bold shadow-[0_0_12px_rgba(181,18,27,0.6)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Editorial Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onSelectArticle(article.slug)}
            className="group relative rounded-3xl p-7 md:p-8 bg-gradient-to-b from-[#12080B] via-[#0B0507] to-[#070305] border border-white/10 hover:border-[#B5121B] hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(181,18,27,0.35)] transition-all duration-400 cursor-pointer flex flex-col justify-between"
          >
            {/* Top ambient hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF1E56]/40 to-transparent group-hover:via-[#FF1E56] transition-all duration-500" />

            <div>
              {/* Unboxed Zero-Pill Metadata */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-zinc-400 mb-4">
                <span className="inline-flex items-center gap-1.5 text-[#FF6584] font-semibold">
                  {getCategoryIcon(article.category)} {article.category}
                </span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400">{article.publishedAt}</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span className="text-zinc-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-zinc-500" /> {article.readTime}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-[#FF6584] transition-colors duration-300">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-zinc-300 font-sans font-light text-xs md:text-sm leading-relaxed mt-3.5 line-clamp-3">
                {article.excerpt}
              </p>

              {/* Tags inline */}
              <div className="flex flex-wrap gap-1.5 mt-5">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer with Author & Link */}
            <div className="pt-6 mt-8 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#1F080D] border border-[#B5121B]/50 flex items-center justify-center text-xs font-display font-bold text-white">
                  M
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-none">{article.author.name}</p>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{article.author.role}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 text-xs font-mono font-bold text-[#FF1E56] group-hover:text-[#00F2FE] group-hover:translate-x-1 transition-all duration-300">
                <span>Read Analysis</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
