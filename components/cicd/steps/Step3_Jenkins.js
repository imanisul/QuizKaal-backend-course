"use client";
import { Settings, FileCode2, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function Step3_Jenkins() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
          <Settings className="text-red-400" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">3. Jenkins Pipeline</h2>
          <p className="text-textSecondary text-sm">The automation engine wakes up and reads the blueprint.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Jenkinsfile View */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
             <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><FileCode2 size={14}/> Jenkinsfile</span>
          </div>
          <div className="p-4 text-xs font-mono text-textSecondary leading-relaxed whitespace-pre overflow-y-auto">
<span className="text-purple-400">pipeline</span> {"{\n"}
{"  "}agent <span className="text-blue-400">any</span>{"\n"}
{"  "}stages {"{\n"}
{"    "}<span className="text-blue-400">stage</span>(<span className="text-green-400">'Checkout'</span>) {"{\n"}
{"      "}steps {"{ "}<span className="text-purple-400">checkout</span> scm {"}\n"}
{"    }\n"}
{"    "}<span className="text-blue-400">stage</span>(<span className="text-green-400">'Install Deps'</span>) {"{\n"}
{"      "}steps {"{ "}<span className="text-purple-400">sh</span> <span className="text-green-400">'npm install'</span> {"}\n"}
{"    }\n"}
{"    "}<span className="text-blue-400">stage</span>(<span className="text-green-400">'Test'</span>) {"{\n"}
{"      "}steps {"{ "}<span className="text-purple-400">sh</span> <span className="text-green-400">'npm run test'</span> {"}\n"}
{"    }\n"}
{"    "}<span className="text-blue-400">stage</span>(<span className="text-green-400">'Build Docker'</span>) {"{\n"}
{"      "}steps {"{ "}<span className="text-purple-400">sh</span> <span className="text-green-400">'docker build -t app:latest .'</span> {"}\n"}
{"    }\n"}
{"  }\n"}
{"}"}
          </div>
        </div>

        {/* Console Log */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
             <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Terminal size={14}/> Build #412 Console</span>
          </div>
          <div className="p-4 text-xs font-mono text-textTertiary leading-relaxed">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>[Jenkins] Started by GitHub push by anisul</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>[Jenkins] Running in Workspace /var/lib/jenkins/jobs/app</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-blue-400 mt-2">{`>`} git clone https://github.com/quizkaal/app.git</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>Cloning repository...</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="text-blue-400 mt-2">{`>`} git checkout -f a1b2c3d</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }} className="text-success mt-2">✔ Stage 'Checkout' completed successfully.</motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="mt-2 text-white font-bold animate-pulse">Moving to stage 'Install Deps'...</motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
