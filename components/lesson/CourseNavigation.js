"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RenderIcon from "@/components/ui/IconMap";
import CourseProgressTracker from "@/components/lms/CourseProgressTracker";
import { Map } from "lucide-react";

const COURSE_PATHS = {
  "backend-engineering": "/roadmap",
  "devops-engineering": "/devops-engineering",
};

export default function CourseNavigation({ prev, next, lessonSlug, courseId = "backend-engineering" }) {
  const coursePath = COURSE_PATHS[courseId] || "/roadmap";

  return (
    <div>
      {/* Mark as Complete / Next Lesson */}
      {lessonSlug && (
        <CourseProgressTracker
          lessonId={lessonSlug}
          courseId={courseId}
          nextLessonPath={next ? `/lessons/${next.slug}` : null}
          nextLessonTitle={next ? next.title : null}
          nextLessonDescription={next ? next.summary : null}
          coursePath={coursePath}
          isLastLesson={!next}
        />
      )}

      {/* Previous / Next Navigation */}
      <div className="flex justify-between gap-4 mt-8 pt-8 border-t border-white/[0.08]">
        {prev ? (
          <Link className="foot-link" href={`/lessons/${prev.slug}`}>
            <div className="text-[11px] text-textTertiary uppercase tracking-wider mb-1.5">← Previous</div>
            <div className="font-bold text-[15px] flex items-center gap-2">
              <RenderIcon iconName={prev.emoji} size={16} className="text-textSecondary" /> {prev.title}
            </div>
          </Link>
        ) : (
          <Link className="foot-link" href={coursePath}>
            <div className="text-[11px] text-textTertiary uppercase tracking-wider mb-1.5">← Back</div>
            <div className="font-bold text-[15px] flex items-center gap-1.5"><Map size={16} className="text-textSecondary" /> Course Home</div>
          </Link>
        )}

        {next && (
          <Link
            className="foot-link text-right"
            href={`/lessons/${next.slug}`}
          >
            <div className="text-[11px] text-primary uppercase tracking-wider mb-1.5 font-bold">Next →</div>
            <div className="font-bold text-[15px] flex items-center justify-end gap-2 text-white">
              {next.title} <RenderIcon iconName={next.emoji} size={16} className="text-primary" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

