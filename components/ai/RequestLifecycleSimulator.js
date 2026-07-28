"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Laptop, Globe, Box, ShieldCheck, Server, Layers, Database, 
  Brain, Search, Zap, Link, Activity, Code2, Play, CheckCircle2, AlertCircle
} from "lucide-react";

// Import all 15 step components dynamically (we'll build these next)
import Step1_ReactFrontend from "./steps/Step1_ReactFrontend";
import Step2_HTTPRequest from "./steps/Step2_HTTPRequest";
import Step3_Middleware from "./steps/Step3_Middleware";
import Step4_Validation from "./steps/Step4_Validation";
import Step5_ControllerService from "./steps/Step5_ControllerService";
import Step6_History from "./steps/Step6_History";
import Step7_Embeddings from "./steps/Step7_Embeddings";
import Step8_VectorDB from "./steps/Step8_VectorDB";
import Step9_PromptBuilder from "./steps/Step9_PromptBuilder";
import Step10_LLMAPI from "./steps/Step10_LLMAPI";
import Step11_LLMStreaming from "./steps/Step11_LLMStreaming";
import Step12_BackendProcessing from "./steps/Step12_BackendProcessing";
import Step13_SSE from "./steps/Step13_SSE";
import Step14_FrontendRender from "./steps/Step14_FrontendRender";

const STEPS = [
  { id: 1, title: "React Frontend", desc: "User clicks send", icon: Laptop, color: "text-blue-400", Component: Step1_ReactFrontend },
  { id: 2, title: "HTTP Request", desc: "POST /api/chat", icon: Globe, color: "text-blue-400", Component: Step2_HTTPRequest },
  { id: 3, title: "Router & Middleware", desc: "Auth, Rate Limits", icon: Box, color: "text-purple-400", Component: Step3_Middleware },
  { id: 4, title: "Validation", desc: "Zod / Joi / class-validator", icon: ShieldCheck, color: "text-purple-400", Component: Step4_Validation },
  { id: 5, title: "Controller & Service", desc: "Routing to business logic", icon: Server, color: "text-primary", Component: Step5_ControllerService },
  { id: 6, title: "Conversation History", desc: "Fetch past messages", icon: Database, color: "text-blue-400", Component: Step6_History },
  { id: 7, title: "Embeddings", desc: "String to float array", icon: Layers, color: "text-green-400", Component: Step7_Embeddings },
  { id: 8, title: "Vector DB Search", desc: "Similarity search (pgvector)", icon: Search, color: "text-green-400", Component: Step8_VectorDB },
  { id: 9, title: "Prompt Builder", desc: "System + Context + User", icon: Brain, color: "text-accent", Component: Step9_PromptBuilder },
  { id: 10, title: "LLM API Call", desc: "OpenAI SDK usage", icon: Link, color: "text-red-400", Component: Step10_LLMAPI },
  { id: 11, title: "LLM Thinking", desc: "Predicting next token", icon: Zap, color: "text-red-400", Component: Step11_LLMStreaming },
  { id: 12, title: "Backend Post-Processing", desc: "Moderation, Formatting", icon: Activity, color: "text-primary", Component: Step12_BackendProcessing },
  { id: 13, title: "Streaming (SSE)", desc: "Server-Sent Events", icon: Server, color: "text-purple-400", Component: Step13_SSE },
  { id: 14, title: "Frontend Rendering", desc: "Markdown parsing", icon: Laptop, color: "text-blue-400", Component: Step14_FrontendRender },
];

