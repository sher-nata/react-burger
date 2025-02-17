import { orderReducer, initialState } from "./order-details"
import { SET_ORDER_REQUEST, 
    SET_ORDER_SUCCESS, 
    SET_ORDER_FAILED
} from '../actions/order-details'

const orderData = {
    success: true,
    name: 'name',
    oreder: {}
}

const state = initialState

describe('order-details reducer', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(
            state
        )
    })

    it('should handle SET_ORDER_REQUEST', () => {
        let action = {
            type: SET_ORDER_REQUEST,
            }
        
        expect(orderReducer(state, action)).toEqual(
            {
                ...state, isLoading: true
            }
        )
    })

    it('should handle SET_ORDER_SUCCESS', () => {
        let action = {
            type: SET_ORDER_SUCCESS,
            payload: { order: orderData }
            }
        
        expect(orderReducer(state, action)).toEqual(
            {
                ...state, isFailed: false, orderDetails: action.payload.order, isLoading: false
            }
        )
    })

    it('should handle SET_ORDER_FAILED', () => {
        let action = {
            type: SET_ORDER_FAILED,
            payload: { message: 'error' }
            }
        
        expect(orderReducer(state, action)).toEqual(
            {
                orderDetails: undefined, isFailed: true, isLoading: false
            }
        )
    })
})