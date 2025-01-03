import { 
    OPEN_INGREDIENT_MODAL, 
    OPEN_ORDER_MODAL,
    CLOSE_MODAL } from "../actions/modal";

const initialState = {
    selectedIngridient: null,
    isModalOpen: false,
    isOrder: false
}

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
      case OPEN_INGREDIENT_MODAL: {
        return {
            ...state,
            isModalOpen: true,
            selectedIngredient: action.payload.id
        };
      }
      case OPEN_ORDER_MODAL: {
        return {
            ...state,
            isModalOpen: true,
            isOrder: true
        };
      }
      case CLOSE_MODAL: {
        return {
          ...state,
          selectedIngredient: null,
          isModalOpen: false,
          isOrder: false
        };
      }
      default: {
        return state;
      }
    }
  };