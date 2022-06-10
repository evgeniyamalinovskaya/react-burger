import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,} from '../actions/order' ;

// Исходное состояние
const initialOrderState = {
    orderIngredients: [],
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
                orderIngredients: action.orderIngredients
            };
        }
        //Успешный ответ на получение деталей ингредиентов
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                price: action.price,
                orderNumber: action.res.order.number,
                orderRequest: false,
                orderFailed: false
            };
        }
        //Ответ не пришел
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderIngredients: [],
                orderRequest: false,
                orderFailed: false,
            };
        }
        default:
            return state
    }
};
