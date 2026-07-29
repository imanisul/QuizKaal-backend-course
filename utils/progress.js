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
    // If empty or doesn't exist, initialize it
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(DEFAULT_UNLOCKED));
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
 * Synchronizes local progress (No-op now, purely for backwards compatibility).
 */
export async function syncProgress() {
  if (typeof window === "undefined") return;
  // Make sure it's initialized
  getUnlockedLessons();
  window.dispatchEvent(new Event('quizkaal_progress_updated'));
}

/**
 * Unlocks a new lesson and instantly saves it to localStorage.
 */
export async function unlockLesson(slug) {
  if (typeof window === "undefined") return;
  const unlocked = getUnlockedLessons();
  
  if (!unlocked.includes(slug)) {
    const newUnlocked = [...unlocked, slug];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newUnlocked));
    window.dispatchEvent(new Event('quizkaal_progress_updated'));
  }
}

/**
 * Gets the total number of unlocked lessons.
 */
export function getUnlockedLessonsCount() {
  return getUnlockedLessons().length;
}
