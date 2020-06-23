/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('http://freakzero.com')
    cy.get('#opencontactform').scrollIntoView();
  })

  it('Opens Contactform', () => {
    cy.get('#opencontactform').click();
    cy.get('#contactform-name').should('be.visible');
    cy.get('#contactform-website').should('be.visible');
    cy.get('#contactform-email').should('be.visible');
    cy.get('#contactform-message').should('be.visible');
  });
  it('Error', () => {
    cy.get('#stuff').should('be.visible');
  })
});