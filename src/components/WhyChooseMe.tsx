import React, { useRef, useState, useEffect } from "react";
import { WHY_CHOOSE_US } from "../data";
import {
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  Trophy,
  Zap,
  Coffee,
  Activity,
  Award
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import StrategicFAQ from "./StrategicFAQ";

interface CardProps {
  key?: string | number;
  item: {
    title: string;
    description: string;
    icon: string;
  };
  index: number;
}

const BURGUNDY_METRICS = [
  { tag: "Zero Templates", stat: "100% Bespoke", accent: "#B5121B", glow: "rgba(181,18,27,0.6)" },
  { tag: "Global Edge SLA", stat: "< 45ms Latency", accent: "#D11A2A", glow: "rgba(209,26,42,0.6)" },
  { tag: "Zero Agency Bloat", stat: "1:1 Founder Access", accent: "#900C19", glow: "rgba(144,12,25,0.6)" }
];

/* Reusable Animated Counting Number with Smooth EaseOut Curve */
interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

function AnimatedCounter({ value, prefix = "", suffix = "", decimals = 0, duration = 2.2 }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Cubic ease-out curve for natural deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = easeOut * value;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value, duration]);

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.floor(displayValue).toLocaleString();

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{formatted}{suffix}
    </span>
  );
}

