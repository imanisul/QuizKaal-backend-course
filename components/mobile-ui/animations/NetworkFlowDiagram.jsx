'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Server, Database, Send } from 'lucide-react';

export function NetworkFlowDiagram() {
  const [step, setStep] = useState(0);

  const startRequest = () => {
    setStep(1);
    setTimeout(() => setStep(2), 1000); // Mobile -> API
    setTimeout(() => setStep(3), 2000); // API -> DB
    setTimeout(() => setStep(4), 3000); // DB -> API
    setTimeout(() => setStep(5), 4000); // API -> Mobile
    setTimeout(() => setStep(0), 5500); // Reset
  };

  return (
    <div className="my-8 p-6 bg-neutral-950 border border-neutral-800 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Server className="w-5 h-5 text-green-400" />
          Mobile Backend Flow
        </h3>
        <button 
          onClick={startRequest}
          disabled={step !== 0}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
        >
          <Send className="w-4 h-4" /> Send Request
        </button>
      </div>

      <div className="relative h-32 flex justify-between items-center px-8">
        {/* Nodes */}
        <div className="flex flex-col items-center gap-2 z-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-colors ${step > 0 ? 'bg-blue-500/20 border-blue-400' : 'bg-neutral-900 border-neutral-700'}`}>
            <Smartphone className={`w-8 h-8 ${step > 0 ? 'text-blue-400' : 'text-neutral-500'}`} />
          </div>
          <span className="text-sm font-bold text-neutral-400">Mobile App</span>
        </div>

        <div className="flex flex-col items-center gap-2 z-10">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors ${step >= 2 && step <= 4 ? 'bg-green-500/20 border-green-400' : 'bg-neutral-900 border-neutral-700'}`}>
            <Server className={`w-8 h-8 ${step >= 2 && step <= 4 ? 'text-green-400' : 'text-neutral-500'}`} />
          </div>
          <span className="text-sm font-bold text-neutral-400">API Server</span>
        </div>

        <div className="flex flex-col items-center gap-2 z-10">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 transition-colors ${step === 3 ? 'bg-orange-500/20 border-orange-400' : 'bg-neutral-900 border-neutral-700'}`}>
            <Database className={`w-8 h-8 ${step === 3 ? 'text-orange-400' : 'text-neutral-500'}`} />
          </div>
          <span className="text-sm font-bold text-neutral-400">Database</span>
        </div>

        {/* Lines */}
        <div className="absolute left-24 right-24 top-8 h-0.5 bg-neutral-800 -z-0"></div>

        {/* Moving Packet */}
        {step > 0 && step < 5 && (
          <motion.div
            className="absolute top-[26px] w-4 h-4 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-20"
            initial={{ left: '12%' }}
            animate={{
              left: step === 1 ? '50%' : step === 2 ? '85%' : step === 3 ? '50%' : '12%',
              backgroundColor: step < 3 ? '#60A5FA' : '#34D399' // Blue for request, Green for response
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        )}
      </div>
      
      <div className="mt-8 text-center text-sm font-mono text-neutral-400 h-6">
        {step === 0 && "Ready for request."}
        {step === 1 && <span className="text-blue-400">Requesting data over HTTPS...</span>}
        {step === 2 && <span className="text-green-400">API validating token & parsing JSON...</span>}
        {step === 3 && <span className="text-orange-400">Executing SQL query...</span>}
        {step === 4 && <span className="text-green-400">Formatting response...</span>}
        {step === 5 && <span className="text-blue-400">UI Updated!</span>}
      </div>
    </div>
  );
}
