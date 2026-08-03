"use client";
import React from "react";
import { motion } from "framer-motion";
import { Brain, Bot, Lightbulb, Rocket, AlertTriangle, CheckCircle, Target, Briefcase, Ghost, Trophy } from "lucide-react";

/**
 * PremiumVisualCard
 * Designed for the "10 Questions" learning experience framework.
 * Replaces boring bullet points with visually distinct, premium cards.
 */
export default function PremiumVisualCard({ 
  type = "concept", // 'concept', 'mistake', 'recommended', 'best-practice', 'challenge', 'tip', 'engineering', 'kid'
  title, 
  children,
  icon,
  delay = 0 
}) {
  const config = {
    concept: { defaultIcon: Brain, bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-300" },
    model: { defaultIcon: Bot, bg: "bg-indigo-500/10", border: "border-indigo-500/20", text: "text-indigo-300" },
    tip: { defaultIcon: Lightbulb, bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-300" },
    "best-practice": { defaultIcon: Rocket, bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-300" },
    mistake: { defaultIcon: AlertTriangle, bg: "bg-rose-500/10", border: "border-rose-500/20", text: "text-rose-300" },
    recommended: { defaultIcon: CheckCircle, bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-300" },
    challenge: { defaultIcon: Target, bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", text: "text-fuchsia-300" },
    engineering: { defaultIcon: Briefcase, bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-300" },
    kid: { defaultIcon: Ghost, bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-300" },
    interview: { defaultIcon: Trophy, bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-300" }
  };

  const style = config[type] || config.concept;
  const displayIcon = icon || style.defaultIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`relative overflow-hidden rounded-2xl border p-6 flex flex-col gap-3 ${style.bg} ${style.border} group transition-all duration-300 hover:bg-white/[0.05]`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl drop-shadow-md flex items-center justify-center">
          {typeof displayIcon === "function" ? React.createElement(displayIcon, { size: 24 }) : 
           (typeof displayIcon === "string" ? displayIcon : React.createElement(displayIcon, { size: 24 }))}
        </span>
        <h3 className={`font-bold text-lg ${style.text}`}>{title}</h3>
      </div>
      <div className="text-gray-300 leading-relaxed text-[15px]">
        {children}
      </div>
    </motion.div>
  );
}
