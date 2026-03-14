"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
  ReactNode,
  RefObject,
} from "react";
import { ReactLenis, useLenis } from "lenis/react";

interface ScrollContextValue {
  scrollY: number;
  viewportHeight: number;
  registerElement: (
    _id: string,
    _ref: RefObject<HTMLElement | null>,
  ) => () => void;
  getElementProgress: (_id: string) => number;
}

const ScrollContext = createContext<ScrollContextValue | null>(null);

interface ElementEntry {
  ref: RefObject<HTMLElement | null>;
  top: number;
  height: number;
}

interface ScrollProviderProps {
  children: ReactNode;
}

/**
 * ScrollProvider - A centralized scroll management system for parallax effects.
 *
 * Uses Lenis for smooth scrolling and provides a single scroll context
 * that all Parallax components share.
 *
 * Benefits:
 * - Smooth, buttery scrolling via Lenis
 * - Single scroll event listener instead of N listeners
 * - Reduced memory overhead
 * - Better performance on scroll-heavy pages
 */
export function ScrollProvider({ children }: ScrollProviderProps) {
  const scrollYRef = useRef(0);
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const elementsRef = useRef<Map<string, ElementEntry>>(new Map());
  const prefersReducedMotionRef = useRef(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    prefersReducedMotionRef.current = mql.matches;

    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", handler);

    setViewportHeight(window.innerHeight);

    // Handle resize
    const handleResize = () => {
      setViewportHeight(window.innerHeight);

      // Update cached element positions on resize
      elementsRef.current.forEach((entry) => {
        if (entry.ref.current) {
          const rect = entry.ref.current.getBoundingClientRect();
          entry.top = rect.top + window.scrollY;
          entry.height = rect.height;
        }
      });
    };

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener("resize", debouncedResize, { passive: true });

    return () => {
      mql.removeEventListener("change", handler);
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Subscribe to Lenis scroll events
  useLenis((lenis) => {
    scrollYRef.current = lenis.scroll;
    setScrollY(lenis.scroll);
  });

  // Register an element for parallax tracking
  const registerElement = useCallback(
    (id: string, ref: RefObject<HTMLElement | null>) => {
      const calculatePosition = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          elementsRef.current.set(id, {
            ref,
            top: rect.top + window.scrollY,
            height: rect.height,
          });
        }
      };

      requestAnimationFrame(calculatePosition);

      const timeoutId = setTimeout(calculatePosition, 500);

      return () => {
        elementsRef.current.delete(id);
        clearTimeout(timeoutId);
      };
    },
    [],
  );

  // Get the scroll progress for a specific element (0 = entering viewport, 1 = leaving viewport)
  const getElementProgress = useCallback(
    (id: string): number => {
      if (prefersReducedMotionRef.current) return 0.5;

      const entry = elementsRef.current.get(id);
      if (!entry || viewportHeight === 0) return 0.5;

      const currentScrollY = scrollYRef.current;

      const elementTop = entry.top;
      const elementHeight = entry.height;

      const startScroll = elementTop - viewportHeight;
      const endScroll = elementTop + elementHeight;

      const totalDistance = endScroll - startScroll;
      if (totalDistance === 0) return 0.5;

      const progress = (currentScrollY - startScroll) / totalDistance;

      return Math.max(0, Math.min(1, progress));
    },
    [viewportHeight],
  );

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      <ScrollContext.Provider
        value={{
          scrollY,
          viewportHeight,
          registerElement,
          getElementProgress,
        }}
      >
        {children}
      </ScrollContext.Provider>
    </ReactLenis>
  );
}

/**
 * Hook to access the scroll context
 */
export function useScrollContext() {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
}

/**
 * Hook to check if ScrollProvider is available
 * Returns null if not within a ScrollProvider (useful for fallback behavior)
 */
export function useOptionalScrollContext() {
  return useContext(ScrollContext);
}
