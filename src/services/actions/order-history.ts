export const WS_ORDER_HISTORY_ON_CONNECTING: 'WS_ORDER_HISTORY_ON_CONNECTING' = 'WS_ORDER_HISTORY_ON_CONNECTING';
export const WS_ORDER_HISTORY_CONNECT: 'WS_ORDER_HISTORY_CONNECT' = 'WS_ORDER_HISTORY_CONNECT';
export const WS_ORDER_HISTORY_DISCONNECT: 'WS_ORDER_HISTORY_DISCONNECT' = 'WS_ORDER_HISTORY_DISCONNECT';
export const WS_ORDER_HISTORY_ON_OPEN: 'WS_ORDER_HISTORY_ON_OPEN' = 'WS_ORDER_HISTORY_ON_OPEN';
export const WS_ORDER_HISTORY_ON_ERROR: 'WS_ORDER_HISTORY_ON_ERROR' = 'WS_ORDER_HISTORY_ON_ERROR';
export const WS_ORDER_HISTORY_ON_CLOSE: 'WS_ORDER_HISTORY_ON_CLOSE' = 'WS_ORDER_HISTORY_ON_CLOSE';
export const WS_ORDER_HISTORY_ON_MESSAGE: 'WS_ORDER_HISTORY_ON_MESSAGE' = 'WS_ORDER_HISTORY_ON_MESSAGE';
export const WS_ORDER_HISTORY_SEND_MESSAGE: 'WS_ORDER_HISTORY_SEND_MESSAGE' = 'WS_ORDER_HISTORY_SEND_MESSAGE';


export interface IWSOrderHistoryOnConnectingAction {
    readonly type: typeof WS_ORDER_HISTORY_ON_CONNECTING;
  }
  
  export interface IWSOrderHistoryConnectAction {
    readonly type: typeof WS_ORDER_HISTORY_CONNECT;
    readonly payload: string;
  }

  export interface IWSOrderHistoryDisconnectAction {
    readonly type: typeof WS_ORDER_HISTORY_DISCONNECT;
  }

  export interface IWSOrderHistoryOnOpenAction {
    readonly type: typeof WS_ORDER_HISTORY_ON_OPEN;
  }
  
  export interface IWSOrderHistoryOnErrorAction {
    readonly type: typeof WS_ORDER_HISTORY_ON_ERROR;
    readonly payload: Event;
  }
  
  export interface IWSOrderHistoryOnCloseAction {
    readonly type: typeof WS_ORDER_HISTORY_ON_CLOSE;
  }
  
  export interface IWSOrderHistoryOnMessageAction {
    readonly type: typeof WS_ORDER_HISTORY_ON_MESSAGE;
    readonly payload: IFeed;
  }
  
  export interface IWSOrderHistorySendMessageAction {
    readonly type: typeof WS_ORDER_HISTORY_SEND_MESSAGE;
    readonly payload: {message: string};
  }
  
  export type TWSOrderHistoryActions =
    | IWSOrderHistoryOnConnectingAction
    | IWSOrderHistoryConnectAction
    | IWSOrderHistoryDisconnectAction
    | IWSOrderHistoryOnOpenAction
    | IWSOrderHistoryOnErrorAction
    | IWSOrderHistoryOnCloseAction
    | IWSOrderHistoryOnMessageAction
    | IWSOrderHistorySendMessageAction;