import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShieldCheck } from "lucide-react";

interface PageLoaderProps {
  onComplete?: () => void;
  minDuration?: number; // default ~1200ms for that snappy yet silky Facebook feel
}

export default function PageLoader({ onComplete, minDuration = 1200 }: PageLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING DIGITAL WORKSPACE...");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = performance.now();

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));

      setProgress(pct);

      if (pct < 35) {
        setStatusText("INITIALIZING DIGITAL ARCHITECTURE...");
      } else if (pct < 70) {
        setStatusText("CALIBRATING LUXURY GRAPHICS & NODES...");
      } else if (pct < 95) {
        setStatusText("AUTHENTICATING PROTOCOLS & INTERFACES...");
      } else {
        setStatusText("EXPERIENCE READY");
      }

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) onComplete();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="luxury-page-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[9999] bg-[#07080C] flex flex-col justify-between overflow-hidden select-none"
        >
          {/* Top Fast-Loading Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/5 z-50 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#00F2FE] shadow-[0_0_15px_rgba(255,30,86,0.9)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
            {/* End flare point */}
            <div
              className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent to-white/90"
              style={{ left: `calc(${progress}% - 96px)` }}
            />
          </div>

          {/* Ambient Background Lighting Array without blur */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full luxury-glow-2 opacity-60 pointer-events-none animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full luxury-glow-1 opacity-70 pointer-events-none animate-pulse-slow" />

          {/* Wireframe Skeleton Layer */}
          <div className="absolute inset-0 px-4 md:px-8 max-w-7xl mx-auto pointer-events-none opacity-30">
            {/* Top Navbar Skeleton */}
            <div className="pt-6">
              <div className="h-16 rounded-2xl border border-white/5 bg-[#121624] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/80 fb-shimmer" />
                  <div className="space-y-1.5">
                    <div className="w-24 h-2.5 rounded bg-zinc-800/80 fb-shimmer-line" />
                    <div className="w-16 h-2 rounded bg-zinc-800/60 fb-shimmer-line" />
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
                  <div className="w-16 h-2.5 rounded bg-zinc-800/60 fb-shimmer-line" />
                  <div className="w-16 h-2.5 rounded bg-zinc-800/60 fb-shimmer-line" />
                  <div className="w-16 h-2.5 rounded bg-zinc-800/60 fb-shimmer-line" />
                </div>
                <div className="w-28 h-9 rounded-lg bg-zinc-800/80 fb-shimmer" />
              </div>
            </div>

            {/* Hero Section Wireframe Skeleton */}
            <div className="pt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column Text Shimmers */}
              <div className="lg:col-span-7 space-y-6">
                <div className="w-48 h-6 rounded-full bg-zinc-800/80 fb-shimmer" />
                <div className="space-y-3">
                  <div className="w-11/12 h-12 rounded-xl bg-zinc-800/80 fb-shimmer-line" />
                  <div className="w-3/4 h-12 rounded-xl bg-zinc-800/80 fb-shimmer-line" />
                  <div className="w-4/5 h-12 rounded-xl bg-zinc-800/80 fb-shimmer-line" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="w-full h-3 rounded bg-zinc-800/60 fb-shimmer-line" />
                  <div className="w-5/6 h-3 rounded bg-zinc-800/60 fb-shimmer-line" />
                  <div className="w-2/3 h-3 rounded bg-zinc-800/60 fb-shimmer-line" />
                </div>
                <div className="flex gap-4 pt-4">
                  <div className="w-44 h-12 rounded-xl bg-zinc-800/80 fb-shimmer" />
                  <div className="w-40 h-12 rounded-xl bg-zinc-800/60 fb-shimmer" />
                </div>
              </div>

              {/* Right Column 3D Card Wireframe Skeleton */}
              <div className="hidden lg:flex lg:col-span-5 items-center justify-center">
                <div className="w-80 h-80 rounded-3xl border border-white/5 bg-[#121624] fb-shimmer relative p-6 flex flex-col justify-end">
                  <div className="space-y-2 w-full">
                    <div className="w-2/3 h-3 rounded bg-zinc-800/80 fb-shimmer-line" />
                    <div className="w-1/2 h-2.5 rounded bg-zinc-800/60 fb-shimmer-line" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Central Luxury Brand Pulse Focus Box */}
          <div className="relative z-20 flex-1 flex flex-col items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center p-8 max-w-sm rounded-3xl glass-panel-heavy border border-[#FF1E56]/40 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,30,86,0.3)]"
            >
              {/* Outer Pulsing Rings without blur */}
              <div className="absolute -inset-2 rounded-3xl border border-[#FF1E56]/30 animate-pulse-slow pointer-events-none" />

              {/* Logo Emblem with Shimmer Halo */}
              <div className="relative mb-5 group">
                {/* Rotating Sharp Halo */}
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-[#FF1E56] via-[#FF007A] to-[#00F2FE] opacity-80 animate-pulse" />
                
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-zinc-950">
                  <img
                    src="https://res.cloudinary.com/dikrzzri0/image/upload/v1783144714/905b2bcb-249d-4bf3-9527-6ddced773b75_ouvukr.png"
                    alt="Majid"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {/* Shimmer Overlay on Emblem */}
                  <div className="absolute inset-0 fb-shimmer opacity-40 pointer-events-none" />
                </div>
              </div>

              {/* Brand Name with Shimmer text effect */}
              <div className="space-y-1 mb-6">
                <h2 className="font-display text-lg font-bold tracking-[0.3em] text-white">
                  M A J I D
                </h2>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#00F2FE]">
                  Category-Defining Digital Engineering
                </p>
              </div>

              {/* High-Precision Progress Bar */}
              <div className="w-56 space-y-2">
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-white/10 relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#00F2FE] shadow-[0_0_12px_rgba(255,30,86,0.8)]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "easeOut" }}
                  />
                </div>

                <div className="flex items-center justify-between font-mono text-[9px] text-zinc-400">
                  <span className="truncate max-w-[150px] text-left text-zinc-400">
                    {statusText}
                  </span>
                  <span className="font-bold text-[#C51F2A] font-mono">
                    {progress}%
                  </span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-wider text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>End-to-End Encrypted Architecture</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Facebook-style subtle footer note */}
          <div className="relative z-10 pb-6 text-center">
            <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest">
              Fast • Fluid • Zero Layout Shift
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
