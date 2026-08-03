import AIContent, { aiToc } from "./AIContent";
import Sidebar from "@/components/Sidebar";
import MobileTOC from "@/components/ai/MobileTOC";
import { getAdjacentLessons } from "@/data/roadmap";
import CourseNavigation from "@/components/lesson/CourseNavigation";



export default function AIIntegrationPage() {
  const { prev, next } = getAdjacentLessons("testing"); // Link to after testing

  return (
    <div className="min-h-screen">
      <div className="flex">
        <div className="w-[200px] shrink-0 hidden md:block pl-6">
          <Sidebar items={aiToc} />
        </div>
        
        <main className="flex-1 w-full min-w-0 global-page-pt">
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
