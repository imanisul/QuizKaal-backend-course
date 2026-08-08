"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ArrowRight, CheckCircle, XCircle } from "lucide-react";

const ARRAY_DATA = [1, 2, 3, 4];

export default function ArrayMethodsVisualizer() {
  const [activeMethod, setActiveMethod] = useState("map");
  const [step, setStep] = useState(-1); // -1: Not started, 0...3: Iterating, 4: Done
  const [isPlaying, setIsPlaying] = useState(false);
  const [outputArray, setOutputArray] = useState([]);
  const [accumulator, setAccumulator] = useState(0);

  const methods = {
    map: {
      name: "map()",
      desc: "Transforms every element in the array.",
      code: "array.map(num => num * 2)",
      transform: (num) => num * 2,
    },
    filter: {
      name: "filter()",
      desc: "Keeps only elements that pass the condition.",
      code: "array.filter(num => num > 2)",
      transform: (num) => num > 2,
    },
    reduce: {
      name: "reduce()",
      desc: "Accumulates values into a single result.",
      code: "array.reduce((acc, curr) => acc + curr, 0)",
      transform: (acc, curr) => acc + curr,
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying && step < ARRAY_DATA.length) {
      timer = setTimeout(() => {
        const currentItem = ARRAY_DATA[step === -1 ? 0 : step];
        
        if (activeMethod === "map") {
          setOutputArray(prev => [...prev, currentItem * 2]);
        } else if (activeMethod === "filter") {
          if (currentItem > 2) {
            setOutputArray(prev => [...prev, currentItem]);
          }
        } else if (activeMethod === "reduce") {
          setAccumulator(prev => prev + currentItem);
        }
        
        setStep(s => s + 1);
      }, 1500);
    } else if (isPlaying && step === ARRAY_DATA.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, activeMethod]);

  const handleReset = () => {
    setStep(-1);
    setIsPlaying(false);
    setOutputArray([]);
    setAccumulator(0);
  };

  const handlePlay = () => {
    if (step >= ARRAY_DATA.length) handleReset();
    setIsPlaying(true);
    if (step === -1) setStep(0);
  };

  return (
    <div className="w-full bg-black/40 border border-white/10 rounded-2xl p-6 text-white font-sans overflow-hidden relative shadow-2xl">
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 relative z-10">
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full md:w-auto">
          {Object.keys(methods).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveMethod(key);
                handleReset();
              }}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeMethod === key 
                  ? "bg-yellow-400 text-black shadow-lg" 
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {methods[key].name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePlay}
            disabled={isPlaying}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded-xl hover:bg-yellow-400/20 transition-all font-semibold disabled:opacity-50"
          >
            <Play size={16} className={isPlaying ? "animate-pulse" : ""} />
            {isPlaying ? "Running..." : "Play Animation"}
          </button>
          <button 
            onClick={handleReset}
            className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      <div className="mb-8 relative z-10">
        <h3 className="text-xl font-bold text-white mb-2">{methods[activeMethod].desc}</h3>
        <code className="text-sm font-mono text-yellow-300 bg-yellow-400/10 px-3 py-1.5 rounded-lg border border-yellow-400/20">
          {methods[activeMethod].code}
        </code>
      </div>

      <div className="space-y-12 relative z-10">
        {/* Input Array */}
        <div>
          <p className="text-sm text-white/50 mb-3 font-mono">INPUT ARRAY</p>
          <div className="flex gap-4">
            {ARRAY_DATA.map((num, i) => (
              <motion.div
                key={`in-${i}`}
                initial={false}
                animate={{
                  scale: step === i ? 1.1 : 1,
                  borderColor: step === i ? "#fbbf24" : "rgba(255,255,255,0.1)",
                  backgroundColor: step === i ? "rgba(251, 191, 36, 0.1)" : "rgba(0,0,0,0.5)",
                }}
                className="w-14 h-14 rounded-xl border border-white/10 bg-black/50 flex items-center justify-center text-xl font-bold font-mono shadow-xl relative"
              >
                {num}
                {step === i && (
                  <motion.div 
                    layoutId="activePointer"
                    className="absolute -bottom-6 text-yellow-400"
                  >
                    ↑
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Processing State */}
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {step >= 0 && step < ARRAY_DATA.length && (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="flex items-center gap-4 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 shadow-lg"
              >
                <span className="text-xl font-mono">{ARRAY_DATA[step]}</span>
                <ArrowRight size={18} className="text-yellow-400" />
                
                {activeMethod === "map" && (
                  <span className="text-xl font-mono text-yellow-400">{ARRAY_DATA[step] * 2}</span>
                )}
                
                {activeMethod === "filter" && (
                  <span className="flex items-center gap-2 font-mono">
                    {ARRAY_DATA[step]} &gt; 2 = 
                    {ARRAY_DATA[step] > 2 
                      ? <CheckCircle size={20} className="text-emerald-400 ml-1" />
                      : <XCircle size={20} className="text-rose-400 ml-1" />
                    }
                  </span>
                )}

                {activeMethod === "reduce" && (
                  <span className="font-mono flex items-center gap-2">
                    <span className="text-emerald-400">{accumulator}</span> + {ARRAY_DATA[step]} = <span className="text-yellow-400">{accumulator + ARRAY_DATA[step]}</span>
                  </span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Output Area */}
        <div>
          <p className="text-sm text-white/50 mb-3 font-mono">
            {activeMethod === "reduce" ? "FINAL RESULT (Accumulator)" : "OUTPUT ARRAY"}
          </p>
          <div className="flex gap-4 min-h-[56px] items-center">
            <AnimatePresence>
              {activeMethod !== "reduce" && outputArray.map((num, i) => (
                <motion.div
                  key={`out-${i}-${num}`}
                  initial={{ opacity: 0, scale: 0.5, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  className="w-14 h-14 rounded-xl border border-yellow-400/30 bg-yellow-400/10 flex items-center justify-center text-xl font-bold font-mono text-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                >
                  {num}
                </motion.div>
              ))}
              
              {activeMethod === "reduce" && (
                <motion.div
                  key={`out-reduce-${step}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-8 h-14 rounded-xl border border-yellow-400/30 bg-yellow-400/10 flex items-center justify-center text-xl font-bold font-mono text-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.15)]"
                >
                  {accumulator}
                </motion.div>
              )}
              
              {((activeMethod !== "reduce" && outputArray.length === 0) || 
                (activeMethod === "reduce" && step === -1)) && (
                <div className="text-white/20 font-mono italic">Empty...</div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
