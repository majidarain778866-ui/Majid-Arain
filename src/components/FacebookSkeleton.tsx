import React from "react";

interface SkeletonProps {
  className?: string;
  key?: React.Key;
}

export function SkeletonCircle({ className = "w-10 h-10" }: SkeletonProps) {
  return (
    <div
      className={`rounded-full bg-zinc-800/80 fb-shimmer shrink-0 border border-white/5 ${className}`}
    />
  );
}

export function SkeletonLine({
  className = "w-full h-3",
  subtle = false,
}: SkeletonProps & { subtle?: boolean }) {
  return (
    <div
      className={`rounded-md ${
        subtle ? "bg-zinc-850/60 fb-shimmer-subtle" : "bg-zinc-800/80 fb-shimmer-line"
      } ${className}`}
    />
  );
}

export function SkeletonCard({ className = "h-48" }: SkeletonProps) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-zinc-950/60 p-5 space-y-4 fb-shimmer relative overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-3">
        <SkeletonCircle className="w-9 h-9" />
        <div className="space-y-1.5 flex-1">
          <SkeletonLine className="w-1/3 h-3" />
          <SkeletonLine className="w-1/4 h-2" subtle />
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <SkeletonLine className="w-full h-2.5" subtle />
        <SkeletonLine className="w-4/5 h-2.5" subtle />
        <SkeletonLine className="w-2/3 h-2.5" subtle />
      </div>
    </div>
  );
}

/* Facebook-Style Section Header Skeleton */
export function SectionHeaderSkeleton() {
  return (
    <div className="space-y-3 mb-10 text-center max-w-xl mx-auto flex flex-col items-center">
      <SkeletonLine className="w-32 h-6 rounded-full" />
      <SkeletonLine className="w-72 h-8 rounded-lg" />
      <SkeletonLine className="w-96 h-3 rounded-md" subtle />
    </div>
  );
}

/* Specialized Section: Services Preview Skeleton */
export function ServicesSectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
      <SectionHeaderSkeleton />

      {/* Filter Tabs Shimmer */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <SkeletonLine className="w-20 h-8 rounded-full" />
        <SkeletonLine className="w-24 h-8 rounded-full" />
        <SkeletonLine className="w-28 h-8 rounded-full" />
        <SkeletonLine className="w-20 h-8 rounded-full" />
      </div>

      {/* 3-Column Services Card Shimmers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((idx) => (
          <div
            key={idx}
            className="p-8 rounded-3xl border border-white/5 bg-zinc-950/60 fb-shimmer space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <SkeletonCircle className="w-12 h-12 rounded-xl" />
              <SkeletonCircle className="w-8 h-8 rounded-full" />
            </div>
            <div className="space-y-2">
              <SkeletonLine className="w-24 h-2 rounded" />
              <SkeletonLine className="w-48 h-5 rounded-lg" />
              <SkeletonLine className="w-full h-3 rounded" subtle />
              <SkeletonLine className="w-4/5 h-3 rounded" subtle />
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <SkeletonLine className="w-24 h-4 rounded" />
              <SkeletonLine className="w-20 h-3 rounded" subtle />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Specialized Section: Featured Work Skeleton */
export function ProjectsSectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-white/5 bg-zinc-950/60 fb-shimmer p-6 space-y-5 overflow-hidden"
          >
            <div className="w-full h-56 rounded-2xl bg-zinc-900/80 fb-shimmer-subtle relative overflow-hidden" />
            <div className="flex items-center gap-2">
              <SkeletonLine className="w-20 h-5 rounded-full" />
              <SkeletonLine className="w-24 h-5 rounded-full" />
            </div>
            <SkeletonLine className="w-64 h-6 rounded-lg" />
            <div className="space-y-2">
              <SkeletonLine className="w-full h-3 rounded" subtle />
              <SkeletonLine className="w-5/6 h-3 rounded" subtle />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Specialized Section: Process / Timeline Skeleton */
export function ProcessSectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className="p-6 rounded-2xl border border-white/5 bg-zinc-950/60 fb-shimmer space-y-4"
          >
            <div className="flex items-center justify-between">
              <SkeletonCircle className="w-10 h-10 rounded-xl" />
              <SkeletonLine className="w-8 h-4 rounded" />
            </div>
            <SkeletonLine className="w-32 h-5 rounded-lg" />
            <SkeletonLine className="w-full h-3 rounded" subtle />
            <SkeletonLine className="w-4/5 h-3 rounded" subtle />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Specialized Section: Why Choose Me / Integrity Skeleton */
export function IntegritySectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="p-8 rounded-3xl border border-white/5 bg-zinc-950/60 fb-shimmer space-y-4"
          >
            <SkeletonLine className="w-24 h-10 rounded-xl" />
            <SkeletonLine className="w-44 h-5 rounded-lg" />
            <SkeletonLine className="w-full h-3 rounded" subtle />
            <SkeletonLine className="w-3/4 h-3 rounded" subtle />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Specialized Section: Testimonials Skeleton */
export function TestimonialsSectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-7 rounded-2xl border border-white/5 bg-zinc-950/60 fb-shimmer space-y-4"
          >
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <SkeletonCircle key={s} className="w-4 h-4 rounded-sm" />
              ))}
            </div>
            <div className="space-y-2">
              <SkeletonLine className="w-full h-3 rounded" subtle />
              <SkeletonLine className="w-11/12 h-3 rounded" subtle />
              <SkeletonLine className="w-4/5 h-3 rounded" subtle />
            </div>
            <div className="pt-4 border-t border-white/5 flex items-center gap-3">
              <SkeletonCircle className="w-10 h-10" />
              <div className="space-y-1.5 flex-1">
                <SkeletonLine className="w-28 h-3 rounded" />
                <SkeletonLine className="w-20 h-2 rounded" subtle />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Specialized Section: Contact Form Skeleton */
export function ContactSectionSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-20">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <SkeletonCard className="h-44" />
          <SkeletonCard className="h-44" />
        </div>
        <div className="lg:col-span-7 p-8 rounded-3xl border border-white/5 bg-zinc-950/60 fb-shimmer space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <SkeletonLine className="w-full h-12 rounded-xl" />
            <SkeletonLine className="w-full h-12 rounded-xl" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <SkeletonLine className="w-full h-12 rounded-xl" />
            <SkeletonLine className="w-full h-12 rounded-xl" />
          </div>
          <SkeletonLine className="w-full h-28 rounded-xl" />
          <SkeletonLine className="w-full h-14 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default {
  SkeletonCircle,
  SkeletonLine,
  SkeletonCard,
  SectionHeaderSkeleton,
  ServicesSectionSkeleton,
  ProjectsSectionSkeleton,
  ProcessSectionSkeleton,
  IntegritySectionSkeleton,
  TestimonialsSectionSkeleton,
  ContactSectionSkeleton,
};
