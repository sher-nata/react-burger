import { ingredientsReducer, initialState } from "./burger-ingredients"
import { GET_INGREDIENTS_REQUEST, 
    GET_INGREDIENTS_SUCCESS, 
    GET_INGREDIENTS_FAILED, 
    INCREASE_INGREDIENTS,
    DECREASE_INGREDIENTS,
    RESET_INGREDIENTS
} from '../actions/burger-ingredients'

const burgerIngredients = [
    {
        _id:"643d69a5c3f7b9001cfa093c",
        name:"Краторная булка N-200i",
        type:"bun",
        proteins:80,
        fat:24,
        carbohydrates:53,
        calories:420,
        price:1255,
        image:"https://code.s3.yandex.net/react/code/bun-02.png",
        image_mobile:"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/bun-02-large.png",
        __v:0
    },
    {
        _id:"643d69a5c3f7b9001cfa0944",
        name:"Соус традиционный галактический",
        type:"sauce",
        proteins:42,
        fat:24,
        carbohydrates:42,
        calories:99,
        price:15,
        image:"https://code.s3.yandex.net/react/code/sauce-03.png",
        image_mobile:"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/sauce-03-large.png",
        __v:0
    },
    {
        _id:"643d69a5c3f7b9001cfa0947",
        name:"Плоды Фалленианского дерева",
        type:"main",
        proteins:20,
        fat:5,
        carbohydrates:55,
        calories:77,
        price:874,
        image:"https://code.s3.yandex.net/react/code/sp_1.png",
        image_mobile:"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
        image_large:"https://code.s3.yandex.net/react/code/sp_1-large.png",
        __v:0,
    }
]
const trunc_ingredients = {
    "643d69a5c3f7b9001cfa093c": {
        price: 1255, 
        name: "Краторная булка N-200i", 
        image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
    },
    "643d69a5c3f7b9001cfa0944": {
        price: 15, 
        name: "Соус традиционный галактический", 
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png"
    },
    "643d69a5c3f7b9001cfa0947": {
        price: 874, 
        name: "Плоды Фалленианского дерева", 
        image_mobile: "https://code.s3.yandex.net/react/code/sp_1-mobile.png"
    },     
} 

const state = initialState

describe('burger-ingredients reducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(
            state
        )
    })

    it('should handle GET_INGREDIENTS_REQUEST', () => {
        let action = {
            type: GET_INGREDIENTS_REQUEST,
            }
        
        expect(ingredientsReducer(state, action)).toEqual(
            {
                ...state, isLoading: true
            }
        )
    })

    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        let action = {
            type: GET_INGREDIENTS_SUCCESS,
            payload: { ingredients: burgerIngredients }
        }
        
        expect(ingredientsReducer(state, action)).toEqual(
            {
                ...state, isFailed: false, ingredients: action.payload.ingredients, 
                trunc_ingredients: trunc_ingredients, isLoading: false
            }
        )
    })

    it('should handle GET_INGREDIENTS_FAILED', () => {
        let action = {
            type: GET_INGREDIENTS_FAILED,
            }
        
        expect(ingredientsReducer(state, action)).toEqual(
            {
                ...initialState, isFailed: true
            }
        )
    })

    it('should handle INCREASE_INGREDIENTS', () => {
        let action = {
            type: INCREASE_INGREDIENTS,
            payload: { id: "643d69a5c3f7b9001cfa0944" }
            }
        
        expect(ingredientsReducer(state, action)).toEqual(
            {
                ...state, ingredients: [...state.ingredients].map(item =>
                    item._id === action.payload.id ? { ...item, __v: (item.type==='bun') ? 2 : (item.__v + 1) } : 
                    (isBun && item.type === 'bun') ? { ...item, __v: 0} : item)
            }
        )
    })

    it('should handle DECREASE_INGREDIENTS', () => {
        let action = {
            type: DECREASE_INGREDIENTS,
            payload: { id: "643d69a5c3f7b9001cfa0944" }
            }
        
        expect(ingredientsReducer(state, action)).toEqual(
            {
                ...state, ingredients: [...state.ingredients].map(item =>
                    item._id === action.payload.id ? { ...item, __v: (item.type==='bun') ? 0 : (item.__v - 1) } : item)
            }
        )
    })

    it('should handle RESET_INGREDIENTS', () => {
        let action = {
            type: RESET_INGREDIENTS,
            }
        
        expect(ingredientsReducer(state, action)).toEqual(
            {
                ...state, ingredients: [...state.ingredients].map((item) => {return {...item, __v: 0} })
            }
        )
    })
})
