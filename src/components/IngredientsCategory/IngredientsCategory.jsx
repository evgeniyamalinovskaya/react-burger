import React, { forwardRef } from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import PropTypes from 'prop-types';
import Ingredient from '../Ingridient/Ingridient';

const IngredientsCategory = forwardRef(({ categories, type }, ref) => {

     return (
        <li className={ingredientsCategoryStyles.title} ref={ref}>
            <h2 className='text text_type_main-medium' >{type.name}</h2>
            <ul className={`${ingredientsCategoryStyles.ingredients} pl-4 pr-2`}>
                {categories.map((item) => (
                <li key={item._id} >
                    <Ingredient ingredient={item} count={1}/>
                </li>
                ))}
            </ul>
        </li>
    )
})

IngredientsCategory.propTypes = {
    type: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired
}

export default IngredientsCategory;
