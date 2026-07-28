"use client";
import { Box, FileJson, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Step5_Build() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
          <Box className="text-orange-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">5. Build (npm/Maven)</h2>
          <p className="text-textSecondary text-sm">Compiling TypeScript to JavaScript and packaging the app.</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">
        
        <div className="bg-surface border border-white/10 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between relative overflow-hidden flex-1">
          
          <div className="flex flex-col items-center gap-3 z-10 w-full md:w-1/3">
            <span className="text-[10px] uppercase tracking-widest text-textTertiary font-bold flex items-center gap-1"><FileJson size={12}/> Source Code</span>
            <div className="bg-[#0a0b0f] border border-white/10 p-3 rounded-lg text-xs font-mono text-blue-400 w-full">
              src/<br/>
              ├── main.ts<br/>
              ├── auth.ts<br/>
              └── utils.ts
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center z-10 text-orange-400">
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ repeat: Infinity, duration: 1.5 }}>
               <ArrowRight size={32} />
            </motion.div>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-2">npm run build</span>
          </div>

          <div className="flex flex-col items-center gap-3 z-10 w-full md:w-1/3">
            <span className="text-[10px] uppercase tracking-widest text-textTertiary font-bold flex items-center gap-1"><Box size={12}/> Build Artifact</span>
            <div className="bg-[#0a0b0f] border border-orange-500/30 p-3 rounded-lg text-xs font-mono text-orange-400 w-full shadow-[0_0_15px_rgba(249,115,22,0.1)]">
              dist/<br/>
              ├── main.js<br/>
              ├── auth.js<br/>
              └── utils.js
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-black/50 border border-white/10 rounded-xl p-5">
             <h4 className="font-bold text-white mb-2 text-sm">Why do we build?</h4>
             <p className="text-xs text-textSecondary leading-relaxed">
               Node.js cannot natively execute TypeScript (yet). We must run a compiler (<code>tsc</code> or <code>esbuild</code>) to transpile <code>.ts</code> files into plain <code>.js</code> files that the runtime understands. 
             </p>
           </div>
           <div className="bg-black/50 border border-white/10 rounded-xl p-5">
             <h4 className="font-bold text-white mb-2 text-sm">Java / C# Analogy</h4>
             <p className="text-xs text-textSecondary leading-relaxed">
               In Java, this step would be <code>mvn clean package</code>, which takes all your <code>.java</code> files and compiles them into a single executable <code>.jar</code> file. This `.jar` or `/dist` folder is called the <strong>Build Artifact</strong>.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}
