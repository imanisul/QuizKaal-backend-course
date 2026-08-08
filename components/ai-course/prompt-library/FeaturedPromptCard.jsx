"use client";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Play, Copy, Star } from "lucide-react";
import { useState } from "react";

export default function FeaturedPromptCard({ prompt, onCopy, onPreview }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!prompt) return null;

  return (
    <div className="max-w-[1200px] mx-auto px-6 mb-16">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-[2rem] p-[1px] overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-cyan-500 to-purple-600 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Background Animation inside border */}
        <motion.div 
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-r from-primary/30 via-cyan-500/30 to-purple-600/30 blur-xl"
        />

        <div className="relative bg-[#0d0d12]/90 backdrop-blur-3xl rounded-[2rem] p-8 md:p-12 overflow-hidden h-full flex flex-col md:flex-row items-center gap-10">
          
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

          <div className="flex-1 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-6">
              <Sparkles size={14} className="text-orange-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Prompt of the Day</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
              {prompt.title}
            </h2>
            
            <p className="text-lg text-textSecondary mb-8 max-w-xl leading-relaxed">
              {prompt.problem}
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-textTertiary uppercase tracking-widest flex items-center gap-1">
                <Star size={12} className="text-yellow-500" /> {prompt.rating}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-textTertiary uppercase tracking-widest">
                {prompt.popularity}
              </span>
              <div className="flex -space-x-2">
                {prompt.models?.map((model, idx) => (
                  <div key={model} className="w-8 h-8 rounded-full bg-black border-2 border-[#0d0d12] flex items-center justify-center text-[10px] font-bold text-white shadow-lg z-10 relative">
                    {model[0]}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onPreview(prompt)}
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
              >
                <Play size={18} fill="currentColor" /> Preview in Editor
              </button>
              <button 
                onClick={() => onCopy(prompt.id, prompt.prompt)}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-bold flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <Copy size={18} /> Quick Copy
              </button>
            </div>
          </div>

          <div role="button" tabIndex={0} className="w-full md:w-[400px] shrink-0 relative z-10 group/preview cursor-pointer" onClick={() => onPreview(prompt)} onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPreview(prompt); }}}>
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-cyan-500/20 blur-2xl -z-10 group-hover/preview:blur-3xl transition-all duration-500" />
            <div className="bg-black/80 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-cyan-400" />
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs font-mono text-textSecondary line-clamp-6 leading-relaxed relative">
                {prompt.prompt}
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-black/80 to-transparent" />
              </div>
              <div className="absolute bottom-4 right-4 text-primary bg-primary/10 p-2 rounded-full opacity-0 group-hover/preview:opacity-100 transition-opacity">
                <ArrowRight size={16} />
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
