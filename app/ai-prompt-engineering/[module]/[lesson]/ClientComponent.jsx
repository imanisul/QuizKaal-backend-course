"use client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { AI_COURSE_STRUCTURE } from "@/data/ai/courseStructure";
import AILessonNavigation from "@/components/ai-course/AILessonNavigation";
import CourseLessonLayout from "@/components/ui/CourseLessonLayout";

export default function AILessonPage({ params }) {
  const { module, lesson } = params;

  // Validate module and lesson against structure
  const currentModuleIndex = AI_COURSE_STRUCTURE.findIndex(m => m.slug === module);
  if (currentModuleIndex === -1) return notFound();

  const currentModule = AI_COURSE_STRUCTURE[currentModuleIndex];
  
  const currentLessonIndex = currentModule.lessons.findIndex(l => l.slug === lesson);
  if (currentLessonIndex === -1) return notFound();

  const currentLesson = currentModule.lessons[currentLessonIndex];
  
  // Calculate next lesson
  let actualNext = currentModule.lessons[currentLessonIndex + 1];
  let nextModule = currentModule;
  if (!actualNext) {
    const nextMod = AI_COURSE_STRUCTURE[currentModuleIndex + 1];
    if (nextMod && nextMod.lessons.length > 0) {
      actualNext = nextMod.lessons[0];
      nextModule = nextMod;
    }
  }

  // Calculate prev lesson
  let actualPrev = currentModule.lessons[currentLessonIndex - 1];
  let prevModule = currentModule;
  if (!actualPrev) {
    const prevMod = AI_COURSE_STRUCTURE[currentModuleIndex - 1];
    if (prevMod && prevMod.lessons.length > 0) {
      actualPrev = prevMod.lessons[prevMod.lessons.length - 1];
      prevModule = prevMod;
    }
  }

  const navPrev = actualPrev ? { ...actualPrev, moduleSlug: prevModule.slug, lessonSlug: actualPrev.slug } : null;
  const navNext = actualNext ? { ...actualNext, moduleSlug: nextModule.slug, lessonSlug: actualNext.slug } : null;

  // Compute all lesson IDs for progress tracking
  const allLessonIds = AI_COURSE_STRUCTURE.flatMap(m => 
    m.lessons.map(l => `ai-${m.slug}/${l.slug}`)
  );

  // Dynamically load the JSX content for this specific lesson
  const Content = dynamic(() => import(`@/content/ai-course/${module}/${lesson}.jsx`).catch(() => {
    return function ContentPlaceholder() {
      return (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Lesson Content Coming Soon</h2>
          <p className="text-textSecondary">We are actively building this lesson. Check back later!</p>
        </div>
      );
    };
  }), {
    loading: () => (
      <div className="animate-pulse space-y-4 py-8">
        <div className="h-8 bg-white/10 rounded w-3/4"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
        <div className="h-40 bg-white/10 rounded w-full my-8"></div>
      </div>
    )
  });

  return (
    <CourseLessonLayout 
      lesson={currentLesson}
      courseId="ai-prompt-engineering"
      courseName="AI Prompt Engineering"
      allLessonIds={allLessonIds}
      backLink={`/ai-prompt-engineering#${module}`}
    >
      <Content />

      <AILessonNavigation 
        prev={navPrev}
        next={navNext}
        currentLessonId={`${module}/${lesson}`}
      />
    </CourseLessonLayout>
  );
}
