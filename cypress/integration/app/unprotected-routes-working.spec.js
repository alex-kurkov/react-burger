describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('/');
  });

  it('should open main page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open feed page after feed link click', () => {
    cy.get('a').contains('Лента заказов').click();
    cy.contains('Выполнено за все время');
    cy.contains('Лента заказов');
  });

  it('should open feed/:orderId modal after order card click', () => {
    cy.getByDataCy('order-card').first().click();
    cy.getByDataCy('modal').should('exist');
  });

  it('should close modal by overlay click', () => {
    cy.getByDataCy('modal-overlay').click(1, 1);
    cy.getByDataCy('modal').should('not.exist');
  });

  it('should open feed/:orderId modal after order card click', () => {
    cy.getByDataCy('order-card').last().scrollIntoView().click();
    cy.getByDataCy('modal').should('exist');
  });

  it('should close modal by ESCAPE press', () => {
    cy.get('body').type('{esc}', { force: true });
    cy.getByDataCy('modal').should('not.exist');
  });

  it('should redirect to login page after profile button click', () => {
    cy.get('a').contains('Личный кабинет').click();
    cy.contains('Вход');
  });
});
