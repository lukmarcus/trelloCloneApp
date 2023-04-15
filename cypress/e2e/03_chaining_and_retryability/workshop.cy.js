/// <reference types="cypress" />

import { cardsLoadRandomly } from '../../../workshop-scripts/evilCode'

it('opens a card with due date on 1st March', () => {

  cy.visit('/board/1')

  cy.contains('[data-cy=card]', 'Mar 01 2022')

  cy.get('[data-cy=card]')
    .last()
    .contains('Mar 01 2022')

})

it('loads cards in our list very slowly', {defaultCommandTimeout: 6000}, () => {

  cy.visit('/board/1')

  cy.get('[data-cy=card-text]', {timeout: 7000})
    .should('have.length', 5)
  
});

it('loads cards in our list randomly', () => {

  cy.visit('/board/1')

  cy.get('[data-cy=card-text]')
    .eq(1)
    .should('contain.text', 'Bread')
  
});
