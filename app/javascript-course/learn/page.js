import Script from "next/script";
import JavaScriptCourseClient from "../JavaScriptCourseClient";

export const metadata = {
  title: "JavaScript Mastery Course | Advanced JS Engine & Visualizer | QuizKaal",
  description: "Master JavaScript by visually exploring the JS Engine. Deep dive into the Call Stack, Event Loop, Closures, Promises, and the DOM with live interactive animations. Perfect for interviews and advanced web development.",
  keywords: ["JavaScript course", "JS Engine", "Call Stack", "Event Loop", "Closures", "Promises", "Frontend engineering", "Advanced JavaScript", "QuizKaal"],
  openGraph: {
    title: "JavaScript Mastery Course | QuizKaal",
    description: "Master JavaScript by visualizing the JS Engine. Deep dive into the Call Stack, Event Loop, Closures, Promises, and the DOM.",
    url: 'https://quizkaal.in/javascript-course',
    siteName: 'QuizKaal',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://quizkaal.in/javascript-course',
  }
};

export default function JavaScriptCourseLearnPage() {
  return (
    <>
      <JavaScriptCourseClient />
    </>
  );
}
