import React from "react";
import { ShieldCheck, Github, Linkedin, Twitter, Instagram, Facebook, Mail } from "lucide-react";
import { motion } from "motion/react";
import ScrollReveal from "./ScrollReveal";

const SOCIAL_LINKS = [
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/people/Majid-Arain/pfbid0wokN8MPoC9xgoAucz2ZDG77VzhAx6KWdtBqHvDFjtqf8GbqM9YND8H1XoZsjS3kVl/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/majidarain778866/",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/majidarain778866-ui",
  },
  {
    name: "Twitter / X",
    icon: Twitter,
    href: "https://x.com/ArainD41848",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/majid-arain-bb6a03393/",
  },
  {
    name: "Direct Email",
    icon: Mail,
    href: "mailto:majidarain778866@gmail.com",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-container" className="relative border-t border-white/10 bg-[#090C15] py-16 px-4 md:px-8 overflow-hidden">
      {/* Decorative center radial background highlight without blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[radial-gradient(ellipse_at_top,rgba(255,30,86,0.18)_0%,rgba(0,242,254,0.08)_50%,transparent_75%)] pointer-events-none" />

      <ScrollReveal variant="fade-up" duration={0.8}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20 shadow-[0_0_15px_rgba(255,30,86,0.4)]">
              <img 
                src="https://res.cloudinary.com/dikrzzri0/image/upload/v1783144714/905b2bcb-249d-4bf3-9527-6ddced773b75_ouvukr.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="text-left">
              <span className="font-display text-sm font-bold tracking-[0.25em] bg-gradient-to-r from-white via-zinc-200 to-[#00F2FE] bg-clip-text text-transparent">
                M A J I D
              </span>
              <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest mt-0.5">
                Elite Digital Engineering • © {currentYear}
              </p>
            </div>
          </div>

          {/* Hover-reactive Animated Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="relative group w-11 h-11 rounded-xl bg-[#141724] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors duration-300 shadow-md hover:border-[#FF1E56] hover:shadow-[0_0_15px_rgba(255,30,86,0.5)]"
                >
                  {/* Crisp hover border and glow */}
                  <motion.div
                    variants={{
                      initial: { opacity: 0, scale: 0.9 },
                      hover: { opacity: 1, scale: 1 },
                    }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF1E56]/20 to-[#00F2FE]/20 border border-[#FF1E56]/60 pointer-events-none"
                  />

                  {/* Animated Icon */}
                  <motion.div
                    variants={{
                      initial: { scale: 1, y: 0 },
                      hover: { scale: 1.15, y: -2 },
                      tap: { scale: 0.9 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="relative z-10"
                  >
                    <Icon className="w-4 h-4 text-zinc-300 group-hover:text-[#00F2FE] transition-colors duration-300" />
                  </motion.div>
                </motion.a>
              );
            })}
          </div>

          {/* Security & Operational Certification credit lines */}
          <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-wider bg-[#141724] px-3.5 py-1.5 rounded-full border border-white/10 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300 font-semibold">SSL Secure</span> • <span className="text-[#00F2FE]">ISO 27001 Engineered</span>
          </div>

        </div>
      </ScrollReveal>
    </footer>
  );
}

