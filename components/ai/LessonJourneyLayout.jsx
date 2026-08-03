"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";

export default function LessonJourneyLayout({ steps, children }) {
  const [activeStepId, setActiveStepId] = useState(steps[0]?.id || 1);
  const [completedSteps, setCompletedSteps] = useState([]);
  
  // A simple IntersectionObserver to track which step is on screen
  useEffect(() => {
    const observers = [];
    
    steps.forEach((step) => {
      const element = document.getElementById(`step-${step.id}`);
      if (element) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveStepId(step.id);
              if (!completedSteps.includes(step.id)) {
                setCompletedSteps(prev => [...new Set([...prev, step.id])]);
              }
            }
          },
          { rootMargin: "-10% 0px -80% 0px" } // Triggers when element is near the top
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(obs => obs.disconnect());
    };
  }, [steps, completedSteps]);

  const scrollToStep = (id) => {
    const el = document.getElementById(`step-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const progressPercentage = (completedSteps.length / steps.length) * 100;

  return (
    <div className="flex w-full max-w-7xl mx-auto px-4 md:px-8 gap-12 relative">
      
      {/* Sticky Progress Sidebar */}
      <div className="hidden lg:flex w-64 shrink-0 flex-col gap-8 relative">
        <div className="sticky top-28 flex flex-col gap-6 max-h-[80vh] overflow-y-auto no-scrollbar pb-12">
          
          <div className="flex flex-col gap-2">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Journey Progress</span>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-violet-500"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-gray-400 font-bold text-right">{Math.round(progressPercentage)}%</span>
          </div>

          <div className="flex flex-col gap-1 relative border-l-2 border-white/5 ml-3 pl-4">
            {steps.map((step, index) => {
              const isActive = activeStepId === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const isPastActive = index < steps.findIndex(s => s.id === activeStepId);

              return (
                <button
                  key={step.id}
                  onClick={() => scrollToStep(step.id)}
                  className={`text-left py-2 text-sm font-bold transition-all relative flex items-center gap-3 ${
                    isActive ? "text-violet-400 scale-105 origin-left" : 
                    isPastActive ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute -left-[23px] w-4 h-4 rounded-full border-2 bg-[#0a0a0c] flex items-center justify-center transition-colors ${
                    isActive ? "border-violet-500 scale-125" :
                    isCompleted ? "border-emerald-500" : "border-white/10"
                  }`}>
                    {isCompleted && !isActive && <Check size={10} className="text-emerald-500" />}
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />}
                  </div>

                  {step.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col pb-64">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.props.stepId) {
            return (
              <div id={`step-${child.props.stepId}`} className="min-h-[50vh] flex flex-col justify-center py-20 border-b border-white/5 last:border-0 relative">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                >
                  {/* Optional Step Badge */}
                  <div className="absolute top-8 left-0 text-[10px] font-bold text-violet-500/50 uppercase tracking-widest bg-violet-500/10 px-2 py-1 rounded-full">
                    Step {child.props.stepId}
                  </div>
                  {child}
                </motion.div>
              </div>
            );
          }
          return child;
        })}
      </div>

    </div>
  );
}
