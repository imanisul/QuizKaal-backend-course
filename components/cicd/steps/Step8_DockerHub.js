"use client";
import { Database, UploadCloud } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step8_DockerHub({ playbackSpeed = 1 }) {
  const terminalLines = [
    { type: "command", text: "docker push imanisul/quizkaal-backend:latest" },
    { type: "output", text: "The push refers to repository [docker.io/imanisul/quizkaal-backend]", delay: 200 },
    { type: "output", text: "5f70bf18a086: Pushed", delay: 800 },
    { type: "output", text: "94ab2b5a1538: Pushed", delay: 1000 },
    { type: "output", text: "75d40a5a3a2d: Pushed", delay: 1200 },
    { type: "output", text: "b7e3f8906154: Pushed", delay: 1600 },
    { type: "output", text: "921867fa7e8d: Pushed", delay: 1800 },
    { type: "output", text: "latest: digest: sha256:d8c278a9c... size: 1367", className: "text-blue-400 mt-2", delay: 2200 },
    { type: "output", text: "✔ Image successfully pushed to Docker Hub", className: "text-success font-bold mt-2", delay: 2500 }
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-2xl border border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
          <Database className="text-blue-400" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">8. Container Registry</h2>
          <p className="text-textSecondary text-base mt-1">Uploading the secure, tested image to a centralized repository.</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title="Docker CLI (Push)" 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>
        
        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={UploadCloud}
            title="Docker Registry"
            analogyTitle="The Container Port"
            description="Docker Hub (or AWS ECR) acts like a massive international seaport. You've packed your container and cleared security; now you store it at the port so ships (servers) from anywhere in the world can come pick it up."
            points={[
              { keyword: "Tagging", text: "Writing 'v1.2.0' on the side of the container so servers know which one to grab." },
              { keyword: "Push", text: "Driving the container from your local factory to the global port." },
              { keyword: "Pull", text: "Kubernetes downloading it from the port later." }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
