import { test, expect } from "@playwright/test";
import { BoardPage } from "../playwright-pages/boardPage";

test.beforeEach(async ({ page }) => {
  await new BoardPage(page).load();
});

test("Create a new board", async ({ page }) => {
  await new BoardPage(page).createNewBoard("My first board");

  await expect(page.getByText("Add list")).toBeVisible();
});

test.afterEach(async ({ request }) => {
  const response = await request.post("/api/reset");

  expect(response.ok()).toBeTruthy();
});
