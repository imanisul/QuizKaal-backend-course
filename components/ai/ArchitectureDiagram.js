"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Server, Database, Brain, Box, LayoutTemplate, Link, Zap, Lock, RefreshCw, MessageSquare } from "lucide-react";

// Definitions
const NODE_DATA = [
  { id: "browser", title: "Browser / App", tech: "React / Next.js", desc: "Sends requests, receives SSE streams.", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", glow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]", Icon: User },
  { id: "gateway", title: "API Gateway", tech: "Nginx / Cloudflare", desc: "WAF, Rate Limiting, Load Balancing.", color: "text-purple-400", border: "border-purple-400/30", bg: "bg-purple-400/5", glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]", Icon: LayoutTemplate },
  { id: "backend", title: "Core Backend", tech: "Express.js / NestJS", desc: "Authentication, Validation, Business Logic.", color: "text-primary", border: "border-primary/50", bg: "bg-primary/10", glow: "shadow-[0_0_30px_rgba(79,70,229,0.3)]", Icon: Server, large: true },
  { id: "queue", title: "Message Queue", tech: "BullMQ / Redis", desc: "Decouples slow AI tasks from the web thread.", color: "text-warning", border: "border-warning/30", bg: "bg-warning/5", glow: "shadow-[0_0_20px_rgba(234,179,8,0.15)]", Icon: Box },
  { id: "primarydb", title: "Primary Database", tech: "PostgreSQL / Prisma", desc: "Stores Users, Orders, Sessions.", color: "text-blue-400", border: "border-blue-400/30", bg: "bg-blue-400/5", glow: "shadow-[0_0_20px_rgba(96,165,250,0.15)]", Icon: Database },
  { id: "worker", title: "AI Worker", tech: "LangChain / Python", desc: "Runs Agent Loops, calls Tools, manages Memory.", color: "text-accent", border: "border-accent/50", bg: "bg-accent/10", glow: "shadow-[0_0_30px_rgba(167,139,250,0.3)]", Icon: Brain, large: true },
  { id: "vectordb", title: "Vector Database", tech: "pgvector / Pinecone", desc: "Embedding Storage, Similarity Search.", color: "text-green-400", border: "border-green-400/30", bg: "bg-green-400/5", glow: "shadow-[0_0_20px_rgba(34,197,94,0.15)]", Icon: Database },
  { id: "llm", title: "LLM Provider", tech: "OpenAI / Anthropic", desc: "Text Generation, Function Calling.", color: "text-red-400", border: "border-red-400/30", bg: "bg-red-400/5", glow: "shadow-[0_0_20px_rgba(248,113,113,0.15)]", Icon: Link },
];

const EDGES = [
  { id: "e1", from: "browser", to: "gateway", animated: true },
  { id: "e2", from: "gateway", to: "backend", animated: true },
  { id: "e3", from: "backend", to: "queue", animated: true },
  { id: "e4", from: "backend", to: "primarydb", animated: false },
  { id: "e5", from: "queue", to: "worker", animated: true },
  { id: "e6", from: "worker", to: "vectordb", animated: false },
  { id: "e7", from: "worker", to: "llm", animated: false },
];

