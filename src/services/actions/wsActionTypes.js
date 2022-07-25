export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE = 'WS_SEND_MESSAGE';


//для создания объекта класса WebSocket
export const wsConnectionOpen = () => {
    return {
        type: WS_CONNECTION_START
    }
}

//при успешном соединении
export const wsConnectionSuccess = () => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
}

//в случае ошибки соединения
export const wsConnectionError = () => {
    return {
        type: WS_CONNECTION_ERROR
    }
}

//при закрытии соединения
export const wsConnectionClosed = () => {
    return {
        type: WS_CONNECTION_CLOSED
    }
}

//при получении сообщения от сервера
export const wsGetMessage = (order) => {
    return {
        type: WS_GET_MESSAGE,
        payload: order
    }
}

//для отправки сообщений на сервер
export const wsSendMessage = (order) => {
    return {
        type: WS_SEND_MESSAGE,
        payload: order
    }
}





