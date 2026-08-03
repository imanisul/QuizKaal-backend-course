"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Server, Database, Cloud, Box, Zap, Activity, Code2, BrainCircuit, ShieldCheck, Globe } from "lucide-react";

const ICONS = [
  { id: 1, Icon: Server, label: "Server", x: 15, y: 20, size: 48, delay: 0 },
  { id: 2, Icon: Globe, label: "API", x: 80, y: 15, size: 56, delay: 0.2 },
  { id: 3, Icon: Database, label: "Database", x: 75, y: 70, size: 64, delay: 0.4 },
  { id: 4, Icon: Cloud, label: "Cloud", x: 25, y: 80, size: 52, delay: 0.1 },
  { id: 5, Icon: Box, label: "Docker", x: 50, y: 10, size: 40, delay: 0.3 },
  { id: 6, Icon: Zap, label: "Redis", x: 10, y: 50, size: 44, delay: 0.5 },
  { id: 7, Icon: Activity, label: "Kafka", x: 90, y: 45, size: 48, delay: 0.2 },
  { id: 8, Icon: Code2, label: "Node.js", x: 60, y: 85, size: 40, delay: 0.6 },
  { id: 9, Icon: BrainCircuit, label: "AI", x: 35, y: 65, size: 56, delay: 0.3 },
  { id: 10, Icon: ShieldCheck, label: "Auth", x: 40, y: 30, size: 48, delay: 0.4 },
];

function ParallaxIcon({ item, springX, springY }) {
  const parallaxFactor = (item.id % 3) + 1; // Different layers move at different speeds
  const xOffset = useTransform(springX, [-1, 1], [-20 * parallaxFactor, 20 * parallaxFactor]);
  const yOffset = useTransform(springY, [-1, 1], [-20 * parallaxFactor, 20 * parallaxFactor]);

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-2xl bg-white/[0.02] border border-white/[0.05] shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-sm"
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: item.size + 24,
        height: item.size + 24,
        x: xOffset,
        y: yOffset,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: [0, 1], 
        scale: [0.8, 1],
        y: [0, -10, 0] // Floating animation
      }}
      transition={{
        opacity: { duration: 1, delay: item.delay },
        scale: { duration: 1, delay: item.delay },
        y: { 
          duration: 4 + (item.id % 3), // Randomize float duration
          repeat: Infinity,
          ease: "easeInOut",
          delay: item.delay
        }
      }}
    >
      <item.Icon size={item.size} className="text-white/20" />
      <div className="absolute -bottom-6 text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">
        {item.label}
      </div>
    </motion.div>
  );
}

export default function HeroParallax() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the mouse movement for a premium feel
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleMouseMove = (e) => {
      // Normalize mouse position between -1 and 1
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY]);

  if (windowSize.width === 0) return null; // Avoid hydration mismatch

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] opacity-50" />
      
      {ICONS.map((item) => (
        <ParallaxIcon key={item.id} item={item} springX={springX} springY={springY} />
      ))}
    </div>
  );
}
