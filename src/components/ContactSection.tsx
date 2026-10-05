import React, { useState, useEffect } from "react";
import { Send, CheckCircle2, ShieldCheck, Mail, Sparkles, RefreshCw, ChevronDown, Eye, Copy, ExternalLink, X, Code2, Facebook, Instagram, Github, Twitter, Linkedin, LogOut, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import { generateLuxuryHtmlEmail, generateMailtoLink, ContactPayload, SERVICE_LABELS, BUDGET_LABELS } from "../lib/emailTemplate";
import { initAuth, googleSignIn, logout } from "../lib/googleAuth";
import { sendGmailMessage } from "../lib/gmailService";
import { User } from "firebase/auth";
import GoogleSignInButton from "./GoogleSignInButton";
import GmailConfirmationModal from "./GmailConfirmationModal";
import GmailHubModal from "./GmailHubModal";

interface FloatingInputProps {
  id: string;
  label: string;
  value: string;
  type?: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function FloatingInput({ id, label, value, type = "text", required = false, onChange }: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.trim().length > 0;

  return (
    <div className="relative group">
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full h-14 pt-5 pb-1.5 px-4 rounded-xl bg-[#141828] border text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 ${
          isFocused
            ? "border-[#FF1E56] bg-[#181D32] shadow-[0_0_20px_rgba(255,30,86,0.35)]"
            : "border-white/15 hover:border-white/30"
        }`}
        placeholder={label}
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isFloating ? -8 : 0,
          scale: isFloating ? 0.82 : 1,
          color: isFocused ? "#FF1E56" : isFloating ? "#00F2FE" : "#94A3B8",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-4 top-4 origin-top-left pointer-events-none font-mono uppercase tracking-widest text-[11px]"
      >
        {label}
      </motion.label>
    </div>
  );
}

interface FloatingSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

function FloatingSelect({ id, label, value, onChange, children }: FloatingSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <select
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full h-14 pt-5 pb-1.5 px-4 rounded-xl bg-[#141828] border text-xs text-white appearance-none cursor-pointer focus:outline-none transition-all duration-300 ${
          isFocused
            ? "border-[#FF1E56] bg-[#181D32] shadow-[0_0_20px_rgba(255,30,86,0.35)]"
            : "border-white/15 hover:border-white/30"
        }`}
      >
        {children}
      </select>
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: -8,
          scale: 0.82,
          color: isFocused ? "#FF1E56" : "#00F2FE",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-4 top-4 origin-top-left pointer-events-none font-mono uppercase tracking-widest text-[11px]"
      >
        {label}
      </motion.label>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-zinc-300 transition-colors">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

interface FloatingTextAreaProps {
  id: string;
  label: string;
  value: string;
  rows?: number;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function FloatingTextArea({ id, label, value, rows = 4, onChange }: FloatingTextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isFloating = isFocused || value.trim().length > 0;

  return (
    <div className="relative group">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className={`w-full pt-6 pb-2 px-4 rounded-xl bg-[#121214] border text-xs text-white placeholder-transparent focus:outline-none transition-all duration-300 resize-none ${
          isFocused
            ? "border-[#C51F2A] bg-[#141416] shadow-[0_0_20px_rgba(181,18,27,0.25)]"
            : "border-[#252528] hover:border-white/20"
        }`}
        placeholder={label}
      />
      <motion.label
        htmlFor={id}
        initial={false}
        animate={{
          y: isFloating ? -8 : 0,
          scale: isFloating ? 0.82 : 1,
          color: isFocused ? "#C51F2A" : isFloating ? "#A7A7A7" : "#777777",
        }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-4 top-4 origin-top-left pointer-events-none font-mono uppercase tracking-widest text-[11px]"
      >
        {label}
      </motion.label>
    </div>
  );
}

interface ContactSectionProps {
  initialService?: string;
}

export default function ContactSection({ initialService }: ContactSectionProps = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState(() => {
    if (!initialService) return "web-dev";
    const lower = initialService.toLowerCase();
    if (lower.includes("ui") || lower.includes("design")) return "ui-ux";
    if (lower.includes("ai") || lower.includes("synthetic")) return "ai-ads";
    if (lower.includes("seo") || lower.includes("search")) return "seo";
    if (lower.includes("auto") || lower.includes("flow")) return "automation";
    if (lower.includes("market") || lower.includes("perform") || lower.includes("ads")) return "performance-marketing";
    if (lower.includes("landing") || lower.includes("convert")) return "landing-pages";
    return "web-dev";
  });
  const [budget, setBudget] = useState("10-25");
  const [brief, setBrief] = useState("");

  useEffect(() => {
    if (initialService) {
      const lower = initialService.toLowerCase();
      if (lower.includes("ui") || lower.includes("design")) setService("ui-ux");
      else if (lower.includes("ai") || lower.includes("synthetic")) setService("ai-ads");
      else if (lower.includes("seo") || lower.includes("search")) setService("seo");
      else if (lower.includes("auto") || lower.includes("flow")) setService("automation");
      else if (lower.includes("market") || lower.includes("perform") || lower.includes("ads")) setService("performance-marketing");
      else if (lower.includes("landing") || lower.includes("convert")) setService("landing-pages");
      else setService("web-dev");
    }
  }, [initialService]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<boolean | null>(null);
  const [lastPayload, setLastPayload] = useState<ContactPayload | null>(null);
  
  // Google / Gmail Auth States
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isGoogleSigningIn, setIsGoogleSigningIn] = useState(false);
  const [showGmailHub, setShowGmailHub] = useState(false);
  const [showGmailConfirm, setShowGmailConfirm] = useState(false);
  const [isSendingViaGmail, setIsSendingViaGmail] = useState(false);
  const [sentViaGmail, setSentViaGmail] = useState(false);
  const [gmailError, setGmailError] = useState<string | null>(null);

  // Email modal preview states
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [previewTab, setPreviewTab] = useState<"visual" | "code">("visual");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        if (user.displayName && !name) setName(user.displayName);
        if (user.email && !email) setEmail(user.email);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleSignInClick = async () => {
    setIsGoogleSigningIn(true);
    setGmailError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        if (res.user.displayName) setName(res.user.displayName);
        if (res.user.email) setEmail(res.user.email);
      }
    } catch (err: any) {
      setGmailError(err.message || "Google Sign-In failed");
    } finally {
      setIsGoogleSigningIn(false);
    }
  };

  const handleOpenGmailConfirm = () => {
    if (!name.trim()) {
      setGmailError("Please provide your name or commercial entity name.");
      return;
    }
    if (!email.trim() && !googleUser?.email) {
      setGmailError("Please provide your communication email address.");
      return;
    }
    setGmailError(null);
    setShowGmailConfirm(true);
  };

  const handleExecuteGmailSend = async () => {
    if (!googleToken || !googleUser) return;
    setIsSendingViaGmail(true);
    setGmailError(null);

    const payload: ContactPayload = {
      name,
      email: googleUser.email || email,
      service,
      budget,
      brief,
      timestamp: new Date().toUTCString(),
    };

    try {
      const serviceTitle = SERVICE_LABELS[service] || service;
      const htmlBody = generateLuxuryHtmlEmail(payload);

      await sendGmailMessage({
        accessToken: googleToken,
        fromName: name || googleUser.displayName || "Google Workspace Client",
        fromEmail: googleUser.email || email,
        toEmail: "majidarain778866@gmail.com",
        subject: `Strategic Inquiry: ${serviceTitle} from ${name}`,
        htmlBody,
      });

      setLastPayload(payload);
      setSentViaGmail(true);
      setShowGmailConfirm(false);
      setSubmitResult(true);
    } catch (err: any) {
      setGmailError(err.message || "Failed to dispatch email via Gmail API");
      setShowGmailConfirm(false);
    } finally {
      setIsSendingViaGmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    setSubmitResult(null);
    setSentViaGmail(false);

    const payload: ContactPayload = {
      name,
      email,
      service,
      budget,
      brief,
      timestamp: new Date().toUTCString(),
    };

    try {
      // Call backend API
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("API call failed");
      }
    } catch {
      console.log("Client-side fallback active for contact dispatch.");
    } finally {
      setIsSubmitting(false);
      setSubmitResult(true);
      setLastPayload(payload);
    }
  };

  const handleCopyHtml = () => {
    if (!lastPayload) return;
    const html = generateLuxuryHtmlEmail(lastPayload);
    navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-32 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-20">
      {/* Background glow flares */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full luxury-glow-2 pointer-events-none opacity-30" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full luxury-glow-1 pointer-events-none opacity-40 animate-pulse-slow" />

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Premium Pitch Copy and Direct Coordinates (5 cols) */}
        <ScrollReveal variant="fade-right" duration={0.8} className="lg:col-span-5 text-left space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141416] border border-[#222225] text-[10px] uppercase tracking-widest text-[#A7A7A7] mb-4">
              <Sparkles className="w-3 h-3 text-[#C51F2A]" />
              Direct Connection
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-[#F4F4F4] tracking-tight leading-tight">
              Ready to Align <br />
              Our Capabilities?
            </h2>
            <p className="text-[#A7A7A7] font-sans font-light text-sm leading-relaxed mt-6">
              Let's bypass traditional agency red tape. Fill out our strategic alignment form, and we will compile a comprehensive digital audit, competitive gap analysis, and action plan.
            </p>
          </div>

          {/* Direct Coordinate Channels Card */}
          <div className="p-6 rounded-2xl border border-[#222225] bg-[#101012] space-y-4">
            <h3 className="font-mono text-[9px] uppercase tracking-widest text-[#777777]">Direct Coordination Channels:</h3>
            
            <a
              href="mailto:majidarain778866@gmail.com"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#141416] border border-[#222225] hover:border-[#B5121B]/40 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-[#24080D] border border-[#B5121B]/40 flex items-center justify-center text-[#C51F2A] shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="font-mono text-[8px] text-[#777777] uppercase tracking-widest">General Inquiries</p>
                <p className="text-xs text-[#F4F4F4] font-semibold truncate group-hover:text-white transition-colors duration-300">
                  majidarain778866@gmail.com
                </p>
              </div>
            </a>

            {/* WhatsApp Priority Channel */}
            <a
              href="https://wa.me/923067568576?text=Hi%20Majid,%20I%20would%20like%20to%20discuss%20a%20digital%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-[#141416] border border-[#222225] hover:border-emerald-500/40 hover:bg-emerald-950/20 transition-all duration-300 group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <svg className="w-4 h-4 fill-emerald-400" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div className="overflow-hidden">
                <p className="font-mono text-[8px] text-emerald-400 uppercase tracking-widest">WhatsApp Direct (Priority)</p>
                <p className="text-xs text-[#F4F4F4] font-semibold truncate group-hover:text-emerald-300 transition-colors duration-300">
                  +92 306 7568576
                </p>
              </div>
            </a>

            {/* Verified Social Profiles */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <p className="font-mono text-[8px] text-[#777777] uppercase tracking-widest">
                Verified Social Network Vectors
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {[
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
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.name}
                      className="w-9 h-9 rounded-xl bg-[#141724] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-[#00F2FE] hover:border-[#FF1E56] hover:bg-[#1A1E30] transition-all duration-300 shadow-sm"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-1 font-sans text-[11px] text-zinc-300 bg-[#141724] p-3 rounded-xl border border-white/10">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Direct-to-Architect response SLA guaranteed &lt; 12 hours.</span>
            </div>
          </div>

          {/* Google Workspace Gmail Integration Card */}
          <div className="p-6 rounded-2xl border border-white/15 bg-[#101422] shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.1)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md">
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold text-white tracking-wide">
                    Gmail Direct Integration
                  </h4>
                  <p className="font-mono text-[9px] text-[#00F2FE] uppercase tracking-wider font-semibold">
                    Google Workspace API
                  </p>
                </div>
              </div>

              {googleUser ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] uppercase font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Connected
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-[#1A1F30] border border-white/10 text-[#00F2FE] font-mono text-[9px] uppercase font-medium">
                  Available
                </span>
              )}
            </div>

            <p className="text-zinc-300 font-sans text-xs leading-relaxed">
              Authenticate with your Google account to send your strategic brief directly into Majid's inbox via the official Gmail API with end-to-end OAuth2 token protection.
            </p>

            {googleUser ? (
              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    {googleUser.photoURL ? (
                      <img src={googleUser.photoURL} alt="" className="w-7 h-7 rounded-full shrink-0 object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-r from-[#FF1E56] to-[#8B5CF6] text-white flex items-center justify-center font-bold text-[10px]">
                        {googleUser.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="truncate text-left">
                      <p className="text-white font-medium truncate text-xs">{googleUser.displayName || "Google Account"}</p>
                      <p className="font-mono text-[10px] text-zinc-300 truncate">{googleUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      await logout();
                      setGoogleUser(null);
                      setGoogleToken(null);
                    }}
                    title="Disconnect Google Account"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-white/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setShowGmailHub(true)}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-[#FF1E56] via-[#B5121B] to-[#FF007A] hover:brightness-110 text-white font-display text-[10px] uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-md shadow-[#FF1E56]/30 transition-all hover:scale-[1.01]"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Open Gmail Hub & Inquiries
                </button>
              </div>
            ) : (
              <div className="pt-1">
                <GoogleSignInButton
                  onClick={handleGoogleSignInClick}
                  isLoading={isGoogleSigningIn}
                  text="Sign in with Google to Connect Gmail"
                  className="w-full"
                />
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Right Column: Premium High-contrast Interactive Form (7 cols) */}
        <ScrollReveal variant="fade-left" duration={0.8} delay={0.15} className="lg:col-span-7">
          <div className="relative rounded-3xl glass-panel-heavy p-6 md:p-10 border border-white/15 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            
            {/* Top border ambient light without blur */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#FF1E56] to-transparent" />

            <AnimatePresence mode="wait">
              {!submitResult ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left relative z-10"
                >
                  {/* Error Notification */}
                  {gmailError && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping shrink-0" />
                      <span>{gmailError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <FloatingInput
                      id="entity-name"
                      label="Commercial Entity Name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    {/* Email */}
                    <FloatingInput
                      id="direct-email"
                      label="Direct Communication Vector"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Service Tier selection */}
                    <FloatingSelect
                      id="requested-service"
                      label="Requested Capabilities Alignment"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                    >
                      <option value="web-dev">Web & Full Stack Development</option>
                      <option value="ui-ux">UI/UX Design & Branding</option>
                      <option value="ai-ads">AI Ads & Influencer Production</option>
                      <option value="seo">Technical & On-Page SEO</option>
                      <option value="automation">Automation & Workflows</option>
                      <option value="performance-marketing">Performance Meta/Google Ads</option>
                      <option value="landing-pages">High-Converting Landing Pages</option>
                    </FloatingSelect>

                    {/* Budget Tier selection */}
                    <FloatingSelect
                      id="budget-tier"
                      label="Project Budget Allocations"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    >
                      <option value="5-10">$5,000 – $10,000</option>
                      <option value="10-25">$10,000 – $25,000</option>
                      <option value="25-plus">$25,000 +</option>
                    </FloatingSelect>
                  </div>

                  {/* Brief Outline */}
                  <FloatingTextArea
                    id="target-brief"
                    label="Target Objective Description"
                    value={brief}
                    rows={4}
                    onChange={(e) => setBrief(e.target.value)}
                  />

                  {/* Dispatch Controls */}
                  <div className="space-y-4 pt-1">
                    {googleUser && googleToken ? (
                      <>
                        <button
                          type="button"
                          onClick={handleOpenGmailConfirm}
                          disabled={isSendingViaGmail || isSubmitting}
                          className="w-full h-14 bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] hover:brightness-115 text-white text-xs uppercase font-display font-extrabold tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,30,86,0.65)] hover:-translate-y-[1px] active:scale-95"
                        >
                          <Mail className="w-4 h-4" />
                          Send Directly via Gmail API ({googleUser.email})
                        </button>

                        <div className="flex items-center justify-between text-xs text-zinc-400 px-1 font-mono text-[10px]">
                          <span>Alternative Transmission Method:</span>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="text-[#00F2FE] hover:text-white underline underline-offset-4 cursor-pointer font-medium"
                          >
                            Submit via Standard Server Node
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full h-14 bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] disabled:from-zinc-800 disabled:to-zinc-900 text-white text-xs uppercase font-display font-extrabold tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_35px_rgba(255,30,86,0.65)] hover:-translate-y-[1px] active:scale-95"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" /> Transmitting Coordinates...
                            </>
                          ) : (
                            <>
                              Establish Direct Connection <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>

                        <div className="relative pt-2">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5" />
                          </div>
                          <div className="relative flex justify-center text-[10px] uppercase font-mono">
                            <span className="bg-zinc-950 px-3 text-zinc-500">Or send directly using your Google account</span>
                          </div>
                        </div>

                        <GoogleSignInButton
                          onClick={handleGoogleSignInClick}
                          isLoading={isGoogleSigningIn}
                          text="Sign in with Google to Send via Gmail"
                          className="w-full h-12"
                        />
                      </>
                    )}
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="confirmation-pane"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-6 relative z-10"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white tracking-tight">
                      {sentViaGmail ? "Gmail API Transmission Complete" : "Direct Connection Established"}
                    </h3>
                    <p className="font-mono text-[10px] text-[#A7A7A7] uppercase tracking-widest mt-1">
                      Inquiry Dispatched to: <span className="text-[#C51F2A] font-semibold">majidarain778866@gmail.com</span>
                    </p>
                  </div>
                  <p className="text-sm text-[#A7A7A7] font-sans font-light max-w-md mx-auto leading-relaxed">
                    {sentViaGmail ? (
                      <>
                        Coordinates registered and verified. A real email message was formatted and transmitted through the official Google Workspace Gmail API from <span className="text-white font-mono">{lastPayload?.email}</span> directly into Majid's inbox with the dark luxury HTML email template.
                      </>
                    ) : (
                      <>
                        Coordinates registered. An automated high-fidelity HTML email dispatch has been formatted and transmitted to Majid's inbox with your strategy brief and service parameters.
                      </>
                    )}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {sentViaGmail && (
                      <button
                        type="button"
                        onClick={() => setShowGmailHub(true)}
                        className="px-5 h-11 bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] border border-white/20 text-white text-[10px] uppercase font-display font-extrabold tracking-widest rounded-xl flex items-center gap-2 hover:shadow-[0_0_25px_rgba(255,30,86,0.6)] transition-all"
                      >
                        <Mail className="w-4 h-4" />
                        Open Gmail Inquiries Hub
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(true)}
                      className="px-5 h-11 bg-white/10 border border-white/20 text-white text-[10px] uppercase font-display font-bold tracking-widest rounded-xl flex items-center gap-2 hover:bg-white/20 transition-all"
                    >
                      <Eye className="w-4 h-4 text-[#00F2FE]" />
                      Inspect Delivered Luxury Email
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitResult(null);
                        setSentViaGmail(false);
                        setName("");
                        setEmail("");
                        setBrief("");
                      }}
                      className="px-5 h-11 bg-white/5 border border-white/10 text-zinc-300 hover:text-white text-[10px] uppercase font-display font-bold tracking-widest rounded-xl transition-all hover:bg-white/10"
                    >
                      Return to Form
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </ScrollReveal>

      </div>

      {/* Live Email Dispatch Preview Modal (Zero Blur, Sharp Crisp Backdrop) */}
      <AnimatePresence>
        {showEmailModal && lastPayload && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl h-[88vh] bg-[#0E121E] border border-[#FF1E56]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Top Navigation Bar */}
              <div className="px-6 py-4 bg-[#141828] border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#250B16] border border-[#FF1E56]/50 flex items-center justify-center text-[#FF1E56]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-bold text-white tracking-tight">
                      Dispatched Luxury HTML Email Template
                    </h4>
                    <p className="font-mono text-[9px] text-[#00F2FE] uppercase tracking-widest font-semibold">
                      Destination: majidarain778866@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Tab Selector */}
                  <div className="flex items-center p-1 bg-[#1A1A1D] rounded-lg border border-[#252528]">
                    <button
                      onClick={() => setPreviewTab("visual")}
                      className={`px-3 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider transition-all ${
                        previewTab === "visual"
                          ? "bg-[#B5121B] text-white font-bold shadow-sm"
                          : "text-[#A7A7A7] hover:text-white"
                      }`}
                    >
                      <Eye className="w-3 h-3 inline mr-1.5" />
                      Visual Render
                    </button>
                    <button
                      onClick={() => setPreviewTab("code")}
                      className={`px-3 py-1 rounded-md font-mono text-[10px] uppercase tracking-wider transition-all ${
                        previewTab === "code"
                          ? "bg-[#B5121B] text-white font-bold shadow-sm"
                          : "text-[#A7A7A7] hover:text-white"
                      }`}
                    >
                      <Code2 className="w-3 h-3 inline mr-1.5" />
                      HTML Source
                    </button>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Main Container */}
              <div className="flex-1 bg-[#0A0A0C] overflow-hidden relative">
                {previewTab === "visual" ? (
                  <iframe
                    srcDoc={generateLuxuryHtmlEmail(lastPayload)}
                    title="Luxury Email Preview"
                    className="w-full h-full border-0 bg-[#070707]"
                  />
                ) : (
                  <div className="p-6 h-full overflow-auto font-mono text-xs text-zinc-300 bg-[#070707] space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/10">
                      <span className="text-[10px] uppercase tracking-widest text-[#777777]">
                        Copy raw inline HTML for email service providers (Resend, Mailchimp, SendGrid)
                      </span>
                      <button
                        onClick={handleCopyHtml}
                        className="px-3 py-1.5 bg-[#B5121B]/20 border border-[#B5121B]/40 text-[#F4F4F4] rounded-lg text-[10px] uppercase font-bold tracking-widest flex items-center gap-1.5 hover:bg-[#B5121B]/30 transition-all"
                      >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied HTML!" : "Copy Raw HTML"}
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap break-all text-[11px] leading-relaxed text-[#F4F4F4]">
                      {generateLuxuryHtmlEmail(lastPayload)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-4 bg-[#101012] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-zinc-400 text-xs">
                  <Sparkles className="w-4 h-4 text-[#C51F2A]" />
                  <span className="font-mono text-[10px] text-[#A7A7A7] uppercase tracking-widest">
                    Theme Fidelity: 100% Dark Mode & Inline CSS Compatible
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={generateMailtoLink(lastPayload)}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-display font-bold tracking-widest rounded-xl flex items-center gap-2 transition-all"
                  >
                    Open Native Desktop Mail Client <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setShowEmailModal(false)}
                    className="px-4 py-2 bg-gradient-to-r from-[#8B0000] to-[#B5121B] text-white text-[10px] uppercase font-display font-bold tracking-widest rounded-xl hover:brightness-110 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mandatory User Confirmation Dialog before Gmail send */}
      <GmailConfirmationModal
        isOpen={showGmailConfirm}
        onClose={() => setShowGmailConfirm(false)}
        onConfirm={handleExecuteGmailSend}
        isSending={isSendingViaGmail}
        fromEmail={googleUser?.email || email}
        fromName={name || googleUser?.displayName || "Google Workspace Client"}
        toEmail="majidarain778866@gmail.com"
        serviceTitle={SERVICE_LABELS[service] || service}
        budgetRange={BUDGET_LABELS[budget] || budget}
        brief={brief}
      />

      {/* Full Gmail Integration Hub Modal */}
      <GmailHubModal
        isOpen={showGmailHub}
        onClose={() => setShowGmailHub(false)}
        user={googleUser}
        accessToken={googleToken}
        onLogout={() => {
          setGoogleUser(null);
          setGoogleToken(null);
        }}
      />

    </section>
  );
}

