import React from 'react';
import { useSelector } from 'react-redux';
import ingredientDetailsStyle from './IngredientDetails.module.css';
// import PropTypes from 'prop-types';
// import ingredient from '../../utils/ingredient';
import { useParams } from 'react-router-dom';


const IngredientDetails = () => {
    const { id } = useParams();
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const ingredient = ingredients.find(ingredient => ingredient._id === id)

    return(
        <>
            {ingredient && (
      <div className={`${ingredientDetailsStyle.block} pt-10 pl-10 pr-10 pb-15`}>
          <h2 className='text text_type_main-large'>Детали ингредиента</h2>
            <img className={ingredientDetailsStyle.image} src={ingredient.image_large} alt={ingredient.name}/>
            <p className={`${ingredientDetailsStyle.text} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</p>
            <ul className={ingredientDetailsStyle.list}>
                <li className={ingredientDetailsStyle.item}>
                    <p className='text text_type_main-default text_color_inactive'>Калории, ккал</p>
                    <span className='text text_type_main-default text_color_inactive'>{ingredient.calories}</span>
                </li>
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
            )}
            </>
    )
}

// IngredientDetails.propTypes = {
//     ingredient: object.ingredient.isRequired,
// }

export default IngredientDetails;



