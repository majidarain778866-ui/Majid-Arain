import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  Send,
  X,
  User as UserIcon,
  LogOut,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Inbox,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { User } from "firebase/auth";
import {
  sendGmailMessage,
  getGmailProfile,
  listRecentGmailMessages,
  GmailProfile,
  GmailMessageSummary,
} from "../lib/gmailService";
import { logout } from "../lib/googleAuth";
import { generateLuxuryHtmlEmail } from "../lib/emailTemplate";
import GmailConfirmationModal from "./GmailConfirmationModal";
import { SkeletonCard } from "./FacebookSkeleton";

interface GmailHubModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  accessToken: string | null;
  onLogout: () => void;
}

export default function GmailHubModal({
  isOpen,
  onClose,
  user,
  accessToken,
  onLogout,
}: GmailHubModalProps) {
  const [profile, setProfile] = useState<GmailProfile | null>(null);
  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [activeTab, setActiveTab] = useState<"compose" | "history">("compose");

  // Form states for quick message
  const [service, setService] = useState("web-dev");
  const [budget, setBudget] = useState("10-25");
  const [customSubject, setCustomSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");

  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const recipientEmail = "majidarain778866@gmail.com";

  // Load Gmail profile and sent items when open
  useEffect(() => {
    if (isOpen && accessToken) {
      setIsLoadingProfile(true);
      Promise.all([
        getGmailProfile(accessToken).catch(() => null),
        listRecentGmailMessages(accessToken).catch(() => []),
      ]).then(([prof, msgs]) => {
        if (prof) setProfile(prof);
        if (msgs) setMessages(msgs);
        setIsLoadingProfile(false);
      });
    }
  }, [isOpen, accessToken]);

  const handleOpenConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      setSendError("Please provide message details or brief before transmitting.");
      return;
    }
    setSendError(null);
    setShowConfirmModal(true);
  };

  const handleExecuteSend = async () => {
    if (!accessToken || !user) return;
    setIsSending(true);
    setSendError(null);

    const fromName = user.displayName || "Google Workspace Client";
    const fromEmail = user.email || "";
    const subject = customSubject.trim() || `Strategic Collaboration Inquiry from ${fromName}`;

    const htmlBody = generateLuxuryHtmlEmail({
      name: fromName,
      email: fromEmail,
      service,
      budget,
      brief: messageBody,
      timestamp: new Date().toUTCString(),
    });

    try {
      await sendGmailMessage({
        accessToken,
        fromName,
        fromEmail,
        toEmail: recipientEmail,
        subject,
        htmlBody,
      });

      setSendSuccess(true);
      setShowConfirmModal(false);
      setMessageBody("");
      setCustomSubject("");

      // Refresh recent sent messages list
      const updatedMessages = await listRecentGmailMessages(accessToken).catch(() => []);
      setMessages(updatedMessages);
    } catch (err: any) {
      setSendError(err.message || "Failed to send email through Gmail API.");
      setShowConfirmModal(false);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/90">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-3xl h-[85vh] bg-[#0D101C] border border-[#FF1E56]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,30,86,0.25)] overflow-hidden flex flex-col"
          >
            {/* Top Bar */}
            <div className="px-6 py-4 bg-[#141724] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF1E56] via-[#8B5CF6] to-[#00F2FE] flex items-center justify-center text-white shadow-md shadow-[#FF1E56]/40">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-sm font-bold text-white tracking-tight">
                      Gmail Integration Hub
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[9px] uppercase font-semibold border border-emerald-500/30">
                      Connected
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-zinc-300">
                    Direct communication with <span className="text-[#00F2FE] font-semibold">{recipientEmail}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {user && (
                  <div className="hidden sm:flex items-center gap-2 pl-3 pr-2 py-1 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-300">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-5 h-5 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-zinc-400" />
                    )}
                    <span className="font-mono text-[11px] truncate max-w-[150px]">
                      {user.email}
                    </span>
                    <button
                      onClick={async () => {
                        await logout();
                        onLogout();
                        onClose();
                      }}
                      title="Disconnect Google Account"
                      className="p-1 text-zinc-400 hover:text-rose-400 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-6 py-2.5 bg-[#090C15] border-b border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab("compose");
                    setSendSuccess(false);
                  }}
                  className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "compose"
                      ? "bg-gradient-to-r from-[#FF1E56] to-[#FF007A] text-white shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Send className="w-3 h-3 inline mr-1.5" />
                  Send Gmail Message
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTab === "history"
                      ? "bg-[#B5121B] text-white shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Inbox className="w-3 h-3 inline mr-1.5" />
                  Recent Inquiries ({messages.length})
                </button>
              </div>

              {profile && (
                <span className="hidden md:inline-block font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                  Gmail Mailbox: {profile.messagesTotal.toLocaleString()} messages indexed
                </span>
              )}
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto p-6 text-left">
              {activeTab === "compose" ? (
                <div className="max-w-2xl mx-auto space-y-6">
                  {sendSuccess ? (
                    <div className="p-8 rounded-2xl bg-zinc-900/80 border border-emerald-500/30 text-center space-y-4">
                      <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h4 className="font-display text-xl font-bold text-white tracking-tight">
                        Message Transmitted via Gmail API
                      </h4>
                      <p className="text-zinc-300 font-sans text-xs leading-relaxed max-w-md mx-auto">
                        Your message was dispatched directly from your Google account (
                        <span className="text-white font-mono">{user?.email}</span>) into Majid's inbox (
                        <span className="text-[#C51F2A] font-mono">{recipientEmail}</span>) with the bespoke dark luxury HTML theme.
                      </p>
                      <div className="pt-2 flex justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => setSendSuccess(false)}
                          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B0000] to-[#B5121B] hover:brightness-110 text-white text-xs font-semibold font-display tracking-wider uppercase transition-all"
                        >
                          Send Another Message
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTab("history")}
                          className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold font-display tracking-wider uppercase transition-all"
                        >
                          View Inquiry History
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleOpenConfirm} className="space-y-4">
                      {sendError && (
                        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                          <span>{sendError}</span>
                        </div>
                      )}

                      {/* Recipient Read-Only Coordinate */}
                      <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 flex items-center justify-between">
                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                            Recipient Google Mailbox
                          </p>
                          <p className="text-xs text-white font-semibold">{recipientEmail}</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-[#24080D] border border-[#B5121B]/40 text-[#C51F2A] font-mono text-[9px] uppercase font-bold">
                          Direct Vector
                        </span>
                      </div>

                      {/* Capabilities Selection */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">
                            Capability Category
                          </label>
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B5121B]"
                          >
                            <option value="web-dev">Web & Full Stack Development</option>
                            <option value="ui-ux">UI/UX Design & Branding</option>
                            <option value="ai-ads">AI Ads & Influencer Production</option>
                            <option value="seo">Technical & On-Page SEO</option>
                            <option value="automation">Automation & Workflows</option>
                            <option value="performance-marketing">Performance Meta/Google Ads</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">
                            Budget Allocation
                          </label>
                          <select
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            className="w-full h-11 px-3 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B5121B]"
                          >
                            <option value="5-10">$5,000 – $10,000</option>
                            <option value="10-25">$10,000 – $25,000</option>
                            <option value="25-plus">$25,000 +</option>
                          </select>
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">
                          Subject Line (Optional)
                        </label>
                        <input
                          type="text"
                          value={customSubject}
                          onChange={(e) => setCustomSubject(e.target.value)}
                          placeholder={`Strategic Inquiry from ${user?.displayName || "Google Client"}`}
                          className="w-full h-11 px-3 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#B5121B]"
                        />
                      </div>

                      {/* Brief */}
                      <div>
                        <label className="block font-mono text-[9px] uppercase tracking-widest text-zinc-400 mb-1.5">
                          Project Brief & Strategy Outline
                        </label>
                        <textarea
                          rows={5}
                          required
                          value={messageBody}
                          onChange={(e) => setMessageBody(e.target.value)}
                          placeholder="Detail your goals, project timeline, or specific digital architecture challenges..."
                          className="w-full p-3 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#B5121B] resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 bg-gradient-to-r from-[#8B0000] via-[#B5121B] to-[#C51F2A] hover:brightness-110 text-white font-display text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#B5121B]/30 transition-all hover:scale-[1.01]"
                      >
                        <Send className="w-4 h-4" />
                        Preview & Authorize Gmail Send
                      </button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <p className="font-mono text-xs text-zinc-400">
                      Messages tagged with Majid's address in your Gmail account
                    </p>
                    <button
                      onClick={async () => {
                        if (accessToken) {
                          const msgs = await listRecentGmailMessages(accessToken).catch(() => []);
                          setMessages(msgs);
                        }
                      }}
                      className="text-xs text-[#C51F2A] hover:text-white flex items-center gap-1 font-mono uppercase tracking-wider"
                    >
                      <RefreshCw className="w-3 h-3" /> Refresh
                    </button>
                  </div>

                  {isLoadingProfile ? (
                    <div className="space-y-3">
                      <SkeletonCard className="h-32" />
                      <SkeletonCard className="h-32" />
                      <SkeletonCard className="h-32" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <Inbox className="w-10 h-10 text-zinc-600 mx-auto" />
                      <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                        No previous sent messages found in your mailbox for {recipientEmail}
                      </p>
                      <button
                        onClick={() => setActiveTab("compose")}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-mono text-xs uppercase"
                      >
                        Compose First Inquiry
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-4 rounded-xl bg-zinc-900/80 border border-white/5 hover:border-[#B5121B]/40 transition-all space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <h5 className="font-semibold text-xs text-white truncate">{msg.subject}</h5>
                            <span className="font-mono text-[9px] text-zinc-500 shrink-0">{msg.date}</span>
                          </div>
                          <p className="font-sans text-xs text-zinc-400 line-clamp-2">{msg.snippet}</p>
                          <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <span>From: {msg.from}</span>
                            <span className="text-[#C51F2A]">Thread ID: {msg.threadId.substring(0, 8)}...</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom Footer */}
            <div className="px-6 py-3 bg-zinc-950 border-t border-white/10 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-zinc-500 text-[10px]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Authorized via official Google OAuth2. Tokens reside exclusively in client memory.</span>
              </div>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-[10px] uppercase font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Mandatory User Confirmation Dialog before sending */}
      <GmailConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleExecuteSend}
        isSending={isSending}
        fromEmail={user?.email || ""}
        fromName={user?.displayName || "Google Client"}
        toEmail={recipientEmail}
        serviceTitle={service}
        budgetRange={budget}
        brief={messageBody}
      />
    </>
  );
}
