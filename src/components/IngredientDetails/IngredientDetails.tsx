import React, {FC} from 'react';
import ingredientDetailsStyle from './IngredientDetails.module.css';
import { useParams } from 'react-router-dom';
import {useAppSelector} from "../../utils/types";

const IngredientDetails: FC = () => {
    const { id } = useParams<{ id: string }>();
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);
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



