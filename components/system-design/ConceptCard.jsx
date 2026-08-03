import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, PlaySquare, Puzzle, Code, Target } from 'lucide-react';

const ICONS = {
  concept: BrainCircuit,
  animation: PlaySquare,
  diagram: Puzzle,
  example: Code,
  quiz: Target,
};

const COLORS = {
  concept: 'text-sysClient bg-sysClient/10 border-sysClient/20',
  animation: 'text-sysCache bg-sysCache/10 border-sysCache/20',
  diagram: 'text-sysLb bg-sysLb/10 border-sysLb/20',
  example: 'text-sysServer bg-sysServer/10 border-sysServer/20',
  quiz: 'text-sysQueue bg-sysQueue/10 border-sysQueue/20',
};

export default function ConceptCard({ type = 'concept', title, children }) {
  const Icon = ICONS[type] || BrainCircuit;
  const colorClass = COLORS[type] || COLORS.concept;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`rounded-2xl border bg-bgCard p-6 my-8 transition-colors`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClass}`}>
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white m-0">{title}</h3>
      </div>
      <div className="text-textSecondary leading-relaxed prose prose-invert max-w-none">
        {children}
      </div>
    </motion.div>
  );
}
