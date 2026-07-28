"use client";
import { Layers, AlertTriangle, Ship } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step6_Docker({ scenario, playbackSpeed = 1 }) {
  const isFailed = scenario === "docker_fail";

  const terminalLines = [
    { type: "command", text: "docker build -t quizkaal-backend:latest ." },
    { type: "output", text: "Sending build context to Docker daemon  4.5MB", delay: 200 },
    { type: "output", text: "Step 1/6 : FROM node:18-alpine", className: "text-blue-400 mt-2", delay: 400 },
    { type: "output", text: " ---> 7a8b9c0d1e2f", delay: 800 },
    { type: "output", text: "Step 2/6 : WORKDIR /usr/src/app", className: "text-blue-400 mt-2", delay: 900 },
    { type: "output", text: " ---> Running in 1a2b3c4d5e6f", delay: 1100 },
    { type: "output", text: "Step 3/6 : COPY package*.json ./", className: "text-blue-400 mt-2", delay: 1200 },
    { type: "output", text: " ---> 2b3c4d5e6f7a", delay: 1400 },
    { type: "output", text: "Step 4/6 : RUN npm install --production", className: "text-blue-400 mt-2", delay: 1500 },
    
    ...(isFailed ? [
      { type: "output", text: "npm ERR! code E404\nnpm ERR! 404 Not Found - GET https://registry.npmjs.org/non-existent-package", className: "text-error font-bold mt-2", delay: 2500 },
      { type: "output", text: "The command '/bin/sh -c npm install --production' returned a non-zero code: 1", className: "text-error", delay: 2700 }
    ] : [
      { type: "output", text: "added 156 packages, and audited 157 packages in 3s", className: "text-textSecondary mt-2", delay: 2500 },
      { type: "output", text: " ---> 3c4d5e6f7a8b", delay: 2600 },
      { type: "output", text: "Step 5/6 : COPY . .", className: "text-blue-400 mt-2", delay: 2800 },
      { type: "output", text: " ---> 4d5e6f7a8b9c", delay: 3000 },
      { type: "output", text: "Step 6/6 : CMD [\"node\", \"dist/main.js\"]", className: "text-blue-400 mt-2", delay: 3100 },
      { type: "output", text: " ---> 5e6f7a8b9c0d", delay: 3300 },
      { type: "output", text: "Successfully built 5e6f7a8b9c0d\nSuccessfully tagged quizkaal-backend:latest", className: "text-success font-bold mt-2", delay: 3600 }
    ])
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className={`p-4 rounded-2xl border shadow-[0_0_30px_rgba(59,130,246,0.2)] bg-gradient-to-br
          ${isFailed ? 'from-error/20 to-error/5 border-error/30 shadow-[0_0_30px_rgba(244,63,94,0.2)]' : 'from-blue-600/20 to-blue-600/5 border-blue-600/30'}
        `}>
          {isFailed ? <AlertTriangle className="text-error" size={28} /> : <Layers className="text-blue-500" size={28} />}
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">6. Docker Image Build</h2>
          <p className="text-textSecondary text-base mt-1">
            {isFailed ? "The Docker build crashed due to a missing dependency!" : "Packaging the app and its OS dependencies into a portable image."}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={Ship}
            title="Docker"
            analogyTitle="Shipping Container"
            description="Before Docker, shipping goods meant loading loose boxes onto ships, resulting in chaos. Docker is the standardized steel shipping container. It doesn't matter if it's holding Ferraris or bananas; the crane (Kubernetes) lifts it exactly the same way."
            points={[
              { keyword: "Dockerfile", text: "The packing slip (instructions on what goes inside)." },
              { keyword: "Image", text: "The sealed, immutable shipping container." },
              { keyword: "Container", text: "The container actively moving on the ship (running process)." }
            ]}
          />
        </div>

        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title={isFailed ? "Docker Daemon (Failing)" : "Docker Daemon"} 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>

      </div>
    </div>
  );
}
