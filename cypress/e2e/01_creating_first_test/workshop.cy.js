/// <reference types="cypress" />

before(() => {
  cy.request({
    method: "POST",
    url: "/api/reset",
  });
});

it("creates a new list with a card in it", () => {
  cy.visit("/");

  cy.get('[data-cy="first-board"]').click().type("First Board{enter}");

  cy.get('[data-cy="add-list-input"]').type("New List{enter}");

  cy.get('[data-cy="new-card"]').click();

  cy.get('[data-cy="new-card-input"]').type("New Card{enter}");
});

it("bookmarks a board", () => {
  cy.visit("/");

  cy.get('[data-cy="board-item"]')
    .eq(0)
    .trigger("mouseover")
    .get('[data-cy="star"]')
    .eq(0)
    .click();
});
