import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ServicePreview from "./components/ServicePreview";
import FeaturedWork from "./components/FeaturedWork";
import AgencyInsights from "./components/AgencyInsights";
import Process from "./components/Process";
import WhyChooseMe from "./components/WhyChooseMe";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import PageProgressBar from "./components/PageProgressBar";
import BackToTop from "./components/BackToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import PageLoader from "./components/PageLoader";
import SectionShimmerReveal from "./components/SectionShimmerReveal";
import SEO from "./components/SEO";
import ProjectDetailPage from "./components/ProjectDetailPage";
import ServiceDetailPage from "./components/ServiceDetailPage";
import ArticleDetailPage from "./components/ArticleDetailPage";
import { Service, Project, Article } from "./types";
import { SERVICES, PROJECTS, ARTICLES } from "./data";
import { AnimatePresence } from "motion/react";

export default function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [contactInitialService, setContactInitialService] = useState<string | undefined>(undefined);

  // Parse URL hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash.startsWith("#/project/")) {
        const projectId = hash.replace("#/project/", "").split("?")[0];
        const found = PROJECTS.find((p) => p.id === projectId);
        if (found) {
          setActiveProject(found);
          setActiveService(null);
          setActiveArticle(null);
          return;
        }
      } else if (hash.startsWith("#/service/")) {
        const serviceId = hash.replace("#/service/", "").split("?")[0];
        const found = SERVICES.find((s) => s.id === serviceId);
        if (found) {
          setActiveService(found);
          setActiveProject(null);
          setActiveArticle(null);
          return;
        }
      } else if (hash.startsWith("#/article/")) {
        const articleSlug = hash.replace("#/article/", "").split("?")[0];
        const found = ARTICLES.find((a) => a.slug === articleSlug || a.id === articleSlug);
        if (found) {
          setActiveArticle(found);
          setActiveProject(null);
          setActiveService(null);
          return;
        }
      }

      // If no project, service, or article route matches, return to home view
      if (!hash.startsWith("#/project/") && !hash.startsWith("#/service/") && !hash.startsWith("#/article/")) {
        setActiveProject(null);
        setActiveService(null);
        setActiveArticle(null);
      }
    };

    // Run on initial mount
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigation handlers
  const navigateToProject = (projectId: string) => {
    const found = PROJECTS.find((p) => p.id === projectId);
    if (found) {
      setActiveProject(found);
      setActiveService(null);
      setActiveArticle(null);
      window.location.hash = `/project/${projectId}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToService = (serviceId: string) => {
    const found = SERVICES.find((s) => s.id === serviceId);
    if (found) {
      setActiveService(found);
      setActiveProject(null);
      setActiveArticle(null);
      window.location.hash = `/service/${serviceId}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateToArticle = (slug: string) => {
    const found = ARTICLES.find((a) => a.slug === slug || a.id === slug);
    if (found) {
      setActiveArticle(found);
      setActiveProject(null);
      setActiveService(null);
      window.location.hash = `/article/${slug}`;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navigateHome = (sectionId?: string) => {
    setActiveProject(null);
    setActiveService(null);
    setActiveArticle(null);

    if (sectionId) {
      window.location.hash = sectionId;
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      window.location.hash = "/";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Scroll to contact form with optional prefilled service
  const scrollToContact = (serviceCategory?: string) => {
    if (serviceCategory) {
      setContactInitialService(serviceCategory);
    }

    if (activeProject || activeService || activeArticle) {
      // If currently on a subpage, navigate to home and scroll to contact
      setActiveProject(null);
      setActiveService(null);
      setActiveArticle(null);
      window.location.hash = "contact";
      setTimeout(() => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 80);
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Dynamic SEO metadata
  let seoTitle = "MAJID — Category-Defining Digital Architecture & Full-Stack Engineering";
  let seoDescription = "Custom high-performance web applications, bespoke UI/UX design, AI solutions, and full-stack digital architecture engineered by Majid.";

  if (activeProject) {
    seoTitle = `${activeProject.title} — Case Study | Majid Architecture`;
    seoDescription = `${activeProject.description} Deliverables, live interactive prototype, and performance metrics.`;
  } else if (activeService) {
    seoTitle = `${activeService.title} — Capabilities & Architecture | Majid`;
    seoDescription = `${activeService.shortDescription} Explore deliverables, interactive sandbox, and SLAs.`;
  } else if (activeArticle) {
    seoTitle = `${activeArticle.title} — Technical Deep Dive | Majid`;
    seoDescription = activeArticle.metaDescription;
  }

  const isSubPage = Boolean(activeProject || activeService || activeArticle);

  return (
    <div className="relative min-h-screen bg-[#070707] selection:bg-[#B5121B] selection:text-white overflow-hidden pb-4">
      {/* Signature Smooth Shimmer Page Loader */}
      {isPageLoading && (
        <PageLoader onComplete={() => setIsPageLoading(false)} minDuration={1200} />
      )}

      {/* Dynamic SEO Head Metadata Manager */}
      <SEO title={seoTitle} description={seoDescription} />

      {/* Viewport Reading Progress Bar */}
      <PageProgressBar />

      {/* Floating Glassmorphic Back To Top Button */}
      <BackToTop />

      {/* Floating Interactive WhatsApp Contact Button */}
      <WhatsAppButton />

      {/* Custom Spring Cursor */}
      <CustomCursor />

      {/* Absolute background immersive lighting arrays without blur */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(255,30,86,0.18)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(0,242,254,0.10)_0%,transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_75%,rgba(139,92,246,0.10)_0%,transparent_45%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_105%,rgba(255,30,86,0.12)_0%,transparent_50%)] pointer-events-none" />

      {/* Soft noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating Glass Navbar */}
      <Navbar
        onContactClick={() => scrollToContact()}
        onGmailClick={() => scrollToContact()}
        onReplayLoad={() => setIsPageLoading(true)}
        onNavigateHome={navigateHome}
        isSubPage={isSubPage}
      />

      {/* VIEW ROUTING */}
      {activeProject ? (
        /* DEDICATED PROJECT DETAIL PAGE */
        <ProjectDetailPage
          project={activeProject}
          onBack={() => navigateHome("work")}
          onSelectProject={navigateToProject}
          onSelectService={navigateToService}
          onContactClick={scrollToContact}
        />
      ) : activeService ? (
        /* DEDICATED SERVICE DETAIL PAGE */
        <ServiceDetailPage
          service={activeService}
          onBack={() => navigateHome("services")}
          onSelectService={(sId) => navigateToService(sId)}
          onSelectProject={navigateToProject}
          onContactClick={scrollToContact}
        />
      ) : activeArticle ? (
        /* DEDICATED ARTICLE / INSIGHT DETAIL PAGE */
        <ArticleDetailPage
          article={activeArticle}
          onBack={() => navigateHome("insights")}
          onSelectArticle={navigateToArticle}
          onSelectService={navigateToService}
          onSelectProject={navigateToProject}
          onContactClick={scrollToContact}
        />
      ) : (
        /* MAIN HOMEPAGE LANDING PORTFOLIO */
        <main>
          {/* Hero Section */}
          <Hero onCtaClick={() => scrollToContact()} />

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Service Capabilities Grid */}
          <SectionShimmerReveal skeletonType="services" id="services">
            <ServicePreview onServiceSelect={(s) => navigateToService(s.id)} />
          </SectionShimmerReveal>

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Featured Projects Showcase */}
          <SectionShimmerReveal skeletonType="projects" id="projects">
            <FeaturedWork onSelectProject={navigateToProject} />
          </SectionShimmerReveal>

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Agency Insights & Engineering Journal */}
          <SectionShimmerReveal skeletonType="integrity" id="insights">
            <AgencyInsights onSelectArticle={navigateToArticle} />
          </SectionShimmerReveal>

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Engagement Delivery Timeline / Process */}
          <SectionShimmerReveal skeletonType="process" id="process">
            <Process />
          </SectionShimmerReveal>

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Technical Integrity Grid / Why Choose Us */}
          <SectionShimmerReveal skeletonType="integrity" id="why-choose-me">
            <WhyChooseMe />
          </SectionShimmerReveal>

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Testimonials */}
          <SectionShimmerReveal skeletonType="testimonials" id="testimonials">
            <Testimonials />
          </SectionShimmerReveal>

          {/* Divider Line */}
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {/* Contact Section */}
          <SectionShimmerReveal skeletonType="contact" id="contact">
            <ContactSection initialService={contactInitialService} />
          </SectionShimmerReveal>
        </main>
      )}

      {/* Premium Footer */}
      <Footer />
    </div>
  );
}
