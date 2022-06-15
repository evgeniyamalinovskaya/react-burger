import {CLOSE_INGREDIENT, OPEN_INGREDIENT} from "../actions/ingredient";

//Исходное состояния
const initialState = {
    openDetailsModal: null,
}

//Редьюсер с использованием конструкции switch-case.
export const detailsReducer = (state = initialState, action) => {
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
