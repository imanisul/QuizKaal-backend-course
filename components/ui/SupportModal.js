"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, QrCode, Coffee, ChevronRight } from "lucide-react";

export default function SupportModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("₹20");
  const amounts = ["₹5", "₹10", "₹20", "₹30", "₹40", "₹50", "₹60", "₹70", "₹80", "₹90", "₹100"];

  useEffect(() => {
    // Check local storage to see if we should show it
    const lastDismissed = localStorage.getItem("supportModalDismissed");
    const dismissDays = localStorage.getItem("supportModalDismissDays") || "30";
    if (lastDismissed) {
      const dismissedDate = new Date(parseInt(lastDismissed, 10));
      const daysSinceDismissed = (new Date() - dismissedDate) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < parseInt(dismissDays, 10)) {
        return; // Don't show if dismissed within specified days
      }
    }

    let scrollHandler;
    let timer;

    const checkTrigger = () => {
      // Don't interrupt if they are explicitly playing the CI/CD simulator
      // We can check if there's a playing indicator in the DOM (hacky but works globally without context)
      const isPlayingSimulator = document.querySelector('[data-playing="true"]');
      if (isPlayingSimulator) return false;
      return true;
    };

    // Trigger 1: Scroll Depth
    scrollHandler = () => {
      const scrollDepth = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollDepth > 0.9 && checkTrigger()) {
        setIsOpen(true);
        window.removeEventListener("scroll", scrollHandler);
        clearTimeout(timer);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    // Trigger 2: Time on site (1 minute)
    timer = setTimeout(() => {
      if (checkTrigger()) {
        setIsOpen(true);
        window.removeEventListener("scroll", scrollHandler);
      }
    }, 60000);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = (days = 1) => {
    setIsOpen(false);
    if (days > 0) {
      localStorage.setItem("supportModalDismissed", Date.now().toString());
      localStorage.setItem("supportModalDismissDays", days.toString());
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => handleDismiss(1)} // Temporary dismiss for 1 day
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[90vh] bg-[#0a0c10] border border-white/10 rounded-[32px] stripe-shadow overflow-hidden flex flex-col"
          >
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-error/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

            <div className="p-6 md:p-8 flex flex-col relative z-10 overflow-y-auto custom-scrollbar">
              <button 
                onClick={() => handleDismiss(1)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-error/20 to-error/5 border border-error/30 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.2)]">
                  <Heart className="text-error" fill="currentColor" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Support the Creator</h2>
                  <p className="text-textSecondary text-sm">Help keep this project alive and growing.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 mb-8">
                {/* QR Code */}
                <div className="shrink-0 flex flex-col items-center gap-3">
                  <div className="w-[140px] h-[140px] bg-white border-[6px] border-white/10 rounded-2xl flex items-center justify-center relative overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    <img 
                      src="/donate-qr.png" 
                      alt="Donation QR Code" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-textTertiary">Scan to Support</span>
                </div>

                {/* Amounts */}
                <div className="flex-1 flex flex-col">
                  <p className="text-sm text-textSecondary mb-4">
                    If this course helped you land a job, ace an interview, or finally understand CI/CD, consider buying me a coffee! ☕
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {amounts.map(amt => (
                      <button 
                        key={amt}
                        onClick={() => setSelectedAmount(amt)}
                        aria-label={`Select ${amt}`}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300
                          ${selectedAmount === amt 
                            ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105' 
                            : 'bg-white/5 border border-white/10 text-textSecondary hover:bg-white/10 hover:text-white'}
                        `}
                      >
                        {amt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end mt-auto pt-6 border-t border-white/5">
                <button 
                  onClick={() => handleDismiss(1)}
                  className="px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-bold transition-all duration-300"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
