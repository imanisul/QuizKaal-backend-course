"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-textSecondary hover:text-white transition-colors border border-white/5 backdrop-blur-sm z-10"
      aria-label="Copy code"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Check size={14} className="text-emerald-400" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Copy size={14} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
