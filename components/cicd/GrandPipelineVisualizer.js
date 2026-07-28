"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function GrandPipelineVisualizer({ steps, activeStep, isPlaying, scenario }) {
  const containerRef = useRef(null);
  const [nodePositions, setNodePositions] = useState([]);

  // Calculate node positions to draw SVG lines between them
  useEffect(() => {
    const updatePositions = () => {
      if (!containerRef.current) return;
      const nodes = Array.from(containerRef.current.querySelectorAll('.pipeline-node'));
      const positions = nodes.map(node => {
        const rect = node.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        return {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2
        };
      });
      setNodePositions(positions);
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    setTimeout(updatePositions, 500);
    return () => window.removeEventListener('resize', updatePositions);
  }, [steps]);

  // Auto-scroll to active node on mobile
  useEffect(() => {
    if (!containerRef.current) return;
    const scrollContainer = containerRef.current.parentElement;
    const activeNode = containerRef.current.querySelectorAll('.pipeline-node')[activeStep - 1];
    
    if (activeNode && scrollContainer.scrollWidth > scrollContainer.clientWidth) {
      const scrollLeft = activeNode.offsetLeft - scrollContainer.clientWidth / 2 + activeNode.clientWidth / 2;
      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [activeStep]);

  return (
    <div className="w-full bg-black/30 backdrop-blur-md border-b border-white/10 relative overflow-x-auto custom-scrollbar">
      {/* Inner scrolling container */}
      <div 
        className="min-w-max lg:min-w-0 w-full max-w-[1800px] mx-auto px-8 lg:px-16 py-8 relative flex justify-between items-center"
        ref={containerRef}
      >
        
        {/* SVG Connector Lines & Moving Packets */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {nodePositions.map((pos, i) => {
            if (i === nodePositions.length - 1) return null;
            const nextPos = nodePositions[i + 1];
            const isActivePath = activeStep > i + 1;
            const isCurrentPath = activeStep === i + 1 && isPlaying;

            return (
              <g key={i}>
                <line 
                  x1={pos.x} y1={pos.y} 
                  x2={nextPos.x} y2={nextPos.y} 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                />
                
                {(isActivePath || isCurrentPath) && (
                  <motion.line 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    x1={pos.x} y1={pos.y} 
                    x2={nextPos.x} y2={nextPos.y} 
                    stroke={steps[i].color.replace('text-', '')}
                    strokeWidth="2"
                    className={steps[i].color}
                    style={{ stroke: 'currentColor' }}
                  />
                )}

                {isCurrentPath && (
                  <circle r="4" fill="currentColor" className={`${steps[i].color} drop-shadow-[0_0_8px_currentColor]`}>
                    <animateMotion 
                      dur="1.5s" 
                      repeatCount="indefinite"
                      path={`M ${pos.x},${pos.y} L ${nextPos.x},${nextPos.y}`}
                    />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        <div className="grid grid-cols-[repeat(11,minmax(64px,1fr))] md:gap-x-2 gap-x-6 relative z-10 w-full min-w-max lg:min-w-0">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isPast = activeStep > step.id;
            
            let isFailed = false;
            if (scenario === "test_fail" && step.id === 4 && activeStep >= 4) isFailed = true;
            if (scenario === "docker_fail" && step.id === 6 && activeStep >= 6) isFailed = true;
            if (scenario === "security_fail" && step.id === 7 && activeStep >= 7) isFailed = true;
            if (scenario === "pod_crash" && step.id === 10 && activeStep >= 10) isFailed = true;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 pipeline-node z-10 shrink-0 w-16 mx-auto">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-background
                  ${isFailed ? 'border-error text-error shadow-[0_0_20px_rgba(244,63,94,0.5)]' :
                    isActive ? `border-${step.bg.split('-')[1]}-500 ${step.color} shadow-[0_0_30px_currentColor] scale-110` : 
                    isPast ? 'border-success/50 text-success' : 'border-white/10 text-white/20'}
                `}>
                  <Icon size={20} />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider text-center transition-colors
                  ${isFailed ? 'text-error' : isActive ? 'text-white' : isPast ? 'text-textSecondary' : 'text-textTertiary'}
                `}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
