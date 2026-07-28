import fs from "fs";
import path from "path";

// Extremely simple script to read roadmap.js and generate missing .mdx files
// We'll just hardcode the generation logic here to quickly create placeholders

const contentDir = path.join(process.cwd(), "content");
const categories = ["backend", "ai", "projects"];

// We'll just generate a basic placeholder for all known slugs that don't exist
// The script doesn't strictly need roadmap.js, we can just grab the ones missing if we had the list.
// Let's just import roadmap.js
import { allLessons } from "../data/roadmap.js";

allLessons.forEach((lesson) => {
  // Guess category based on phase name roughly
  let category = "backend";
  if (lesson.phase.includes("AI") || lesson.phase.includes("Lang") || lesson.phase.includes("Model")) {
    category = "ai";
  } else if (lesson.phase.includes("Project")) {
    category = "projects";
  }

  const filePath = path.join(contentDir, category, `${lesson.slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    const content = `---
title: "${lesson.title}"
description: "${lesson.summary}"
phase: "${lesson.phase}"
difficulty: "${lesson.difficulty}"
---

## Module Overview

Welcome to **${lesson.title}**. This module covers ${lesson.summary.toLowerCase()}. 

<Callout type="info" title="Content Coming Soon">
This is a placeholder for the advanced deep-dive content. The interactive visualizations, code examples, and quizzes for this specific module are currently being authored and will be published shortly!
</Callout>

In the meantime, you can continue exploring the rest of the roadmap or review the previous lessons.
`;
    fs.writeFileSync(filePath, content);
    console.log(`Created placeholder for ${lesson.slug} in ${category}`);
  }
});
