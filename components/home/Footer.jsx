"use client";

import Link from "next/link";
import Image from "next/image";
import { QrCode, Mail, Activity, Shield, FileText, AlertTriangle, Cookie, Heart, LifeBuoy } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-white/[0.01] overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          
          {/* Left Side: Support */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-start gap-2 text-white">
              <Heart size={20} className="text-rose-500 fill-rose-500/20" /> Support QuizKaal
            </h3>
            <p className="text-sm text-textSecondary mb-6 max-w-[280px] leading-relaxed">
              QuizKaal is an independent open-source educational platform. Your support helps us create more free engineering courses.
            </p>
            <div className="bg-bgCard p-4 rounded-2xl border border-white/5 flex flex-col items-center gap-3 hover:border-primary/20 transition-all hover:shadow-[0_0_20px_rgba(45,212,191,0.05)]">
              <div className="w-32 h-32 bg-white/5 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <Image src="/donate-qr.jpeg" alt="Donate QR Code" fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                {/* Simulated scan line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/50 shadow-[0_0_10px_#2dd4bf] animate-[scan_2s_ease-in-out_infinite]" />
              </div>
              <span className="text-xs font-bold text-gray-400 flex items-center gap-1">Scan to Support <Heart size={14} className="text-rose-500" /></span>
            </div>
          </div>

          {/* Center: Copyright */}
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 flex items-center justify-center mb-6 border border-white/5 shadow-inner overflow-hidden relative">
              <Image src="/logo.png" alt="QuizKaal Logo" fill className="object-contain p-2" />
            </div>
            <p className="text-lg font-bold mb-2 text-gray-200">© 2026 QuizKaal Learn.</p>
            <p className="text-sm text-textSecondary mb-6">All Rights Reserved.</p>
          </div>

          {/* Right Side: Help & Status */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center md:justify-end gap-2 text-white">
              Get in Touch <LifeBuoy size={20} className="text-blue-400" />
            </h3>
            <a 
              href="mailto:support@quizkaal.in" 
              className="group flex items-center gap-4 bg-bgCard hover:bg-white/[0.04] border border-white/5 rounded-2xl px-6 py-4 mb-8 transition-all hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                <Mail size={18} />
              </div>
              <span className="font-medium text-gray-200 group-hover:text-white transition-colors">support@quizkaal.in</span>
            </a>
            
            <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
              System Status: Operational
            </div>
          </div>
          
        </Reveal>

        {/* Bottom Row: Links */}
        <Reveal className="pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-10 gap-y-6">
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'privacy' }))} className="group flex items-center gap-2 text-sm text-textSecondary hover:text-white transition-colors">
            <Shield size={16} className="text-gray-500 group-hover:text-primary transition-colors" /> Privacy Policy
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'terms' }))} className="group flex items-center gap-2 text-sm text-textSecondary hover:text-white transition-colors">
            <FileText size={16} className="text-gray-500 group-hover:text-primary transition-colors" /> Terms & Conditions
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'disclaimer' }))} className="group flex items-center gap-2 text-sm text-textSecondary hover:text-white transition-colors">
            <AlertTriangle size={16} className="text-gray-500 group-hover:text-primary transition-colors" /> Disclaimer
          </button>
          <button onClick={() => window.dispatchEvent(new CustomEvent('open-legal-modal', { detail: 'cookie' }))} className="group flex items-center gap-2 text-sm text-textSecondary hover:text-white transition-colors">
            <Cookie size={16} className="text-gray-500 group-hover:text-primary transition-colors" /> Cookie Policy
          </button>
        </Reveal>
      </div>

      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; opacity: 1; }
        }
      `}</style>
    </footer>
  );
}
