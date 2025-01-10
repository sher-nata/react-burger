import { 
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS,
    SET_ORDER_FAILED
 } from "../actions/order-details";

 const initialState = {
    orderDetails: {}, 
    isLoading: false, 
    isFailed: false
  }


export function orderReducer(state = initialState, action: IAction){
    switch (action.type) {
        case SET_ORDER_REQUEST: {
            return { ...state, isLoading: true };
        }
        case SET_ORDER_SUCCESS: {
            return { ...state, isFailed: false, orderDetails: action.payload.order, isLoading: false };
        }
        case SET_ORDER_FAILED: {
            return { orderDetails: {}, isFailed: true, isLoading: false };
        }
        default: {
          return state;
        }
    }
}