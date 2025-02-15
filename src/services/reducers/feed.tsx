import {
    WS_FEED_ON_CONNECTING,
    WS_FEED_CONNECT,
    WS_FEED_DISCONNECT,
    WS_FEED_ON_OPEN,
    WS_FEED_ON_ERROR,
    WS_FEED_ON_CLOSE,
    WS_FEED_ON_MESSAGE,
    TWSFeedActions
  } from '../actions/feed';
  
  const initialState: TFeedState = {
    status: 'disconnected',
    feed: null,
    connectionError: null,
};
  
export const feedReducer = (state = initialState, action: TWSFeedActions) => {
    switch (action.type) {
        case WS_FEED_ON_CONNECTING:
            return {
                ...state,
                connectionError: null,
                status: 'connecting'
            };
        case WS_FEED_ON_OPEN:
            return {
                ...state,
                connectionError: null,
                status: 'connected'
            };
        case WS_FEED_ON_CLOSE:
            return {
                ...state,
                connectionError: undefined,
                status: 'disconnected'
            };
        case WS_FEED_DISCONNECT:
            return {
                ...state,
                connectionError: undefined,
                status: 'disconnected'
            };
        case WS_FEED_ON_ERROR:
            return {
                ...state,
                connectionError: action.payload,
            };
        case WS_FEED_ON_MESSAGE:
            return {
                ...state,
                error: undefined,
                feed: { ...action.payload }
            };

        default:
            return state;
    }
};