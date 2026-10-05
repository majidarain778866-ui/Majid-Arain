import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export default function PageProgressBar() {
  const { scrollYProgress } = useScroll();
  
  // Use a smooth spring physics calculation to make the progress animation feel highly tactile and responsive
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] pointer-events-none origin-left">
      {/* Background track */}
      <div className="absolute inset-0 bg-white/5" />
      
      {/* Active spring progress line */}
      <motion.div 
        className="h-full bg-gradient-to-r from-[#FF1E56] via-[#8B5CF6] to-[#00F2FE] shadow-[0_0_12px_rgba(255,30,86,0.9)]"
        style={{ scaleX }}
      />
      
      {/* Crisp end point for dynamic depth */}
      <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-r from-transparent to-white/70" />
    </div>
  );
}
