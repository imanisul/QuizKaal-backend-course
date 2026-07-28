"use client";
import { Settings, Play } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step3_Jenkins({ playbackSpeed = 1 }) {
  const terminalLines = [
    { type: "output", text: "Started by GitHub push by imanisul", delay: 100 },
    { type: "output", text: "Obtained Jenkinsfile from git https://github.com/quizkaal/app.git", delay: 300 },
    { type: "output", text: "[Pipeline] Start of Pipeline", delay: 400 },
    { type: "output", text: "[Pipeline] node", delay: 450 },
    { type: "output", text: "Running on Jenkins-Worker-03 in /var/jenkins_home/workspace/app-backend", delay: 600 },
    { type: "output", text: "[Pipeline] stage", delay: 700 },
    { type: "output", text: "[Pipeline] { (Preparation) }", delay: 750 },
    { type: "command", text: "git fetch --tags --progress" },
    { type: "output", text: "Checking out Revision a1b2c3d (feature-login)", delay: 800 },
    { type: "output", text: "Commit message: \"feat: added login page\"", delay: 850 },
    { type: "output", text: "SUCCESS: Pipeline preparation complete.", className: "text-success font-bold mt-2", delay: 1000 }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-red-500/20 to-red-500/5 rounded-2xl border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
          <Settings className="text-red-400 animate-spin-slow" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">3. CI Server (Jenkins)</h2>
          <p className="text-textSecondary text-base mt-1">The orchestrator that reads the instructions and begins the assembly line.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[350px]">
        
        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title="Jenkins Console Output" 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>
        
        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={Play}
            title="Jenkins/GitHub Actions"
            analogyTitle="The Factory Supervisor"
            description="The CI server is the supervisor of your factory. It doesn't write the code, but the moment new materials arrive, it reads the blueprint (Jenkinsfile) and starts assigning tasks to workers."
            points={[
              { keyword: "Trigger", text: "Wakes up when the Webhook fires." },
              { keyword: "Clone", text: "Downloads the latest code into an isolated workspace." },
              { keyword: "Pipeline", text: "Reads the YAML/Groovy file to know the exact sequence of steps." }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
