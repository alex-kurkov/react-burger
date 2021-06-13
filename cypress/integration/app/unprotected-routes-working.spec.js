describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('');
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
    cy.getBySel('order-card').first().click();
    cy.getBySel('modal').should('exist');
  });

  it('should close modal by overlay click', () => {
    cy.getBySel('modal-overlay').click(1, 1);
    cy.getBySel('modal').should('not.exist');
  });

  it('should open feed/:orderId modal after order card click', () => {
    cy.getBySel('order-card').last().scrollIntoView().click();
    cy.getBySel('modal').should('exist');
  });

  it('should close modal by ESCAPE press', () => {
    cy.get('body').type('{esc}', { force: true });
    cy.getBySel('modal').should('not.exist');
  });

  it('should redirect to login page after profile button click', () => {
    cy.get('a').contains('Личный кабинет').click();
    cy.contains('Вход');
  });
});