export default function RequestLifecycleSimulator() {
  const [activeStep, setActiveStep] = useState(1);
  const [framework, setFramework] = useState("express"); // "express" or "nestjs"
  const [scenario, setScenario] = useState("success"); // "success" or "failure"

  const ActiveComponent = STEPS.find(s => s.id === activeStep)?.Component || Step1_ReactFrontend;

  return (
    <div className="flex flex-col xl:flex-row gap-6 mt-12 bg-background border border-white/10 rounded-3xl p-4 lg:p-6 w-full max-w-[1400px] mx-auto min-h-[800px]">
      
      {/* LEFT PANE: The Map / Timeline */}
      <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-4">
        
        {/* Global Controls */}
        <div className="bg-surface border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
           <h4 className="font-bold text-white text-sm">Simulator Settings</h4>
           
           <div className="flex bg-black/40 rounded-lg p-1">
             <button 
               onClick={() => setFramework("express")}
               className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${framework === 'express' ? 'bg-white/10 text-white' : 'text-textTertiary hover:text-textSecondary'}`}
             >
               Express.js
             </button>
             <button 
               onClick={() => setFramework("nestjs")}
               className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors ${framework === 'nestjs' ? 'bg-red-500/20 text-red-400' : 'text-textTertiary hover:text-textSecondary'}`}
             >
               NestJS
             </button>
           </div>

           <div className="flex bg-black/40 rounded-lg p-1">
             <button 
               onClick={() => setScenario("success")}
               className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1 ${scenario === 'success' ? 'bg-success/20 text-success' : 'text-textTertiary hover:text-textSecondary'}`}
             >
               <CheckCircle2 size={12} /> Success
             </button>
             <button 
               onClick={() => setScenario("failure")}
               className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-colors flex items-center justify-center gap-1 ${scenario === 'failure' ? 'bg-error/20 text-error' : 'text-textTertiary hover:text-textSecondary'}`}
             >
               <AlertCircle size={12} /> Failure
             </button>
           </div>
        </div>

        {/* Vertical Timeline */}
        <div className="bg-surface border border-white/10 rounded-2xl p-4 flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
          <div className="flex flex-col relative">
            <div className="absolute left-4 top-4 bottom-4 w-px bg-white/5 z-0" />
            
            {STEPS.map((step, idx) => {
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;
              const Icon = step.icon;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`relative z-10 flex items-start gap-4 p-3 rounded-xl transition-all text-left ${isActive ? 'bg-white/5 border border-white/10' : 'hover:bg-white/[0.02]'}`}
                >
                  <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border transition-colors
                    ${isActive ? `bg-background ${step.color} border-current shadow-[0_0_15px_currentColor]` : isPast ? 'bg-white/5 border-white/10 text-white/40' : 'bg-black/50 border-white/5 text-white/20'}
                  `}>
                    <Icon size={14} />
                  </div>
                  <div>
                    <h5 className={`text-sm font-bold transition-colors ${isActive ? 'text-white' : isPast ? 'text-textSecondary' : 'text-textTertiary'}`}>{step.id}. {step.title}</h5>
                    <p className={`text-[10px] mt-0.5 transition-colors ${isActive ? step.color : 'text-textTertiary'}`}>{step.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT PANE: The Inspector (Active Step Content) */}
      <div className="flex-1 bg-surface border border-white/10 rounded-2xl p-4 lg:p-8 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            <ActiveComponent framework={framework} scenario={scenario} nextStep={() => setActiveStep(Math.min(activeStep + 1, STEPS.length))} />
          </motion.div>
        </AnimatePresence>

        {/* Step Navigation footer */}
        <div className="flex justify-between items-center pt-6 mt-auto border-t border-white/10">
          <button 
            onClick={() => setActiveStep(Math.max(activeStep - 1, 1))}
            disabled={activeStep === 1}
            className="px-4 py-2 bg-white/5 text-textSecondary rounded-lg text-sm font-bold hover:bg-white/10 disabled:opacity-30 transition"
          >
            Previous Step
          </button>
          
          <div className="text-xs text-textTertiary font-mono">
            {activeStep} / {STEPS.length}
          </div>

          <button 
            onClick={() => setActiveStep(Math.min(activeStep + 1, STEPS.length))}
            disabled={activeStep === STEPS.length}
            className="px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-bold hover:bg-primary/30 disabled:opacity-30 transition flex items-center gap-2"
          >
            Next Step <Play size={14} />
          </button>
        </div>
      </div>
      
    </div>
  );
}
