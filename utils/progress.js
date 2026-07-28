"use client";

const PROGRESS_KEY = "quizkaal_course_progress";

// By default, the first lesson is always unlocked
const DEFAULT_UNLOCKED = ["how-the-web-works"];

/**
 * Gets the array of unlocked lesson slugs from localStorage.
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
    // Set default if empty or invalid
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
 * Unlocks a new lesson by adding its slug to the localStorage array.
 */
export function unlockLesson(slug) {
  if (typeof window === "undefined") return;
  const unlocked = getUnlockedLessons();
  
  if (!unlocked.includes(slug)) {
    const newUnlocked = [...unlocked, slug];
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(newUnlocked));
    
    // Dispatch a custom event so other components can reactively update
    window.dispatchEvent(new Event('quizkaal_progress_updated'));
  }
}

/**
 * Gets the total number of unlocked lessons.
 */
export function getUnlockedLessonsCount() {
  return getUnlockedLessons().length;
}
