#!/bin/bash

function make_layout() {
  local dir=$1
  local title=$2
  local desc=$3
  local keywords=$4
  local url="https://quizkaal.in/${dir}"

  cat << INNER_EOF > "app/${dir}/layout.js"
import { generateSEOMetadata, generateSchema } from "@/lib/seo";
import Script from "next/script";

export const metadata = generateSEOMetadata({
  title: "${title}",
  description: "${desc}",
  url: "${url}",
  keywords: [${keywords}]
});

export default function Layout({ children }) {
  const courseSchema = generateSchema("Course", {
    title: "${title}",
    description: "${desc}",
    time: "PT40H"
  });

  return (
    <>
      <Script id="schema-course-${dir}" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      {children}
    </>
  );
}
INNER_EOF
}

make_layout "backend-engineering" "Backend Engineering Course | Learn Node.js, APIs & System Design | QuizKaal" "Master Backend Engineering with interactive lessons, Node.js projects, system design, interview preparation, and coding challenges on QuizKaal." '"backend engineering course", "learn backend engineering", "nodejs course", "express js tutorial"'
make_layout "system-design" "System Design Course | Master Scalable System Design | QuizKaal" "Learn System Design principles, scalable architectures, load balancing, caching, and microservices for top tech interviews on QuizKaal." '"system design course", "scalability", "load balancer", "caching", "interview preparation"'
make_layout "react-course" "React Mastery Course | Learn React from Beginner to Advanced | QuizKaal" "Master React.js, hooks, components, state management, and modern frontend development with interactive projects on QuizKaal." '"react course", "react tutorial", "hooks", "components", "state"'
make_layout "mobile-course" "Mobile Engineering Course | React Native & App Development | QuizKaal" "Learn Mobile Engineering and React Native to build cross-platform iOS and Android applications with interactive guides on QuizKaal." '"mobile engineering course", "react native course", "ios", "android"'
make_layout "ai-prompt-engineering" "AI Prompt Engineering Course | ChatGPT, Claude & Gemini Mastery | QuizKaal" "Master AI Prompt Engineering with ChatGPT, Claude, and Gemini. Learn to construct powerful, production-ready prompts on QuizKaal." '"prompt engineering course", "chatgpt course", "claude ai course", "gemini ai prompts"'
make_layout "genai" "GenAI Mastery | Build Generative AI Applications | QuizKaal" "Learn how to build powerful Generative AI applications, integrate LLMs, and master LangChain on QuizKaal." '"genai course", "generative ai", "llm integration", "langchain"'
make_layout "agentic-ai" "Agentic AI Course | Build Autonomous AI Agents | QuizKaal" "Master Agentic AI and multi-agent systems. Learn to build autonomous agents that plan, reason, and use tools with LangGraph on QuizKaal." '"agentic ai", "langgraph", "autonomous agents", "multi-agent systems"'
make_layout "cicd" "CI/CD Pipeline Course | Docker, GitHub Actions & Deployment | QuizKaal" "Learn CI/CD automation, Docker containerization, GitHub Actions, and production deployments in this interactive course on QuizKaal." '"cicd pipeline course", "docker tutorial", "github actions tutorial", "deployment"'
make_layout "python-course" "Python Engineering Course | Master Python for Backend | QuizKaal" "Learn Python programming from scratch. Master syntax, OOP, and data structures for backend engineering on QuizKaal." '"python course", "python tutorial", "learn python"'
make_layout "java-course" "Java Engineering Course | Core Java to Spring Boot | QuizKaal" "Master Java Engineering. Learn Core Java, Object-Oriented Programming, and enterprise backend development with Spring Boot on QuizKaal." '"java course", "java tutorial", "spring boot"'
make_layout "cpp-course" "C++ Engineering Course | Master C++ & Memory Management | QuizKaal" "Learn C++ programming, memory management, pointers, and performance optimization on QuizKaal." '"c++ course", "cpp tutorial", "memory management"'
make_layout "cloud-engineering" "Cloud Engineering Course | AWS, GCP & Azure | QuizKaal" "Master Cloud Engineering. Learn to deploy and manage scalable infrastructure on AWS, Google Cloud, and Azure." '"cloud engineering course", "aws tutorial", "gcp"'
make_layout "interview" "Interview Preparation | Coding & Technical Interview Questions | QuizKaal" "Ace your technical interviews with QuizKaal. Practice coding interview questions, system design problems, and placement preparation." '"coding interview preparation", "technical interview questions", "placement preparation"'
make_layout "playground" "Playground | Learn Programming Through Interactive Games | QuizKaal" "Learn programming concepts through interactive games and visual puzzles in the QuizKaal Playground." '"coding playground", "interactive programming games", "dsa practice"'
make_layout "roadmap" "Engineering Roadmap | Your Path to Senior Engineer | QuizKaal" "Follow the comprehensive engineering roadmap on QuizKaal to progress from beginner to senior software engineer." '"software engineering course", "computer science courses"'

chmod +x generate_layouts.sh
./generate_layouts.sh
