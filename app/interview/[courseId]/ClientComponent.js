import { notFound } from "next/navigation";
import InterviewDashboard from "./InterviewDashboard";

export async function generateStaticParams() {
  return [
    { courseId: 'backend-engineering' },
    { courseId: 'devops-engineering' },
    { courseId: 'system-design' },
    { courseId: 'react-mastery' },
    { courseId: 'mobile-engineering' },
    { courseId: 'ai-engineering' },
    { courseId: 'cicd-pipeline' },
  ];
}

export default async function InterviewCoursePage({ params }) {
  const { courseId } = params;

  let questions = [];
  try {
    const data = await import(`@/data/interview/${courseId}.js`);
    const key = Object.keys(data).find(k => k.endsWith('Questions'));
    questions = data[key];
  } catch (error) {
    console.error("Failed to load interview data:", error);
    notFound();
  }

  const courseNames = {
    'backend-engineering': 'Backend Engineering',
    'devops-engineering': 'DevOps Engineer',
    'system-design': 'System Design',
    'react-mastery': 'React Mastery',
    'mobile-engineering': 'Mobile Engineering',
    'ai-engineering': 'AI & Prompt Engineering',
    'cicd-pipeline': 'CI/CD Pipeline',
  };

  return (
    <InterviewDashboard 
      courseId={courseId} 
      courseName={courseNames[courseId]} 
      initialQuestions={questions} 
    />
  );
}
