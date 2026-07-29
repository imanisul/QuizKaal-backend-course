"use client";

const PROGRESS_KEY = "quizkaal_course_progress";
const DEFAULT_UNLOCKED = ["how-the-web-works"];

/**
 * Synchronously gets the array of unlocked lesson slugs from localStorage for optimistic UI.
 */
export function getUnlockedLessons() {
  if (typeof window === "undefined") return DEFAULT_UNLOCKED;
  try {
    const data = localStorage.getItem(PROGRESS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
    return DEFAULT_UNLOCKED;
  } catch (err) {
    console.error("Failed to parse progress from localStorage", err);
    return DEFAULT_UNLOCKED;
  }
}

/**
 * Checks if a specific lesson slug is unlocked.
 */
export function isLessonUnlocked(slug) {
  const unlocked = getUnlockedLessons();
  return unlocked.includes(slug);
}

/**
 * Synchronizes local progress with the backend API. Call this on app load.
 */
export async function syncProgress() {
  if (typeof window === "undefined") return;
  try {
    const res = await fetch("/api/progress");
    if (res.ok) {
      const data = await res.json();
      if (data.unlocked && Array.isArray(data.unlocked)) {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data.unlocked));
        window.dispatchEvent(new Event('quizkaal_progress_updated'));
      }
    }
  } catch (err) {
    console.error("Failed to sync progress with backend", err);
  }
}

/**
 * Unlocks a new lesson (optimistically) and saves it to the backend.
 */
export async function unlockLesson(slug) {
  if (typeof window === "undefined") return;
  const unlocked = getUnlockedLessons();
  
  // 1. Optimistic UI Update
  if (!unlocked.includes(slug)) {
    const newUnlocked = [...unlocked, slug];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newUnlocked));
    window.dispatchEvent(new Event('quizkaal_progress_updated'));
  }

  // 2. Persist to backend
  try {
    const res = await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    
    if (res.ok) {
      const data = await res.json();
      if (data.unlocked) {
        // Ensure perfect sync after server response
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(data.unlocked));
        window.dispatchEvent(new Event('quizkaal_progress_updated'));
      }
    }
  } catch (err) {
    console.error("Failed to save progress to backend", err);
  }
}

/**
 * Gets the total number of unlocked lessons.
 */
export function getUnlockedLessonsCount() {
  return getUnlockedLessons().length;
}
