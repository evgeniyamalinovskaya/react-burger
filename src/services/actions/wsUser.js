export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';
export const WS_USER_SEND_MESSAGE = 'WS_USER_SEND_MESSAGE';

export const wsUserConnectionStart = () => ({
    type: WS_USER_CONNECTION_START
})

//при успешном соединении
export const wsUserConnectionSuccess = () => {
    return {
        type: WS_USER_CONNECTION_SUCCESS
    }
}

export const wsUserConnectionClosed = () => ({
    type: WS_USER_CONNECTION_CLOSED
})

//при получении сообщения от сервера
export const wsUserGetMessage = (order) => {
    return {
        type: WS_USER_GET_MESSAGE,
        payload: order
    }
}

//для отправки сообщений на сервер
export const wsUserSendMessage = (order) => {
    return {
        type: WS_USER_SEND_MESSAGE,
        payload: order
    }
}

