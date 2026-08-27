import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { allLessons, getAdjacentLessons, getLessonBySlug as getRoadmapLesson } from "@/data/roadmap";
import { getLessonBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/docs/MdxComponents";
import CurriculumSidebar from "@/components/docs/CurriculumSidebar";
import CourseNavigation from "@/components/lesson/CourseNavigation";
import ProgressGuard from "@/components/lesson/ProgressGuard";
import TableOfContents from "@/components/lesson/TableOfContents";
import CourseProgressBar from "@/components/lesson/CourseProgressBar";
import CourseLessonLayout from "@/components/ui/CourseLessonLayout";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import ProgressiveRenderer from "@/components/lesson/ProgressiveRenderer";
import MobileLessonNav from "@/components/lesson/MobileLessonNav";
import LessonHero from "@/components/lesson/LessonHero";
import { Suspense } from "react";

export function generateStaticParams() {
  return allLessons.map((l) => ({ slug: l.slug }));
}

import { generateSEOMetadata, generateSchema } from "@/lib/seo";

export function generateMetadata({ params }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return {};
  
  const title = `${lesson.frontmatter?.title || 'Lesson'} | QuizKaal`;
  const description = lesson.frontmatter?.description || "Master backend engineering with QuizKaal.";
  const url = `https://quizkaal.in/lessons/${params.slug}`;

  return generateSEOMetadata({
    title,
    description,
    url,
    type: "article",
    keywords: [lesson.frontmatter?.title, lesson.frontmatter?.phase, lesson.category, "quizkaal learn", "engineering course"].filter(Boolean)
  });
}

// Custom slugify function to match rehype-slug
function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export default async function LessonPage({ params }) {
  const lesson = getLessonBySlug(params.slug);
  
  if (!lesson) {
    // Fallback if MDX doesn't exist yet, to prevent 404 on roadmap items without content
    return (
      <div className="max-w-[800px] mx-auto px-8 global-page-pt text-center">
        <h1 className="text-4xl font-bold mb-4">Module Coming Soon</h1>
        <p className="text-textSecondary">This advanced deep-dive module is currently being authored.</p>
        <Link href="/roadmap" className="text-primary hover:underline mt-8 inline-block">Back to Roadmap</Link>
      </div>
    );
  }

  // Parse headings for TOC
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(lesson.content)) !== null) {
    const text = match[2].replace(/<[^>]+>/g, '').trim(); // Remove inline markdown/HTML tags
    headings.push({
      level: match[1].length,
      text: text,
      id: generateSlug(text),
    });
  }


  const { prev, next } = getAdjacentLessons(params.slug);

  // Detect which course this lesson belongs to
  const roadmapLesson = getRoadmapLesson(params.slug);
  const courseId = roadmapLesson?.courseId || "backend-engineering";

  const COURSE_PATHS = {
    "backend-engineering": { path: "/roadmap", label: "Roadmap" },
    "devops-engineering": { path: "/devops-engineering", label: "DevOps Engineer" },
  };
  const courseInfo = COURSE_PATHS[courseId] || COURSE_PATHS["backend-engineering"];

  const mdxOptions = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, { theme: "github-dark", keepBackground: false }]
      ],
    }
  };

  const articleSchema = generateSchema("TechArticle", {
    title: lesson.frontmatter?.title,
    description: lesson.frontmatter?.description,
    url: `https://quizkaal.in/lessons/${params.slug}`,
  });

  const breadcrumbSchema = generateSchema("BreadcrumbList", {
    items: [
      { name: "Roadmap", url: "https://quizkaal.in/roadmap" },
      { name: lesson.frontmatter?.phase || lesson.category, url: `https://quizkaal.in/lessons/${params.slug}` }
    ]
  });

  return (
    <>
      <Script id="schema-article" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(articleSchema)}
      </Script>
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(breadcrumbSchema)}
      </Script>

      <ProgressGuard lessonSlug={params.slug}>
        <MobileLessonNav headings={headings}>
          <CurriculumSidebar />
        </MobileLessonNav>

        <CourseLessonLayout
          lesson={{
            title: lesson.frontmatter?.title,
            summary: lesson.frontmatter?.description,
            phase: lesson.frontmatter?.phase,
            difficulty: lesson.frontmatter?.difficulty,
            time: lesson.frontmatter?.time,
            xp: lesson.frontmatter?.xp,
            emoji: lesson.frontmatter?.emoji || "Terminal",
            id: lesson.id || lesson.slug
          }}
          courseId={courseId}
          courseName={courseInfo.label}
          allLessonIds={allLessons.filter(l => l.courseId === courseId).map(l => l.slug)}
          backLink={courseInfo.path}
          sidebar={
            <>
              <h3 className="font-bold text-sm tracking-widest uppercase text-textTertiary mb-6 ml-2">Curriculum</h3>
              <CurriculumSidebar />
            </>
          }
          toc={
            <>
              <h3 className="font-bold text-sm tracking-widest uppercase text-textTertiary mb-6">On This Page</h3>
              <TableOfContents headings={headings} />
            </>
          }
        >
          <ProgressiveRenderer key={params.slug}>
            <MDXRemote source={lesson.content} components={MdxComponents} options={mdxOptions} />
          </ProgressiveRenderer>

          <div className="mt-20 pt-10 border-t border-white/10">
            <CourseNavigation prev={prev} next={next} lessonSlug={params.slug} courseId={courseId} />
          </div>
        </CourseLessonLayout>
      </ProgressGuard>
    </>
  );
}
