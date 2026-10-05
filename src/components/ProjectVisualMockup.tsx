import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  Activity,
  ShieldCheck,
  Clock,
  Sparkles,
  Sliders,
  Play,
  RotateCw,
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle,
  Eye,
  Zap,
  BarChart3,
  DollarSign
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProjectVisualMockupProps {
  demoType: "fintech" | "horology" | "synthetic-ai" | "automation-pipeline" | "conversion-funnel";
  interactive?: boolean;
  className?: string;
}

export default function ProjectVisualMockup({ demoType, interactive = true, className = "" }: ProjectVisualMockupProps) {
  // FINTECH STATE
  const [fintechTimeframe, setFintechTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1M");
  const [fintechActiveAsset, setFintechActiveAsset] = useState<number>(0);
  const [fintechBalance, setFintechBalance] = useState<number>(2481950);

  // HOROLOGY STATE
  const [watchColor, setWatchColor] = useState<"gold" | "obsidian" | "silver">("gold");
  const [watchDial, setWatchDial] = useState<"tourbillon" | "sunburst">("tourbillon");
  const [secondsAngle, setSecondsAngle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const sec = now.getSeconds() + now.getMilliseconds() / 1000;
      setSecondsAngle(sec * 6);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // SYNTHETIC AI STATE
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiMeshActive, setAiMeshActive] = useState(true);
  const [aiStyle, setAiStyle] = useState<"Cinematic" | "Editorial" | "Cyberpunk">("Cinematic");

  const triggerAiRender = () => {
    setAiGenerating(true);
    setTimeout(() => setAiGenerating(false), 1200);
  };

  // AUTOMATION STATE
  const [pulseActive, setPulseActive] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [lastExecutedTime, setLastExecutedTime] = useState("Just now");

  const fireAutomation = () => {
    setPulseActive(true);
    setActiveStep(1);
    setTimeout(() => setActiveStep(2), 600);
    setTimeout(() => setActiveStep(3), 1200);
    setTimeout(() => setActiveStep(4), 1800);
    setTimeout(() => {
      setPulseActive(false);
      setActiveStep(0);
      setLastExecutedTime("A few seconds ago");
    }, 2400);
  };

  // CONVERSION FUNNEL STATE
  const [adSpend, setAdSpend] = useState(15000);
  const projectedRoas = 5.2;
  const projectedRevenue = Math.round(adSpend * projectedRoas);
  const projectedLeads = Math.round(adSpend / 42);

  // 1. FINTECH TERMINAL (Apex Capital)
  if (demoType === "fintech") {
    const chartPaths = {
      "1D": "M0,90 Q40,80 80,60 T160,70 T240,40 T320,50 T400,20",
      "1W": "M0,100 Q50,70 100,85 T200,45 T300,30 T400,15",
      "1M": "M0,110 Q50,95 100,75 T200,60 T300,35 T400,10",
      "1Y": "M0,120 Q60,110 120,65 T240,50 T340,25 T400,5"
    };

    return (
      <div className={`relative w-full rounded-xl sm:rounded-2xl bg-[#090B10] border border-white/10 p-3 sm:p-5 md:p-6 overflow-hidden select-none ${className}`}>
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex gap-1 sm:gap-1.5 shrink-0">
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#FF1E56]/80" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-wider text-zinc-400 truncate">
              Apex Terminal • Portfolio
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-3 h-3" /> Vault
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-500 hidden sm:inline">12ms</span>
          </div>
        </div>

        {/* Top metrics row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
          <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest block truncate">Portfolio</span>
            <span className="text-base sm:text-lg md:text-xl font-display font-bold text-white tabular-nums tracking-tight truncate block">
              ${fintechBalance.toLocaleString()}
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-400 font-semibold block mt-0.5 truncate">+24.8% YTD</span>
          </div>

          <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest block truncate">24h Gain</span>
            <span className="text-base sm:text-lg md:text-xl font-display font-bold text-emerald-400 tabular-nums tracking-tight truncate block">
              +$84,210
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 block mt-0.5 truncate">3.52% Delta</span>
          </div>

          <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest block truncate">Active Tokens</span>
            <span className="text-base sm:text-lg md:text-xl font-display font-bold text-white tabular-nums tracking-tight truncate block">
              18 Assets
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-[#00F2FE] block mt-0.5 truncate">Multi-Chain</span>
          </div>

          <div className="p-2 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 overflow-hidden">
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest block truncate">Risk Ratio</span>
            <span className="text-base sm:text-lg md:text-xl font-display font-bold text-[#FF1E56] tabular-nums tracking-tight truncate block">
              0.14 Low
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 block mt-0.5 truncate">Tier 1</span>
          </div>
        </div>

        {/* Chart Canvas with Timeframe Picker */}
        <div className="relative p-3 sm:p-4 rounded-xl bg-[#0D1017] border border-white/10 mb-3 sm:mb-4">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE]" />
              <span className="text-[11px] sm:text-xs font-semibold text-white truncate">Liquidity Curve</span>
            </div>

            {interactive && (
              <div className="flex items-center gap-1 bg-black/40 p-0.5 sm:p-1 rounded-lg border border-white/10 shrink-0">
                {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setFintechTimeframe(tf)}
                    className={`px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono transition-colors ${
                      fintechTimeframe === tf
                        ? "bg-[#FF1E56] text-white font-bold"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SVG Vector Chart */}
          <div className="relative h-28 sm:h-32 md:h-36 w-full overflow-hidden">
            <svg viewBox="0 0 400 130" className="w-full h-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fintechGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#FF1E56" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#FF1E56" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`${chartPaths[fintechTimeframe]} L400,130 L0,130 Z`}
                fill="url(#fintechGrad)"
              />
              <path
                d={chartPaths[fintechTimeframe]}
                fill="none"
                stroke="url(#chartStroke)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <linearGradient id="chartStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00F2FE" />
                <stop offset="50%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#FF1E56" />
              </linearGradient>

              {/* Glowing anchor point */}
              <circle cx="400" cy="10" r="4" fill="#FF1E56" className="animate-pulse" />
              <circle cx="400" cy="10" r="8" fill="#FF1E56" fillOpacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Live Holdings Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { name: "Sovereign VC Pool Alpha", alloc: "45%", value: "$1,116,877", gain: "+31.2%" },
            { name: "Ethereum Staked Validator", alloc: "35%", value: "$868,682", gain: "+18.4%" },
            { name: "AI Compute Derivative", alloc: "20%", value: "$496,390", gain: "+52.0%" }
          ].map((item, idx) => (
            <div
              key={item.name}
              onClick={() => interactive && setFintechActiveAsset(idx)}
              className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                fintechActiveAsset === idx
                  ? "bg-[#151928] border-[#00F2FE]/50"
                  : "bg-white/[0.02] border-white/5 hover:border-white/20"
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                <span>{item.alloc} Alloc</span>
                <span className="text-emerald-400 font-semibold">{item.gain}</span>
              </div>
              <p className="text-xs font-semibold text-white truncate mt-1">{item.name}</p>
              <p className="text-xs font-mono font-bold text-zinc-300 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. LUXURY HOROLOGY (Lyra Luxury Timepieces)
  if (demoType === "horology") {
    const bezelColors = {
      gold: { ring: "#D4AF37", inner: "#1F1A12", accent: "#E5C158", dialBg: "#0F0E0B" },
      obsidian: { ring: "#3A3F4A", inner: "#101217", accent: "#00F2FE", dialBg: "#08090C" },
      silver: { ring: "#C0C5CF", inner: "#1A1C20", accent: "#FF1E56", dialBg: "#0D0F13" }
    };

    const currentPalette = bezelColors[watchColor];

    return (
      <div className={`relative w-full rounded-xl sm:rounded-2xl bg-[#090A0D] border border-white/10 p-3.5 sm:p-5 md:p-6 overflow-hidden select-none ${className}`}>
        {/* Horology Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
          <div>
            <span className="text-xs font-serif tracking-[0.2em] sm:tracking-[0.25em] text-[#E5C158] uppercase font-bold block truncate">
              Lyra Haute Horlogerie
            </span>
            <p className="text-[9px] sm:text-[10px] font-mono text-zinc-400 mt-0.5">Calibre 9021 • Tourbillon</p>
          </div>

          {interactive && (
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase hidden sm:inline">Finish:</span>
              <div className="flex gap-1.5 p-1 rounded-lg bg-black/40 border border-white/10">
                {(["gold", "obsidian", "silver"] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setWatchColor(color)}
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border transition-transform ${
                      watchColor === color ? "scale-110 border-white shadow-sm" : "border-transparent opacity-60"
                    }`}
                    style={{
                      backgroundColor:
                        color === "gold" ? "#D4AF37" : color === "obsidian" ? "#2B303C" : "#B0B5C0"
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Center Mechanical Watch Dial Simulation */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 my-2 sm:my-4">
          {/* Watch Bezel Container with scale adjustment for small screens */}
          <div className="relative w-56 h-56 md:w-64 md:h-64 scale-90 sm:scale-100 origin-center flex items-center justify-center shrink-0">
            {/* Outer Case Glow */}
            <div
              className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: currentPalette.accent }}
            />

            {/* Outer Bezel */}
            <div
              className="relative w-full h-full rounded-full border-[6px] shadow-[inset_0_0_30px_rgba(0,0,0,0.9),0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-500"
              style={{
                borderColor: currentPalette.ring,
                backgroundColor: currentPalette.dialBg
              }}
            >
              {/* Dial markings 12, 3, 6, 9 */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-[2px] h-3 bg-white/30 top-1 left-1/2 -translate-x-1/2 origin-[50%_118px]"
                  style={{
                    transform: `rotate(${deg}deg)`,
                    backgroundColor: deg % 90 === 0 ? currentPalette.accent : "rgba(255,255,255,0.25)",
                    height: deg % 90 === 0 ? "14px" : "8px"
                  }}
                />
              ))}

              {/* Inner Tourbillon Cage */}
              {watchDial === "tourbillon" && (
                <div className="absolute w-20 h-20 sm:w-24 sm:h-24 rounded-full border border-white/20 bg-black/60 flex items-center justify-center bottom-6 shadow-inner">
                  {/* Rotating gear */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-dashed border-[#E5C158]/50 flex items-center justify-center"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#E5C158] bg-[#D4AF37]/20" />
                  </motion.div>
                  <span className="absolute bottom-1 text-[7px] sm:text-[8px] font-mono text-zinc-400">TOURBILLON</span>
                </div>
              )}

              {/* Brand Script on Dial */}
              <div className="absolute top-10 text-center">
                <span className="font-serif text-[11px] tracking-[0.3em] text-white/90 font-bold block">
                  LYRA
                </span>
                <span className="text-[7px] font-mono tracking-widest text-zinc-400 uppercase">GENÈVE</span>
              </div>

              {/* Watch Hands */}
              {/* Hour Hand */}
              <div
                className="absolute w-1.5 h-16 rounded-full shadow-lg left-1/2 origin-bottom bottom-1/2 -translate-x-1/2"
                style={{
                  backgroundColor: currentPalette.accent,
                  transform: `translateX(-50%) rotate(210deg)`
                }}
              />
              {/* Minute Hand */}
              <div
                className="absolute w-1 h-22 rounded-full bg-white shadow-md left-1/2 origin-bottom bottom-1/2 -translate-x-1/2"
                style={{
                  transform: `translateX(-50%) rotate(80deg)`
                }}
              />
              {/* Second Hand (Live Ticking) */}
              <div
                className="absolute w-[1.5px] h-24 bg-[#FF1E56] shadow-sm left-1/2 origin-bottom bottom-1/2 -translate-x-1/2 transition-transform duration-75"
                style={{
                  transform: `translateX(-50%) rotate(${secondsAngle}deg)`
                }}
              />
              {/* Center Pin */}
              <div className="absolute w-3 h-3 rounded-full bg-white border-2 border-[#FF1E56] z-10 shadow" />
            </div>
          </div>

          {/* Horological Specifications Panel */}
          <div className="flex-1 space-y-2 sm:space-y-3 w-full">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Movement Escapement</span>
              <p className="text-xs sm:text-sm font-semibold text-white mt-0.5">Co-Axial Flying Tourbillon with Silicon Hairspring</p>
            </div>

            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase block truncate">Frequency</span>
                <span className="text-xs font-mono font-bold text-white truncate block">28,800 vph</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase block truncate">Power Reserve</span>
                <span className="text-xs font-mono font-bold text-emerald-400 truncate block">72 Hours</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase block truncate">Water Resist</span>
                <span className="text-xs font-mono font-bold text-[#00F2FE] truncate block">100m / 10 ATM</span>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 uppercase block truncate">Crystal</span>
                <span className="text-xs font-mono font-bold text-white truncate block">Sapphire Dome</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. SYNTHETIC AI PRODUCTION (Aurora Synthetic AI Ads)
  if (demoType === "synthetic-ai") {
    return (
      <div className={`relative w-full rounded-xl sm:rounded-2xl bg-[#08090E] border border-white/10 p-3.5 sm:p-5 md:p-6 overflow-hidden select-none ${className}`}>
        {/* Studio Suite Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-4 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1E56] shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold text-white truncate">
              Aurora Studio • Neural Pipeline
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-[#FF1E56]/15 border border-[#FF1E56]/40 text-[#FF6584]">
              Gen-3 Active
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 hidden sm:inline">4K 60fps</span>
          </div>
        </div>

        {/* Studio Viewport */}
        <div className="relative rounded-xl overflow-hidden bg-black/80 border border-white/10 aspect-video mb-3 sm:mb-4 flex items-center justify-center">
          {/* Background Cinematic Graphic Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1E0914] via-[#0D1222] to-[#0A1A22] flex items-center justify-center">
            {/* Visual Synthesized Avatar Graphic */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full border-2 border-white/20 overflow-hidden shadow-2xl flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-[#2A101C] via-[#101428] to-[#070912]" />
              <div className="relative z-10 text-center">
                <span className="text-2xl sm:text-3xl md:text-4xl block mb-1">🎭</span>
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#00F2FE] font-bold block">
                  Model #09
                </span>
                <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400">Diffusion V6</span>
              </div>

              {/* Facial Tracking Wireframe Mesh Overlay */}
              {aiMeshActive && (
                <div className="absolute inset-0 border border-[#00F2FE]/40 rounded-full animate-pulse-slow">
                  <div className="absolute top-1/3 left-1/4 right-1/4 h-[1px] bg-[#00F2FE]/50" />
                  <div className="absolute top-1/2 left-1/3 right-1/3 h-[1px] bg-[#00F2FE]/50" />
                  <div className="absolute left-1/2 top-1/4 bottom-1/4 w-[1px] bg-[#00F2FE]/50" />
                </div>
              )}
            </div>
          </div>

          {/* Studio HUD overlay */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex gap-1.5 sm:gap-2">
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[8px] sm:text-[9px] font-mono text-white">
              REC ● 00:08:42
            </span>
            <span className="px-1.5 sm:px-2 py-0.5 rounded bg-black/70 border border-white/10 text-[8px] sm:text-[9px] font-mono text-[#00F2FE]">
              Sync: 99.4%
            </span>
          </div>

          <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex gap-2">
            {interactive && (
              <button
                onClick={() => setAiMeshActive(!aiMeshActive)}
                className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[9px] sm:text-[10px] font-mono border transition-colors ${
                  aiMeshActive
                    ? "bg-[#00F2FE]/20 border-[#00F2FE] text-[#00F2FE]"
                    : "bg-black/60 border-white/20 text-zinc-400"
                }`}
              >
                Mesh {aiMeshActive ? "ON" : "OFF"}
              </button>
            )}
          </div>

          {/* Generating Loading State */}
          <AnimatePresence>
            {aiGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 z-20"
              >
                <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF1E56] animate-spin" />
                <span className="text-[11px] sm:text-xs font-mono text-white">Synthesizing Model Ad...</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Video Audio Timeline Strip */}
        <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 mb-3 sm:mb-4 space-y-1.5">
          <div className="flex justify-between items-center text-[9px] sm:text-[10px] font-mono text-zinc-400">
            <span>Video Track: 30s</span>
            <span>Voiceover: British RP</span>
          </div>
          {/* Audio Waveform SVG */}
          <div className="h-5 sm:h-6 w-full flex items-center gap-0.5 sm:gap-1">
            {[40, 70, 95, 60, 30, 85, 100, 45, 90, 75, 40, 80, 65, 30, 85, 90, 70, 50, 95, 60].map(
              (h, i) => (
                <div
                  key={i}
                  className="flex-1 bg-gradient-to-t from-[#FF1E56] to-[#00F2FE] rounded-full transition-all duration-300"
                  style={{ height: `${h}%` }}
                />
              )
            )}
          </div>
        </div>

        {/* Interactive Generation Controls */}
        {interactive && (
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            <div className="flex gap-1.5">
              {(["Cinematic", "Editorial", "Cyberpunk"] as const).map((style) => (
                <button
                  key={style}
                  onClick={() => setAiStyle(style)}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-mono transition-colors ${
                    aiStyle === style
                      ? "bg-[#FF1E56] text-white font-bold"
                      : "bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>

            <button
              onClick={triggerAiRender}
              disabled={aiGenerating}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#FF1E56] to-[#FF6584] text-white text-[10px] sm:text-xs font-bold font-mono hover:brightness-110 shadow-lg"
            >
              <Zap className="w-3.5 h-3.5" /> Synthesize
            </button>
          </div>
        )}
      </div>
    );
  }

  // 4. ENTERPRISE AUTOMATION PIPELINE (Nexus Flow)
  if (demoType === "automation-pipeline") {
    const pipelineNodes = [
      { id: 1, title: "Lead Inbound", subtitle: "Webhook", icon: Zap, status: "Active" },
      { id: 2, title: "AI Enrichment", subtitle: "Vector", icon: Cpu, status: "Enriched" },
      { id: 3, title: "CRM Sync", subtitle: "HubSpot", icon: Layers, status: "Created" },
      { id: 4, title: "Slack Alert", subtitle: "Desk", icon: CheckCircle, status: "Delivered" }
    ];

    return (
      <div className={`relative w-full rounded-xl sm:rounded-2xl bg-[#090C12] border border-white/10 p-3.5 sm:p-5 md:p-6 overflow-hidden select-none ${className}`}>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-5 gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE] shrink-0" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold text-white truncate">
              Nexus Orchestrator • Event Pipeline
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-mono text-zinc-400 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Operational</span>
          </div>
        </div>

        {/* Node Pipeline Visualizer */}
        <div className="relative py-4 sm:py-6 my-1 sm:my-2">
          {/* Animated Wire connecting nodes */}
          <div className="absolute top-1/2 left-4 right-4 sm:left-6 sm:right-6 h-[2px] bg-white/10 -translate-y-1/2 z-0 hidden sm:block" />
          <motion.div
            className="absolute top-1/2 left-4 right-4 sm:left-6 sm:right-6 h-[2px] bg-gradient-to-r from-[#00F2FE] via-[#FF1E56] to-emerald-400 -translate-y-1/2 z-0 hidden sm:block"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pulseActive ? 1 : 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            style={{ transformOrigin: "left" }}
          />

          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
            {pipelineNodes.map((node, idx) => {
              const IconComp = node.icon;
              const isCurrent = activeStep === idx + 1;
              const isDone = activeStep > idx + 1;

              return (
                <div
                  key={node.id}
                  className={`p-2.5 sm:p-3.5 rounded-xl border transition-all duration-300 ${
                    isCurrent
                      ? "bg-[#161B2B] border-[#00F2FE] shadow-[0_0_20px_rgba(0,242,254,0.3)] scale-[1.02]"
                      : isDone
                      ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-400"
                      : "bg-[#0E121B] border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <div
                      className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center ${
                        isCurrent
                          ? "bg-[#00F2FE] text-black"
                          : isDone
                          ? "bg-emerald-500 text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400">Node 0{node.id}</span>
                  </div>
                  <p className="text-[11px] sm:text-xs font-bold text-white truncate">{node.title}</p>
                  <p className="text-[8px] sm:text-[10px] font-mono text-zinc-400 mt-0.5 truncate">{node.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Execution Log / Trigger Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
          <div className="text-left font-mono text-[9px] sm:text-[10px] text-zinc-400 truncate">
            <span>Payload: <code className="text-[#00F2FE]">{`{ lead: "enterprise" }`}</code></span>
          </div>

          {interactive && (
            <button
              onClick={fireAutomation}
              disabled={pulseActive}
              className="flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#FF1E56] text-black font-bold text-[11px] sm:text-xs font-mono hover:opacity-90 shadow-md shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-black" /> Simulate Event
            </button>
          )}
        </div>
      </div>
    );
  }

  // 5. CONVERSION FUNNEL (Solaris Growth)
  return (
    <div className={`relative w-full rounded-xl sm:rounded-2xl bg-[#080B10] border border-white/10 p-3.5 sm:p-5 md:p-6 overflow-hidden select-none ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4 mb-3 sm:mb-5 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF1E56] shrink-0" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider font-bold text-white truncate">
            Solaris Growth Engine
          </span>
        </div>

        <span className="px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 shrink-0">
          5.2x ROAS
        </span>
      </div>

      {/* Interactive Ad Spend & Return Slider */}
      {interactive && (
        <div className="p-3 sm:p-4 rounded-xl bg-[#0F131E] border border-white/10 mb-4 sm:mb-5">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] sm:text-xs font-semibold text-white">Monthly Ad Spend</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#00F2FE] tabular-nums">
              ${adSpend.toLocaleString()} / mo
            </span>
          </div>

          <input
            type="range"
            min={3000}
            max={50000}
            step={1000}
            value={adSpend}
            onChange={(e) => setAdSpend(Number(e.target.value))}
            className="w-full accent-[#FF1E56] cursor-pointer"
          />

          <div className="grid grid-cols-3 gap-1 sm:gap-2 mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-white/10 text-center">
            <div className="overflow-hidden">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 block truncate">Projected Rev</span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-emerald-400 font-display tabular-nums truncate block">
                ${projectedRevenue.toLocaleString()}
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 block truncate">Pipeline</span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-white font-display tabular-nums truncate block">
                {projectedLeads} Deals
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-400 block truncate">Target CPA</span>
              <span className="text-xs sm:text-sm md:text-base font-bold text-[#00F2FE] font-display tabular-nums truncate block">
                $42.00
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Funnel Dropoff Stages */}
      <div className="space-y-1.5 sm:space-y-2">
        {[
          { label: "1. Ad Impressions", count: "1,240,000", pct: "100%", color: "#00F2FE" },
          { label: "2. Landing Page Clicks", count: "64,480", pct: "5.2%", color: "#3B82F6" },
          { label: "3. Interactive Leads", count: "8,920", pct: "13.8%", color: "#8B5CF6" },
          { label: "4. Executive Calls", count: "840", pct: "9.4%", color: "#FF1E56" }
        ].map((stage, idx) => (
          <div key={stage.label} className="p-2 sm:p-2.5 rounded-lg bg-white/[0.02] border border-white/5 flex items-center justify-between text-[11px] sm:text-xs">
            <span className="text-zinc-300 font-medium truncate">{stage.label}</span>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <span className="font-mono text-white tabular-nums text-[10px] sm:text-xs">{stage.count}</span>
              <span
                className="font-mono text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded font-bold"
                style={{ backgroundColor: `${stage.color}20`, color: stage.color }}
              >
                {stage.pct}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
