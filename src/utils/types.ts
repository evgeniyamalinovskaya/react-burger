import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { store } from '../services/store';
import {TIngredientModalActions} from "../services/actions/ingredient";
import {TGetOrderActions} from "../services/actions/order";
import {TGetIngredientsActions} from "../services/actions/ingredients";
import {TUserActions} from "../services/actions/registration";
import {TWsActions} from "../services/actions/wsActionTypes";
import {TWsUserActions} from "../services/actions/wsUser";
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

type TApplicationActions = TIngredientModalActions | TGetIngredientsActions | TGetOrderActions | TUserActions | TWsActions | TWsUserActions;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch & AppThunk>();
// Типизация thunk в нашем приложении
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
    >;

//Тип для ингредиентов
export type TIngredient = {
    _id: string;
    name: string;
    type: 'bun' | 'main' | 'sauce';
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uId?: string;
    currentTab?: number | undefined;
};

//Типы для Api
export type TIngredientsParseResponse = {
    data: TIngredient[];
    success: boolean;
}

export type TOrdersParseResponse = {
    name: string;
    order: { number: number };
    success: boolean;
}
export type TPasswordParseResponse = {
    success: boolean;
    message: string;
}

//Тип для User
export type TUser = {
    success: boolean;
    user: {
        email: string;
        name: string;
    };
    accessToken: string;
    refreshToken: string;
};

//Тип для socketMiddleware
export type TWs = {
    wsInit: string;
    wsInitWithToken: string;
    wsSendMessage: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
};

export type TOrderDetails = {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
    id?: string;
};

export type TOrder = {
    success: boolean;
    orders: TOrderDetails[];
    total: number;
    totalToday: number;
};

