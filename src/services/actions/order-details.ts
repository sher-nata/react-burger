import { Dispatch } from 'redux';
import { protectedAppRequest } from '../../utils/request-utils';
import { openOrderModal } from "./modal";
import { constructorClearIngredient } from "./burger-constructor";
import { resetIngredients } from "./burger-ingredients";
import { orderUrl } from '../../utils/global_const';

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED';


export function setOrderRequest() {
    return { type: SET_ORDER_REQUEST }
}

export function setOrderSuccess(data: IOrderData) {
    return { type: SET_ORDER_SUCCESS,
                payload: { order: data }}
}

export function setOrderFailed(message: string) {
    return { type: SET_ORDER_FAILED,
                payload: { message: message }}
}

export const setOrder = (orderDetails: string[]) => async (dispatch: Dispatch<any>) => {

    dispatch( setOrderRequest() );
    const options = { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"ingredients": orderDetails})
    }
    await protectedAppRequest(orderUrl, options).then((data) => {
        dispatch( setOrderSuccess(data) );
        dispatch( openOrderModal() );
        dispatch( constructorClearIngredient() );
        dispatch( resetIngredients() )
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
            dispatch( setOrderFailed(error.message) );
            console.log(error.message)
        }
      });

  };