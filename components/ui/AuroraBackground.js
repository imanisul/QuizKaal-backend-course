"use client";
import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced && containerRef.current) {
      containerRef.current.style.animationPlayState = "paused";
    }
  }, []);

  return (
    <div ref={containerRef} className="aurora-container" aria-hidden="true" suppressHydrationWarning>
      <div className="aurora-blob aurora-blob-1" suppressHydrationWarning />
      <div className="aurora-blob aurora-blob-2" suppressHydrationWarning />
      <div className="aurora-blob aurora-blob-3" suppressHydrationWarning />
      <div className="aurora-mesh" suppressHydrationWarning />
    </div>
  );
}
