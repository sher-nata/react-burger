import { appRequest } from '../../utils/request-utils';
import { openOrderModal } from "./modal";
import { constructorClearIngridient } from "./burger-constructor";
import { resetIngridients } from "./burger-ingridients";

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED';


export function setOrderRequest() {
    return { type: SET_ORDER_REQUEST }
}

export function setOrderSuccess(data) {
    return { type: SET_ORDER_SUCCESS,
                payload: { order: data }}
}

export function setOrderFailed(message) {
    return { type: SET_ORDER_FAILED,
                payload: { message: message }}
}

export const setOrder = (orderUrl, orderDetails) => async (dispatch) => {

    dispatch( setOrderRequest() );
    const options = { 
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"ingredients": orderDetails})
    }
    appRequest(orderUrl, options).then((data) => {
        dispatch( setOrderSuccess(data) );
        dispatch( openOrderModal() );
        dispatch( constructorClearIngridient() );
        dispatch( resetIngridients() )
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
            dispatch( setOrderFailed(error.message) );
            console.log(error.message)
        }
      });

  };