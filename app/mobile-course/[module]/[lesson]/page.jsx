import { generateSEOMetadata, generateSchema } from "@/lib/seo";
import Script from "next/script";
import ClientComponent from "./ClientComponent";

export function generateMetadata({ params }) {
  const lessonTitle = params.lesson ? params.lesson.replace(/-/g, ' ') : (params.slug || params.id || params.courseId || "Lesson");
  const formatted = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);
  const title = `${formatted} - Mobile Engineering | QuizKaal`;
  const url = `https://quizkaal.in/mobile-course/${params.lesson || params.slug || params.id || params.courseId}`;

  return generateSEOMetadata({
    title,
    description: `Master ${formatted} in the Mobile Engineering course on QuizKaal Learn.`,
    url,
    type: "article",
    keywords: ["${formatted}", "Mobile Engineering", "quizkaal learn"]
  });
}

export default function DynamicPageWrapper({ params }) {
  const lessonTitle = params.lesson ? params.lesson.replace(/-/g, ' ') : (params.slug || params.id || params.courseId || "Lesson");
  const formatted = lessonTitle.charAt(0).toUpperCase() + lessonTitle.slice(1);

  const articleSchema = generateSchema("TechArticle", {
    title: `${formatted} - Mobile Engineering`,
    description: `Learn ${formatted} on QuizKaal`,
    url: `https://quizkaal.in/mobile-course/${params.lesson || params.slug || params.id || params.courseId}`
  });

  return (
    <>
      <Script id={`schema-article-${params.lesson || params.slug || params.id || params.courseId}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ClientComponent params={params} />
    </>
  );
}
