const { test, expect, describe } = require('@playwright/test')

describe('Recipe app, user tests', () => {
  test('front page can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')
      
    const locator = await page.getByText('Tervetuloa!')
    await expect(locator).toBeVisible()
  })

  test('login form can be opened', async ({ page }) => {
    await page.goto('http://localhost:5173')

    await page.getByRole('button', { name: 'Kirjaudu sisään'}).click()
    const locator = await page.getByText('Käyttäjänimi')
    await expect(locator).toBeVisible()
  })

  test('new user can be created and deleted', async ({ page }) => {
    await page.goto('http://localhost:5173')
    await page.getByRole('button', { name: 'Kirjaudu sisään'}).click()
    await page.getByText('Rekisteröidy').click()

    const textboxes = await page.getByRole('textbox').all()

    await textboxes[0].fill('testuser')
    await textboxes[1].fill('Test User')
    await textboxes[2].fill('password1')
    await textboxes[3].fill('password1')

    await page.getByRole('button', { name: 'Luo tili' }).click()

    await expect(page.getByText('Tervetuloa, testuser')).toBeVisible()

    await page.getByTestId('edit-profile').click()

    await page.getByRole('button', { name: 'Poista profiili' }).click()

    await page.getByRole('button', { name: 'Kyllä, poista' }).click()

  })


})
