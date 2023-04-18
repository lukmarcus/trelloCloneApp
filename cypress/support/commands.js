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
  cy.getByData('logged-user')
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
  cy.getByData('first-board')
  .click()
  .type('Board{enter}')
})

Cypress.Commands.add('logout', () => {
  cy.getByData('logged-user')
    .click()
  cy.visit('/')
  cy.getByData('logged-user')
    .should('not.contain', 'tester@tester.com')
})

Cypress.Commands.add('getByData', (dataId) => {
  cy.get(`[data-cy="${dataId}"]`)
})

Cypress.Commands.add('authRequest', (payload) => {
  cy.getCookie('auth_token')
    .then((auth_token) => {
      cy.request({
        ...payload,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${auth_token.value}`,
          ...payload.headers,
        }
      })
    })
})

Cypress.Commands.add('getBoards', () => {
  cy.authRequest({
    method: 'GET',
    url: '/api/boards/',
  })
})

export {}
