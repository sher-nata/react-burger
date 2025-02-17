describe('dragging ingredients is working correctly', function() {
  beforeEach(function() {
      cy.visit('http://localhost:3000');
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
      cy.wait('@getIngredients');
    });

    it('should drag bun', function() {
      cy.get('[data-test="ingredient"]').contains("Булка 1").trigger('dragstart')
      cy.get('[class^=burger-constructor_components]').trigger('drop')

      cy.get('[data-test="constructor_bun_top"]').should('contain', "Булка 1")
      cy.get('[data-test="constructor_bun_bottom"]').should('contain', "Булка 1")

      cy.get('[data-test="ingredient"]').contains("Булка 1").get('[class^=counter__num]').should('contain', 2)
    });

    it('should drag ingredients', function() {
      cy.log("Ингрединт должен добавиться 2 раза")
      cy.get('[data-test="ingredient"]').contains("Ингредиент 1").trigger('dragstart')
      cy.get('[class^=burger-constructor_components]').trigger('drop')

      cy.get('[data-test="ingredient"]').contains("Ингредиент 1").trigger('dragstart')
      cy.get('[class^=burger-constructor_components]').trigger('drop')

      cy.get('[data-test="constructor_other_ingredients"]')
        .children()
        .should('contain', 'Ингредиент 1')
        .and('have.length', 2)

      cy.get('[data-test="ingredient"]').contains("Ингредиент 1").get('[class^=counter__num]').should('contain', 2)

      cy.get('[data-test="ingredient"]').contains("Ингредиент 2").trigger('dragstart')
      cy.get('[class^=burger-constructor_components]').trigger('drop')
      cy.get('[data-test="constructor_other_ingredients"]')
        .children()
        .should('contain', 'Ингредиент 2')

      cy.get('[data-test="ingredient"]').contains("Ингредиент 2").get('[class^=counter__num]').should('contain', 1)

    });

});