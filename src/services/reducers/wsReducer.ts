import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE, TWsActions
} from '../actions/wsActionTypes';
import {TOrderDetails} from "../../utils/types";

type TWsState = {
    wsConnected: boolean;
    orders: TOrderDetails[];
    total: number | null;
    totalToday: number | null
};

const initialState: TWsState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
};

export const wsReducer = (state = initialState, action: TWsActions): TWsState => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                wsConnected: false
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                orders: action.payload.orders,
                total: action.payload.total,
                totalToday: action.payload.totalToday
            };
        default:
            return state;
    }
}
