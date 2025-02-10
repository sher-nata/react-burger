import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../reducers/index';
import { TBurgerConstructorActions } from "../actions/burger-constructor"
import { TBurgerIngredientsActions } from "../actions/burger-ingredients"
import { TModalActions } from "../actions/modal"
import { TOrderActions } from "../actions/order-details"
import { TUserActions } from "../actions/user"
import {WS_FEED_ON_CONNECTING, WS_FEED_CONNECT, WS_FEED_DISCONNECT, WS_FEED_ON_OPEN, WS_FEED_ON_ERROR, WS_FEED_ON_CLOSE,
    WS_FEED_ON_MESSAGE, WS_FEED_SEND_MESSAGE, TWSFeedActions} from "../actions/feed"
import { WS_ORDER_HISTORY_CONNECT, WS_ORDER_HISTORY_DISCONNECT, WS_ORDER_HISTORY_ON_CLOSE, WS_ORDER_HISTORY_ON_CONNECTING,
    WS_ORDER_HISTORY_ON_ERROR, WS_ORDER_HISTORY_ON_MESSAGE, WS_ORDER_HISTORY_ON_OPEN, WS_ORDER_HISTORY_SEND_MESSAGE, 
    TWSOrderHistoryActions } from '../actions/order-history';


// Типизация всех экшенов приложения
export type TApplicationActions = 
    | TBurgerConstructorActions
    | TBurgerIngredientsActions
    | TModalActions
    | TOrderActions
    | TUserActions
    | TWSFeedActions
    | TWSOrderHistoryActions;


export type TWSStoreActions = {
    connect: typeof WS_FEED_CONNECT | typeof WS_ORDER_HISTORY_CONNECT,
    disconnect: typeof WS_FEED_DISCONNECT | typeof WS_ORDER_HISTORY_DISCONNECT,
    onConnecting: typeof WS_FEED_ON_CONNECTING | typeof WS_ORDER_HISTORY_ON_CONNECTING,
    onOpen: typeof WS_FEED_ON_OPEN | typeof WS_ORDER_HISTORY_ON_OPEN,
    onClose: typeof WS_FEED_ON_CLOSE | typeof WS_ORDER_HISTORY_ON_CLOSE,
    onError: typeof WS_FEED_ON_ERROR | typeof WS_ORDER_HISTORY_ON_ERROR,
    onMessage: typeof WS_FEED_ON_MESSAGE | typeof WS_ORDER_HISTORY_ON_MESSAGE,
    sendMessage: typeof WS_FEED_SEND_MESSAGE | typeof WS_ORDER_HISTORY_SEND_MESSAGE,
  };


export type AppStore = typeof store;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;