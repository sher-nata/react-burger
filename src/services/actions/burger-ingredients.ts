import { Dispatch } from 'redux';
import { appRequest } from '../../utils/request-utils';
import { ingredientsUrl } from '../../utils/global_const';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENTS = 'INCREASE_INGREDIENTS';
export const DECREASE_INGREDIENTS = 'DECREASE_INGREDIENTS';
export const RESET_INGREDIENTS = 'RESET_INGREDIENTS';


export function getIngredientRequest() {
    return { type: GET_INGREDIENTS_REQUEST }
}

export function getIngredientSuccess(data: IBurgerIngredient[]) {
    return { type: GET_INGREDIENTS_SUCCESS,
            payload: { ingredients: data }
     }
}

export function getIngredientFailed(message: string) {
    return { type: GET_INGREDIENTS_FAILED,
            payload: { message: message }
     }
}

export function increaseIngredient(itemId: string) {
    return { type: INCREASE_INGREDIENTS,  
                payload: { id: itemId }}
}

export function decreaseIngredient(itemId: string) {
    return { type: DECREASE_INGREDIENTS,  
                payload: { id: itemId }}
}

export function resetIngredients() {
    return { type: RESET_INGREDIENTS }
}



export const getIngredients = () => (dispatch: Dispatch<any>) => {

    dispatch( getIngredientRequest() );

    appRequest(ingredientsUrl).then((data) => {
        dispatch( getIngredientSuccess(data['data']) );
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
            dispatch( getIngredientFailed(error.message) );
            console.log(error.message)
        }
      });

  };