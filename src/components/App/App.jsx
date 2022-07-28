import React from 'react';
import AppStyles from './App.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from 'react-redux';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { Modal } from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import {getIngredients} from '../../services/actions/ingredients';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {closeOrderModal} from "../../services/actions/order";
import { Switch, Route, useLocation, useHistory  } from 'react-router-dom';
import { Profile } from '../../pages/profile/profile';
import { Register } from '../../pages/register/register';
import { Login } from '../../pages/login/login';
import { ForgotPassword } from '../../pages/forgot-password/forgot-password';
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { NotFound404 } from "../../pages/notFound404/notFound404";
import {getUserInfo, token} from "../../services/actions/registration";
import { getCookie } from '../../utils/cookie'
import ProtectedRoute from '../../pages/protectedRoute/protectedRoure';
import { Feed } from '../../pages/feed/feed';
import { OrderIngredient } from '../../pages/orderIngredient/orderIngredient';
import {MyOrders} from "../../pages/myorders/myOrders";
import {OrderIngredientId} from '../../pages/idOrderIngredient/orderIngredientId';

const App = () => {
    //Стор состояния в компонентах
    const { ingredientsRequest, ingredientsFailed } = useSelector(store => store.burgerIngredients);
    const orderNumber  = useSelector(store => store.order.orderNumber);
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state?.background;
    const cookie = getCookie('token')
    const refreshTokenData = localStorage.getItem('token');
    const tokenSuccess = useSelector(store => store.user.tokenSuccess);

    React.useEffect(() => {
        // Отправляем экшен при монтировании компонента
        dispatch(getIngredients());
    }, [dispatch]);

    // Закрываем модальные окна
    const handleClose = () => {
        dispatch(closeOrderModal());
        history.goBack();
        };

    const openOrderDetailsModal = () => {
        if (!user) {
            history.replace('/login')
        }
    }

    React.useEffect(() => {
        if (!user && refreshTokenData && cookie) {
            dispatch(getUserInfo());
        }
        if (!cookie && refreshTokenData) {
            dispatch(token());
        }
        if (cookie && tokenSuccess && refreshTokenData && !user) {
            dispatch(getUserInfo());
        }
    }, [dispatch, refreshTokenData, user, cookie, tokenSuccess]);


    return (
        <div className={AppStyles.app}>
            <AppHeader />
            <>
                <Switch location={background || location}>
                    <Route exact path="/">
            {!ingredientsFailed && !ingredientsRequest && (
            <main className={AppStyles.main}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor onClick={openOrderDetailsModal}/>
                </DndProvider>
            </main>
            )}
                    </Route>
                   <Route exact path='/login' >
                      <Login />
                   </Route>
                   <Route exact path='/register'>
                      <Register />
                   </Route>
                    <Route exact path='/forgot-password'>
                        <ForgotPassword />
                    </Route>
                    <Route exact path='/reset-password'>
                        <ResetPassword />
                    </Route>
                    <Route exact path='/feed'>
                        <Feed />
                    </Route>
                   <ProtectedRoute exact path='/profile'>
                      <Profile />
                   </ProtectedRoute>
                    <Route
                        path='/ingredients/:id'>
                        <IngredientDetails />
                    </Route>
                    <Route exact path='/feed/:id'>
                        <OrderIngredientId />
                    </Route>
                    <ProtectedRoute exact path='/profile/orders'>
                        <MyOrders />
                    </ProtectedRoute>
                    <Route exact path='/profile/orders/:id'>
                        <OrderIngredientId />
                    </Route>
                    <Route>
                        <NotFound404 />
                    </Route>
                    />
                </Switch>
            {background && (
                <>
                <Route
                    path='/ingredients/:id'>
                    <Modal title="Детали ингредиента" onClose={handleClose}>
                        <IngredientDetails />
                    </Modal>
                </Route>

                <Route
                    path='/feed/:id'>
                    <Modal title='' onClose={handleClose}>
                        <OrderIngredient />
                    </Modal>
                </Route>

                <Route
                    path='/profile/orders/:id'>
                    <Modal title='' onClose={handleClose}>
                        <OrderIngredient />
                    </Modal>
                </Route>
                </>
            )}

        </>
            {orderNumber &&  (
                <Modal title="Детали заказа" onClose={handleClose}>
                    <OrderDetails />
                </Modal>
            )}

        </div>
    )
}
export default App;
