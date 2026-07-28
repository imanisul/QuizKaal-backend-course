"use client";
import { GitBranch, Settings, Zap, Webhook } from "lucide-react";
import { motion } from "framer-motion";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step2_GitHub({ playbackSpeed = 1 }) {
  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl border border-purple-500/30 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
          <GitBranch className="text-purple-400" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">2. GitHub Webhook</h2>
          <p className="text-textSecondary text-base mt-1">Automating the handoff from source control to the CI/CD server.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1">
        
        {/* Animated Flow Map */}
        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden h-[350px] shadow-2xl">
          {/* Background Decor */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-red-500/5 pointer-events-none" />
          
          <div className="flex flex-col items-center gap-3 z-10">
            <div className="w-20 h-20 rounded-3xl bg-purple-500/10 flex items-center justify-center border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative">
              <GitBranch size={36} className="text-purple-400" />
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 / playbackSpeed, type: "spring", stiffness: 200 }}
                className="absolute -top-3 -right-3 bg-success text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-success/50"
              >
                Push Received
              </motion.div>
            </div>
            <span className="text-sm font-bold text-white tracking-wide mt-2">GitHub Repo</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 1 / playbackSpeed, duration: 0.5 }}
              className="bg-accent/10 border border-accent/30 text-accent text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2 mb-4 whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.2)]"
            >
              <Zap size={14} className="animate-pulse" /> Webhook Fired (HTTP POST)
            </motion.div>
            
            <div className="w-full h-1.5 bg-white/5 rounded-full relative overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }} 
                 animate={{ x: "100%" }} 
                 transition={{ delay: 1 / playbackSpeed, duration: 1.5 / playbackSpeed, repeat: Infinity, ease: "linear" }}
                 className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent" 
               />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 z-10">
            <div className="w-20 h-20 rounded-3xl bg-red-500/10 flex items-center justify-center border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] relative overflow-hidden">
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ delay: 2.5 / playbackSpeed }}
                 className="absolute inset-0 bg-red-500/20 animate-pulse" 
              />
              <Settings size={36} className="text-red-400 relative z-10" />
            </div>
            <span className="text-sm font-bold text-white tracking-wide mt-2 text-center">Jenkins /<br/>GitHub Actions</span>
          </div>

        </div>

        {/* Explanation Analogy */}
        <div className="flex flex-col h-full justify-center">
           <PremiumAnalogyCard 
            icon={Webhook}
            title="Webhooks"
            analogyTitle="A Tap on the Shoulder"
            description="Instead of Jenkins constantly asking GitHub, 'Did anyone push code?', GitHub actively sends an HTTP POST request (a Webhook) to Jenkins the exact second a push occurs."
            points={[
              { keyword: "Polling", text: "Are we there yet? Are we there yet? (Wasteful, slow)" },
              { keyword: "Webhook", text: "I'll tap your shoulder the exact second we arrive. (Efficient, instant)" }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
