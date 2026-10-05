import React from "react";
import { motion, Variants } from "motion/react";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up" | "blur-in";
  delay?: number;
  duration?: number;
  distance?: number;
  amount?: number | "some" | "all";
  once?: boolean;
  staggerChildren?: number;
  key?: React.Key;
}

export default function ScrollReveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  distance = 35,
  amount = 0.15,
  once = true,
  staggerChildren,
}: ScrollRevealProps) {
  const getInitialState = () => {
    switch (variant) {
      case "fade-up":
        return { opacity: 0, y: distance };
      case "fade-down":
        return { opacity: 0, y: -distance };
      case "fade-left":
        return { opacity: 0, x: distance };
      case "fade-right":
        return { opacity: 0, x: -distance };
      case "scale-up":
        return { opacity: 0, scale: 0.93 };
      case "blur-in":
        return { opacity: 0, scale: 0.96 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  const getTargetState = () => {
    switch (variant) {
      case "fade-up":
      case "fade-down":
        return { opacity: 1, y: 0 };
      case "fade-left":
      case "fade-right":
        return { opacity: 1, x: 0 };
      case "scale-up":
      case "blur-in":
        return { opacity: 1, scale: 1 };
      default:
        return { opacity: 1, y: 0 };
    }
  };

  const containerVariants: Variants = {
    hidden: getInitialState(),
    visible: {
      ...getTargetState(),
      transition: {
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
        staggerChildren: staggerChildren || 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item wrapper for staggered reveals inside a ScrollReveal container
export function ScrollRevealItem({
  children,
  className = "",
  variant = "fade-up",
  distance = 25,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale-up";
  distance?: number;
}) {
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? distance : variant === "fade-down" ? -distance : 0,
      x: variant === "fade-left" ? distance : variant === "fade-right" ? -distance : 0,
      scale: variant === "scale-up" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
