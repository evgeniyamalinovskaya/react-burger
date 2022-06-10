import { ADD_BUN, ADD_INGREDIENT, RESET_INGREDIENT, REORDER_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor';

const initialConstructorState = {
    element: [],
    bun: {}
}

export const burgerConstructorReducer = (state = initialConstructorState, action) => {
    switch (action.type) {
        case ADD_BUN:
            return {
                ...state,
                bun: action.item.type === "bun"
                    ? {...action.item, count: 2}
                    : state.bun
            }
        case ADD_INGREDIENT:
            if (action.item.type !== "bun") {
                return {
                    ...state,
                    bun: action.item.type !== "bun",
                    element: [...state.element, action.data],
                }
            }
                return {
                    ...state,
                        bun: action.item,
                        element: [...state.element],
                };

        case DELETE_INGREDIENT:
            return {
                ...state,
                elements: [...state.element].filter((item) => {
            return item.id !== action.id })
            }
        case REORDER_INGREDIENT:
            return {
                ...state,
                elements: action.data
            }
        case RESET_INGREDIENT:
            return {
                ...state,
                elements: [],
                bun: {}
            }
        default:
            return state;
    }
}
