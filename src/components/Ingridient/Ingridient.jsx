import React from 'react';
import ingredientStyles from './Ingridient.module.css'
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const Ingredient = (props) => {
    return (
        <div className={ingredientStyles.ingredient}>
            <img className="ml-4 mr-4" src={props.image} alt={props.name}/>
            <div className={ingredientStyles.price}>
                <span className='text text_type_digits-default'>{props.price}</span>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={`${ingredientStyles.text} text text_type_main-default`}>{props.name}</p>
            <Counter count={1} size="default"/>
        </div>
    )
}

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
}


export default Ingredient;