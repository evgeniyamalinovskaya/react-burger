import React from 'react';
import ingredientDetailsStyle from './IngredientDetails.module.css';

const IngredientDetails = ({ingredient}) => {

    return(
        <div className={`${ingredientDetailsStyle.block} pt-10 pl-10 pr-10 pb-15`}>
            <h2 className='text text_type_main-large'>Детали ингредиента</h2>
            <img className={ingredientDetailsStyle.image} src={ingredient.image_large} alt={ingredient.name}/>
            <p className={`${ingredientDetailsStyle.text} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</p>
            <ul className={ingredientDetailsStyle.list}>
                <li className={ingredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.calories}</span>
                </li>      >
                <li className={ingredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.fat}</span>
                </li>
                <li className={ingredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.carbohydrates}</span>
                </li>
            </ul>
        </div>
    )
}

export default IngredientDetails;


