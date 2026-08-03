"use client";
import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle, Info } from "lucide-react";

export default function CalloutCard({ type = "info", title, children }) {
  let config = {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    textColor: "text-blue-100",
    titleColor: "text-blue-400",
    icon: Info
  };

  if (type === "tip") {
    config = {
      bg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      textColor: "text-emerald-100/90",
      titleColor: "text-emerald-500",
      icon: Lightbulb
    };
  } else if (type === "warning") {
    config = {
      bg: "bg-rose-500/10",
      border: "border-rose-500/20",
      iconBg: "bg-rose-500/20",
      iconColor: "text-rose-400",
      textColor: "text-rose-100/90",
      titleColor: "text-rose-500",
      icon: AlertTriangle
    };
  }

  const Icon = config.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`w-full ${config.bg} border ${config.border} p-6 rounded-2xl flex flex-col md:flex-row items-start gap-4`}
    >
      <div className={`w-10 h-10 rounded-xl ${config.iconBg} flex items-center justify-center shrink-0 mt-1`}>
        <Icon size={20} className={config.iconColor} />
      </div>
      
      <div className="flex-1">
        <h4 className={`text-xs font-black uppercase tracking-widest ${config.titleColor} mb-2`}>
          {title || (type === "tip" ? "Pro Tip" : type === "warning" ? "Common Mistake" : "Information")}
        </h4>
        <div className={`${config.textColor} text-base leading-relaxed`}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
