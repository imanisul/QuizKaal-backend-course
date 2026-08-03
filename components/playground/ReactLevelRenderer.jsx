'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { useAudio } from '@/context/AudioContext';
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackCodeEditor, 
  SandpackPreview 
} from '@codesandbox/sandpack-react';
import { 
  ArrowLeft, Sparkles, Check, Bird, Map, Feather, Zap, 
  PartyPopper, Rainbow, CloudLightning, Castle, BookOpen, 
  Lightbulb, AlertTriangle, MessageCircleQuestion, ChevronDown, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

const ICONS = {
  Bird, Map, Feather, Zap, PartyPopper, Rainbow, CloudLightning, Castle
};

export default function ReactLevelRenderer({ levelData }) {
  const { addReward, markLevelComplete } = usePlayground();
  const { playSuccess, playError, playCoin, playClick } = useAudio();
  
  const [showConfetti, setShowConfetti] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [openInterviewIdx, setOpenInterviewIdx] = useState(null);

  // Challenge State
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeError, setCodeError] = useState('');

  // Quiz State
  const [quizAnswered, setQuizAnswered] = useState(null); // 'correct' | 'wrong'

  const MascotIcon = ICONS[levelData.intro.mascotIcon] || Bird;

  const handleValidateCode = (currentCode) => {
    playClick();
    if (levelData.codeChallenge.validatorRegex.test(currentCode)) {
      playSuccess();
      setCodeSuccess(true);
      setCodeError('');
    } else {
      playError();
      setCodeError(levelData.codeChallenge.errorMsg);
    }
  };

  const handleQuizAnswer = (answer) => {
    if (answer === levelData.quiz.correctAnswer) {
      if (!codeSuccess) {
        setCodeError('You must complete the Code Challenge before taking the quiz!');
        playError();
        return;
      }
      playSuccess();
      setQuizAnswered('correct');
      setTimeout(() => {
        setShowRewardModal(true);
        setShowConfetti(true);
        addReward(levelData.rewards.xp, levelData.rewards.coins, levelData.rewards.stars);
        markLevelComplete(`react-${levelData.id}`);
        playCoin();
      }, 1500);
    } else {
      playError();
      setQuizAnswered('wrong');
    }
  };

  return (
    <div className="flex-1 w-full bg-slate-50 text-slate-900 flex flex-col font-ui relative">
      
      {/* Top Bar */}
      <div className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <Link href="/playground/react-islands" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors">
          <ArrowLeft size={16} /> Return to Sky Map
        </Link>
        <div className="font-black text-blue-600 flex items-center gap-2">
          <MascotIcon size={20} /> {levelData.title}
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col relative py-12 px-6 gap-16">
        
        {/* 1. STORY & INTRO */}
        <section className="text-center flex flex-col items-center">
          <motion.div 
            animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="w-32 h-32 bg-blue-100 rounded-[40px] flex items-center justify-center mb-8 shadow-xl border-4 border-white rotate-3"
          >
            <MascotIcon className="w-16 h-16 text-blue-500" />
          </motion.div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
            <BookOpen size={16} /> Mission Briefing
          </div>
          <h1 className="text-5xl font-black mb-6 text-slate-900 tracking-tight">{levelData.intro.title}</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed font-medium">
            {levelData.intro.description}
          </p>
        </section>

        {/* 2. REACT THEORY & BEST PRACTICES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <BookOpen className="text-indigo-600" />
              </div>
              <h2 className="text-2xl font-black">{levelData.theory.title}</h2>
            </div>
            <p className="text-slate-600 leading-relaxed font-medium mb-6">
              {levelData.theory.content}
            </p>
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-emerald-400 shadow-inner whitespace-pre-wrap overflow-x-auto">
              {levelData.theory.codeSnippet}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-emerald-50 p-8 rounded-3xl shadow-sm border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="text-emerald-600" />
                <h3 className="text-xl font-black text-emerald-900">Best Practices</h3>
              </div>
              <ul className="space-y-3">
                {levelData.theory.bestPractices.map((bp, i) => (
                  <li key={i} className="flex gap-3 text-emerald-800 font-medium text-sm">
                    <CheckCircle2 className="shrink-0 w-5 h-5 text-emerald-500" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 p-8 rounded-3xl shadow-sm border border-red-100">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-red-600" />
                <h3 className="text-xl font-black text-red-900">Common Mistakes</h3>
              </div>
              <ul className="space-y-3">
                {levelData.theory.commonMistakes.map((cm, i) => (
                  <li key={i} className="flex gap-3 text-red-800 font-medium text-sm">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-red-200 text-red-600 flex items-center justify-center font-bold text-xs">X</span>
                    <span>{cm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE CODE CHALLENGE (Sandpack) */}
        <section className="bg-slate-900 rounded-[40px] p-2 shadow-2xl relative overflow-hidden">
          {/* Header */}
          <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold mb-3 border border-blue-500/30">
                <Code2 size={14} /> Interactive Challenge
              </div>
              <h2 className="text-3xl font-black text-white mb-2">{levelData.codeChallenge.title}</h2>
              <p className="text-blue-200 font-medium text-lg">Mission: {levelData.codeChallenge.mission}</p>
            </div>
            
            <div className="flex flex-col items-end gap-2">
              {codeError && (
                <div className="p-3 bg-red-900/50 text-red-200 rounded-xl text-sm font-bold border border-red-500/50 animate-pulse">
                  {codeError}
                </div>
              )}
              {codeSuccess && (
                <div className="p-3 bg-emerald-900/50 text-emerald-200 rounded-xl text-sm font-bold border border-emerald-500/50 flex items-center gap-2">
                  <Check size={18} /> Component Executed Perfectly!
                </div>
              )}
            </div>
          </div>

          <div className="h-[500px] relative rounded-b-[38px] overflow-hidden">
            <SandpackProvider 
              template="react"
              theme="dark"
              files={levelData.codeChallenge.files}
            >
              <SandpackLayout className="h-full" style={{ height: '100%' }}>
                <SandpackCodeEditor showTabs={true} style={{ height: '100%' }} />
                <SandpackPreview style={{ height: '100%' }} />
              </SandpackLayout>
              <div className="absolute bottom-4 left-4 z-10">
                <SandpackValidator validator={handleValidateCode} isSuccess={codeSuccess} />
              </div>
            </SandpackProvider>
          </div>
        </section>

        {/* 4. INTERVIEW PREPARATION */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
              <MessageCircleQuestion className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Interview Preparation</h2>
              <p className="text-slate-500 font-medium">Real questions asked in React interviews.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {levelData.theory.interviewQuestions.map((iq, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                <button 
                  onClick={() => setOpenInterviewIdx(openInterviewIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <span className="font-bold text-slate-800 pr-8">{iq.q}</span>
                  <ChevronDown className={`shrink-0 text-slate-400 transition-transform ${openInterviewIdx === idx ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {openInterviewIdx === idx && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 bg-white text-slate-600 font-medium border-t border-slate-100 leading-relaxed">
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
        <section className="bg-blue-600 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden mb-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <h2 className="text-sm font-black text-blue-200 uppercase tracking-widest mb-4">Final Knowledge Check</h2>
          <h3 className="text-3xl font-black mb-10 leading-tight max-w-2xl">
            {levelData.quiz.question}
          </h3>

          <div className="grid grid-cols-1 gap-4 max-w-2xl">
            {levelData.quiz.options.map((ans) => (
              <button
                key={ans}
                onClick={() => handleQuizAnswer(ans)}
                className={`p-6 rounded-2xl text-lg font-bold border-2 transition-all hover:-translate-y-1 shadow-md text-left ${
                  quizAnswered === 'correct' && ans === levelData.quiz.correctAnswer ? 'border-emerald-400 bg-emerald-500 text-white' : 
                  quizAnswered === 'wrong' && ans !== levelData.quiz.correctAnswer ? 'border-red-400 bg-red-500 text-white' :
                  'border-blue-400/30 bg-blue-700/50 hover:bg-blue-500'
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
            className="fixed inset-0 z-[100] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {showConfetti && <Confetti recycle={false} numberOfPieces={800} gravity={0.15} colors={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']} />}
            
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }}
              className="bg-white rounded-3xl p-12 max-w-2xl w-full text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-400 to-indigo-600" />
              
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-blue-500" />
              </div>

              <h1 className="text-4xl font-black text-slate-900 mb-4">Level Complete!</h1>
              <p className="text-lg text-slate-600 font-medium mb-10">You have mastered the concepts and passed the interview check!</p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-10">
                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100 flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                  <div className="text-blue-500 font-black text-lg mb-1">XP</div>
                  <div className="text-3xl font-black text-slate-900">+{levelData.rewards.xp}</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100 flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                  <div className="text-amber-500 font-black text-lg mb-1">Coins</div>
                  <div className="text-3xl font-black text-slate-900">+{levelData.rewards.coins}</div>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100 flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                  <div className="text-purple-500 font-black text-lg mb-1">Stars</div>
                  <div className="text-3xl font-black text-slate-900">+{levelData.rewards.stars}</div>
                </div>
              </div>

              <Link href="/playground/react-islands" className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-black text-lg rounded-full hover:bg-blue-700 active:scale-95 transition-all shadow-lg">
                <Map size={20} /> Return to Map
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

import { useSandpack } from '@codesandbox/sandpack-react';
import { Code2 } from 'lucide-react';

function SandpackValidator({ validator, isSuccess }) {
  const { sandpack } = useSandpack();
  
  const handleCheck = () => {
    const currentCode = sandpack.files[sandpack.activeFile].code;
    validator(currentCode);
  };

  if (isSuccess) {
    return (
      <div className="px-6 py-3 bg-emerald-600 text-white font-black rounded-xl shadow-lg flex items-center gap-2 border-2 border-emerald-400">
        <Check size={18} /> Verified
      </div>
    );
  }

  return (
    <button 
      onClick={handleCheck}
      className="px-6 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-500 active:scale-95 transition-all shadow-lg flex items-center gap-2 border-2 border-blue-400"
    >
      <Code2 size={18} /> Run & Verify Code
    </button>
  );
}
