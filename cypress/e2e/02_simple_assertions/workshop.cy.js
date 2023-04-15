/// <reference types="cypress" />

beforeEach( () => {

  cy.visit('/board/1')

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('bread{enter}')

})

it('creates a card', () => {

  cy.get('[data-cy="new-card-input"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('milk{enter}')

  cy.get('[data-cy="card-text"]')
    .should('be.visible')

})

it('has proper number of cards', () => {

  cy.get('[data-cy="new-card-input"]')
    .type('milk{enter}')

  cy.get('[data-cy="card"]')
    .should('have.length', 2)

})

it('has the checkbox in checked state', () => {

  cy.get('[data-cy="card-checkbox"]')
    .click()
  
  cy.get('[data-cy="card-checkbox"]')
    .should('be.checked')

  cy.get('[data-cy="due-date"]')
    .should('have.class', 'completed')

})

it('has correct list name', () => {

  cy.get('[data-cy="list-name"]')
    .should('have.value', 'Groceries')

})
