import update from 'immutability-helper'
import { 
  CONSTRUCTOR_ADD_INGRIDIENT, 
  CONSTRUCTOR_DELETE_INGRIDIENT, 
  CONSTRUCTOR_MOVE_INGRIDIENT,
  CONSTRUCTOR_CLEAR_INGRIDIENTS } from "../actions/burger-constructor";

const initialState = {
    bun: null, 
    ingridients: []
  }


export function constructorReducer(state = initialState, action){
    switch (action.type) {
        case CONSTRUCTOR_ADD_INGRIDIENT: {
           if (action.payload.item.type === 'bun'){
                return { ...state, bun: action.payload.item };
           }
           else {
                return { ...state, ingridients: [...state.ingridients, 
                  {...action.payload.item, uniqueId: action.payload.uniqueId}] }
           }
        }
        case CONSTRUCTOR_DELETE_INGRIDIENT: {
          return { ...state, ingridients: 
            update(state.ingridients, {
              $splice: [
                [action.payload.index, 1]]})}  

        }
        case CONSTRUCTOR_MOVE_INGRIDIENT: {
            return { ...state, ingridients: 
              update(state.ingridients, {
                $splice: [
                  [action.payload.dragIndex, 1],
                  [action.payload.hoverIndex, 0, state.ingridients[action.payload.dragIndex]],
                ],
              })};
      }case CONSTRUCTOR_CLEAR_INGRIDIENTS: {
        return {bun: null, ingridients: []}   

      }
        default: {
          return state;
        }
    }
}