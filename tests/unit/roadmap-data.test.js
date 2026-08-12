/**
 * Unit Tests for Roadmap Data — the single source of truth for all courses.
 *
 * Tests cover: data integrity, slug uniqueness, required fields,
 * URL safety, helper function correctness.
 */

import { describe, it, expect } from 'vitest';
import { roadmap, allLessons, getLessonBySlug, getAdjacentLessons } from '@/data/roadmap';

describe('Roadmap Data Integrity', () => {
  it('should export roadmap as a non-empty array', () => {
    expect(Array.isArray(roadmap)).toBe(true);
    expect(roadmap.length).toBeGreaterThan(0);
  });

  it('should export allLessons as a non-empty flat array', () => {
    expect(Array.isArray(allLessons)).toBe(true);
    expect(allLessons.length).toBeGreaterThan(0);
  });

  describe('Phase-level validation', () => {
    it.each(roadmap.map((phase, i) => [i, phase]))(
      'phase[%i] "%s" should have required fields',
      (index, phase) => {
        expect(phase.courseId).toBeTruthy();
        expect(typeof phase.courseId).toBe('string');
        expect(phase.phase).toBeTruthy();
        expect(typeof phase.phase).toBe('string');
        expect(phase.emoji).toBeTruthy();
        expect(phase.description).toBeTruthy();
        expect(Array.isArray(phase.lessons)).toBe(true);
        expect(phase.lessons.length).toBeGreaterThan(0);
      }
    );
  });

  describe('Lesson-level validation', () => {
    it('every lesson should have a slug', () => {
      for (const lesson of allLessons) {
        expect(lesson.slug, `Lesson "${lesson.title}" missing slug`).toBeTruthy();
        expect(typeof lesson.slug).toBe('string');
      }
    });

    it('every lesson should have a title', () => {
      for (const lesson of allLessons) {
        expect(lesson.title, `Lesson with slug "${lesson.slug}" missing title`).toBeTruthy();
        expect(typeof lesson.title).toBe('string');
      }
    });

    it('every lesson should have a numeric id', () => {
      for (const lesson of allLessons) {
        expect(typeof lesson.id, `Lesson "${lesson.slug}" has non-numeric id`).toBe('number');
      }
    });

    it('every lesson should have a summary', () => {
      for (const lesson of allLessons) {
        expect(lesson.summary, `Lesson "${lesson.slug}" missing summary`).toBeTruthy();
      }
    });

    it('every lesson should have a difficulty level', () => {
      const validDifficulties = ['beginner', 'intermediate', 'advanced', 'expert'];
      for (const lesson of allLessons) {
        expect(
          validDifficulties.includes(lesson.difficulty),
          `Lesson "${lesson.slug}" has invalid difficulty "${lesson.difficulty}"`
        ).toBe(true);
      }
    });

    it('every lesson should have a time estimate', () => {
      for (const lesson of allLessons) {
        expect(lesson.time, `Lesson "${lesson.slug}" missing time estimate`).toBeTruthy();
      }
    });
  });

  describe('Slug uniqueness and URL safety', () => {
    it('should have no duplicate slugs within the same courseId', () => {
      const courseSlugMap = {};
      for (const lesson of allLessons) {
        const key = `${lesson.courseId}:${lesson.slug}`;
        expect(courseSlugMap[key], `Duplicate slug "${lesson.slug}" in course "${lesson.courseId}"`).toBeUndefined();
        courseSlugMap[key] = true;
      }
    });

    it('all slugs should be URL-safe', () => {
      const urlSafeRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
      for (const lesson of allLessons) {
        // Allow single-character slugs too
        const isValid = urlSafeRegex.test(lesson.slug) || /^[a-z0-9]$/.test(lesson.slug);
        expect(isValid, `Slug "${lesson.slug}" is not URL-safe`).toBe(true);
      }
    });

    it('no slugs should contain spaces or uppercase', () => {
      for (const lesson of allLessons) {
        expect(lesson.slug).toBe(lesson.slug.toLowerCase());
        expect(lesson.slug.includes(' ')).toBe(false);
      }
    });
  });

  describe('Course structure', () => {
    it('should have at least one backend-engineering phase', () => {
      const bePhases = roadmap.filter(p => p.courseId === 'backend-engineering');
      expect(bePhases.length).toBeGreaterThan(0);
    });

    it('each phase should have a gradient defined', () => {
      for (const phase of roadmap) {
        expect(phase.gradient, `Phase "${phase.phase}" missing gradient`).toBeTruthy();
      }
    });
  });
});

describe('getLessonBySlug()', () => {
  it('should return the correct lesson for a valid slug', () => {
    const lesson = getLessonBySlug('http-https');
    expect(lesson).not.toBeNull();
    expect(lesson.slug).toBe('http-https');
    expect(lesson.title).toBeTruthy();
  });

  it('should return null for non-existent slug', () => {
    const lesson = getLessonBySlug('this-lesson-does-not-exist');
    expect(lesson).toBeNull();
  });

  it('should include phase and courseId in the result', () => {
    const lesson = getLessonBySlug('rest-apis');
    expect(lesson).not.toBeNull();
    expect(lesson.phase).toBeTruthy();
    expect(lesson.courseId).toBe('backend-engineering');
  });
});

describe('getAdjacentLessons()', () => {
  it('should return prev and next for a middle lesson', () => {
    // 'graphql' is the 2nd lesson in "API Design & Architecture"
    const { prev, next } = getAdjacentLessons('graphql');
    expect(prev).not.toBeNull();
    expect(prev.slug).toBe('rest-apis');
    expect(next).not.toBeNull();
    expect(next.slug).toBe('mvc-architecture');
  });

  it('should return null for prev when lesson is first in course', () => {
    // Get the actual first lesson of backend-engineering
    const beLessons = allLessons.filter(l => l.courseId === 'backend-engineering');
    const firstSlug = beLessons[0].slug;
    const { prev } = getAdjacentLessons(firstSlug);
    expect(prev).toBeNull();
  });

  it('should return { prev: null, next: null } for non-existent slug', () => {
    const result = getAdjacentLessons('non-existent-slug');
    expect(result.prev).toBeNull();
    expect(result.next).toBeNull();
  });
});
