import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    OPEN_ORDER_MODAL,
    CLOSE_ORDER_MODAL,
} from '../actions/order' ;
import {CLOSE_INGREDIENT, OPEN_INGREDIENT} from "../actions/ingredient";

// Исходное состояние
const initialOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialOrderState, action) => {
    switch (action.type) {
        //Запрос на получение деталей ингредиентов
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            };
        }
        //Успешный ответ на получение деталей ингредиентов
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                orderNumber: action.orderNumber,
                orderRequest: false,
                orderFailed: false,
            };
        }
        //Ответ не пришел
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: true,
            };
        }

        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                orderNumber: null,

            };
        }
        default:
            return state
    }
};
