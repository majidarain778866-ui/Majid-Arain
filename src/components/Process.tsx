import React from "react";
import { PROCESS_STEPS } from "../data";
import { Calendar, HelpCircle, ShieldAlert, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function Process() {
  return (
    <section id="process" className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Subtle background flow light */}
      <div className="absolute top-1/2 right-12 w-96 h-96 rounded-full luxury-glow-purple pointer-events-none opacity-40" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Mindset and Design/Engineering Philosophy (5 cols) */}
        <ScrollReveal variant="fade-right" duration={0.8} className="lg:col-span-5 lg:sticky lg:top-36 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151928] border border-white/10 text-[10px] uppercase tracking-widest text-[#00F2FE] mb-4 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#FF1E56]" />
            Milestone Methodology
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            How We Build <br />
            <span className="bg-gradient-to-r from-white via-slate-100 to-[#00F2FE] bg-clip-text text-transparent">
              Sovereign Brands
            </span>
          </h2>
          <p className="text-zinc-300 font-sans font-light text-sm leading-relaxed mt-6">
            We do not believe in mysterious delays or unvouched hours. We work within a highly disciplined, milestone-driven execution pipeline designed to provide absolute transparency.
          </p>

          {/* Luxury blockquote quotes */}
          <div className="mt-10 p-6 rounded-2xl border border-[#FF1E56]/40 bg-[#161224] relative overflow-hidden shadow-[0_0_25px_rgba(255,30,86,0.2)]">
            <span className="absolute -top-6 -left-2 font-display text-8xl font-bold text-[#FF1E56]/20 select-none">“</span>
            <p className="relative z-10 text-xs text-white font-sans italic leading-relaxed">
              "We align visual luxury with strict database engineering. If a page loads slowly or fails to capture a high-intent user, the design is a failure. We execute for business outcomes."
            </p>
            <div className="mt-4 flex items-center gap-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#FF1E56] to-[#00F2FE] flex items-center justify-center font-mono text-[9px] font-bold text-white shadow-md">
                SC
              </div>
              <div>
                <p className="text-[10px] font-semibold text-white">Sovereign Craft</p>
                <p className="text-[8px] font-mono text-[#00F2FE] uppercase tracking-wider font-medium">Lead Architect</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right Column: Interactive Vertical Milestones (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative rounded-2xl glass-panel p-6 md:p-8 flex flex-col md:flex-row gap-6 hover:border-[#FF1E56]/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.9),0_0_25px_rgba(255,30,86,0.25)] transition-all duration-300"
            >
              {/* Dynamic Number Badge with glowing status circle */}
              <div className="flex md:flex-col items-center justify-between md:justify-start shrink-0">
                <span className="font-display text-4xl md:text-5xl font-black bg-gradient-to-br from-white via-slate-200 to-[#FF1E56] bg-clip-text text-transparent">
                  {step.step}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#1A1F34] border border-white/10 font-mono text-[9px] text-[#00F2FE] uppercase tracking-widest mt-2 md:mt-4 font-semibold">
                  {step.timeline}
                </span>
              </div>

              {/* Step details */}
              <div className="flex-1 text-left space-y-3">
                <h3 className="font-display text-lg font-bold text-white tracking-tight group-hover:text-[#FF6584] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-zinc-300 font-sans font-light text-xs leading-relaxed">
                  {step.description}
                </p>

                {/* Specific deliverables list */}
                <div className="pt-3 border-t border-white/10 mt-4">
                  <p className="font-mono text-[8px] text-[#00F2FE] uppercase tracking-widest mb-2 font-semibold">Step Deliverables:</p>
                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-1 rounded bg-[#181D30] border border-white/10 text-[9px] text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
