describe('ingredients modal is working correctly', function() {

    const bun_1_name = 'Булка 1'
    const modal_title = "Детали ингредиента"
    const moadal_main_container = '[data-test="moadal_main_container"]'
  
    beforeEach(function() {
      cy.visit('/');
      cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
      cy.wait('@getIngredients');
      cy.get('[data-test="ingredient"]').contains(bun_1_name).click()
    });

    
    it('should open modal', function() {
      cy.get(moadal_main_container).should('contain', bun_1_name)
    });

    it('should close modal by clicking on button', function() {
      cy.get(moadal_main_container).should('contain', modal_title)

      cy.get('[data-test="modal_close_button"]').click()
      cy.contains(modal_title).should('not.exist')
    });

    it('should close modal by overlay clicking', function() {
      cy.get(moadal_main_container).should('contain', modal_title)

      cy.get('[data-test="overlay"]').click(-250, -250, { force: true })
      cy.contains(modal_title).should('not.exist')
    });

    it('should close modal by pressing escape', function() {
      cy.get(moadal_main_container).should('contain', modal_title)

      cy.get('body').type('{esc}', {force: true})
      cy.contains(modal_title).should('not.exist')
    });

});

