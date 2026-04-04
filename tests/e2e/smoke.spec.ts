import { test, expect } from '@playwright/test';

test.describe('Landing Page Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display the main header', async ({ page }) => {
    const header = page.locator('h1');
    await expect(header).toBeVisible();
    await expect(header).toHaveText('DIESEL JENNY');
  });

  test('should have social links in orbit', async ({ page }) => {
    // There are multiple bandcamp links, use .first() or more specific locator
    const bandcampLink = page.locator('a[href*="bandcamp.com"]').first();
    await expect(bandcampLink).toBeVisible();
  });

  test('should cycle phrases on click', async ({ page }) => {
    const phrase = page.locator('h2');
    const initialText = await phrase.innerText();
    
    await phrase.click();
    
    // Wait for text to change
    await expect(phrase).not.toHaveText(initialText);
  });

  test('should navigate to home page', async ({ page }) => {
    const homeLink = page.locator('a:has-text("Home")');
    await homeLink.click();
    await expect(page).toHaveURL(/\/home/);
    
    // On home page, DIESEL JENNY is an <a> inside a <header>
    const homeHeader = page.locator('header a:has-text("DIESEL JENNY")');
    await expect(homeHeader).toBeVisible();
  });
});

test.describe('Home Page Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home');
  });

  test('should display bio and embeds', async ({ page }) => {
    // Bio section
    await expect(page.locator('section:has-text("Bio")')).toBeVisible();
    
    // Embeds (iframes)
    // Check for presence of iframes generally
    const iframes = page.locator('iframe');
    await expect(iframes).toHaveCount(6);

    const bandcampIframe = page.locator('iframe[src*="bandcamp.com"]').first();
    await expect(bandcampIframe).toBeVisible();

    // The YouTube iframe in home/page.tsx uses youtube-nocookie.com
    const youtubeIframe = page.locator('iframe[src*="youtube"]').first();
    await expect(youtubeIframe).toBeVisible();
  });

  test('should display the scrolling ticker', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});
