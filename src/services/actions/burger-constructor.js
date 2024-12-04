import {v4 as uuidv4} from 'uuid';

export const CONSTRUCTOR_ADD_INGRIDIENT = 'CONSTRUCTOR_ADD_INGRIDIENT';
export const CONSTRUCTOR_DELETE_INGRIDIENT = 'CONSTRUCTOR_DELETE_INGRIDIENT';
export const CONSTRUCTOR_MOVE_INGRIDIENT = 'CONSTRUCTOR_MOVE_INGRIDIENT';
export const CONSTRUCTOR_CLEAR_INGRIDIENTS = 'CONSTRUCTOR_CLEAR_INGRIDIENTS';

export function constructorAddIngridient(item) {
    return { type: CONSTRUCTOR_ADD_INGRIDIENT,  
                payload: { item: item, uniqueId: uuidv4() }}
}

export function constructorDeleteIngridient(index) {
    return { type: CONSTRUCTOR_DELETE_INGRIDIENT, 
                payload: { index: index }}
}

export function constructorMoveIngridient(dragIndex, hoverIndex) {
    return { type: CONSTRUCTOR_MOVE_INGRIDIENT,  
                payload: { dragIndex: dragIndex, hoverIndex: hoverIndex }}
}

export function constructorClearIngridient() {
return { type: CONSTRUCTOR_CLEAR_INGRIDIENTS }
}
