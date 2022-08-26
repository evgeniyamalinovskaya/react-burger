import React, {forwardRef} from 'react';
import ingredientsCategoryStyles from './IngredientsCategory.module.css';
import Ingredient from '../Ingridient/Ingridient';
import {TIngredientsCategory} from "../../utils/types";

const IngredientsCategory = forwardRef<HTMLUListElement, TIngredientsCategory>(({ categories, type }, ref) => {

     return (
        <li className={ingredientsCategoryStyles.title}>
            <h2 className='text text_type_main-medium' >{type.name}</h2>
            <ul className={`${ingredientsCategoryStyles.ingredients} pl-4 pr-2`} ref={ref}>
                {categories.map((item) => (
                <li key={item._id} >
                    <Ingredient ingredient={item} />
                </li>
                ))}
            </ul>
        </li>
    )
})

export default IngredientsCategory;
