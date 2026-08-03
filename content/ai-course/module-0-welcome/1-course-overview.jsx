import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function CourseOverview() {
  const lessonData = {
    objectives: [
      "Understand the difference between this course and typical 'hack' tutorials.",
      "Learn how to navigate the interactive tools embedded in the lessons.",
      "Prepare for the mindset shift required for prompt engineering."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="A New Era of Engineering">
          <p>You are about to embark on a journey to master the single most important technical skill of this decade: <strong>Communicating with Artificial Intelligence</strong>.</p>
          <p>Whether you are a developer, a student, or a business professional, understanding how to engineer precise, structured, and highly-effective prompts will give you an unfair advantage in your career.</p>
        </ConceptBlock>
        
        <ConceptBlock type="info" title="Not Just Another 'Hacks' Course">
          <p>This is not a course about "Top 10 ChatGPT Hacks." This is a deep, foundational engineering course. By the end of this curriculum, you will know how to write deterministic prompts that guarantee specific outputs, bypass AI hallucinations, and build dynamic workflows integrating AI into your daily tasks.</p>
        </ConceptBlock>
      </>
    ),
    conversation: {
      bad: {
        prompt: "Build a website for me.",
        response: "Sure! Here is a simple HTML template...",
        explanation: "This is vague. The AI has to guess what kind of website you want, what stack to use, and what it looks like."
      },
      good: {
        prompt: "You are an expert React Developer. Build a dark-mode landing page using Next.js and Tailwind. Ensure it is fully responsive and includes a hero section with a gradient button.",
        response: "Understood. I will act as a Senior React Developer and generate a Next.js landing page with Tailwind...\n\n```jsx\n// Next.js Code...```"
      }
    },
    challenge: {
      mission: "There is no coding or prompt required for this specific lesson. Just take a deep breath and get ready to fundamentally change how you interact with computers. Click Complete to grab your first XP!",
      xp: 50,
      difficulty: "Very Easy",
      hint: "Don't rush! The skills you learn in Module 2 and 3 are the foundation for everything else."
    },
    quiz: {
      question: "What is the primary goal of this AI Prompt Engineering course?",
      options: [
        "To teach you 'Top 10 ChatGPT Hacks' to get rich quick.",
        "To teach you foundational engineering principles for deterministic AI communication.",
        "To teach you how to build your own LLM from scratch."
      ],
      correctAnswerIndex: 1,
      explanation: "This course focuses on deep, foundational engineering principles to help you write structured prompts that guarantee specific, reliable outputs from AI models."
    },
    summary: "Welcome to the course! You now understand the structure and interactive nature of the lessons. Proceed to the next step to choose your Learning Path."
  };

  return <AILessonTemplate data={lessonData} />;
}
