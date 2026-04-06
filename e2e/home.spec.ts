import { test, expect } from "@playwright/test";

// ─── Home page ────────────────────────────────────────────────────────────────

test.describe("Home page", () => {
  test("loads and shows the blog title", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /Jaiquez Book Blog/i })).toBeVisible();
  });

  test("shows the add-entry button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /add entry/i })).toBeVisible();
  });

  test("navigates to the add entry form when the Fab is clicked", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /add entry/i }).click();
    await expect(page).toHaveURL(/\/findentry/);
  });

  test("shows the footer", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText(/Jaiquez/i)).toBeVisible();
  });
});

// ─── Find Entry (add book) page ───────────────────────────────────────────────

test.describe("Find Entry page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/findentry");
  });

  test("shows the Find Book heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Find Book/i })).toBeVisible();
  });

  test("shows ISBN and summary inputs", async ({ page }) => {
    await expect(page.getByLabel(/isbn/i)).toBeVisible();
    await expect(page.getByLabel(/enter summary/i)).toBeVisible();
  });

  test("Add Entry button is disabled when fields are empty", async ({ page }) => {
    await expect(page.getByRole("button", { name: /add entry/i })).toBeDisabled();
  });

  test("shows validation error and keeps button disabled for short input", async ({ page }) => {
    await page.getByLabel(/isbn/i).fill("short");
    await expect(page.getByRole("button", { name: /add entry/i })).toBeDisabled();
    await expect(page.getByText(/minimum/i)).toBeVisible();
  });

  test("Back To Blog navigates back to home", async ({ page }) => {
    await page.getByRole("link", { name: /back to blog/i }).click();
    await expect(page).toHaveURL("/");
  });
});

