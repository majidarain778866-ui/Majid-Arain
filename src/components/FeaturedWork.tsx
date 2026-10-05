import React from "react";
import { Project } from "../types";
import { PROJECTS } from "../data";
import ProjectVisualMockup from "./ProjectVisualMockup";
import { ArrowUpRight, Code2, Sparkles, Trophy, Building, Calendar, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

interface FeaturedWorkProps {
  onSelectProject?: (projectId: string) => void;
}

export default function FeaturedWork({ onSelectProject }: FeaturedWorkProps) {
  const handleCardClick = (projectId: string) => {
    if (onSelectProject) {
      onSelectProject(projectId);
    } else {
      window.location.hash = `/project/${projectId}`;
    }
  };

  return (
    <section id="work" className="relative py-20 sm:py-32 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto scroll-mt-20 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/3 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full luxury-glow-2 pointer-events-none opacity-40 sm:opacity-55" />

      {/* Header */}
      <ScrollReveal variant="fade-up" duration={0.8}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151928] border border-white/10 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#00F2FE] mb-3 sm:mb-4 font-semibold">
              <Trophy className="w-3.5 h-3.5 text-[#FF1E56]" />
              Curated Production Case Studies
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Selected Digital Work <br />
              <span className="bg-gradient-to-r from-white via-slate-100 to-[#FF1E56] bg-clip-text text-transparent glow-text">
                That Dominates Markets
              </span>
            </h2>
            <p className="text-zinc-300 font-sans font-light text-xs sm:text-sm mt-3 sm:mt-4 leading-relaxed">
              We reject shallow templates. Below are bespoke platforms engineered to scale institutional revenue, speed, and market dominance. Click any case study to explore full architecture, metrics, and interactive sandboxes.
            </p>
          </div>

          <div className="font-mono text-xs text-zinc-400 shrink-0 uppercase tracking-widest border-b border-white/10 pb-2">
            Total Client Value Generated: <span className="text-[#00F2FE] font-bold">$12M+</span>
          </div>
        </div>
      </ScrollReveal>

      {/* Premium Project Showcase Cards */}
      <div className="space-y-8 sm:space-y-12">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            onClick={() => handleCardClick(project.id)}
            id={`project-card-${project.id}`}
            className="group relative rounded-2xl sm:rounded-3xl glass-panel overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-4 sm:p-6 md:p-8 hover:border-[#FF1E56]/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,30,86,0.25)] transition-all duration-400 cursor-pointer"
          >
            {/* Left Column: Project Narrative & Architecture (6 cols) */}
            <div className="lg:col-span-6 flex flex-col justify-between py-1 sm:py-2 text-left">
              <div>
                {/* Meta Category and Tags */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF1E56] bg-[#220B15] border border-[#FF1E56]/40 px-2.5 py-0.5 sm:py-1 rounded font-bold">
                    {project.category}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400">
                    • {project.client}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-500">
                    • {project.year}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FF6584] transition-colors duration-300 flex items-center justify-between gap-3">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 group-hover:text-[#00F2FE] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 shrink-0" />
                </h3>

                {/* Tagline */}
                <p className="text-xs sm:text-sm font-medium text-[#00F2FE]/90 font-sans mt-1.5 sm:mt-2">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-zinc-300 font-sans font-light text-xs sm:text-sm leading-relaxed mt-2.5 sm:mt-3">
                  {project.description}
                </p>

                {/* Direct Performance Result Callout */}
                <div className="mt-4 sm:mt-5 p-3 sm:p-3.5 rounded-xl bg-[#151928] border border-white/10">
                  <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-[#00F2FE] uppercase tracking-wider font-semibold mb-1">
                    <span>Performance Metric</span>
                    <span className="text-emerald-400 font-bold">{project.metric.value}</span>
                  </div>
                  <p className="text-xs text-zinc-200 font-sans font-light">
                    {project.result}
                  </p>
                </div>
              </div>

              {/* Technologies strip & View Case Study Button */}
              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="font-mono text-[8px] sm:text-[9px] px-2 py-0.5 rounded bg-white/5 text-zinc-300">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF1E56] group-hover:text-[#00F2FE] transition-colors">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>

            {/* Right Column: High-Fidelity Interactive Mockup Visual (6 cols) */}
            <div className="lg:col-span-6 flex items-center justify-center w-full overflow-hidden">
              <div className="w-full transform group-hover:scale-[1.01] transition-transform duration-500 overflow-hidden">
                <ProjectVisualMockup demoType={project.liveDemoType} interactive={false} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
