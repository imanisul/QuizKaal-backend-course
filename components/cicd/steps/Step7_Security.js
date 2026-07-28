"use client";
import { ShieldCheck, AlertTriangle, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedTerminal from "../../ui/AnimatedTerminal";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step7_Security({ scenario, playbackSpeed = 1 }) {
  const isFailed = scenario === "security_fail";

  const terminalLines = [
    { type: "command", text: "trivy image quizkaal-backend:latest" },
    { type: "output", text: "2026-07-28T10:00:00Z INFO Need to update DB", delay: 200 },
    { type: "output", text: "2026-07-28T10:00:03Z INFO DB Repository: ghcr.io/aquasecurity/trivy-db", delay: 800 },
    { type: "output", text: "2026-07-28T10:00:05Z INFO Downloading DB... [========================] 100%", delay: 1200 },
    { type: "output", text: "2026-07-28T10:00:06Z INFO Detected OS: alpine", delay: 1500 },
    { type: "output", text: "2026-07-28T10:00:06Z INFO Detecting Alpine vulnerabilities...", delay: 1800 },
    
    ...(isFailed ? [
      { type: "output", text: "quizkaal-backend:latest (alpine 3.19.0)\n======================================", className: "font-bold mt-4", delay: 2500 },
      { type: "output", text: "Total: 1 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 1)", className: "text-error font-bold mt-2", delay: 2600 },
      { type: "output", text: "\n+---------+------------------+----------+-------------------+---------------+\n| LIBRARY | VULNERABILITY ID | SEVERITY | INSTALLED VERSION | FIXED VERSION |\n+---------+------------------+----------+-------------------+---------------+\n| openssl | CVE-2024-5535    | CRITICAL | 3.1.4-r1          | 3.1.4-r2      |\n+---------+------------------+----------+-------------------+---------------+", className: "text-error font-mono", delay: 2800 },
      { type: "output", text: "\n[!] Build failed due to CRITICAL vulnerabilities.", className: "text-error font-bold mt-4", delay: 3000 }
    ] : [
      { type: "output", text: "quizkaal-backend:latest (alpine 3.19.0)\n======================================", className: "font-bold mt-4", delay: 2500 },
      { type: "output", text: "Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)", className: "text-success font-bold mt-2", delay: 2700 },
      { type: "output", text: "\n✔ No vulnerabilities found.", className: "text-success font-bold mt-2", delay: 3000 }
    ])
  ];

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className={`p-4 rounded-2xl border shadow-[0_0_30px_rgba(34,197,94,0.2)] bg-gradient-to-br
          ${isFailed ? 'from-error/20 to-error/5 border-error/30 shadow-[0_0_30px_rgba(244,63,94,0.2)]' : 'from-success/20 to-success/5 border-success/30'}
        `}>
          {isFailed ? <AlertTriangle className="text-error" size={28} /> : <ShieldCheck className="text-success" size={28} />}
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">7. Security Scanning (Trivy)</h2>
          <p className="text-textSecondary text-base mt-1">
            {isFailed ? "A CRITICAL CVE (vulnerability) was detected in the Docker image!" : "Scanning the Docker image for known CVEs (Common Vulnerabilities and Exposures)."}
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1 h-full min-h-[400px]">
        
        {/* Animated Terminal */}
        <div className="h-full">
          <AnimatedTerminal 
            title={isFailed ? "Trivy Scanner (FAILED)" : "Trivy Scanner (PASSED)"} 
            branch="feature-login" 
            lines={terminalLines} 
            autoPlayDelay={0.5 / playbackSpeed} 
          />
        </div>

        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={ShieldAlert}
            title="Trivy Scan"
            analogyTitle="Airport X-Ray Scanner"
            description="Just like luggage passes through an X-ray scanner before being loaded onto an airplane, your Docker image passes through Trivy before being allowed into production."
            points={[
              { keyword: "Trivy DB", text: "The database of known contraband (CVEs)." },
              { keyword: "Image Scan", text: "The X-Ray checking your OS layers and npm packages." },
              { keyword: "Action", text: "If it finds a weapon (CRITICAL CVE), it halts the pipeline immediately." }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
