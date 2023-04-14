/// <reference types="cypress" />

// challenge #1: set up this test in a way that it resets the database before every test

before(() => {

    cy.request({
        method: 'POST',
        url: '/api/reset'
    })

})

// challenge #2: create a new board using API. check that the "created" attribute is a string
it('date created is formatted as a string', () => {

    cy.request({
        method: 'POST',
        url: '/api/boards',
        body:{
            name: 'new board'
        }
    }).then(board => {
        expect('board.body.created').to.be.a('string')
    })

});

// challenge #3: make two api requests. make the first one create a board
// and make the second one check number of board in the database
it('GET /api/boards is returning correct number of boards', () => {

    cy.request({
        method: 'POST',
        url: 'api/boards',
        body:{
            name: 'new board 2'
        }
    })

    cy.request({
        method: 'GET',
        url: '/api/boards',
        headers: {
            accept: 'application/json'
        }
    }).its('body').should('have.length', 2)

});

// challenge #4: create a new board and list. to create a new list, you’ll need
// to put it inside .then() command and use the id of the board in 
// the request
it('creating a new list', () => {

    cy.request({
        method: 'POST',
        url: '/api/boards',
        body:{
            name: 'new board 3',
            starred: true
        }
    }).then(board => {
        cy.request({
            method: 'POST',
            url: '/api/lists',
            body:{
                name: 'new list',
                boardId: board.body.id
            }
        })
    })

    cy.visit('http://localhost:3000/')
    cy.get('[data-cy=board-item]')
        .eq(2)
        .trigger('mouseover')
    cy.get('[data-cy=star]')
        .eq(2)
        .click()


});

// 💯 extra challenge: use a query parameter in GET /api/boards
// request, so that API will only return starred board 
it('filtering boards', () => {
  
    cy.api({
        method: 'GET',
        url: '/api/boards',
        qs:{
            starred: true
        },
        headers: {
            accept: 'application/json'
        }
    })

});
