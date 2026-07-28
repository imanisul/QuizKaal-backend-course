import Link from "next/link";
import { notFound } from "next/navigation";
import { allLessons, getAdjacentLessons } from "@/data/roadmap";
import { getLessonBySlug } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MdxComponents } from "@/components/docs/MdxComponents";
import CurriculumSidebar from "@/components/docs/CurriculumSidebar";
import CourseNavigation from "@/components/lesson/CourseNavigation";
import ProgressGuard from "@/components/lesson/ProgressGuard";
import TableOfContents from "@/components/lesson/TableOfContents";
import ScrollProgressBar from "@/components/lesson/ScrollProgressBar";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export function generateStaticParams() {
  return allLessons.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({ params }) {
  const lesson = getLessonBySlug(params.slug);
  if (!lesson) return {};
  return { title: `QuizKaal | ${lesson.frontmatter?.title || 'Lesson'}`, description: lesson.frontmatter?.description };
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
      <div className="max-w-[800px] mx-auto pt-32 px-8 text-center">
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

  const mdxOptions = {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrettyCode, { theme: "github-dark", keepBackground: false }]
      ],
    }
  };

  return (
    <>
      <ScrollProgressBar />
      <ProgressGuard lessonSlug={params.slug}>
        <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)_240px] gap-10 max-w-[1400px] mx-auto px-6 sm:px-8 relative z-[1]">
          
          {/* Left Sidebar (Global Nav) */}
          <aside className="hidden xl:block pt-24 pb-32 sticky top-0 h-[100vh] overflow-y-auto border-r border-white/10 pr-2">
            <h3 className="font-bold text-sm tracking-widest uppercase text-textTertiary mb-6 ml-2">Curriculum</h3>
            <CurriculumSidebar />
          </aside>

          {/* Main Content (MDX) */}
          <main className="min-w-0 pt-24 pb-32">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-textTertiary mb-8">
              <Link href="/roadmap" className="hover:text-white transition-colors">Roadmap</Link>
              <span>/</span>
              <span className="text-primary">{lesson.frontmatter?.phase || lesson.category}</span>
            </div>

            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
                {lesson.frontmatter?.title}
              </h1>
              <p className="text-xl text-textSecondary leading-relaxed">
                {lesson.frontmatter?.description}
              </p>
            </div>

            <article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
              <MDXRemote source={lesson.content} components={MdxComponents} options={mdxOptions} />
            </article>

            <div className="mt-20 pt-10 border-t border-white/10">
              <CourseNavigation prev={prev} next={next} />
            </div>
          </main>

          {/* Right Sidebar (TOC) */}
          <aside className="hidden xl:block pt-24 pb-32 sticky top-0 h-[100vh] overflow-y-auto pl-6">
            <h3 className="font-bold text-sm tracking-widest uppercase text-textTertiary mb-6">On This Page</h3>
            <TableOfContents headings={headings} />
          </aside>
        </div>
      </ProgressGuard>
    </>
  );
}
