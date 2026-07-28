"use client";
import { Laptop, GitBranch, ArrowRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function Step1_Developer() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Laptop className="text-blue-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">1. The Developer</h2>
          <p className="text-textSecondary text-sm">Where the journey begins: writing code and pushing to version control.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Real-life Analogy */}
        <div className="bg-surface border border-white/10 rounded-xl p-6 flex flex-col justify-center">
          <h3 className="font-bold text-white text-lg mb-2">Real-Life Analogy</h3>
          <p className="text-sm text-textSecondary leading-relaxed mb-6">
            Think of Git like writing a group project in Google Docs, but instead of auto-saving every keystroke, you manually create "save points" (<strong>commits</strong>).
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold w-16 shrink-0 font-mono text-sm">add</span>
              <span className="text-sm text-textSecondary">Selecting the paragraphs you want to save.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold w-16 shrink-0 font-mono text-sm">commit</span>
              <span className="text-sm text-textSecondary">Saving those paragraphs with a title (e.g., "Added Introduction").</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 font-bold w-16 shrink-0 font-mono text-sm">push</span>
              <span className="text-sm text-textSecondary">Uploading your save points to the shared cloud server (GitHub) so your team can see them.</span>
            </li>
          </ul>
        </div>

        {/* Terminal Animation */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Terminal size={14}/> Terminal</span>
            <span className="text-xs font-mono text-textTertiary flex items-center gap-1"><GitBranch size={12}/> feature-login</span>
          </div>
          <div className="p-5 text-sm font-mono leading-loose">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span className="text-green-400">➜</span> <span className="text-blue-400">~/app</span> git add .
            </motion.div>
            
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
              <span className="text-green-400">➜</span> <span className="text-blue-400">~/app</span> git commit -m <span className="text-yellow-200">"feat: added login page"</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-textTertiary text-xs mt-2 ml-4 mb-4">
              [feature-login a1b2c3d] feat: added login page<br/>
              3 files changed, 140 insertions(+)<br/>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
              <span className="text-green-400">➜</span> <span className="text-blue-400">~/app</span> git push origin feature-login
            </motion.div>
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ delay: 3.5 }} className="text-textTertiary text-xs mt-2 ml-4">
              Enumerating objects: 11, done.<br/>
              Counting objects: 100% (11/11), done.<br/>
              Writing objects: 100% (6/6), 842 bytes, done.<br/>
              To github.com:quizkaal/app.git<br/>
              &nbsp;&nbsp;* [new branch]      feature-login -{`>`} feature-login
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
