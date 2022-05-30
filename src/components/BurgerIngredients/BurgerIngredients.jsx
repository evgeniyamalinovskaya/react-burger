import React, {useContext} from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";
import PropTypes from 'prop-types';
import selectItems from '../../utils/selectItems';
import Product from '../../utils/Producrts';
import BurgerIngredientsContext from "../../services/BurgerIngredientsContext";

const BurgerIngredients = ( {openModalIngredient} ) => {
    const ingredients = useContext(BurgerIngredientsContext);

    const buns = selectItems(Product.Bun.type, ingredients);
    const mains = selectItems(Product.Main.type, ingredients);
    const sauces = selectItems(Product.Sauce.type, ingredients);

    const [current, setCurrent] = React.useState('one')
    return (
        <div className={`${burgerIngredientsStyles.section} mr-5`}>
            <h1 className={`${burgerIngredientsStyles.title} mt-10 mb-5 text text_type_main-large`}>Соберите бургер</h1>
            <div className={burgerIngredientsStyles.tab}>
                <a className={burgerIngredientsStyles.citing} href="#bun">
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.citing} href="#sauce">
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.citing} href="#main">
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </a>
            </div>

            <div className={burgerIngredientsStyles.container}>
                <a name='bun'>
                <IngredientsCategory
                    categories={buns} type={Product.Bun} openModalIngredient={openModalIngredient} />
                </a>
                <a name='sauce'>
                <IngredientsCategory
                    categories={sauces} type={Product.Sauce} openModalIngredient={openModalIngredient} />
                </a>
                <a name='main'>
                <IngredientsCategory
                    categories={mains} type={Product.Main} openModalIngredient={openModalIngredient} />
                </a>
            </div>
        </div>
    )
}

BurgerIngredients.propTypes = {
    openModalIngredient: PropTypes.func.isRequired
}

export default BurgerIngredients;
