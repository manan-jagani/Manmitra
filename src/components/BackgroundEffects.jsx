// src/components/BackgroundEffects.jsx
import React, { useEffect, useRef } from "react";

// Lightweight background with animated blobs + subtle parallax.
// Respects prefers-reduced-motion. Purely decorative (aria-hidden).
export default function BackgroundEffects({
  className = "",
  style = {},
}) {
  const containerRef = useRef(null);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) return;

    const container = containerRef.current;
    if (!container) return;

    let raf = null;
    let mouseX = 0;
    let mouseY = 0;
    let lastScroll = window.scrollY || 0;
    let vx = 0, vy = 0, tx = 0, ty = 0;

    function onMove(e) {
      // touch/mouse unify
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      mouseX = (clientX / window.innerWidth) - 0.5; // -0.5 .. 0.5
      mouseY = (clientY / window.innerHeight) - 0.5;
    }

    function onScroll() {
      lastScroll = window.scrollY || 0;
    }

    function tick() {
      // gentle interpolation
      tx += (mouseX - tx) * 0.06;
      ty += (mouseY - ty) * 0.06;

      // also add a tiny scroll offset
      const scrollOffset = Math.min(60, lastScroll * 0.02);

      // apply transforms to layers
      const layer1 = container.querySelector(".bg-blob.blob-1");
      const layer2 = container.querySelector(".bg-blob.blob-2");
      const layer3 = container.querySelector(".bg-blob.blob-3");
      const dots = container.querySelectorAll(".floating-dot");

      if (layer1) layer1.style.transform = `translate3d(${tx * 24}px, ${-ty * 18 - scrollOffset * 0.08}px, 0) rotate(${tx * 2}deg)`;
      if (layer2) layer2.style.transform = `translate3d(${tx * 38}px, ${-ty * 10 - scrollOffset * 0.05}px, 0) rotate(${tx * -1.6}deg)`;
      if (layer3) layer3.style.transform = `translate3d(${tx * -28}px, ${-ty * 6 - scrollOffset * 0.03}px, 0) rotate(${tx * 1.2}deg)`;

      // move dots in a subtle parallax pattern
      dots.forEach((d, i) => {
        const depth = (i % 3) + 1; // 1..3
        const dx = tx * 20 * (depth * 0.6);
        const dy = -ty * 12 * (depth * 0.6) + (scrollOffset * depth * 0.02);
        d.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      });

      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [prefersReduced]);

  // Render SVG blobs, dots and shimmer. Keep aria-hidden since decorative.
  return (
    <div
      aria-hidden="true"
      ref={containerRef}
      className={`absolute left-1/2 top-[3.5rem] -translate-x-1/2 w-[900px] h-[420px] pointer-events-none overflow-visible ${className}`}
      style={style}
    >
      <svg
        width="900"
        height="420"
        viewBox="0 0 900 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bg-animated"
        role="img"
      >
        <defs>
          <linearGradient id="bgGrad1" x1="0" x2="1">
            <stop offset="0%" stopColor="#99ac87" stopOpacity="0.30" />
            <stop offset="60%" stopColor="#d7dead" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#e7edcf" stopOpacity="0.06" />
          </linearGradient>

          <linearGradient id="bgGrad2" x1="0" x2="1">
            <stop offset="0%" stopColor="#d7dead" stopOpacity="0.28" />
            <stop offset="80%" stopColor="#f4f6ea" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="bgGrad3" x1="0" x2="1">
            <stop offset="0%" stopColor="#99ac87" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#c3c984" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Soft ellipses for depth. CSS handles animation timings */}
        <ellipse className="bg-blob blob-1 blob-fill-1" cx="520" cy="120" rx="260" ry="120" fill="url(#bgGrad1)" />
        <ellipse className="bg-blob blob-2 blob-fill-2" cx="720" cy="160" rx="210" ry="110" fill="url(#bgGrad2)" />
        <ellipse className="bg-blob blob-3 blob-fill-3" cx="200" cy="140" rx="180" ry="100" fill="url(#bgGrad3)" />
      </svg>

      {/* shimmer overlay */}
      <div className="hero-shimmer absolute inset-0 pointer-events-none" />

      {/* floating dots */}
      <div className="floating-dot dot-a" style={{ left: "10%", top: "18%" }} />
      <div className="floating-dot dot-b" style={{ left: "85%", top: "28%" }} />
      <div className="floating-dot dot-c" style={{ left: "72%", top: "68%" }} />
      <div className="floating-dot dot-d" style={{ left: "22%", top: "72%" }} />
    </div>
  );
}
// inside BackgroundEffects.jsx (top of useEffect)
const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const [enabled, setEnabled] = useState(false);

useEffect(() => {
  const isWide = window.innerWidth >= 640; // only enable on >= sm
  setEnabled(isWide && !prefersReduced);
}, []);

// then in render:
if (!enabled) {
  // Render a tiny static accent (optional)
  return <div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-8 w-48 h-24 rounded-full bg-[rgba(153,172,135,0.06)] filter blur-lg pointer-events-none" />;
}
