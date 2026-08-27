"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, FileCode2, Cloud, Server, Database, Save, CheckCircle2 } from "lucide-react";
import FlowAnimator from "./FlowAnimator";

const STEPS = [
  {
    title: "1. Infrastructure as Code",
    description: "You define your desired infrastructure (e.g. 3 AWS EC2 instances) in a configuration file (main.tf).",
  },
  {
    title: "2. terraform init",
    description: "Terraform initializes the working directory and downloads the necessary provider plugins (like the AWS provider).",
  },
  {
    title: "3. terraform plan",
    description: "Terraform reads the current state and compares it to your code. It generates an execution plan showing exactly what will be created, modified, or destroyed.",
  },
  {
    title: "4. terraform apply",
    description: "You approve the plan. Terraform begins making API calls to the cloud provider (AWS) to provision the resources.",
  },
  {
    title: "5. Resource Creation",
    description: "The cloud provider physically provisions the 3 requested servers. They come online.",
  },
  {
    title: "6. Update State",
    description: "Terraform writes the new real-world details (like instance IDs and IP addresses) into terraform.tfstate.",
  }
];

export default function TerraformVisualizer() {
  return (
    <FlowAnimator
      title="How Terraform Works"
      description="Watch the Infrastructure as Code provisioning lifecycle."
      steps={STEPS}
      autoPlayInterval={3500}
    >
      {({ currentStep }) => (
        <div className="relative h-[450px] w-full max-w-4xl mx-auto py-6">
          
          <div className="flex justify-between h-full">
            
            {/* Left Side: Workstation */}
            <div className="w-[45%] flex flex-col justify-between h-full relative z-10">
              
              {/* Terminal */}
              <div className={`p-4 border-2 rounded-2xl transition-all duration-500 bg-[#161b22] h-[48%] flex flex-col ${currentStep >= 1 && currentStep <= 3 ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'border-white/10'}`}>
                <div className="flex items-center gap-2 mb-2 text-textTertiary font-mono text-xs border-b border-white/10 pb-2">
                  <Terminal size={14} /> user@laptop:~/infra
                </div>
                <div className="font-mono text-xs text-blue-300 flex-1">
                  {currentStep === 0 && <span className="animate-pulse">_</span>}
                  {currentStep >= 1 && <div><span className="text-emerald-400">$</span> terraform init<br/><span className="text-textSecondary text-[10px]">Initializing provider plugins...</span></div>}
                  {currentStep >= 2 && <div className="mt-2"><span className="text-emerald-400">$</span> terraform plan<br/><span className="text-green-400 text-[10px]">Plan: 3 to add, 0 to change, 0 to destroy.</span></div>}
                  {currentStep >= 3 && <div className="mt-2"><span className="text-emerald-400">$</span> terraform apply<br/><span className="text-textSecondary text-[10px]">aws_instance.web[0]: Creating...</span></div>}
                  {currentStep >= 5 && <div className="mt-2 text-emerald-400 font-bold text-[10px]">Apply complete! Resources: 3 added.</div>}
                </div>
              </div>

              {/* Files */}
              <div className="flex gap-4 h-[45%]">
                <div className={`flex-1 border-2 rounded-2xl p-4 flex flex-col items-center justify-center transition-all bg-[#161b22] ${currentStep === 0 ? 'border-purple-500/50 bg-purple-500/10' : 'border-white/10'}`}>
                  <FileCode2 size={32} className="text-purple-400 mb-2" />
                  <div className="text-xs font-bold text-white mb-2">main.tf</div>
                  <div className="text-[8px] font-mono text-purple-300 text-left bg-black/30 p-2 rounded w-full">
                    resource "aws_instance" "web" &#123;<br/>
                    &nbsp;&nbsp;count = 3<br/>
                    &#125;
                  </div>
                </div>

                <div className={`flex-1 border-2 rounded-2xl p-4 flex flex-col items-center justify-center transition-all bg-[#161b22] ${currentStep === 5 ? 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-white/10'}`}>
                  <Save size={32} className={currentStep >= 5 ? 'text-emerald-400 mb-2' : 'text-textTertiary mb-2'} />
                  <div className="text-xs font-bold text-white mb-2 text-center leading-tight">terraform.tfstate</div>
                  <div className={`text-[8px] font-mono text-left bg-black/30 p-2 rounded w-full transition-all ${currentStep >= 5 ? 'text-emerald-300' : 'text-textSecondary opacity-30'}`}>
                    "version": 4,<br/>
                    "resources": [{currentStep >= 5 ? '3' : '0'}]
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side: AWS Cloud */}
            <div className={`w-[45%] border-2 rounded-2xl transition-all duration-500 flex flex-col p-4 relative z-10 ${currentStep >= 4 ? 'border-orange-500/50 bg-orange-500/5' : 'border-white/10 bg-[#161b22]'}`}>
              <div className="flex items-center gap-2 mb-4 text-orange-400 font-bold border-b border-orange-500/20 pb-2">
                <Cloud size={20} /> AWS Cloud
              </div>
              
              <div className="flex-1 flex flex-col gap-3 justify-center">
                <AnimatePresence>
                  {currentStep >= 4 && [0, 1, 2].map((i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.3 }}
                      className="w-full bg-[#0d1117] border border-orange-500/30 rounded-xl p-3 flex items-center gap-3"
                    >
                      <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400">
                        <Server size={16} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">aws_instance.web[{i}]</div>
                        <div className="text-[10px] text-textTertiary font-mono">Status: <span className="text-emerald-400">running</span></div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {currentStep < 4 && (
                  <div className="w-full h-full border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-textTertiary text-xs">
                    No resources provisioned yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Animated Connectors */}
          <AnimatePresence>
            {currentStep === 3 && (
              <motion.div 
                initial={{ left: "45%", top: "25%", opacity: 1 }}
                animate={{ left: "55%", top: "25%", opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute w-4 h-4 rounded-full bg-blue-400 z-20 flex items-center justify-center text-[10px] font-bold text-black"
              >
                API
              </motion.div>
            )}
            {currentStep === 5 && (
              <motion.div 
                initial={{ left: "55%", top: "75%", opacity: 1 }}
                animate={{ left: "45%", top: "75%", opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute w-4 h-4 rounded-full bg-emerald-400 z-20 flex items-center justify-center"
              >
                <CheckCircle2 size={10} className="text-black" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </FlowAnimator>
  );
}
