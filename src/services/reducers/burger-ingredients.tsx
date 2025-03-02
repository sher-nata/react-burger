import { 
    GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED,
    INCREASE_INGREDIENTS,
    DECREASE_INGREDIENTS,
    RESET_INGREDIENTS } from "../actions/burger-ingredients";
    import { TBurgerIngredientsActions } from "../actions/burger-ingredients";

export const initialState: TIngridients = {
    ingredients: [],
    trunc_ingredients: {}, 
    isLoading: false, 
    isFailed: false
  }


export function ingredientsReducer(state = initialState, action: TBurgerIngredientsActions): TIngridients{
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return { ...state, isLoading: true };
        }
        case GET_INGREDIENTS_SUCCESS: {
            let ingredients = action.payload.ingredients
            let trunc_ingredients: ITruncIngredients = {}
            for (let item of ingredients) {             
                trunc_ingredients[item._id] = {price: item.price, name: item.name, image_mobile: item.image_mobile}   
            }  
            return { ...state, isFailed: false, ingredients: action.payload.ingredients, 
                trunc_ingredients: trunc_ingredients, isLoading: false };
        }
        case GET_INGREDIENTS_FAILED: {
            return { ingredients: [], trunc_ingredients: {}, isFailed: true, isLoading: false };
        }
        case INCREASE_INGREDIENTS: {
            const isBun: boolean = action.payload !== undefined && action.payload.id && typeof action.payload.id === 'string' ?
                state.ingredients.find(ing => (ing._id === action.payload.id))?.type === 'bun': false;
            return { ...state, ingredients: [...state.ingredients].map(item =>
                item._id === action.payload.id ? { ...item, __v: (item.type==='bun') ? 2 : (item.__v + 1) } : 
                (isBun && item.type === 'bun') ? { ...item, __v: 0} : item
              )};
        }
        case DECREASE_INGREDIENTS: {
            return { ...state, ingredients: [...state.ingredients].map(item =>
                item._id === action.payload.id ? { ...item, __v: (item.type==='bun') ? 0 : (item.__v - 1) } : item
              )};
        }
        case RESET_INGREDIENTS: {
            return { ...state, ingredients: [...state.ingredients].map((item) => {return {...item, __v: 0} })  };
        }
        default: {
          return state;
        }
    }
}