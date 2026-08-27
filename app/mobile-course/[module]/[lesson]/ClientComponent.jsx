import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mobileComponents as components } from '@/components/mobile-ui/MobileMdxComponents';
import CourseProgressTracker from '@/components/lms/CourseProgressTracker';
import ProgressGuard from '@/components/lesson/ProgressGuard';
import { COURSE_STRUCTURE, flattenCourse } from '@/data/mobile/courseStructure';

// Helper: look up real titles from COURSE_STRUCTURE instead of parsing slugs
function lookupTitles(moduleSlug, lessonSlug) {
  const mod = COURSE_STRUCTURE.find(m => m.slug === moduleSlug);
  const moduleTitle = mod?.title || moduleSlug;
  const lesson = mod?.lessons.find(l => l.slug === lessonSlug);
  const lessonTitle = lesson?.title || lessonSlug;
  return { moduleTitle, lessonTitle };
}

export async function generateMetadata({ params }) {
  const { module, lesson } = await params;
  const { moduleTitle, lessonTitle } = lookupTitles(module, lesson);

  return {
    title: `${lessonTitle} | ${moduleTitle} | Mobile Engineering Mastery`,
    description: `Learn ${lessonTitle} in the ${moduleTitle} module of our Mobile Engineering Mastery course. Covering React Native, Flutter, and Android.`,
    openGraph: {
      title: `${lessonTitle} - Mobile Engineering`,
      description: `Master mobile development with our interactive guide on ${lessonTitle}.`,
      type: 'article',
    }
  };
}

export default async function LessonPage({ params }) {
  const { module, lesson } = await params;
  const filePath = path.join(process.cwd(), 'content', 'mobile', module, `${lesson}.mdx`);

  try {
    const source = fs.readFileSync(filePath, 'utf8');
    const currentPath = `/mobile-course/${module}/${lesson}`;
    const { moduleTitle, lessonTitle } = lookupTitles(module, lesson);
    
    const allLessons = flattenCourse(COURSE_STRUCTURE);
    const currentIndex = allLessons.findIndex(p => p.path === currentPath);
    const nextLesson = currentIndex !== -1 && currentIndex + 1 < allLessons.length 
      ? allLessons[currentIndex + 1] 
      : null;
      
    // Import dynamically so it doesn't break server/client boundaries if needed
    const CourseLessonLayout = (await import('@/components/ui/CourseLessonLayout')).default;
    
    return (
      <ProgressGuard lessonSlug={lesson}>
        <CourseLessonLayout
          lesson={{
            title: lessonTitle,
            phase: moduleTitle,
            id: lesson
          }}
          courseId="mobile-engineering"
          courseName="Mobile Mastery"
          allLessonIds={allLessons.map(l => l.lessonSlug)}
          backLink="/mobile-course"
        >
          <MDXRemote source={source} components={components} />
          
          <div className="mt-20 pt-10 border-t border-white/10">
            <CourseProgressTracker
              lessonId={lesson}
              courseId="mobile-engineering"
              nextLessonPath={nextLesson ? nextLesson.path : null}
              coursePath="/mobile-course"
              isLastLesson={!nextLesson}
            />
          </div>
        </CourseLessonLayout>
      </ProgressGuard>
    );
  } catch (e) {
    console.error(e);
    notFound();
  }
}

export async function generateStaticParams() {
  const allLessons = flattenCourse(COURSE_STRUCTURE);
  return allLessons.map(l => ({
    module: l.moduleSlug,
    lesson: l.lessonSlug,
  }));
}
