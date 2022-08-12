import { TIngredient } from '../../utils/types';

//Экшен для открытия и закрытия попапов
//Добавим TypeScript к типам экшенов
export const OPEN_INGREDIENT: 'OPEN_INGREDIENT' = 'OPEN_INGREDIENT';
export const CLOSE_INGREDIENT: 'CLOSE_INGREDIENT' = 'CLOSE_INGREDIENT';

// Объединяем в Union
export type TIngredientModalActions =
    IClickOnIngredientModalAction
    | ICloseOnIngredientModalAction;

// Типизация экшенов
export interface IClickOnIngredientModalAction {
    type: typeof OPEN_INGREDIENT;
    payload: TIngredient;
}
export interface ICloseOnIngredientModalAction {
    type: typeof CLOSE_INGREDIENT;
}

//Cразу диспатчv в редьюсер открытие модалки и её закрытие
export const openIngredientCurrent = (payload: TIngredient): IClickOnIngredientModalAction => ({
    type: OPEN_INGREDIENT,
    payload
});

export const closeModalIngredient = (): ICloseOnIngredientModalAction => ({
    type: CLOSE_INGREDIENT,
});

