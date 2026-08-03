"use client";
import AILessonTemplate from "@/components/ai-course/AILessonTemplate";
import ConceptBlock from "@/components/ai-course/ConceptBlock";

export default function TravelPlanner() {
  const lessonData = {
    objectives: [
      "Use AI to synthesize complex logistics and scheduling.",
      "Understand how constraints force the AI to solve spatial and temporal problems.",
      "Generate day-by-day itineraries using tabular formatting."
    ],
    concept: (
      <>
        <ConceptBlock type="default" title="The Personal Concierge">
          <p>Planning a complex trip usually requires reading a dozen blogs, checking maps for distances, and building a spreadsheet. You can offload the entire research and synthesis process to an AI.</p>
          <p className="mt-2">However, if you just ask "Plan a trip to Japan," you will get a generic, exhausting tourist trap itinerary. You must use constraints to mold the itinerary to your specific logistics.</p>
        </ConceptBlock>
      </>
    ),
    promptExample: {
      bad: {
        prompt: "Plan a 4-day trip to Kyoto, Japan for me and my wife.",
        reason: "The AI will generate a generic list of the most famous tourist traps. It won't consider your budget, your pacing, or how far apart these locations are."
      },
      better: {
        prompt: "Plan a 4-day trip to Kyoto. We like quiet places and coffee. We have $300 a day.",
        reason: "Better context, but it lacks structural formatting and logistical constraints. You might get a bulleted list of places that are 2 hours away from each other."
      },
      best: {
        prompt: "Act as an Expert Luxury Travel Concierge. Plan a 4-day trip to Kyoto, Japan.\n\nContext: I am traveling with my partner. We are in our 30s. We love historical architecture, quiet coffee shops, and high-end sushi. We hate crowded tourist traps.\n\nConstraints:\n- Keep travel time between daily activities under 30 minutes via public transit (group locations geographically).\n- Budget is $300/day excluding hotels.\n\nFormat: Output a day-by-day markdown table containing Time, Activity, Location, and Estimated Cost.",
        reason: "This forces the AI to solve a logistical puzzle (grouping locations under 30 mins apart) and formats the output into a ready-to-use spreadsheet."
      }
    },
    keywords: [
      { term: "Logistical Constraints", description: "Rules that force the AI to calculate real-world physics, like 'keep travel time under 30 minutes' or 'group by neighborhood'." },
      { term: "Negative Preferences", description: "Explicitly stating what you hate (e.g., 'We hate crowded tourist traps') to prevent the AI from defaulting to popular/generic answers." },
      { term: "Tabular Synthesis", description: "Forcing the AI to synthesize its creative output into a rigid spreadsheet structure (Time, Activity, Cost)." }
    ],
    challenge: {
      mission: "Copy the 'Best' Mega-Prompt into ChatGPT or Claude. Then, change the 'Context' to match your own dream vacation and change the 'Constraints' to a $50/day backpacker budget. Watch the itinerary completely transform!",
      xp: 200,
      difficulty: "Intermediate",
      hint: "Try adding a constraint like: 'Include exactly one hidden gem known only to locals per day'."
    },
    quiz: {
      question: "In the Travel Planner prompt, why did we include the constraint 'Keep travel time between daily activities under 30 minutes'?",
      options: [
        "To force the AI to use Google Maps integration.",
        "Because LLMs naturally group things alphabetically.",
        "To force the AI to solve a spatial/logistical puzzle, preventing it from suggesting a morning activity in North Kyoto and a lunch activity in South Kyoto.",
        "To make the output shorter and save API tokens."
      ],
      correctAnswerIndex: 2,
      explanation: "Without logistical constraints, AI models often suggest great locations that are physically too far apart to do in one day. You must explicitly constrain the AI's spatial logic."
    },
    summary: "Don't just ask for ideas; ask for logistics. Use constraints to force the AI to act as a logistical planner, not just a brainstorming engine."
  };

  return <AILessonTemplate data={lessonData} />;
}
