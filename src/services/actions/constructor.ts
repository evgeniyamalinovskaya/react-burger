import { v4 as uuidv4 } from 'uuid';
import {TIngredient} from '../../utils/types';
import {IClickOnIngredientModalAction, ICloseOnIngredientModalAction} from "./ingredient";

//Экшены для конструктора ингредиентов
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const RESET_INGREDIENT: 'RESET_INGREDIENT' = 'RESET_INGREDIENT';
export const DELETE_INGREDIENT: 'DELETE_INGREDIENT' = 'DELETE_INGREDIENT';

// Объединяем в Union
export type TIngredientConstructorActions =
    IAddBunAction
    | IDeleteIngredientAction
    | IResetIngredientAction;


// Типизация экшенов
export interface IAddBunAction {
    type: typeof ADD_BUN;
    item: TIngredient;
}

export interface IDeleteIngredientAction {
    type: typeof DELETE_INGREDIENT;
    item: TIngredient;
}

export interface IResetIngredientAction {
    type: typeof RESET_INGREDIENT;
    dragIndex: number;
    hoverIndex: number;
}

export const addBun = (item: TIngredient): IAddBunAction => {
    return {
        type: ADD_BUN,
        item: {
            ...item,
            uId: uuidv4()
        }
    };
}

//Удаление ингредиента из выбранного списка
export const deleteItem = (item: TIngredient):IDeleteIngredientAction => {
    return {
        type: DELETE_INGREDIENT,
        item,
    };
}
//Перетаскивание ингредиентов в конструктор
export const resetItem = (dragIndex: number, hoverIndex: number): IResetIngredientAction => {
    return {
        type: RESET_INGREDIENT,
        dragIndex,
        hoverIndex
    };
}


