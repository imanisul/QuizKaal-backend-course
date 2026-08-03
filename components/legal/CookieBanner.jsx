"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('quizkaal_cookie_consent');
    if (!consent) {
      // Delay slightly for better UX so it doesn't instantly flash on load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('quizkaal_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('quizkaal_cookie_consent', 'dismissed');
    setIsVisible(false);
  };

  const openCookiePolicy = () => {
    window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'cookie' }));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          aria-label="Cookie Consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 md:w-[420px] z-[90] bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl"
        >
          <div className="flex flex-col gap-4">
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Your Privacy</h3>
              <p className="text-xs text-textSecondary leading-relaxed">
                We use anonymous analytics cookies to understand how visitors use the platform and improve the learning experience. By continuing to browse, you agree to this use.
              </p>
            </div>
            <div className="flex items-center gap-3 w-full">
              <button 
                onClick={handleAccept}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Accept
              </button>
              <button 
                onClick={openCookiePolicy}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-colors"
              >
                Learn More
              </button>
              <button 
                onClick={handleDismiss}
                className="px-4 py-2 hover:bg-white/5 text-textTertiary hover:text-white rounded-lg text-xs font-medium transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
