export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openIngredientModal(id: string) {
    return { type: OPEN_INGREDIENT_MODAL, 
        payload: { id: id } }
}

export function openOrderModal() {
    return { type: OPEN_ORDER_MODAL }
}

export function closeModal() {
    return { type: CLOSE_MODAL }  
}
