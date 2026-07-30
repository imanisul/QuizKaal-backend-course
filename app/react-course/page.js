import ReactCourseClient from "./ReactCourseClient";

export const metadata = {
  title: "React Mastery Course | QuizKaal",
  description: "A complete, interactive React learning module. Master modern React from components to performance optimization, with live code editors and visualizations.",
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
  return <ReactCourseClient />;
}
