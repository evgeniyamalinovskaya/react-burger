import {CLOSE_INGREDIENT, OPEN_INGREDIENT} from "../actions/ingredient";

//Исходное состояния
const initialState = {
   openModal: null,
   detailOpenedModal: false
}

//Редьюсер с использованием конструкции switch-case.
export const detailsReducer = (state = initialState, action) => {
    switch (action.type) {
        //Добавление (открытие модального окна)
        case OPEN_INGREDIENT:
            return {
                ...state,
                openModal: action.payload,
                detailOpenedModal: true
            }
        //Добавление (закрытие модального окна)
        case CLOSE_INGREDIENT:
            return {
                ...state,
                openModal: null,
                detailOpenedModal: false
            }
        default:
            return state;
    }
}
