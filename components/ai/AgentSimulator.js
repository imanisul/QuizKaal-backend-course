"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Search, CreditCard, ArrowRight, CornerDownRight, XCircle } from "lucide-react";

export default function AgentSimulator() {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // States:
  // 0: Idle
  // 1: Observe (Receive request)
  // 2: Reason 1 (Decide to search flights)
  // 3: Act 1 (Call Search API)
  // 4: Observe 2 (Receive flight prices)
  // 5: Reason 2 (Decide to book cheapest)
  // 6: Act 2 (Call Booking API)
  // 7: Done

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setStage((prev) => (prev < 7 ? prev + 1 : 0));
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const stages = [
    { label: "Observe", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
    { label: "Reason", color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
    { label: "Act", color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  ];

  return (
    <div className="glass-card p-6 border border-warning/20 bg-warning/5 rounded-3xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Agentic Loop Visualizer</h3>
          <p className="text-xs text-textTertiary">Autonomous Observe → Reason → Act loop</p>
        </div>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-1.5 bg-warning/20 text-warning font-bold text-xs rounded-full hover:bg-warning/30 transition"
        >
          {isPlaying ? "Pause Loop" : "Start Agent"}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Left: The loop ring */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center min-h-[300px]">
           <div className="relative w-48 h-48 border-2 border-white/10 rounded-full flex items-center justify-center">
              <Bot size={48} className={stage > 0 && stage < 7 ? "text-warning animate-pulse" : "text-textTertiary"} />
              
              {/* Loop Indicators */}
              <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold border ${stage === 1 || stage === 4 ? stages[0].bg + " " + stages[0].border + " " + stages[0].color : "bg-surface border-white/10 text-textTertiary"}`}>Observe</div>
              
              <div className={`absolute bottom-4 right-[-20px] px-3 py-1 rounded-full text-xs font-bold border ${stage === 2 || stage === 5 ? stages[1].bg + " " + stages[1].border + " " + stages[1].color : "bg-surface border-white/10 text-textTertiary"}`}>Reason</div>
              
              <div className={`absolute bottom-4 left-[-20px] px-3 py-1 rounded-full text-xs font-bold border ${stage === 3 || stage === 6 ? stages[2].bg + " " + stages[2].border + " " + stages[2].color : "bg-surface border-white/10 text-textTertiary"}`}>Act</div>
           </div>
        </div>

        {/* Right: The execution trace */}
        <div className="w-full md:w-2/3 bg-background/80 rounded-2xl border border-white/5 p-6 h-[300px] overflow-y-auto font-mono text-sm">
          <div className="space-y-4">
            
            <div className="opacity-50">
              <span className="text-green-400 font-bold">User:</span> Book me the cheapest flight to Tokyo tomorrow.
            </div>

            {stage >= 1 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-4 border-l-2 border-blue-400/30">
                <span className="text-blue-400 font-bold">[OBSERVE]</span> New user request received. Goal: Book cheapest flight to Tokyo.
              </motion.div>
            )}

            {stage >= 2 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-4 border-l-2 border-purple-400/30">
                <span className="text-purple-400 font-bold">[REASON]</span> I need to find the prices first. I will use the `search_flights` tool for Tokyo for tomorrow's date.
              </motion.div>
            )}

            {stage >= 3 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-4 border-l-2 border-orange-400/30">
                <span className="text-orange-400 font-bold">[ACT]</span> Calling Tool: <span className="bg-white/10 px-1 rounded text-white">search_flights(dest="NRT", date="tomorrow")</span>
              </motion.div>
            )}

            {stage >= 4 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-4 border-l-2 border-blue-400/30">
                <span className="text-blue-400 font-bold">[OBSERVE]</span> Tool Result: JAL ($800), ANA ($850), Zipair ($400).
              </motion.div>
            )}

            {stage >= 5 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-4 border-l-2 border-purple-400/30">
                <span className="text-purple-400 font-bold">[REASON]</span> Zipair at $400 is the cheapest. I have the user's saved card on file. I will use the `book_flight` tool.
              </motion.div>
            )}

            {stage >= 6 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pl-4 border-l-2 border-orange-400/30">
                <span className="text-orange-400 font-bold">[ACT]</span> Calling Tool: <span className="bg-white/10 px-1 rounded text-white">book_flight(airline="Zipair", price=400)</span>
              </motion.div>
            )}

            {stage >= 7 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 pt-4 border-t border-white/10">
                <span className="text-warning font-bold">Agent:</span> I have successfully booked the cheapest flight (Zipair) to Tokyo for $400!
              </motion.div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
