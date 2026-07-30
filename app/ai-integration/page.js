import AIContent, { aiToc } from "./AIContent";
import Sidebar from "@/components/Sidebar";
import MobileTOC from "@/components/ai/MobileTOC";
import { getAdjacentLessons } from "@/data/roadmap";
import CourseNavigation from "@/components/lesson/CourseNavigation";

export const metadata = {
  title: "AI Integration in Backend | QuizKaal",
  description: "Learn how to integrate AI models, LangChain, and RAG into your backend systems with our comprehensive AI integration course and interview questions.",
  alternates: {
    canonical: "https://quizkaal.in/ai-integration",
  },
  openGraph: {
    title: "AI Integration in Backend | QuizKaal",
    description: "Learn how to integrate AI models, LangChain, and RAG into your backend systems.",
    url: "https://quizkaal.in/ai-integration",
    siteName: "QuizKaal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Integration in Backend",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Integration in Backend | QuizKaal",
    description: "Master AI integration, LangChain, and RAG for backend engineering.",
    images: ["/og-image.jpg"],
  },
};

export default function AIIntegrationPage() {
  const { prev, next } = getAdjacentLessons("testing"); // Link to after testing

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="w-[200px] shrink-0 hidden md:block pl-6">
          <Sidebar items={aiToc} />
        </div>
        
        <main className="flex-1 w-full min-w-0">
          <MobileTOC items={aiToc} />
          <div className="lesson-container">
            <AIContent />
            
            <div className="max-w-[800px] mx-auto w-full px-6 md:px-12 mt-16 pb-32">
              <CourseNavigation prev={prev} next={null} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
