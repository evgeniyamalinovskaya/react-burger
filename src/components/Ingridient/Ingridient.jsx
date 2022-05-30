import React from 'react';
import ingredientStyles from './Ingridient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import ingredient from "../../utils/ingredient";

const Ingredient = ({ingredients}) => {

    return (
        <div className={ingredientStyles.ingredient}>
            <img className="ml-4 mr-4" src={ingredients.image} alt={ingredients.name}/>
            <div className={ingredientStyles.price}>
                <span className='text text_type_digits-default'>{ingredients.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${ingredientStyles.text} text text_type_main-default`}>{ingredients.name}</p>
            <Counter count={1} size="default"/>
        </div>
    )
}

Ingredient.propTypes = {
    ingredients:  ingredient.isRequired
}


export default Ingredient;