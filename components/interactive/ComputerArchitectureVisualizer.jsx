"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, MemoryStick, HardDrive, Keyboard, Monitor, ArrowRight, ArrowLeft } from "lucide-react";
import FlowAnimator from "./FlowAnimator";

const STEPS = [
  {
    title: "1. Input",
    description: "You press a key on the keyboard (e.g., typing 'hello'). The input device sends an electrical signal to the CPU.",
  },
  {
    title: "2. Processing (CPU)",
    description: "The Central Processing Unit (CPU) receives the signal, interprets it, and decides what to do. It's the brain of the computer.",
  },
  {
    title: "3. Memory (RAM)",
    description: "The CPU stores this temporary data ('hello') in the RAM (Random Access Memory) so it can access it instantly while you type.",
  },
  {
    title: "4. Storage (Disk)",
    description: "When you click 'Save', the CPU takes the data from RAM and writes it to permanent storage (SSD/Hard Drive).",
  },
  {
    title: "5. Output",
    description: "The CPU also sends the visual representation of 'hello' to your monitor so you can see what you typed.",
  }
];

export default function ComputerArchitectureVisualizer() {
  return (
    <FlowAnimator
      title="How a Computer Works"
      description="The flow of data through Input, CPU, RAM, Storage, and Output."
      steps={STEPS}
      autoPlayInterval={3000}
    >
      {({ currentStep }) => (
        <div className="relative h-[450px] w-full max-w-4xl mx-auto py-8">
          
          {/* Base Connection Lines */}
          <div className="absolute inset-0 z-0">
            <svg className="w-full h-full text-white/10" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none">
              <path d="M 120 225 L 350 225" /> {/* Input to CPU */}
              <path d="M 450 225 L 750 225" /> {/* CPU to Output */}
              <path d="M 400 120 L 400 170" /> {/* RAM to CPU */}
              <path d="M 400 280 L 400 330" /> {/* CPU to Disk */}
            </svg>
          </div>

          {/* 1. Input Device */}
          <div className={`absolute top-[185px] left-[5%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 0 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep === 0 ? 'border-orange-500 bg-orange-500/20 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Keyboard size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Input Device</div>
          </div>

          {/* 2. CPU */}
          <div className={`absolute top-[185px] left-[50%] -translate-x-1/2 w-40 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 0 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${(currentStep === 1 || currentStep === 4) ? 'border-blue-500 bg-blue-500/20 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Cpu size={36} />
            </div>
            <div className="text-xs font-bold text-white text-center mb-2">CPU</div>
          </div>

          {/* 3. RAM */}
          <div className={`absolute top-[40px] left-[50%] -translate-x-1/2 w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 2 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep === 2 ? 'border-purple-500 bg-purple-500/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <MemoryStick size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Memory (RAM)</div>
          </div>

          {/* 4. Storage */}
          <div className={`absolute top-[330px] left-[50%] -translate-x-1/2 w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 3 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep === 3 ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <HardDrive size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Storage (SSD)</div>
          </div>

          {/* 5. Output Device */}
          <div className={`absolute top-[185px] right-[5%] w-32 flex flex-col items-center transition-all duration-500 z-10 ${currentStep >= 4 ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center mb-2 transition-all ${currentStep === 4 ? 'border-sky-500 bg-sky-500/20 text-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.3)]' : 'border-white/10 bg-[#161b22] text-textTertiary'}`}>
              <Monitor size={28} />
            </div>
            <div className="text-xs font-bold text-white text-center">Output Device</div>
            
            <AnimatePresence>
              {currentStep === 4 && (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute -top-4 -right-4 bg-white text-black text-xs font-black px-2 py-1 rounded shadow-lg">
                  hello
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* -------------------- PACKET ANIMATIONS -------------------- */}
          <AnimatePresence>
            {currentStep === 0 && (
              <motion.div 
                initial={{ left: "15%", top: 225 }} 
                animate={{ left: "42%", top: 225 }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-orange-400 rounded-full z-20 -translate-y-1.5"
              />
            )}
            {currentStep === 2 && (
              <>
                <motion.div 
                  initial={{ left: "50%", top: 170 }} 
                  animate={{ left: "50%", top: 120 }} 
                  transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} 
                  className="absolute w-3 h-3 bg-purple-400 rounded-full z-20 -translate-x-1.5"
                />
              </>
            )}
            {currentStep === 3 && (
              <>
                <motion.div 
                  initial={{ left: "50%", top: 280 }} 
                  animate={{ left: "50%", top: 330 }} 
                  transition={{ duration: 1.2, repeat: Infinity }} 
                  className="absolute w-3 h-3 bg-emerald-400 rounded-full z-20 -translate-x-1.5"
                />
              </>
            )}
            {currentStep === 4 && (
              <motion.div 
                initial={{ left: "58%", top: 225 }} 
                animate={{ left: "85%", top: 225 }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
                className="absolute w-3 h-3 bg-sky-400 rounded-full z-20 -translate-y-1.5"
              />
            )}
          </AnimatePresence>

        </div>
      )}
    </FlowAnimator>
  );
}
