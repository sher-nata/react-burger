import { OPEN_ORDER_MODAL } from "./modal";

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED';


export const setOrder = (orderUrl, orderDetails) => async (dispatch) => {
        
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({
        type: SET_ORDER_REQUEST
    });
    try {
        const response = await fetch(orderUrl, { 
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({"ingredients": orderDetails}),
            signal });
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        dispatch({
            type: SET_ORDER_SUCCESS,
            payload: {order: data}
            });
        dispatch({
                type: OPEN_ORDER_MODAL
            });
    } catch (err) {
        if (err.name !== 'AbortError') {
            dispatch({
                type: SET_ORDER_FAILED,
                message: err.message
                });
            console.log(err.message)
        }
    }

  };