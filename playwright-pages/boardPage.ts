import { test, expect, Page, Locator, Request } from "@playwright/test";

export class BoardPage {
  page: Page;
  boardFirstBoard: Locator;
  boardTitle: Locator;
  reset: Request;

  constructor(page: Page) {
    this.page = page;
    this.boardFirstBoard = page.locator("[data-cy=first-board]");
    this.boardTitle = page.locator("[data-cy=board-title]");
  }

  async load() {
    await this.page.goto("/");
  }

  async createNewBoard(name: string) {
    await this.boardFirstBoard.fill(name);
    await this.page.keyboard.press("Enter");
    await expect(this.boardTitle).toHaveValue(name);
  }
}
