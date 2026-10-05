import React, { useEffect } from "react";
import { Project } from "../types";
import { PROJECTS, SERVICES } from "../data";
import ProjectVisualMockup from "./ProjectVisualMockup";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Code2,
  Calendar,
  Clock,
  Building,
  Sparkles,
  CheckCircle2,
  Trophy,
  Share2,
  Layers,
  ArrowUpRight
} from "lucide-react";
import { motion } from "motion/react";

interface ProjectDetailPageProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (projectId: string) => void;
  onSelectService: (serviceId: string) => void;
  onContactClick: (serviceCategory?: string) => void;
}

export default function ProjectDetailPage({
  project,
  onBack,
  onSelectProject,
  onSelectService,
  onContactClick
}: ProjectDetailPageProps) {
  // Scroll to top on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.id]);

  // Find previous and next projects
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Find related service if any
  const relatedService = SERVICES.find((s) => s.id === project.serviceId);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert("Project link copied to clipboard!");
    }
  };

  return (
    <div className="relative min-h-screen text-white pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] rounded-full luxury-glow-2 pointer-events-none opacity-40" />
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] rounded-full luxury-glow-1 pointer-events-none opacity-30" />

      {/* Top Navigation Bar: Breadcrumb + Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel-light hover:border-[#FF1E56]/60 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF1E56] group-hover:-translate-x-1 transition-transform" />
          <span>Return to Portfolio</span>
        </button>

        <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
          <span className="hidden sm:inline">Case Study {currentIndex + 1} of {PROJECTS.length}</span>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors"
            title="Share Project"
          >
            <Share2 className="w-3.5 h-3.5 text-[#00F2FE]" /> Share
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="space-y-6 mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF1E56] bg-[#220B15] border border-[#FF1E56]/40 px-3 py-1 rounded font-bold">
            {project.category}
          </span>
          <span className="text-zinc-500 font-mono text-xs">•</span>
          <span className="text-zinc-300 font-mono text-xs flex items-center gap-1.5">
            <Building className="w-3.5 h-3.5 text-[#00F2FE]" /> {project.client}
          </span>
          <span className="text-zinc-500 font-mono text-xs">•</span>
          <span className="text-zinc-400 font-mono text-xs flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" /> {project.year}
          </span>
          <span className="text-zinc-500 font-mono text-xs">•</span>
          <span className="text-zinc-400 font-mono text-xs flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-400" /> {project.duration}
          </span>
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
          {project.title}
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 font-sans font-light max-w-3xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Primary CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => onContactClick(project.category)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF1E56] to-[#FF6584] text-white font-display text-sm font-bold tracking-wider uppercase hover:brightness-110 shadow-[0_10px_30px_rgba(255,30,86,0.4)] transition-all"
          >
            Commission Similar Project
          </button>

          {relatedService && (
            <button
              onClick={() => onSelectService(relatedService.id)}
              className="px-5 py-3 rounded-xl glass-panel-light hover:border-[#00F2FE]/60 text-zinc-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
            >
              <Layers className="w-4 h-4 text-[#00F2FE]" /> View Service: {relatedService.title}
            </button>
          )}
        </div>
      </div>

      {/* Bespoke Interactive Live UI Mockup / Visual Showcase */}
      <div className="my-14 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#FF1E56]" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
              Interactive System Architecture & Live Simulation
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#00F2FE]">Live Sandbox Enabled</span>
        </div>

        <ProjectVisualMockup demoType={project.liveDemoType} interactive={true} />
      </div>

      {/* Key Quantitative Performance Metrics */}
      <div className="my-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Primary Metric */}
          <div className="p-6 rounded-2xl glass-panel border border-[#FF1E56]/40 bg-gradient-to-b from-[#FF1E56]/10 to-transparent">
            <span className="font-display text-4xl md:text-5xl font-black bg-gradient-to-r from-white via-slate-100 to-[#FF1E56] bg-clip-text text-transparent tabular-nums block">
              {project.metric.value}
            </span>
            <span className="font-mono text-xs text-white uppercase tracking-wider font-bold block mt-2">
              {project.metric.label}
            </span>
            {project.metric.description && (
              <p className="text-zinc-400 font-sans text-xs mt-2 font-light">
                {project.metric.description}
              </p>
            )}
          </div>

          {/* Additional Metrics */}
          {project.additionalMetrics?.map((met) => (
            <div key={met.label} className="p-6 rounded-2xl glass-panel border border-white/10">
              <span className="font-display text-3xl md:text-4xl font-black text-white tabular-nums block">
                {met.value}
              </span>
              <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold block mt-2">
                {met.label}
              </span>
              {met.description && (
                <p className="text-zinc-400 font-sans text-xs mt-2 font-light">
                  {met.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Challenge & Solution Editorial Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 my-16">
        {/* The Challenge */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-[#FF1E56] font-bold">
            The Challenge
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
            {project.challenge.headline}
          </h3>

          <p className="text-zinc-300 font-sans font-light text-sm leading-relaxed">
            {project.challenge.description}
          </p>

          <div className="space-y-3 pt-2">
            {project.challenge.keyPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E56] mt-2 shrink-0" />
                <span className="text-xs text-zinc-400 font-sans leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Solution */}
        <div className="p-8 rounded-3xl glass-panel border border-[#00F2FE]/30 bg-gradient-to-br from-[#00F2FE]/5 to-transparent space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F2FE]/10 border border-[#00F2FE]/30 text-[10px] font-mono uppercase tracking-widest text-[#00F2FE] font-bold">
            The Solution
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
            {project.solution.headline}
          </h3>

          <p className="text-zinc-300 font-sans font-light text-sm leading-relaxed">
            {project.solution.description}
          </p>

          <div className="space-y-4 pt-2">
            {project.solution.architectureHighlights.map((arch) => (
              <div key={arch.title} className="p-4 rounded-xl bg-black/40 border border-white/10">
                <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F2FE]" /> {arch.title}
                </h4>
                <p className="text-xs text-zinc-400 font-sans mt-1.5 font-light leading-relaxed">
                  {arch.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deliverables & Technology Stack Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-16">
        {/* Deliverables (7 cols) */}
        <div className="md:col-span-7 p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
            Project Scope & Handed Deliverables
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.deliverables.map((del) => (
              <div key={del} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FF1E56] shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-200 font-sans font-light">{del}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack (5 cols) */}
        <div className="md:col-span-5 p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#00F2FE]" /> Technology Frameworks
          </h3>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10">
            <p className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              Direct Business Result
            </p>
            <p className="text-sm text-white font-sans mt-1 font-light">
              {project.result}
            </p>
          </div>
        </div>
      </div>

      {/* Client Endorsement Testimonial */}
      {project.testimonial && (
        <div className="my-16 p-8 md:p-10 rounded-3xl glass-panel border border-white/10 bg-gradient-to-r from-white/[0.02] via-[#FF1E56]/5 to-transparent relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="text-4xl text-[#FF1E56] font-serif leading-none block mb-2">“</span>
            <p className="font-display text-xl md:text-2xl font-bold text-white tracking-tight leading-relaxed italic">
              {project.testimonial.quote}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#151928] border border-white/20 flex items-center justify-center font-display font-bold text-sm text-[#00F2FE]">
                {project.testimonial.author.slice(0, 1)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{project.testimonial.author}</p>
                <p className="text-xs text-zinc-400 font-mono">
                  {project.testimonial.role}, {project.testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Next / Previous Project Navigation Switcher */}
      <div className="my-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous */}
        <button
          onClick={() => onSelectProject(prevProject.id)}
          className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#FF1E56]/50 text-left transition-all group flex items-center justify-between"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
              ← Previous Case Study
            </span>
            <h4 className="font-display text-lg font-bold text-white group-hover:text-[#FF6584] transition-colors">
              {prevProject.title}
            </h4>
            <span className="font-mono text-xs text-[#00F2FE]">{prevProject.category}</span>
          </div>
          <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-[#FF1E56] group-hover:-translate-x-1 transition-all" />
        </button>

        {/* Next */}
        <button
          onClick={() => onSelectProject(nextProject.id)}
          className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00F2FE]/50 text-right transition-all group flex items-center justify-between flex-row-reverse"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
              Next Case Study →
            </span>
            <h4 className="font-display text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
              {nextProject.title}
            </h4>
            <span className="font-mono text-xs text-[#FF1E56]">{nextProject.category}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00F2FE] group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Final Conversion Strategic Banner */}
      <div className="mt-20 p-8 md:p-12 rounded-3xl glass-panel border border-[#FF1E56]/40 text-center bg-gradient-to-b from-[#220B15] to-[#0A0C14] space-y-6">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ready to Engineer Similar Market Dominance?
        </h3>
        <p className="text-zinc-300 font-sans font-light text-sm max-w-xl mx-auto leading-relaxed">
          Whether you need an institutional FinTech portal, a Swiss 3D luxury store, or an autonomous AI media pipeline, we build category-defining assets.
        </p>
        <button
          onClick={() => onContactClick(project.category)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF1E56] to-[#00F2FE] text-black font-display text-sm font-black tracking-wider uppercase hover:opacity-90 shadow-2xl transition-all"
        >
          Initiate Strategic Brief With Majid
        </button>
      </div>
    </div>
  );
}
