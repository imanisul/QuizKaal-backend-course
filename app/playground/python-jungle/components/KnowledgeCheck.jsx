"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, CheckCircle2, Lightbulb } from "lucide-react";

export default function KnowledgeCheck({ questions, title = "Knowledge Check", icon: Icon = HelpCircle }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setTimeout(() => {
      setActiveQuestion((prev) => (prev + 1) % questions.length);
    }, 200);
  };

  if (!questions || questions.length === 0) return null;

  const currentQ = questions[activeQuestion];

  return (
    <div className="w-full bg-white border border-gray-200 rounded-3xl p-6 md:p-8 shadow-xl shadow-gray-200/50">
      <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
          <Icon size={20} />
        </div>
        <h2 className="text-xl font-black text-gray-900">{title}</h2>
        <div className="ml-auto text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          {activeQuestion + 1} / {questions.length}
        </div>
      </div>

      <div className="min-h-[200px] flex flex-col relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeQuestion + (showAnswer ? "-answer" : "-question")}
            initial={{ opacity: 0, rotateX: 90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: -90 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
            style={{ transformOrigin: "center center" }}
          >
            {!showAnswer ? (
              <div className="flex flex-col flex-1 justify-center items-center text-center p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">{currentQ.question}</h3>
                
                {currentQ.options && (
                  <div className="mt-6 w-full max-w-md flex flex-col gap-2">
                    {currentQ.options.map((opt, i) => (
                      <div key={i} className="p-3 bg-white rounded-xl border border-gray-200 text-gray-600 text-sm font-medium shadow-sm">
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col flex-1 p-6 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-1" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 mb-1">Correct Answer</div>
                    <div className="text-lg font-bold text-gray-900">{currentQ.answer}</div>
                  </div>
                </div>
                
                {currentQ.explanation && (
                  <div className="mt-4 pt-4 border-t border-emerald-200 flex items-start gap-3">
                    <Lightbulb className="text-yellow-600 shrink-0 mt-1" />
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-yellow-700 mb-1">Explanation</div>
                      <p className="text-gray-700 text-sm leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-end">
        {!showAnswer ? (
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-xl font-black transition-colors shadow-sm"
          >
            Reveal Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-black transition-colors shadow-lg shadow-emerald-500/20"
          >
            {activeQuestion === questions.length - 1 ? "Start Over" : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}
