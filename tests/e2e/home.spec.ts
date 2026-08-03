import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Homepage and Basic Routing (Phases 1-3, 8-11)', () => {
  
  test('should load the homepage without any 404s or console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', exception => {
      errors.push(exception.message);
    });

    const response = await page.goto('/');
    
    // Phase 11: Error Testing
    expect(response?.status()).toBe(200);
    
    // Phase 14: Zero Console Errors (excluding the injected widget extensions)
    const filteredErrors = errors.filter(e => !e.includes('[BHK]') && !e.includes('widget sdk'));
    expect(filteredErrors).toEqual([]);
    
    // Phase 9: SEO Testing
    await expect(page).toHaveTitle(/QuizKaal — Backend Engineering/);
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
  });

  test('should navigate to Roadmap correctly (Phase 2 - Functional)', async ({ page }) => {
    await page.goto('/');
    
    // Determine if mobile view and open menu
    const mobileToggle = page.locator('button[aria-label="Toggle menu"]');
    if (await mobileToggle.isVisible()) {
      await mobileToggle.click();
      await page.waitForTimeout(300); // Wait for menu animation
    }
    
    // Find the visible Roadmap link and click it
    const links = page.locator('a[href="/roadmap"]');
    for (let i = 0; i < await links.count(); i++) {
      if (await links.nth(i).isVisible()) {
        await links.nth(i).click({ force: true });
        break;
      }
    }
    
    await expect(page).toHaveURL(/\/roadmap/);
    await expect(page.getByRole('heading', { name: /Master Backend Engineering/i, level: 1 })).toBeVisible();
  });

  test('should not have any automatically detectable accessibility violations (Phase 8)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    // We expect 0 violations
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
