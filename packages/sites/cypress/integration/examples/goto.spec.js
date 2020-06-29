/// <reference types="cypress" />

context('Spencer', () => {
  beforeEach(() => {
    cy.visit('http://projects.freakzero.com/spencer/')
  })

  it('spawn window', () => {
    cy.wait(2000);
    cy.get('#spawn > li:nth-child(1) > a').click({force: true});
    cy.wait(1000);
    cy.get('#url').type('asdfasdfasdf{enter}');
    cy.get('#stuff').should('be.visible');
  });
});

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

