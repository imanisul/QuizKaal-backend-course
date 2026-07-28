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
    <div ref={containerRef} className="aurora-container" aria-hidden="true">
      <div className="aurora-blob aurora-blob-1" />
      <div className="aurora-blob aurora-blob-2" />
      <div className="aurora-blob aurora-blob-3" />
      <div className="aurora-mesh" />
    </div>
  );
}
