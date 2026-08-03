"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function UniversalFormula() {
  const lessonData = {
    objectives: [
      "Learn the 7-step universal formula for prompt construction.",
      "Understand the correct order to present information to an LLM.",
      "See how applying the formula transforms a simple request into a professional prompt."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The 7-Step Formula">
          <p>Now that you know the anatomy, here is the universal formula that works across ChatGPT, Claude, Gemini, and almost any other LLM.</p>
          <p>Whenever you are about to write a complex prompt, construct it in this exact order to ensure the AI parses your instructions with maximum logical weight:</p>
        </ConceptBlock>

        <div className="space-y-6 my-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          
          {/* Step 1 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-primary text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 shadow-[0_0_15px_rgba(168,85,247,0.5)] relative z-10">
              1
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-primary/30 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Set the Role
              </h4>
              <p className="text-white/70 italic">"Act as an expert copywriter..."</p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-cyan-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 relative z-10">
              2
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Define the Task
              </h4>
              <p className="text-white/70 italic">"Write a landing page for my new SaaS product."</p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-blue-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 relative z-10">
              3
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Provide Context
              </h4>
              <p className="text-white/70 italic">"The product is a habit tracker designed specifically for students with ADHD."</p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-emerald-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 relative z-10">
              4
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Specify Audience
              </h4>
              <p className="text-white/70 italic">"The target audience is college students aged 18-24."</p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-amber-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 relative z-10">
              5
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                State Constraints
              </h4>
              <p className="text-white/70 italic">"Do not use complex corporate jargon. Keep sentences under 15 words."</p>
            </div>
          </div>

          {/* Step 6 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-pink-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 relative z-10">
              6
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Set Tone
              </h4>
              <p className="text-white/70 italic">"Use an empathetic, encouraging, and highly motivating tone."</p>
            </div>
          </div>

          {/* Step 7 */}
          <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#060608] bg-purple-500 text-white font-bold shrink-0 md:order-1 md:group-odd:-ml-5 md:group-even:-mr-5 relative z-10">
              7
            </div>
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/[0.02] border border-white/10">
              <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                Dictate Format
              </h4>
              <p className="text-white/70 italic">"Format the output as a Markdown document with clear H1 and H2 headers."</p>
            </div>
          </div>

        </div>

        <ConceptBlock type="sticky" title="Why Order Matters">
          <p>Language models process text sequentially (autoregressively). By putting the <strong>Role</strong> first, you immediately set the statistical weights of the model's vocabulary. If you put the role at the very end of a long prompt, the model has already processed the context using a generic persona.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Write a landing page for my habit tracker app.",
        reason: "The AI will generate a generic landing page assuming standard features and audiences."
      },
      better: {
        prompt: "Write a landing page for my habit tracker app for college students. Make it sound encouraging.",
        reason: "Adding audience and tone helps, but it still lacks specific constraints and formatting instructions."
      },
      best: {
        prompt: "Act as an expert copywriter. Write a landing page for my new SaaS product. The product is a habit tracker designed specifically for students with ADHD. The target audience is college students aged 18-24. Do not use complex corporate jargon. Keep sentences under 15 words. Use an empathetic, encouraging, and highly motivating tone. Format the output as a Markdown document with clear H1 and H2 headers.",
        reason: "Following the formula step-by-step locks the AI into a highly specific behavioral state, guaranteeing an expert output."
      }
    },
    quiz: {
      question: "Why is it recommended to put the 'Role' at the very beginning of the prompt rather than at the end?",
      options: [
        "It looks more professional.",
        "It sets the initial statistical weights and vocabulary of the LLM before it processes the rest of the prompt.",
        "It prevents the AI from throwing a syntax error.",
        "It actually doesn't matter; the order of a prompt is purely for human readability."
      ],
      correctAnswerIndex: 1,
      explanation: "LLMs process text sequentially. Setting the Role first ensures that the rest of the prompt is interpreted through the lens of that persona from the very beginning."
    },
    summary: "The Universal Formula (Role, Task, Context, Audience, Constraints, Tone, Format) provides a predictable structure that works across all major LLMs."
  };

  return <AILessonTemplate data={lessonData} />;
}
