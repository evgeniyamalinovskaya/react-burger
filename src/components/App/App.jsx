import React from 'react';
import AppStyles from './App.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from 'react-redux';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {getIngredients} from '../../services/actions/ingredients'
import {closeModalIngredient} from "../../services/actions/ingredient";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
    //Стор состояния в компонентах
    const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.burgerIngredients);
    //Стор состояния в бургер конструкторе
    const { orderRequest, orderFailed, orderNumber } = useSelector((store) => store.order);

    const dispatch = useDispatch();
    React.useEffect(() => {
        // Отправляем экшен при монтировании компонента
        dispatch(getIngredients());
    }, [dispatch]);

    //Стор для открытия модального окна
    const openModal = useSelector(store => store.ingredient.openModal);

    // Клик по крестику модального окна (закрывает модальное окно)
    const handleCloseModal = (item) => {
        dispatch(closeModalIngredient(item));
    };

    return (
        <div className={AppStyles.app}>
            <AppHeader/>
            {!ingredientsFailed && !ingredientsRequest && (
            <main className={AppStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor />
                </DndProvider>
            </main>
            )}
            {openModal &&
                <Modal title="Детали ингредиентов" onClose={handleCloseModal}>
                    <IngredientDetails ingredient={openModal}/> {/* вложенное содержимое, идет в пропс children */}
                </Modal>
            }

            {orderNumber &&  (
                <Modal title="Детали заказа" onClose={handleCloseModal}>
                    {!orderFailed && !orderRequest && (
                    <OrderDetails />
                    )}
                </Modal>
            )}

        </div>
    )
}

export default App;
