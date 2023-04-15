/// <reference types="cypress" />

it('creating a new card', () => {

  cy.intercept({
    method: 'POST',
    url: '/api/cards'
  }).as('createCard')

  cy.visit('/board/1')

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('milk{enter}')
  
  cy.wait('@createCard')
    .its('response.statusCode')
    .should('eq', 201)

});

it('board has no lists', () => {

  cy.intercept({
    method: 'GET',
    url: /lists/
  }).as('getLists')

  cy.visit('/board/1')

  cy.wait('@getLists')

  cy.get('[data-cy=list]')
    .should('have.length', 1)

});

it('deleting a list', () => {

  cy.intercept({
    method: 'DELETE',
    url: '/api/lists/*'
  }).as('deleteLists')

  cy.visit('/board/1')

  cy.get('[data-cy="list-options"]')
    .click()

  cy.get('[data-cy="delete-list"]')
    .click()

  cy.wait('@deleteLists')
    .its('response.statusCode')
    .should('eq', 200)

});

it('mocking', () => {

  cy.intercept({
    method: 'GET',
    url: '/api/boards'
  }, {
    body: []
    // statusCode: 500
  })

  cy.visit('/')

})
