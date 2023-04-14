/// <reference types="cypress" />

/*
  ⚠️ before doing the challenge, create a new board in the app
  you can change "it" to "it.only" to run a single test
  ℹ️ you might need to reset your app in between tests. to do that
  use F2 key to toggle tools that will help you
*/

// challenge #1: create a new list in your board
  it('creating a new list', () => {

    cy.visit('/')
    
    cy.get('[data-cy="first-board"]')
      .click()
      .type('new board{enter}')
    
      cy.get('[data-cy="add-list-input"]')
      .click()
      .type('new list in my new board{enter}')

  });

// challenge #2: create a new card in your list
  it('creating a new card', () => {

    cy.get('[data-cy="new-card"]')
      .click()

    cy.get('[data-cy="new-card-input"]')
      .type('new card on my new list{enter}')

  });

// challenge #3: rename the board
  it('renaming a board', () => {

    cy.get('[data-cy="board-title"]')
      .type('renamed board{enter}')

  });

// challenge #4: open a card and change its description
  it('changing the card description', () => {

    cy.get('[data-cy="card"]')
      .eq(0)
      .click()

    cy.get('[data-cy="card-description"]')
      .click()
      .type('new description')

    cy.get('[data-cy="cancel"]')
      .click()

  });

// challenge #5: delete the board
it('deleting a board', () => {

  cy.get('[data-cy="board-options"]')
    .click()
    
  cy.get('[data-cy="delete-board"]')
    .click()

});
