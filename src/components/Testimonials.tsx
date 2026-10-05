import React from "react";
import { TESTIMONIALS } from "../data";
import { MessageSquare, Star } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background radial lighting */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full luxury-glow-2 pointer-events-none opacity-50" />

      {/* Header */}
      <ScrollReveal variant="fade-up" duration={0.8} className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151928] border border-white/10 text-[10px] uppercase tracking-widest text-[#00F2FE] mb-4 font-semibold">
          <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
          Partner Alignment
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Vouched by Category <br />
          <span className="bg-gradient-to-r from-white via-slate-100 to-[#FF1E56] bg-clip-text text-transparent glow-text">
            Leaders and Founders
          </span>
        </h2>
        <p className="text-zinc-300 font-sans font-light text-sm md:text-base mt-4 max-w-2xl mx-auto">
          We treat our client projects like sovereign partnerships. Below is actual feedback from founders and growth leaders who scaled their digital capabilities with us.
        </p>
      </ScrollReveal>

      {/* Floating Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative rounded-2xl glass-panel p-8 text-left hover:border-[#FF1E56]/60 transition-all duration-400 flex flex-col justify-between h-[360px] hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(255,30,86,0.25)]"
          >
            {/* Top quote icon */}
            <div className="absolute top-6 right-6 text-[#FF1E56]/30 group-hover:text-[#00F2FE]/70 transition-colors duration-300">
              <MessageSquare className="w-8 h-8 fill-[#FF1E56]/10" />
            </div>

            <div>
              {/* Rating stars with bright gold */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B] drop-shadow-[0_0_6px_rgba(245,158,11,0.6)]" />
                ))}
              </div>

              {/* Client Content text */}
              <p className="text-zinc-200 font-sans font-light text-sm leading-relaxed italic group-hover:text-white transition-colors duration-300">
                "{t.content}"
              </p>
            </div>

            {/* Author Profile section */}
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <img
                src={t.avatarUrl}
                alt={t.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-white/20 group-hover:border-[#00F2FE]/60 transition-colors duration-300"
              />
              <div>
                <p className="text-xs font-bold text-white group-hover:text-[#00F2FE] transition-colors duration-300">
                  {t.name}
                </p>
                <p className="text-[10px] font-mono text-zinc-400 mt-0.5 font-medium">
                  {t.role} • <span className="text-zinc-300">{t.company}</span>
                </p>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
