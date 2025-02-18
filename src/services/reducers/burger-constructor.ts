import update from 'immutability-helper'
import { 
  CONSTRUCTOR_ADD_INGREDIENT, 
  CONSTRUCTOR_DELETE_INGREDIENT, 
  CONSTRUCTOR_MOVE_INGREDIENT,
  CONSTRUCTOR_CLEAR_INGREDIENTS } from "../actions/burger-constructor";

import type { TBurgerConstructorActions } from "../actions/burger-constructor";


type TBurgerConstructorState = {
    bun: IBurgerIngredient | null;
    ingredients: IConstructorBurgerIngredient[];
}

export const initialState: TBurgerConstructorState = {
    bun: null, 
    ingredients: []
  }

  export function constructorReducer(state = initialState, action: TBurgerConstructorActions): TBurgerConstructorState {
        switch (action.type) {
            case CONSTRUCTOR_ADD_INGREDIENT: {
               if (action.payload.item?.type === 'bun'){
                    return { ...state, bun: action.payload.item };
               }
               else {
                    return { ...state, ingredients: [...state.ingredients, 
                      {...action.payload.item, uniqueId: action.payload.uniqueId} as IConstructorBurgerIngredient] }
               }
            }
            case CONSTRUCTOR_DELETE_INGREDIENT: {
              return { ...state, ingredients: 
                update(state.ingredients, {
                  $splice: [
                    [action.payload.index, 1]]})}  
    
            }
            case CONSTRUCTOR_MOVE_INGREDIENT: {
                return { ...state, ingredients: 
                  update(state.ingredients, {
                    $splice: [
                      [action.payload.dragIndex, 1],
                      [action.payload.hoverIndex, 0, state.ingredients[action.payload.dragIndex]],
                    ],
                  })};
          }case CONSTRUCTOR_CLEAR_INGREDIENTS: {
            return {bun: null, ingredients: []}   
    
          }
            default: {
              return state;
            }
        }
    }
