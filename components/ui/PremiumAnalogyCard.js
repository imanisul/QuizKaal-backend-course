"use client";
import { motion } from "framer-motion";
import { MessageSquareQuote, ArrowRight } from "lucide-react";

export default function PremiumAnalogyCard({ 
  icon: Icon, 
  title, 
  analogyTitle,
  description, 
  points = [] 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col relative overflow-hidden group shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-accent/20 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-start gap-4 md:gap-6 relative z-10">
        
        {/* Left Icon Area */}
        <div className="hidden sm:flex flex-col items-center gap-3 shrink-0">
           <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center shadow-lg relative overflow-hidden">
             <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             <Icon size={28} className="text-white relative z-10" strokeWidth={1.5} />
           </div>
           <div className="w-px h-full bg-gradient-to-b from-white/10 to-transparent min-h-[50px]" />
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquareQuote size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Real-Life Analogy</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight">{title} <span className="text-textTertiary font-normal ml-1">is like</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{analogyTitle}</span></h3>
          
          <p className="text-sm md:text-base text-textSecondary leading-relaxed mb-6 max-w-lg">
            {description}
          </p>
          
          {points.length > 0 && (
            <div className="space-y-4 bg-black/40 border border-white/5 rounded-xl p-5">
              {points.map((point, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  key={idx} 
                  className="flex items-start gap-3"
                >
                  <span className="text-accent font-mono text-xs font-bold w-16 shrink-0 mt-0.5">{point.keyword}</span>
                  <ArrowRight size={12} className="text-white/20 shrink-0 mt-1" />
                  <span className="text-sm text-textSecondary leading-relaxed">{point.text}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </motion.div>
  );
}
