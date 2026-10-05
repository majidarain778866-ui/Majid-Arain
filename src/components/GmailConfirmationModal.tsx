import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, AlertTriangle, Send, X, ShieldCheck } from "lucide-react";

interface GmailConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isSending: boolean;
  fromEmail: string;
  fromName: string;
  toEmail: string;
  serviceTitle: string;
  budgetRange: string;
  brief: string;
}

export default function GmailConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isSending,
  fromEmail,
  fromName,
  toEmail,
  serviceTitle,
  budgetRange,
  brief,
}: GmailConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-xl bg-[#0D101C] border border-[#FF1E56]/40 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_25px_rgba(255,30,86,0.25)] overflow-hidden p-6 md:p-8 space-y-6 text-left"
        >
          {/* Top header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FF1E56] via-[#8B5CF6] to-[#00F2FE] flex items-center justify-center text-white shadow-lg shadow-[#FF1E56]/40">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white tracking-tight">
                  Confirm Gmail Dispatch
                </h3>
                <p className="font-mono text-[10px] text-[#00F2FE] uppercase tracking-widest font-semibold">
                  Google Workspace Gmail API
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isSending}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Confirmation description */}
          <div className="p-4 rounded-xl bg-[#151928] border border-amber-400/40 text-xs text-amber-200/90 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Permission Notice</span>
            </div>
            <p>
              You are about to send a real email message directly from your authenticated Google account (
              <strong className="text-white font-mono">{fromEmail}</strong>) to Majid (
              <strong className="text-white font-mono">{toEmail}</strong>) using the Google Workspace Gmail API.
            </p>
          </div>

          {/* Message Summary details */}
          <div className="space-y-3 font-mono text-[11px] bg-[#141724] border border-white/10 rounded-xl p-4">
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-400 uppercase tracking-wider">Sender (You):</span>
              <span className="text-white font-medium truncate max-w-[260px]">{fromName} ({fromEmail})</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-400 uppercase tracking-wider">Recipient:</span>
              <span className="text-[#00F2FE] font-semibold">{toEmail}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-400 uppercase tracking-wider">Service Selected:</span>
              <span className="text-zinc-200 font-semibold">{serviceTitle}</span>
            </div>
            <div className="flex justify-between border-b border-white/5 pb-2">
              <span className="text-zinc-400 uppercase tracking-wider">Budget Allocation:</span>
              <span className="text-emerald-400 font-semibold">{budgetRange}</span>
            </div>
            <div className="pt-1">
              <span className="text-zinc-400 uppercase tracking-wider block mb-1">Brief Preview:</span>
              <p className="text-zinc-300 font-sans text-xs italic line-clamp-3">
                {brief || "No detailed brief provided."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-sans">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Encrypted with OAuth2 Bearer token directly through Google's secure APIs.</span>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-5 h-11 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-display text-[11px] uppercase tracking-wider font-semibold transition-colors border border-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isSending}
              className="px-6 h-11 rounded-xl bg-gradient-to-r from-[#FF1E56] via-[#B5121B] to-[#FF007A] hover:brightness-110 text-white font-display text-[11px] uppercase tracking-widest font-bold flex items-center gap-2 shadow-lg shadow-[#FF1E56]/40 transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending via Gmail...
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Confirm & Send via Gmail
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
