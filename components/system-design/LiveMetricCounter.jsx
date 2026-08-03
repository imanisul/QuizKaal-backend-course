"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

export default function LiveMetricCounter({ from = 0, to = 100, label, suffix = "", duration = 2, delay = 0 }) {
  const [inView, setInView] = useState(false);
  
  // Spring handles the smooth counting animation
  const springValue = useSpring(from, {
    stiffness: 50,
    damping: 20,
    mass: 1,
    duration: duration * 1000,
  });

  // Transform spring float value to integer format
  const displayValue = useTransform(springValue, (val) => {
    return Math.floor(val).toLocaleString();
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => {
        springValue.set(to);
      }, delay * 1000);
    }
  }, [inView, to, delay, springValue]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center p-6 bg-bgElevated rounded-2xl border border-white/5 shadow-lg"
    >
      <div className="flex items-baseline gap-1 text-4xl font-black text-white">
        <motion.span>{displayValue}</motion.span>
        {suffix && <span className="text-2xl text-sysClient">{suffix}</span>}
      </div>
      {label && <div className="text-textSecondary mt-2 font-medium uppercase tracking-widest text-xs">{label}</div>}
    </motion.div>
  );
}
