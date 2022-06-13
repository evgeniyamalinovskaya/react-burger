import { v4 as uuidv4 } from 'uuid';

//Экшены для конструктора ингредиентов
export const ADD_BUN = 'ADD_BUN';
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const RESET_INGREDIENT = 'RESET_INGREDIENT';
export const REORDER_INGREDIENT = 'REORDER_INGREDIENT'
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';


// export function addBun (item) {
//     return {
//         type: ADD_BUN,
//         item,
//     };
// }

// export function addItem (item) {
//     return {
//         type: ADD_INGREDIENT,
//         item,
//     };
// }

export function addBun(item) {

    return {
        type: ADD_BUN,
        item: {
            ...item,
            uId: uuidv4()
        }
    };
}

//Удаление ингредиента из выбранного списка
export function deleteItem (item) {
    return {
        type: DELETE_INGREDIENT,
        item,
    };
}

export function resetItem (dragIndex, hoverIndex) {
    return {
        type: RESET_INGREDIENT,
        dragIndex,
        hoverIndex
    };
}

