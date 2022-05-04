import React from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import  data from '../../utils/data';
import Ingredient from '../Ingridient/Ingridient.jsx';

const IngredientsCategory = (props) => {
    const category = data.filter((el) => el.type === props.type)
    return(
        <li className={ingredientsCategoryStyles.title} id={props.type}>
            <h2 className='text text_type_main-medium'>{props.text}</h2>
                <ul className={`${ingredientsCategoryStyles.ingredients} pl-4`}>
                    {category.map((el, i) => (
                        <Ingredient key={i} ingredient={el} />
                    ))}
                </ul>
        </li>
    )
}

IngredientsCategory.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}

export default IngredientsCategory;