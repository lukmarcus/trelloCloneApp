/// <reference types="cypress" />

before( () => {

  cy.request({
      method: 'POST',
      url: '/api/reset'
  })

  cy.visit('/')

  cy.get('[data-cy="first-board"]')
    .click()
    .type('Things to buy{enter}')

  cy.get('[data-cy="add-list-input"]')
    .click()
    .type('Groceries{enter}')

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('Bread{enter}')

})

beforeEach( () => {

  cy.visit('/board/1')

})

it('creates a card', () => {

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('Milk{enter}')

  cy.get('[data-cy="card-text"]')
    .should('be.visible')

})

it('has proper number of cards', () => {

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('Cheese{enter}')

  cy.get('[data-cy="card"]')
    .should('have.length', 3)

})

it('has the checkbox in checked state', () => {

  cy.get('[data-cy="card-checkbox"]')
    .eq(2)
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
