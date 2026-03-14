"use client";

import { FC, useEffect, useRef, useState } from "react";

import { CANVAS_IMAGES } from "../data/canvas-images";

const jitteredGridPositions = (
  width: number,
  height: number,
  count: number,
  padding: number,
) => {
  const aspectRatio = width / height;
  const cols = Math.ceil(Math.sqrt(count * aspectRatio));
  const rows = Math.ceil(count / cols);

  const cellWidth = (width - padding * 2) / cols;
  const cellHeight = (height - padding * 2) / rows;

  const positions: { x: number; y: number }[] = [];

  for (let i = 0; i < count; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const jitterX = (Math.random() - 0.5) * cellWidth * 0.8;
    const jitterY = (Math.random() - 0.5) * cellHeight * 0.8;

    positions.push({
      x: padding + cellWidth * (col + 0.5) + jitterX,
      y: padding + cellHeight * (row + 0.5) + jitterY,
    });
  }

  return positions.sort(() => Math.random() - 0.5);
};

const Canvas: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mql.matches);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const reducedMotion = reduceMotionQuery.matches;

    const images = CANVAS_IMAGES.map((source) => {
      const image = document.createElement("img");
      image.src = source;
      return image;
    });

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      angle: number;
      size: number;
      image: HTMLImageElement;

      constructor(
        x: number,
        y: number,
        dx: number,
        dy: number,
        angle: number,
        size: number,
        image: HTMLImageElement,
      ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.angle = angle;
        this.size = size;
        this.image = image;
      }

      update() {
        if (this.x < this.size / 2) this.dx = -this.dx;
        if (this.x > innerWidth - this.size / 2) this.dx = -this.dx;
        if (this.y < this.size / 2) this.dy = -this.dy;
        if (this.y > innerHeight - this.size / 2) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy;
        this.angle += 1;

        this.draw();
      }

      draw() {
        if (!this.image) return;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * (Math.PI / 180));

        ctx.drawImage(
          this.image,
          -this.size / 2,
          -this.size / 2,
          this.size,
          this.size,
        );
        ctx.restore();
      }
    }

    let particles: Particle[] = [];
    let rafId: number | null = null;
    let lastFrameTime = 0;
    let isPaused = false;
    let isVisible = true;

    let expectedSize = Math.round(innerWidth / 20);
    let SIZE = expectedSize < 30 ? 30 : expectedSize > 50 ? 50 : expectedSize;

    const setup = () => {
      let expectedSize = Math.round(innerWidth / 20);
      SIZE = expectedSize < 30 ? 30 : expectedSize > 50 ? 50 : expectedSize;

      const maxIcons = innerWidth < 768 ? 12 : images.length;
      const sampledImages = images.slice(0, maxIcons);

      const positions = jitteredGridPositions(
        innerWidth,
        innerHeight,
        sampledImages.length,
        SIZE,
      );

      particles = sampledImages.map(
        (image, i) =>
          new Particle(
            positions[i].x,
            positions[i].y,
            (Math.random() - 0.5) * 1.5,
            (Math.random() - 0.5) * 1.5,
            0,
            SIZE,
            image,
          ),
      );

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(innerWidth * dpr);
      canvas.height = Math.round(innerHeight * dpr);
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const animate = (time: number) => {
      rafId = requestAnimationFrame(animate);
      if (isPaused || !isVisible) return;

      const minFrameTime = 1000 / 30;
      if (time - lastFrameTime < minFrameTime) return;
      lastFrameTime = time;

      ctx.clearRect(0, 0, innerWidth, innerHeight);

      particles.forEach((particle) => {
        particle.update();
      });
    };

    setup();
    if (!reducedMotion) {
      rafId = requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      particles.forEach((particle) => particle.draw());
    }

    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isPaused = !entry.isIntersecting;
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);
    window.addEventListener("resize", setup);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", setup);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full anim-canvas-fade ${prefersReducedMotion ? "anim-instant" : ""}`}
    />
  );
};

export default Canvas;
