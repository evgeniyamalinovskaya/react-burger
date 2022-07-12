import { combineReducers } from 'redux';
import { burgerConstructorReducer } from './constructor';
import { burgerIngredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { detailsReducer } from './ingredient';
import { registration } from './registration';

// Корневой редьюсер, который обрабатывает экшены
export const rootReducer = combineReducers({
    burgerConstructor: burgerConstructorReducer,
    burgerIngredients: burgerIngredientsReducer,
    ingredient: detailsReducer,
    order: orderReducer,
    user: registration
});
