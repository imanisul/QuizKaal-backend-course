import Link from "next/link";
import { notFound } from "next/navigation";
import { allLessons, getLessonBySlug, getAdjacentLessons } from "@/data/roadmap";
import Sidebar from "@/components/Sidebar";
import Lesson1Content, { lesson1Toc } from "@/components/lesson1/Lesson1Content";
import RenderIcon from "@/components/ui/IconMap";
import LessonLayout from "@/components/ui/LessonLayout";
import GenericLessonContent from "@/components/lesson/GenericLessonContent";
import ProgressGuard from "@/components/lesson/ProgressGuard";
import CourseNavigation from "@/components/lesson/CourseNavigation";
import { lessonDetails } from "@/data/lessonDetails";

const genericToc = [
  { id: "analogy", label: "Real-world analogy" },
  { id: "interactive-timeline", label: "Interactive Simulation" },
  { id: "code", label: "Implementation" },
  { id: "interview", label: "Interview questions" },
  { id: "summary", label: "Summary" }
];

export function generateStaticParams() {
  return allLessons.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return {};
  return { title: `${lesson.title} — Backend Engineering`, description: lesson.summary };
}

export default function LessonPage({ params }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) notFound();

  const { prev, next } = getAdjacentLessons(params.slug);
  const isBuilt = lesson.slug === "how-the-web-works";

  return (
    <ProgressGuard lessonSlug={lesson.slug}>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-14 max-w-[1120px] mx-auto px-8 relative z-[1]">
      <Sidebar items={isBuilt ? lesson1Toc : genericToc} />
      <main className="min-w-0 pt-16 pb-32">
        <LessonLayout lesson={lesson}>
          {isBuilt ? (
            <Lesson1Content />
          ) : (
            <GenericLessonContent 
              lesson={lesson} 
              details={lessonDetails[lesson.slug] || {}} 
            />
          )}
        </LessonLayout>

        <CourseNavigation prev={prev} next={next} />
      </main>
    </div>
    </ProgressGuard>
  );
}
