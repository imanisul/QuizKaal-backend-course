import Script from 'next/script';

export function CourseStructuredData({ title, description, url, providerName = "QuizKaal", providerUrl = "https://quizkaal.in" }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": title,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": providerName,
      "sameAs": providerUrl
    }
  };

  return (
    <Script id={`schema-course-${title.replace(/\s+/g, '')}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}

export function BreadcrumbStructuredData({ items }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script id={`schema-breadcrumb-${items.length}`} type="application/ld+json" strategy="afterInteractive">
      {JSON.stringify(schema)}
    </Script>
  );
}
