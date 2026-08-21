import { expect, test } from '@playwright/test'

test('landing exposes Growth product, pricing and signup routes', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('One intelligence')
  await expect(page.getByText('€159', { exact: true })).toBeVisible()
  await expect(page.getByText('€239', { exact: true })).toBeVisible()
  await expect(page.locator('a[href="https://g-chat.growthlabs.pt/register"]')).toHaveCount(5)
})

test('Portuguese locale updates landing and docs navigation', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'PT' }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Uma inteligência')
  await expect(page).toHaveURL(/lang=pt/)
  await page.goto('/docs/security?lang=pt')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Segurança')
})

test('legal 404 is shown honestly', async ({ page }) => {
  await page.route('**/growth-api/v1/legal/terms/**', (route) => route.fulfill({ status: 404, body: '{}' }))
  await page.goto('/legal/terms')
  await expect(page.getByText(/not been published|ainda não foi publicado/)).toBeVisible()
})

test('status uses live API values without filling absent metrics', async ({ page }) => {
  await page.route('**/growth-api/v1/status', (route) => route.fulfill({ contentType: 'application/json', body: JSON.stringify({ overall: 'degraded', generatedAt: '2026-08-21T10:00:00Z', periodDays: 30, services: [{ id: 'api', name: 'Growth API', status: 'operational', latencyMs: 18 }] }) }))
  await page.goto('/status')
  await expect(page.getByText('18 ms')).toBeVisible()
  await expect(page.getByText('Live', { exact: true })).toBeVisible()
})
