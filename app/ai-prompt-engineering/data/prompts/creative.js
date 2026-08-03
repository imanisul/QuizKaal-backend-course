export const creativePrompts = [
  {
    id: "creative-story",
    title: "Interactive Story Co-Writer",
    category: "Creative",
    difficulty: "Advanced",
    bestTool: "Claude 3.5 Sonnet",
    description: "Write a story alongside the AI, taking turns to build the narrative.",
    prompt: "I want to write a sci-fi short story. Let's co-write it. You will act as my writing partner. I will set the scene and write the first paragraph. Then, you will write the next paragraph, introducing a plot twist. We will take turns. Keep your additions under 150 words and always leave the narrative hanging so I can pick it up. Do not finish the story until I explicitly say 'End Chapter'.\n\nHere is my first paragraph: [Start the story]",
    exampleOutput: "The neon lights flickered as Detective... But as he picked it up, a voice echoed in his mind. Your turn!",
    whenToUse: "When you have a cool concept but are stuck on how to develop the plot.",
    proTips: ["Give the AI specific stylistic constraints, like 'Write in the style of Edgar Allan Poe' or 'Focus heavily on sensory details.'"]
  },
  {
    id: "creative-character",
    title: "Deep Character Creator",
    category: "Creative",
    difficulty: "Intermediate",
    bestTool: "ChatGPT",
    description: "Flesh out three-dimensional characters for novels or D&D campaigns.",
    prompt: "I am writing a fantasy novel. Create a deeply fleshed-out character profile for the primary antagonist. They should not be purely evil; they must have a sympathetic, relatable motivation for their actions. Provide their Name, Age, Appearance, Backstory, Fatal Flaw, Greatest Fear, and a sample quote they would say when confronting the hero.",
    exampleOutput: "Name: General Kaelen...\nFatal Flaw: Believes only absolute control can prevent the chaos that killed his family...\nQuote: 'I don't enjoy this. I endure it. For them.'",
    whenToUse: "When building worlds for tabletop RPGs, screenplays, or books.",
    proTips: ["Ask the AI to generate a 'character interview' where you ask the AI questions and it responds in character."]
  },
  {
    id: "creative-lyrics",
    title: "Song Lyric Ghostwriter",
    category: "Creative",
    difficulty: "Beginner",
    bestTool: "Claude",
    description: "Generate emotional song lyrics following a specific rhyme scheme.",
    prompt: "Write the lyrics for an upbeat indie-pop song about [Topic, e.g., moving to a new city and feeling lost but excited]. Use an AABB rhyme scheme for the verses, and an ABAB rhyme scheme for the chorus. Include a bridge that slows down the tempo. Keep the imagery vivid and modern.",
    exampleOutput: "Verse 1:\nPacked the boxes, left the key (A)\nThe highway stretches out for me (A)\nNeon signs begin to blur (B)\nLeaving behind the girl I were (B)...",
    whenToUse: "When you have a melody in your head but lack the words.",
    proTips: ["Tell the AI what instruments are playing (e.g., 'A slow acoustic guitar builds into a heavy synth drop') so it matches the energy."]
  },
  {
    id: "creative-worldbuilding",
    title: "Fantasy Worldbuilding Guide",
    category: "Creative",
    difficulty: "Advanced",
    bestTool: "ChatGPT (GPT-4o)",
    description: "Create intricate magic systems, economies, and political structures.",
    prompt: "I am building a high-fantasy world. The unique premise is that [Premise, e.g., magic is a finite resource mined from the earth like coal, and it's running out]. \nPlease flesh out this world by detailing:\n1. The political tensions between the rich and poor.\n2. How the economy functions.\n3. Two distinct factions/guilds fighting for control.\n4. Three unique slang words or idioms people in this world use.",
    exampleOutput: "Political Tension: The aristocracy hoards the remaining 'Vein-Dust' in floating citadels, while...",
    whenToUse: "When starting a new tabletop RPG campaign or fantasy novel.",
    proTips: ["Use the AI to generate the 'rules' of your magic system to ensure there are logical limits and costs."]
  },
  {
    id: "creative-script",
    title: "YouTube Video Hook & Outline",
    category: "Creative",
    difficulty: "Intermediate",
    bestTool: "Claude",
    description: "Write high-retention scripts for YouTube videos.",
    prompt: "I am making a 10-minute YouTube video about [Topic]. The target audience is [Audience]. Write a script for the first 60 seconds (The Hook). It needs to immediately grab attention, state the value proposition, and introduce an 'open loop' that won't be answered until the end. \nThen, provide a bulleted outline for the rest of the video.",
    exampleOutput: "Hook (0:00-0:15): Did you know that 90% of... But there is one secret they aren't telling you. And it cost me $10,000 to learn it. Today, I'll show you exactly how to...",
    whenToUse: "When planning video content and battling low retention rates.",
    proTips: ["Ask the AI to include 'B-roll suggestions' (visuals to show on screen) alongside the audio script."]
  },
  {
    id: "creative-writer-block",
    title: "Writer's Block Breaker",
    category: "Creative",
    difficulty: "Beginner",
    bestTool: "ChatGPT",
    description: "Generate 10 completely random, bizarre writing prompts to get the juices flowing.",
    prompt: "I have severe writer's block. I need to write something to get my creativity flowing. Generate 10 highly specific, bizarre, and unique writing prompts. Do not give generic prompts like 'a man finds a magic ring'. Give me things like 'You are a health inspector assigned to review a restaurant run entirely by vampires'.",
    exampleOutput: "1. A barista realizes that the latte art they pour predicts the customer's death...\n2. You are the IT guy for a supervillain's secret lair...",
    whenToUse: "When you want to write but are paralyzed by a blank page.",
    proTips: ["Pick one prompt, set a timer for 10 minutes, and just write without editing."]
  },
  {
    id: "creative-dialogue",
    title: "Realistic Dialogue Polisher",
    category: "Creative",
    difficulty: "Intermediate",
    bestTool: "Claude 3.5 Sonnet",
    description: "Make stiff, robotic dialogue sound natural and human.",
    prompt: "The following dialogue feels stiff, robotic, and overly expositional. Please rewrite it to sound like a natural, tense conversation between two humans who have a complicated history. Add subtext (meaning hidden beneath the words) and physical action tags (e.g., crossing arms, looking away). \n\n[Paste Dialogue]",
    exampleOutput: "\"Why did you leave?\" she asked, her voice flat. She didn't look up from her coffee.\n\"You know why,\" he muttered, tracing the rim of his glass.",
    whenToUse: "When editing a draft of a novel or screenplay.",
    proTips: ["Claude is exceptionally good at writing human-sounding dialogue with subtle emotional undertones."]
  },
  {
    id: "creative-game",
    title: "Indie Game Concept Generator",
    category: "Creative",
    difficulty: "Beginner",
    bestTool: "ChatGPT",
    description: "Brainstorm unique mechanics and art styles for indie games.",
    prompt: "I want to develop a 2D indie game. I want to combine the gameplay loop of [Game 1, e.g., Stardew Valley] with the atmosphere of [Game 2, e.g., Dark Souls]. Pitch me 3 unique game concepts. For each, describe the core gameplay loop, the unique twist, and the visual art style.",
    exampleOutput: "Concept 1: Hollow Harvest\nGameplay: You are a farmer in purgatory...\nTwist: The crops you grow are used as weapons against... ",
    whenToUse: "When joining a Game Jam or starting a side project.",
    proTips: ["Ask the AI to write a 'GDD' (Game Design Document) outline based on the concept you choose."]
  }
];
