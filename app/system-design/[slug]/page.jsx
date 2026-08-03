import { generateSEOMetadata, generateSchema } from "@/lib/seo";
import { lessonData } from "../data/lessons";
import Script from "next/script";
import SystemDesignClient from "./SystemDesignClient";

export default function SystemDesignPage({ params }) {
  const { slug } = params;
  const rawData = lessonData[slug] || {};
  const formattedTitle = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  const articleSchema = generateSchema("TechArticle", {
    title: rawData.title || formattedTitle,
    description: rawData.description || `Architecture breakdown for ${formattedTitle}`,
    url: `https://quizkaal.in/system-design/${slug}`
  });

  const breadcrumbSchema = generateSchema("BreadcrumbList", {
    items: [
      { name: "System Design", url: "https://quizkaal.in/system-design" },
      { name: rawData.title || formattedTitle, url: `https://quizkaal.in/system-design/${slug}` }
    ]
  });

  return (
    <>
      <Script id={`schema-article-${slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`schema-breadcrumb-${slug}`} type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SystemDesignClient params={params} />
    </>
  );
}
