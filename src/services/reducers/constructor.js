import update from 'immutability-helper';
import { ADD_BUN, RESET_INGREDIENT, DELETE_INGREDIENT } from '../actions/constructor';

const initialConstructorState = {
    element: [],
    bun: null,
    productsIds: [],
}

export const burgerConstructorReducer = (state = initialConstructorState, action) => {
    switch (action.type) {
        case ADD_BUN:
            //если только булка
            if (action.item.type === 'bun') {
                if (state.bun) {
                    return {
                        ...state,
                        bun: action.item,
                        productsIds: state.productsIds.filter(id => id !== state.bun._id)    //id
                            .concat(action.item._id),
                    };
                } else {
                    return {
                        ...state,
                        bun: action.item,
                        productsIds: [...state.productsIds, action.item._id],                //id
                    };
                }
            }
            return {
                ...state,
                element: [...state.element, action.item ],
                productsIds: [...state.productsIds, action.item._id],                        //id
            };
        //Удаление ингредиента из выбранного списка
        case DELETE_INGREDIENT:
            return {
                ...state,
                element: [...state.element].filter(item => item.uId !== action.item.uId),
                productsIds: [...state.productsIds].filter(id => id !== action.item._id),      //id
            }
        //Перетаскивание ингредиентов в конструктор
        case RESET_INGREDIENT:
            return {
                ...state,
                element: update(state.element, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.element[action.dragIndex]],
                    ]
                })
            }
        default:
            return state;
    }
}
