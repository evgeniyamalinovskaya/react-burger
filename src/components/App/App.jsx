import React from 'react';
import AppStyles from './App.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { api, parseResponse} from '../Api/Api';
import IngredientDetails from '../IngredientDetails/IngredientDetails';


const App = () => {

    //Запрос на сервер
    //Функция получения данных (возвращает результат выполнения функции fetch)
    function getData () {
        fetch(`${api.url}`)
            .then(parseResponse)
            .then((json) => {setIngredients(json.data)})
            .catch(err => {console.log(err)});
    }

    //Первый аргумент хука useEffect — функция, код которой выполняется
    //при монтировании компонента, изменении его пропсов или состояния.
    React.useEffect(() => {
        getData();
    }, []);


    //useState один из API хуков
    const [ingredients, setIngredients] = React.useState([])

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false); // Булевый стейт для "Оформить заказ" модалки
    const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false); // Булевый стейт для "Деталей ингредиента" модалки
    const [ingredientInModal, setIngredientInModal] = React.useState({ });

    // Закрытие всех модалок
    const closeAllModals = () => {
        setIsOrderDetailsOpened(false);
        setIsIngredientDetailsOpened(false);
        // тут же закрываем и другие модалки
    };

    // Клик по ингредиенту
    const openModalIngredientDetails = (item) => {
        setIngredientInModal (item)
        setIsIngredientDetailsOpened(true);
    }

    // Клик по кнопке Оформить заказ
    const openModalOrderDetails = () => {
        setIsOrderDetailsOpened(true)
    }

    return (
        <div className={AppStyles.app}>
            <AppHeader />
            <main className={AppStyles.main}>

                <BurgerIngredients ingredients={ingredients} openModalIngredient={openModalIngredientDetails}/>
                <BurgerConstructor ingredients={ingredients} openModalOrder={openModalOrderDetails}/>

            </main>

            {isOrderDetailsOpened && (
            <Modal title="Детали заказа" onClose={closeAllModals}>
                <OrderDetails />  {/* вложенное содержимое, идет в пропс children */}
            </Modal>
            )}

            {isIngredientDetailsOpened && (
            <Modal title="Детали ингредиентов" onClose={closeAllModals}>
                <IngredientDetails ingredient={ingredientInModal} />  {/* вложенное содержимое, идет в пропс children */}
            </Modal>
            )}

        </div>
    )
}

export default App;
