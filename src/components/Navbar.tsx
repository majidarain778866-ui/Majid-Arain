import React, { useState } from "react";
import { Sparkles, Command, ShieldCheck, Mail, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onContactClick: () => void;
  onGmailClick?: () => void;
  onReplayLoad?: () => void;
  onNavigateHome?: (sectionId?: string) => void;
  isSubPage?: boolean;
}

export default function Navbar({
  onContactClick,
  onGmailClick,
  onReplayLoad,
  onNavigateHome,
  isSubPage = false
}: NavbarProps) {
  const [themeFeedback, setThemeFeedback] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const triggerThemeLock = () => {
    setThemeFeedback(true);
    setTimeout(() => setThemeFeedback(false), 3000);
  };

  const navLinks = [
    { name: "Services", section: "services", href: "#services" },
    { name: "Work", section: "work", href: "#work" },
    { name: "Insights", section: "insights", href: "#insights" },
    { name: "Our Process", section: "process", href: "#process" },
    { name: "Why Us", section: "why-choose-me", href: "#why-choose-me" },
  ];

  const handleLinkClick = (e: React.MouseEvent, section: string) => {
    setMobileMenuOpen(false);
    if (isSubPage && onNavigateHome) {
      e.preventDefault();
      onNavigateHome(section);
    } else {
      const el = document.getElementById(section);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  const handleMobileCta = () => {
    setMobileMenuOpen(false);
    onContactClick();
  };

  return (
    <header id="navbar-container" className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-3 sm:px-6 md:px-8 max-w-7xl mx-auto">
      <nav
        id="floating-navbar"
        className="glass-panel w-full h-14 sm:h-16 rounded-2xl flex items-center justify-between px-3.5 sm:px-6 md:px-8 relative overflow-visible transition-all duration-300 hover:border-[#FF1E56]/50 shadow-[0_10px_30px_rgba(0,0,0,0.85)]"
      >
        {/* Decorative subtle top edge highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#FF1E56]/70 to-transparent pointer-events-none" />

        {/* Brand Logo */}
        <a href="#/" onClick={handleLogoClick} className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
            <img 
              src="https://res.cloudinary.com/dikrzzri0/image/upload/v1783144714/905b2bcb-249d-4bf3-9527-6ddced773b75_ouvukr.png" 
              alt="Logo" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -inset-1 rounded-lg border border-[#FF1E56]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-xs sm:text-sm font-bold tracking-[0.2em] sm:tracking-[0.25em] text-white">
              M A J I D
            </span>
            <span className="font-mono text-[8px] sm:text-[9px] text-[#00F2FE] uppercase tracking-widest font-semibold">
              Growth Partner
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.section)}
              className="text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:text-white transition-colors duration-300 relative py-1 group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#FF1E56] to-[#00F2FE] shadow-[0_0_8px_rgba(255,30,86,0.8)] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop Right Interactions */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Gmail Hub Button */}
          {onGmailClick && (
            <button
              onClick={onGmailClick}
              id="nav-gmail-btn"
              className="flex items-center gap-1.5 px-3 h-9 rounded-lg glass-panel-light hover:border-[#FF1E56]/60 text-zinc-300 hover:text-white transition-all text-xs font-mono group"
              title="Google Workspace Gmail Integration"
            >
              <Mail className="w-3.5 h-3.5 text-[#FF1E56] group-hover:scale-110 transition-transform" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">Gmail</span>
            </button>
          )}

          {/* Smooth Shimmer Loading Replay Trigger */}
          {onReplayLoad && (
            <button
              onClick={onReplayLoad}
              id="nav-reload-shimmer-btn"
              className="relative w-9 h-9 rounded-lg glass-panel-light flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#00F2FE]/60 transition-all duration-300 group"
              title="Experience Smooth Shimmer Loader"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00F2FE] group-hover:rotate-12 transition-transform" />
            </button>
          )}

          {/* Custom Theme Guard */}
          <div className="relative">
            <button
              onClick={triggerThemeLock}
              className="relative w-9 h-9 rounded-lg glass-panel-light flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#FF1E56]/60 transition-all duration-300 group"
              title="Aesthetic Theme Guard"
              id="theme-toggle-btn"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF1E56] animate-pulse shadow-[0_0_12px_rgba(255,30,86,0.9)]" />
              <span className="absolute -inset-0.5 rounded-lg border border-[#FF1E56]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <AnimatePresence>
              {themeFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-64 glass-panel-heavy p-3.5 rounded-xl border border-[#FF1E56]/50 z-50 text-xs shadow-2xl"
                >
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">Ultra-HD Bright Palette</p>
                      <p className="text-zinc-300 mt-1 leading-relaxed text-[11px]">
                        Crystal-sharp display with zero blur, vibrant neon crimson, cyber cyan, and royal purple accents.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Consultation Button */}
          <button
            onClick={onContactClick}
            id="nav-cta-btn"
            className="relative h-9 sm:h-10 px-4 sm:px-5 rounded-lg bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] border border-white/20 text-white font-display text-[10px] font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,30,86,0.65)] hover:-translate-y-[1px] active:scale-95"
          >
            Let's Build
          </button>
        </div>

        {/* Mobile Right Controls: Compact CTA + Hamburger Menu */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onContactClick}
            className="h-8 px-3 rounded-lg bg-gradient-to-r from-[#FF1E56] to-[#FF007A] text-white font-display text-[9px] font-bold uppercase tracking-wider shrink-0"
          >
            Let's Build
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-9 h-9 rounded-lg glass-panel-light flex items-center justify-center text-zinc-300 hover:text-white border border-white/10 active:scale-95 transition-all"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-[#FF1E56]" /> : <Menu className="w-4 h-4 text-white" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden absolute top-full left-3 right-3 sm:left-6 sm:right-6 mt-2 p-5 rounded-2xl glass-panel-heavy border border-white/15 shadow-2xl bg-[#090C14]/95 backdrop-blur-2xl z-50 space-y-4"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.section)}
                  className="flex items-center justify-between px-3 py-3 rounded-xl text-sm font-display font-semibold text-zinc-200 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              ))}
            </div>

            {/* Quick action tools on mobile */}
            <div className="pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
              {onGmailClick && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onGmailClick();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl glass-panel-light text-xs font-mono text-zinc-300 hover:text-white border border-white/10"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF1E56]" />
                  <span>Gmail Hub</span>
                </button>
              )}

              {onReplayLoad && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayLoad();
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl glass-panel-light text-xs font-mono text-zinc-300 hover:text-white border border-white/10"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#00F2FE]" />
                  <span>Replay FX</span>
                </button>
              )}
            </div>

            <button
              onClick={handleMobileCta}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] text-white font-display text-xs font-bold uppercase tracking-widest text-center shadow-lg"
            >
              Initiate Project Brief
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
