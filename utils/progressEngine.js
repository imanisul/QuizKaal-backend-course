"use client";

import { useState, useEffect, useCallback, useMemo } from 'react';

const PROGRESS_KEY = "quizkaal_global_progress";

const DEFAULT_STATE = {
  completedLessons: [],   // Global flat array of all completed lesson IDs across all courses
  courseProgress: {},      // { courseId: { completedLessons: [], streak, lastCompleted, currentLessonId } }
  xp: 0
};

/**
 * ProgressEngine — The single source of truth for all course progress on QuizKaal.
 *
 * Every course (Backend, React, System Design, AI, Java, Python, etc.) writes
 * to the SAME localStorage entry. The UI reads from this engine via the
 * `useProgress()` hook, which auto-updates on every state change.
 */
class ProgressEngine {
  constructor() {
    this.listeners = new Set();
  }

  /* ─── Read / Write ────────────────────────────── */

  getState() {
    if (typeof window === "undefined") return { ...DEFAULT_STATE };
    try {
      const data = localStorage.getItem(PROGRESS_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
          courseProgress: parsed.courseProgress && typeof parsed.courseProgress === 'object' ? parsed.courseProgress : {},
          xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
        };
      }
      return { ...DEFAULT_STATE };
    } catch (e) {
      console.error("[ProgressEngine] Failed to read progress", e);
      return { ...DEFAULT_STATE };
    }
  }

  saveState(state) {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("[ProgressEngine] Failed to save progress", e);
    }
    this.notify();
  }

  /* ─── Lesson Status ───────────────────────────── */

  /** Returns true if a specific lesson is completed globally. */
  isCompleted(lessonId, stateObj = null) {
    const state = stateObj || this.getState();
    return state.completedLessons.includes(lessonId);
  }

  /** Returns true if a specific lesson is completed within a specific course. */
  isLessonCompletedInCourse(courseId, lessonId, stateObj = null) {
    const state = stateObj || this.getState();
    const course = state.courseProgress[courseId];
    if (!course) return false;
    return Array.isArray(course.completedLessons) && course.completedLessons.includes(lessonId);
  }

  /* ─── Mark Complete ───────────────────────────── */

  /**
   * Marks a lesson as complete for a specific course.
   * @param {string} lessonId  — The lesson slug or ID.
   * @param {string} courseId  — The course this lesson belongs to.
   * @param {number} xpReward — XP to award (default 50).
   */
  markComplete(lessonId, courseId = null, xpReward = 50) {
    const state = this.getState();

    // Prevent duplicate completions
    if (state.completedLessons.includes(lessonId)) return;

    // Global list
    state.completedLessons.push(lessonId);
    state.xp += xpReward;

    // Per-course tracking
    if (courseId) {
      if (!state.courseProgress[courseId]) {
        state.courseProgress[courseId] = {
          completedLessons: [],
          streak: 0,
          lastCompleted: null,
          currentLessonId: null,
        };
      }

      const courseData = state.courseProgress[courseId];

      if (!courseData.completedLessons) courseData.completedLessons = [];
      if (!courseData.completedLessons.includes(lessonId)) {
        courseData.completedLessons.push(lessonId);
      }

      // Streak logic
      const now = new Date();
      if (courseData.lastCompleted) {
        const last = new Date(courseData.lastCompleted);
        const diffDays = Math.floor((now - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          courseData.streak = (courseData.streak || 0) + 1;
        } else if (diffDays > 1) {
          courseData.streak = 1;
        }
        // Same day → keep streak as is
      } else {
        courseData.streak = 1;
      }
      courseData.lastCompleted = now.toISOString();
    }

    this.saveState(state);

    // Also dispatch the legacy event for the old progress.js consumers (roadmap page, etc.)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event('quizkaal_progress_updated'));
    }
  }

  /* ─── Locking Logic ───────────────────────────── */

  /**
   * Returns true if the student can access a given lesson.
   * Rules:
   *   - First lesson of any course → always accessible.
   *   - Otherwise → previous lesson must be completed.
   *   - Previously completed lessons → always reviewable.
   *
   * @param {string} courseId
   * @param {string} lessonId
   * @param {string[]} allLessonIds — Ordered array of all lesson IDs in the course.
   */
  canAccessLesson(courseId, lessonId, allLessonIds, stateObj = null) {
    if (!allLessonIds || allLessonIds.length === 0) return true;

    const idx = allLessonIds.indexOf(lessonId);
    if (idx === -1) return true; // Not in this course's list → don't block
    if (idx === 0) return true;  // First lesson → always unlocked

    // Already completed → allow review
    if (this.isCompleted(lessonId, stateObj)) return true;

    // Previous lesson must be completed
    const prevLessonId = allLessonIds[idx - 1];
    return this.isCompleted(prevLessonId, stateObj);
  }

  /* ─── Course-level Queries ────────────────────── */

  /**
   * Returns a summary object for a course.
   * @param {string} courseId
   * @param {string[]} allLessonIds — Ordered array of lesson IDs.
   * @returns {{ completed: number, total: number, percentage: number, status: string, currentLessonId: string|null, nextLessonId: string|null, streak: number }}
   */
  getCourseStats(courseId, allLessonIds = [], stateObj = null) {
    const total = allLessonIds.length;
    if (total === 0) return { completed: 0, total: 0, percentage: 0, status: 'not-started', currentLessonId: null, nextLessonId: null, streak: 0 };

    const state = stateObj || this.getState();
    const courseData = state.courseProgress[courseId] || {};
    const courseCompletedLessons = Array.isArray(courseData.completedLessons) ? courseData.completedLessons : [];

    // Count only lessons that are actually in this course
    const completed = allLessonIds.filter(id => courseCompletedLessons.includes(id)).length;
    const percentage = Math.min(100, Math.round((completed / total) * 100));

    // Determine status
    let status = 'not-started';
    if (completed === total) {
      status = 'completed';
    } else if (completed > 0) {
      status = 'in-progress';
    }

    // Current lesson = first uncompleted lesson
    let currentLessonId = null;
    let nextLessonId = null;
    for (let i = 0; i < allLessonIds.length; i++) {
      if (!courseCompletedLessons.includes(allLessonIds[i])) {
        currentLessonId = allLessonIds[i];
        nextLessonId = i + 1 < allLessonIds.length ? allLessonIds[i + 1] : null;
        break;
      }
    }

    return {
      completed,
      total,
      percentage,
      status,
      currentLessonId,
      nextLessonId,
      streak: courseData.streak || 0,
    };
  }

  /**
   * Returns the status of a lesson within a course.
   * @param {string} courseId
   * @param {string} lessonId
   * @param {string[]} allLessonIds
   * @param {Object} stateObj - Optional safe state to avoid hydration mismatch
   * @returns {'completed' | 'current' | 'locked' | 'not-started'}
   */
  getLessonStatus(courseId, lessonId, allLessonIds = [], stateObj = null) {
    if (this.isCompleted(lessonId, stateObj)) return 'completed';
    if (!this.canAccessLesson(courseId, lessonId, allLessonIds, stateObj)) return 'locked';

    // It's accessible but not completed — check if it's the "current" one
    const stats = this.getCourseStats(courseId, allLessonIds);
    if (stats.currentLessonId === lessonId) return 'current';

    return 'not-started';
  }

  /* ─── Pub/Sub ─────────────────────────────────── */

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    const state = this.getState();
    this.listeners.forEach(l => {
      try { l(state); } catch (e) { /* swallow listener errors */ }
    });
  }
}

