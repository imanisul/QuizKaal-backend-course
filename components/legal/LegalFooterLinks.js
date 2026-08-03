"use client";
import React from 'react';

export default function LegalFooterLinks() {
  const openModal = (type) => {
    window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: type }));
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs font-medium text-textSecondary relative z-50">
      <button onClick={() => openModal('privacy')} className="text-textSecondary hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
      <button onClick={() => openModal('terms')} className="text-textSecondary hover:text-white transition-colors cursor-pointer">Terms of Use</button>
      <button onClick={() => openModal('disclaimer')} className="text-textSecondary hover:text-white transition-colors cursor-pointer">Disclaimer</button>
      <button onClick={() => openModal('cookie')} className="text-textSecondary hover:text-white transition-colors cursor-pointer">Cookie Policy</button>
    </div>
  );
}
