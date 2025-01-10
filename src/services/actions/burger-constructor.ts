import {v4 as uuidv4} from 'uuid';

export const CONSTRUCTOR_ADD_INGREDIENT = 'CONSTRUCTOR_ADD_INGREDIENT';
export const CONSTRUCTOR_DELETE_INGREDIENT = 'CONSTRUCTOR_DELETE_INGREDIENT';
export const CONSTRUCTOR_MOVE_INGREDIENT = 'CONSTRUCTOR_MOVE_INGREDIENT';
export const CONSTRUCTOR_CLEAR_INGREDIENTS = 'CONSTRUCTOR_CLEAR_INGREDIENTS';

export function constructorAddIngredient(item: IBurgerIngredient | undefined) {
    return { type: CONSTRUCTOR_ADD_INGREDIENT,  
                payload: { item: item, uniqueId: uuidv4() }}
}

export function constructorDeleteIngredient(index: number) {
    return { type: CONSTRUCTOR_DELETE_INGREDIENT, 
                payload: { index: index }}
}

export function constructorMoveIngredient(dragIndex: number, hoverIndex: number) {
    return { type: CONSTRUCTOR_MOVE_INGREDIENT,  
                payload: { dragIndex: dragIndex, hoverIndex: hoverIndex }}
}

export function constructorClearIngredient() {
return { type: CONSTRUCTOR_CLEAR_INGREDIENTS }
}