function InteractiveIntegrityCard({ item, index }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Smooth spring physics for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 280, damping: 22, mass: 0.45 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseX);
    y.set(mouseY);

    setGlowPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const renderIcon = (name: string) => {
    switch (name) {
      case "Code":
        return <Cpu className="w-6 h-6 text-[#FF334B] transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6 drop-shadow-[0_0_12px_rgba(181,18,27,0.7)]" />;
      case "Layers":
        return <Layers className="w-6 h-6 text-[#FF4D63] transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6 drop-shadow-[0_0_12px_rgba(181,18,27,0.7)]" />;
      case "Target":
        return <ShieldCheck className="w-6 h-6 text-[#E62035] transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6 drop-shadow-[0_0_12px_rgba(181,18,27,0.7)]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#FF334B] transition-transform duration-500 group-hover:scale-115 group-hover:rotate-6 drop-shadow-[0_0_12px_rgba(181,18,27,0.7)]" />;
    }
  };

  const metric = BURGUNDY_METRICS[index] || BURGUNDY_METRICS[0];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      }}
      whileHover={{
        y: -10,
        scale: 1.025,
        transition: { type: "spring", stiffness: 320, damping: 20 },
      }}
      className={`group relative rounded-3xl p-8 text-left bg-gradient-to-b from-[#11080B] via-[#0B0507] to-[#070405] overflow-hidden cursor-default transition-all duration-400 select-none flex flex-col justify-between min-h-[350px] border ${
        isHovered
          ? "border-[#B5121B] shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(181,18,27,0.65),0_0_80px_rgba(106,13,21,0.4),inset_0_0_25px_rgba(181,18,27,0.22)]"
          : "border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:border-[#8B0018]/50"
      }`}
    >
      {/* 1. Deep Burgundy Ambient Backing Mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(181,18,27,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* 2. Stronger Glowing Border Pulse Ring in Luxury Dark-Burgundy */}
      <div
        className={`absolute -inset-[1px] rounded-3xl pointer-events-none transition-opacity duration-300 ${
          isHovered ? "opacity-100 animate-pulse" : "opacity-0"
        }`}
        style={{
          boxShadow: `inset 0 0 16px rgba(181, 18, 27, 0.45), 0 0 24px rgba(181, 18, 27, 0.6)`,
        }}
      />

      {/* 3. Dynamic Cursor-Tracking Burgundy Spotlight Flare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.9 : 0,
          background: `radial-gradient(450px circle at ${glowPos.x}% ${glowPos.y}%, rgba(181, 18, 27, 0.35), rgba(74, 14, 23, 0.2), transparent 75%)`,
        }}
      />

      {/* 4. Luxury Glare Specular Reflection */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: `linear-gradient(${135 + (glowPos.x - 50) * 0.5}deg, rgba(255, 255, 255, 0.15) 0%, transparent 60%)`,
        }}
      />

      {/* 5. Top-Edge Burgundy Neon Hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, #FF1E56 25%, #B5121B 50%, #FF1E56 75%, transparent 100%)`,
          opacity: isHovered ? 1 : 0.35,
          filter: isHovered ? "drop-shadow(0 0 8px #B5121B)" : "none",
        }}
      />

      {/* CARD CONTENT — Layered in 3D for Parallax */}
      <div className="relative z-10" style={{ transform: "translateZ(38px)" }}>
        {/* Top Header: Icon Container + Index Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#250910] to-[#120407] border border-[#B5121B]/40 flex items-center justify-center transition-all duration-500 group-hover:border-[#FF1E56] group-hover:bg-[#380B14] group-hover:shadow-[0_0_25px_rgba(181,18,27,0.7)] shadow-inner">
            {renderIcon(item.icon)}
            <span className="absolute inset-0 rounded-2xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-zinc-500 group-hover:text-[#FF334B] transition-colors duration-300 tabular-nums">
              0{index + 1}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#FF1E56] group-hover:shadow-[0_0_8px_#FF1E56] group-hover:scale-125 transition-all duration-300" />
          </div>
        </div>

        {/* Title with Burgundy Radiance */}
        <h3 className="font-display text-xl md:text-2xl font-extrabold text-white tracking-tight transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#FF6584] group-hover:to-[#FF1E56]">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-zinc-400 font-sans font-light text-xs md:text-sm leading-relaxed mt-3.5 transition-colors duration-300 group-hover:text-zinc-200">
          {item.description}
        </p>
      </div>

      {/* Bottom Footer Stats Strip */}
      <div
        className="relative z-10 pt-5 mt-6 border-t border-white/10 flex items-center justify-between transition-colors duration-300 group-hover:border-[#B5121B]/40"
        style={{ transform: "translateZ(42px)" }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2
            className="w-3.5 h-3.5 transition-colors duration-300"
            style={{ color: isHovered ? "#FF1E56" : "#71717A" }}
          />
          <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors">
            {metric.tag}
          </span>
        </div>

        <span
          className="font-mono text-xs font-bold tabular-nums transition-colors duration-300"
          style={{
            color: isHovered ? "#FF4D63" : "#E4E4E7",
            textShadow: isHovered ? "0 0 12px rgba(181,18,27,0.8)" : "none",
          }}
        >
          {metric.stat}
        </span>
      </div>

      {/* Bottom Expanding Burgundy Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2.5px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 0%, #B5121B 25%, #FF1E56 50%, #B5121B 75%, transparent 100%)`,
          boxShadow: "0 0 15px rgba(181, 18, 27, 0.9)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* Verified Metrics Bar Component */
function VerifiedMetricsBar() {
  const metricsData = [
    {
      id: "projects",
      label: "Projects Delivered",
      subtitle: "Bespoke Enterprise Systems",
      icon: Trophy,
      value: 48,
      suffix: "+",
      color: "#FF1E56",
      tag: "100% Custom Architecture"
    },
    {
      id: "speed",
      label: "Deployment Speed",
      subtitle: "Faster Than Legacy Agencies",
      icon: Zap,
      value: 3.2,
      suffix: "x",
      decimals: 1,
      color: "#FF6584",
      tag: "Zero Redundant Bloat"
    },
    {
      id: "latency",
      label: "Core Uptime & SLA",
      subtitle: "Global Edge Infrastructure",
      icon: ShieldCheck,
      value: 99.99,
      suffix: "%",
      decimals: 2,
      color: "#B5121B",
      tag: "< 45ms Global Latency",
      pulse: true
    },
    {
      id: "coffee",
      label: "Cups of Coffee",
      subtitle: "Fueling Obsessive Quality",
      icon: Coffee,
      value: 1420,
      suffix: "+",
      color: "#E62035",
      tag: "Pure Focus & Craft"
    }
  ];

  return (
    <ScrollReveal variant="fade-up" duration={0.8} delay={0.2} className="mt-16">
      <div className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-b from-[#13080C] via-[#0B0507] to-[#070305] border border-[#B5121B]/40 shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(181,18,27,0.25)] overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF1E56] to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-80 h-32 bg-[radial-gradient(ellipse_at_top_right,rgba(181,18,27,0.25)_0%,transparent_70%)] pointer-events-none" />

        {/* Section Header Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#220B15] border border-[#B5121B]/50 flex items-center justify-center text-[#FF1E56] shadow-[0_0_12px_rgba(181,18,27,0.5)]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display text-sm md:text-base font-bold text-white tracking-wide uppercase">
                Verified Execution Authority
              </h3>
              <p className="font-mono text-[10px] text-zinc-400">
                Audited operational metrics across production deployments
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-zinc-200 font-semibold">Live Audited Records</span>
          </div>
        </div>

        {/* 4-Column Grid of Animated Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metricsData.map((m, idx) => {
            const IconComponent = m.icon;
            return (
              <div
                key={m.id}
                className="group relative p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#B5121B]/60 hover:bg-[#1A0910] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Micro hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(181,18,27,0.2)_0%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-[#1B0A11] border border-white/10 group-hover:border-[#FF1E56]/60 flex items-center justify-center text-zinc-400 group-hover:text-[#FF1E56] transition-colors duration-300">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {m.pulse && (
                      <span className="inline-flex items-center gap-1 font-mono text-[9px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        100% Uptime
                      </span>
                    )}
                  </div>

                  {/* Large Counting Number */}
                  <div className="font-display text-4xl lg:text-5xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#FF6584] transition-all duration-300">
                    <AnimatedCounter
                      value={m.value}
                      suffix={m.suffix}
                      decimals={m.decimals}
                    />
                  </div>

                  <p className="font-display text-sm font-bold text-zinc-200 mt-2 tracking-wide">
                    {m.label}
                  </p>
                  <p className="font-sans text-xs text-zinc-400 font-light mt-0.5">
                    {m.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#FF1E56]" />
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider group-hover:text-zinc-300 transition-colors">
                    {m.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function WhyChooseMe() {
  return (
    <section id="why-choose-me" className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background luxury dark-burgundy flares */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 bg-[radial-gradient(circle,rgba(181,18,27,0.25)_0%,transparent_70%)]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none opacity-40 bg-[radial-gradient(circle,rgba(106,13,21,0.3)_0%,transparent_70%)]" />

      {/* Header */}
      <ScrollReveal variant="fade-up" duration={0.8} className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F080D] border border-[#B5121B]/40 text-[10px] uppercase tracking-widest text-[#FF334B] mb-4 font-semibold shadow-[0_0_15px_rgba(181,18,27,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF1E56]" />
          Value Proposition
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          Engineering Trust Through <br />
          <span className="bg-gradient-to-r from-white via-[#FF6584] to-[#B5121B] bg-clip-text text-transparent glow-text">
            Technical and Aesthetic Integrity
          </span>
        </h2>
        <p className="text-zinc-300 font-sans font-light text-sm md:text-base mt-4 max-w-2xl mx-auto">
          We do not resell standard templates, or write bloated, unoptimized scripts. We hold our engineering, copywriting, and typography alignment to the highest standards.
        </p>
      </ScrollReveal>

      {/* Grid of Interactive Glass Cards with 3D Tilt & Glowing Burgundy Pulse */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {WHY_CHOOSE_US.map((item, i) => (
          <InteractiveIntegrityCard key={item.title} item={item} index={i} />
        ))}
      </div>

      {/* Verified Metrics Authority Bar with Animated Counting Numbers */}
      <VerifiedMetricsBar />

      {/* Accordion FAQ Section */}
      <StrategicFAQ />
    </section>
  );
}
