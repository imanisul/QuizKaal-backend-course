import React from 'react';

export const metadata = {
  title: "System Design Mastery | QuizKaal Learn",
  description: "Master large-scale system architectures. Learn load balancing, caching, databases, and microservices.",
  openGraph: {
    title: "System Design Mastery | QuizKaal Learn",
    description: "Master large-scale system architectures. Learn load balancing, caching, databases, and microservices.",
  },
  twitter: {
    title: "System Design Mastery | QuizKaal Learn",
    description: "Master large-scale system architectures. Learn load balancing, caching, databases, and microservices.",
  }
};


import { ProgressProvider } from './ProgressContext';

export default function SystemDesignLayout({ children }) {
  return (
    <ProgressProvider>
      <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-sysClient/30 font-ui">
        <div className="pb-32">
          {children}
        </div>
      </div>
    </ProgressProvider>
  );
}

