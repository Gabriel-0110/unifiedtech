import { test, expect } from '@playwright/test'

// Basic smoke test - just verify pages load with 200 status
const pages = ['/', '/about', '/services', '/case-studies', '/resources', '/contact', '/blog']

for (const path of pages) {
  test(`page ${path} loads`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
  })
}
