import { setData } from "../../components/Api/Api";

//Экшены для кнопки оформить заказ
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const OPEN_ORDER_MODAL = "OPEN_ORDER_MODAL";
export const CLOSE_ORDER_MODAL = "CLOSE_ORDER_MODAL";

export function openOrderModal() {
    return {
        type: OPEN_ORDER_MODAL,
    };
}

export function closeOrderModal() {
    return {
        type: CLOSE_ORDER_MODAL,
    };
}

export function getOrder(order) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        setData(order)
            .then((res) => {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        orderNumber: res.order.number,
                    });
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
                console.log(err)
            })
            .finally(() => dispatch({type: OPEN_ORDER_MODAL}));
    };
}
