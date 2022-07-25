export const WS_USER_CONNECTION_START = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE = 'WS_USER_GET_MESSAGE';
export const WS_USER_SEND_MESSAGE = 'WS_USER_SEND_MESSAGE';

export const wsConnectionOpen = () => {
    return {
        type: WS_USER_CONNECTION_START
    }
}
export const wsConnectionSuccess = () => {
    return {
        type: WS_USER_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = () => {
    return {
        type: WS_USER_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = () => {
    return {
        type: WS_USER_CONNECTION_CLOSED
    };
};

export const wsGetMessage = order => {
    return {
        type: WS_USER_GET_MESSAGE,
        payload: order
    };
};

export const wsSendMessage = order => {
    return {
        type: WS_USER_SEND_MESSAGE,
        payload: order
    };
};
