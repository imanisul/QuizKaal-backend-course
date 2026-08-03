"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, BookOpen, Target, ShieldQuestion, Star, Code2, Users } from "lucide-react";
import { JUNGLE_LEVELS } from "../../data/levels";
import { useJungleGame } from "../../GameEngine";
import dynamic from 'next/dynamic';
const PythonEditor = dynamic(() => import('../../components/PythonEditor'), { ssr: false, loading: () => <div className="h-[400px] bg-slate-900 rounded-2xl flex items-center justify-center text-white/50">Loading Editor...</div> });
import KnowledgeCheck from "../../components/KnowledgeCheck";

export default function JungleLevelPage() {
  const { id } = useParams();
  const router = useRouter();
  const levelId = parseInt(id, 10);
  const level = JUNGLE_LEVELS.find((l) => l.id === levelId);
  const { playerState, completeLevel, isLoading } = useJungleGame();

  const [missionComplete, setMissionComplete] = useState(false);

  useEffect(() => {
    if (!isLoading && !playerState.unlockedLevels.includes(levelId)) {
      router.push("/playground/python-jungle");
    }
  }, [isLoading, playerState, levelId, router]);

  if (isLoading || !level) return <div className="min-h-screen bg-green-50 text-emerald-600 flex justify-center items-center">Loading...</div>;

  const isAlreadyCompleted = playerState.completedLevels.includes(levelId);

  const handleMissionComplete = () => {
    setMissionComplete(true);
    completeLevel(levelId);
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 selection:bg-emerald-200">
      {/* Top Nav */}
      <div className="sticky top-0 z-50 p-4 flex items-center justify-between backdrop-blur-md bg-white/70 border-b border-emerald-100 shadow-sm">
        <Link href="/playground/python-jungle" className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors bg-emerald-50 px-3 py-1.5 rounded-xl">
          <ArrowLeft size={20} /> Back to Jungle
        </Link>
        <div className="flex items-center gap-4 font-black">
          <span className="text-gray-500 uppercase tracking-widest text-xs">Level {level.id}</span>
          <span className="text-gray-900">{level.title}</span>
        </div>
        <div className="w-24 text-right">
          {/* Spacer to balance the back button */}
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 md:p-12 flex flex-col gap-12">
        
        {/* Hero Brief */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-xl shadow-emerald-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/50 blur-[100px] rounded-full mix-blend-multiply" />
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <Target className="text-emerald-600" size={24} />
            <h1 className="text-2xl font-black text-gray-900">Mission Brief</h1>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed relative z-10">{level.story}</p>
        </motion.div>

        {/* Concepts section */}
        {level.concepts && level.concepts.map((concept, idx) => (
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * (idx + 1) }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
              <BookOpen className="text-yellow-500" size={24} />
              <h2 className="text-2xl font-black">{concept.title}</h2>
            </div>
            
            <p className="text-gray-700 text-lg">{concept.description}</p>
            
            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl shadow-sm">
              <div className="text-[10px] font-black uppercase tracking-widest text-yellow-600 mb-2">Real World Analogy</div>
              <p className="text-yellow-900">{concept.analogy}</p>
            </div>

            <div className="bg-gray-900 p-6 rounded-2xl font-mono text-sm border border-gray-800 shadow-lg">
              <pre className="text-emerald-400">{concept.codeSnippet}</pre>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <span className="text-gray-500 text-xs">Output:</span>
                <div className="text-gray-300">{concept.output}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-800 text-sm shadow-sm">
              <Star size={16} className="shrink-0 mt-0.5 text-indigo-500" />
              <span><strong className="text-indigo-900">Pro Tip:</strong> {concept.proTip}</span>
            </div>
          </motion.div>
        ))}

        {/* Code Mission */}
        {level.missionCode && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col gap-6">
            <div className="flex items-center gap-3 border-b border-emerald-100 pb-4">
              <Code2 className="text-emerald-600" size={24} />
              <h2 className="text-2xl font-black">Interactive Playground</h2>
            </div>
            <p className="text-gray-600 text-sm">Write your Python code below and click Run to complete the mission.</p>
            
            <PythonEditor missionCode={level.missionCode} onComplete={handleMissionComplete} />
          </motion.div>
        )}

        {/* Knowledge Check */}
        {level.quizzes && (
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8">
             <KnowledgeCheck questions={level.quizzes} title="Knowledge Check" icon={ShieldQuestion} />
           </motion.div>
        )}

        {/* Interview Questions */}
        {level.interviewQuestions && (
           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-8">
             <KnowledgeCheck questions={level.interviewQuestions} title="Interview Prep" icon={Users} />
           </motion.div>
        )}

        {/* Next Level / Success */}
        {((missionComplete || isAlreadyCompleted) && level.id < 16) && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-12 bg-gradient-to-r from-emerald-100 to-emerald-50 rounded-3xl p-8 text-center border border-emerald-200 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Mission Accomplished!</h2>
            <p className="text-emerald-800 font-bold mb-8">You earned XP and Coins! The next area of the jungle is now unlocked.</p>
            <Link href={`/playground/python-jungle/level/${level.id + 1}`} className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-xl font-black hover:bg-emerald-500 hover:scale-105 transition-all shadow-lg shadow-emerald-500/30">
              Proceed to Level {level.id + 1}
            </Link>
          </motion.div>
        )}

      </div>
    </div>
  );
}
