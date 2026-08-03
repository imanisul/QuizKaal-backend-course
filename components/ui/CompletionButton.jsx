"use client";

/**
 * CompletionButton — Legacy wrapper around CourseProgressTracker.
 * Kept for backward compatibility with AI Prompt Engineering module pages.
 * New pages should import CourseProgressTracker directly.
 */

import CourseProgressTracker from '@/components/lms/CourseProgressTracker';

export default function CompletionButton({ lessonId, courseId = null, nextLessonPath = null }) {
  return (
    <CourseProgressTracker
      lessonId={lessonId}
      courseId={courseId}
      nextLessonPath={nextLessonPath}
      coursePath={courseId ? `/${courseId.replace(/-/g, '-')}` : "/roadmap"}
    />
  );
}
