/// <reference types="cypress" />

beforeEach(() => {
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })
})

describe('Anonymous user', () => {
  it('Should create board WITHOUT login', () => {
    cy.visit('/')
    cy.firstBoard()
  })

  it('Should check with API if the board was created WITHOUT login', () => {
    cy.visit('/')
    cy.firstBoard()

    cy.request({
      method: 'GET',
      url: '/api/boards',
      headers: {
        accept: 'application/json'
      }
    })
      .then( (boards) => {
        expect(boards.body[0].user)
        .to.eq(0)
    })
  })
})

describe('User Sign Up', () => {
  it('Should register and stay log in', () => {
    cy.visit('/')

    cy.getByData('login-menu')
      .click()
    cy.get('a[href="/signup]')
      .click()
    cy.getByData('signup-email')
      .click()
      .type('tester@tester.com')
    cy.getByData('signup-password')
      .click()
      .type('test1234')
    cy.getByData('signup-submit')
      .click()

    cy.loginCheck()
  })
})

describe('Registered user', () => {
  it('Should log in and logout', () => {
    cy.register()
    cy.visit('/')

    cy.getByData('login-menu')
      .click()
    cy.getByData('login-email')
      .click()
      .type('tester@tester.com')
    cy.getByData('login-password')
      .click()
      .type('test1234')
    cy.getByData('login-submit')
      .click()

    cy.loginCheck()

    cy.getByData('logged-user')
      .click()
    cy.visit('/')
    cy.getByData('logged-user')
      .should('not.contain', 'tester@tester.com')
  })

  it('Should create board WITH login', () => {
    cy.register()
    cy.login()
    cy.visit('/')
    cy.loginCheck()
    cy.firstBoard()

    cy.getByData('board-title')
      .should('be.visible')
  })

  it('Should check with API if the board was created WITH login', () => {
    cy.register()
    cy.login()
    cy.visit('/')
    cy.loginCheck()
    cy.firstBoard()

    cy.getBoards()
      .then((boards) => {
        expect(boards.body[0].user)
        .to.eq(1)
      })
  })

  it('Should check if the board created WITH login is NOT visible for an anonymous user', () => {
    cy.register()
    cy.login()
    cy.visit('/')
    cy.loginCheck()
    cy.firstBoard()

    cy.getByData('logged-user')
      .click()

    cy.visit('/')
    cy.getByData('logged-user')
      .should('not.contain', 'tester@tester.com')
    cy.getByData('board-item')
      .should('not.exist')
  })

  it('Should delete board created WITH login', () => {
    cy.register()
    cy.login()
    cy.visit('/')
    cy.loginCheck()
    cy.firstBoard()

    cy.getByData('board-title')
      .should('exist')
    cy.getByData('board-options')
      .click()
    cy.getByData('delete-board')
      .click()

    cy.getBoards()
      .then((response) => {
        expect(response.body)
        .to.be.empty
      })

    cy.visit('/')
    cy.getByData('logged-user')
      .should('not.contain', 'tester@tester.com')
    cy.getByData('board-item')
      .should('not.exist')
  })
})
