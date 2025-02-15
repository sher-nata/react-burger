import { AppDispatch } from '../types';
import { appRequest } from '../../utils/request-utils';
import { ingredientsUrl } from '../../utils/global_const';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';
export const INCREASE_INGREDIENTS: 'INCREASE_INGREDIENTS' = 'INCREASE_INGREDIENTS';
export const DECREASE_INGREDIENTS: 'DECREASE_INGREDIENTS' = 'DECREASE_INGREDIENTS';
export const RESET_INGREDIENTS: 'RESET_INGREDIENTS' = 'RESET_INGREDIENTS';

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    payload: { ingredients: IBurgerIngredient[] }
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED;
    payload: { message: string }
}

export interface IIncreaseIngredients {
    readonly type: typeof INCREASE_INGREDIENTS;
    payload: { id: string  }
}

export interface IDecreaseIngredients {
    readonly type: typeof DECREASE_INGREDIENTS;
    payload: { id: string  }
}

export interface IResetIngredients {
    readonly type: typeof RESET_INGREDIENTS;
}

export type TBurgerIngredientsActions = 
    | IGetIngredientsRequest
    | IGetIngredientsSuccess
    | IGetIngredientsFailed
    | IIncreaseIngredients
    | IDecreaseIngredients
    | IResetIngredients;



export function getIngredientRequest(): IGetIngredientsRequest {
    return { type: GET_INGREDIENTS_REQUEST }
}

export function getIngredientSuccess(data: IBurgerIngredient[]): IGetIngredientsSuccess {
    return { type: GET_INGREDIENTS_SUCCESS,
            payload: { ingredients: data }
     }
}

export function getIngredientFailed(message: string): IGetIngredientsFailed {
    return { type: GET_INGREDIENTS_FAILED,
            payload: { message: message }
     }
}

export function increaseIngredient(itemId: string): IIncreaseIngredients {
    return { type: INCREASE_INGREDIENTS,  
                payload: { id: itemId }}
}

export function decreaseIngredient(itemId: string): IDecreaseIngredients {
    return { type: DECREASE_INGREDIENTS,  
                payload: { id: itemId }}
}

export function resetIngredients(): IResetIngredients {
    return { type: RESET_INGREDIENTS }
}



export const getIngredients = () => (dispatch: AppDispatch) => {

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