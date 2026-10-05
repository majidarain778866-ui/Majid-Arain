import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverType, setHoverType] = useState<"standard" | "magnetic">("standard");

  // High precision mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics configuration for luxurious trailing feel
  const springConfig = { damping: 30, stiffness: 220, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices to prevent mobile touch latency
    const mediaQuery = window.matchMedia("(pointer: fine)");
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    // Listen to mouse hovers globally to handle dynamically mounted elements cleanly
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if current target or its parent is an interactive element
      const interactiveEl = target.closest("a, button, input, select, textarea, [role='button'], [id^='service-card-'], [id^='project-card-']");
      
      if (interactiveEl) {
        setIsHovered(true);
        // If it's a card or a primary button, apply an extra luxury magnetic feel
        if (interactiveEl.tagName === "BUTTON" || interactiveEl.id?.includes("-card-")) {
          setHoverType("magnetic");
        } else {
          setHoverType("standard");
        }
      } else {
        setIsHovered(false);
      }
    };

    // Add CSS cursor none on body
    document.body.classList.add("custom-cursor-active");

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-9999 mix-blend-difference">
      {/* Dynamic Trailing Glowing Ring */}
      <motion.div
        className="absolute w-8 h-8 rounded-full border border-[#FF1E56] bg-transparent -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(255,30,86,0.8)]"
        style={{
          x: cursorX,
          y: cursorY,
          scale: isHovered ? (hoverType === "magnetic" ? 2.2 : 1.6) : 1,
          borderColor: isHovered ? "#00F2FE" : "rgba(255, 30, 86, 0.8)",
          backgroundColor: isHovered ? "rgba(0, 242, 254, 0.15)" : "rgba(255, 30, 86, 0.08)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* High precision center dot */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-white -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#00F2FE]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 0.6 : 1,
          backgroundColor: isHovered ? "#00F2FE" : "#FF1E56",
        }}
      />
    </div>
  );
}
