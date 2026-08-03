'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { getAdjacentLessons as getAdjacentBackendLessons } from '@/data/roadmap';
import { COURSE_STRUCTURE, flattenCourse } from '@/data/mobile/courseStructure';
import { unlockLesson } from '@/utils/progress';

export default function QuizWidget({ 
  question, 
  options = [], 
  correctAnswerIndex, 
  correctAnswer, 
  answer, 
  explanation,
  whyNot,
  takeaway,
  difficulty = "Medium",
}) {
  const [selected, setSelected] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const pathname = usePathname() || "";
  const router = useRouter();

  const finalCorrectAnswerString = correctAnswer || answer;

  // Robustly parse options
  let parsedOptions = options;
  if (typeof options === 'string') {
    try {
      parsedOptions = JSON.parse(options.replace(/'/g, '"'));
    } catch (e) {
      parsedOptions = options.replace(/^\[/, '').replace(/\]$/, '').split(',').map(s => s.replace(/['"]/g, '').trim());
    }
  }
  const optionsArray = Array.isArray(parsedOptions) ? parsedOptions : [];

  // Determine correct index
  let finalCorrectIdx = -1;
  if (correctAnswerIndex !== undefined && correctAnswerIndex !== null && correctAnswerIndex !== "") {
    finalCorrectIdx = parseInt(correctAnswerIndex, 10);
  } else if (finalCorrectAnswerString !== undefined && finalCorrectAnswerString !== null) {
    const target = String(finalCorrectAnswerString).trim().toLowerCase();
    finalCorrectIdx = optionsArray.findIndex(opt => String(opt).trim().toLowerCase() === target);
  }

  const handleSelect = (idx) => {
    if (!hasSubmitted) {
      setSelected(idx);
    }
  };

  const handleSubmit = () => {
    if (selected !== null) {
      setHasSubmitted(true);
    }
  };

  const handleRetry = () => {
    setSelected(null);
    setHasSubmitted(false);
  };

  const handleNextLesson = async () => {
    let nextSlug = null;
    let nextPath = null;

    if (pathname.includes('/mobile-course/')) {
      const parts = pathname.split('/').filter(Boolean);
      const currentLessonSlug = parts[parts.length - 1];
      const flat = flattenCourse(COURSE_STRUCTURE);
      const idx = flat.findIndex(l => l.lessonSlug === currentLessonSlug);
      if (idx >= 0 && idx < flat.length - 1) {
        nextSlug = flat[idx + 1].lessonSlug;
        nextPath = flat[idx + 1].path;
      }
    } else if (pathname.includes('/lessons/')) {
      const parts = pathname.split('/').filter(Boolean);
      const currentLessonSlug = parts[parts.length - 1];
      const { next } = getAdjacentBackendLessons(currentLessonSlug);
      if (next) {
        nextSlug = next.slug;
        nextPath = `/lessons/${next.slug}`;
      }
    }

    if (nextSlug && nextPath) {
      await unlockLesson(nextSlug);
      router.push(nextPath);
    } else {
      router.push('/roadmap');
    }
  };

  const isCorrectAnswer = selected === finalCorrectIdx;

  return (
    <div className="my-10 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* Header */}
      <div className="bg-blue-500/10 border-b border-blue-500/20 p-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold shadow-inner">
            ?
          </span>
          <h4 className="font-bold text-blue-100 tracking-wide">Knowledge Check</h4>
        </div>
        <span className="text-xs font-semibold text-blue-400/70 uppercase tracking-widest">{difficulty}</span>
      </div>
      
      <div className="p-6 md:p-8">
        <p className="text-lg md:text-xl font-medium text-white mb-8 leading-relaxed">
          {question}
        </p>

        <div className="space-y-4 mb-8">
          {optionsArray.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === finalCorrectIdx;
            
            let bgClass = "bg-neutral-950/50 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-800/50 cursor-pointer";
            if (hasSubmitted) {
              if (isCorrect) bgClass = "bg-green-500/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]";
              else if (isSelected && !isCorrect) bgClass = "bg-red-500/10 border-red-500/50";
              else bgClass = "bg-neutral-950/50 border-neutral-800 opacity-40";
            } else if (isSelected) {
              bgClass = "bg-blue-500/10 border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]";
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={hasSubmitted}
                onClick={(e) => { e.preventDefault(); handleSelect(idx); }}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${bgClass} ${hasSubmitted ? 'cursor-default' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
                    hasSubmitted && isCorrect ? 'border-green-500 text-green-400 bg-green-500/10' :
                    hasSubmitted && isSelected && !isCorrect ? 'border-red-500 text-red-400 bg-red-500/10' :
                    isSelected ? 'border-blue-500 text-blue-400 bg-blue-500/10' :
                    'border-neutral-700 text-neutral-500 group-hover:border-neutral-500 group-hover:text-neutral-400'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className={`text-[15px] leading-snug ${hasSubmitted && isCorrect ? 'text-green-400 font-semibold' : 'text-neutral-300 group-hover:text-white transition-colors'}`}>
                    {opt}
                  </span>
                </div>
                {hasSubmitted && isCorrect && <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />}
                {hasSubmitted && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-red-500 shrink-0" />}
              </button>
            );
          })}
        </div>

        {!hasSubmitted ? (
          <button 
            type="button"
            onClick={(e) => { e.preventDefault(); handleSubmit(); }}
            disabled={selected === null}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 text-white font-bold rounded-xl transition-colors shadow-lg active:scale-[0.98]"
          >
            Check Answer
          </button>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="space-y-4"
          >
            <div className={`p-6 rounded-xl border ${isCorrectAnswer ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-center gap-3 mb-4">
                {isCorrectAnswer ? (
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500" />
                )}
                <h5 className={`text-lg font-bold ${isCorrectAnswer ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrectAnswer ? 'Correct!' : 'Incorrect.'}
                </h5>
              </div>
              
              <div className="space-y-4 text-[15px] text-neutral-300 leading-relaxed">
                  <p>
                    <span className="font-semibold text-neutral-400">Answer: </span>
                    <strong className="text-green-400">
                      {finalCorrectIdx >= 0 ? optionsArray[finalCorrectIdx] : finalCorrectAnswerString}
                    </strong>
                  </p>
                
                {explanation && (
                  <div>
                    <span className="font-bold text-white block mb-1">Explanation:</span>
                    <p className="text-neutral-300">{explanation}</p>
                  </div>
                )}
                
                {whyNot && (
                  <div>
                    <span className="font-bold text-white block mb-1">Why not the others?</span>
                    <p className="text-neutral-400 italic">{whyNot}</p>
                  </div>
                )}

                {takeaway && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <span className="font-bold text-blue-400 block mb-1">Key Takeaway:</span>
                    <p className="text-blue-100">{takeaway}</p>
                  </div>
                )}
              </div>
            </div>

            {isCorrectAnswer ? (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); handleNextLesson(); }}
                className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                Complete Lesson & Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); handleRetry(); }}
                className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
