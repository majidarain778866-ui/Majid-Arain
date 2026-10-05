import React, { useState } from "react";
import { STRATEGIC_FAQS } from "../data";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";

export default function StrategicFAQ() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="mt-24 pt-16 border-t border-white/5">
      {/* Header */}
      <ScrollReveal variant="fade-up" duration={0.8} className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151928] border border-white/10 text-[10px] uppercase tracking-widest text-[#00F2FE] mb-3 font-semibold">
          <HelpCircle className="w-3.5 h-3.5 text-[#FF1E56]" />
          Strategic Clarity
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Frequently Answered <span className="bg-gradient-to-r from-white via-slate-100 to-[#FF1E56] bg-clip-text text-transparent">Inquiries</span>
        </h3>
        <p className="text-zinc-300 font-sans font-light text-xs md:text-sm mt-2">
          Direct answers regarding engineering methodology, SLAs, security, and project execution.
        </p>
      </ScrollReveal>

      {/* Accordion Container */}
      <div className="max-w-4xl mx-auto space-y-4">
        {STRATEGIC_FAQS.map((faq, index) => {
          const isOpen = openId === faq.id;

          return (
            <ScrollReveal
              key={faq.id}
              variant="fade-up"
              delay={index * 0.08}
              duration={0.6}
            >
              <div
                className={`group rounded-2xl transition-all duration-300 overflow-hidden border ${
                  isOpen
                    ? "bg-[#181D30] border-[#FF1E56]/60 shadow-[0_0_25px_rgba(255,30,86,0.25)]"
                    : "glass-panel border-white/10 hover:border-[#00F2FE]/50"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  id={`faq-trigger-${faq.id}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors shrink-0 ${
                        isOpen
                          ? "bg-[#250B16] border-[#FF1E56]/60 text-[#FF6584]"
                          : "bg-[#151928] border-white/10 text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="block font-mono text-[9px] uppercase tracking-widest text-[#00F2FE] mb-0.5 font-semibold">
                        {faq.category}
                      </span>
                      <h4
                        className={`font-display text-base md:text-lg font-semibold tracking-tight transition-colors ${
                          isOpen ? "text-white" : "text-zinc-200 group-hover:text-white"
                        }`}
                      >
                        {faq.question}
                      </h4>
                    </div>
                  </div>

                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                      isOpen
                        ? "bg-[#250B16] border-[#FF1E56]/60 text-white rotate-180"
                        : "bg-[#151928] border-white/10 text-zinc-400 group-hover:text-white"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                  </div>
                </button>

                {/* Accordion Content Panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-zinc-300 font-sans font-light text-sm leading-relaxed border-t border-white/10 flex gap-3 items-start">
                        <Sparkles className="w-4 h-4 text-[#FF1E56] shrink-0 mt-1 opacity-90" />
                        <p className="flex-1">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}
