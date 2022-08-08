import {TOrder} from "../../utils/types";

export const WS_USER_CONNECTION_START: 'WS_USER_CONNECTION_START' = 'WS_USER_CONNECTION_START';
export const WS_USER_CONNECTION_SUCCESS: 'WS_USER_CONNECTION_SUCCESS' = 'WS_USER_CONNECTION_SUCCESS';
export const WS_USER_CONNECTION_ERROR: 'WS_USER_CONNECTION_ERROR' = 'WS_USER_CONNECTION_ERROR';
export const WS_USER_CONNECTION_CLOSED: 'WS_USER_CONNECTION_CLOSED' = 'WS_USER_CONNECTION_CLOSED';
export const WS_USER_GET_MESSAGE: 'WS_USER_GET_MESSAGE' = 'WS_USER_GET_MESSAGE';
export const WS_USER_SEND_MESSAGE: 'WS_USER_SEND_MESSAGE' = 'WS_USER_SEND_MESSAGE';

// Объединяем в Union
export type TWsUserActions =
    IWsUserConnectionStartAction
    | IWsUserConnectionSuccessAction
    | IWsUserConnectionClosedAction
    | IWsUserConnectionErrorAction
    | IWsUserGetMessageAction
    | IWsUserSendMessageAction;

// Типизация экшенов
interface IWsUserConnectionStartAction {
    readonly type: typeof WS_USER_CONNECTION_START;
}
interface IWsUserConnectionSuccessAction {
    readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
interface IWsUserConnectionClosedAction {
    readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
interface IWsUserConnectionErrorAction {
    readonly type: typeof WS_USER_CONNECTION_ERROR;
}
interface IWsUserGetMessageAction {
    readonly type: typeof WS_USER_GET_MESSAGE;
    payload: TOrder
}
interface IWsUserSendMessageAction {
    readonly type: typeof WS_USER_SEND_MESSAGE;
    payload: TOrder
}

//для создания объекта класса WebSocket
export const wsUserConnectionStart = (): IWsUserConnectionStartAction => ({
    type: WS_USER_CONNECTION_START
})
//при успешном соединении
export const wsUserConnectionSuccess = (): IWsUserConnectionSuccessAction => {
    return {
        type: WS_USER_CONNECTION_SUCCESS
    }
}
//при закрытии соединения
export const wsUserConnectionClosed = (): IWsUserConnectionClosedAction => ({
    type: WS_USER_CONNECTION_CLOSED
})
//в случае ошибки соединения
export const wsConnectionError = (): IWsUserConnectionErrorAction => {
    return {
        type: WS_USER_CONNECTION_ERROR
    }
}
//при получении сообщения от сервера
export const wsUserGetMessage = (payload: TOrder): IWsUserGetMessageAction => {
    return {
        type: WS_USER_GET_MESSAGE,
        payload
    }
}
//для отправки сообщений на сервер
export const wsUserSendMessage = (payload: TOrder): IWsUserSendMessageAction => {
    return {
        type: WS_USER_SEND_MESSAGE,
        payload
    }
}

