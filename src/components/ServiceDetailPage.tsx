import React, { useState, useEffect } from "react";
import { Service } from "../types";
import { SERVICES, PROJECTS } from "../data";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Layers,
  Sparkles,
  TrendingUp,
  Search,
  Cpu,
  Monitor,
  CheckCircle2,
  Clock,
  DollarSign,
  ChevronDown,
  Trophy,
  ArrowUpRight,
  Terminal,
  Play,
  RotateCw,
  Sliders,
  Send,
  Zap,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ServiceDetailPageProps {
  service: Service;
  onBack: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectProject: (projectId: string) => void;
  onContactClick: (serviceCategory?: string) => void;
}

export default function ServiceDetailPage({
  service,
  onBack,
  onSelectService,
  onSelectProject,
  onContactClick
}: ServiceDetailPageProps) {
  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [service.id]);

  // Find previous and next services
  const currentIndex = SERVICES.findIndex((s) => s.id === service.id);
  const prevService = SERVICES[(currentIndex - 1 + SERVICES.length) % SERVICES.length];
  const nextService = SERVICES[(currentIndex + 1) % SERVICES.length];

  // Related projects
  const relatedProjects = PROJECTS.filter((p) =>
    service.relatedProjectIds?.includes(p.id) || p.serviceId === service.id
  );

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Interactive Demo Sandbox States
  const [roiBudget, setRoiBudget] = useState(6000);
  const [aiProduct, setAiProduct] = useState("Luxury Quartz Watch");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const [seoUrl, setSeoUrl] = useState("https://mybrand.com");
  const [isSeoAuditing, setIsSeoAuditing] = useState(false);
  const [seoResult, setSeoResult] = useState<any>(null);

  const [activeWorkflowNode, setActiveWorkflowNode] = useState(1);
  const [workflowStatus, setWorkflowStatus] = useState("Idle");

  const [activeMoodboardTheme, setActiveMoodboardTheme] = useState("carmine");

  // Icon Selector
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "Code2": return <Code2 className={className} />;
      case "Layers": return <Layers className={className} />;
      case "Sparkles": return <Sparkles className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "Search": return <Search className={className} />;
      case "Cpu": return <Cpu className={className} />;
      case "Monitor": return <Monitor className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  const handleSimulateAi = () => {
    setIsGeneratingAi(true);
    setTimeout(() => {
      setIsGeneratingAi(false);
      setAiResult(`Hook: "Stop scrolling if you care about true Swiss craftsmanship." \nVisual: 3D macro rotation of skeleton dial under anamorphic lighting. \nProjected CTR: 7.8% | ROAS: 4.8x`);
    }, 1200);
  };

  const handleSimulateSeo = () => {
    setIsSeoAuditing(true);
    setTimeout(() => {
      setIsSeoAuditing(false);
      setSeoResult({
        score: 98,
        coreWebVitals: "Passed (LCP 0.6s, CLS 0.00)",
        schemaStatus: "Valid (Organization, FAQPage, WebSite JSON-LD)",
        keywordOpportunity: "+4,200 High-Intent Monthly Searches"
      });
    }, 1400);
  };

  const handleSimulateWorkflow = () => {
    setWorkflowStatus("Executing...");
    setActiveWorkflowNode(2);
    setTimeout(() => setActiveWorkflowNode(3), 600);
    setTimeout(() => setActiveWorkflowNode(4), 1200);
    setTimeout(() => {
      setActiveWorkflowNode(1);
      setWorkflowStatus("Completed (All 4 nodes verified in 84ms)");
    }, 1800);
  };

  return (
    <div className="relative min-h-screen text-white pt-28 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Background Ambience */}
      <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full luxury-glow-1 pointer-events-none opacity-40" />
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] rounded-full luxury-glow-2 pointer-events-none opacity-30" />

      {/* Top Breadcrumb & Return Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass-panel-light hover:border-[#FF1E56]/60 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF1E56] group-hover:-translate-x-1 transition-transform" />
          <span>Return to All Services</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
          <span>Service Capability {currentIndex + 1} of {SERVICES.length}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-[#00F2FE]">{service.category}</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-6 mb-14">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#151928] border border-white/20 flex items-center justify-center text-[#FF1E56]">
            {renderIcon(service.iconName, "w-5 h-5")}
          </div>

          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF1E56] bg-[#220B15] border border-[#FF1E56]/40 px-3 py-1 rounded font-bold">
            {service.category}
          </span>

          {service.startingPrice && (
            <span className="text-zinc-300 font-mono text-xs flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/10">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Starting {service.startingPrice}
            </span>
          )}

          {service.turnaroundTime && (
            <span className="text-zinc-400 font-mono text-xs flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/10">
              <Clock className="w-3.5 h-3.5 text-[#00F2FE]" /> {service.turnaroundTime} Turnaround
            </span>
          )}
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none">
          {service.title}
        </h1>

        <p className="text-lg md:text-xl text-zinc-300 font-sans font-light max-w-3xl leading-relaxed">
          {service.fullDescription}
        </p>

        {service.valueProposition && (
          <div className="p-4 rounded-2xl bg-[#151928]/80 border border-[#00F2FE]/30 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00F2FE] font-bold block mb-1">
              Guaranteed Value Proposition
            </span>
            <p className="text-xs md:text-sm text-zinc-200 font-sans font-light leading-relaxed">
              {service.valueProposition}
            </p>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4">
          <button
            onClick={() => onContactClick(service.title)}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF1E56] to-[#FF6584] text-white font-display text-sm font-bold tracking-wider uppercase hover:brightness-110 shadow-[0_10px_30px_rgba(255,30,86,0.4)] transition-all"
          >
            Commission This Service
          </button>

          <a
            href="#interactive-sandbox"
            className="px-5 py-3 rounded-xl glass-panel-light hover:border-[#00F2FE]/60 text-zinc-200 hover:text-white font-mono text-xs flex items-center gap-2 transition-all"
          >
            <Zap className="w-4 h-4 text-[#00F2FE]" /> Test Interactive Sandbox ↓
          </a>
        </div>
      </div>

      {/* SLA & Performance Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-14">
        {service.metrics.map((metric) => (
          <div key={metric.label} className="p-6 rounded-2xl glass-panel border border-white/10 text-center">
            <span className="font-display text-4xl font-black bg-gradient-to-r from-white via-[#00F2FE] to-[#FF1E56] bg-clip-text text-transparent tabular-nums block">
              {metric.value}
            </span>
            <span className="font-mono text-xs text-zinc-300 uppercase tracking-wider font-semibold block mt-2">
              {metric.label}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Service Tool Sandbox */}
      <div id="interactive-sandbox" className="my-16 scroll-mt-24">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#FF1E56]" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
              Live Capability Sandbox & Interactive Simulator
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#00F2FE]">Fully Interactive</span>
        </div>

        <div className="p-6 md:p-8 rounded-3xl glass-panel border border-white/10 bg-[#090C14]">
          {/* 1. CODE COMPILER (Web Dev) */}
          {service.id === "web-dev" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Terminal: React 19 Component Benchmark</span>
                <span className="text-[10px] font-mono text-emerald-400">0.02ms render cycle</span>
              </div>
              <div className="p-4 rounded-xl bg-black/60 font-mono text-xs text-zinc-300 overflow-x-auto space-y-1">
                <p className="text-[#00F2FE]">{`// TypeScript Production Architecture`}</p>
                <p>{`export async function getClientPortfolio(id: string): Promise<PortfolioData> {`}</p>
                <p className="pl-4">{`const cache = await redis.get(\`user:\${id}\`);`}</p>
                <p className="pl-4">{`if (cache) return JSON.parse(cache);`}</p>
                <p className="pl-4">{`const record = await db.query.accounts.findFirst({ where: eq(accounts.id, id) });`}</p>
                <p className="pl-4">{`await redis.set(\`user:\${id}\`, JSON.stringify(record), "EX", 300);`}</p>
                <p className="pl-4">{`return record;`}</p>
                <p>{`}`}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 block">Server Speed</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">32ms Global Avg</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 block">Bundle Size</span>
                  <span className="text-xs font-mono font-bold text-white">42KB Compressed</span>
                </div>
                <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-[9px] font-mono text-zinc-400 block">Type Safety</span>
                  <span className="text-xs font-mono font-bold text-[#00F2FE]">100% Strict</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. MOODBOARD PALETTE (UI/UX) */}
          {service.id === "ui-ux" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Interactive Glassmorphism Theme Explorer</span>
                <div className="flex gap-2">
                  {(["carmine", "cyber", "gold"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActiveMoodboardTheme(t)}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase transition-colors ${
                        activeMoodboardTheme === t
                          ? "bg-[#FF1E56] text-white font-bold"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl glass-panel border border-[#FF1E56]/40 text-left">
                  <span className="text-[10px] font-mono text-[#FF1E56] font-bold block mb-1">01. Primary Elevation</span>
                  <h4 className="text-sm font-bold text-white">Swiss Typography</h4>
                  <p className="text-xs text-zinc-400 font-light mt-1">Instrument Serif paired with Satoshi Geometric.</p>
                </div>
                <div className="p-5 rounded-2xl glass-panel border border-[#00F2FE]/40 text-left">
                  <span className="text-[10px] font-mono text-[#00F2FE] font-bold block mb-1">02. Surface Contrast</span>
                  <h4 className="text-sm font-bold text-white">Deep Obsidian Slate</h4>
                  <p className="text-xs text-zinc-400 font-light mt-1">WCAG AA high-contrast optical compensation.</p>
                </div>
                <div className="p-5 rounded-2xl glass-panel border border-white/20 text-left">
                  <span className="text-[10px] font-mono text-white font-bold block mb-1">03. Tactile Feedback</span>
                  <h4 className="text-sm font-bold text-white">Spring Physics</h4>
                  <p className="text-xs text-zinc-400 font-light mt-1">Sub-100ms settling curves for zero interaction lag.</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. AI SCRIPT GENERATOR (AI Ads) */}
          {service.id === "ai-ads" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Synthetic Direct-Response Ad Prompt Synthesizer</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={aiProduct}
                  onChange={(e) => setAiProduct(e.target.value)}
                  placeholder="Enter Product Name (e.g. Luxury Timepiece)"
                  className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#FF1E56]"
                />
                <button
                  onClick={handleSimulateAi}
                  disabled={isGeneratingAi}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF1E56] to-[#FF6584] text-white text-xs font-bold font-mono hover:opacity-90 flex items-center justify-center gap-2"
                >
                  {isGeneratingAi ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Generate Hook
                </button>
              </div>
              {aiResult && (
                <div className="p-4 rounded-xl bg-black/40 border border-[#FF1E56]/30 text-xs font-mono text-zinc-200 whitespace-pre-line">
                  {aiResult}
                </div>
              )}
            </div>
          )}

          {/* 4. ROI CALCULATOR (Digital Marketing) */}
          {service.id === "digital-marketing" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Algorithmic Performance ROAS Predictor</span>
                <span className="text-xs font-mono font-bold text-[#00F2FE] tabular-nums">
                  Spend: ${roiBudget.toLocaleString()} / mo
                </span>
              </div>
              <input
                type="range"
                min={2000}
                max={40000}
                step={1000}
                value={roiBudget}
                onChange={(e) => setRoiBudget(Number(e.target.value))}
                className="w-full accent-[#FF1E56] cursor-pointer"
              />
              <div className="grid grid-cols-3 gap-3 text-center pt-2">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-400 block">Est. Revenue (4.8x)</span>
                  <span className="text-sm md:text-base font-bold text-emerald-400 font-display tabular-nums">
                    ${(roiBudget * 4.8).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-400 block">CPA Target</span>
                  <span className="text-sm md:text-base font-bold text-white font-display tabular-nums">
                    $38.50
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-zinc-400 block">Est. High-Intent Leads</span>
                  <span className="text-sm md:text-base font-bold text-[#00F2FE] font-display tabular-nums">
                    {Math.round(roiBudget / 38.5)} Leads
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 5. SEO AUDIT SIMULATOR (SEO) */}
          {service.id === "seo" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Technical SEO & Schema Crawler Audit</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={seoUrl}
                  onChange={(e) => setSeoUrl(e.target.value)}
                  placeholder="https://yourbrand.com"
                  className="flex-1 px-4 py-2 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#00F2FE]"
                />
                <button
                  onClick={handleSimulateSeo}
                  disabled={isSeoAuditing}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#3B82F6] text-black text-xs font-bold font-mono hover:opacity-90 flex items-center justify-center gap-2"
                >
                  {isSeoAuditing ? <RotateCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  Audit Technical Health
                </button>
              </div>
              {seoResult && (
                <div className="p-4 rounded-xl bg-black/40 border border-[#00F2FE]/30 text-xs font-mono text-zinc-200 space-y-1.5">
                  <p className="text-emerald-400 font-bold">Lighthouse Score: {seoResult.score}/100</p>
                  <p>Core Web Vitals: {seoResult.coreWebVitals}</p>
                  <p>Schema.org Graph: {seoResult.schemaStatus}</p>
                  <p className="text-[#00F2FE]">Organic Opportunity: {seoResult.keywordOpportunity}</p>
                </div>
              )}
            </div>
          )}

          {/* 6. AUTOMATION NODE SIMULATOR (Automation) */}
          {service.id === "automation" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Event-Driven Workflow Dispatch Engine</span>
                <span className="text-[10px] font-mono text-[#00F2FE]">{workflowStatus}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Inbound Webhook", "AI Enrichment", "PostgreSQL Upsert", "Slack Alert"].map((step, idx) => (
                  <div
                    key={step}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      activeWorkflowNode === idx + 1
                        ? "bg-[#151928] border-[#00F2FE] text-white scale-105"
                        : "bg-black/40 border-white/10 text-zinc-400"
                    }`}
                  >
                    <span className="text-[9px] font-mono block">Node 0{idx + 1}</span>
                    <span className="text-xs font-bold mt-1 block">{step}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSimulateWorkflow}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#00F2FE] to-[#FF1E56] text-black font-bold text-xs font-mono hover:opacity-90"
              >
                Fire Test Webhook Payload
              </button>
            </div>
          )}

          {/* 7. LANDING PAGES */}
          {service.id === "landing-pages" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs font-mono text-zinc-400">Conversion Architecture Framework</span>
                <span className="text-[10px] font-mono text-emerald-400">8.7% Benchmark Conversion</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-[#FF1E56] font-bold block">Hero Section</span>
                  <p className="text-xs text-white mt-1">High-impact headline, sub-second LCP, zero clutter.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-[#00F2FE] font-bold block">Social Proof</span>
                  <p className="text-xs text-white mt-1">Verifiable metrics and adjacent client testimonials.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-[10px] font-mono text-white font-bold block">Conversion Hook</span>
                  <p className="text-xs text-white mt-1">Frictionless form with instant serverless dispatch.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4-Phase Engineering Roadmap */}
      {service.detailedPhases && service.detailedPhases.length > 0 && (
        <div className="my-16 space-y-6">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#00F2FE]" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
              The Majid Engineering Roadmap
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {service.detailedPhases.map((phase) => (
              <div
                key={phase.step}
                className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-mono font-bold text-[#FF1E56]">{phase.step}</span>
                    <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                      {phase.duration}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    {phase.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-sans font-light mt-2 leading-relaxed">
                    {phase.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1.5">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block">
                    Key Outputs:
                  </span>
                  {phase.keyDeliverables.map((del) => (
                    <div key={del} className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-300">
                      <span className="w-1 h-1 rounded-full bg-[#00F2FE]" /> {del}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Granular Deliverables Checklist & Tech Stack Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-16">
        {/* Deliverables (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
            Complete Included Deliverables
          </h3>

          <div className="space-y-3">
            {service.deliverables.map((del) => (
              <div key={del} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#FF1E56] shrink-0 mt-0.5" />
                <span className="text-xs text-zinc-200 font-sans font-light">{del}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#00F2FE]" /> Industry Tools & Frameworks
          </h3>

          <div className="flex flex-wrap gap-2">
            {service.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">
              Investment & SLA Guarantee
            </span>
            <div className="p-4 rounded-xl bg-[#151928] border border-white/10 space-y-1">
              <p className="text-xs text-zinc-300 font-mono">
                Starting at <span className="text-white font-bold">{service.startingPrice || "$3,000"}</span>
              </p>
              <p className="text-xs text-zinc-400 font-mono">
                Estimated Turnaround: <span className="text-[#00F2FE] font-bold">{service.turnaroundTime || "2-4 Weeks"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Projects Built with This Service */}
      {relatedProjects.length > 0 && (
        <div className="my-16 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FF1E56]" />
              <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
                Featured Case Studies Utilizing This Service
              </h2>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Proven Market Results</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => onSelectProject(proj.id)}
                className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#FF1E56]/50 transition-all cursor-pointer group flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#FF1E56]">
                      {proj.category}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">{proj.metric.value}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white group-hover:text-[#FF6584] transition-colors flex items-center justify-between">
                    {proj.title}
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-[#00F2FE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans font-light mt-2 line-clamp-2">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Client: {proj.client}</span>
                  <span className="text-[#00F2FE] group-hover:underline">Explore Case Study →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions (FAQ) Accordion */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="my-16 space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#FF1E56]" />
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-300 font-bold">
              Frequently Addressed Inquiries
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-display text-sm md:text-base font-bold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#FF1E56]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 pt-1 text-xs md:text-sm text-zinc-300 font-sans font-light leading-relaxed border-t border-white/5"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next / Previous Service Switcher */}
      <div className="my-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Previous */}
        <button
          onClick={() => onSelectService(prevService.id)}
          className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#FF1E56]/50 text-left transition-all group flex items-center justify-between"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
              ← Previous Service
            </span>
            <h4 className="font-display text-lg font-bold text-white group-hover:text-[#FF6584] transition-colors">
              {prevService.title}
            </h4>
            <span className="font-mono text-xs text-[#00F2FE]">{prevService.category}</span>
          </div>
          <ArrowLeft className="w-5 h-5 text-zinc-500 group-hover:text-[#FF1E56] group-hover:-translate-x-1 transition-all" />
        </button>

        {/* Next */}
        <button
          onClick={() => onSelectService(nextService.id)}
          className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-[#00F2FE]/50 text-right transition-all group flex items-center justify-between flex-row-reverse"
        >
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">
              Next Service →
            </span>
            <h4 className="font-display text-lg font-bold text-white group-hover:text-[#00F2FE] transition-colors">
              {nextService.title}
            </h4>
            <span className="font-mono text-xs text-[#FF1E56]">{nextService.category}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-[#00F2FE] group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Final Strategic CTA */}
      <div className="mt-20 p-8 md:p-12 rounded-3xl glass-panel border border-[#FF1E56]/40 text-center bg-gradient-to-b from-[#220B15] to-[#0A0C14] space-y-6">
        <h3 className="font-display text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Ready to Deploy {service.title}?
        </h3>
        <p className="text-zinc-300 font-sans font-light text-sm max-w-xl mx-auto leading-relaxed">
          Skip standard agency delays. Book directly with Majid to map out your architecture, timeline, and exact deliverables.
        </p>
        <button
          onClick={() => onContactClick(service.title)}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF1E56] to-[#00F2FE] text-black font-display text-sm font-black tracking-wider uppercase hover:opacity-90 shadow-2xl transition-all"
        >
          Request Strategic Proposal & Quote
        </button>
      </div>
    </div>
  );
}
