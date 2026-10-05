import React, { useState } from "react";
import { Service } from "../types";
import {
  X,
  Code2,
  Layers,
  Sparkles,
  TrendingUp,
  Search,
  Cpu,
  Monitor,
  Terminal,
  Play,
  ArrowRight,
  Sparkle,
  CheckCircle2,
  RefreshCw,
  Calculator,
  Eye,
  Sliders,
  Send
} from "lucide-react";
import { motion } from "motion/react";

interface ServiceDrawerProps {
  service: Service | null;
  onClose: () => void;
  onContactClick: () => void;
}

export default function ServiceDrawer({ service, onClose, onContactClick }: ServiceDrawerProps) {
  if (!service) return null;

  // State for interactive demos
  const [roiBudget, setRoiBudget] = useState(5000);
  const [aiProduct, setAiProduct] = useState("Luxury Quartz Watch");
  const [aiTarget, setAiTarget] = useState("High Net Worth Professionals");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);
  
  const [seoUrl, setSeoUrl] = useState("https://mybrand.com");
  const [isSeoAuditing, setIsSeoAuditing] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  const [activeWorkflowNode, setActiveWorkflowNode] = useState(0);
  const [workflowStatus, setWorkflowStatus] = useState("Idle");

  const [activeMoodboardTheme, setActiveMoodboardTheme] = useState("burgundy");

  // Dynamic Icon selector
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "Code2": return <Code2 className={className} />;
      case "Layers": return <Layers className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Search": return <Search className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Monitor": return <Monitor className={className} />;
      default: return <Sparkle className={className} />;
    }
  };

  // Generate AI Ad copy and campaign outline
  const handleAiAdSubmit = () => {
    setIsGeneratingAi(true);
    setAiResult(null);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiResult({
        hook: `🕰️ True prestige isn't loud. It's absolute. Introducing the bespoke ${aiProduct}, engineered specifically for ${aiTarget}.`,
        storyboard: "Scene 1: Close-up macro lens panning across brushed black carbon facets. Subdued burgundy backlighting. Sound of mechanical chronometer ticking.\nScene 2: Transition to elegant male model in tailored charcoal trench, wearing round black-rimmed glasses. He looks directly at the camera with focused confidence.",
        voiceScript: "[Voice clone: Deep, smooth British baritone, slow tempo] 'Crafted in silent defiance of the temporary. For those who command their own calendar. Command yours.'",
        estimatedCPA: "$14.20",
        expectedROAS: "5.4x"
      });
    }, 1800);
  };

  // SEO crawl simulation
  const handleSeoAudit = () => {
    setIsSeoAuditing(true);
    setSeoResult(null);
    setTimeout(() => {
      setIsSeoAuditing(false);
      setSeoResult({
        performance: "98/100",
        seoScore: "100/100",
        lighthouse: { speedIndex: "0.8s", fcp: "0.3s", cls: "0.01" },
        issues: [
          { type: "Critical", desc: "Missing JSON-LD Article Schema markup (Majid fixes this natively)." },
          { type: "Optimization", desc: "Hero image lacks Next-Gen WebP optimization (Majid converts to responsive WebP layouts automatically)." }
        ],
        competitorOverlap: "84% opportunity gap identified in search clustering."
      });
    }, 2000);
  };

  // Trigger automated workflow simulator pulse
  const startWorkflowSimulation = () => {
    setWorkflowStatus("Executing...");
    setActiveWorkflowNode(1);
    
    setTimeout(() => {
      setActiveWorkflowNode(2);
      setTimeout(() => {
        setActiveWorkflowNode(3);
        setTimeout(() => {
          setActiveWorkflowNode(4);
          setWorkflowStatus("Success (Invoice sent & Slack Alerted)");
        }, 1200);
      }, 1200);
    }, 1200);
  };

  // Reset Workflow Simulation
  const resetWorkflow = () => {
    setActiveWorkflowNode(0);
    setWorkflowStatus("Idle");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 overflow-y-auto">
      
      {/* Drawer content frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="glass-panel-heavy w-full max-w-6xl rounded-3xl overflow-hidden relative border border-[#FF1E56]/40 my-auto shadow-2xl"
      >
        {/* Subtle decorative lights inside the drawer */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full luxury-glow-1 pointer-events-none opacity-40" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full luxury-glow-purple pointer-events-none opacity-30" />

        {/* Top bar with Service title & Close button */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#250B16] border border-[#FF1E56]/50 flex items-center justify-center">
              {renderIcon(service.iconName, "w-5 h-5 text-[#FF1E56]")}
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-widest text-[#00F2FE] font-semibold">{service.category} Core Suite</p>
              <h2 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight">{service.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl glass-panel-light flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-300 hover:rotate-90 hover:border-[#FF1E56]/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* Left Column: Extensive details (7 cols on desktop) */}
          <div className="lg:col-span-6 p-6 md:p-8 lg:border-r border-white/5 space-y-8 max-h-[70vh] overflow-y-auto">
            
            {/* Deep Context Narrative */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-3">Service Overview</h3>
              <p className="text-zinc-300 font-sans font-light text-sm md:text-base leading-relaxed">
                {service.fullDescription}
              </p>
            </div>

            {/* Target Commercial Metrics */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-4">Awwwards-Class Expected SLA Metrics</h3>
              <div className="grid grid-cols-3 gap-4">
                {service.metrics.map((metric, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="font-display text-xl md:text-2xl font-bold text-white">{metric.value}</p>
                    <p className="font-sans text-[9px] text-zinc-500 uppercase tracking-wider mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables checklist */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#777777] font-mono mb-4">Elite Deliverables</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.deliverables.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C51F2A] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#A7A7A7]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Engineering Tech Stack */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#777777] font-mono mb-3">Technological & Tool Stack</h3>
              <div className="flex flex-wrap gap-2">
                {service.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-[#141416] border border-[#222225] text-[10px] font-mono text-[#A7A7A7]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Step-by-Step execution process */}
            <div>
              <h3 className="text-xs uppercase tracking-widest text-[#777777] font-mono mb-4">Milestone Implementation Timeline</h3>
              <div className="space-y-3.5">
                {service.process.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-mono text-xs text-[#F4F4F4] font-bold bg-[#8B0000]/30 w-6 h-6 rounded-full flex items-center justify-center border border-[#B5121B]/40 shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-[#F4F4F4]">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing CTA */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onContactClick}
                className="flex-1 h-12 bg-gradient-to-r from-[#FF1E56] via-[#FF007A] to-[#8B5CF6] text-white text-xs uppercase tracking-widest font-extrabold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_25px_rgba(255,30,86,0.6)] hover:brightness-110 transition-all duration-300 active:scale-95"
              >
                Let's Build This Together
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Dynamic Interactive Mockups (5 cols on desktop) */}
          <div className="lg:col-span-6 p-6 md:p-8 bg-black/50 flex flex-col justify-center min-h-[400px] lg:min-h-0 relative">
            
            {/* Header label for interactive console */}
            <div className="absolute top-4 left-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-ping" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#00F2FE] font-semibold">Live Client Interactive Sandbox</span>
            </div>

            {/* DEMO 1: Marketing ROI Calculator */}
            {service.interactiveDemo === "marketing-roi" && (
              <div className="space-y-6 w-full max-w-md mx-auto">
                <div className="text-center mb-4">
                  <Calculator className="w-8 h-8 text-[#FF1E56] mx-auto mb-2" />
                  <p className="font-display font-bold text-white">Campaign Funnel ROI Modeler</p>
                  <p className="font-sans text-xs text-zinc-300">Slide budget allocation to preview projected Meta & Google outcome.</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between font-mono text-xs text-zinc-300">
                    <span>Monthly Ads Budget</span>
                    <span className="text-[#00F2FE] font-bold text-sm">${roiBudget.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={roiBudget}
                    onChange={(e) => setRoiBudget(Number(e.target.value))}
                    className="w-full h-2 bg-[#181D32] rounded-lg appearance-none cursor-pointer accent-[#FF1E56]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Est. Conversion Clicks</p>
                    <p className="font-display text-lg font-bold text-emerald-400 mt-1">
                      {Math.round(roiBudget * 0.12).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Est. Leads Acquisition</p>
                    <p className="font-display text-lg font-bold text-white mt-1">
                      {Math.round(roiBudget * 0.032).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Predicted Revenue</p>
                    <p className="font-display text-lg font-bold text-[#F4F4F4] mt-1">
                      ${Math.round(roiBudget * 4.8).toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">Attributed ROAS</p>
                    <p className="font-display text-lg font-bold text-[#C51F2A] mt-1">4.8x</p>
                  </div>
                </div>

                <p className="font-mono text-[8px] text-zinc-500 text-center leading-relaxed mt-2">
                  *Projections are computed based on average historical Meta Pixel metrics (4.8x overall portfolio median). Actual performance subject to target market validation.
                </p>
              </div>
            )}

            {/* DEMO 2: AI Ads Copy & Campaign Generator */}
            {service.interactiveDemo === "ai-generator" && (
              <div className="space-y-5 w-full max-w-md mx-auto">
                <div className="text-center mb-3">
                  <Sparkles className="w-8 h-8 text-[#C51F2A] mx-auto mb-2 animate-pulse" />
                  <p className="font-display font-bold text-white">Generative Creative Ad Pipeline</p>
                  <p className="font-sans text-xs text-zinc-500">Synthesize premium cinematic script concepts instantly.</p>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">Focus Product / Service</label>
                    <input
                      type="text"
                      value={aiProduct}
                      onChange={(e) => setAiProduct(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B5121B]"
                      placeholder="e.g. Luxury Car Rental"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-widest mb-1.5">Target Demographic Audience</label>
                    <input
                      type="text"
                      value={aiTarget}
                      onChange={(e) => setAiTarget(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B5121B]"
                      placeholder="e.g. Ultra High Net Worth"
                    />
                  </div>

                  <button
                    onClick={handleAiAdSubmit}
                    disabled={isGeneratingAi}
                    className="w-full h-11 bg-gradient-to-r from-[#8B0000] via-[#B5121B] to-[#C51F2A] hover:brightness-110 disabled:opacity-50 text-white font-display text-[10px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    {isGeneratingAi ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing Neurals...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-white" /> Synthesize Ad Creative
                      </>
                    )}
                  </button>
                </div>

                {/* AI generated outcomes */}
                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white/5 border border-[#B5121B]/30 space-y-3 font-mono text-[10px] max-h-48 overflow-y-auto"
                  >
                    <div>
                      <p className="text-[#C51F2A] font-bold uppercase tracking-widest">Hook Copy Variant:</p>
                      <p className="text-zinc-300 mt-1 italic">{aiResult.hook}</p>
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <p className="text-[#F4F4F4] font-bold uppercase tracking-widest">Macro Storyboarding Outline:</p>
                      <p className="text-zinc-400 mt-1 whitespace-pre-line">{aiResult.storyboard}</p>
                    </div>
                    <div className="border-t border-white/5 pt-2">
                      <p className="text-amber-400 font-bold uppercase tracking-widest">Voice Narration Flow:</p>
                      <p className="text-zinc-400 mt-1 italic">{aiResult.voiceScript}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 border-t border-white/5 pt-2 text-center text-[9px]">
                      <div className="bg-black/20 p-1.5 rounded">
                        <span className="text-zinc-500">Target CPA:</span> <span className="text-emerald-400 font-bold">{aiResult.estimatedCPA}</span>
                      </div>
                      <div className="bg-black/20 p-1.5 rounded">
                        <span className="text-zinc-500">Expected ROAS:</span> <span className="text-white font-bold">{aiResult.expectedROAS}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* DEMO 3: Technical SEO Live Auditor */}
            {service.interactiveDemo === "seo-audit" && (
              <div className="space-y-5 w-full max-w-md mx-auto">
                <div className="text-center mb-3">
                  <Search className="w-8 h-8 text-[#C51F2A] mx-auto mb-2" />
                  <p className="font-display font-bold text-white">Semantic Schema & Speed Crawler</p>
                  <p className="font-sans text-xs text-zinc-500">Perform a high-fidelity audit to diagnose technical errors.</p>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={seoUrl}
                    onChange={(e) => setSeoUrl(e.target.value)}
                    className="flex-1 h-10 px-3 rounded-lg bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-[#B5121B]"
                  />
                  <button
                    onClick={handleSeoAudit}
                    disabled={isSeoAuditing}
                    className="px-4 h-10 bg-gradient-to-r from-[#8B0000] to-[#B5121B] hover:brightness-110 disabled:opacity-50 text-white font-display text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1.5"
                  >
                    {isSeoAuditing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : "Audit"}
                  </button>
                </div>

                {isSeoAuditing && (
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-1.5 font-mono text-[9px] text-[#C51F2A] animate-pulse">
                    <p>&gt; Connection established with {seoUrl}...</p>
                    <p>&gt; Resolving DNS lookup: took 12ms</p>
                    <p>&gt; Fetching robots.txt & semantic sitemap tree...</p>
                    <p>&gt; Verifying JSON-LD semantic structure...</p>
                  </div>
                )}

                {seoResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 font-mono text-[10px] bg-white/5 border border-indigo-500/30 p-4 rounded-xl"
                  >
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-black/20 p-2 rounded">
                        <p className="text-zinc-500 text-[8px]">PERFORMANCE</p>
                        <p className="text-emerald-400 font-bold text-xs mt-0.5">{seoResult.performance}</p>
                      </div>
                      <div className="bg-black/20 p-2 rounded">
                        <p className="text-zinc-500 text-[8px]">SEO SCORE</p>
                        <p className="text-emerald-400 font-bold text-xs mt-0.5">{seoResult.seoScore}</p>
                      </div>
                      <div className="bg-black/20 p-2 rounded">
                        <p className="text-zinc-500 text-[8px]">SPEED INDEX</p>
                        <p className="text-white font-bold text-xs mt-0.5">{seoResult.lighthouse.speedIndex}</p>
                      </div>
                    </div>

                    <div className="space-y-2 border-t border-white/5 pt-3">
                      <p className="text-indigo-400 font-bold uppercase tracking-widest text-[9px]">SEO Crawl Audit Diagnostics:</p>
                      {seoResult.issues.map((issue: any, i: number) => (
                        <div key={i} className="flex gap-2 items-start bg-black/10 p-2 rounded border border-white/5">
                          <span className={`px-1 rounded text-[8px] font-bold shrink-0 ${issue.type === "Critical" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"}`}>
                            {issue.type}
                          </span>
                          <span className="text-zinc-400 leading-normal text-[9px]">{issue.desc}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-white/5 pt-2 text-center text-[9px] text-zinc-500">
                      Opportunity Gap: <span className="text-white font-bold">{seoResult.competitorOverlap}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* DEMO 4: Automation Workflow Builder */}
            {service.interactiveDemo === "workflow-builder" && (
              <div className="space-y-5 w-full max-w-md mx-auto text-center">
                <div className="mb-3">
                  <Cpu className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="font-display font-bold text-white">Asynchronous Workflow Architect</p>
                  <p className="font-sans text-xs text-zinc-500">Test the automated routing pipeline nodes live.</p>
                </div>

                {/* Workflow Visualization Nodes */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2 relative py-4">
                  {/* Lead Trigger */}
                  <div className={`p-2.5 rounded-xl border w-24 text-center transition-all duration-300 ${activeWorkflowNode >= 1 ? "bg-emerald-500/10 border-emerald-400/50" : "bg-white/5 border-white/5"}`}>
                    <p className="font-mono text-[8px] text-zinc-500 uppercase">Step 01</p>
                    <p className="font-display text-[9px] font-bold text-white mt-0.5">Inbound Lead</p>
                  </div>

                  <ArrowRight className={`w-4 h-4 hidden md:block ${activeWorkflowNode >= 1 ? "text-emerald-400" : "text-zinc-700"}`} />

                  {/* AI Categorizer */}
                  <div className={`p-2.5 rounded-xl border w-24 text-center transition-all duration-300 ${activeWorkflowNode >= 2 ? "bg-emerald-500/10 border-emerald-400/50" : "bg-white/5 border-white/5"}`}>
                    <p className="font-mono text-[8px] text-zinc-500 uppercase">Step 02</p>
                    <p className="font-display text-[9px] font-bold text-white mt-0.5">AI Classifier</p>
                  </div>

                  <ArrowRight className={`w-4 h-4 hidden md:block ${activeWorkflowNode >= 2 ? "text-emerald-400" : "text-zinc-700"}`} />

                  {/* Database Sync */}
                  <div className={`p-2.5 rounded-xl border w-24 text-center transition-all duration-300 ${activeWorkflowNode >= 3 ? "bg-emerald-500/10 border-emerald-400/50" : "bg-white/5 border-white/5"}`}>
                    <p className="font-mono text-[8px] text-zinc-500 uppercase">Step 03</p>
                    <p className="font-display text-[9px] font-bold text-white mt-0.5">Stripe Invoicing</p>
                  </div>

                  <ArrowRight className={`w-4 h-4 hidden md:block ${activeWorkflowNode >= 3 ? "text-emerald-400" : "text-zinc-700"}`} />

                  {/* Slack Alert */}
                  <div className={`p-2.5 rounded-xl border w-24 text-center transition-all duration-300 ${activeWorkflowNode >= 4 ? "bg-emerald-500/10 border-emerald-400/50" : "bg-white/5 border-white/5"}`}>
                    <p className="font-mono text-[8px] text-zinc-500 uppercase">Step 04</p>
                    <p className="font-display text-[9px] font-bold text-white mt-0.5">Slack Alert</p>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <button
                    onClick={startWorkflowSimulation}
                    disabled={workflowStatus === "Executing..."}
                    className="px-5 h-10 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-900/40 text-white font-display text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" /> Trigger Workflow
                  </button>
                  <button
                    onClick={resetWorkflow}
                    className="px-5 h-10 glass-panel hover:bg-white/5 text-zinc-400 hover:text-white font-display text-[10px] font-bold uppercase tracking-widest rounded-lg"
                  >
                    Reset
                  </button>
                </div>

                <div className="p-3 bg-black/20 rounded-xl border border-white/5 text-center">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500">System Pipeline Logs:</span>
                  <p className="font-mono text-[10px] text-emerald-400 font-bold mt-1">{workflowStatus}</p>
                </div>
              </div>
            )}

            {/* DEMO 5: UI/UX Brand Moodboard Explorer */}
            {service.interactiveDemo === "moodboard" && (
              <div className="space-y-6 w-full max-w-md mx-auto">
                <div className="text-center mb-2">
                  <Layers className="w-8 h-8 text-[#C51F2A] mx-auto mb-2" />
                  <p className="font-display font-bold text-white">Visual Design Presets Explorer</p>
                  <p className="font-sans text-xs text-zinc-500">Tap to toggle luxury color theory palettes built live.</p>
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => setActiveMoodboardTheme("burgundy")}
                    className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono uppercase tracking-widest transition-all ${activeMoodboardTheme === "burgundy" ? "bg-[#8B0000]/60 text-white border-[#B5121B]" : "bg-zinc-900 text-zinc-500 border-white/5"}`}
                  >
                    Deep Red Luxury
                  </button>
                  <button
                    onClick={() => setActiveMoodboardTheme("platinum")}
                    className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono uppercase tracking-widest transition-all ${activeMoodboardTheme === "platinum" ? "bg-zinc-100 text-black border-white" : "bg-zinc-900 text-zinc-500 border-white/5"}`}
                  >
                    Stripe Platinum
                  </button>
                  <button
                    onClick={() => setActiveMoodboardTheme("space")}
                    className={`px-3 py-1.5 rounded-lg border text-[9px] font-mono uppercase tracking-widest transition-all ${activeMoodboardTheme === "space" ? "bg-zinc-900 text-white border-zinc-700" : "bg-zinc-900 text-zinc-500 border-white/5"}`}
                  >
                    Obsidian Dark
                  </button>
                </div>

                {/* Active Styled Mock Card */}
                <div className="relative p-6 rounded-2xl border transition-all duration-500 shadow-2xl h-44 flex flex-col justify-between overflow-hidden"
                     style={{
                       background: activeMoodboardTheme === "burgundy"
                         ? "rgba(36, 8, 13, 0.7)"
                         : activeMoodboardTheme === "platinum"
                         ? "rgba(255, 255, 255, 0.95)"
                         : "rgba(18, 18, 20, 0.9)",
                       borderColor: activeMoodboardTheme === "burgundy"
                         ? "rgba(181, 18, 27, 0.4)"
                         : activeMoodboardTheme === "platinum"
                         ? "rgba(0, 0, 0, 0.1)"
                         : "rgba(255, 255, 255, 0.1)",
                       color: activeMoodboardTheme === "platinum" ? "#0f172a" : "#ffffff"
                     }}
                >
                  {/* Subtle aurora highlight */}
                  <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-30"
                       style={{
                         background: activeMoodboardTheme === "burgundy"
                           ? "#FF1E56"
                           : activeMoodboardTheme === "platinum"
                           ? "#e2e8f0"
                           : "#333333"
                       }}
                  />

                  <div className="relative z-10">
                    <span className="font-mono text-[8px] uppercase tracking-widest opacity-60">Creative Asset #024</span>
                    <h4 className="font-display text-lg font-bold tracking-tight mt-1">Refined Glass Interface</h4>
                  </div>

                  <div className="relative z-10 flex items-center justify-between mt-4">
                    <div>
                      <p className="font-sans text-[10px] opacity-60">Visual Balance</p>
                      <p className="font-mono text-xs font-bold">1.618 Golden Ratio</p>
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center border"
                         style={{ borderColor: activeMoodboardTheme === "platinum" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)" }}>
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <p className="font-mono text-[8px] text-zinc-500 text-center leading-relaxed">
                  Interactive Presets show typography, margin, and light balances built inside Framer-perfect guidelines.
                </p>
              </div>
            )}

            {/* DEMO 6: Default fallback or Code Compiler */}
            {(service.interactiveDemo === "code-compiler" || !service.interactiveDemo) && (
              <div className="space-y-4 w-full max-w-md mx-auto text-left font-mono text-[10px] bg-black/60 p-5 rounded-2xl border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-zinc-500 text-[9px]">Majid Server Console v4.12</span>
                </div>
                <p className="text-zinc-500">&gt; npm run build:production</p>
                <p className="text-purple-400">&gt; Building React 19 components...</p>
                <p className="text-zinc-400">&gt; Optimizing bundles via Vite + esbuild: completed in 140ms</p>
                <p className="text-zinc-400">&gt; Compressing bundle assets using Gzip-Brotli: saved 84%</p>
                <p className="text-indigo-400">&gt; Structuring server-side Google Gen-AI proxy client: verified</p>
                <p className="text-emerald-400 font-bold">&gt; SLA Deployment Success: 100/100 Lighthouse score guaranteed</p>
                
                <div className="bg-white/5 rounded-lg p-2.5 border border-white/5 flex items-center justify-between mt-4">
                  <div>
                    <p className="text-zinc-500 text-[8px]">API EDGE RESOLUTION</p>
                    <p className="text-white font-bold text-xs mt-0.5">18ms latency</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>
              </div>
            )}

          </div>

        </div>

      </motion.div>
    </div>
  );
}
