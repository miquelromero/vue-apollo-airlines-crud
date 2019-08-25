// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('createAirline', (iata, name, services) => {
  cy.get('[data-cy=button-create-airline]').click();
  cy.get('[data-cy=airlines-form-create-modal]').should('be.visible');
  cy.get('[data-cy=airlines-form-iata]').type(iata);
  cy.get('[data-cy=airlines-form-name]').type(name);
  services.forEach(service => {
    cy.get(`[data-cy=airlines-form-service-${service}]`).check({ force: true });
  });
  cy.get('[data-cy=airlines-form-create-button]').click();
  cy.get('[data-cy=airlines-form-create-modal]').should('not.be.visible');
});
