/**
 * Unit Tests for ProgressEngine — the core progress tracking system in QuizKaal.
 *
 * Tests cover: completion tracking, course stats, streak logic,
 * lesson access control, XP calculation, and duplicate prevention.
 *
 * ProgressEngine uses localStorage, so we mock it via jsdom (Vitest environment).
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// We need to mock the React hooks since ProgressEngine imports useState/useEffect
// but the class itself doesn't use them — only the hook functions do.
vi.mock('react', () => ({
  useState: vi.fn((init) => [typeof init === 'function' ? init() : init, vi.fn()]),
  useEffect: vi.fn(),
  useCallback: vi.fn((fn) => fn),
  useMemo: vi.fn((fn) => fn()),
}));

// Import after mocking React
const { progressEngine } = await import('@/utils/progressEngine');

describe('ProgressEngine', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('getState()', () => {
    it('should return default state when localStorage is empty', () => {
      const state = progressEngine.getState();
      expect(state.completedLessons).toEqual([]);
      expect(state.courseProgress).toEqual({});
      expect(state.xp).toBe(0);
    });

    it('should return saved state from localStorage', () => {
      const savedState = {
        completedLessons: ['lesson-1', 'lesson-2'],
        courseProgress: { 'test-course': { completedLessons: ['lesson-1'] } },
        xp: 100,
      };
      localStorage.setItem('quizkaal_global_progress', JSON.stringify(savedState));

      const state = progressEngine.getState();
      expect(state.completedLessons).toEqual(['lesson-1', 'lesson-2']);
      expect(state.xp).toBe(100);
    });

    it('should handle corrupted localStorage data gracefully', () => {
      localStorage.setItem('quizkaal_global_progress', 'INVALID JSON{{{');

      const state = progressEngine.getState();
      expect(state.completedLessons).toEqual([]);
      expect(state.courseProgress).toEqual({});
      expect(state.xp).toBe(0);
    });

    it('should handle partial/malformed saved state', () => {
      localStorage.setItem('quizkaal_global_progress', JSON.stringify({
        completedLessons: 'not-an-array',
        xp: 'not-a-number',
      }));

      const state = progressEngine.getState();
      expect(Array.isArray(state.completedLessons)).toBe(true);
      expect(state.completedLessons).toEqual([]);
      expect(state.xp).toBe(0);
    });
  });

  describe('markComplete()', () => {
    it('should mark a lesson as completed globally', () => {
      progressEngine.markComplete('http-https', 'backend-engineering');

      const state = progressEngine.getState();
      expect(state.completedLessons).toContain('http-https');
    });

    it('should add XP on completion (default 50)', () => {
      progressEngine.markComplete('rest-apis', 'backend-engineering');

      const state = progressEngine.getState();
      expect(state.xp).toBe(50);
    });

    it('should add custom XP amount', () => {
      progressEngine.markComplete('docker', 'backend-engineering', 100);

      const state = progressEngine.getState();
      expect(state.xp).toBe(100);
    });

    it('should prevent duplicate completions', () => {
      progressEngine.markComplete('graphql', 'backend-engineering');
      progressEngine.markComplete('graphql', 'backend-engineering');

      const state = progressEngine.getState();
      const count = state.completedLessons.filter(l => l === 'graphql').length;
      expect(count).toBe(1);
      expect(state.xp).toBe(50); // Only counted once
    });

    it('should track per-course completion', () => {
      progressEngine.markComplete('rest-apis', 'backend-engineering');
      progressEngine.markComplete('module-0-welcome', 'ai-prompt-engineering');

      const state = progressEngine.getState();
      expect(state.courseProgress['backend-engineering'].completedLessons).toContain('rest-apis');
      expect(state.courseProgress['ai-prompt-engineering'].completedLessons).toContain('module-0-welcome');
    });

    it('should work without a courseId', () => {
      progressEngine.markComplete('some-lesson');

      const state = progressEngine.getState();
      expect(state.completedLessons).toContain('some-lesson');
    });
  });

  describe('isCompleted()', () => {
    it('should return true for completed lessons', () => {
      progressEngine.markComplete('event-loop', 'backend-engineering');

      expect(progressEngine.isCompleted('event-loop')).toBe(true);
    });

    it('should return false for uncompleted lessons', () => {
      expect(progressEngine.isCompleted('kubernetes')).toBe(false);
    });
  });

  describe('canAccessLesson()', () => {
    const allLessons = ['lesson-1', 'lesson-2', 'lesson-3', 'lesson-4'];

    it('should always allow access to the first lesson', () => {
      expect(progressEngine.canAccessLesson('test-course', 'lesson-1', allLessons)).toBe(true);
    });

    it('should block access when previous lesson is not completed', () => {
      expect(progressEngine.canAccessLesson('test-course', 'lesson-2', allLessons)).toBe(false);
    });

    it('should allow access when previous lesson is completed', () => {
      progressEngine.markComplete('lesson-1', 'test-course');

      expect(progressEngine.canAccessLesson('test-course', 'lesson-2', allLessons)).toBe(true);
    });

    it('should always allow access to already-completed lessons (review mode)', () => {
      progressEngine.markComplete('lesson-1', 'test-course');
      progressEngine.markComplete('lesson-2', 'test-course');

      // Even without lesson-3 completed, lesson-1 should be accessible for review
      expect(progressEngine.canAccessLesson('test-course', 'lesson-1', allLessons)).toBe(true);
    });

    it('should allow access to lessons not in the allLessonIds array', () => {
      expect(progressEngine.canAccessLesson('test-course', 'unknown-lesson', allLessons)).toBe(true);
    });

    it('should handle empty allLessonIds', () => {
      expect(progressEngine.canAccessLesson('test-course', 'lesson-1', [])).toBe(true);
    });
  });

  describe('getCourseStats()', () => {
    // Use unique slugs to avoid state leakage from singleton's duplicate prevention
    const statsLessons = ['stats-lesson-1', 'stats-lesson-2', 'stats-lesson-3', 'stats-lesson-4'];

    it('should return not-started for empty course', () => {
      const stats = progressEngine.getCourseStats('stats-course', statsLessons);
      expect(stats.status).toBe('not-started');
      expect(stats.completed).toBe(0);
      expect(stats.total).toBe(4);
      expect(stats.percentage).toBe(0);
    });

    it('should return in-progress after completing some lessons', () => {
      progressEngine.markComplete('stats-lesson-1', 'stats-course');
      progressEngine.markComplete('stats-lesson-2', 'stats-course');

      const stats = progressEngine.getCourseStats('stats-course', statsLessons);
      expect(stats.status).toBe('in-progress');
      expect(stats.completed).toBe(2);
      expect(stats.percentage).toBe(50);
    });

    it('should return completed when all lessons done', () => {
      statsLessons.forEach(l => progressEngine.markComplete(l, 'stats-course'));

      const stats = progressEngine.getCourseStats('stats-course', statsLessons);
      expect(stats.status).toBe('completed');
      expect(stats.completed).toBe(4);
      expect(stats.percentage).toBe(100);
    });

    it('should identify the current (first uncompleted) lesson', () => {
      progressEngine.markComplete('current-a', 'current-course');

      const stats = progressEngine.getCourseStats('current-course', ['current-a', 'current-b', 'current-c']);
      expect(stats.currentLessonId).toBe('current-b');
    });

    it('should handle empty allLessonIds', () => {
      const stats = progressEngine.getCourseStats('empty-course', []);
      expect(stats.total).toBe(0);
      expect(stats.percentage).toBe(0);
      expect(stats.status).toBe('not-started');
    });
  });

  describe('isLessonCompletedInCourse()', () => {
    it('should return true if lesson is completed in the specific course', () => {
      progressEngine.markComplete('rest-apis', 'backend-engineering');
      expect(progressEngine.isLessonCompletedInCourse('backend-engineering', 'rest-apis')).toBe(true);
    });

    it('should return false if lesson is not completed in that course', () => {
      progressEngine.markComplete('rest-apis', 'backend-engineering');
      expect(progressEngine.isLessonCompletedInCourse('ai-prompt-engineering', 'rest-apis')).toBe(false);
    });

    it('should return false for unknown course', () => {
      expect(progressEngine.isLessonCompletedInCourse('unknown-course', 'rest-apis')).toBe(false);
    });
  });

  describe('getLessonStatus()', () => {
    it('should return "completed" for completed lessons', () => {
      const lessons = ['ls-done-1', 'ls-done-2', 'ls-done-3'];
      progressEngine.markComplete('ls-done-1', 'ls-done-course');
      expect(progressEngine.getLessonStatus('ls-done-course', 'ls-done-1', lessons)).toBe('completed');
    });

    it('should return "locked" for inaccessible lessons', () => {
      // lesson-b is the 2nd lesson, and lesson-a is NOT completed → lesson-b is locked
      const lessons = ['ls-lock-a', 'ls-lock-b', 'ls-lock-c'];
      expect(progressEngine.getLessonStatus('ls-lock-course', 'ls-lock-b', lessons)).toBe('locked');
    });

    it('should return "current" for the first uncompleted accessible lesson', () => {
      const lessons = ['ls-cur-1', 'ls-cur-2', 'ls-cur-3'];
      expect(progressEngine.getLessonStatus('ls-cur-course', 'ls-cur-1', lessons)).toBe('current');
    });
  });

  describe('Pub/Sub', () => {
    it('should notify listeners when state changes', () => {
      const listener = vi.fn();
      progressEngine.subscribe(listener);

      progressEngine.markComplete('test-lesson', 'test-course');

      // markComplete calls saveState which calls notify
      expect(listener).toHaveBeenCalled();
    });

    it('should allow unsubscribing', () => {
      const listener = vi.fn();
      const unsubscribe = progressEngine.subscribe(listener);

      unsubscribe();
      progressEngine.notify();

      expect(listener).not.toHaveBeenCalled();
    });
  });
});