/** Singleton instance shared across the app. */
export const progressEngine = new ProgressEngine();

/* ═══════════════════════════════════════════════════
   React Hooks
   ═══════════════════════════════════════════════════ */

/**
 * Hook: Subscribe to the global progress state.
 * Re-renders whenever any lesson is marked complete.
 */
export function useProgress() {
  const [state, setState] = useState(() => {
    // ALWAYS return DEFAULT_STATE initially to prevent React Hydration mismatch between Server and Client
    return { ...DEFAULT_STATE };
  });

  useEffect(() => {
    // Hydrate on mount (runs only on client after initial render)
    setState(progressEngine.getState());

    const handleUpdate = () => setState(progressEngine.getState());

    window.addEventListener('quizkaal_progress_updated', handleUpdate);
    const unsubscribe = progressEngine.subscribe(handleUpdate);

    return () => {
      window.removeEventListener('quizkaal_progress_updated', handleUpdate);
      unsubscribe();
    };
  }, []);

  return state;
}

/**
 * Hook: Get course-specific stats that auto-update.
 * @param {string} courseId
 * @param {string[]} allLessonIds — Ordered lesson IDs for this course.
 */
export function useCourseProgress(courseId, allLessonIds) {
  const state = useProgress();

  return useMemo(() => {
    return progressEngine.getCourseStats(courseId, allLessonIds, state);
  }, [state, courseId, allLessonIds]);
}
