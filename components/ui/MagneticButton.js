"use client";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticButton({ children, className = "", href, onClick, variant = "primary" }) {
  const ref = useRef(null);
  const [ripple, setRipple] = useState(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  function handleMouse(e) {
    if (!ref.current) return;
    if (window.matchMedia && !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  function handleClick(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top, id: Date.now() });
    setTimeout(() => setRipple(null), 600);
    onClick?.();
  }

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={handleClick}
      style={{ x: springX, y: springY }}
      className={`magnetic-btn magnetic-btn-${variant} group ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      <span className="magnetic-btn-shine" />
      <span className="relative z-[1] flex items-center gap-2">{children}</span>
      {ripple && (
        <span
          key={ripple.id}
          className="magnetic-btn-ripple"
          style={{ left: ripple.x, top: ripple.y }}
        />
      )}
    </Comp>
  );
}
