import { ProgressSidebar } from '@/components/mobile-ui/ProgressSidebar';
import { CodeTabProvider } from '@/components/mobile-ui/CodeTabContext';
import MobileCourseProgressBar from '@/components/mobile-ui/MobileCourseProgressBar';

export const metadata = {
  title: "Mobile Engineering Course | QuizKaal Learn",
  description: "Learn iOS and Android mobile engineering from scratch. Master React Native, Swift, and Kotlin.",
  openGraph: {
    title: "Mobile Engineering Course | QuizKaal Learn",
    description: "Learn iOS and Android mobile engineering from scratch. Master React Native, Swift, and Kotlin.",
  },
  twitter: {
    title: "Mobile Engineering Course | QuizKaal Learn",
    description: "Learn iOS and Android mobile engineering from scratch. Master React Native, Swift, and Kotlin.",
  }
};


export default function CourseLayout({ children }) {
  return (
    <CodeTabProvider>
      <MobileCourseProgressBar />
      <div className="grid grid-cols-1 xl:grid-cols-[240px_minmax(0,1fr)] gap-10 max-w-[1400px] mx-auto px-6 sm:px-8 relative z-[1]">
        <aside className="hidden xl:block pb-32 global-sticky-sidebar overflow-y-auto border-r border-white/10 pr-2">
          <ProgressSidebar />
        </aside>
        <main className="min-w-0 global-page-pt pb-32">
          {children}
        </main>
      </div>
    </CodeTabProvider>
  );
}
