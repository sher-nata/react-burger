import update from 'immutability-helper'
import { constructorReducer, initialState } from "./burger-constructor"
import { CONSTRUCTOR_ADD_INGREDIENT, 
    CONSTRUCTOR_DELETE_INGREDIENT, 
    CONSTRUCTOR_MOVE_INGREDIENT, 
    CONSTRUCTOR_CLEAR_INGREDIENTS} from '../actions/burger-constructor'

const item_bun = {
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
}

const item = {
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
}

const item3= {
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

const uniqueId = "47db7025-a79d-41f7-bdb0-c15f3fea24f1"
const uniqueId2 = "47db7025-a79d-41f7-bdb0-c15f3fea24f2"
const uniqueId3 = "47db7025-a79d-41f7-bdb0-c15f3fea24f3"

const state = initialState

describe('burger-constructior reducer', () => {
    it('should return the initial state', () => {
        expect(constructorReducer(undefined, {})).toEqual(
            state
        )
    })

    it('should handle CONSTRUCTOR_ADD_INGREDIENT', () => {
        let action = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            payload: { item: item_bun, uniqueId: uniqueId },
          }
        
        expect(constructorReducer(state, action)).toEqual(
            {
                ...state, bun: action.payload.item
            }
        )

        action = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            payload: { item: item, uniqueId: uniqueId },
          }
        expect(constructorReducer(state, action)).toEqual(
            {
                ...state, ingredients: [...state.ingredients, 
                    {...action.payload.item, uniqueId: action.payload.uniqueId}]
            }
        )

        action = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            payload: { item: item, uniqueId: uniqueId2 },
          }
        expect(constructorReducer(state, action)).toEqual(
            {
                ...state, ingredients: [...state.ingredients, 
                    {...action.payload.item, uniqueId: action.payload.uniqueId}]
            }
        )

        action = {
            type: CONSTRUCTOR_ADD_INGREDIENT,
            payload: { item: item3, uniqueId: uniqueId3 },
          }
        expect(constructorReducer(state, action)).toEqual(
            {
                ...state, ingredients: [...state.ingredients, 
                    {...action.payload.item, uniqueId: action.payload.uniqueId}]
            }
        )
    })

    it('should handle CONSTRUCTOR_DELETE_INGREDIENT', () => {
        let action = {
            type: CONSTRUCTOR_DELETE_INGREDIENT,
            payload: { index: 1},
          }
        expect(constructorReducer(state, action)).toEqual(
            {
                ...state, ingredients: 
                update(state.ingredients, {
                  $splice: [
                    [action.payload.index, 1]]})
            }
        )
    })

    it('should handle CONSTRUCTOR_MOVE_INGREDIENT', () => {
        let action = {
            type: CONSTRUCTOR_MOVE_INGREDIENT,
            payload: { dragIndex: 0, hoverIndex: 1},
          }
        expect(constructorReducer(state, action)).toEqual(
            {
                ...state, ingredients: 
                update(state.ingredients, {
                  $splice: [
                    [action.payload.dragIndex, 1],
                    [action.payload.hoverIndex, 0, state.ingredients[action.payload.dragIndex]],
                  ],
                })
            }
        )
    })

    it('should handle CONSTRUCTOR_CLEAR_INGREDIENTS', () => {
        let action = {
            type: CONSTRUCTOR_CLEAR_INGREDIENTS,
          }
        expect(constructorReducer(state, action)).toEqual(
                initialState
            )
    })
}) 