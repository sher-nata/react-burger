import { 
    GET_INGRIDIENTS_REQUEST, 
    GET_INGRIDIENTS_SUCCESS, 
    GET_INGRIDIENTS_FAILED,
    INCREASE_INGRIDIENTS,
    DECREASE_INGRIDIENTS } from "../actions/burger-ingridients";

const initialState = {
    ingridients: [], 
    isLoading: false, 
    isFailed: false
  }


export function ingridientsReducer(state = initialState, action){
    switch (action.type) {
        case GET_INGRIDIENTS_REQUEST: {
            return { ...state, isLoading: true };
        }
        case GET_INGRIDIENTS_SUCCESS: {
            return { ...state, isFailed: false, ingridients: action.payload.ingridients, isLoading: false };
        }
        case GET_INGRIDIENTS_FAILED: {
            return { ingridients: [], isFailed: true, isLoading: false };
        }
        case INCREASE_INGRIDIENTS: {
            const isBun = state.ingridients.find(ing => (ing._id === action.payload.id)).type === 'bun';
            return { ...state, ingridients: [...state.ingridients].map(item =>
                item._id === action.payload.id ? { ...item, __v: (item.type==='bun') ? 2 : (item.__v + 1) } : 
                (isBun && item.type === 'bun') ? { ...item, __v: 0} : item
              )};
        }
        case DECREASE_INGRIDIENTS: {
            return { ...state, ingridients: [...state.ingridients].map(item =>
                item._id === action.payload.id ? { ...item, __v: (item.type==='bun') ? 0 : (item.__v - 1) } : item
              )};
        }
        default: {
          return state;
        }
    }
}