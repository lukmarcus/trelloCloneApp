/// <reference types="cypress" />

it('creates a new list with a card in it', () => {

  cy.visit('/board/1')

  cy.get('[data-cy="add-list-input"]')
    .type('new list{enter}')

  cy.get('[data-cy="new-card"]')
    .click()
  
  cy.get('[data-cy="new-card-input"]')
    .type('new card{enter}')
});

it('bookmarks a board', () => {

  cy.visit('/')

  cy.get('[data-cy="board-item"]')
    .eq(0)
    .trigger('mouseover')
    .get('[data-cy="star"]')
    .eq(0)
    .click()

})
