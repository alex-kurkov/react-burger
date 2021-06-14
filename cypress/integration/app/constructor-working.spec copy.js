describe('burger constructor works correctly', () => {
  before(() => {
    cy.visit('/');
  });

  const dragAndDropIngredient = (index) => {
    cy.getByDataCy('ingredient').eq(index).trigger('dragstart');
    cy.getByDataCy('drop-ingredients-target').trigger('drop');
  };
  const removeIngredient = (index) => {
    cy.getByDataCy('main-container')
      .children()
      .eq(index)
      .find('[data-cy=action-icon] > svg')
      .click();
  };

  it('should be empty containers and order button is initially inactive', () => {
    cy.getByDataCy('bun-container').children().should('not.exist');
    cy.getByDataCy('main-container').children().should('not.exist');
    cy.getByDataCy('main-container').children().should(($children) => {
      expect($children).to.have.length(0);
    });
    cy.getByDataCy('order-button').find('button').as('btn');
    cy.get('@btn').should('have.css', 'pointer-events').and('match', /none/);
    cy.get('@btn').should('have.css', 'opacity').and('match', /\.5/);
  });

  it('should have one bun and five ingredients, order-button is active only after bun is added', () => {
    cy.getByDataCy('order-button').find('button').as('btn');
    dragAndDropIngredient(7);
    cy.get('@btn').should('have.css', 'pointer-events').and('match', /none/);
    dragAndDropIngredient(0);
    dragAndDropIngredient(3);
    dragAndDropIngredient(3);
    dragAndDropIngredient(3);
    dragAndDropIngredient(10);
    cy.getByDataCy('bun-container').children().should(($children) => {
      expect($children).to.have.length(1);
    });
    cy.getByDataCy('main-container').children().should(($children) => {
      expect($children).to.have.length(5);
    });
    cy.get('@btn').should('have.css', 'pointer-events').and('match', /auto/);
  });
  it('should remove ingredients correctly and not able to remove bun', () => {
    removeIngredient(0);
    removeIngredient(-1);
    removeIngredient(-1);
    removeIngredient(-1);
    cy.getByDataCy('main-container').children().should(($children) => {
      expect($children).to.have.length(1);
    });
    cy.getByDataCy('bun-container').find('[data-cy=action-icon] > svg').click();
    cy.getByDataCy('bun-container').children().should(($children) => {
      expect($children).to.have.length(1);
    });
  });
});
