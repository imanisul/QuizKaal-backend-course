"use client";
import { Activity, Users, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import PremiumAnalogyCard from "../../ui/PremiumAnalogyCard";

export default function Step11_Production({ playbackSpeed = 1 }) {
  // Generate random traffic dots for the world map visualization
  const trafficDots = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: 10 + Math.random() * 80, // percentage
    y: 20 + Math.random() * 60,
    delay: Math.random() * 2
  }));

  return (
    <div className="flex flex-col h-full w-full">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-4 mb-8"
      >
        <div className="p-4 bg-gradient-to-br from-success/20 to-success/5 rounded-2xl border border-success/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <Activity className="text-success" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-white tracking-tight">11. Live Production</h2>
          <p className="text-textSecondary text-base mt-1">Users are now actively interacting with the new feature you just deployed!</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] xl:gap-12 gap-8 flex-1">
        
        {/* Animated Globe / Traffic Visualizer */}
        <div className="bg-surface/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex items-center justify-center relative overflow-hidden h-[400px] shadow-2xl">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.15)_0%,transparent_70%)] pointer-events-none" />
          
          {/* Simulated Global Map */}
          <div className="relative w-full max-w-[400px] aspect-[2/1] bg-black/40 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center">
            
            {/* World Map SVG placeholder (stylized grid) */}
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain mix-blend-screen" />
            
            <Globe2 size={120} className="text-success/20 animate-[spin_60s_linear_infinite]" />

            {/* Traffic Ping Animations */}
            {trafficDots.map(dot => (
              <motion.div
                key={dot.id}
                className="absolute w-1.5 h-1.5 bg-success rounded-full shadow-[0_0_10px_#22c55e]"
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0] }}
                transition={{ 
                  duration: 2 / playbackSpeed, 
                  repeat: Infinity, 
                  delay: dot.delay / playbackSpeed,
                  ease: "easeOut"
                }}
              />
            ))}

            <div className="absolute bottom-4 right-4 bg-success/10 border border-success/30 text-success text-[10px] font-mono font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.2)]">
              LIVE TRAFFIC: HTTP 200 OK
            </div>
          </div>
        </div>

        {/* Analogy */}
        <div className="flex flex-col h-full justify-center">
          <PremiumAnalogyCard 
            icon={Users}
            title="Production"
            analogyTitle="The Grand Opening"
            description="The code you typed on your laptop just 10 minutes ago has now traversed through tests, compilation, security scans, and infrastructure changes. It is now serving thousands of users across the globe."
            points={[
              { keyword: "CI (Continuous Integration)", text: "Merging code, testing, and building the container (Steps 1-8)." },
              { keyword: "CD (Continuous Deployment)", text: "Automatically putting that container on live servers (Steps 9-11)." }
            ]}
          />
        </div>

      </div>
    </div>
  );
}
