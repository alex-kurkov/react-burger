describe('app works correctly with routes', () => {
  before(() => {
    cy.visit('http://localhost:3000');
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
    cy.get('article').contains('a').click();
    cy.getBySel('modal').should('exist');
  });

  it('should close modal by overlay click', () => {
    cy.getBySel('modal-overlay').click(1, 1);
  });
  it('should redirect to login page after profile button click', () => {
    cy.contains('Личный кабинет').click();
    cy.contains('Вход');
  });
});
