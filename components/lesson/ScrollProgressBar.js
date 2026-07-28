"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50 shadow-[0_0_15px_rgba(229,62,62,0.6)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
