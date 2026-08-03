"use client";
import { motion } from "framer-motion";
import { Lightbulb, Info, AlertCircle, BookOpen } from "lucide-react";

export default function ConceptBlock({ type = "default", title, children }) {
  
  // Configuration based on block type
  const config = {
    default: {
      icon: <BookOpen className="text-white" size={20} />,
      bg: "bg-white/[0.02]",
      border: "border-white/5",
      titleColor: "text-white"
    },
    idea: {
      icon: <Lightbulb className="text-yellow-400" size={20} />,
      bg: "bg-yellow-400/5",
      border: "border-yellow-400/20",
      titleColor: "text-yellow-400"
    },
    info: {
      icon: <Info className="text-cyan-400" size={20} />,
      bg: "bg-cyan-400/5",
      border: "border-cyan-400/20",
      titleColor: "text-cyan-400"
    },
    sticky: {
      icon: <AlertCircle className="text-purple-400" size={20} />,
      bg: "bg-purple-500/10",
      border: "border-purple-500/30 border-l-4 border-l-purple-500",
      titleColor: "text-purple-400"
    }
  };

  const style = config[type] || config.default;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`rounded-2xl p-6 sm:p-8 mb-8 backdrop-blur-md ${style.bg} ${style.border} shadow-lg`}
    >
      {title && (
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-black/40 rounded-lg shrink-0">
            {style.icon}
          </div>
          <h3 className={`text-xl font-bold m-0 ${style.titleColor}`}>{title}</h3>
        </div>
      )}
      <div className="text-white/80 leading-relaxed space-y-4">
        {children}
      </div>
    </motion.div>
  );
}
