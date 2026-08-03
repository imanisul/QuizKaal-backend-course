/**
 * Centralized SEO Utility for QuizKaal Learn
 * Helps generate unique Next.js Metadata and JSON-LD Structured Data
 */

export const siteConfig = {
  name: "QuizKaal",
  description: "QuizKaal Learn: An immersive, interactive engineering platform.",
  url: "https://quizkaal.in",
  ogImage: "https://quizkaal.in/og-image.jpg",
  twitterHandle: "@quizkaal",
  author: "QuizKaal Curriculum Team"
};

/**
 * Generate standard Next.js Metadata object
 */
export function generateSEOMetadata({
  title,
  description,
  url,
  keywords = [],
  image = siteConfig.ogImage,
  type = "website"
}) {
  return {
    title,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: siteConfig.twitterHandle,
      images: [image],
    },
  };
}

/**
 * Generate JSON-LD Schema Script configurations
 */
export function generateSchema(type, data) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case "Organization":
      return {
        ...baseSchema,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: {
          "@type": "ImageObject",
          url: `${siteConfig.url}/logo.png`,
          width: "512",
          height: "512",
        },
        description: siteConfig.description,
        sameAs: [
          `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
          "https://github.com/quizkaal"
        ]
      };
      
    case "WebSite":
      return {
        ...baseSchema,
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${siteConfig.url}/roadmap?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };

    case "Course":
      return {
        ...baseSchema,
        name: data.title,
        description: data.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          sameAs: siteConfig.url
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "Online",
          courseWorkload: data.time || "PT10H"
        }
      };

    case "BreadcrumbList":
      return {
        ...baseSchema,
        itemListElement: data.items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      };

    case "TechArticle":
    case "Article":
      return {
        ...baseSchema,
        headline: data.title,
        description: data.description,
        author: {
          "@type": "Organization",
          name: siteConfig.author
        },
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          logo: {
            "@type": "ImageObject",
            url: `${siteConfig.url}/logo.png`
          }
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url
        }
      };

    default:
      return { ...baseSchema, ...data };
  }
}
