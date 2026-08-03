"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function StepByStep({ steps = [] }) {
  if (!steps.length) return null;

  return (
    <div className="my-12 max-w-3xl mx-auto">
      {steps.map((step, idx) => (
        <div key={idx} className="relative flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="w-full bg-[#111113] border border-white/10 rounded-2xl p-6 shadow-xl relative z-10 group hover:border-primary/50 transition-colors"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-primary/20">
                {idx + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-textSecondary leading-relaxed text-sm md:text-base m-0">
                  {step.description}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Render arrow if it's not the last step */}
          {idx < steps.length - 1 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              whileInView={{ opacity: 1, height: "3rem" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex items-center justify-center py-4 text-white/20"
            >
              <ArrowDown size={24} className="animate-bounce text-primary/50" />
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}
