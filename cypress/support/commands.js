/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
  cy.request({
    method: 'POST',
    url: '/api/login',
    headers: {
      accept: 'application/json'
    },
    body: {
      "email": "tester@tester.com",
      "password": "test1234"
    }
  })
  .then((resp) => {
    cy.setCookie('auth_token', resp.body.accessToken)
  })
})

Cypress.Commands.add('loginCheck', () => {
  cy.get('[data-cy="logged-user"]')
    .should('contain', 'tester@tester.com')
})

Cypress.Commands.add('register', () => {
  cy.request({
    method: 'POST',
    url: '/api/signup',
    headers: {
      accept: 'application/json'
    },
    body: {
      "email": "tester@tester.com",
      "password": "test1234"
    }
  })
})

Cypress.Commands.add('firstBoard', () => {
  cy.get('[data-cy="first-board"]')
  .click()
  .type('Board{enter}')
})

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logged-user"]')
    .click()
  cy.visit('/')
  cy.get('[data-cy="logged-user"]')
    .should('not.contain', 'tester@tester.com')
})

export {}
