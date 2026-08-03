"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] w-full">
      <div className="relative flex items-center justify-center">
        {/* Core pulse */}
        <motion.div
          className="w-12 h-12 rounded-full bg-primary/20 blur-md absolute"
          animate={{ scale: [1, 2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Spinner rings */}
        <motion.div
          className="w-10 h-10 rounded-full border-t-2 border-r-2 border-primary absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-14 h-14 rounded-full border-b-2 border-l-2 border-secondary absolute"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner core */}
        <div className="w-2 h-2 rounded-full bg-white relative z-10 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      </div>
    </div>
  );
}
