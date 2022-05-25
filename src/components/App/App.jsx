import React from 'react';
import AppStyles from './App.module.css';
import {} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {api, parseResponse} from '../Api/Api';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import BurgerIngredientsContext from '../../services/BurgerIngredientsContext';

const App = () => {
    //Запрос на сервер
    //Функция получения данных (возвращает результат выполнения функции fetch)
    const getData = () => {
        fetch(`${api.url}/ingredients`)
            .then(res => parseResponse(res))
            .then((json) => {
                setIngredients(json.data);
            })
            .catch((err) => console.log(err));
    }

    //При нажатии на кнопку «Оформить заказ» отправляйте запрос к API
    const setData = () => {
        return fetch(`${api.url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({"ingredients": ['60d3b41abdacab0026a733c6']})
        })
            .then(res => parseResponse(res))
            .then((orderNumber) => {
                setOrderNumber(orderNumber)
            })
            .catch((err) => setOrderNumber(null));
    }

    //Первый аргумент хука useEffect — функция, код которой выполняется
    //при монтировании компонента, изменении его пропсов или состояния.
    React.useEffect(() => {
        getData()// запрашиваем ингредиенты с сервера
    }, []);

    //useState один из API хуков
    const [ingredients, setIngredients] = React.useState([])

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false); // Булевый стейт для "Оформить заказ" модалки
    const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false); // Булевый стейт для "Деталей ингредиента" модалки
    const [ingredientInModal, setIngredientInModal] = React.useState({});

    //Создаю стейт с текущим номером заказа
    const [orderNumber = {
        name: "",
        order: {
            number: ""
        },
        success: false
    }, setOrderNumber] = React.useState()

    // Закрытие всех модалок
    const closeAllModals = () => {
        setIsOrderDetailsOpened(false);
        setIsIngredientDetailsOpened(false);
        // тут же закрываем и другие модалки
    };

    // Клик по ингредиенту
    const openModalIngredientDetails = (item) => {
        setIngredientInModal(item)
        setIsIngredientDetailsOpened(true);
    }

    // Клик по кнопке Оформить заказ
    const openModalOrderDetails = () => {
        setIsOrderDetailsOpened(true)
        setData(orderNumber)
    }

    return (
        <div className={AppStyles.app}>
            <AppHeader/>
            <main className={AppStyles.main}>
                <BurgerIngredientsContext.Provider value={ingredients}>
                    <BurgerIngredients openModalIngredient={openModalIngredientDetails}/>
                    <BurgerConstructor openModalOrder={openModalOrderDetails}/>
                </BurgerIngredientsContext.Provider>
            </main>

            {isOrderDetailsOpened &&  (
                <Modal title="Детали заказа" onClose={closeAllModals}>
                    <OrderDetails orderNumber={orderNumber}/> {/* вложенное содержимое, идет в пропс children */}
                </Modal>
            )}

            {isIngredientDetailsOpened && (
                <Modal title="Детали ингредиентов" onClose={closeAllModals}>
                    <IngredientDetails
                        ingredient={ingredientInModal}/> {/* вложенное содержимое, идет в пропс children */}
                </Modal>
            )}

        </div>
    )
}

export default App;