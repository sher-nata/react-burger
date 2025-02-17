describe('dragging ingredients is working correctly', function () {

  const burger_constructor_container = '[class^=burger-constructor_components]'
  const ingredient_conteiner = '[data-test="ingredient"]'
  const constructor_other_ingredients = '[data-test="constructor_other_ingredients"]'
  const counter_container = '[class^=counter__num]'

  const bun_1_name = 'Булка 1'
  const ingredient_1_name = 'Ингредиент 1'
  const ingredient_2_name = 'Ингредиент 2'

  beforeEach(function () {
    cy.visit('/');
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients')
    cy.wait('@getIngredients');
  });


  it('should drag bun', function () {
    cy.get(ingredient_conteiner).contains(bun_1_name).as('bun_1')

    cy.get('@bun_1').trigger('dragstart')
    cy.get(burger_constructor_container).trigger('drop')

    cy.get('[data-test="constructor_bun_top"]').should('contain', bun_1_name)
    cy.get('[data-test="constructor_bun_bottom"]').should('contain', bun_1_name)

    cy.get('@bun_1').get(counter_container).should('contain', 2)
  });

  it('should drag ingredients', function () {
    cy.get(ingredient_conteiner).contains(ingredient_1_name).as('ingredient_1')
    cy.get(ingredient_conteiner).contains(ingredient_2_name).as('ingredient_2')

    cy.log("Ингредиент должен добавиться 2 раза")
    cy.get('@ingredient_1').trigger('dragstart')
    cy.get(burger_constructor_container).trigger('drop')

    cy.get('@ingredient_1').trigger('dragstart')
    cy.get(burger_constructor_container).trigger('drop')

    cy.get(constructor_other_ingredients)
      .children()
      .should('contain', ingredient_1_name)
      .and('have.length', 2)

    cy.get('@ingredient_1').get(counter_container).should('contain', 2)

    cy.get('@ingredient_2').trigger('dragstart')
    cy.get(burger_constructor_container).trigger('drop')
    cy.get(constructor_other_ingredients)
      .children()
      .should('contain', ingredient_2_name)

    cy.get('@ingredient_2').get(counter_container).should('contain', 1)
  });

});