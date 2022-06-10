//Экшены для конструктора ингредиентов
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const RESET_INGREDIENT = 'RESET_INGREDIENT';
export const REORDER_INGREDIENT = 'REORDER_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';


export function addBun (item) {
    return {
        type: ADD_BUN,
        item,
    };
}

export function addItem (item) {
    return {
        type: ADD_INGREDIENT,
        item,
    };
}

export function deleteItem (item) {
    return {
        type: DELETE_INGREDIENT,
        item,
    };
}

export function resetItem () {
    return {
        type: RESET_INGREDIENT,
    };
}

