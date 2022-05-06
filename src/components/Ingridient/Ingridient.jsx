import React from 'react';
import ingredientStyles from './Ingridient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Ingredient = (props) => {
    return (
        <li className={ingredientStyles.ingredient}>
            <img className="ml-4 mr-4" src={props.ingredient.image} alt={props.ingredient.name}/>
            <div className={ingredientStyles.price}>
                <span className='text text_type_digits-default'>{props.ingredient.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${ingredientStyles.text} text text_type_main-default`}>{props.ingredient.name}</p>
            <Counter count={1} size="default"/>
        </li>
    )
}

Ingredient.propTypes = {
    ingredient: PropTypes.shape({
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
};

export default Ingredient;