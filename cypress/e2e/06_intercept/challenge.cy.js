/// <reference types="cypress" />

beforeEach( function() {

  cy.request('POST', '/api/reset')
  cy.request('POST', '/api/boards', { name: 'New Board' })
    .its('body.id')
    .as('boardId')
    .then( boardId => {

      cy.request('POST', '/api/lists', {
        boardId,
        name: 'New List'
      })

    })

})

// challenge #1: create a card using UI and use .intercept() command
// for watching the http request for the card creation
// test the response status code and some of the attributes 
// of the card you created
it('creates a card', function() {

  cy.intercept({
    method: 'POST',
    url: '/api/cards'
  }).as('newCard')

  cy.visit(`/board/${this.boardId}`)

  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('Card{enter}')
  
  cy.wait('@newCard')
    .then(({response, request}) => {
      expect(response.statusCode).eq(201)
      expect(request.body.boardId).to.eq(this.boardId)
      expect(request.body.name).to.eq('Card')
    })

});

// challenge #2: create and check the card you created using UI and use .intercept() command
// to catch the http request that happens. test its status code
it('checking the card', function() {

  cy.intercept({
    method: 'PATCH',
    url: '/api/cards/*'
  }).as('patchCard')

  cy.visit(`/board/${this.boardId}`)
  
  cy.get('[data-cy="new-card"]')
    .click()

  cy.get('[data-cy="new-card-input"]')
    .type('Milk{enter}')

  cy.get('[data-cy="card-text"]')
    .should('have.text', 'Milk')

  cy.get('[data-cy="card-checkbox"]')
    .check()

  cy.get('[data-cy="card-checkbox"]')
    .should('be.checked')

  cy.wait('@patchCard')
    .its('response.statusCode')
    .should('eq', 200)

});

// challenge #3: assert that 'boardId' is part of attributes that is 
// sent to the server when a new list is created
it('creates a new list', function() {

  cy.visit(`/board/${this.boardId}`)

  cy.intercept({
    method: 'POST',
    url: '/api/lists'
  }).as('listCreate')

  cy.get('[data-cy="create-list"]')
    .click()

  cy.get('[data-cy="add-list-input"]')
    .type('List 2{enter}')
  
  cy.wait('@listCreate')
    .its('request.body.boardId')
    .should('eq', this.boardId)

});

// challenge #4: delete a list and assert that the server responded 
// with a correct status code
it('deletes a list', function() {

  cy.visit(`/board/${this.boardId}`)

  cy.intercept({
    method: 'DELETE',
    url: '/api/lists/*'
  }).as('deleteList')

  cy.get('[data-cy="list-options"]')
    .click()
  
  cy.get('[data-cy="delete-list"]')
    .click()

  cy.wait('@deleteList')
    .its('response.statusCode')
    .should('eq', 200)

});
