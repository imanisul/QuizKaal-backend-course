"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const policies = {
  privacy: {
    title: "Privacy Policy",
    content: (
      <div className="space-y-4 text-sm text-textSecondary leading-relaxed">
        <p><strong>1. Introduction</strong><br/>QuizKaal Learn is an open-source educational platform. We believe in your privacy. We do not require users to create an account, and we do not intentionally collect personal information.</p>
        <p><strong>2. Data We Collect</strong><br/>We only collect anonymous analytics data to understand how the platform is used and how we can improve the learning experience. We do not store payment information or sensitive personal data.</p>
        <p><strong>3. Google Analytics</strong><br/>We use Google Analytics to monitor traffic and platform usage. This service may collect anonymous statistics such as page views and interaction events. You may opt out using your browser settings or our Cookie Banner.</p>
        <p><strong>4. Updates</strong><br/>This policy may be updated over time as the platform evolves. If you have questions about privacy, please contact us via our official GitHub repository.</p>
      </div>
    )
  },
  terms: {
    title: "Terms of Use",
    content: (
      <div className="space-y-4 text-sm text-textSecondary leading-relaxed">
        <p><strong>1. Educational Use Only</strong><br/>All content on QuizKaal Learn is provided strictly for learning and educational purposes. We do not guarantee employment, certification, or exam success.</p>
        <p><strong>2. User Responsibility</strong><br/>You are responsible for how you apply the information learned here. Coding examples are simplified for educational clarity and may require security hardening before production use.</p>
        <p><strong>3. Intellectual Property</strong><br/>Please respect the intellectual property of the open-source community. Do not misuse the platform or attempt to degrade the experience for other learners.</p>
        <p><strong>4. Modifications</strong><br/>We reserve the right to improve, modify, or shut down parts of the platform at any time without prior notice.</p>
      </div>
    )
  },
  disclaimer: {
    title: "Disclaimer",
    content: (
      <div className="space-y-4 text-sm text-textSecondary leading-relaxed">
        <p><strong>1. General Disclaimer</strong><br/>The QuizKaal website is built for educational purposes. While we strive for accuracy, technology evolves rapidly and errors may occasionally exist in our curriculum.</p>
        <p><strong>2. Verify Independent Information</strong><br/>Users should verify important architectural decisions and security practices independently before deploying applications to production.</p>
        <p><strong>3. No Warranties</strong><br/>The platform is provided "as is" without any warranties, express or implied. We are not liable for any damages or issues arising from the use of our code examples.</p>
      </div>
    )
  },
  cookie: {
    title: "Cookie Policy",
    content: (
      <div className="space-y-4 text-sm text-textSecondary leading-relaxed">
        <p><strong>1. What are Cookies?</strong><br/>Cookies are small text files stored on your device that help us understand how you navigate our platform.</p>
        <p><strong>2. How We Use Them</strong><br/>We use anonymous analytics cookies (via Google Analytics) to track page views, course completions, and interaction metrics. This helps us decide which courses to build next.</p>
        <p><strong>3. Your Control</strong><br/>You can dismiss or accept our cookie usage via the banner that appears on your first visit. You can also disable cookies entirely within your browser settings.</p>
      </div>
    )
  }
};

export default function LegalModalManager() {
  const [activePolicy, setActivePolicy] = useState(null);

  useEffect(() => {
    const handleOpen = (e) => setActivePolicy(e.detail);
    window.addEventListener('open-legal-modal', handleOpen);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePolicy(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('open-legal-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <AnimatePresence>
      {activePolicy && policies[activePolicy] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePolicy(null)}
            className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-[#111113] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white tracking-tight">
                {policies[activePolicy].title}
              </h2>
              <button 
                onClick={() => setActivePolicy(null)}
                className="p-2 rounded-full hover:bg-white/5 text-textSecondary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {policies[activePolicy].content}
            </div>
            
            <div className="p-6 bg-[#0a0a0c]/50 border-t border-white/5 flex justify-end">
              <button 
                onClick={() => setActivePolicy(null)}
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                I Understand
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
