"use client";
import { Github, Settings, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Step2_GitHub() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Github className="text-purple-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">2. GitHub Webhook</h2>
          <p className="text-textSecondary text-sm">Automating the handoff from source control to the CI/CD server.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        {/* Animated Flow */}
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex items-center justify-between relative overflow-hidden h-[250px]">
          
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center border border-purple-500/50 relative">
              <Github size={32} className="text-purple-400" />
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-2 -right-2 bg-success text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full"
              >
                Push
              </motion.div>
            </div>
            <span className="text-xs font-bold text-white mt-1">GitHub Repo</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
            <motion.div 
              initial={{ x: -100, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ delay: 1, duration: 1 }}
              className="bg-accent/20 border border-accent/30 text-accent text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-2 mb-2 whitespace-nowrap"
            >
              <Zap size={14} /> Webhook Fired (HTTP POST)
            </motion.div>
            
            <div className="w-full h-1 bg-white/10 rounded-full relative overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }} 
                 animate={{ x: "100%" }} 
                 transition={{ delay: 1, duration: 1, repeat: Infinity, repeatDelay: 1 }}
                 className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-accent to-transparent" 
               />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center border border-red-500/50">
              <Settings size={32} className="text-red-400" />
            </div>
            <span className="text-xs font-bold text-white mt-1 text-center">Jenkins /<br/>GitHub Actions</span>
          </div>

        </div>

        {/* Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#0a0b0f] border border-white/10 rounded-xl p-6">
            <h4 className="font-bold text-white mb-2 text-sm">What is a Webhook?</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              Instead of Jenkins constantly asking GitHub, "Did anyone push code? Did anyone push code?", GitHub actively sends an HTTP POST request (a Webhook) to Jenkins the exact second a push occurs. This is push-based architecture vs pull-based polling.
            </p>
          </div>
          <div className="bg-[#0a0b0f] border border-white/10 rounded-xl p-6">
            <h4 className="font-bold text-white mb-2 text-sm">Jenkins vs GitHub Actions</h4>
            <p className="text-xs text-textSecondary leading-relaxed">
              <strong>Jenkins</strong> is a standalone server you have to host, secure, and manage yourself. It's immensely powerful and heavily used in enterprises.<br/><br/>
              <strong>GitHub Actions</strong> is SaaS. It runs directly inside GitHub. No servers to manage. We are simulating Jenkins/Actions concepts interchangeably here.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
