import {compose, createStore, applyMiddleware} from 'redux';
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from './actions/wsActionTypes';

import {
    WS_USER_CONNECTION_START,
    WS_USER_SEND_MESSAGE,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_CLOSED,
    WS_USER_CONNECTION_ERROR,
    WS_USER_GET_MESSAGE
} from './actions/wsUser';

import {rootReducer} from './reducers';
import {socketMiddleware} from './socketMiddleware/socketMiddleware';
import thunk from 'redux-thunk';

//Чтобы подключиться к бэкенду для получения всех заказов, используйте URL
const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUserUrl = 'wss://norma.nomoreparties.space/orders';

//Словарь типов экшенов
const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};
const wsUserActions = {
    wsInitWithToken: WS_USER_CONNECTION_START,
    wsSendMessage: WS_USER_SEND_MESSAGE,
    onOpen: WS_USER_CONNECTION_SUCCESS,
    onClose: WS_USER_CONNECTION_CLOSED,
    onError: WS_USER_CONNECTION_ERROR,
    onMessage: WS_USER_GET_MESSAGE
};

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Инициализируем хранилище с помощью корневого редьюсера (передаем socketMiddleware и url подключения и словарь типов экшенов, которые будут вызываться на разные события в Websocket.)
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUserUrl, wsUserActions))));
