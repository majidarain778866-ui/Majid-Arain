import React, { useRef, useState } from "react";
import { Service } from "../types";
import { SERVICES } from "../data";
import { Code2, Layers, Sparkles, TrendingUp, Search, Cpu, Monitor, ArrowUpRight, Filter } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";

interface ServicePreviewProps {
  onServiceSelect: (service: Service) => void;
}

interface ParallaxServiceCardProps {
  key?: string | number;
  service: Service;
  index: number;
  onServiceSelect: (service: Service) => void;
  renderIcon: (name: string) => React.ReactNode;
}

function ParallaxServiceCard({ service, index, onServiceSelect, renderIcon }: ParallaxServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  // Motion values for normalized cursor position (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D tilt rotation
  const springConfig = { stiffness: 220, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const mouseXVal = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYVal = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseXVal);
    y.set(mouseYVal);

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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        y: -6,
        boxShadow: "0 25px 45px rgba(0,0,0,0.85), 0 0 25px rgba(255,30,86,0.3)",
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      onClick={() => onServiceSelect(service)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={`service-card-${service.id}`}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={{
        layout: { duration: 0.4, ease: "easeOut" },
        type: "spring",
        stiffness: 150,
        damping: 18,
      }}
      className="group relative rounded-2xl glass-panel p-8 flex flex-col justify-between h-[320px] cursor-pointer hover:border-[#FF1E56]/70 transition-colors duration-300 overflow-hidden"
    >
      {/* Top right floating arrow indicator */}
      <div 
        style={{ transform: "translateZ(35px)" }}
        className="absolute top-6 right-6 w-8 h-8 rounded-full glass-panel-light flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#FF1E56]/60 group-hover:bg-[#FF1E56]/20 transition-all duration-300 shadow-md"
      >
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 text-[#00F2FE]" />
      </div>

      {/* Dynamic Cursor Gradient Spotlight Glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.4 : 0,
          background: `radial-gradient(240px circle at ${glowPos.x}% ${glowPos.y}%, rgba(255, 30, 86, 0.25), transparent 80%)`
        }}
      />

      {/* Passive ambient shimmer backing */}
      <div className="absolute -inset-20 bg-gradient-to-tr from-[#FF1E56]/10 via-transparent to-[#00F2FE]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Content wrapped for depth perception */}
      <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="w-12 h-12 rounded-xl bg-[#151928] border border-white/15 flex items-center justify-center mb-6 group-hover:border-[#FF1E56]/60 group-hover:bg-[#1C223A] transition-all duration-500 relative shadow-inner">
          {renderIcon(service.iconName)}
          <span className="absolute inset-0 rounded-xl border border-[#FF1E56]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Category & Title */}
        <p className="font-mono text-[9px] uppercase tracking-widest text-[#00F2FE] mb-1 font-semibold">{service.category}</p>
        <h3 className="font-display text-lg font-bold text-white tracking-tight group-hover:text-[#FF6584] transition-colors duration-300">
          {service.title}
        </h3>
        
        {/* Short Description */}
        <p className="text-zinc-300 font-sans font-light text-xs leading-relaxed mt-3 group-hover:text-white transition-colors duration-300">
          {service.shortDescription}
        </p>
      </div>

      {/* Footer Stats Grid */}
      <div 
        className="relative z-10 border-t border-white/10 pt-4 mt-6 flex justify-between items-center"
        style={{ transform: "translateZ(30px)" }}
      >
        <div>
          <p className="font-mono text-[8px] text-zinc-400 uppercase tracking-wider">Historical SLA</p>
          <p className="font-display text-sm font-bold text-white group-hover:text-[#00F2FE] transition-colors duration-300">
            {service.metrics[0].value} <span className="font-sans text-[10px] text-zinc-400 font-normal">{service.metrics[0].label}</span>
          </p>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-400 group-hover:text-white flex items-center gap-1 font-semibold">
          Explore Demo <ArrowUpRight className="w-3 h-3 text-[#FF1E56]" />
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicePreview({ onServiceSelect }: ServicePreviewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(SERVICES.map((s) => s.category)))];

  const filteredServices = selectedCategory === "All"
    ? SERVICES
    : SERVICES.filter((service) => service.category === selectedCategory);
  
  // Maps icon string to actual Lucide component with vibrant colors
  const renderIcon = (name: string) => {
    switch (name) {
      case "Code2": return <Code2 className="w-6 h-6 text-[#FF1E56] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      case "Layers": return <Layers className="w-6 h-6 text-[#00F2FE] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      case "Sparkles": return <Sparkles className="w-6 h-6 text-[#8B5CF6] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      case "TrendingUp": return <TrendingUp className="w-6 h-6 text-[#10B981] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      case "Search": return <Search className="w-6 h-6 text-[#F59E0B] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      case "Cpu": return <Cpu className="w-6 h-6 text-[#FF007A] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      case "Monitor": return <Monitor className="w-6 h-6 text-[#00F2FE] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
      default: return <Sparkles className="w-6 h-6 text-[#FF1E56] group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6" />;
    }
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <section id="services" className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow flares without blur */}
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full luxury-glow-1 pointer-events-none opacity-50" />
      <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full luxury-glow-2 pointer-events-none opacity-60" />

      {/* Section Header with Elite Symmetrical Borders */}
      <ScrollReveal variant="fade-up" duration={0.8} className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151928] border border-white/10 text-[10px] uppercase tracking-widest text-[#00F2FE] mb-4 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E56] animate-ping" />
          Execution Capabilities
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Elite Growth Capabilities <br />
          <span className="bg-gradient-to-r from-white via-slate-100 to-[#FF1E56] bg-clip-text text-transparent">
            Engineered for Multi-Channel Scale
          </span>
        </h2>
        <p className="text-zinc-300 font-sans font-light text-sm md:text-base mt-4 max-w-2xl mx-auto">
          We combine scientific performance data with high-art UI craft. Tap any capabilities card to enter its live interactive developer sandbox.
        </p>
      </ScrollReveal>

      {/* Dynamic Category Filter Pill Bar */}
      <ScrollReveal variant="fade-up" delay={0.1} duration={0.6}>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            const count = cat === "All" ? SERVICES.length : SERVICES.filter((s) => s.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                id={`service-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 select-none ${
                  isSelected
                    ? "text-white font-bold"
                    : "text-zinc-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeServiceCategoryBg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] border border-white/30 shadow-[0_0_20px_rgba(255,30,86,0.5)]"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
                <span
                  className={`relative z-10 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-[#181D30] text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Services Grid (Large Glass Cards with staggered Framer Motion entrance) */}
      <motion.div
        layout
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={gridContainerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredServices.map((service, i) => (
            <ParallaxServiceCard
              key={service.id}
              service={service}
              index={i}
              onServiceSelect={onServiceSelect}
              renderIcon={renderIcon}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
