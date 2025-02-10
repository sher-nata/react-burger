export const OPEN_INGREDIENT_MODAL: 'OPEN_INGREDIENT_MODAL' = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL: 'CLOSE_MODAL' = 'CLOSE_MODAL';

export interface IOpenIngredientModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
    payload: { id: string } 
}

export interface IOpenOrderModal {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalActions = 
    | IOpenIngredientModal
    | IOpenOrderModal
    | ICloseModal;

export function openIngredientModal(id: string): IOpenIngredientModal {
    return { type: OPEN_INGREDIENT_MODAL, 
        payload: { id: id } }
}

export function openOrderModal(): IOpenOrderModal {
    return { type: OPEN_ORDER_MODAL }
}

export function closeModal(): ICloseModal {
    return { type: CLOSE_MODAL }  
}
