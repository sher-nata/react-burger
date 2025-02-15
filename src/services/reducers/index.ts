import { combineReducers, createStore } from 'redux';
import { compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { ingredientsReducer } from './burger-ingredients';
import { modalReducer } from './modal';
import { constructorReducer } from './burger-constructor';
import { orderReducer } from './order-details';
import { userReducer } from './user';
import { feedReducer } from './feed';
import { orderHistoryReducer } from './order-history';
import {socketMiddleware} from "../middleware/socket-middlware";
import { WS_FEED_CONNECT, WS_FEED_DISCONNECT, WS_FEED_ON_CLOSE, WS_FEED_ON_CONNECTING, 
  WS_FEED_ON_ERROR, WS_FEED_ON_MESSAGE, WS_FEED_ON_OPEN, WS_FEED_SEND_MESSAGE } from '../actions/feed';
import { WS_ORDER_HISTORY_CONNECT, WS_ORDER_HISTORY_DISCONNECT, WS_ORDER_HISTORY_ON_CLOSE, WS_ORDER_HISTORY_ON_CONNECTING,
  WS_ORDER_HISTORY_ON_ERROR, WS_ORDER_HISTORY_ON_MESSAGE, WS_ORDER_HISTORY_ON_OPEN, WS_ORDER_HISTORY_SEND_MESSAGE 
 } from '../actions/order-history';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
    

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    modal: modalReducer,
    constructor_burger: constructorReducer,
    order: orderReducer,
    user: userReducer,
    feed: feedReducer,
    history: orderHistoryReducer,
  });

  const FeedMiddleware = socketMiddleware({
    connect: WS_FEED_CONNECT,
    disconnect: WS_FEED_DISCONNECT,
    onConnecting: WS_FEED_ON_CONNECTING,
    onOpen: WS_FEED_ON_OPEN,
    onClose: WS_FEED_ON_CLOSE,
    onError: WS_FEED_ON_ERROR,
    onMessage: WS_FEED_ON_MESSAGE,
    sendMessage: WS_FEED_SEND_MESSAGE
});

const orderHistoryMiddleware = socketMiddleware({
  connect: WS_ORDER_HISTORY_CONNECT,
  disconnect: WS_ORDER_HISTORY_DISCONNECT,
  onConnecting: WS_ORDER_HISTORY_ON_CONNECTING,
  onOpen: WS_ORDER_HISTORY_ON_OPEN,
  onClose: WS_ORDER_HISTORY_ON_CLOSE,
  onError: WS_ORDER_HISTORY_ON_ERROR,
  onMessage: WS_ORDER_HISTORY_ON_MESSAGE,
  sendMessage: WS_ORDER_HISTORY_SEND_MESSAGE
}, true);

const enhancer = composeEnhancers(applyMiddleware(thunk, FeedMiddleware, orderHistoryMiddleware));

export const store = createStore(rootReducer, {}, enhancer);

