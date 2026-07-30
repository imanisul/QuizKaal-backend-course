import Script from "next/script";
import ReactCourseClient from "./ReactCourseClient";

export const metadata = {
  title: "React Mastery Course | QuizKaal",
  description: "A complete, interactive React learning module. Master modern React from components to performance optimization, with live code editors and visualizations.",
  alternates: {
    canonical: "https://quizkaal.in/react-course",
  },
  openGraph: {
    title: "React Mastery Course | QuizKaal",
    description: "A complete, interactive React learning module. Master modern React from components to performance optimization.",
    url: "https://quizkaal.in/react-course",
    siteName: "QuizKaal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "React Mastery Course",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "React Mastery Course | QuizKaal",
    description: "Master modern React with interactive visualizers and live code.",
    images: ["/og-image.jpg"],
  },
};

export default function ReactCoursePage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "React Mastery Course",
    "description": "A complete, interactive React learning module. Master modern React from components to performance optimization.",
    "provider": {
      "@type": "Organization",
      "name": "QuizKaal",
      "sameAs": "https://quizkaal.in"
    }
  };

  return (
    <>
      <Script id="schema-course" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(courseSchema)}
      </Script>
      <ReactCourseClient />
    </>
  );
}
