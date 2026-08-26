"use client";

import React from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { devopsCourseData } from "@/data/devopsCourseData";
import ModuleSidebar from "@/components/devops/ModuleSidebar";
import TerminalLab from "@/components/devops/TerminalLab";
import YamlEditor from "@/components/devops/YamlEditor";
import AnimatedFlow from "@/components/devops/AnimatedFlow";
import KnowledgeCheck from "@/components/devops/KnowledgeCheck";
import InterviewQuestion from "@/components/devops/InterviewQuestion";
import ScenarioChallenge from "@/components/devops/ScenarioChallenge";
import CommandBreakdown from "@/components/devops/CommandBreakdown";
import { ChevronLeft, ChevronRight, CheckCircle, ArrowLeft } from "lucide-react";
import CourseProgressBar from "@/components/lesson/CourseProgressBar"; // Reusing existing progress bar if possible

export default function DevOpsLessonPage({ params }) {
  const { moduleSlug, lessonSlug } = params;
  const router = useRouter();

  // Find module and lesson
  const currentModuleIdx = devopsCourseData.modules.findIndex(m => m.slug === moduleSlug);
  const currentModule = devopsCourseData.modules[currentModuleIdx];
  
  if (!currentModule) return notFound();

  const currentLessonIdx = currentModule.lessons.findIndex(l => l.slug === lessonSlug);
  const currentLesson = currentModule.lessons[currentLessonIdx];

  if (!currentLesson) return notFound();

  // Navigation Logic
  let prevLessonUrl = null;
  let nextLessonUrl = null;

  if (currentLessonIdx > 0) {
    prevLessonUrl = `/devops-engineering/learn/${currentModule.slug}/${currentModule.lessons[currentLessonIdx - 1].slug}`;
  } else if (currentModuleIdx > 0) {
    const prevModule = devopsCourseData.modules[currentModuleIdx - 1];
    if (prevModule.lessons.length > 0) {
      prevLessonUrl = `/devops-engineering/learn/${prevModule.slug}/${prevModule.lessons[prevModule.lessons.length - 1].slug}`;
    }
  }

  if (currentLessonIdx < currentModule.lessons.length - 1) {
    nextLessonUrl = `/devops-engineering/learn/${currentModule.slug}/${currentModule.lessons[currentLessonIdx + 1].slug}`;
  } else if (currentModuleIdx < devopsCourseData.modules.length - 1) {
    const nextModule = devopsCourseData.modules[currentModuleIdx + 1];
    if (nextModule.lessons.length > 0) {
      nextLessonUrl = `/devops-engineering/learn/${nextModule.slug}/${nextModule.lessons[0].slug}`;
    }
  }

  // Content Renderer
  const renderContentBlock = (block, idx) => {
    switch (block.type) {
      case "explanation":
        return <p key={idx} className="text-lg text-gray-300 leading-relaxed mb-6">{block.text}</p>;
      case "analogy":
        return (
          <div key={idx} className="my-8 p-6 rounded-xl border border-blue-500/20 bg-blue-500/5 text-blue-100 italic">
            <span className="font-bold text-blue-400 block mb-2 not-italic">Real-World Analogy:</span>
            {block.text}
          </div>
        );
      case "architecture":
        return <AnimatedFlow key={idx} visualization={block.visualization} />;
      case "terminal_lab":
        return <TerminalLab key={idx} task={block.task} expectedCommand={block.expectedCommand} />;
      case "yaml_editor":
        return <YamlEditor key={idx} task={block.task} code={block.code} expected={block.expected} hint={block.hint} />;
      case "knowledge_check":
        return <KnowledgeCheck key={idx} question={block.question} options={block.options} answer={block.answer} explanation={block.explanation} />;
      case "interview":
        return <InterviewQuestion key={idx} question={block.question} hint={block.hint} answer={block.answer} />;
      case "scenario_challenge":
        return <ScenarioChallenge key={idx} scenario={block.scenario} steps={block.steps} />;
      case "command_breakdown":
        return <CommandBreakdown key={idx} command={block.command} parts={block.parts} />;
      default:
        return <div key={idx} className="text-red-500">Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-col lg:flex-row flex-grow max-w-[1600px] mx-auto w-full">
        
        {/* Sidebar Navigation */}
        <aside className="w-full lg:w-[320px] shrink-0 border-r border-white/10 p-6 overflow-y-auto hidden lg:block h-[calc(100vh-80px)] sticky top-20">
          <Link href="/devops-engineering" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Back to Course
          </Link>
          <ModuleSidebar 
            modules={devopsCourseData.modules} 
            currentModuleId={currentModule.id} 
            currentLessonId={currentLesson.id} 
          />
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow max-w-4xl px-6 lg:px-12 py-12 lg:py-20 mx-auto w-full">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            <span>{currentModule.phase}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-12 text-white">
            {currentLesson.title}
          </h1>

          <div className="space-y-2 prose prose-invert max-w-none">
            {currentLesson.content?.map((block, idx) => renderContentBlock(block, idx))}
          </div>

          {/* Bottom Navigation */}
          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevLessonUrl ? (
              <Link 
                href={prevLessonUrl}
                className="w-full sm:w-auto px-6 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-3 text-gray-300 font-bold"
              >
                <ChevronLeft size={20} /> Previous
              </Link>
            ) : <div />}

            {nextLessonUrl ? (
              <Link 
                href={nextLessonUrl}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-black hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 font-bold shadow-lg shadow-primary/20"
              >
                Continue <ChevronRight size={20} />
              </Link>
            ) : (
              <Link 
                href="/devops-engineering"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-colors flex items-center justify-center gap-3 font-bold shadow-lg shadow-emerald-500/20"
              >
                <CheckCircle size={20} /> Complete Course
              </Link>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
