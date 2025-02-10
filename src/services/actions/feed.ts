export const WS_FEED_ON_CONNECTING: 'WS_FEED_ON_CONNECTING' = 'WS_FEED_ON_CONNECTING';
export const WS_FEED_CONNECT: 'WS_FEED_CONNECT' = 'WS_FEED_CONNECT';
export const WS_FEED_DISCONNECT: 'WS_FEED_DISCONNECT' = 'WS_FEED_DISCONNECT';
export const WS_FEED_ON_OPEN: 'WS_FEED_ON_OPEN' = 'WS_FEED_ON_OPEN';
export const WS_FEED_ON_ERROR: 'WS_FEED_ON_ERROR' = 'WS_FEED_ON_ERROR';
export const WS_FEED_ON_CLOSE: 'WS_FEED_ON_CLOSE' = 'WS_FEED_ON_CLOSE';
export const WS_FEED_ON_MESSAGE: 'WS_FEED_ON_MESSAGE' = 'WS_FEED_ON_MESSAGE';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';


export interface IWSFeedOnConnectingAction {
    readonly type: typeof WS_FEED_ON_CONNECTING;
  }
  
  export interface IWSFeedConnectAction {
    readonly type: typeof WS_FEED_CONNECT;
    readonly payload: string;
  }

  export interface IWSFeedDisconnectAction {
    readonly type: typeof WS_FEED_DISCONNECT;
  }

  export interface IWSFeedOnOpenAction {
    readonly type: typeof WS_FEED_ON_OPEN;
  }
  
  export interface IWSFeedOnErrorAction {
    readonly type: typeof WS_FEED_ON_ERROR;
    readonly payload: Event;
  }
  
  export interface IWSFeedOnCloseAction {
    readonly type: typeof WS_FEED_ON_CLOSE;
  }
  
  export interface IWSFeedOnMessageAction {
    readonly type: typeof WS_FEED_ON_MESSAGE;
    readonly payload: IFeed;
  }
  
  export interface IWSFeedSendMessageAction {
    readonly type: typeof WS_FEED_SEND_MESSAGE;
    readonly payload: {message: string};
  }
  
  export type TWSFeedActions =
    | IWSFeedOnConnectingAction
    | IWSFeedConnectAction
    | IWSFeedDisconnectAction
    | IWSFeedOnOpenAction
    | IWSFeedOnErrorAction
    | IWSFeedOnCloseAction
    | IWSFeedOnMessageAction
    | IWSFeedSendMessageAction;