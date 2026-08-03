"use client";
import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  glow = true,
  ...props
}) {
  const ref = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const glowX = useTransform(x, [0, 1], [0, 100]);
  const glowY = useTransform(y, [0, 1], [0, 100]);

  const background = useTransform(
    [glowX, glowY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, rgba(79,70,229,0.15), transparent 50%)`
  );

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className={`glass-card relative overflow-hidden rounded-[24px] group ${className}`}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      <div className="absolute inset-0 rounded-[24px] border border-white/5 group-hover:border-primary/50 transition-colors duration-500 z-10 pointer-events-none" />
      {glow && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
