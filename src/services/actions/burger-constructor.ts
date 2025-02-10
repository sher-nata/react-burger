import {v4 as uuidv4} from 'uuid';

export const CONSTRUCTOR_ADD_INGREDIENT: 'CONSTRUCTOR_ADD_INGREDIENT' = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_DELETE_INGREDIENT: 'CONSTRUCTOR_DELETE_INGREDIENT' = 'CONSTRUCTOR_DELETE_INGREDIENT';
export const CONSTRUCTOR_MOVE_INGREDIENT: 'CONSTRUCTOR_MOVE_INGREDIENT' = 'CONSTRUCTOR_MOVE_INGREDIENT';
export const CONSTRUCTOR_CLEAR_INGREDIENTS: 'CONSTRUCTOR_CLEAR_INGREDIENTS' = 'CONSTRUCTOR_CLEAR_INGREDIENTS';


export interface IConstructorAddIngredient {
    readonly type: typeof CONSTRUCTOR_ADD_INGREDIENT;
    readonly payload: { item: IBurgerIngredient | undefined, uniqueId?: string };
}

export interface IConstructorDeleteIngredient {
    readonly type: typeof CONSTRUCTOR_DELETE_INGREDIENT;
    readonly payload: {index: number};
}

export interface IConstructorMoveIngredient {
    readonly type: typeof CONSTRUCTOR_MOVE_INGREDIENT;
    readonly payload: {dragIndex: number, hoverIndex: number};
}

export interface IConstructorClearIngredients {
    readonly type: typeof CONSTRUCTOR_CLEAR_INGREDIENTS;
}

export type TBurgerConstructorActions = 
    | IConstructorAddIngredient
    | IConstructorDeleteIngredient
    | IConstructorMoveIngredient
    | IConstructorClearIngredients;


export function constructorAddIngredient(item: IBurgerIngredient | undefined): IConstructorAddIngredient {
    return { type: CONSTRUCTOR_ADD_INGREDIENT,  
                payload: { item: item, uniqueId: uuidv4() }}
}

export function constructorDeleteIngredient(index: number): IConstructorDeleteIngredient {
    return { type: CONSTRUCTOR_DELETE_INGREDIENT, 
                payload: { index: index }}
}

export function constructorMoveIngredient(dragIndex: number, hoverIndex: number): IConstructorMoveIngredient {
    return { type: CONSTRUCTOR_MOVE_INGREDIENT,  
                payload: { dragIndex: dragIndex, hoverIndex: hoverIndex }}
}

export function constructorClearIngredient(): IConstructorClearIngredients {
    return { type: CONSTRUCTOR_CLEAR_INGREDIENTS }
}
