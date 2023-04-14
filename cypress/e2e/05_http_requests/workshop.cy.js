/// <reference types="cypress" />

it('sends a request over API', () => {

  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'new board'
    }
  })

  cy.visit('/')
  
});

it('response gets 201 status', () => {
  
  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'new board'
    }
  }).its('status')
    .should('eq', 201)

  cy.request({
    method: 'POST',
    url: '/api/boards',
    body: {
      name: 'new board'
    }
  }).then(board => {
    expect(board.status).to.eq(201)
    expect(board.body.starred).to.be.false
  })

});

it('testing board list', () => {
  
  cy.request({
    method: 'GET',
    url: '/api/boards',
    headers: {
      accept: 'application/json'
    }
  }).then( (board) => {
    expect(board.status).to.eq(200)
    expect(board.body).to.have.length(3)
    expect(board.body[0].id).to.be.a('number')
    expect(board.body[0].starred).to.be.false
    expect(board.body[0].user).to.eq(0)
  });
})

before(() => {
  
  cy.request({
    method: 'POST',
    url: '/api/reset'
  })

});
