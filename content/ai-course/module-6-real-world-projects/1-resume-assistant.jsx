"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function ResumeAssistant() {
  const lessonData = {
    objectives: [
      "Use AI to rapidly tailor a generic resume to a specific job description.",
      "Construct a Mega-Prompt utilizing Role, Task, Context, and Steps.",
      "Understand how to prevent the AI from fabricating experience (hallucinating)."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Resume Tailor">
          <p>One of the highest ROI uses of AI is tailoring your resume to a specific job description. Instead of sending the exact same generic resume to 50 companies (which rarely works in today's market), you can have the AI analyze the job description and highlight the exact skills from your background that match.</p>
          <p className="mt-2">The trick is ensuring the AI doesn't <em>lie</em> on your behalf. We do this through strict constraints.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Rewrite my resume to fit this job description: [Job Description]. Here is my resume: [Resume]",
        reason: "The AI will likely rewrite your entire history, hallucinate skills you don't have, and make you sound like a robotic corporate brochure."
      },
      better: {
        prompt: "Tailor my resume for this job. Do not lie or make up skills. Job: [Job Description]. Resume: [Resume]",
        reason: "Adding the constraint not to lie is good, but the AI lacks a specific methodology on *how* to tailor it."
      },
      best: {
        prompt: "Act as an Expert Executive Recruiter. \n\nTask: Tailor my resume to perfectly match the keywords and requirements of the provided job description.\n\nConstraint: DO NOT fabricate experience or add skills I do not possess.\n\nSteps:\n1. Identify the top 5 most critical skills required in the JD.\n2. Rewrite the 'Summary' section of my resume to highlight those exact skills based ONLY on my actual experience.\n3. Rewrite my bullet points to sound more impactful, using the X-Y-Z formula (Accomplished [X] as measured by [Y], by doing [Z]).\n\n[Paste Resume]\n[Paste Job Description]",
        reason: "This Mega-Prompt defines the Persona, the Task, a critical Constraint, and a Step-by-step methodology (including the X-Y-Z formula) for guaranteed high-quality results."
      }
    },
    keywords: [
      { term: "Mega-Prompt", description: "A very long, highly structured prompt that combines multiple prompt engineering techniques (Persona, Constraints, Steps) into a single command." },
      { term: "X-Y-Z Formula", description: "Google's recommended resume bullet formula: 'Accomplished [X] as measured by [Y], by doing [Z]'. You can explicitly instruct the AI to use this." },
      { term: "Hallucination Prevention", description: "Using explicit constraints like 'DO NOT fabricate experience' to stop the AI from making up skills you don't have." }
    ],
    challenge: {
      mission: "Copy the 'Best' Mega-Prompt, paste it into ChatGPT, Claude, or Gemini, and replace the bracketed sections with your own resume and a dream job description!",
      xp: 200,
      difficulty: "Intermediate",
      hint: "If the AI hallucinates a skill, reply: 'You added [Skill], which isn't in my original resume. Please remove it and regenerate.'"
    },
    quiz: {
      question: "When asking an AI to tailor your resume, what is the most critical constraint you must include?",
      options: [
        "Do not make the resume longer than 1 page.",
        "Use a professional tone.",
        "Do not fabricate experience or add skills I do not possess.",
        "Use the X-Y-Z formula."
      ],
      correctAnswerIndex: 2,
      explanation: "While formatting and tone are nice, hallucinating fake skills on a resume will cost you the job and ruin your professional reputation. Always explicitly constrain the AI from lying."
    },
    summary: "Stop sending generic resumes. Use a structured Mega-Prompt to have an 'Expert Recruiter AI' tailor your resume for every single application in seconds."
  };

  return <AILessonTemplate data={lessonData} />;
}
