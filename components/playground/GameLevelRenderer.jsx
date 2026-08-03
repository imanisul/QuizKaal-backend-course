'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlayground } from '@/context/PlaygroundContext';
import { useAudio } from '@/context/AudioContext';
import CodeEditorPanel from '@/app/playground/components/CodeEditorPanel';
import { ArrowLeft, Sparkles, Check, ChevronRight, Flame, Route, Bot, Key, Apple, Coins, MousePointerClick, Backpack, Waves, Lock, ScanFace, Bird, Store, Flower2, Lightbulb, PartyPopper } from 'lucide-react';
import Link from 'next/link';
import Confetti from 'react-confetti';

const ICONS = {
  Flame, Route, Bot, Key, Apple, Coins, MousePointerClick, Backpack, Waves, Lock, ScanFace, Bird, Store, Flower2, Lightbulb, PartyPopper
};

export default function GameLevelRenderer({ levelData }) {
  const { addReward, markLevelComplete } = usePlayground();
  const { playSuccess, playError, playCoin, playClick } = useAudio();
  
  const [stage, setStage] = useState('intro');
  const [showConfetti, setShowConfetti] = useState(false);

  // visual game generic state
  const [visualState, setVisualState] = useState(0);

  // code challenge state
  const [sandboxCode, setSandboxCode] = useState(levelData.codeChallenge.initialCode);
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [codeError, setCodeError] = useState('');

  // quiz state
  const [quizAnswered, setQuizAnswered] = useState(null);

  const MascotIcon = ICONS[levelData.intro.mascotIcon] || Flame;

  // --- Handlers ---
  const handleVisualGameComplete = () => {
    playSuccess();
    setTimeout(() => setStage('code_learn'), 1000);
  };

  const handleRunCode = (code) => {
    setCodeError('');
    try {
      if (!levelData.codeChallenge.validatorRegex.test(code)) {
        setCodeError(levelData.codeChallenge.errorMsg);
        playError();
        return;
      }
      playSuccess();
      setCodeSuccess(true);
      setTimeout(() => setStage('quiz'), 2000);
    } catch (e) {
      setCodeError('Oops! Check your spelling.');
      playError();
    }
  };

  const handleQuizAnswer = (answer) => {
    if (answer === levelData.quiz.correctAnswer) {
      playSuccess();
      setQuizAnswered('correct');
      setTimeout(() => {
        setStage('reward');
        setShowConfetti(true);
        addReward(levelData.rewards.xp, levelData.rewards.coins, levelData.rewards.stars);
        markLevelComplete(`js-${levelData.id}`);
        playCoin();
      }, 1500);
    } else {
      playError();
      setQuizAnswered('wrong');
    }
  };

  return (
    <div className="flex-1 w-full bg-[#fbf8f1] text-neutral-800 flex flex-col font-ui relative overflow-hidden">
      {/* Top Bar */}
      <div className="h-16 border-b border-black/5 bg-white/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <Link href="/playground/js-village" className="flex items-center gap-2 text-neutral-500 hover:text-neutral-800 font-bold transition-colors">
          <ArrowLeft size={16} /> Leave Game
        </Link>
        <div className="flex gap-2">
          {['intro', 'visual', 'code_learn', 'code_challenge', 'quiz', 'reward'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full transition-colors ${stage === s ? 'bg-orange-500 scale-125 shadow-md' : 'bg-neutral-300'}`} />
              {i < 5 && <div className="w-4 h-px bg-neutral-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col relative py-8 px-4">
        <AnimatePresence mode="wait">
          
          {/* STAGE 1: INTRO */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex items-center justify-center"
            >
              <div className="max-w-2xl text-center flex flex-col items-center">
                <div className="w-32 h-32 bg-orange-100 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-orange-500/20 border-4 border-white">
                  <MascotIcon className="w-16 h-16 text-orange-500" />
                </div>
                <h1 className="text-5xl font-black mb-6 text-neutral-900 tracking-tight">{levelData.intro.title}</h1>
                <p className="text-xl text-neutral-600 mb-10 leading-relaxed font-medium">
                  {levelData.intro.description}
                </p>
                <button 
                  onClick={() => { playClick(); setStage('visual'); }}
                  className="px-8 py-4 bg-gradient-to-b from-orange-400 to-orange-500 text-white font-black text-xl rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_0_#c2410c] hover:shadow-[0_8px_0_#c2410c] hover:translate-y-1"
                >
                  Start Mission!
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 2: VISUAL GAME */}
          {stage === 'visual' && (
            <motion.div
              key="visual"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col items-center pt-8 justify-center"
            >
              <div className="bg-white p-12 rounded-3xl shadow-xl border border-neutral-100 text-center max-w-lg w-full flex flex-col items-center gap-6">
                <MascotIcon className="w-20 h-20 text-orange-400" />
                <h2 className="text-2xl font-black">Visual Puzzle: {levelData.visualGame.type}</h2>
                <p className="text-neutral-500 font-medium">Click the button below to simulate solving the interactive visual puzzle for this specific game!</p>
                <button 
                  onClick={handleVisualGameComplete}
                  className="px-6 py-3 bg-black text-white font-bold rounded-full hover:scale-105 active:scale-95 transition-transform"
                >
                  Solve Visual Puzzle
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 3: CODE LEARN */}
          {stage === 'code_learn' && (
            <motion.div
              key="code_learn"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, y: -20 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <h2 className="text-3xl font-black mb-8">{levelData.codeLearn.title}</h2>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100 max-w-3xl w-full flex flex-col gap-6">
                <p className="text-lg font-medium text-neutral-600">
                  {levelData.codeLearn.description}
                </p>
                <div className="bg-neutral-900 rounded-xl p-6 font-mono text-xl text-green-400 shadow-inner whitespace-pre-wrap">
                  {levelData.codeLearn.codeSnippet}
                </div>
                <div className="flex gap-4 items-center p-4 bg-orange-50 rounded-xl text-orange-900 font-medium">
                  <MascotIcon className="shrink-0" />
                  <p>{levelData.codeLearn.explanation}</p>
                </div>
                <button 
                  onClick={() => { playClick(); setStage('code_challenge'); }}
                  className="mt-4 py-4 bg-black text-white font-bold rounded-xl flex justify-center items-center gap-2 hover:bg-neutral-800 transition-colors"
                >
                  Write Real Code <ChevronRight />
                </button>
              </div>
            </motion.div>
          )}

          {/* STAGE 4: CODE CHALLENGE */}
          {stage === 'code_challenge' && (
            <motion.div
              key="code_challenge"
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col lg:flex-row gap-8"
            >
              <div className="w-full lg:w-[400px] flex flex-col gap-6 shrink-0">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                    <MascotIcon className="text-orange-500" />
                  </div>
                  <h2 className="text-2xl font-black mb-2">{levelData.codeChallenge.title}</h2>
                  
                  <div className="p-4 bg-blue-50 text-blue-900 rounded-xl font-bold border border-blue-100 mb-6">
                    Mission: {levelData.codeChallenge.mission}
                  </div>

                  {codeError && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-xl font-bold text-sm animate-pulse">
                      {codeError}
                    </div>
                  )}
                  {codeSuccess && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-xl font-bold text-sm flex items-center gap-2">
                      <Check /> Perfect! Code executed.
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 bg-[#1e1e1e] rounded-3xl shadow-2xl border-4 border-neutral-900 overflow-hidden relative">
                <CodeEditorPanel 
                  initialCode={sandboxCode} 
                  onRun={(code) => handleRunCode(code)} 
                  onReset={() => { setSandboxCode(levelData.codeChallenge.initialCode); playClick(); }} 
                />
              </div>
            </motion.div>
          )}

          {/* STAGE 5: KNOWLEDGE CHECK */}
          {stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center"
            >
              <div className="bg-white p-10 rounded-3xl shadow-2xl border border-neutral-100 max-w-2xl w-full text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-rose-500" />
                <h2 className="text-sm font-black text-orange-500 uppercase tracking-widest mb-4">Knowledge Check</h2>
                <h3 className="text-3xl font-black text-neutral-900 mb-10 leading-tight">
                  {levelData.quiz.question}
                </h3>

                <div className="flex flex-col gap-4">
                  {levelData.quiz.options.map((ans) => (
                    <button
                      key={ans}
                      onClick={() => handleQuizAnswer(ans)}
                      className={`p-6 rounded-2xl text-lg font-bold border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
                        quizAnswered === 'correct' && ans === levelData.quiz.correctAnswer ? 'border-green-500 bg-green-50 text-green-700' : 
                        quizAnswered === 'wrong' && ans !== levelData.quiz.correctAnswer ? 'border-red-500 bg-red-50 text-red-700' :
                        'border-neutral-200 bg-white text-neutral-700 hover:border-orange-400'
                      }`}
                    >
                      {ans}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STAGE 6: REWARD */}
          {stage === 'reward' && (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center relative z-10"
            >
              {showConfetti && <Confetti recycle={false} numberOfPieces={500} colors={['#fbbf24', '#38bdf8', '#c084fc', '#4ade80']} />}
              
              <motion.div
                initial={{ y: 50 }} animate={{ y: 0 }}
                className="w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(245,158,11,0.6)] mb-8 border-8 border-white"
              >
                <Sparkles className="w-20 h-20 text-white" />
              </motion.div>

              <h1 className="text-6xl font-black mb-4 tracking-tight">Level Complete!</h1>
              <p className="text-2xl text-neutral-600 font-medium mb-12">You mastered {levelData.title}.</p>

              <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-neutral-100 flex flex-col items-center flex-1 min-w-[120px] max-w-[160px]">
                  <div className="text-blue-500 font-black text-2xl mb-1">XP</div>
                  <div className="text-4xl font-black">+{levelData.rewards.xp}</div>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-neutral-100 flex flex-col items-center flex-1 min-w-[120px] max-w-[160px]">
                  <div className="text-yellow-500 font-black text-2xl mb-1">Coins</div>
                  <div className="text-4xl font-black">+{levelData.rewards.coins}</div>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 }} className="bg-white p-4 md:p-6 rounded-3xl shadow-xl border border-neutral-100 flex flex-col items-center flex-1 min-w-[120px] max-w-[160px]">
                  <div className="text-purple-500 font-black text-2xl mb-1">Stars</div>
                  <div className="text-4xl font-black">+{levelData.rewards.stars}</div>
                </motion.div>
              </div>

              <Link 
                href="/playground/js-village"
                className="px-10 py-5 bg-black text-white font-black text-xl rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Back to Map
              </Link>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
