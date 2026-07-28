"use client";
import { ShieldCheck, ShieldAlert, AlertTriangle, Bug } from "lucide-react";
import { motion } from "framer-motion";

export default function Step7_Security({ scenario }) {
  const isFail = scenario === "security_fail";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className={`p-3 rounded-xl border ${isFail ? 'bg-error/10 border-error/20' : 'bg-success/10 border-success/20'}`}>
          {isFail ? <ShieldAlert className="text-error" size={24} /> : <ShieldCheck className="text-success" size={24} />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">7. Security Scan</h2>
          <p className="text-textSecondary text-sm">Scanning the Docker Image for CVEs using Trivy.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl p-6 flex flex-col relative overflow-hidden">
           <h4 className="font-bold text-white text-sm mb-4">Trivy Scan Results: <code>app:latest</code></h4>
           
           <div className="space-y-3">
             <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-surface border border-white/5 rounded-lg p-3 flex justify-between items-center">
               <span className="text-sm text-textSecondary">OS Packages (Alpine 3.18)</span>
               <span className="text-success text-xs font-bold bg-success/20 px-2 py-1 rounded">0 Critical</span>
             </motion.div>
             <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="bg-surface border border-white/5 rounded-lg p-3 flex justify-between items-center">
               <span className="text-sm text-textSecondary">Node.js Core</span>
               <span className="text-success text-xs font-bold bg-success/20 px-2 py-1 rounded">0 Critical</span>
             </motion.div>
             <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-surface border border-white/5 rounded-lg p-3 flex justify-between items-center">
               <span className="text-sm text-textSecondary">npm dependencies</span>
               {isFail ? (
                 <span className="text-error text-xs font-bold bg-error/20 px-2 py-1 rounded animate-pulse flex items-center gap-1"><Bug size={12}/> 1 Critical</span>
               ) : (
                 <span className="text-success text-xs font-bold bg-success/20 px-2 py-1 rounded">0 Critical</span>
               )}
             </motion.div>
           </div>
        </div>

        {isFail ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-error/10 border border-error/20 rounded-xl p-6 flex flex-col">
            <h3 className="font-bold text-error mb-4 flex items-center gap-2"><AlertTriangle size={18}/> CVE-2023-4512 Detected</h3>
            <p className="text-sm text-error/80 leading-relaxed mb-4">
              Trivy found a Remote Code Execution (RCE) vulnerability in the <code>express</code> dependency (v4.17). 
            </p>
            <div className="bg-[#0a0b0f] p-4 rounded-lg text-xs font-mono text-error/80 whitespace-pre">
[CRITICAL] express 4.17.1<br/>
Fixed Version: 4.18.2<br/>
Link: https://cve.mitre.org/...
            </div>
            <p className="text-sm text-white font-bold mt-4">
              Pipeline Halted. The image will NOT be pushed to Docker Hub.
            </p>
          </motion.div>
        ) : (
          <div className="bg-success/5 border border-success/20 rounded-xl p-6 flex flex-col justify-center">
            <h3 className="font-bold text-white mb-2">Clean Bill of Health</h3>
            <p className="text-sm text-textSecondary leading-relaxed mb-4">
              The image contains no critical or high vulnerabilities. It is safe to deploy to production.
            </p>
            <p className="text-sm text-textSecondary leading-relaxed">
              <strong>Best Practice:</strong> Always configure your CI/CD pipeline to fail if a <code>CRITICAL</code> vulnerability is found. Never deploy known vulnerable code.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
