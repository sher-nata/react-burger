import { feedReducer, initialState } from "./feed"
import { WS_FEED_ON_CONNECTING, 
    WS_FEED_DISCONNECT, 
    WS_FEED_ON_OPEN, 
    WS_FEED_ON_ERROR,
    WS_FEED_ON_CLOSE,
    WS_FEED_ON_MESSAGE,
} from '../actions/feed'

const feed = {
    orders: [],
    total: 95,
    totalToday: 15
}
const state = initialState


describe('feed reducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(
            state
        )
    })

    it('should handle WS_FEED_ON_CONNECTING', () => {
        let action = {
            type: WS_FEED_ON_CONNECTING,
            }
        
        expect(feedReducer(state, action)).toEqual(
            {
                ...state, connectionError: null, status: 'connecting'
            }
        )
    })

    it('should handle WS_FEED_ON_OPEN', () => {
        let action = {
            type: WS_FEED_ON_OPEN,
            }
        
        expect(feedReducer(state, action)).toEqual(
            {
                ...state, connectionError: null, status: 'connected'
            }
        )
    })

    it('should handle WS_FEED_ON_MESSAGE', () => {
        let action = {
            type: WS_FEED_ON_MESSAGE,
            payload: { feed }
            }
        
        expect(feedReducer(state, action)).toEqual(
            {
                ...state, connectionError: null, feed: { ...action.payload }
            }
        )
    })

    it('should handle WS_FEED_ON_ERROR', () => {
        let action = {
            type: WS_FEED_ON_ERROR,
            payload: 'error'
        }
        
        expect(feedReducer(state, action)).toEqual(
            {
                ...state, connectionError: action.payload,
            }
        )
    })

    it('should handle WS_FEED_DISCONNECT', () => {
        let action = {
            type: WS_FEED_DISCONNECT,
        }
        
        expect(feedReducer(state, action)).toEqual(
            {
                ...state, connectionError: undefined, status: 'disconnected'
            }
        )
    })

    it('should handle WS_FEED_ON_CLOSE', () => {
        let action = {
            type: WS_FEED_ON_CLOSE,
        }
        
        expect(feedReducer(state, action)).toEqual(
            {
                ...state, connectionError: undefined, status: 'disconnected'
            }
        )
    })
})