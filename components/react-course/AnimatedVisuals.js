"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Database, LayoutTemplate, Zap, Repeat } from "lucide-react";

export default function AnimatedVisual({ topicId }) {
  // Common container style
  const container = "w-full h-full relative flex items-center justify-center p-4 bg-bgCard overflow-hidden";

  switch (topicId) {
    case "ch1":
    case "ch2":
      // Virtual DOM Diffing
      return (
        <div className={container}>
          <div className="flex gap-8 items-center">
            {/* Virtual DOM */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-primary">Virtual DOM</span>
              <motion.div 
                className="w-12 h-12 bg-primaryDim border-2 border-primary rounded-lg flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Zap size={20} className="text-primary" />
              </motion.div>
            </div>
            
            <motion.div
              animate={{ x: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <ArrowDown className="text-textSecondary -rotate-90" />
            </motion.div>

            {/* Real DOM */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-bold text-secondary">Real DOM</span>
              <div className="w-12 h-12 bg-secondaryDim border-2 border-secondary rounded-lg flex items-center justify-center">
                <LayoutTemplate size={20} className="text-secondary" />
              </div>
            </div>
          </div>
        </div>
      );

    case "ch4":
      // Components
      return (
        <div className={container}>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-8 bg-primaryDim border border-primary rounded text-[10px] flex items-center justify-center font-bold text-primary">
              {"<App />"}
            </div>
            <div className="flex gap-4">
              <motion.div 
                className="w-16 h-8 bg-secondaryDim border border-secondary rounded text-[10px] flex items-center justify-center font-bold text-secondary"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
              >
                {"<Header />"}
              </motion.div>
              <motion.div 
                className="w-16 h-8 bg-warningDim border border-warning rounded text-[10px] flex items-center justify-center font-bold text-warning"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ repeat: Infinity, repeatType: "reverse", duration: 2, delay: 0.5 }}
              >
                {"<Main />"}
              </motion.div>
            </div>
          </div>
        </div>
      );

    case "ch5":
      // Props Data Flow
      return (
        <div className={container}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-8 bg-primaryDim border border-primary rounded text-[10px] flex items-center justify-center font-bold text-primary">
              Parent
            </div>
            <motion.div
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 20, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="px-2 py-0.5 bg-success rounded-full text-[8px] font-bold text-white shadow-lg"
            >
              props
            </motion.div>
            <div className="w-24 h-8 bg-secondaryDim border border-secondary rounded text-[10px] flex items-center justify-center font-bold text-secondary">
              Child
            </div>
          </div>
        </div>
      );

    case "ch6":
      // State Updates
      return (
        <div className={container}>
          <div className="flex gap-6 items-center">
            <motion.button 
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white"
              whileTap={{ scale: 0.8 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Zap size={14} />
            </motion.button>
            
            <motion.div 
              className="flex items-center gap-2"
              animate={{ x: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Repeat className="text-textSecondary" size={16} />
            </motion.div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-textSecondary mb-1">State</span>
              <motion.div 
                className="w-12 h-12 rounded-xl bg-successDim border border-success flex items-center justify-center font-mono font-bold text-success"
                animate={{ rotateY: [0, 180, 360] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Database size={18} />
              </motion.div>
            </div>
          </div>
        </div>
      );

    case "ch21":
      // Redux / Global State
      return (
        <div className={container}>
          <div className="flex gap-6 items-center">
            {/* Global Store */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-textSecondary mb-1">Redux Store</span>
              <motion.div 
                className="w-16 h-16 rounded-2xl bg-secondaryDim border-2 border-secondary flex items-center justify-center font-bold text-secondary"
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 20px rgba(124,58,237,0.4)", "0px 0px 0px rgba(0,0,0,0)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <Database size={24} />
              </motion.div>
            </div>

            {/* Data Flow Lines */}
            <div className="flex flex-col gap-4 relative">
              <motion.div 
                className="h-0.5 w-16 bg-success"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.div 
                className="h-0.5 w-16 bg-warning"
                initial={{ scaleX: 0, originX: 1 }}
                animate={{ scaleX: 1 }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.75 }}
              />
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold text-white bg-bgCard px-1">Action</span>
            </div>

            {/* Components */}
            <div className="flex flex-col gap-2">
              <div className="w-16 h-6 bg-primaryDim border border-primary rounded text-[10px] flex items-center justify-center font-bold text-primary">
                Comp A
              </div>
              <div className="w-16 h-6 bg-primaryDim border border-primary rounded text-[10px] flex items-center justify-center font-bold text-primary">
                Comp B
              </div>
            </div>
          </div>
        </div>
      );

    default:
      // Default placeholder animation for others
      return (
        <div className={container}>
           <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 15, ease: "linear" }} className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary to-transparent" />
           <span className="relative z-10 text-xs font-mono text-textTertiary">Interactive Flow</span>
        </div>
      );
  }
}
