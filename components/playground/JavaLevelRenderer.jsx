'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { useAudio } from '@/context/AudioContext';
import CodeEditorPanel from '@/app/playground/components/CodeEditorPanel';
import {
  Flame, Layers, Puzzle, BookOpen, Lightbulb, 
  AlertTriangle, MessageCircleQuestion, ChevronDown, CheckCircle2, Play,
  Lock, Shield, Code2, Cpu, Sparkles, ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

const ICONS = {
  Shield, Code2, Cpu, Flame, Layers, Puzzle, Lock, Zap: ZapIcon, Sparkles
};

// Simple proxy for missing icons in lucide-react if any, but Zap is there usually.
import { Zap as ZapIcon } from 'lucide-react';

export default function JavaLevelRenderer({ levelData }) {
  const { addReward, markLevelComplete } = usePlayground();
  const { playSuccess, playError, playCoin, playClick } = useAudio();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [openInterviewIdx, setOpenInterviewIdx] = useState(null);

  // Challenge State
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);

  // Quiz State
  const [quizAnswered, setQuizAnswered] = useState(null);

  const MascotIcon = ICONS[levelData.intro.mascotIcon] || Shield;

  const handleValidateCode = (currentCode) => {
    playClick();
    setIsCompiling(true);
    setTerminalOutput('Compiling Main.java...\nRunning JVM...\n');
    
    // Simulate compilation delay
    setTimeout(() => {
      setIsCompiling(false);
      
      if (levelData.codeChallenge.validatorRegex.test(currentCode)) {
        playSuccess();
        setCodeSuccess(true);
        setCodeError('');
        setTerminalOutput(prev => prev + levelData.codeChallenge.simulatedOutput);
      } else {
        playError();
        setCodeError(levelData.codeChallenge.errorMsg);
        setTerminalOutput(prev => prev + `Exception in thread "main" java.lang.Error: Unresolved compilation problem.\n\n${levelData.codeChallenge.errorMsg}\n\nProcess finished with exit code 1.`);
      }
    }, 800);
  };

  const handleQuizAnswer = (answer) => {
    if (answer === levelData.quiz.correctAnswer) {
      if (!codeSuccess) {
        setCodeError('You must successfully run the Java code before taking the quiz!');
        playError();
        return;
      }
      playSuccess();
      setQuizAnswered('correct');
      setTimeout(() => {
        setShowRewardModal(true);
        setShowConfetti(true);
        addReward(levelData.rewards.xp, levelData.rewards.coins, levelData.rewards.stars);
        markLevelComplete(`java-${levelData.id}`);
        playCoin();
      }, 1500);
    } else {
      playError();
      setQuizAnswered('wrong');
    }
  };

  return (
    <div className="flex-1 w-full bg-[#0a0a0a] text-slate-200 flex flex-col font-ui relative">
      
      {/* Top Bar */}
      <div className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link href="/playground/java-castle" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold transition-colors">
          <ArrowLeft size={16} /> Return to Java Castle
        </Link>
        <div className="font-black text-slate-200 flex items-center gap-2 tracking-widest uppercase">
          <MascotIcon size={18} className="text-red-500" /> {levelData.title}
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col relative py-12 px-6 gap-16">
        
        {/* 1. STORY & INTRO */}
        <section className="text-center flex flex-col items-center">
          <motion.div 
            animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-32 h-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[40px] flex items-center justify-center mb-8 shadow-2xl shadow-red-500/10 border-4 border-slate-700 rotate-3"
          >
            <MascotIcon className="w-16 h-16 text-red-400" />
          </motion.div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-full text-sm font-bold mb-6 border border-slate-700">
            <BookOpen size={16} /> Mission Briefing
          </div>
          <h1 className="text-5xl font-black mb-6 text-white tracking-tight">{levelData.intro.title}</h1>
          <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
            {levelData.intro.description}
          </p>
        </section>

        {/* 2. JAVA THEORY & BEST PRACTICES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-900/50 rounded-xl flex items-center justify-center border border-red-500/30">
                <BookOpen className="text-red-400" />
              </div>
              <h2 className="text-2xl font-black text-white">{levelData.theory.title}</h2>
            </div>
            <p className="text-slate-300 leading-relaxed font-medium mb-6">
              {levelData.theory.content}
            </p>
            <div className="bg-black rounded-xl p-4 font-mono text-sm text-emerald-400 shadow-inner whitespace-pre-wrap overflow-x-auto border border-white/5">
              {levelData.theory.codeSnippet}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-emerald-400" />
                <h3 className="text-xl font-black text-emerald-100">Best Practices</h3>
              </div>
              <ul className="space-y-3">
                {levelData.theory.bestPractices.map((bp, i) => (
                  <li key={i} className="flex gap-3 text-emerald-200/80 font-medium text-sm">
                    <CheckCircle2 className="shrink-0 w-5 h-5 text-emerald-500" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900 p-8 rounded-3xl shadow-xl border border-red-500/20">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-400" />
                <h3 className="text-xl font-black text-red-100">Common Mistakes</h3>
              </div>
              <ul className="space-y-3">
                {levelData.theory.commonMistakes.map((cm, i) => (
                  <li key={i} className="flex gap-3 text-red-200/80 font-medium text-sm">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-red-900/50 text-red-400 flex items-center justify-center font-bold text-xs border border-red-500/30">X</span>
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE JAVA COMPILER */}
        <section className="bg-slate-900 rounded-[40px] shadow-2xl relative overflow-hidden border border-white/10">
          
          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 bg-black/20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-bold mb-3 border border-red-500/30">
                <Code2 size={14} /> Interactive Java Compiler
              </div>
              <h2 className="text-3xl font-black text-white mb-2">{levelData.codeChallenge.title}</h2>
              <p className="text-red-200 font-medium text-lg">Mission: {levelData.codeChallenge.mission}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10 h-[500px]">
            {/* Left: Editor */}
            <div className="flex flex-col relative h-[500px]">
              <div className="h-10 bg-black/40 flex items-center px-4 border-b border-white/5 text-xs font-mono text-slate-400">
                Main.java
              </div>
              <div className="flex-1 overflow-hidden">
                <CodeEditorPanel 
                  initialCode={levelData.codeChallenge.initialCode}
                  language="java"
                  onCodeChange={() => {}}
                  onSubmit={handleValidateCode}
                  className="h-full"
                />
              </div>
            </div>

            {/* Right: Terminal Output */}
            <div className="flex flex-col bg-[#0d0d0d]">
              <div className="h-10 bg-black/60 flex items-center px-4 border-b border-white/5 text-xs font-mono text-slate-400 gap-2">
                <Play size={12} className="text-emerald-500" /> Output Terminal
              </div>
              <div className="flex-1 p-6 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
                {isCompiling ? (
                  <span className="text-slate-400 animate-pulse">Compiling Main.java...</span>
                ) : terminalOutput ? (
                  <span className={codeSuccess ? 'text-emerald-400' : 'text-red-400'}>{terminalOutput}</span>
                ) : (
                  <span className="text-slate-600">Run your code to see output here...</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 4. INTERVIEW PREPARATION */}
        <section className="bg-slate-900 p-10 rounded-3xl shadow-xl border border-white/10">
          <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-6">
            <div className="w-12 h-12 bg-purple-900/50 rounded-2xl flex items-center justify-center border border-purple-500/30">
              <MessageCircleQuestion className="text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">Interview Preparation</h2>
              <p className="text-slate-400 font-medium">Real Java & OOP questions asked in technical interviews.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {levelData.theory.interviewQuestions.map((iq, idx) => (
              <div key={idx} className="border border-white/5 rounded-2xl overflow-hidden transition-all bg-black/20">
                <button 
                  onClick={() => setOpenInterviewIdx(openInterviewIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                >
                  <span className="font-bold text-slate-200 pr-8">{iq.q}</span>
                  <ChevronDown className={`shrink-0 text-slate-500 transition-transform ${openInterviewIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openInterviewIdx === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 bg-black/40 text-slate-400 font-medium border-t border-white/5 leading-relaxed">
                        {iq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>

        {/* 5. KNOWLEDGE CHECK (QUIZ) */}
        <section className="bg-gradient-to-br from-red-900 to-rose-900 p-10 rounded-3xl shadow-2xl text-white relative overflow-hidden mb-20 border border-red-500/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <h2 className="text-sm font-black text-red-300 uppercase tracking-widest mb-4">Final Knowledge Check</h2>
          <h3 className="text-3xl font-black mb-10 leading-tight max-w-2xl">
            {levelData.quiz.question}
          </h3>

          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            {levelData.quiz.options.map((ans) => (
              <button
                key={ans}
                onClick={() => handleQuizAnswer(ans)}
                className={`p-6 rounded-2xl text-lg font-bold border-2 transition-all hover:-translate-y-1 shadow-md text-left ${
                  quizAnswered === 'correct' && ans === levelData.quiz.correctAnswer ? 'border-emerald-400 bg-emerald-500/50 text-white' : 
                  quizAnswered === 'wrong' && ans !== levelData.quiz.correctAnswer ? 'border-red-400 bg-red-500/50 text-white' :
                  'border-white/10 bg-black/20 hover:bg-white/10'
                }`}
              >
                {ans}
              </button>
            ))}
          </div>
        </section>

      </div>

      {/* FINAL CELEBRATION MODAL */}
      <AnimatePresence>
        {showRewardModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            {showConfetti && <Confetti recycle={false} numberOfPieces={800} gravity={0.15} colors={['#ef4444', '#10b981', '#f59e0b', '#8b5cf6']} />}
            
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
              className="bg-slate-900 rounded-3xl p-12 max-w-2xl w-full text-center relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.3)] border border-red-500/30"
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-red-400 to-rose-600" />
              
              <div className="w-24 h-24 mx-auto bg-red-900/50 border border-red-500/50 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.5)]">
                <Sparkles className="w-12 h-12 text-red-400" />
              </div>

              <h1 className="text-4xl font-black text-white mb-4">Level Complete!</h1>
              <p className="text-lg text-slate-400 font-medium mb-10">You have mastered the concepts and passed the Java interview check!</p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
                <div className="bg-black/50 rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                  <div className="text-blue-500 font-black text-lg mb-1">XP</div>
                  <div className="text-3xl font-black text-white">+{levelData.rewards.xp}</div>
                </div>
                <div className="bg-black/50 rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                  <div className="text-amber-500 font-black text-lg mb-1">Coins</div>
                  <div className="text-3xl font-black text-white">+{levelData.rewards.coins}</div>
                </div>
                <div className="bg-black/50 rounded-2xl p-4 md:p-6 border border-white/10 flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                  <div className="text-purple-500 font-black text-lg mb-1">Stars</div>
                  <div className="text-3xl font-black text-white">+{levelData.rewards.stars}</div>
                </div>
              </div>

              <Link href="/playground/java-castle" className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-black text-lg rounded-full hover:bg-red-500 active:scale-95 transition-all shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                <Shield size={20} /> Return to Map
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
