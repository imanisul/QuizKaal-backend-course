import CICDContent from "./CICDContent";

export const metadata = {
  title: "CI/CD Pipeline Mastery | QuizKaal",
  description: "Learn how to build a continuous integration and deployment pipeline with Github Actions, Docker, and AWS. Includes CI/CD interview questions.",
  alternates: {
    canonical: "https://quizkaal.in/cicd",
  },
  openGraph: {
    title: "CI/CD Pipeline Mastery | QuizKaal",
    description: "Learn how to build a continuous integration and deployment pipeline with Github Actions, Docker, and AWS.",
    url: "https://quizkaal.in/cicd",
    siteName: "QuizKaal",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CI/CD Pipeline Architecture",
      },
    ],
    locale: "en_US",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "CI/CD Pipeline Mastery | QuizKaal",
    description: "Master modern CI/CD pipelines, Github Actions, Docker, and deployment strategies.",
    images: ["/og-image.jpg"],
  },
};

export default function CICDPage() {
  return (
    <div className="flex bg-[#0a0c10] min-h-screen text-white font-ui selection:bg-primary/30">
      <div className="flex-1 w-[95%] max-w-[1800px] mx-auto min-h-screen relative border-x border-white/[0.02]">
        <main className="px-4 lg:px-8 xl:px-12 pb-32">
          <CICDContent />
        </main>
      </div>
    </div>
  );
}
