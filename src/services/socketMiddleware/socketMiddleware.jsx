import { getCookie } from '../../utils/cookie';

export const socketMiddleware = (wsUrl, wsActions, isUser = false) => {
    return store => {
        let socket = null;

        return next => action => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } = wsActions;

            if (type === wsInit) {
                if (!isUser) {
                    socket = new WebSocket(wsUrl);
                } else {
                    const accessToken = getCookie('token');
                    socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
                };
            }
            //открытие
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen, payload: event });
                };
            //ошибка
                socket.onerror = event => {
                    dispatch({ type: onError, payload: event });
                };
            //сообщение
                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;

                    dispatch({ type: onMessage, payload: restParsedData });
                };
            //закрытие
                socket.onclose = event => {
                    dispatch({ type: onClose, payload: event });
                };

                if (type === wsSendMessage) {
                    const orders = { ...payload };
                    socket.send(JSON.stringify(orders));
                }
            }

            next(action);
        };
    };
};
