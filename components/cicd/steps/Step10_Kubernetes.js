"use client";
import { Workflow, AlertTriangle, Blocks } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step10_Kubernetes({ scenario, playbackSpeed = 1 }) {
  const isFailed = scenario === "pod_crash";

  const terminalLines = [
    { type: "command", text: "kubectl set image deployment/quizkaal-api api=quizkaal-backend:latest" },
    { type: "output", text: "deployment.apps/quizkaal-api image updated", delay: 200 },
    { type: "command", text: "kubectl rollout status deployment/quizkaal-api" },
    { type: "output", text: "Waiting for deployment \"quizkaal-api\" rollout to finish: 1 out of 3 new replicas have been updated...", delay: 600 },
    { type: "output", text: "Waiting for deployment \"quizkaal-api\" rollout to finish: 1 old replicas are pending termination...", delay: 1200 },
    
    ...(isFailed ? [
      { type: "output", text: "error: deployment \"quizkaal-api\" exceeded its progress deadline", className: "text-error font-bold mt-2", delay: 2000 },
      { type: "command", text: "kubectl get pods" },
      { type: "output", text: "NAME                            READY   STATUS             RESTARTS   AGE\nquizkaal-api-6b459c9968-k9x2p   0/1     CrashLoopBackOff   3          45s\nquizkaal-api-6b459c9968-l2m4n   0/1     Error              4          45s\nquizkaal-api-5d78df8855-v8x1q   1/1     Running            0          12d", className: "text-error font-mono", delay: 2500 },
      { type: "output", text: "\n[!] Rollback initiated automatically.", className: "text-error font-bold mt-2", delay: 3000 }
    ] : [
      { type: "output", text: "Waiting for deployment \"quizkaal-api\" rollout to finish: 2 of 3 updated replicas are available...", delay: 1800 },
      { type: "output", text: "deployment \"quizkaal-api\" successfully rolled out", className: "text-success font-bold mt-2", delay: 2400 },
      { type: "command", text: "kubectl get pods" },
      { type: "output", text: "NAME                            READY   STATUS    RESTARTS   AGE\nquizkaal-api-7c569d9968-a1b2c   1/1     Running   0          2m\nquizkaal-api-7c569d9968-d3e4f   1/1     Running   0          2m\nquizkaal-api-7c569d9968-g5h6i   1/1     Running   0          2m", className: "text-success font-mono mt-1", delay: 3000 }
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
          {isFailed ? <AlertTriangle className="text-error" size={28} /> : <Workflow className="text-blue-500" size={28} />}
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">10. Kubernetes Deployment</h2>
          <p className="text-textSecondary text-base mt-1">
            {isFailed ? "The new pods crashed on startup! Kubernetes is halting the rollout." : "Performing a zero-downtime rolling update across the server cluster."}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title={isFailed ? "Kubectl (Rollback)" : "Kubectl (Success)"} 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>

        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={Blocks}
            title="Kubernetes"
            analogyTitle="The Warehouse Manager"
            description="If Docker is the shipping container, Kubernetes is the robotic warehouse manager. It decides which servers the containers should run on, restarts them if they crash, and perfectly manages traffic routing."
            points={[
              { keyword: "Rolling Update", text: "Replacing old containers one-by-one so users never experience downtime." },
              { keyword: "ReplicaSet", text: "Ensuring there are exactly 3 copies of the app running at all times." },
              { keyword: "CrashLoop", text: "If the new app immediately crashes, K8s stops the rollout to prevent an outage." }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
