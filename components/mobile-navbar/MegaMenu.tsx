'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MODULES = [
  { id: 'module-0-orientation', title: 'Orientation', desc: 'The big picture and environment setup', lessonCount: 2 },
  { id: 'module-1-fundamentals', title: 'Fundamentals', desc: 'UI, layout, and language primers', lessonCount: 2 },
  { id: 'module-2-navigation', title: 'Navigation', desc: 'Stacks, tabs, and drawers', lessonCount: 0 },
  { id: 'module-3-state', title: 'State Management', desc: 'Data flow and global stores', lessonCount: 0 },
];

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2, type: 'spring', bounce: 0.25 }}
          className="absolute top-16 left-1/2 -translate-x-1/2 w-[600px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 grid grid-cols-2 gap-4 z-50"
          onMouseLeave={onClose}
        >
          {MODULES.map((mod, i) => {
            const isActive = pathname.includes(mod.id);
            // Example completed check (in real app, read from localStorage here or context)
            const isCompleted = false;

            return (
              <Link 
                key={mod.id} 
                href={`/mobile-course/${mod.id}/1-what-is-mobile-engineering`} // hardcoded fallback for demo
                className={`p-4 rounded-xl border transition-all group ${
                  isActive ? 'bg-blue-500/10 border-blue-500/30' : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800'
                }`}
                onClick={onClose}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-neutral-400 group-hover:text-neutral-200'}`} />
                    <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Module {i}</span>
                  </div>
                  {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                </div>
                <h4 className="font-semibold text-neutral-100 group-hover:text-blue-400 transition-colors">{mod.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{mod.desc}</p>
              </Link>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
