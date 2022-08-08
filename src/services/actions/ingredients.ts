import { getData } from "../../components/Api/Api";
import { TIngredient } from '../../utils/types';
import { AppThunk, AppDispatch } from '../../utils/types';

//Экшены для деталей ингредиентов
//Добавим TypeScript к типам экшенов
export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' = 'GET_INGREDIENTS_FAILED';

//Экшен для переключения табов
//Добавим TypeScript к типам экшенов
export const GET_CURRENT_TAB: 'SET_CURRENT_TAB' = 'SET_CURRENT_TAB';

// Объединяем в Union
export type TGetIngredientsActions =
    IGetIngredientsRequestAction
    | IGetIngredientsSuccessAction
    | IGetIngredientsErrorAction
    | IGetCurrentTabAction;

// Типизация экшенов
export interface IGetIngredientsRequestAction {
    type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccessAction {
    type: typeof GET_INGREDIENTS_SUCCESS;
    ingredients: Array<TIngredient>
}
export interface IGetIngredientsErrorAction {
    type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetCurrentTabAction {
    type: typeof GET_CURRENT_TAB;
    currentTab: Array<TIngredient>
}

//Типизированный thunk
export const getIngredients: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        });
        getData()
            .then((res) => {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        ingredients: res.data,
                    });
            })
            .catch((err) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
                console.log(err)
            });
    };
}
