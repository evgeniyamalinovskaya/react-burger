import {
    WS_USER_CONNECTION_CLOSED,
    WS_USER_CONNECTION_ERROR,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_GET_MESSAGE
} from "../actions/wsUser";

const initialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export const wsUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_USER_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_USER_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_USER_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_USER_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
};
