import React from 'react';
import AppStyles from './App.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

const App = () => {

    return (
        <div className={AppStyles.app}>
            <AppHeader />
            <main className={AppStyles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
            </main>
        </div>
    )
}

export default App;
