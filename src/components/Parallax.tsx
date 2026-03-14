"use client";

import { ReactNode, useRef, useEffect, useId, useCallback } from "react";
import { useLenis } from "lenis/react";
import { useOptionalScrollContext } from "../lib/scroll-context";

interface ParallaxProps {
  children: ReactNode;
  /**
   * Parallax speed multiplier.
   * - Positive values: element moves up as you scroll down (appears to move faster)
   * - Negative values: element moves down as you scroll down (appears to move slower/lag)
   * - Typical range: -2 to 2
   */
  speed?: number;
  /**
   * Direction of the parallax effect.
   * - "vertical": translateY (default)
   * - "horizontal": translateX
   */
  direction?: "vertical" | "horizontal";
  /**
   * Optional className for the wrapper element.
   */
  className?: string;
  /**
   * Base pixel range for the parallax effect.
   * The actual movement will be baseRange * speed pixels.
   * Default: 50
   */
  baseRange?: number;
}

/**
 * Parallax component that creates scroll-linked animations using Lenis.
 * Replaces the previous Framer Motion implementation.
 *
 * Uses a shared ScrollProvider context and subscribes to Lenis scroll events
 * to apply GPU-accelerated transforms directly via refs.
 *
 * Respects user's prefers-reduced-motion setting for accessibility.
 */
const Parallax = ({
  children,
  speed = 1,
  direction = "vertical",
  className = "",
  baseRange = 50,
}: ParallaxProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const scrollContext = useOptionalScrollContext();
  const prefersReducedMotionRef = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mql.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Register with scroll context
  useEffect(() => {
    if (!scrollContext) return;
    const { registerElement } = scrollContext;
    const unregister = registerElement(uniqueId, ref);
    return () => {
      unregister();
    };
  }, [scrollContext, uniqueId]);

  // Calculate and apply transform on each lenis scroll frame
  const range = baseRange * speed;

  const applyTransform = useCallback(() => {
    if (!scrollContext || !ref.current || prefersReducedMotionRef.current)
      return;

    const { getElementProgress } = scrollContext;
    const progress = getElementProgress(uniqueId);

    // Map progress (0-1) to pixel offset: progress=0 → +range, progress=1 → -range
    const offset = range - progress * range * 2;

    if (direction === "vertical") {
      ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    } else {
      ref.current.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
  }, [scrollContext, uniqueId, range, direction]);

  // Subscribe to lenis scroll events
  useLenis(() => {
    applyTransform();
  });

  // Apply initial transform after mount
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      applyTransform();
    });
    return () => cancelAnimationFrame(raf);
  }, [applyTransform]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
};

export default Parallax;
