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

export {}
