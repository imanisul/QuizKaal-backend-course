"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("QuizKaal Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-md w-full glass-card p-8 flex flex-col items-center"
      >
        <motion.div
          className="w-16 h-16 rounded-2xl bg-error/10 border border-error/20 flex items-center justify-center text-error mb-6 shadow-[0_0_20px_rgba(255,51,51,0.2)]"
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <AlertTriangle size={32} />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
        <p className="text-textSecondary text-sm mb-8 leading-relaxed">
          We encountered an unexpected error while loading this page. Our team has been notified.
        </p>

        <MagneticButton onClick={reset} variant="primary" className="w-full">
          <RefreshCcw size={16} className="mr-2" /> Try Again
        </MagneticButton>
      </motion.div>
    </div>
  );
}
