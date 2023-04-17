/// <reference types="cypress" />

before(() => {

  cy.request({
    method: 'POST',
    url: '/api/reset'
  })

})

describe('Anonymous user', () => {

  it('Should create board WITHOUT login', () => {

    cy.visit('/')

    cy.get('[data-cy="first-board"]')
      .click()
      .type('Board{enter}')

  })

  it(' Should check with API if board was created WITHOUT login', () => {

    cy.request({
      method: 'GET',
      url: '/api/boards',
      headers: {
        accept: 'application/json'
      }
    }).then( (board) => {
        expect(board.body[0].user).to.eq(0)
    })

  })

})

describe('User Sign Up', () => {

  it('Should register and stay login', () => {

    cy.request({
      method: 'DELETE',
      url: '/api/boards'
    })

    cy.visit('/')

    cy.get('[data-cy="login-menu"]')
      .click()
    cy.get('a[href="/signup"]')
      .click()
    cy.get('[data-cy="signup-email"]')
      .click()
      .type('tester@tester.com')
    cy.get('[data-cy="signup-password"]')
      .click()
      .type('test1234')
    cy.get('[data-cy="signup-submit"]')
      .click()

    cy.get('[data-cy="logged-user"]')
      .should('contain', 'tester@tester.com')
  })

})

describe('Registered user', () => {

  it('Should login and logout', () => {

    cy.visit('/')

    cy.get('[data-cy="login-menu"]')
      .click()
    cy.get('[data-cy="login-email"]')
      .click()
      .type('tester@tester.com')
    cy.get('[data-cy="login-password"]')
      .click()
      .type('test1234')
    cy.get('[data-cy="login-submit"]')
      .click()

    cy.get('[data-cy="logged-user"]')
      .should('contain', 'tester@tester.com')
      .click()

    cy.reload()

    cy.get('[data-cy="logged-user"]')
      .should('not.contain', 'tester@tester.com')
  })

  it('Should login with API login with web check | Create board, list, card & check user ID with GET', () => {

    cy.login()

    cy.visit('/')

    cy.get('.inline-block')
      .should('contain', 'tester@tester.com')

    cy.get('[data-cy="first-board"]')
      .click()
      .type('Board{enter}')

    cy.getCookie('auth_token').then((auth_token) => {
      cy.request({
        method: 'GET',
        url: '/api/boards/1',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${auth_token.value}`
    
        }
      }).then( (board) => {
          expect(board.body.user).to.eq(1)
      })
    })

  })
})