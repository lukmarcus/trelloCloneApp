/// <reference types="cypress" />
/*
  ⚠️ before doing the challenge, create a new board in the app
  you can change "it" to "it.only" to run a single test
  ℹ️ you might need to reset your app in between tests. to do that
  use F2 key to toggle tools that will help you
*/

beforeEach( () => {

  cy.visit('/board/1'); // ⚠️ add ID of your board

})

// challenge #1: create a new list and assert it is visible
it('creating a list', () => {

  cy.get('[data-cy="add-list-input"]')
    .type('new created list{enter}')
    .should('be.visible')

})

// challenge #2: create one more list and assert that there are exactly two in the app
it('asserting number of lists', () => {

  cy.get('[data-cy="create-list"]')
    .type('the second list{enter}')
  
  cy.get('[data-cy="list"]')
    .should('have.length', 2)

})

// challenge #3: start this test with a single list in the app. delete it and then assert it does not exist
it('deleting a list', () => {

  cy.get('[data-cy="list-options"]')
    .eq(1)
    .click()

  cy.get('[data-cy="delete-list"]')
    .click()

  cy.get('[data-cy="list-options"]')
    .eq(1)
    .should('not.exist')

})

// challenge #4: start the test with a single card, check it and then assert it is checked
it('asserting the checked state', () => {

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('new item on list{enter}')

  cy.get('[data-cy="card"]')
    .should('be.visible')

  cy.get('[data-cy="card-checkbox"]')
    .click()
    .should('be.checked')

  cy.get('[data-cy="due-date"]')
    .should('have.class', 'completed')

})

// challenge #5: start test with a single list in the app. change the name of the list and then assert the changed name of the list
it('asserting list name', () => {

  cy.get('[data-cy="board-title"]')
    .click()
    .type('new board title{enter}')

  cy.get('[data-cy="board-title"]')
    .should('have.value', 'new board title')

})

// challenge #6: create a new card and assert its text
it('assert text of created card', () => {

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .click()
    .type('second card{enter}')

  cy.get('[data-cy="card-text"]')
    .eq(1)
    .should('have.text', 'second card')

})

// challenge #7: click on newly created card and check that the detail modal has opened
it('checking the card detail', () => {

  cy.get('[data-cy="card"]')
    .eq(1)
    .click()

  cy.get('[data-cy="card-detail"]')
    .should('exist')
    .should('be.visible')

})

// challenge #8: opened created card and close it. check closing the card
it('closing the card', () => {

  cy.get('[data-cy="card"]')
    .eq(1)
    .click()

  cy.get('[data-cy="cancel"]')
    .click()
    
  cy.get('[data-cy="card-detail"]')
    .should('not.exist')

  cy.get('[data-cy="list-options"]')
    .click()
  
    cy.get('[data-cy="delete-list"]')
    .click()

})
