"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Mail, Bell } from "lucide-react";
import Link from "next/link";

export default function GenAIPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[600px] bg-pink-500/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-rose-500/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center">
        
        <Link href="/" className="mb-12 inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
          className="w-24 h-24 bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(236,72,153,0.3)]"
        >
          <Sparkles size={40} className="text-pink-400" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 text-pink-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            Coming Soon
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            GenAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Mastery</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
            We are building the ultimate guide to Generative AI. Learn how to build image generators, fine-tune models, and integrate powerful multimodal APIs into your applications.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
