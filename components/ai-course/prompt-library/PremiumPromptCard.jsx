"use client";
import { motion } from "framer-motion";
import { Copy, Check, Play, Star, Clock, Bookmark } from "lucide-react";
import { useState } from "react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
};

export default function PremiumPromptCard({ prompt, onCopy, copiedId, onPreview }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'Intermediate': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Advanced': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  return (
    <motion.div 
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -8 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-[#12121a]/80 rounded-2xl border border-white/10 flex flex-col hover:border-white/20 transition-all duration-300 shadow-xl backdrop-blur-md group overflow-hidden h-full relative"
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r from-primary to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500 z-0`} />

      <div className="p-6 border-b border-white/10 flex-1 flex flex-col relative z-10 bg-[#12121a]">
        
        {/* Badges Header */}
        <div className="flex items-start justify-between mb-4 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] font-bold uppercase tracking-widest text-textTertiary">
              {prompt.category}
            </span>
            <span className={`px-2 py-1 border rounded-md text-[10px] font-bold uppercase tracking-widest ${getDifficultyColor(prompt.difficulty)}`}>
              {prompt.difficulty}
            </span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsBookmarked(!isBookmarked); }}
            className={`p-1.5 rounded-lg transition-colors ${isBookmarked ? 'text-primary bg-primary/10' : 'text-textTertiary hover:text-white hover:bg-white/10'}`}
          >
            <Bookmark size={16} fill={isBookmarked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1">{prompt.title}</h3>
        <p className="text-sm text-textSecondary mb-4 flex-1 line-clamp-2">{prompt.problem}</p>
        
        {/* Metadata Row */}
        <div className="flex items-center gap-4 text-xs font-medium text-textTertiary mb-6">
          <div className="flex items-center gap-1"><Clock size={12} /> {prompt.time}</div>
          <div className="flex items-center gap-1"><Star size={12} className="text-yellow-500" /> {prompt.rating}</div>
          <div>{prompt.popularity}</div>
        </div>

        {/* Models Icons */}
        <div className="flex -space-x-1 mb-6">
          {prompt.models?.map((model) => (
            <div key={model} title={model} className="w-6 h-6 rounded-full bg-black border border-white/10 flex items-center justify-center text-[8px] font-bold text-white shadow-sm">
              {model[0]}
            </div>
          ))}
        </div>
        
        {/* Prompt Snippet Preview */}
        <div 
          onClick={() => onPreview(prompt)}
          className="w-full text-left bg-black/60 rounded-xl p-4 border border-white/5 relative hover:border-primary/50 transition-colors group/preview cursor-pointer mt-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl flex items-end justify-center pb-2 opacity-0 group-hover/preview:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1 bg-black/80 px-3 py-1 rounded-full backdrop-blur-md">
              <Play size={10} fill="currentColor" /> Preview
            </span>
          </div>
          <p className="text-xs text-textTertiary font-mono whitespace-pre-wrap line-clamp-3 leading-relaxed relative z-0">{prompt.prompt}</p>
        </div>
      </div>
      
      {/* Footer Actions */}
      <div className="p-4 bg-black/20 flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <p className="text-[10px] text-textSecondary uppercase tracking-widest font-bold">
          Role: <span className="text-white">{prompt.role}</span>
        </p>
        <button 
          onClick={() => onCopy(prompt.id, prompt.prompt)}
          className="w-full sm:w-auto px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold text-white transition-colors flex items-center justify-center gap-2 group/btn focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {copiedId === prompt.id ? (
            <><Check size={14} className="text-success" /> Copied!</>
          ) : (
            <><Copy size={14} className="group-hover/btn:scale-110 transition-transform" /> Copy Prompt</>
          )}
        </button>
      </div>
    </motion.div>
  );
}
