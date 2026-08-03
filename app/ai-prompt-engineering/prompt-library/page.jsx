"use client";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, PenTool, Sparkles, Flame, GraduationCap } from "lucide-react";
import Link from "next/link";
import Confetti from "react-confetti";

import { PROMPT_LIBRARY } from "@/data/ai/promptLibrary";
import PromptLibraryHero from "@/components/ai-course/prompt-library/PromptLibraryHero";
import PromptSearchBar from "@/components/ai-course/prompt-library/PromptSearchBar";
import PromptCategoryFilters from "@/components/ai-course/prompt-library/PromptCategoryFilters";
import FeaturedPromptCard from "@/components/ai-course/prompt-library/FeaturedPromptCard";
import PromptCollectionCarousel from "@/components/ai-course/prompt-library/PromptCollectionCarousel";
import PremiumPromptCard from "@/components/ai-course/prompt-library/PremiumPromptCard";
import PromptDetailModal from "@/components/ai-course/prompt-library/PromptDetailModal";

// Animation Variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0 }
};

export default function PromptLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const [previewPrompt, setPreviewPrompt] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setIsClient(true);
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  const filteredPrompts = useMemo(() => {
    return PROMPT_LIBRARY.filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            prompt.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            prompt.problem?.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (activeCategory === "All") return true;
      return prompt.category === activeCategory;
    });
  }, [searchQuery, activeCategory]);

  const featuredPrompt = PROMPT_LIBRARY.find(p => p.id === "p2"); // Hardcoded "Prompt of the Day"
  const trendingPrompts = PROMPT_LIBRARY.filter(p => ["p1", "p5", "p8", "p10"].includes(p.id));
  const beginnerPrompts = PROMPT_LIBRARY.filter(p => p.difficulty === "Beginner");

  const copyToClipboard = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    
    setShowConfetti(true);

    setToastMessage("Prompt copied! Ready to paste into ChatGPT.");
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
      setShowConfetti(false);
    }, 3000);
  };

  if (!isClient) return <div className="min-h-screen bg-[#0a0a0c]" />; // Prevent hydration mismatch

  return (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#0a0a0c] text-white pt-24 pb-32 overflow-hidden"
    >
      {showConfetti && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} colors={['#a855f7', '#06b6d4', '#ffffff']} />
        </div>
      )}
      
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        <PromptLibraryHero />
        <PromptSearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <PromptCategoryFilters activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        {/* Dynamic Content Based on Search/Filter */}
        {searchQuery === "" && activeCategory === "All" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeaturedPromptCard 
              prompt={featuredPrompt} 
              onCopy={copyToClipboard} 
              onPreview={setPreviewPrompt} 
            />
            
            <PromptCollectionCarousel 
              title="Trending Now" 
              icon={Flame}
              prompts={trendingPrompts} 
              onCopy={copyToClipboard} 
              copiedId={copiedId}
              onPreview={setPreviewPrompt}
            />

            <PromptCollectionCarousel 
              title="Beginner Essentials" 
              icon={GraduationCap}
              subtitle="Perfect prompts to get started with AI."
              prompts={beginnerPrompts} 
              onCopy={copyToClipboard} 
              copiedId={copiedId}
              onPreview={setPreviewPrompt}
            />
            
            {/* All Prompts Grid (Below collections) */}
            <div className="max-w-[1200px] mx-auto px-6 mt-20">
              <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-2">
                All Templates
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROMPT_LIBRARY.map((prompt) => (
                  <PremiumPromptCard 
                    key={prompt.id} 
                    prompt={prompt} 
                    onCopy={copyToClipboard} 
                    copiedId={copiedId} 
                    onPreview={setPreviewPrompt} 
                  />
                ))}
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div layout className="max-w-[1200px] mx-auto px-6">
            <h2 className="text-xl font-bold text-white mb-6">
              Found {filteredPrompts.length} {filteredPrompts.length === 1 ? 'result' : 'results'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredPrompts.map((prompt) => (
                  <PremiumPromptCard 
                    key={prompt.id} 
                    prompt={prompt} 
                    onCopy={copyToClipboard} 
                    copiedId={copiedId} 
                    onPreview={setPreviewPrompt} 
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredPrompts.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="w-full py-32 flex flex-col items-center justify-center text-center bg-white/[0.02] border border-white/5 rounded-3xl"
              >
                <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 shadow-inner">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-tight">No prompts found</h3>
                <p className="text-textSecondary mb-8 max-w-md">We couldn't find any prompts matching your search criteria. Try a different keyword or browse all categories.</p>
                <button 
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold transition-colors"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Builder CTA */}
        <div className="max-w-[1200px] mx-auto px-6 mt-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-[#12121a] to-[#0a0a0c] border border-white/10 rounded-[2rem] p-10 md:p-16 text-center overflow-hidden group shadow-2xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={32} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">Can't find the perfect prompt?</h2>
              <p className="text-lg text-textSecondary mb-8 max-w-xl mx-auto">
                Use our interactive Prompt Builder to engineer a custom prompt tailored specifically to your unique workflow.
              </p>
              <Link 
                href="/ai-prompt-engineering/builder"
                className="px-8 py-4 bg-white text-black font-black rounded-full flex items-center justify-center gap-3 hover:bg-gray-200 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <PenTool size={20} /> Build Your Own Prompt
              </Link>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Modal */}
      <PromptDetailModal 
        isOpen={!!previewPrompt} 
        onClose={() => setPreviewPrompt(null)} 
        prompt={previewPrompt} 
      />

      {/* Toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-success/20 text-success border border-success/30 px-6 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md flex items-center gap-3"
          >
            <Sparkles size={18} /> {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
