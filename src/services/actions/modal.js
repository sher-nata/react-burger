export const OPEN_INGRIDIENT_MODAL = 'OPEN_INGRIDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function openIngridientModal(id) {
    return { type: OPEN_INGRIDIENT_MODAL, 
        payload: { id: id } }
}

export function openOrderModal() {
    return { type: OPEN_ORDER_MODAL }
}

export function closeModal() {
    return { type: CLOSE_MODAL }  
}
