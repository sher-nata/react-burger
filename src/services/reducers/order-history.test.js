import { orderHistoryReducer, initialState } from "./order-history"
import { WS_ORDER_HISTORY_ON_CONNECTING, 
    WS_ORDER_HISTORY_DISCONNECT, 
    WS_ORDER_HISTORY_ON_OPEN, 
    WS_ORDER_HISTORY_ON_ERROR,
    WS_ORDER_HISTORY_ON_CLOSE,
    WS_ORDER_HISTORY_ON_MESSAGE,
} from '../actions/order-history'

const feed = {
    orders: [],
    total: 95,
    totalToday: 15
}
const state = initialState


describe('order-history reducer', () => {
    it('should return the initial state', () => {
        expect(orderHistoryReducer(undefined, {})).toEqual(
            state
        )
    })

    it('should handle WS_ORDER_HISTORY_ON_CONNECTING', () => {
        let action = {
            type: WS_ORDER_HISTORY_ON_CONNECTING,
            }
        
        expect(orderHistoryReducer(state, action)).toEqual(
            {
                ...state, connectionError: null, status: 'connecting'
            }
        )
    })

    it('should handle WS_ORDER_HISTORY_ON_OPEN', () => {
        let action = {
            type: WS_ORDER_HISTORY_ON_OPEN,
            }
        
        expect(orderHistoryReducer(state, action)).toEqual(
            {
                ...state, connectionError: null, status: 'connected'
            }
        )
    })

    it('should handle WS_ORDER_HISTORY_ON_MESSAGE', () => {
        let action = {
            type: WS_ORDER_HISTORY_ON_MESSAGE,
            payload: { feed }
            }
        
        expect(orderHistoryReducer(state, action)).toEqual(
            {
                ...state, connectionError: null, feed: { ...action.payload }
            }
        )
    })

    it('should handle WS_ORDER_HISTORY_ON_ERROR', () => {
        let action = {
            type: WS_ORDER_HISTORY_ON_ERROR,
            payload: 'error'
        }
        
        expect(orderHistoryReducer(state, action)).toEqual(
            {
                ...state, connectionError: action.payload,
            }
        )
    })

    it('should handle WS_ORDER_HISTORY_DISCONNECT', () => {
        let action = {
            type: WS_ORDER_HISTORY_DISCONNECT,
        }
        
        expect(orderHistoryReducer(state, action)).toEqual(
            {
                ...state, connectionError: undefined, status: 'disconnected'
            }
        )
    })

    it('should handle WS_ORDER_HISTORY_ON_CLOSE', () => {
        let action = {
            type: WS_ORDER_HISTORY_ON_CLOSE,
        }
        
        expect(orderHistoryReducer(state, action)).toEqual(
            {
                ...state, connectionError: undefined, status: 'disconnected'
            }
        )
    })
})