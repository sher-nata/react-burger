import { 
    OPEN_INGREDIENT_MODAL, 
    OPEN_ORDER_MODAL,
    CLOSE_MODAL } from "../actions/modal";

import { TModalActions } from "../actions/modal";


type TModalState = {
  isModalOpen: boolean;
  isOrder: boolean;
}

const initialState: TModalState = {
    isModalOpen: false,
    isOrder: false
}

export const modalReducer = (state = initialState, action: TModalActions): TModalState => {
    switch (action.type) {
      case OPEN_INGREDIENT_MODAL: {
        return {
            ...state,
            isModalOpen: true,
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
          isModalOpen: false,
          isOrder: false
        };
      }
      default: {
        return state;
      }
    }
  };