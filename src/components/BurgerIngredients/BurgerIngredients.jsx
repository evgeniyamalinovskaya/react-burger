import React from 'react';
import {Tab} from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsCategory from "../IngredientsCategory/IngredientsCategory";
import categories from '../../utils/categories';
import data from "../../utils/data";

const BurgerIngredients = () => {
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
                {categories.map((el) => (
                    <IngredientsCategory key={el.type} type={el.type} text={el.text} />
                ))}

            </div>
        </div>
    )
}

export default BurgerIngredients;
