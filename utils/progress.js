"use client";

import { progressEngine } from './progressEngine';

/**
 * LEGACY PROXY - This file now delegates all tracking to the new global progressEngine.
 * Kept for backward compatibility with older course modules.
 */

// We still export this so legacy code doesn't crash, but it delegates to progressEngine
const DEFAULT_UNLOCKED = ["how-the-web-works","http-https","websockets-grpc","rest-apis","graphql","mvc-architecture","sessions-vs-jwt","oauth-sso","api-security","event-loop","streams-buffers","worker-threads","sql-vs-nosql","indexing-transactions","redis-caching","rabbitmq","apache-kafka","monolithic-architecture","microservices","load-balancing-scaling","docker","kubernetes","ml-deep-learning","transformers-attention","prompt-engineering","langchain-core","vector-databases","naive-rag","hybrid-search","graph-rag","crag-self-rag","multimodal-rag","agentic-ai","langgraph","multi-agent-systems","mcp-architecture","ecommerce-backend","realtime-chat","enterprise-rag","multi-agent-platform", "1-what-is-mobile-engineering"];

export function getUnlockedLessons() {
  if (typeof window === "undefined") return DEFAULT_UNLOCKED;
  const state = progressEngine.getState();
  return Array.from(new Set([...DEFAULT_UNLOCKED, ...state.completedLessons]));
}

export function isLessonUnlocked(slug) {
  // If it's a completely new user, we might want to let them browse the old roadmap
  const unlocked = getUnlockedLessons();
  return unlocked.includes(slug) || progressEngine.isCompleted(slug);
}

export async function syncProgress() {
  if (typeof window === "undefined") return;
  progressEngine.notify();
}

export async function unlockLesson(slug) {
  if (typeof window === "undefined") return;
  // Fallback to "backend-engineering" as the default course context for legacy calls
  progressEngine.markComplete(slug, 'backend-engineering');
}

export function getUnlockedLessonsCount() {
  return getUnlockedLessons().length;
}
