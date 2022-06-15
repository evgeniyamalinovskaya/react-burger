import React , { useCallback }from 'react';
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
import {closeOrderModal} from "../../services/actions/order";

const App = () => {
    //Стор состояния в компонентах
    const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.burgerIngredients);
    const  orderNumber  = useSelector(store => store.order.orderNumber);

    const dispatch = useDispatch();
    React.useEffect(() => {
        // Отправляем экшен при монтировании компонента
        dispatch(getIngredients());
    }, [dispatch]);

    //Стор для открытия модального окна
    const openDetailsModal = useSelector(store => store.ingredient.openDetailsModal);

    // Закрываем модальные окна
    const handleCloseOrder = useCallback(() => {
        dispatch(closeOrderModal());
    }, [dispatch]);

    const handleDetailsModal = useCallback(() => {
        dispatch(closeModalIngredient());
    }, [dispatch]);

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
            {openDetailsModal &&
                <Modal title="Детали ингредиентов" onClose={handleDetailsModal}>
                    <IngredientDetails ingredient={openDetailsModal}/> {/* вложенное содержимое, идет в пропс children */}
                </Modal>
            }

            {orderNumber &&  (
                <Modal title="Детали заказа" onClose={handleCloseOrder}>
                    <OrderDetails />
                </Modal>
            )}

        </div>
    )
}

export default App;
