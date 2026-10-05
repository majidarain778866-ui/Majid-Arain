import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 400px (hero section height)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Back to Top"
          className="fixed bottom-24 right-6 z-40 p-3.5 rounded-2xl bg-[#141724] border border-white/15 text-zinc-300 hover:text-white hover:border-[#FF1E56] hover:bg-[#1A1E30] shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:shadow-[0_0_20px_rgba(255,30,86,0.5)] transition-all duration-300 group"
        >
          {/* Subtle background glow on hover */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF1E56]/20 to-[#00F2FE]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          
          <ArrowUp className="w-5 h-5 text-zinc-300 group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
