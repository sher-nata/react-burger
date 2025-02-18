import { modalReducer, initialState } from "./modal"
import { OPEN_INGREDIENT_MODAL, 
    OPEN_ORDER_MODAL, 
    CLOSE_MODAL
} from '../actions/modal'

const state = initialState

describe('modal reducer', () => {
    it('should return the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual(
            state
        )
    })

     it('should handle OPEN_INGREDIENT_MODAL', () => {
        let action = {
            type: OPEN_INGREDIENT_MODAL,
            payload: { id: '1' }
        }
        
        expect(modalReducer(state, action)).toEqual(
            {
                ...state, isModalOpen: true, isOrder: false
            }
        )
    })

    it('should handle OPEN_ORDER_MODAL', () => {
        let action = {
            type: OPEN_ORDER_MODAL
        }
        
        expect(modalReducer(state, action)).toEqual(
            {
                ...state, isModalOpen: true, isOrder: true
            }
        )
    })

    it('should handle CLOSE_MODAL', () => {
        let action = {
            type: CLOSE_MODAL
        }
        
        expect(modalReducer(state, action)).toEqual(
            {
                ...state, isModalOpen: false, isOrder: false
            }
        )
    })
})