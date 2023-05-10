import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  //Arrange / Given
  await page.goto("/");
});

test("Create a new board", async ({ page }) => {
  //Act / When
  await page.locator("[data-cy=first-board]").fill("My first board");
  await page.keyboard.press("Enter");

  //Assert / Then
  await expect(page.locator("[data-cy=board-title]")).toHaveValue(
    "My first board"
  );
  await expect(page.getByText("Add list")).toBeVisible();
});

test.afterEach(async ({ request }) => {
  const response = await request.post("/api/reset");

  expect(response.ok()).toBeTruthy();
});
