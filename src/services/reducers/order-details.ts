import { 
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS,
    SET_ORDER_FAILED
 } from "../actions/order-details";
 import {TOrderActions} from "../actions/order-details";

 type TOrderState = {
    orderDetails: IOrderData | undefined;
    isLoading: boolean;
    isFailed: boolean;
  }

 export const initialState: TOrderState = {
    orderDetails: undefined, 
    isLoading: false, 
    isFailed: false
  }


export function orderReducer(state = initialState, action: TOrderActions): TOrderState{
    switch (action.type) {
        case SET_ORDER_REQUEST: {
            return { ...state, isLoading: true };
        }
        case SET_ORDER_SUCCESS: {
            return { ...state, isFailed: false, orderDetails: action.payload.order, isLoading: false };
        }
        case SET_ORDER_FAILED: {
            return { orderDetails: undefined, isFailed: true, isLoading: false };
        }
        default: {
          return state;
        }
    }
}