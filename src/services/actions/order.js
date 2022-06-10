import { setData } from "../../components/Api/Api";

//Экшены для кнопки оформить заказ
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getOrder(orderId) {
    return function (dispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        });
        setData(orderId)
            .then((res) => {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        order: res.order.number,
                    });
            })
            .catch((err) => {
                dispatch({
                    type: GET_ORDER_FAILED,
                })
                console.log(err)
            });
    };
}
