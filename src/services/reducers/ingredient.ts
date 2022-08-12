import {CLOSE_INGREDIENT, OPEN_INGREDIENT, TIngredientModalActions} from "../actions/ingredient";
import { TIngredient } from '../../utils/types';

//Тип состояния
type TInitialState = {
    openDetailsModal: TIngredient | string | null;
}
//Исходное состояния
const initialState: TInitialState =  {
    openDetailsModal: null,
}

//Редьюсер с использованием конструкции switch-case.
export const detailsReducer = (state = initialState, action: TIngredientModalActions): TInitialState => {
    switch (action.type) {
        //Добавление (открытие модального окна)
        case OPEN_INGREDIENT:
            return {
                ...state,
                openDetailsModal: action.payload,
            }
        //Добавление (закрытие модального окна)
        case CLOSE_INGREDIENT:
            return {
                ...state,
                openDetailsModal: null,
            }
        default:
            return state;
    }
}
