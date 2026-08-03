import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function LearningPaths() {
  const lessonData = {
    objectives: [
      "Understand why prompt engineering changes based on your professional role.",
      "Identify the 5 core learning paths available in this course.",
      "Learn how to dynamically switch your course persona."
    ],
    concept: (
      <>
        <ConceptBlock type="idea" title="Role-Based Prompting">
          <p>Prompt engineering is not a "one size fits all" skill. How a software developer uses AI is very different from how a marketing manager uses AI.</p>
          <p>Because of this, we have designed this course with different <strong>Learning Paths</strong>. While the core fundamentals remain the same, the examples and challenges you face will adapt to your chosen path.</p>
        </ConceptBlock>
      </>
    ),
    keywords: [
      { term: "Absolute Beginner", definition: "Focuses on everyday tasks, writing emails, brainstorming, and personal productivity.", example: "Plan a 7-day vacation itinerary to Tokyo." },
      { term: "Student", definition: "Focuses on learning faster, summarizing complex topics, test prep, and research.", example: "Explain quantum mechanics to me like I am a high schooler." },
      { term: "Professional", definition: "Focuses on automating tasks, writing marketing copy, consulting, and spreadsheet formulas.", example: "Draft a polite email declining a vendor proposal." },
      { term: "Developer", definition: "Focuses on generating boilerplate code, PR reviews, refactoring, and debugging errors.", example: "Write a unit test for this function using Jest." },
      { term: "AI Engineer", definition: "Focuses on system prompts, RAG pipelines, API integration, and model fine-tuning.", example: "Output only valid JSON. Do not include markdown formatting." }
    ],
    showPromptBuilder: true,
    quiz: {
      question: "Why does prompt engineering differ based on your role?",
      options: [
        "Because AI models charge different prices depending on your job title.",
        "Because the core fundamentals of AI change depending on your career.",
        "Because the specific applications, context, and expected outputs differ drastically between professions."
      ],
      correctAnswerIndex: 2,
      explanation: "While the underlying formulas (like providing context and assigning roles) remain the same, the specific tasks and desired outputs are entirely dependent on what you are trying to achieve in your specific role."
    },
    summary: "You now understand the different personas. Pick the one that fits you best and move forward!"
  };

  return <AILessonTemplate data={lessonData} />;
}
