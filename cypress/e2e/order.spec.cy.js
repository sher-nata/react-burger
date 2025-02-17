describe('creating order is working correctly', function() {
  beforeEach(function() {
      cy.visit('http://localhost:3000');
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
      cy.wait('@getIngredients');
      
      localStorage.setItem('react-burger/accessToken', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoidGVzdCIsIklzc3VlciI6Iklzc3VlciIsIlVzZXJuYW1lIjoidGVzdCIsImV4cCI6MTc3MTMyMTE1NywiaWF0IjoxNzM5Nzg1MTU3fQ.R-ZFTyBkEm08pfBnp2dzmGfx54JvuzwxmqHLml_zkXM'); 
      localStorage.setItem('react-burger/refreshToken', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoidGVzdCIsIklzc3VlciI6Iklzc3VlciIsIlVzZXJuYW1lIjoidGVzdCIsImV4cCI6MTc3MTMyMTE1NywiaWF0IjoxNzM5Nzg1MTU3fQ.R-ZFTyBkEm08pfBnp2dzmGfx54JvuzwxmqHLml_zkXM');
      cy.intercept('GET', '/api/auth/user', { fixture: 'user.json' }).as('getUserData')
      cy.wait('@getUserData');
    });

  after(function() {
      localStorage.clear()
    });

  it('should creating order', function() {
    
    cy.get('[data-test="ingredient"]').contains("Булка 1").trigger('dragstart')
    cy.get('[class^=burger-constructor_components]').trigger('drop')

    cy.get('[data-test="ingredient"]').contains("Ингредиент 1").trigger('dragstart')
    cy.get('[class^=burger-constructor_components]').trigger('drop')

    cy.get('button').contains('Оформить заказ').click();

    cy.intercept('POST', 'api/orders', {fixture: 'order.json'}).as('setOrder');
    cy.wait('@setOrder');

    cy.get('[data-test="moadal_main_container"]').should('contain', "Идентификатор заказа").and('contain', "68574")
  })

});