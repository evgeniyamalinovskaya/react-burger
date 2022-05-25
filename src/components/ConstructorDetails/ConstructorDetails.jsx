import React, { useContext } from 'react';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorDetailsStyles from './ConstructorDetails.module.css';
import BurgerIngredientsContext from "../../services/BurgerIngredientsContext";

const ConstructorDetails = () => {
    const ingredients = useContext(BurgerIngredientsContext);
    const allIngredients = ingredients.filter((el) => el.type !== 'bun')

    return (
        <ul className={`${constructorDetailsStyles.OrderDetails} pr-2`}>
            {allIngredients.map((item) => (
                <li className={constructorDetailsStyles.ingredient} key={item._id}>
                    <DragIcon type="primary" />
                    <ConstructorElement
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                </li>
            ))}
        </ul>
    )
}

export default ConstructorDetails;
