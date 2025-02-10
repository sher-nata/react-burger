import type { Middleware, MiddlewareAPI } from 'redux';
import type { AppDispatch, RootState } from '../types';
import type { TApplicationActions, TWSStoreActions } from '../types';
import { getAccessToken, refreshAccessToken } from '../../utils/request-utils';

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = (wsActions: TWSStoreActions, withTokenRefresh: boolean = false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TApplicationActions) => {
        const { dispatch, getState } = store;
        const { type } = action;
        let socket: WebSocket | null = null;
        const {
            connect,
            sendMessage,
            onOpen,
            onClose,
            onError,
            onMessage,
            onConnecting,
            disconnect,
        } = wsActions;
        let isConnected = false;
        let reconnectTimer = 0;
        let url = "";
        if (type ===  connect) {
            url = action.payload;
            socket = new WebSocket(url);
            isConnected = true;
            dispatch({ type: onConnecting });
        }
        if (socket) {
            socket.onopen = event => {
                dispatch({ type: onOpen, payload: event });
            };

            socket.onerror = event => {
                dispatch({ type: onError, payload: event });
            };

            socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                if (withTokenRefresh && parsedData.message === "Invalid or missing token") {
                    refreshAccessToken()
                        .then(() => {
                            const accessToken = getAccessToken()
                            if (accessToken) { 
                                const wssUrl = new URL(url);
                                wssUrl.searchParams.set(
                                    "token",
                                    accessToken.replace("Bearer ", "")
                                );
                                dispatch({type: connect, payload: wssUrl});
                            }
                        })
                        .catch(err => {
                            dispatch({ type: onError, payload: event });
                        });
                        dispatch({ type: disconnect });
                }
                else {
                    const { success, ...restParsedData } = parsedData;
                    dispatch({ type: onMessage, payload: { ...restParsedData } });
                }
            };

            socket.onclose = event => {
                dispatch({ type: onClose, payload: event });

                if (isConnected) {
                    reconnectTimer = window.setTimeout(() => {
                        dispatch({ type: connect, payload: url });
                    }, RECONNECT_PERIOD);
                }
            };

            if (type === sendMessage) {
                socket.send(JSON.stringify(action.payload));
            }

            if (socket && type === disconnect) {
                clearTimeout(reconnectTimer);
                isConnected = false;
                reconnectTimer = 0;
                socket.close();
                socket = null;    
            }
    }

      next(action);
    };
  }) as Middleware;
};