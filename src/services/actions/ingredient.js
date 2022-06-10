//Экшен для открытия и закрытия попапов
export const OPEN_INGREDIENT = 'OPEN_INGREDIENT';
export const CLOSE_INGREDIENT = 'CLOSE_INGREDIENT';

//Cразу диспатчv в редьюсер открытие модалки и её закрытие
export const openIngredientCurrent = (ingredient) => ({
    type: 'OPEN_INGREDIENT',
    payload: ingredient,
});

export const closeModalIngredient = () => ({
    type: 'CLOSE_INGREDIENT',
});
