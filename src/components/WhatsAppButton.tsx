import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, ArrowUpRight, X } from "lucide-react";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = "+92 306 7568576";
  const cleanNumber = "923067568576";
  const defaultMessage = encodeURIComponent(
    "Hi Majid, I came across your portfolio and would like to discuss a digital project."
  );
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${defaultMessage}`;

  return (
    <div
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Luxury Interactive Info Preview Card on Hover */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mb-3 w-64 p-3.5 rounded-2xl bg-[#0D1418] border border-emerald-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.9),0_0_25px_rgba(16,185,129,0.35)] text-left select-none pointer-events-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-90" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-300 font-bold">
                  Direct WhatsApp Active
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-zinc-500 hover:text-white p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>

            {/* Content */}
            <div className="py-2 space-y-1">
              <p className="font-display text-xs font-bold text-white tracking-wide">
                Majid Arain
              </p>
              <p className="font-mono text-[11px] text-emerald-300 font-medium">
                {phoneNumber}
              </p>
              <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                Fastest response channel for priority client partnerships and project inquiries.
              </p>
            </div>

            {/* Quick Action Link */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white font-display text-[10px] uppercase font-bold tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-emerald-900/40"
            >
              Start WhatsApp Chat <ArrowUpRight className="w-3 h-3" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp with Majid at ${phoneNumber}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        className="relative group w-14 h-14 rounded-2xl bg-[#0B1510] border border-emerald-400/50 flex items-center justify-center text-white shadow-[0_10px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:border-emerald-300 transition-all duration-300"
      >
        {/* Ambient Glow without blur */}
        <div className="absolute -inset-1 rounded-2xl border border-emerald-400/30 opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow pointer-events-none" />

        {/* Live Online Dot Badge */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 z-20">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-zinc-950" />
        </span>

        {/* Authentic WhatsApp Vector Icon */}
        <div className="relative z-10 w-7 h-7 flex items-center justify-center">
          <svg
            className="w-full h-full fill-emerald-400 group-hover:fill-emerald-300 transition-colors duration-300 drop-shadow-[0_2px_8px_rgba(16,185,129,0.5)]"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </motion.a>
    </div>
  );
}
