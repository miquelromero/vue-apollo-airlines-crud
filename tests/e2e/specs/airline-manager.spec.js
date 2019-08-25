describe('Airline manager main features', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Creates, edits and deletes airlines', () => {
    // Create an airline
    const iata = 'JD';
    const name = 'John Doe Airlines';
    cy.createAirline(iata, name, ['bags']);

    // Validate data
    const itemSelector = '[data-cy=airlines-list-item]';

    cy.get(itemSelector)
      .last()
      .find('[data-cy=airlines-list-item-iata]')
      .contains(iata);
    cy.get(itemSelector)
      .last()
      .find('[data-cy=airlines-list-item-name]')
      .contains(name);
    cy.get(itemSelector)
      .last()
      .find('[data-cy=airlines-list-item-badges-badge]')
      .should('have.length', 1);

    // Edit data
    const nameExtension = ' 2.0';
    const extendedName = name + nameExtension;

    cy.get(itemSelector)
      .last()
      .click({ force: true });
    cy.get('[data-cy=airlines-form-edit-modal]').should('be.visible');
    cy.get('[data-cy=airlines-form-name]').type(nameExtension);
    cy.get('[data-cy=airlines-form-edit-button]').click();
    cy.get('[data-cy=airlines-form-edit-modal]').should('not.be.visible');

    // Validate edit
    cy.get(itemSelector)
      .last()
      .find('[data-cy=airlines-list-item-name]')
      .contains(extendedName);

    // Delete airline
    cy.get(itemSelector)
      .last()
      .click({ force: true });

    cy.get('[data-cy=airlines-form-edit-modal]').should('be.visible');
    cy.get('[data-cy=airlines-form-delete-button]').click({ force: true });
    cy.get('[data-cy=airlines-form-edit-modal]').should('not.be.visible');

    // Validate delete
    cy.get(itemSelector)
      .last()
      .find('[data-cy=airlines-list-item-name]')
      .should('not.contain', extendedName);
  });
});
