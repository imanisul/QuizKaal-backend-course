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
      <CourseProgressBar />
      <ProgressGuard lessonSlug={params.slug}>
        <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_240px] gap-10 max-w-[1400px] mx-auto px-6 sm:px-8 relative z-[1]">
          
          {/* Left Sidebar (Global Nav) */}
          <aside className="hidden xl:block pb-32 global-sticky-sidebar overflow-y-auto border-r border-white/10 pr-2">
            <h3 className="font-bold text-sm tracking-widest uppercase text-textTertiary mb-6 ml-2">Curriculum</h3>
            <CurriculumSidebar />
          </aside>

          {/* Mobile Drawer Navigation */}
          <MobileLessonNav headings={headings}>
            <CurriculumSidebar />
          </MobileLessonNav>

          {/* Main Content (MDX) */}
          <main className="min-w-0 global-page-pt pb-32">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-textTertiary mb-8">
              <Link href={courseInfo.path} className="hover:text-white transition-colors">{courseInfo.label}</Link>
              <span>/</span>
              <span className="text-primary">{lesson.frontmatter?.phase || lesson.category}</span>
            </div>

            <LessonHero 
              lesson={{
                title: lesson.frontmatter?.title,
                summary: lesson.frontmatter?.description,
                phase: lesson.frontmatter?.phase,
                difficulty: lesson.frontmatter?.difficulty,
                time: lesson.frontmatter?.time,
                xp: lesson.frontmatter?.xp,
                slug: params.slug,
                courseId: courseId
              }} 
            />

            <ProgressiveRenderer key={params.slug}>
              <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
                <MDXRemote source={lesson.content} components={MdxComponents} options={mdxOptions} />
              </article>
            </ProgressiveRenderer>

            <div className="mt-20 pt-10 border-t border-white/10">
              <CourseNavigation prev={prev} next={next} lessonSlug={params.slug} courseId={courseId} />
            </div>
          </main>

          {/* Right Sidebar (TOC) */}
          <aside className="hidden xl:block pb-32 global-sticky-sidebar overflow-y-auto pl-6">
            <h3 className="font-bold text-sm tracking-widest uppercase text-textTertiary mb-6">On This Page</h3>
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </ProgressGuard>
    </>
  );
}
