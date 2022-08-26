import {TOrder} from "../../utils/types";

//Добавим TypeScript к типам экшенов
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

// Объединяем в Union
export type TWsActions =
    IWsConnectionStartAction
    | IWsConnectionSuccessAction
    | IWsConnectionErrorAction
    | IWsConnectionClosedAction
    | IWsGetMessageAction
    | IWsSendMessageAction;

// Типизация экшенов
interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
}
interface IWsConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
interface IWsConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}
interface IWsConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
interface IWsGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TOrder
}
interface IWsSendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: TOrder
}

//для создания объекта класса WebSocket
export const wsConnectionOpen = (): IWsConnectionStartAction => {
    return {
        type: WS_CONNECTION_START
    }
}
//при успешном соединении
export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
    return {
        type: WS_CONNECTION_SUCCESS
    }
}
//в случае ошибки соединения
export const wsConnectionError = (): IWsConnectionErrorAction => {
    return {
        type: WS_CONNECTION_ERROR
    }
}
//при закрытии соединения
export const wsConnectionClosed = (): IWsConnectionClosedAction => {
    return {
        type: WS_CONNECTION_CLOSED
    }
}
//при получении сообщения от сервера
export const wsGetMessage = (payload: TOrder): IWsGetMessageAction => {
    return {
        type: WS_GET_MESSAGE,
        payload
    }
}
//для отправки сообщений на сервер
export const wsSendMessage = (payload: TOrder): IWsSendMessageAction => {
    return {
        type: WS_SEND_MESSAGE,
        payload
    }
}





