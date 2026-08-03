"use client";
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, X } from 'lucide-react';

export default function Toast({ message, xp = 0, isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-[#12121a] border border-emerald-500/30 shadow-[0_10px_40px_rgba(16,185,129,0.2)] rounded-2xl p-4 pr-6 min-w-[300px]"
        >
          {/* Icon */}
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={20} className="text-emerald-400" />
          </div>

          {/* Text */}
          <div className="flex-1">
            <h4 className="text-white font-bold text-sm">{message}</h4>
            {xp > 0 && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-yellow-400 mt-0.5">
                <Trophy size={12} /> +{xp} XP Earned
              </div>
            )}
          </div>

          {/* Close */}
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
