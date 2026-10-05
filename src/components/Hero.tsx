import React, { useState, useEffect } from "react";
import { ArrowUpRight, Play, Cpu, Code2, LineChart, MessageSquare, Terminal } from "lucide-react";
import { motion } from "motion/react";
import HeroParticles from "./HeroParticles";

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const [promptText, setPromptText] = useState("");
  const [chartValue, setChartValue] = useState([40, 55, 48, 70, 65, 88, 95]);

  // 3D Avatar interactive parallax tilt states
  const compositionRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = compositionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Elegant and premium max 10 degrees tilt rotation
    const rotateY = (x / (rect.width / 2)) * 10;
    const rotateX = -(y / (rect.height / 2)) * 10;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // AI Prompt typing effect
  useEffect(() => {
    const prompt = "/generate video --campaign luxury --style cinematic --mood expensive";
    let index = 0;
    const interval = setInterval(() => {
      if (index < prompt.length) {
        setPromptText((prev) => prev + prompt.charAt(index));
        index++;
      } else {
        setTimeout(() => {
          setPromptText("");
          index = 0;
        }, 5000);
      }
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // Update chart data periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setChartValue((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        const change = Math.floor(Math.random() * 15) - 7;
        const newValue = Math.max(30, Math.min(100, last + change));
        return [...next, newValue];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero-section" className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex items-center justify-center overflow-hidden px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
      {/* Interactive tsparticles field */}
      <HeroParticles />

      {/* Background Lighting Rig */}
      <div className="absolute top-1/4 left-1/4 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full luxury-glow-2 opacity-80 animate-pulse-intense pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] rounded-full luxury-glow-1 opacity-90 animate-pulse-slow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] rounded-full luxury-glow-purple opacity-40 pointer-events-none" />

      {/* Floating glass particles */}
      <div className="absolute top-40 left-12 w-6 h-6 rounded-full glass-panel opacity-40 animate-float pointer-events-none hidden sm:block" />
      <div className="absolute bottom-32 left-1/4 w-12 h-12 rounded-xl glass-panel opacity-30 rotate-12 animate-float-delayed pointer-events-none hidden sm:block" />
      <div className="absolute top-32 right-12 w-8 h-8 rounded-lg glass-panel opacity-40 rotate-45 animate-float-slow pointer-events-none hidden sm:block" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center w-full z-10">
        
        {/* Left Side: Elite Typography & CTAs */}
        <div id="hero-left-content" className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Elite Micro-tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#181124] border border-[#FF1E56]/50 text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-[#FF6584] mb-5 sm:mb-6 shadow-[0_0_20px_rgba(255,30,86,0.3)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-ping" />
            Category-Defining Digital Agency
          </motion.div>

          {/* Displays Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6 sm:mb-8"
          >
            Building Digital <br />
            <span className="bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#00F2FE] bg-clip-text text-transparent glow-text">
              Experiences
            </span> <br />
            That Grow Value.
          </motion.h1>

          {/* Professional Context Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg text-zinc-300 font-sans font-light max-w-xl leading-relaxed mb-8 sm:mb-10"
          >
            We synthesize custom full stack code architectures, high-fidelity UI design, and generative AI systems into sovereign digital products that establish commercial authority.
          </motion.p>

          {/* Interactive CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary magnetic button */}
            <button
              onClick={onCtaClick}
              id="hero-primary-cta"
              className="group relative h-12 sm:h-14 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] text-white font-display text-[11px] sm:text-xs uppercase tracking-widest font-extrabold flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,30,86,0.65)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Let's Build Together
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-white" />
              <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Secondary Showreel button */}
            <a
              href="#work"
              id="hero-secondary-cta"
              className="h-12 sm:h-14 px-6 sm:px-8 rounded-xl glass-panel text-white font-display text-[11px] sm:text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 hover:border-[#00F2FE]/50 hover:bg-white/[0.08]"
            >
              <span>Explore Work</span>
              <Play className="w-3.5 h-3.5 text-[#00F2FE] fill-[#00F2FE] group-hover:scale-110 transition-transform duration-300" />
            </a>
          </motion.div>

          {/* Micro stats with Bright Gradients */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="grid grid-cols-3 gap-3 sm:gap-8 mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/10 w-full max-w-lg"
          >
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">100%</p>
              <p className="font-sans text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mt-1 font-medium">Bespoke Code</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00F2FE] to-[#38BDF8]">4.8x</p>
              <p className="font-sans text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mt-1 font-medium">Average ROAS</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-[#34D399]">&lt; 45ms</p>
              <p className="font-sans text-[9px] sm:text-[10px] text-zinc-400 uppercase tracking-wider mt-1 font-medium">Response Speed</p>
            </div>
          </motion.div>

        </div>

        {/* Right Side: Interactive 3D Composition */}
        <div 
          ref={compositionRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          id="hero-right-composition" 
          className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] md:h-[550px] flex items-center justify-center cursor-default select-none max-w-[340px] sm:max-w-none mx-auto"
          style={{ perspective: "1500px" }}
        >
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
            animate={{
              rotateX: tilt.x,
              rotateY: tilt.y
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 25,
              mass: 0.8
            }}
          >
            {/* 3D Wrapper for Central Frame */}
            <div style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }} className="relative z-20">
              {/* Central Luxury Floating Frame */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl glass-panel flex items-center justify-center group/avatar overflow-hidden transition-all duration-500 hover:border-[#FF1E56]/70 hover:shadow-[0_0_35px_rgba(255,30,86,0.4)]">
                
                {/* Ambient lights behind the avatar without blur */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#1E0916] via-[#2A0E2A] to-[#14122C] opacity-95" />
                
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-tr from-[#FF1E56]/30 to-[#00F2FE]/20 rounded-full group-hover/avatar:scale-110 transition-transform duration-700" />
                
                {/* Premium photo of Majid */}
                <img
                  src="https://res.cloudinary.com/dikrzzri0/image/upload/v1783144714/905b2bcb-249d-4bf3-9527-6ddced773b75_ouvukr.png"
                  className="w-full h-full object-cover relative z-10 select-none group-hover/avatar:scale-105 transition-transform duration-700"
                  alt="Majid - Growth Partner"
                  referrerPolicy="no-referrer"
                />

                {/* Inner bottom decorative gradient for depth */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#07080C] to-transparent z-15 pointer-events-none" />
              </div>
            </div>

            {/* FLOATING CARD 1: Asynchronous Workflow Builder (Hidden on phone screens to prevent overflow) */}
            <div style={{ transform: "translateZ(85px)", transformStyle: "preserve-3d" }} className="hidden md:block absolute top-8 sm:top-12 sm:-left-12 z-30">
              <div
                id="floating-widget-automation"
                className="glass-panel p-4 rounded-2xl w-52 animate-float shadow-2xl hover:border-[#FF1E56]/60 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-4 h-4 text-[#FF1E56]" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-300 font-semibold">Workflow Active</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-auto" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-6 rounded bg-[#181D30] border border-white/10 px-2 flex items-center justify-between">
                    <span className="font-mono text-[8px] text-zinc-400">Lead Inbound</span>
                    <span className="font-mono text-[8px] text-emerald-400 font-bold">Success</span>
                  </div>
                  <div className="h-6 rounded bg-[#181D30] border border-white/10 px-2 flex items-center justify-between">
                    <span className="font-mono text-[8px] text-zinc-400">CRM Sync</span>
                    <span className="font-mono text-[8px] text-[#00F2FE] font-bold">Syncing</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 2: Active Syntax Highlighted Code Compiler */}
            <div style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }} className="absolute -bottom-6 left-0 sm:-bottom-10 sm:-left-6 z-30 scale-[0.82] sm:scale-100 origin-bottom-left">
              <div
                id="floating-widget-code"
                className="glass-panel-heavy p-3 sm:p-4 rounded-2xl w-56 sm:w-64 animate-float-delayed shadow-2xl hover:border-[#00F2FE]/60 transition-all duration-300"
              >
                <div className="flex items-center gap-1.5 mb-2 border-b border-white/10 pb-2">
                  <div className="flex gap-1">
                    <span className="w-2 rounded-full bg-rose-500 h-2" />
                    <span className="w-2 rounded-full bg-amber-400 h-2" />
                    <span className="w-2 rounded-full bg-emerald-400 h-2" />
                  </div>
                  <Terminal className="w-3.5 h-3.5 text-[#00F2FE] ml-2" />
                  <span className="font-mono text-[8px] text-zinc-300 font-semibold">Server.tsx</span>
                </div>
                <div className="font-mono text-[8px] sm:text-[9px] leading-relaxed text-zinc-300 space-y-0.5">
                  <p><span className="text-[#FF1E56] font-bold">const</span> app = <span className="text-[#00F2FE]">express</span>();</p>
                  <p><span className="text-[#FF1E56] font-bold">app</span>.<span className="text-zinc-100">use</span>(<span className="text-purple-400">vite</span>.<span className="text-zinc-200">middlewares</span>);</p>
                  <p><span className="text-[#FF1E56] font-bold">app</span>.<span className="text-zinc-100">listen</span>(<span className="text-amber-400">3000</span>, () =&gt; &#123;</p>
                  <p className="pl-2 sm:pl-3 text-emerald-400">// Majid Growth Partner</p>
                  <p>&#125;);</p>
                </div>
              </div>
            </div>

            {/* FLOATING CARD 3: SEO Audit & Real-time Traffic Graph (Hidden on small mobile screens to prevent overflow) */}
            <div style={{ transform: "translateZ(95px)", transformStyle: "preserve-3d" }} className="hidden md:block absolute top-10 sm:top-16 sm:-right-12 z-30">
              <div
                id="floating-widget-seo"
                className="glass-panel p-4 rounded-2xl w-52 animate-float shadow-2xl hover:border-[#FF1E56]/60 hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <LineChart className="w-4 h-4 text-[#00F2FE]" />
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-300 font-semibold">Organic Growth</span>
                  <span className="font-mono text-[10px] text-emerald-400 font-bold ml-auto">+340%</span>
                </div>
                <div className="h-10 flex items-end gap-1.5 pt-2">
                  {chartValue.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-[#FF1E56] to-[#00F2FE] rounded-t transition-all duration-500"
                      style={{ height: `${val}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* FLOATING CARD 4: Generative AI Ads Prompter Card */}
            <div style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }} className="absolute -bottom-6 right-0 sm:-bottom-12 sm:-right-8 z-30 scale-[0.82] sm:scale-100 origin-bottom-right">
              <div
                id="floating-widget-ai"
                className="glass-panel-heavy p-3 sm:p-4 rounded-2xl w-52 sm:w-56 animate-float-slow shadow-2xl hover:border-[#8B5CF6]/60 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-zinc-300 font-semibold">AI Ad Prompt</span>
                </div>
                <div className="bg-[#0B0D15] border border-white/10 p-2 rounded-lg font-mono text-[8px] sm:text-[9px] min-h-10 sm:min-h-12 text-zinc-200 select-none overflow-hidden truncate">
                  <span className="text-[#FF1E56] font-bold">&gt;</span> {promptText || "Generating..."}
                  <span className="w-1 h-3 bg-[#00F2FE] inline-block ml-0.5 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Behind glowing spheres and depth rings */}
            <div style={{ transform: "translateZ(-50px)", transformStyle: "preserve-3d" }} className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="absolute w-[280px] sm:w-[360px] h-[280px] sm:h-[360px] rounded-full border border-white/10 z-0 animate-pulse-slow" />
              <div className="absolute w-[340px] sm:w-[440px] h-[340px] sm:h-[440px] rounded-full border border-[#FF1E56]/20 opacity-60 z-0 animate-float" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
