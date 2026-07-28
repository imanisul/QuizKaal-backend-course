"use client";
import { Server, Cloud, Code2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Step9_Terraform() {
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <Server className="text-purple-500" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">9. Infrastructure as Code (Terraform)</h2>
          <p className="text-textSecondary text-sm">Provisioning the AWS/GCP servers that will run the Docker image.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        
        {/* Terraform Code */}
        <div className="bg-[#0a0b0f] border border-white/10 rounded-xl flex flex-col overflow-hidden relative">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
             <span className="text-xs font-mono text-textSecondary flex items-center gap-2"><Code2 size={14}/> main.tf</span>
          </div>
          <div className="p-4 text-xs font-mono text-textSecondary leading-relaxed whitespace-pre overflow-y-auto">
<span className="text-purple-400">provider</span> <span className="text-green-400">"aws"</span> {"{\n"}
{"  "}region = <span className="text-green-400">"us-east-1"</span>{"\n"}
{"}\n\n"}
<span className="text-purple-400">resource</span> <span className="text-green-400">"aws_eks_cluster"</span> <span className="text-green-400">"quizkaal_cluster"</span> {"{\n"}
{"  "}name     = <span className="text-green-400">"quizkaal-prod"</span>{"\n"}
{"  "}role_arn = aws_iam_role.eks_role.arn{"\n\n"}
{"  "}vpc_config {"{\n"}
{"    "}subnet_ids = [aws_subnet.public_1.id, aws_subnet.public_2.id]{"\n"}
{"  }\n"}
{"}"}
          </div>
          {!deployed && (
            <div className="absolute bottom-4 right-4">
              <button 
                onClick={() => setDeployed(true)}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Play size={14}/> terraform apply
              </button>
            </div>
          )}
        </div>

        {/* Cloud Animation */}
        <div className="bg-surface border border-white/10 rounded-xl p-6 flex flex-col justify-center relative overflow-hidden">
           
           {!deployed ? (
             <div className="flex flex-col items-center justify-center h-full opacity-50">
               <Cloud size={48} className="text-textTertiary mb-4" />
               <p className="text-sm text-textTertiary">AWS Environment Empty.</p>
               <p className="text-xs text-textTertiary mt-1">Run `terraform apply` to provision.</p>
             </div>
           ) : (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4 w-full">
               <h4 className="font-bold text-white text-sm">AWS VPC (us-east-1)</h4>
               
               <div className="w-full border border-purple-500/30 bg-purple-500/5 rounded-xl p-4 flex flex-col gap-4">
                 
                 <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-[#0a0b0f] border border-white/10 p-3 rounded-lg flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                   <span className="text-xs text-white font-mono">VPC & Subnets Created</span>
                 </motion.div>

                 <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }} className="bg-[#0a0b0f] border border-white/10 p-3 rounded-lg flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                   <span className="text-xs text-white font-mono">IAM Roles Assigned</span>
                 </motion.div>

                 <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1 }} className="bg-purple-500/20 border border-purple-500/40 p-3 rounded-lg flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#C084FC]" />
                   <span className="text-xs text-purple-100 font-bold font-mono">EKS Cluster Provisioned</span>
                 </motion.div>

               </div>
               
               <p className="text-[10px] text-textSecondary text-center mt-2">
                 Infrastructure is now treated exactly like application code. It is version controlled, reviewed, and automated.
               </p>
             </motion.div>
           )}

        </div>

      </div>
    </div>
  );
}