export default function ArchitectureDiagram() {
  const containerRef = useRef(null);
  const nodeRefs = useRef({});
  const [positions, setPositions] = useState({});
  const [hoveredNode, setHoveredNode] = useState(null);

  // Update SVG line coordinates based on DOM elements
  const updatePositions = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPos = {};
    
    NODE_DATA.forEach(node => {
      const el = nodeRefs.current[node.id];
      if (el) {
        const rect = el.getBoundingClientRect();
        newPos[node.id] = {
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        };
      }
    });
    setPositions(newPos);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    
    // ResizeObserver catches layout shifts
    const observer = new ResizeObserver(updatePositions);
    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      window.removeEventListener("resize", updatePositions);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="w-full bg-[#050505] rounded-3xl border border-white/10 p-4 md:p-8 lg:p-12 relative">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-black text-white mb-3">Production AI Architecture</h3>
        <p className="text-textSecondary text-sm leading-relaxed">
          Interactive, scalable architecture. The LLM is decoupled from the main thread via a message queue to prevent blocking. Hover over nodes to see connections.
        </p>
      </div>

      <div 
        ref={containerRef} 
        className="relative w-full mx-auto max-w-[1200px]"
      >
        {/* Dynamic SVG Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
          {EDGES.map(edge => {
            const posFrom = positions[edge.from];
            const posTo = positions[edge.to];
            if (!posFrom || !posTo) return null;

            // Generate bezier curve path
            // For vertical-ish flow, curve Y. For horizontal, curve X.
            const isVertical = Math.abs(posTo.y - posFrom.y) > Math.abs(posTo.x - posFrom.x);
            let d = "";
            if (isVertical) {
              const cY = (posFrom.y + posTo.y) / 2;
              d = `M ${posFrom.x} ${posFrom.y} C ${posFrom.x} ${cY}, ${posTo.x} ${cY}, ${posTo.x} ${posTo.y}`;
            } else {
              const cX = (posFrom.x + posTo.x) / 2;
              d = `M ${posFrom.x} ${posFrom.y} C ${cX} ${posFrom.y}, ${cX} ${posTo.y}, ${posTo.x} ${posTo.y}`;
            }

            // Determine if edge should be highlighted based on hover
            const isHighlighted = hoveredNode === edge.from || hoveredNode === edge.to;
            const isDimmed = hoveredNode && !isHighlighted;

            return (
              <g key={edge.id} className={`transition-opacity duration-300 ${isDimmed ? 'opacity-10' : 'opacity-100'}`}>
                {/* Background line */}
                <path 
                  d={d} 
                  fill="none" 
                  stroke="rgba(255,255,255,0.15)" 
                  strokeWidth="2" 
                  strokeDasharray={edge.animated ? "4 4" : "none"}
                />
                
                {/* Highlight / Active Line */}
                {isHighlighted && (
                  <path 
                    d={d} 
                    fill="none" 
                    stroke="var(--primary)" 
                    strokeWidth="3" 
                  />
                )}

                {/* Animated Data Packet */}
                {edge.animated && (
                  <circle r="3" fill="#60A5FA" className="drop-shadow-[0_0_8px_rgba(96,165,250,1)]">
                    <animateMotion dur="3s" repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Responsive CSS Grid for Nodes */}
        {/* We use flex and grid to naturally layout the components, letting the browser handle responsiveness */}
        <div className="relative z-10 flex flex-col gap-12 lg:gap-16">
          
          {/* Row 1: Entry */}
          <div className="flex justify-center">
             <Node id="browser" data={NODE_DATA[0]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
          </div>

          {/* Row 2: Gateway */}
          <div className="flex justify-center">
             <Node id="gateway" data={NODE_DATA[1]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
          </div>

          {/* Row 3: Core Backend & Primary DB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto w-full">
             <div className="flex justify-center md:justify-end">
               <Node id="backend" data={NODE_DATA[2]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
             </div>
             <div className="flex justify-center md:justify-start">
               <Node id="primarydb" data={NODE_DATA[4]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
             </div>
          </div>

          {/* Row 4: Queue */}
          <div className="flex justify-center">
             <Node id="queue" data={NODE_DATA[3]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
          </div>

          {/* Row 5: AI Subsystem */}
          <div className="flex justify-center">
             <Node id="worker" data={NODE_DATA[5]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
          </div>

          {/* Row 6: AI DB & LLM */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center max-w-2xl mx-auto w-full">
             <div className="flex justify-center sm:justify-end">
               <Node id="vectordb" data={NODE_DATA[6]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
             </div>
             <div className="flex justify-center sm:justify-start">
               <Node id="llm" data={NODE_DATA[7]} refs={nodeRefs} hovered={hoveredNode} setHovered={setHoveredNode} />
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Reusable Node Component
function Node({ id, data, refs, hovered, setHovered }) {
  const isHovered = hovered === id;
  const isDimmed = hovered && hovered !== id && !isConnected(hovered, id);

  return (
    <motion.div 
      ref={(el) => (refs.current[id] = el)}
      onMouseEnter={() => setHovered(id)}
      onMouseLeave={() => setHovered(null)}
      className={`relative flex flex-col items-center bg-surface border backdrop-blur-md rounded-2xl p-4 transition-all duration-300 w-full max-w-[280px]
        ${data.border} ${data.bg} 
        ${isHovered ? `scale-105 ${data.glow} border-opacity-100 z-20 cursor-default` : 'border-opacity-30 hover:border-opacity-60'}
        ${isDimmed ? 'opacity-30' : 'opacity-100'}
      `}
      tabIndex={0}
      aria-label={`${data.title} node`}
    >
      <div className={`mb-3 p-3 rounded-full bg-background border border-white/10 ${data.color} ${isHovered ? data.glow : ''}`}>
        <data.Icon size={data.large ? 32 : 24} strokeWidth={isHovered ? 2.5 : 2} />
      </div>
      
      <h4 className="text-white font-bold text-[15px] mb-1 text-center">{data.title}</h4>
      <div className={`text-[10px] uppercase tracking-wider font-mono font-bold mb-3 text-center ${data.color}`}>
        {data.tech}
      </div>
      
      <p className="text-xs text-textSecondary text-center leading-relaxed">
        {data.desc}
      </p>

      {/* Render extra details on hover for specific nodes (Interactive Tooltips) */}
      <AnimatePresence>
        {isHovered && id === 'worker' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10 w-full flex flex-wrap gap-2 justify-center"
          >
            <Badge icon={RefreshCw} text="LangGraph" color="text-purple-400" bg="bg-purple-400/10" />
            <Badge icon={Zap} text="Tool Calling" color="text-yellow-400" bg="bg-yellow-400/10" />
            <Badge icon={Database} text="Memory" color="text-blue-400" bg="bg-blue-400/10" />
          </motion.div>
        )}
        
        {isHovered && id === 'vectordb' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10 w-full flex flex-col gap-1.5"
          >
            <div className="text-[10px] text-textSecondary flex justify-between"><span>Similarity Search</span> <span className="text-green-400">O(log n)</span></div>
            <div className="text-[10px] text-textSecondary flex justify-between"><span>Top-K Retrieval</span> <span className="text-green-400">Fast</span></div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

// Helper to determine if two nodes are connected
function isConnected(id1, id2) {
  return EDGES.some(edge => 
    (edge.from === id1 && edge.to === id2) || 
    (edge.from === id2 && edge.to === id1)
  );
}

function Badge({ icon: Icon, text, color, bg }) {
  return (
    <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-md border border-white/5 ${color} ${bg}`}>
      <Icon size={10} /> {text}
    </div>
  );
}
