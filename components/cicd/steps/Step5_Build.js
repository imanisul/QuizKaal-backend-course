"use client";
import { Box, Package } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step5_Build({ playbackSpeed = 1 }) {
  const terminalLines = [
    { type: "command", text: "npm run build" },
    { type: "output", text: "> quizkaal-backend@1.0.0 build\n> nest build", delay: 200 },
    { type: "output", text: "Compiling TS files...", delay: 500 },
    { type: "output", text: "Using tsconfig.build.json", className: "text-textTertiary", delay: 800 },
    { type: "output", text: "✔ Compilation successful (1240ms)", className: "text-success", delay: 1400 },
    { type: "output", text: "\nPackaging distribution...", delay: 1600 },
    { type: "output", text: "Creating minified bundle...", delay: 2000 },
    { type: "output", text: "dist/main.js          1.2 MB\ndist/main.js.map      4.5 MB", className: "text-blue-400 mt-2", delay: 2400 },
    { type: "output", text: "Build completed successfully.", className: "text-success font-bold mt-2", delay: 2800 }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-500/5 rounded-2xl border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.2)]">
          <Box className="text-orange-400" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">5. The Build Stage</h2>
          <p className="text-textSecondary text-base mt-1">Converting human-readable code into machine-executable artifacts.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title="TypeScript Compiler" 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>
        
        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={Package}
            title="Compilation"
            analogyTitle="IKEA Furniture Box"
            description="You don't ship a fully assembled bed to the customer. You compile all the raw wood and screws into a neat, compact flatpack box (dist folder) that is optimized for shipping."
            points={[
              { keyword: "Raw Code", text: "TypeScript, SCSS, unoptimized images." },
              { keyword: "Compiler", text: "Turns TS to JS, minifies CSS, compresses images." },
              { keyword: "Artifact", text: "The final 'dist' folder ready to be deployed." }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
