"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function MeetingNotes() {
  const lessonData = {
    objectives: [
      "Use AI to extract structured data (Action Items, Decisions) from unstructured text (Transcripts).",
      "Apply strict formatting constraints to generate ready-to-send meeting minutes.",
      "Prevent the AI from guessing unassigned tasks."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="Automating the Follow-Up">
          <p>Meetings generate massive amounts of unstructured data (the transcript). If you record a meeting transcript, you can use AI to instantly parse that data, extract the signal from the noise, and generate professional meeting minutes.</p>
          <p className="mt-2">The goal of this prompt is to create an output that you can immediately copy-paste into an email to your team without having to edit it.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Here is a transcript of our meeting. Write a summary and tell me what everyone needs to do. [Transcript]",
        reason: "The AI will write a conversational summary. It won't be formatted well, and if it's unsure who is supposed to do a task, it might guess."
      },
      better: {
        prompt: "Summarize this meeting transcript. Give me an executive summary, key decisions, and action items formatted as a list. [Transcript]",
        reason: "Better formatting, but still lacks strict constraints on how the action items should look and what happens if a task has no owner."
      },
      best: {
        prompt: "Act as an Executive Assistant. Analyze the provided meeting transcript and generate a structured summary.\n\nFormat Requirements:\n- Section 1: Executive Summary (3 bullet points max)\n- Section 2: Key Decisions Made\n- Section 3: Action Items (Format EXACTLY as: [Assignee] - [Task] - [Deadline])\n\nConstraint:\nIf an action item does not have a clear assignee in the transcript, label it as [UNASSIGNED]. Do not guess.\n\nTranscript: [Paste Transcript]",
        reason: "Perfect. It uses a persona, defines exact structural requirements, forces a specific micro-format for action items, and explicitly prevents hallucinating task owners."
      }
    },
    keywords: [
      { term: "Unstructured Data", description: "Raw, unformatted information (like a messy 10-page meeting transcript full of tangents and cross-talk)." },
      { term: "Data Extraction", description: "Using AI to pull specific, structured data points (like decisions and action items) out of unstructured text." },
      { term: "Micro-Formatting", description: "Commanding the AI to format specific lines of text in an exact way, e.g., '[Assignee] - [Task] - [Deadline]'." }
    ],
    challenge: {
      mission: "Use the 'Best' prompt above on a real transcript! If you don't have one, join a quick 5-minute Zoom call by yourself, enable transcription, talk about a fake project, and use the transcript to test this prompt.",
      xp: 200,
      difficulty: "Beginner",
      hint: "Make sure you deliberately mention a task without assigning it to anyone to test if the [UNASSIGNED] constraint works!"
    },
    quiz: {
      question: "Why is the constraint 'If an action item does not have a clear assignee, label it as [UNASSIGNED]. Do not guess.' so important for this specific prompt?",
      options: [
        "Because the AI's spelling checker requires it.",
        "To save tokens in the final output.",
        "Because LLMs are statistical prediction engines; if a task exists, the model will naturally try to predict a name to attach to it (hallucinate), which could cause massive confusion in a real company.",
        "It is not important, the AI would leave it blank anyway."
      ],
      correctAnswerIndex: 2,
      explanation: "LLMs want to complete patterns. If a task is mentioned, the AI might statistically associate it with the person who spoke right before it, assigning work to the wrong person. Explicit constraints stop this."
    },
    summary: "Transform messy meetings into structured, actionable data instantly by strictly defining the output format and preventing the AI from guessing."
  };

  return <AILessonTemplate data={lessonData} />;
}
