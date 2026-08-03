"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BrainCircuit, Target, CheckCircle2, ShieldQuestion, Play, Award, Zap, Lightbulb, AlertTriangle, Briefcase } from "lucide-react";
import { APTITUDE_LEVELS } from "../../data/levels";
import { useAptitudeGame } from "../../GameEngine";

export default function AptitudeLevelPage() {
  const { id } = useParams();
  const router = useRouter();
  const levelId = parseInt(id, 10);
  const level = APTITUDE_LEVELS.find((l) => l.id === levelId);
  const { playerState, completeLevel, isLoading } = useAptitudeGame();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const [isHintUsed, setIsHintUsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !playerState.unlockedLevels.includes(levelId)) {
      router.push("/playground/aptitude-arena");
    }
  }, [isLoading, playerState, levelId, router]);

  if (isLoading || !level) return <div className="min-h-screen bg-purple-50 text-purple-600 flex justify-center items-center">Loading...</div>;

  const currentQ = level.quizzes[activeQuestion];

  const handleOptionSelect = (opt) => {
    if (showExplanation) return; // Prevent changing answer after reveal
    setSelectedOption(opt);
    setShowExplanation(true);
    
    if (opt === currentQ.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (activeQuestion < level.quizzes.length - 1) {
      setActiveQuestion(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
      setIsHintUsed(false);
    } else {
      setLevelComplete(true);
      completeLevel(levelId);
    }
  };

  return (
    <div className={`min-h-screen ${level.isBoss ? 'bg-red-50 text-gray-900 selection:bg-red-200' : 'bg-purple-50 text-gray-900 selection:bg-purple-200'}`}>
      
      {/* Top Nav */}
      <div className={`sticky top-0 z-50 p-4 flex items-center justify-between backdrop-blur-md bg-white/70 border-b shadow-sm ${level.isBoss ? 'border-red-100' : 'border-purple-100'}`}>
        <Link href="/playground/aptitude-arena" className={`flex items-center gap-2 font-bold transition-colors px-3 py-1.5 rounded-xl ${level.isBoss ? 'text-red-600 hover:text-red-700 bg-red-50' : 'text-purple-600 hover:text-purple-700 bg-purple-50'}`}>
          <ArrowLeft size={20} /> Back to Arena
        </Link>
        <div className="flex items-center gap-4 font-black">
          <span className="text-gray-500 uppercase tracking-widest text-xs">Level {level.id}</span>
          <span className="text-gray-900">{level.title}</span>
        </div>
        <div className="w-24 text-right">
           <div className={`text-sm font-bold px-3 py-1 rounded-full ${level.isBoss ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'}`}>
             {activeQuestion + 1} / {level.quizzes.length}
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12 flex flex-col gap-8">
        
        {/* Intro Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl relative overflow-hidden">
          <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full mix-blend-multiply ${level.isBoss ? 'bg-red-100/50' : 'bg-purple-100/50'}`} />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Target className={level.isBoss ? 'text-red-600' : 'text-purple-600'} size={24} />
            <h1 className="text-2xl font-black text-gray-900">{level.tagline}</h1>
          </div>
          <p className="text-gray-600 text-lg relative z-10">{level.story}</p>
        </motion.div>

        {/* The Game Area */}
        {!levelComplete ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">{currentQ.question}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((opt, i) => {
                const isSelected = selectedOption === opt;
                const isCorrect = opt === currentQ.correctAnswer;
                
                let btnStyle = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300";
                
                if (showExplanation) {
                  if (isCorrect) btnStyle = "bg-green-100 border-green-400 text-green-800 font-bold shadow-[0_0_15px_rgba(34,197,94,0.3)]";
                  else if (isSelected && !isCorrect) btnStyle = "bg-red-100 border-red-400 text-red-800";
                  else btnStyle = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
                }

                return (
                  <button 
                    key={i}
                    disabled={showExplanation}
                    onClick={() => handleOptionSelect(opt)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <AnimatePresence>
              {!showExplanation && currentQ.shortcut && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="mt-6 flex flex-col items-center"
                >
                  {!isHintUsed ? (
                    <button 
                      onClick={() => setIsHintUsed(true)}
                      className="flex items-center gap-2 text-sm font-bold text-yellow-600 bg-yellow-50 hover:bg-yellow-100 border border-yellow-200 px-4 py-2 rounded-full transition-colors shadow-sm"
                    >
                      <Lightbulb size={16} /> Need a Hint? Use Shortcut
                    </button>
                  ) : (
                    <motion.div 
                      initial={{ scale: 0.95, opacity: 0 }} 
                      animate={{ scale: 1, opacity: 1 }} 
                      className="w-full bg-yellow-100/50 p-4 rounded-xl border border-yellow-300 text-center"
                    >
                      <h4 className="font-bold text-yellow-800 mb-1 flex items-center justify-center gap-2">
                        <Zap className="w-4 h-4" /> Shortcut Method
                      </h4>
                      <p className="text-yellow-900 font-medium">{currentQ.shortcut}</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  className={`mt-8 p-6 rounded-2xl border ${selectedOption === currentQ.correctAnswer ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                >
                  <div className="flex items-center gap-2 mb-4 font-bold text-lg border-b pb-2 border-black/5">
                    {selectedOption === currentQ.correctAnswer ? (
                      <span className="text-green-700 flex items-center gap-2"><CheckCircle2 /> Correct!</span>
                    ) : (
                      <span className="text-red-700 flex items-center gap-2"><ShieldQuestion /> Incorrect. The correct answer is: {currentQ.correctAnswer}</span>
                    )}
                  </div>
                  
                  <div className="space-y-4 text-sm md:text-base">
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Detailed Solution</h4>
                      <p className="text-gray-700 bg-white/50 p-3 rounded-lg border border-black/5">{currentQ.detailedSolution || currentQ.explanation}</p>
                    </div>

                    {currentQ.shortcut && (
                      <div className="bg-yellow-100/50 p-3 rounded-lg border border-yellow-200">
                        <h4 className="font-bold text-yellow-800 mb-1 flex items-center gap-2"><Zap className="w-4 h-4" /> Shortcut Method</h4>
                        <p className="text-yellow-900">{currentQ.shortcut}</p>
                      </div>
                    )}

                    {currentQ.fastCalculationTrick && (
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h4 className="font-bold text-blue-800 mb-1 flex items-center gap-2"><Lightbulb className="w-4 h-4" /> Mental Math Trick</h4>
                        <p className="text-blue-900">{currentQ.fastCalculationTrick}</p>
                      </div>
                    )}

                    {currentQ.commonMistake && (
                      <div className="bg-red-50/50 p-3 rounded-lg border border-red-200">
                        <h4 className="font-bold text-red-800 mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Common Mistake</h4>
                        <p className="text-red-900">{currentQ.commonMistake}</p>
                      </div>
                    )}

                    {currentQ.interviewTip && (
                      <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
                        <h4 className="font-bold text-indigo-800 mb-1 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Interview Tip</h4>
                        <p className="text-indigo-900">{currentQ.interviewTip}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-end">
                    <button onClick={handleNext} className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold transition-all hover:scale-105 shadow-lg ${level.isBoss ? 'bg-red-600 hover:bg-red-500 shadow-red-500/30' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/30'}`}>
                      {activeQuestion < level.quizzes.length - 1 ? 'Next Question' : 'Complete Level'} <ArrowLeft className="rotate-180" size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-yellow-200 rounded-3xl p-12 shadow-2xl text-center">
             <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(234,179,8,0.4)]">
               <Award size={48} className="text-yellow-600" />
             </div>
             <h2 className="text-4xl font-black text-gray-900 mb-2">Victory!</h2>
             <p className="text-lg text-gray-600 mb-8">You successfully cleared {level.title}.</p>
             
             <div className="flex justify-center gap-6 mb-8">
               <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 min-w-[120px]">
                 <div className="text-3xl font-black text-yellow-600">+{level.rewardXP}</div>
                 <div className="text-xs uppercase font-bold text-yellow-800 tracking-wider">XP Earned</div>
               </div>
               <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 min-w-[120px]">
                 <div className="text-3xl font-black text-amber-600">{score}/{level.quizzes.length}</div>
                 <div className="text-xs uppercase font-bold text-amber-800 tracking-wider">Score</div>
               </div>
             </div>

             <Link href="/playground/aptitude-arena" className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold transition-all hover:scale-105 shadow-xl ${level.isBoss ? 'bg-red-600 hover:bg-red-500 shadow-red-500/30' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-500/30'}`}>
               Return to Arena <ArrowLeft className="rotate-180" size={20} />
             </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
