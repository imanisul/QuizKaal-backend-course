'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react';
import { QuestionCard } from './QuestionCard';

export function MockInterviewMode({ questions, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes
  const [isFinished, setIsFinished] = useState(false);
  
  // Shuffle questions on mount and pick top 10
  const [sessionQuestions, setSessionQuestions] = useState([]);

  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    setSessionQuestions(shuffled.slice(0, 10));
  }, [questions]);

  // Timer logic
  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(timer);
  }, [isFinished, timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(c => c + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (sessionQuestions.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-neutral-950/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-950/50">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white">Mock Interview</h2>
            {!isFinished && (
              <span className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${timeLeft < 300 ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-neutral-800 text-neutral-300'}`}>
                <Clock className="w-4 h-4" />
                {formatTime(timeLeft)}
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-neutral-800 rounded-full text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <AnimatePresence mode="wait">
            {!isFinished ? (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto"
              >
                <div className="mb-8 flex items-center justify-between text-sm font-medium text-neutral-500 uppercase tracking-widest">
                  <span>Question {currentIndex + 1} of {sessionQuestions.length}</span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 leading-relaxed">
                  {sessionQuestions[currentIndex].question}
                </h3>

                <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-800/50">
                  <p className="text-neutral-400 italic mb-4">Instructor Note:</p>
                  <p className="text-neutral-300 text-lg leading-relaxed">
                    Take a moment to formulate your answer out loud before checking the solution. In a real interview, communication is just as important as correctness.
                  </p>
                </div>

                <div className="mt-12">
                  <QuestionCard question={sessionQuestions[currentIndex]} />
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center py-20"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Interview Complete!</h3>
                <p className="text-neutral-400 text-lg mb-8 max-w-md">
                  Great job practicing your mobile engineering skills. Review your answers and try again to improve your delivery.
                </p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
                >
                  Return to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        {!isFinished && (
          <div className="p-6 border-t border-neutral-800 bg-neutral-950/50 flex justify-end">
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl transition-colors"
            >
              {currentIndex === sessionQuestions.length - 1 ? 'Finish Interview' : 'Next Question'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
