import React from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import Ingredient from '../Ingridient/Ingridient';

const IngredientsCategory = ({ categories, type, openModalIngredient }) => {

     return (
        <li className={ingredientsCategoryStyles.title} >
            <h2 className='text text_type_main-medium'>{type.name}</h2>
            <ul className={`${ingredientsCategoryStyles.ingredients} pl-4 pr-2`}>
                {categories.map((item) => (
                <li key={item._id} onClick={() => openModalIngredient(item)}>
                    <Ingredient ingredients={item} onClick={openModalIngredient}/>
                </li>
                ))}
            </ul>
        </li>
    )
}

IngredientsCategory.propTypes = {
    type: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    openModalIngredient: PropTypes.func.isRequired
}

export default IngredientsCategory;