import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ServicesSectionSkeleton,
  ProjectsSectionSkeleton,
  ProcessSectionSkeleton,
  IntegritySectionSkeleton,
  TestimonialsSectionSkeleton,
  ContactSectionSkeleton,
  SkeletonCard,
} from "./FacebookSkeleton";

export type SectionSkeletonType =
  | "services"
  | "projects"
  | "process"
  | "integrity"
  | "testimonials"
  | "contact"
  | "generic";

interface SectionShimmerRevealProps {
  children: React.ReactNode;
  skeletonType: SectionSkeletonType;
  id?: string;
  className?: string;
  delayMs?: number; // duration of the Facebook shimmer placeholder before resolving
}

export default function SectionShimmerReveal({
  children,
  skeletonType,
  id,
  className = "",
  delayMs = 450,
}: SectionShimmerRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.12 });
  const [isResolved, setIsResolved] = useState(false);

  useEffect(() => {
    if (isInView && !isResolved) {
      const timer = setTimeout(() => {
        setIsResolved(true);
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [isInView, delayMs, isResolved]);

  const renderSkeleton = () => {
    switch (skeletonType) {
      case "services":
        return <ServicesSectionSkeleton />;
      case "projects":
        return <ProjectsSectionSkeleton />;
      case "process":
        return <ProcessSectionSkeleton />;
      case "integrity":
        return <IntegritySectionSkeleton />;
      case "testimonials":
        return <TestimonialsSectionSkeleton />;
      case "contact":
        return <ContactSectionSkeleton />;
      case "generic":
      default:
        return (
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SkeletonCard className="h-64" />
              <SkeletonCard className="h-64" />
              <SkeletonCard className="h-64" />
            </div>
          </div>
        );
    }
  };

  return (
    <div id={id} ref={containerRef} className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        {!isResolved ? (
          <motion.div
            key="skeleton-placeholder"
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
            }}
            className="w-full relative pointer-events-none select-none"
          >
            {/* Shimmer Screen Indicator Pill */}
            <div className="absolute top-6 right-6 md:right-12 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141724] border border-[#FF1E56]/50 shadow-[0_0_15px_rgba(255,30,86,0.35)] text-[9px] font-mono text-zinc-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F2FE] animate-ping" />
              <span className="text-white font-semibold uppercase tracking-wider">
                Shimmer Placeholder
              </span>
            </div>

            {/* The Animated Facebook-Style Skeleton Wireframe */}
            {renderSkeleton()}
          </motion.div>
        ) : (
          <motion.div
            key="resolved-content"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
