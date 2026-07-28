"use client";
import { Laptop, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step1_Developer({ playbackSpeed = 1 }) {
  const terminalLines = [
    { type: "command", text: "git add ." },
    { type: "command", text: 'git commit -m "feat: added login page"' },
    { type: "output", text: "[feature-login a1b2c3d] feat: added login page\n 3 files changed, 140 insertions(+)", delay: 100 },
    { type: "command", text: "git push origin feature-login" },
    { type: "output", text: "Enumerating objects: 11, done.\nCounting objects: 100% (11/11), done.\nWriting objects: 100% (6/6), 842 bytes, done.\nTo github.com:quizkaal/app.git\n * [new branch]      feature-login -> feature-login", delay: 800 }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <Laptop className="text-blue-400" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">1. The Developer</h2>
          <p className="text-textSecondary text-base mt-1">Where the journey begins: writing code and pushing to version control.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-0">
        
        {/* Left Side: Real-life Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={GitBranch}
            title="Git"
            analogyTitle="Google Docs History"
            description="Think of Git like writing a group project in Google Docs, but instead of auto-saving every keystroke, you manually create intentional save points."
            points={[
              { keyword: "add", text: "Selecting the paragraphs you want to save." },
              { keyword: "commit", text: "Saving those paragraphs with a descriptive title." },
              { keyword: "push", text: "Uploading your saves to the shared cloud server (GitHub)." }
            ]}
          />
        </div>

        {/* Right Side: Animated Terminal */}
        <div className="h-full min-h-[350px]">
          <AnimatedTerminal 
            title="macOS Terminal" 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>

      </div>
    </div>
  );
}
