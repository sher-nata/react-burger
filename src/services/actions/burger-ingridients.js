import { appRequest } from '../../utils/request-utils';

export const GET_INGRIDIENTS_REQUEST = 'GET_INGRIDIENTS_REQUEST';
export const GET_INGRIDIENTS_SUCCESS = 'GET_INGRIDIENTS_SUCCESS';
export const GET_INGRIDIENTS_FAILED = 'GET_INGRIDIENTS_FAILED';
export const INCREASE_INGRIDIENTS = 'INCREASE_INGRIDIENTS';
export const DECREASE_INGRIDIENTS = 'DECREASE_INGRIDIENTS';
export const RESET_INGRIDIENTS = 'RESET_INGRIDIENTS';


export function getIngridientRequest() {
    return { type: GET_INGRIDIENTS_REQUEST }
}

export function getIngridientSuccess(data) {
    return { type: GET_INGRIDIENTS_SUCCESS,
            payload: { ingridients: data }
     }
}

export function getIngridientFailed(message) {
    return { type: GET_INGRIDIENTS_FAILED,
            payload: { message: message }
     }
}

export function increaseIngridient(itemId) {
    return { type: INCREASE_INGRIDIENTS,  
                payload: { id: itemId }}
}

export function decreaseIngridient(itemId) {
    return { type: DECREASE_INGRIDIENTS,  
                payload: { id: itemId }}
}

export function resetIngridients() {
    return { type: RESET_INGRIDIENTS }
}



export const getIngridients = (ingridientsUrl) => (dispatch) => {

    dispatch( getIngridientRequest() );

    appRequest(ingridientsUrl).then((data) => {
        dispatch( getIngridientSuccess(data['data']) );
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
            dispatch( getIngridientFailed(error.message) );
            console.log(error.message)
        }
      });

  };