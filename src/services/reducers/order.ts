import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL, TGetOrderActions,
} from '../actions/order' ;

//Тип состояния
type TOrderState = {
    orderNumber: number | null;
    orderRequest: boolean;
    orderFailed: boolean;
}

// Исходное состояние
const initialOrderState: TOrderState = {
    orderNumber: null,
    orderRequest: false,
    orderFailed: false,
};

export const orderReducer = (state = initialOrderState, action: TGetOrderActions): TOrderState => {
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
