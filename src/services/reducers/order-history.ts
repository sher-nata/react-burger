import {
    WS_ORDER_HISTORY_CONNECT,
    WS_ORDER_HISTORY_DISCONNECT,
    WS_ORDER_HISTORY_ON_CLOSE,
    WS_ORDER_HISTORY_ON_CONNECTING,
    WS_ORDER_HISTORY_ON_ERROR,
    WS_ORDER_HISTORY_ON_MESSAGE,
    WS_ORDER_HISTORY_ON_OPEN,
    TWSOrderHistoryActions
  } from '../actions/order-history';
  
  const initialState: TFeedState = {
    status: 'disconnected',
    feed: null,
    connectionError: null,
};
  
export const orderHistoryReducer = (state = initialState, action: TWSOrderHistoryActions) => {
    switch (action.type) {
        case WS_ORDER_HISTORY_ON_CONNECTING:
            return {
                ...state,
                connectionError: null,
                status: 'connecting'
            };
        case WS_ORDER_HISTORY_ON_OPEN:
            return {
                ...state,
                connectionError: null,
                status: 'connected'
            };
        case WS_ORDER_HISTORY_ON_CLOSE:
            return {
                ...state,
                connectionError: undefined,
                status: 'disconnected'
            };
        case WS_ORDER_HISTORY_DISCONNECT:
            return {
                ...state,
                connectionError: undefined,
                status: 'disconnected'
            };        
        case WS_ORDER_HISTORY_ON_ERROR:
            return {
                ...state,
                connectionError: action.payload,
            };
        case WS_ORDER_HISTORY_ON_MESSAGE:
            return {
                ...state,
                error: undefined,
                feed: { ...action.payload }
            };

        default:
            return state;
    }
};