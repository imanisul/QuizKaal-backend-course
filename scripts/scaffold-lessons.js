const fs = require('fs');
const path = require('path');

// We need to read roadmap.js as plain text because it uses ES6 exports
const roadmapContent = fs.readFileSync(path.join(__dirname, '../data/roadmap.js'), 'utf-8');

// A dirty but effective regex parser to extract lessons from roadmap
const lessons = [];
const lessonRegex = /\{\s*id:\s*\d+,\s*slug:\s*"([^"]+)",\s*emoji:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*summary:\s*"([^"]+)",\s*difficulty:\s*"([^"]+)",\s*time:\s*"([^"]+)"/g;

let match;
while ((match = lessonRegex.exec(roadmapContent)) !== null) {
  lessons.push({
    slug: match[1],
    emoji: match[2],
    title: match[3],
    summary: match[4],
    difficulty: match[5],
    time: match[6],
  });
}

console.log(`Found ${lessons.length} lessons in roadmap.js`);

const categories = ['backend', 'ai', 'projects'];

function getFilePath(slug) {
  for (const category of categories) {
    const p = path.join(__dirname, '../content', category, `${slug}.mdx`);
    if (fs.existsSync(p)) return p;
  }
  // Default to backend if not found
  return path.join(__dirname, '../content', 'backend', `${slug}.mdx`);
}

function generateMdx(lesson) {
  return `---
title: "${lesson.title}"
description: "${lesson.summary}"
time: "${lesson.time}"
difficulty: "${lesson.difficulty}"
---

# ${lesson.title}

<ConceptBlock type="idea" title="Overview">
  <p>${lesson.summary}. This lesson is actively being authored by our curriculum engineers. What follows is a structural preview of the concepts you will master.</p>
</ConceptBlock>

## 1. Core Concept

The core idea of **${lesson.title}** revolves around understanding its role in modern architecture. 

### Why it exists
Before this concept, developers faced significant hurdles in maintaining state, scaling applications, and ensuring data integrity. By mastering this, you unlock a new level of engineering capability.

## 2. Interactive Example

Here is a typical workflow demonstrating how it operates in a production environment:

\`\`\`javascript
// Example implementation of ${lesson.title}
function initializeSystem() {
  console.log("System initializing...");
  // Connect to services
  // Handle requests
  // Return response
  return { status: "Success", timestamp: Date.now() };
}

initializeSystem();
\`\`\`

## 3. Real-World Architecture

In a distributed environment, this component typically sits between the client and the core logic, or between the application and the database layer.

> **Pro Tip:** Always monitor memory consumption and latency when implementing this at scale!

## 4. Practice Exercise

**Task:** Implement a basic version of this concept using Node.js.
1. Set up your environment.
2. Write the initialization function.
3. Test edge cases (e.g., null values, network timeouts).

## 5. Interview Questions

Prepare for your next system design interview with these common questions:

1. **How does ${lesson.title} handle failure states?**
   *Answer:* It should implement retries, circuit breakers, and fallback mechanisms.
2. **When would you NOT use this?**
   *Answer:* If the system is extremely small and the overhead outweighs the benefits.

## 6. Quiz

<Quiz 
  question="What is the primary benefit of ${lesson.title}?"
  options={[
    "It slows down the application intentionally.",
    "It improves scalability and maintainability.",
    "It requires no configuration."
  ]}
  correctAnswerIndex={1}
  explanation="In modern engineering, the primary goal of adopting these patterns is to decouple logic, allowing for greater scalability and easier maintenance."
/>

## Summary

You've explored the structural foundations of **${lesson.title}**. You now understand why it exists, how to implement a basic version, and how to defend your architectural choices in an interview.

Proceed to the next lesson to continue your journey!
`;
}

let generatedCount = 0;

for (const lesson of lessons) {
  const filePath = getFilePath(lesson.slug);
  
  // Create dir if not exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Check if file is "empty" (less than 15 lines)
  let needsScaffolding = false;
  if (!fs.existsSync(filePath)) {
    needsScaffolding = true;
  } else {
    const lines = fs.readFileSync(filePath, 'utf-8').split('\\n').length;
    if (lines < 15) {
      needsScaffolding = true;
    }
  }

  if (needsScaffolding) {
    fs.writeFileSync(filePath, generateMdx(lesson));
    console.log(`Scaffolded: ${lesson.slug}.mdx`);
    generatedCount++;
  }
}

console.log(`\\nDone! Scaffolded ${generatedCount} lessons.`);
