"use client";
import { Star } from "lucide-react";
import KnowledgeCheck from "./KnowledgeCheck";
import InterviewQuestionsAccordion from "./InterviewQuestionsAccordion";
import InteractivePromptComparison from "./InteractivePromptComparison";
import AnimatedObjectives from "./AnimatedObjectives";
import KeywordExplorer from "./KeywordExplorer";
import AnimatedConversation from "./AnimatedConversation";
import PromptBuilderInteractive from "./PromptBuilderInteractive";
import ChallengeCard from "./ChallengeCard";

export default function AILessonTemplate({ data }) {
  return (
    <div className="ai-lesson-template space-y-12 pb-12">
      
      {/* 1. Learning Objectives */}
      {data.objectives && (
        <AnimatedObjectives objectives={data.objectives} />
      )}

      {/* 2. Core Concepts (Now rendered as raw children from the lesson file) */}
      {data.concept && (
        <div className="prose-content">
          {data.concept}
        </div>
      )}

      {/* 3. Keyword Explorer */}
      {data.keywords && (
        <KeywordExplorer keywords={data.keywords} />
      )}

      {/* 4. Visual Diagram & Animation */}
      {(data.diagram || data.animation) && (
        <section className="grid grid-cols-1 gap-6">
          {data.diagram && (
            <div className="bg-black/40 border border-white/10 rounded-3xl p-6 flex justify-center items-center shadow-inner">
              {data.diagram}
            </div>
          )}
          {data.animation && (
             <div className="bg-black/20 rounded-3xl overflow-hidden border border-white/5">
               {data.animation}
             </div>
          )}
        </section>
      )}

      {/* 5. Animated AI Conversation */}
      {data.conversation && (
        <AnimatedConversation 
          badConversation={data.conversation.bad}
          goodConversation={data.conversation.good}
        />
      )}

      {/* 6. Prompt Analysis / Comparison Slider */}
      {data.promptExample && (
        <InteractivePromptComparison 
          bad={data.promptExample.bad}
          better={data.promptExample.better}
          best={data.promptExample.best}
        />
      )}

      {/* 7. Prompt Builder Visual Playground */}
      {data.showPromptBuilder && (
        <PromptBuilderInteractive />
      )}

      {/* 8. Challenge Card */}
      {data.challenge && (
        <ChallengeCard 
          mission={data.challenge.mission}
          xp={data.challenge.xp}
          difficulty={data.challenge.difficulty}
          hint={data.challenge.hint}
        />
      )}

      {/* 9. Knowledge Check Quiz */}
      {data.quiz && (
        <KnowledgeCheck 
          question={data.quiz.question}
          options={data.quiz.options}
          correctAnswerIndex={data.quiz.correctAnswerIndex}
          explanation={data.quiz.explanation}
        />
      )}

      {/* 10. Interview Questions */}
      {data.interviewQuestions && (
        <div className="mt-12">
          <InterviewQuestionsAccordion questions={data.interviewQuestions} />
        </div>
      )}

      {/* 11. Visual Summary */}
      {data.summary && (
        <section className="bg-gradient-to-br from-cyan-900/40 to-purple-900/40 border border-white/10 rounded-3xl p-8 text-center shadow-[0_0_30px_rgba(6,182,212,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />
          <h3 className="text-2xl font-black mb-4 flex justify-center items-center gap-2 m-0 relative z-10 text-white">
            <Star className="text-yellow-400 fill-yellow-400" /> Executive Summary
          </h3>
          <p className="text-white/90 text-lg m-0 max-w-2xl mx-auto relative z-10 font-medium leading-relaxed">{data.summary}</p>
        </section>
      )}

    </div>
  );
}
