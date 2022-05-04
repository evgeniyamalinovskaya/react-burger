import React from 'react';
import ingredientsCategoryStyles from '../IngredientsCategory/IngredientsCategory.module.css'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const Ingredient = (props) => {
    return (
        <li className={ingredientsCategoryStyles.ingredient}>
            <img className="ml-4 mr-4" src={props.ingredient.image} alt={props.ingredient.name} />
            <div className={ingredientsCategoryStyles.price}>
                <span className='text text_type_digits-default'>{props.ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default" style={{ textAlign: 'center' }}>{props.ingredient.name}</p>
            <Counter count={1} size="default" />
        </li>
    )
}

export default Ingredient;