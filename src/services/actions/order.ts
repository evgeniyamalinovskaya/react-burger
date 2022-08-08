import { setData } from "../../components/Api/Api";
import { AppThunk, AppDispatch } from '../../utils/types';

//Экшены для кнопки оформить заказ
//Добавим TypeScript к типам экшенов
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';

// Объединяем в Union
export type TGetOrderActions =
    IGetOrderRequestAction
    | IGetOrderSuccessAction
    | IGetOrderFailedAction
    | ICloseOrderModalAction;

// Типизация экшенов
export interface IGetOrderRequestAction {
    type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccessAction {
    type: typeof GET_ORDER_SUCCESS;
    orderNumber: number
}
export interface IGetOrderFailedAction {
    type: typeof GET_ORDER_FAILED;
}
export interface ICloseOrderModalAction {
    type: typeof CLOSE_ORDER_MODAL;
}
export const closeOrderModal = (): ICloseOrderModalAction => ({
    type: CLOSE_ORDER_MODAL,
});


//Типизированный thunk
export const getOrder: AppThunk = (order: Array<string>) => {
    return function (dispatch: AppDispatch) {
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
    };
}
// export function closeOrderModal() {
//     return {
//         type: CLOSE_ORDER_MODAL,
//     };
// }
