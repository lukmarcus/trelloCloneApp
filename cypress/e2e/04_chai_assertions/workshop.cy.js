/// <reference types="cypress" />

beforeEach( () => {

  cy.visit('/board/1')

})

it('check text of the first card', () => {

  cy.get('[data-cy="card-text"]')
    .eq(0)
    .then((board) => {
      expect(board).to.have.text('Milk')
    })

});

it('check text of all cards in first list', () => {

  cy.get('[data-cy=card-text]')
    .then((board) => {
      expect(board[0]).to.have.text('Milk')
      expect(board[1]).to.have.text('Bread')
      expect(board[2]).to.have.text('Juice')
      expect(board[3]).to.have.text('Shampoo')
      expect(board[4]).to.have.text('Soap')
    })

  cy.get('[data-cy=card-text]')
    .should((board) => {
      expect(board[0]).to.have.text('Milk')
      expect(board[1]).to.have.text('Bread')
      expect(board[2]).to.have.text('Juice')
      expect(board[3]).to.have.text('Shampoo')
      expect(board[4]).to.have.text('Soap')
    }) 

});
