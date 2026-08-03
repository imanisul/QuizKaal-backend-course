import { BookOpen, Smartphone, ShieldAlert, Cpu } from 'lucide-react';

export const COURSE_STRUCTURE = [
  {
    title: 'Orientation',
    slug: 'module-0-orientation',
    icon: <BookOpen className="w-4 h-4" />,
    lessons: [
      { title: 'What is Mobile Engineering?', slug: '1-what-is-mobile-engineering' },
      { title: 'The Three Tracks', slug: '2-three-tracks' }
    ]
  },
  {
    title: 'Fundamentals',
    slug: 'module-1-fundamentals',
    icon: <Smartphone className="w-4 h-4" />,
    lessons: [
      { title: 'Language Primers (JS, Dart, Kotlin)', slug: '1-language-primers' },
      { title: 'Layout Systems (Flexbox vs Constrained)', slug: '2-layout-systems' }
    ]
  },
  {
    title: 'Navigation & Routing',
    slug: 'module-2-navigation',
    icon: <BookOpen className="w-4 h-4" />,
    lessons: [
      { title: 'Screens, Stacks, and Tabs', slug: '1-screens-stacks-tabs' }
    ]
  },
  {
    title: 'State Management',
    slug: 'module-3-state',
    icon: <Cpu className="w-4 h-4" />,
    lessons: [
      { title: 'The Unidirectional Data Flow', slug: '1-data-flow' }
    ]
  },
  {
    title: 'Backend Integration',
    slug: 'module-4-backend',
    icon: <ShieldAlert className="w-4 h-4" />,
    lessons: [
      { title: 'REST APIs & Fetch', slug: '1-api-requests' },
      { title: 'Auth & Local Databases', slug: '2-auth-databases' }
    ]
  },
  {
    title: 'Device Capabilities',
    slug: 'module-5-device',
    icon: <Smartphone className="w-4 h-4" />,
    lessons: [
      { title: 'Permissions & Camera', slug: '1-permissions-camera' }
    ]
  },
  {
    title: 'Performance',
    slug: 'module-6-performance',
    icon: <Cpu className="w-4 h-4" />,
    lessons: [
      { title: 'Rendering Pipelines (16ms Rule)', slug: '1-rendering-pipelines' }
    ]
  },
  {
    title: 'Deployment',
    slug: 'module-7-deployment',
    icon: <ShieldAlert className="w-4 h-4" />,
    lessons: [
      { title: 'Play Store & CI/CD', slug: '1-play-store' }
    ]
  },
  {
    title: 'Capstone Project',
    slug: 'module-8-capstone',
    icon: <BookOpen className="w-4 h-4" />,
    lessons: [
      { title: 'Build a Mini Social App', slug: '1-build' }
    ]
  },
  {
    title: 'Next Steps',
    slug: 'module-9-next',
    icon: <BookOpen className="w-4 h-4" />,
    lessons: [
      { title: 'Specialization & Interview Prep', slug: '1-specialization' }
    ]
  }
];

export function flattenCourse(courseStructure) {
  const flattened = [];
  courseStructure.forEach((module, mIdx) => {
    module.lessons.forEach((lesson, lIdx) => {
      flattened.push({
        moduleSlug: module.slug,
        lessonSlug: lesson.slug,
        moduleTitle: module.title,
        lessonTitle: lesson.title,
        path: `/mobile-course/${module.slug}/${lesson.slug}`,
      });
    });
  });
  return flattened;
}
