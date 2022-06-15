import { v4 as uuidv4 } from 'uuid';

//Экшены для конструктора ингредиентов
export const ADD_BUN = 'ADD_BUN';
export const RESET_INGREDIENT = 'RESET_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';


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
//Перетаскивание ингредиентов в конструктор
export function resetItem (dragIndex, hoverIndex) {
    return {
        type: RESET_INGREDIENT,
        dragIndex,
        hoverIndex
    };
}

