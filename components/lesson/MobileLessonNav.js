"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, List } from 'lucide-react';
import TableOfContents from './TableOfContents';

export default function MobileLessonNav({ headings, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('curriculum'); // 'curriculum' or 'toc'

  return (
    <>
      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => setIsOpen(true)}
        className="xl:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary/90 transition-transform active:scale-95"
      >
        <Menu size={24} />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="xl:hidden fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-80 h-full bg-bgCard border-l border-borderStrong flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-borderStrong">
                <h2 className="font-bold text-lg text-white tracking-tight">Navigation</h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-textSecondary hover:text-white bg-bgElevated rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-borderStrong px-4 pt-4 gap-4">
                <button 
                  onClick={() => setActiveTab('curriculum')}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'curriculum' ? 'border-primary text-primary' : 'border-transparent text-textSecondary hover:text-white'}`}
                >
                  <BookOpen size={16} /> Curriculum
                </button>
                <button 
                  onClick={() => setActiveTab('toc')}
                  className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'toc' ? 'border-primary text-primary' : 'border-transparent text-textSecondary hover:text-white'}`}
                >
                  <List size={16} /> On This Page
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                {activeTab === 'curriculum' ? (
                  <div onClick={() => setIsOpen(false)}>
                    {children}
                  </div>
                ) : (
                  <div onClick={() => setIsOpen(false)}>
                    <TableOfContents headings={headings} />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
