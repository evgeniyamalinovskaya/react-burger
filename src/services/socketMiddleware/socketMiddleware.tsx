import {getCookie} from "../../utils/cookie";
import { Middleware, MiddlewareAPI } from 'redux';
import {TWs} from '../../utils/types';

export const socketMiddleware = (wsUrl: string, wsActions: TWs): Middleware => {
    return (store: MiddlewareAPI) => {
           let socket: WebSocket | null = null;

        return next => action => {
            const {dispatch} = store;
            const {type, payload} = action;
            const {wsInit, wsInitWithToken, wsSendMessage, onOpen, onClose, onError, onMessage} = wsActions;

            if (type === wsInitWithToken) {
                const token = getCookie('token')
                if (token) {
                    console.log('Socket with my orders create')
                    socket = new WebSocket(`${wsUrl}?token=${token}`);
                }
            } else if (type === wsInit) {
                console.log('Socket with all orders create')
                socket = new WebSocket(wsUrl);
            }

            //открытие
            if (socket) {
                socket.onopen = event => {
                    dispatch({type: onOpen, payload: event});
                };
                //ошибка
                socket.onerror = event => {
                    dispatch({type: onError, payload: event});
                };
                //сообщение
                socket.onmessage = event => {
                    const {data} = event;
                    const parsedData = JSON.parse(data);
                    const {success, ...restParsedData} = parsedData;

                    dispatch({type: onMessage, payload: restParsedData});
                };
                //закрытие
                socket.onclose = event => {
                    dispatch({type: onClose, payload: event});
                };

                if (type === wsSendMessage) {
                    const orders = {...payload};
                    socket.send(JSON.stringify(orders));
                }
            }

            next(action);
        };
    };
};
