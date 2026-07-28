"use client";
import { Database, UploadCloud, ArrowRight, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function Step8_DockerHub() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-400/10 rounded-xl border border-blue-400/20">
          <Database className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">8. Push to Registry (Docker Hub)</h2>
          <p className="text-textSecondary text-sm">Uploading the clean image so Kubernetes can download it later.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex items-center justify-between relative overflow-hidden h-[250px]">
          
          <div className="flex flex-col items-center gap-2 z-10 w-24">
             <div className="w-16 h-16 bg-blue-500/20 border border-blue-500/50 rounded-xl flex items-center justify-center">
                <span className="text-xs font-mono font-bold text-blue-400">Image</span>
             </div>
             <span className="text-[10px] uppercase font-bold tracking-widest text-white mt-1">Jenkins</span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
            <motion.div 
              initial={{ x: -50, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }} 
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
              className="text-blue-400 mb-2"
            >
              <UploadCloud size={24} />
            </motion.div>
            
            <div className="w-full h-px bg-white/10 relative overflow-hidden">
               <motion.div 
                 initial={{ x: "-100%" }} 
                 animate={{ x: "100%" }} 
                 transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                 className="absolute top-0 bottom-0 w-1/3 bg-blue-400 shadow-[0_0_10px_#60A5FA]" 
               />
            </div>
            <span className="text-[10px] font-mono text-textTertiary mt-2">docker push quizkaal/app:v1.0.1</span>
          </div>

          <div className="flex flex-col items-center gap-2 z-10 w-24">
            <div className="w-16 h-16 rounded-2xl bg-[#0a0b0f] flex items-center justify-center border border-white/10">
              <Database size={32} className="text-white" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-white mt-1 text-center">Docker Hub / ECR</span>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-black/50 border border-white/10 rounded-xl p-5">
             <h4 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><Tag size={16} className="text-accent"/> Semantic Versioning</h4>
             <p className="text-xs text-textSecondary leading-relaxed">
               Images should be tagged explicitly (e.g., <code>v1.0.1</code> or the Git commit hash <code>a1b2c3d</code>). Relying only on the <code>latest</code> tag in production is dangerous because Kubernetes won't know if the underlying image changed.
             </p>
           </div>
           <div className="bg-black/50 border border-white/10 rounded-xl p-5">
             <h4 className="font-bold text-white mb-2 text-sm">Private Registries</h4>
             <p className="text-xs text-textSecondary leading-relaxed">
               Docker Hub is public by default. Enterprises use AWS ECR (Elastic Container Registry), Google GCR, or private Docker Hub repos to ensure proprietary code isn't exposed to the world.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
