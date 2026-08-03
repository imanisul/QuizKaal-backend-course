export const marketingPrompts = [
  {
    id: "mkt-seo-blog",
    title: "SEO-Optimized Blog Post",
    category: "Marketing & Business",
    difficulty: "Advanced",
    bestTool: "Claude 3.5 Sonnet",
    description: "Write a high-ranking, structured blog post with targeted keywords.",
    prompt: "Write a 1200-word SEO-optimized blog post about [Topic]. The primary keyword is '[Keyword 1]' and secondary keywords are '[Keyword 2]' and '[Keyword 3]'. \nRequirements:\n1. Catchy H1 Title.\n2. Engaging introduction hooking the reader.\n3. Proper H2 and H3 tags.\n4. Short paragraphs for readability.\n5. Include a strong Call to Action (CTA) at the end pushing to [Your Product].",
    exampleOutput: "# The Ultimate Guide to [Topic]\nAre you struggling with...?\n## Why [Keyword 1] Matters...",
    whenToUse: "When producing content marketing assets for your company blog.",
    proTips: ["Always run AI-generated blogs through an AI detector and humanize the text to avoid Google penalties."]
  },
  {
    id: "mkt-social",
    title: "1-Month Social Media Calendar",
    category: "Marketing & Business",
    difficulty: "Intermediate",
    bestTool: "ChatGPT",
    description: "Generate a full month of content ideas mapped out by day.",
    prompt: "I manage the [Instagram/LinkedIn/Twitter] account for a company that sells [Product/Service]. Our target audience is [Audience]. Please create a 4-week content calendar. \nFor each week, provide 3 post ideas (e.g., Monday, Wednesday, Friday). For each post, include:\n- The Post Theme (Educational, Promotional, Entertaining)\n- A brief description of the visual/image\n- The caption draft\n- 5 relevant hashtags.",
    exampleOutput: "Week 1 - Monday (Educational)\nVisual: Infographic showing...\nCaption: Did you know that...",
    whenToUse: "At the end of the month when planning next month's social strategy.",
    proTips: ["Ask the AI to format the output as a Markdown table so you can paste it directly into Excel or Notion."]
  },
  {
    id: "mkt-copywriting",
    title: "PAS Framework Copywriting",
    category: "Marketing & Business",
    difficulty: "Intermediate",
    bestTool: "ChatGPT",
    description: "Write high-converting ad copy using the Problem-Agitate-Solution framework.",
    prompt: "Act as an expert direct-response copywriter. Write a Facebook Ad for my product, [Product Name], which helps [Target Audience] achieve [Benefit]. Use the PAS (Problem, Agitate, Solution) framework. \nMake the 'Problem' relatable, the 'Agitate' emotional, and the 'Solution' irresistible. Keep it under 200 words and include a clear CTA.",
    exampleOutput: "Tired of spending hours on... (Problem)\nIt's frustrating when you lose your entire weekend just trying to... (Agitate)\nMeet [Product]... (Solution)",
    whenToUse: "When writing Facebook Ads, Google Ads, or landing page copy.",
    proTips: ["You can also ask it to use the AIDA framework (Attention, Interest, Desire, Action)."]
  },
  {
    id: "mkt-personas",
    title: "Buyer Persona Generator",
    category: "Marketing & Business",
    difficulty: "Advanced",
    bestTool: "Claude",
    description: "Create deeply detailed profiles of your ideal customers.",
    prompt: "I am launching a [Product Description, e.g., premium vegan protein powder]. Generate 3 distinct, highly detailed Buyer Personas for this product. For each persona, provide:\n1. Name, Age, Occupation, Income\n2. Primary Goals & Motivations\n3. Biggest Pain Points & Frustrations\n4. Where they hang out online (which social media, blogs, etc.)\n5. Their key objection to buying our product.",
    exampleOutput: "Persona 1: Fitness Fanatic Fiona (Age 28, Software Engineer)...\nGoals: Build lean muscle on a plant-based diet...",
    whenToUse: "During the market research phase of a new startup or product launch.",
    proTips: ["Give the personas to the AI later and ask: 'Write an email specifically targeting Persona 2.'"]
  },
  {
    id: "mkt-product-desc",
    title: "E-commerce Product Description",
    category: "Marketing & Business",
    difficulty: "Beginner",
    bestTool: "ChatGPT",
    description: "Write persuasive, SEO-friendly descriptions for Shopify or Amazon.",
    prompt: "Write a persuasive product description for my e-commerce store. The product is [Product Name]. Its key features are [Feature 1, Feature 2, Feature 3]. The target audience is [Audience]. Write a catchy 2-sentence hook, followed by a bulleted list of 5 benefits (focus on the *benefit*, not just the feature).",
    exampleOutput: "Upgrade your morning routine with... \n- **All-Day Energy**: Never experience a crash again thanks to...",
    whenToUse: "When adding new inventory to your online store.",
    proTips: ["Ensure you tell the AI to focus on 'Benefits over Features' (e.g., Feature: 4000mAh battery. Benefit: Lasts all weekend without a charge)."]
  },
  {
    id: "mkt-newsletter",
    title: "Weekly Newsletter Outline",
    category: "Marketing & Business",
    difficulty: "Beginner",
    bestTool: "Claude",
    description: "Draft an engaging email newsletter that people actually want to read.",
    prompt: "I run a weekly newsletter for [Industry/Niche]. The goal of this week's newsletter is to educate them about [Topic] and subtly promote our [Product/Service]. Outline the newsletter. Include a catchy subject line (give me 3 options), an engaging opening hook, a main content section with 3 actionable tips, and a soft-sell CTA.",
    exampleOutput: "Subject Options:\n1. 🛑 Stop making this [Topic] mistake...\nHook: I used to struggle with...",
    whenToUse: "When staring at a blank screen on a Friday afternoon before the newsletter goes out.",
    proTips: ["Provide the AI with your last 3 newsletters so it matches your brand voice perfectly."]
  },
  {
    id: "mkt-competitor",
    title: "Competitor Analysis Outline",
    category: "Marketing & Business",
    difficulty: "Advanced",
    bestTool: "Perplexity AI",
    description: "Analyze the strengths and weaknesses of a competitor's strategy.",
    prompt: "Act as a Marketing Strategist. Analyze my top competitor, [Competitor Company Name]. Provide a breakdown of their likely marketing strategy. What are their core value propositions? What marketing channels are they dominating (e.g., SEO, TikTok, Ads)? Finally, identify 2 weaknesses or gaps in their strategy that my company could exploit.",
    exampleOutput: "Value Proposition: They focus heavily on 'ease of use'...\nWeaknesses: 1. Their customer support reviews are poor. You can capitalize by...",
    whenToUse: "When building a go-to-market strategy or pitching to investors.",
    proTips: ["Use Perplexity AI or ChatGPT with Web Search for this, as it needs to browse the live internet for accurate competitor data."]
  },
  {
    id: "mkt-video-script",
    title: "TikTok / Reels Video Script",
    category: "Marketing & Business",
    difficulty: "Intermediate",
    bestTool: "ChatGPT",
    description: "Write a high-retention script for short-form video content.",
    prompt: "Write a 30-second script for a [TikTok/Instagram Reel] promoting [Product/Idea]. The target audience is Gen-Z/Millennials. \nInclude visual/action cues in brackets [like this]. \nThe script must start with a strong 3-second hook to stop the scroll, provide rapid-fire value, and end with a clear CTA to check the link in bio.",
    exampleOutput: "[Visual: You pointing aggressively at the camera]\nAudio: Stop scrolling if you want to fix your...\n[Visual: Cut to product shot]...",
    whenToUse: "When batch-creating content for social media marketing.",
    proTips: ["Ask the AI to 'Keep the pacing extremely fast, aiming for a new visual cue every 3 seconds'."]
  }
];
