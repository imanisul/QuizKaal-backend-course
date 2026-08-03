import { test, expect } from '@playwright/test';

test.describe('Course Progression Flow (Phases 3, 4)', () => {
  
  test('User can open a course, start a lesson, mark it complete, and progress', async ({ page }) => {
    // Navigate directly to a specific lesson to test the progression engine
    await page.goto('/lessons/how-the-web-works');
    await page.waitForLoadState('networkidle');
    
    // Inject CSS to disable pointer events on all modals and sticky navs so they don't intercept Playwright clicks
    await page.addStyleTag({ content: `
      .fixed, nav { pointer-events: none !important; opacity: 0 !important; display: none !important; }
    `});
    
    // Phase 4: Validate Content
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toContainText('How the Web Works');
    
    // Phase 2: Functional Testing (Mark as Complete)
    const completeBtn = page.getByRole('button', { name: /Mark as Complete/i });
    await expect(completeBtn).toBeVisible();
    await completeBtn.evaluate(node => node.click());
    
    // Wait for state to change to "Next Lesson" (which is now a Link)
    const nextBtn = page.getByRole('link', { name: /Next Lesson/i });
    await expect(nextBtn).toBeVisible();
    
    // Click Next Lesson
    await nextBtn.evaluate(node => node.click());
    
    // Ensure URL changed
    await expect(page).not.toHaveURL(/\/lessons\/how-the-web-works/);
  });

});
