describe('ingredients modal is working correctly', function() {
  beforeEach(function() {
      cy.visit('http://localhost:3000');
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
      cy.wait('@getIngredients');
      cy.get('[data-test="ingredient"]').contains("Булка 1").click()
    });

    it('should open modal', function() {
      cy.get('[data-test="moadal_main_container"]').should('contain', "Булка 1")
    });

    it('should close modal by clicking on button', function() {
      cy.get('[data-test="moadal_main_container"]').should('contain', "Детали ингредиента")

      cy.get('[data-test="modal_close_button"]').click()
      cy.contains("Детали ингредиента").should('not.exist')
    });

    it('should close modal by overlay clicking', function() {
      cy.get('[data-test="moadal_main_container"]').should('contain', "Детали ингредиента")

      cy.get('[data-test="overlay"]').click(-250, -250, { force: true })
      cy.contains("Детали ингредиента").should('not.exist')
    });

    it('should close modal by pressing escape', function() {
      cy.get('[data-test="moadal_main_container"]').should('contain', "Детали ингредиента")

      cy.get('body').type('{esc}', {force: true})
      cy.contains("Детали ингредиента").should('not.exist')
    });

});

