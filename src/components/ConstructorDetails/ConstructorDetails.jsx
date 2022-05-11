import React from 'react';
import PropTypes from 'prop-types';
import ingredient from '../../utils/ingredient';
import {DragIcon, ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import constructorDetailsStyles from './ConstructorDetails.module.css';

const ConstructorDetails = ({ingredients}) => {
    return (
        <ul className={`${constructorDetailsStyles.OrderDetails} pr-2`}>
            {ingredients.map((item) => (
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

ConstructorDetails.propTypes = {
    ingredients: PropTypes.arrayOf(ingredient.isRequired).isRequired
}


export default ConstructorDetails;
