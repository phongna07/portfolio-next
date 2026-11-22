"use client";

import { useEffect, useRef } from "react";

const MESSAGE = "NGUYEN ANH PHONG · ELECTRICAL ENGINEERING · HANOI VN · ";
const IDLE_BITS = 2;
const FRAME_BITS = IDLE_BITS + 1 + 8 + 1; // idle, start, 8 data (LSB first), stop
const H_DIVS = 12;
const V_DIVS = 8;
const TIMEBASE_MS = 1; // ms per horizontal division (for the readout)
const VOLTS_PER_DIV = 0.5;

type Frame = { char: string; code: number; bits: number[] };

function buildFrames(): Frame[] {
  return Array.from(MESSAGE).map((char) => {
    const code = char === "·" ? 0xb7 : char.charCodeAt(0);
    const bits: number[] = [];
    for (let i = 0; i < IDLE_BITS; i += 1) bits.push(1);
    bits.push(0);
    for (let i = 0; i < 8; i += 1) bits.push((code >> i) & 1);
    bits.push(1);
    return { char, code, bits };
  });
}

export default function Oscilloscope() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const freqRef = useRef<HTMLSpanElement>(null);
  const vppRef = useRef<HTMLSpanElement>(null);
  const charRef = useRef<HTMLSpanElement>(null);
  const cursorTimeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const ch1 = styles.getPropertyValue("--ch1").trim() || "#ffd23f";
    const ch2 = styles.getPropertyValue("--ch2").trim() || "#45d4e6";
    const monoFamily =
      styles.getPropertyValue("--font-mono").trim() || "ui-monospace, monospace";

    const frames = buildFrames();
    const bits = frames.flatMap((frame) => frame.bits);
    const totalBits = bits.length;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    let lastTime = performance.now();
    let elapsed = 3.2;
    let lastReadout = 0;

    const pointer = { x: 0.5, y: 0.5, inside: false };
    let cycles = 2.2;
    let targetCycles = 2.2;
    let amp = 0.55;
    let targetAmp = 0.55;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0, true);
    };

    const drawAnalog = (time: number) => {
      const cy = height * 0.32;
      const divY = height / V_DIVS;
      const a = amp * divY * 1.6;
      const k = (Math.PI * 2 * cycles) / width;
      const w = time * 2.4;

      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const phase = k * x - w;
        const y =
          cy -
          a *
            (0.8 * Math.sin(phase) +
              0.18 * Math.sin(3 * phase + 0.6) +
              0.04 * Math.sin(17 * phase + time * 9));
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = ch1;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = ch1;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    const drawDigital = (time: number) => {
      const bitW = Math.max(8, Math.min(14, width / 80));
      const high = height * 0.66;
      const low = height * 0.84;
      const offset = (time * 46) % (totalBits * bitW);
      const first = Math.floor(offset / bitW);
      const count = Math.ceil(width / bitW) + 2;
      const edge = 1.4;

      ctx.beginPath();
      let prev = bits[((first % totalBits) + totalBits) % totalBits];
      ctx.moveTo(-bitW, prev ? high : low);
      for (let i = 0; i < count; i += 1) {
        const index = (first + i) % totalBits;
        const level = bits[index];
        const x = (first + i) * bitW - offset;
        if (level !== prev) {
          ctx.lineTo(x - edge, prev ? high : low);
          ctx.lineTo(x + edge, level ? high : low);
        }
        ctx.lineTo(x + bitW, level ? high : low);
        prev = level;
      }
      ctx.strokeStyle = ch2;
      ctx.lineWidth = 1.5;
      ctx.shadowColor = ch2;
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Protocol decode bubbles above the trace
      const bubbleY = high - 22;
      const bubbleH = 15;
      ctx.font = `600 10px ${monoFamily}`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      const firstFrame = Math.floor(first / FRAME_BITS) - 1;
      const frameCount = Math.ceil(count / FRAME_BITS) + 2;
      let centerChar = "";
      for (let f = 0; f < frameCount; f += 1) {
        const absFrame = firstFrame + f;
        const frame = frames[((absFrame % frames.length) + frames.length) % frames.length];
        const startX = (absFrame * FRAME_BITS + IDLE_BITS) * bitW - offset;
        const endX = startX + 10 * bitW;
        if (endX < -20 || startX > width + 20) continue;
        const inset = 5;
        ctx.beginPath();
        ctx.moveTo(startX, bubbleY);
        ctx.lineTo(startX + inset, bubbleY - bubbleH / 2);
        ctx.lineTo(endX - inset, bubbleY - bubbleH / 2);
        ctx.lineTo(endX, bubbleY);
        ctx.lineTo(endX - inset, bubbleY + bubbleH / 2);
        ctx.lineTo(startX + inset, bubbleY + bubbleH / 2);
        ctx.closePath();
        ctx.fillStyle = "rgba(69, 212, 230, 0.12)";
        ctx.fill();
        ctx.strokeStyle = "rgba(69, 212, 230, 0.55)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = ch2;
        const label = frame.char === " " ? "SP" : frame.char;
        const hex = `0x${frame.code.toString(16).toUpperCase().padStart(2, "0")}`;
        ctx.fillText(endX - startX > 90 ? `${hex}  '${label}'` : label, (startX + endX) / 2, bubbleY + 0.5);
        if (startX <= width / 2 && endX >= width / 2) centerChar = label;
      }
      return centerChar;
    };

    const draw = (dt: number, full = false) => {
      if (!width || !height) return;
      // Phosphor persistence: fade the previous frame instead of clearing it.
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = full ? "rgba(0,0,0,1)" : `rgba(0,0,0,${Math.min(1, dt * 14)})`;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      const ease = Math.min(1, dt * 3);
      if (pointer.inside) {
        targetCycles = 1.2 + pointer.x * 4.2;
        targetAmp = 0.25 + (1 - pointer.y) * 0.7;
      } else {
        targetCycles = 2.2 + Math.sin(elapsed * 0.35) * 0.5;
        targetAmp = 0.55 + Math.sin(elapsed * 0.6) * 0.08;
      }
      cycles += (targetCycles - cycles) * ease;
      amp += (targetAmp - amp) * ease;

      drawAnalog(elapsed);
      const centerChar = drawDigital(elapsed);

      if (elapsed - lastReadout > 0.2 || full) {
        lastReadout = elapsed;
        const freq = cycles / (H_DIVS * TIMEBASE_MS / 1000);
        const vpp = ((amp * 1.6 * 2 * 0.98) * VOLTS_PER_DIV).toFixed(2);
        if (freqRef.current) freqRef.current.textContent = `${freq.toFixed(1)} Hz`;
        if (vppRef.current) vppRef.current.textContent = `${vpp} V`;
        if (charRef.current && centerChar) charRef.current.textContent = `'${centerChar}'`;
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      elapsed += dt;
      draw(dt);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reducedMotion || !visible || document.hidden) return;
      running = true;
      lastTime = performance.now();
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      pointer.inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pointer.x = Math.min(1, Math.max(0, x));
      pointer.y = Math.min(1, Math.max(0, y));
      const cursor = cursorRef.current;
      if (cursor) {
        cursor.style.opacity = pointer.inside ? "1" : "0";
        cursor.style.transform = `translateX(${pointer.x * rect.width}px)`;
      }
      if (cursorTimeRef.current && pointer.inside) {
        const ms = (pointer.x - 0.5) * H_DIVS * TIMEBASE_MS;
        cursorTimeRef.current.textContent = `${ms >= 0 ? "+" : ""}${ms.toFixed(2)} ms`;
      }
      if (reducedMotion) draw(0.2, true);
    };

    const onPointerLeave = () => {
      pointer.inside = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(wrap);

    wrap.addEventListener("pointermove", onPointerMove);
    wrap.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      wrap.removeEventListener("pointermove", onPointerMove);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="scope" ref={wrapRef}>
      <div className="scope__topbar" aria-hidden="true">
        <span className="scope__brand">NAP-07 · Signal monitor</span>
        <span className="scope__run">
          <span className="led led--live" /> Run
        </span>
        <span className="scope__trig">
          Trig <b>CH1</b> ↗ 0.00 V
        </span>
      </div>

      <div className="scope__screen">
        <canvas
          ref={canvasRef}
          className="scope__canvas"
          role="img"
          aria-label="Animated oscilloscope: an analog waveform for hardware, and a digital UART signal spelling out Nguyen Anh Phong for software."
        />
        <span className="scope__marker scope__marker--ch1" aria-hidden="true">1</span>
        <span className="scope__marker scope__marker--ch2" aria-hidden="true">2</span>
        <span className="scope__lane scope__lane--ch1" aria-hidden="true">Analog · hardware</span>
        <span className="scope__lane scope__lane--ch2" aria-hidden="true">Digital · software</span>
        <div className="scope__cursor" ref={cursorRef} aria-hidden="true">
          <span ref={cursorTimeRef}>+0.00 ms</span>
        </div>
      </div>

      <dl className="scope__readouts" aria-hidden="true">
        <div className="is-ch1">
          <dt>CH1 Freq</dt>
          <dd ref={freqRef}>183.3 Hz</dd>
        </div>
        <div className="is-ch1">
          <dt>CH1 Vpp</dt>
          <dd ref={vppRef}>0.86 V</dd>
        </div>
        <div className="is-ch2">
          <dt>CH2 Decode</dt>
          <dd>
            UART 8N1 <span ref={charRef}>&apos;N&apos;</span>
          </dd>
        </div>
        <div className="scope__hint">
          <dt>Probe</dt>
          <dd>Move your cursor across the screen</dd>
        </div>
      </dl>
    </div>
  );
}
