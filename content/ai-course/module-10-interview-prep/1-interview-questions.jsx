import ConceptBlock from "@/components/ai-course/ConceptBlock";
import InterviewQuestionsAccordion from "@/components/ai-course/InterviewQuestionsAccordion";

export default function InterviewQuestions() {
  const questions = [
    {
      id: "q1",
      question: "What is the difference between Zero-Shot and Few-Shot prompting?",
      answer: "Zero-Shot prompting is asking the AI to perform a task without providing any examples, relying entirely on its pre-trained knowledge. Few-Shot prompting involves giving the AI a few examples of the desired input and output to guide its formatting and logic."
    },
    {
      id: "q2",
      question: "Explain the concept of 'Chain of Thought' prompting.",
      answer: "Chain of Thought (CoT) is a technique where you force the LLM to output its step-by-step reasoning before providing the final answer. This significantly improves accuracy on complex logic or math problems because it gives the model 'time to think' and prevents it from blindly predicting the final token."
    },
    {
      id: "q3",
      question: "What is Prompt Injection, and why is it dangerous?",
      answer: "Prompt Injection is a security vulnerability where a user inputs malicious text designed to override the system prompt. It is dangerous because it can force an AI to ignore its safety constraints, leak confidential information, or execute unauthorized commands."
    },
    {
      id: "q4",
      question: "Why should you assign a 'Persona' or 'Role' to an LLM?",
      answer: "Assigning a persona forces the LLM to narrow its statistical focus. It adopts the specific vocabulary, tone, and professional standards of that role, which leads to much higher quality, domain-specific outputs compared to a generic response."
    }
  ];

  return (
    <>
      <ConceptBlock type="default" title="The AI Interview">
        <p>As companies rapidly adopt AI, "Prompt Engineering" is becoming a standard interview topic, especially for Developer and Product roles. You need to be able to explain the underlying concepts, not just write prompts.</p>
      </ConceptBlock>

      <div className="my-12">
        <InterviewQuestionsAccordion questions={questions} />
      </div>
    </>
  );
}
