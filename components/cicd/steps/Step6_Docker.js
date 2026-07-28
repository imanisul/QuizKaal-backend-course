"use client";
import { Layers, Terminal, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Step6_Docker({ scenario }) {
  const isFail = scenario === "docker_fail";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
          <Layers className="text-blue-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">6. Docker Image Build</h2>
          <p className="text-textSecondary text-sm">Packaging the app and its OS dependencies into a portable image.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Dockerfile Layers */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
             <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Layers size={14}/> Dockerfile</span>
          </div>
          <div className="p-4 flex flex-col gap-2 relative">
            <DockerLayer code="FROM node:18-alpine" desc="Base OS Layer" delay={0.2} />
            <DockerLayer code="WORKDIR /app" desc="Create Directory" delay={0.4} />
            <DockerLayer code="COPY package*.json ./" desc="Copy Dependencies" delay={0.6} />
            <DockerLayer code="RUN npm ci" desc="Install Production Deps" delay={0.8} />
            {isFail ? (
              <DockerLayer code="COPY . ." desc="Copy Source Code" delay={1} fail={true} />
            ) : (
              <>
                <DockerLayer code="COPY . ." desc="Copy Source Code" delay={1} />
                <DockerLayer code="CMD [\"node\", \"dist/main.js\"]" desc="Start Command" delay={1.2} />
              </>
            )}
          </div>
        </div>

        {/* Console / Explanation */}
        {isFail ? (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-error/10 border border-error/20 rounded-xl p-6 flex flex-col">
            <h3 className="font-bold text-error mb-4 flex items-center gap-2"><AlertTriangle size={18}/> Build Failed</h3>
            <div className="bg-[#0a0b0f] border border-error/20 p-4 rounded-lg text-xs font-mono text-error/80 whitespace-pre overflow-x-auto flex-1">
Step 5/6 : COPY . .<br/>
---{`>`} 1234abcd5678<br/>
Error processing tar file(exit status 1): no space left on device
            </div>
            <div className="mt-4 text-sm text-textSecondary">
              Docker builds can fail if the Jenkins agent runs out of disk space, or if a <code>RUN</code> command exits with a non-zero code.
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-6 h-full flex flex-col justify-center">
              <h3 className="font-bold text-blue-400 mb-2">Layer Caching (Interview Topic!)</h3>
              <p className="text-sm text-textSecondary leading-relaxed mb-4">
                Why do we <code>COPY package.json</code> before we <code>COPY . .</code>? 
              </p>
              <p className="text-sm text-textSecondary leading-relaxed">
                Docker caches each step. If you only change a `.ts` file, Docker re-uses the cached `npm ci` layer because `package.json` didn't change! This reduces build times from 5 minutes to 5 seconds.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function DockerLayer({ code, desc, delay, fail }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className={`border rounded-lg p-3 flex flex-col gap-1 relative overflow-hidden group
        ${fail ? 'bg-error/10 border-error/30' : 'bg-surface border-white/10 hover:border-blue-500/50'}
      `}
    >
      <div className={`text-xs font-mono font-bold ${fail ? 'text-error' : 'text-blue-400'}`}>{code}</div>
      <div className="text-[10px] text-textTertiary uppercase tracking-widest">{desc}</div>
      {fail && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-error"><AlertTriangle size={16}/></div>}
    </motion.div>
  );
}
