"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, CheckCircle, XCircle, Clock, Play } from 'lucide-react';

export default function PromisesVisualizer() {
  const [state, setState] = useState('pending'); // pending, resolved, rejected
  const [trigger, setTrigger] = useState(0);

  const simulatePromise = (outcome) => {
    setState('pending');
    setTrigger(t => t + 1); // trigger animation reset
    
    setTimeout(() => {
      setState(outcome);
    }, 2000);
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-[#0d1117] rounded-xl p-6 md:p-10 text-white font-mono flex flex-col relative overflow-hidden border border-white/5">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      <div className="flex justify-between items-center mb-6 relative z-10">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Promises</h3>
          <p className="text-sm text-gray-400">The 3 States of Async Operations</p>
        </div>
      </div>
      
      <div className="flex justify-center gap-4 mb-8 relative z-10">
        <button
          onClick={() => simulatePromise('resolved')}
          disabled={state === 'pending' && trigger > 0}
          className="px-4 py-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Play size={16} /> Resolve Promise
        </button>
        <button
          onClick={() => simulatePromise('rejected')}
          disabled={state === 'pending' && trigger > 0}
          className="px-4 py-2 bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/30 rounded-lg font-bold flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Play size={16} /> Reject Promise
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 w-full gap-10">
        
        {/* The Promise Object */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${state}-${trigger}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`w-64 p-6 rounded-2xl border-2 flex flex-col items-center shadow-2xl transition-colors duration-500 ${
              state === 'pending' ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]' :
              state === 'resolved' ? 'bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.2)]' :
              'bg-rose-500/10 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.2)]'
            }`}
          >
            <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-white/10 w-full text-center pb-2">
              Promise Object
            </div>
            
            {state === 'pending' && (
              <div className="flex flex-col items-center text-amber-400">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                  <Loader size={48} className="mb-4" />
                </motion.div>
                <div className="font-bold text-xl uppercase tracking-widest">Pending...</div>
                <div className="text-sm mt-2 opacity-70">Waiting for data</div>
              </div>
            )}
            
            {state === 'resolved' && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-emerald-400">
                <CheckCircle size={48} className="mb-4" />
                <div className="font-bold text-xl uppercase tracking-widest">Fulfilled</div>
                <div className="text-sm mt-2 font-mono bg-black/40 px-2 py-1 rounded">Value: {`{ data: [...] }`}</div>
              </motion.div>
            )}

            {state === 'rejected' && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center text-rose-400">
                <XCircle size={48} className="mb-4" />
                <div className="font-bold text-xl uppercase tracking-widest">Rejected</div>
                <div className="text-sm mt-2 font-mono bg-black/40 px-2 py-1 rounded">Error: "Network Failed"</div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Callbacks (then / catch) */}
        <div className="flex w-full max-w-lg justify-between gap-4">
          <div className={`flex-1 rounded-xl p-4 border transition-colors duration-500 flex flex-col items-center ${state === 'resolved' ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-black/40 border-white/5 opacity-40'}`}>
            <div className="text-emerald-400 font-bold mb-2">.then(callback)</div>
            {state === 'resolved' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-center text-emerald-300">Executes because Promise succeeded!</motion.div>
            ) : (
              <div className="text-xs text-center text-gray-500">Waiting for Fulfillment...</div>
            )}
          </div>
          
          <div className={`flex-1 rounded-xl p-4 border transition-colors duration-500 flex flex-col items-center ${state === 'rejected' ? 'bg-rose-500/20 border-rose-500/50' : 'bg-black/40 border-white/5 opacity-40'}`}>
            <div className="text-rose-400 font-bold mb-2">.catch(callback)</div>
            {state === 'rejected' ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-center text-rose-300">Executes because Promise failed!</motion.div>
            ) : (
              <div className="text-xs text-center text-gray-500">Waiting for Rejection...</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
